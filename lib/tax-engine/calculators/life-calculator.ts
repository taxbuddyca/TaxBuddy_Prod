import { TaxFacts, TaxEvent } from '../rules-engine';
import { AuditRiskAnalyzer, RiskScore } from '../risk-analyzer';

export interface LifeEngineResult {
    total_savings: number;
    recommendations: TaxEvent[];
    risk_score: RiskScore;
    summary: string;
    breakdown: {
        spousal_rrsp_savings?: number;
        pension_splitting_savings?: number;
        childcare_savings?: number;
        tuition_savings?: number;
        moving_expense_savings?: number;
        gst_credit_value?: number;
        fhsa_savings?: number;
        home_buyers_plan_benefit?: number;
        caregiver_credit?: number;
        newcomer_bpa_savings?: number;
    };
}

// 2025 CRA Constants
const RRSP_LIMIT_2025 = 32490;
const GST_CREDIT_SINGLE_2025 = 519;
const GST_CREDIT_MARRIED_2025 = 680;
const GST_CREDIT_PER_CHILD_2025 = 179;
const CAREGIVER_CREDIT_2025 = 2616; // Federal credit amount

export class LifeCalculator {
    private riskAnalyzer: AuditRiskAnalyzer;

    constructor() {
        this.riskAnalyzer = new AuditRiskAnalyzer();
    }

    calculate(facts: TaxFacts, events: TaxEvent[]): LifeEngineResult {
        const breakdown: LifeEngineResult['breakdown'] = {};
        let totalSavings = 0;

        events.forEach(event => {
            switch (event.type) {
                case 'recommend_spousal_rrsp': {
                    const savings = this.calculateSpousalRRSPSavings(facts);
                    breakdown.spousal_rrsp_savings = savings;
                    totalSavings += savings;
                    break;
                }
                case 'pension_splitting': {
                    const savings = this.calculatePensionSplittingSavings(facts);
                    breakdown.pension_splitting_savings = savings;
                    totalSavings += savings;
                    break;
                }
                case 'childcare_allocation': {
                    const savings = this.calculateChildcareSavings(facts);
                    breakdown.childcare_savings = savings;
                    totalSavings += savings;
                    break;
                }
                case 'tuition_carryforward_recommendation': {
                    const savings = this.calculateTuitionSavings(facts);
                    breakdown.tuition_savings = savings;
                    // Don't add to totalSavings — it's a future benefit, not immediate
                    break;
                }
                case 'moving_expense_deduction': {
                    const savings = this.calculateMovingExpenseSavings(facts);
                    breakdown.moving_expense_savings = savings;
                    totalSavings += savings;
                    break;
                }
                case 'gst_credit_reminder': {
                    const credit = this.calculateGSTCredit(facts);
                    breakdown.gst_credit_value = credit;
                    totalSavings += credit;
                    break;
                }
                case 'fhsa_recommendation': {
                    // Max annual deduction value at their marginal rate
                    const rate = this.getMarginalRate(facts.income || 0);
                    const annualSavings = Math.min(facts.income || 0, 8000) * rate;
                    breakdown.fhsa_savings = parseFloat(annualSavings.toFixed(2));
                    totalSavings += annualSavings;
                    break;
                }
                case 'home_buyers_plan': {
                    // HBP: avoid immediate tax on $35k RRSP withdrawal (tax deferred)
                    const rate = this.getMarginalRate(facts.income || 0);
                    const benefit = Math.min(35000, (facts as any).rrsp_balance || 35000) * rate;
                    breakdown.home_buyers_plan_benefit = parseFloat(benefit.toFixed(2));
                    totalSavings += benefit;
                    break;
                }
                case 'caregiver_credit': {
                    // Non-refundable — value is credit_amount × lowest federal rate (14.5% in 2025)
                    const creditValue = CAREGIVER_CREDIT_2025 * 0.145;
                    breakdown.caregiver_credit = parseFloat(creditValue.toFixed(2));
                    totalSavings += creditValue;
                    break;
                }
                case 'newcomer_90_percent_rule': {
                    const result = this.calculateNewcomer90PercentSavings(facts);
                    // Override the generic JSON message with our calculated deep insight
                    event.params.message = result.message;
                    if (result.savings > 0) {
                        breakdown.newcomer_bpa_savings = result.savings;
                        totalSavings += result.savings;
                    }
                    if (result.is_negative) {
                        event.params.priority = "medium";
                        event.params.category = "warning";
                    } else {
                        event.params.priority = "high";
                        event.params.category = "newcomer";
                    }
                    break;
                }
            }
        });

        const riskScore = this.riskAnalyzer.calculateRiskScore(facts);

        return {
            total_savings: parseFloat(totalSavings.toFixed(2)),
            recommendations: events,
            risk_score: riskScore,
            summary: this.generateSummary(events, totalSavings),
            breakdown
        };
    }

    private calculateSpousalRRSPSavings(facts: TaxFacts): number {
        if (!facts.income) return 0;

        // Spousal RRSP: max contribution is 18% of YOUR income, up to the RRSP limit
        const maxContribution = Math.min(facts.income * 0.18, RRSP_LIMIT_2025);

        // Tax saved = contribution × marginal rate difference between spouses
        const higherRate = this.getMarginalRate(facts.income);
        const lowerRate = this.getMarginalRate(facts.spouse_income || 0);
        const rateDiff = Math.max(0, higherRate - lowerRate);

        return parseFloat((maxContribution * rateDiff).toFixed(2));
    }

    private calculatePensionSplittingSavings(facts: TaxFacts): number {
        if (!facts.income || !facts.spouse_income) return 0;

        // Assume 30% of income is eligible pension income (simplified)
        const pensionIncome = facts.income * 0.30;
        const splitAmount = pensionIncome * 0.50; // Max 50% split

        const higherRate = this.getMarginalRate(facts.income);
        const lowerRate = this.getMarginalRate(facts.spouse_income);

        return parseFloat((splitAmount * Math.max(0, higherRate - lowerRate)).toFixed(2));
    }

    private calculateChildcareSavings(facts: TaxFacts): number {
        if (!facts.childcare_expenses) return 0;

        // CRA: claimed by the LOWER earner — use their marginal rate
        const lowerIncome = Math.min(facts.income || 0, facts.spouse_income || facts.income || 0);
        const marginalRate = this.getMarginalRate(lowerIncome);

        return parseFloat((facts.childcare_expenses * marginalRate).toFixed(2));
    }

    private calculateTuitionSavings(facts: TaxFacts): number {
        if (!facts.tuition_credits_available) return 0;

        // Potential future savings: credits worth more at 30%+ marginal rate vs. current rate
        const futureRate = 0.30;
        const currentRate = this.getMarginalRate(facts.income || 0);
        const additionalValue = Math.max(0, futureRate - currentRate);

        return parseFloat((facts.tuition_credits_available * additionalValue).toFixed(2));
    }

    private calculateMovingExpenseSavings(facts: TaxFacts): number {
        // Moving expense deduction value — apply marginal rate to reasonable estimate
        const estimatedMovingCosts = 3500;
        const marginalRate = this.getMarginalRate(facts.income || 0);

        return parseFloat((estimatedMovingCosts * marginalRate).toFixed(2));
    }

    private calculateGSTCredit(facts: TaxFacts): number {
        // 2025 GST/HST Credit amounts
        const isMarried = facts.marital_status === 'married' || facts.marital_status === 'common_law';
        const baseAmount = isMarried ? GST_CREDIT_MARRIED_2025 : GST_CREDIT_SINGLE_2025;
        const numChildren = 0; // Would need a children_count fact — return base for now

        return baseAmount + (numChildren * GST_CREDIT_PER_CHILD_2025);
    }

    private calculateNewcomer90PercentSavings(facts: TaxFacts): { savings: number; message: string; is_negative: boolean } {
        if (!facts.is_newcomer || !facts.arrival_date) return { savings: 0, message: "Missing arrival date.", is_negative: true };

        const canadian = facts.canadian_income || facts.income || 0;
        const foreign = facts.foreign_income || 0;
        const total = canadian + foreign;

        if (total === 0) {
            return { savings: 0, message: "No income reported. You do not qualify for non-refundable tax credits, but should still apply for the GST/HST credit.", is_negative: true };
        }

        const ratio = canadian / total;
        const meets90Rule = ratio >= 0.90;

        // Calculate days in Canada
        const arrivalDate = new Date(facts.arrival_date);
        const yearBase = arrivalDate.getFullYear();
        const endOfYear = new Date(`${yearBase}-12-31`);
        const daysInCanada = Math.max(0, Math.floor((endOfYear.getTime() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
        const daysInYear = ((yearBase % 4 === 0 && yearBase % 100 > 0) || yearBase % 400 == 0) ? 366 : 365;

        const prorationFactor = Math.min(1, daysInCanada / daysInYear);

        // 2025 Estimated BPA values
        const federalBpa = 15705;
        const provBpa = 12399; // ON avg for example

        // 14.5% federal lowest bracket (2025/2026), ~5.05% ON lowest bracket
        const fullCreditVal = (federalBpa * 0.145) + (provBpa * 0.0505);
        const proratedCreditValue = fullCreditVal * prorationFactor;

        if (meets90Rule) {
            const savings = fullCreditVal - proratedCreditValue;
            return {
                savings: parseFloat(savings.toFixed(2)),
                message: `✅ You meet the CRA 90% Rule! Because ${Math.round(ratio * 100)}% of your world income was earned in Canada, you qualify for the FULL Basic Personal Amount (approx $15,705), rather than a prorated amount based on your ${daysInCanada} days in Canada. This saves you ~$${Math.round(savings).toLocaleString()} in taxes.`,
                is_negative: false
            };
        } else {
            return {
                savings: 0,
                message: `⚠️ You do NOT meet the CRA 90% Rule. Because your Canadian income is only ${Math.round(ratio * 100)}% of your world income (requires 90%), your Basic Personal Amount tax credits will be prorated based on your ${daysInCanada} days in Canada.`,
                is_negative: true
            };
        }
    }

    /**
     * 2025 combined federal + avg provincial marginal rates by income bracket.
     * Uses average provincial rate across provinces (ON basis).
     */
    private getMarginalRate(income: number): number {
        if (income <= 0) return 0;
        if (income <= 17000) return 0.15;    // Below BPA threshold — effectively ~0-15%
        if (income <= 51446) return 0.205;   // Federal 14.5% + ON 5.05%
        if (income <= 57375) return 0.243;   // Federal 14.5% + ON 9.15%
        if (income <= 102894) return 0.295;  // Federal 20.5% + ON 9.15%
        if (income <= 108525) return 0.316;  // Federal 20.5% + ON 11.16%
        if (income <= 114750) return 0.316;
        if (income <= 150000) return 0.376;  // Federal 26% + ON 11.16%
        if (income <= 177882) return 0.4341; // Federal 26% + ON 12.16%
        if (income <= 220000) return 0.4641; // Federal 29% + ON 12.16%
        if (income <= 253414) return 0.4941; // Federal 29% + ON 13.16%
        return 0.5353;                        // Federal 33% + ON 13.16%
    }

    private generateSummary(events: TaxEvent[], totalSavings: number): string {
        if (events.length === 0) {
            return 'No specific tax optimization opportunities identified based on your profile. Ensure you\'re claiming all eligible non-refundable credits (Basic Personal Amount, CPP contributions, EI premiums).';
        }

        const strategies = events.map(e => {
            switch (e.type) {
                case 'pension_splitting': return 'pension income splitting';
                case 'childcare_allocation': return 'childcare expense allocation';
                case 'recommend_spousal_rrsp': return 'spousal RRSP contributions';
                case 'tuition_carryforward_recommendation': return 'tuition credit carry-forward';
                case 'moving_expense_deduction': return 'moving expense deduction';
                case 'gst_credit_reminder': return 'GST/HST credit application';
                case 'fhsa_recommendation': return 'First Home Savings Account';
                case 'home_buyers_plan': return 'Home Buyers\' Plan';
                case 'caregiver_credit': return 'Caregiver Credit';
                case 'newcomer_90_percent_rule': return 'CRA 90% Rule optimization';
                default: return e.params.category;
            }
        });

        if (totalSavings > 0) {
            return `By implementing ${strategies.join(', ')}, you could save approximately $${Math.round(totalSavings).toLocaleString()} in taxes this year.`;
        }

        return `Consider these strategies: ${strategies.join(', ')}.`;
    }
}
