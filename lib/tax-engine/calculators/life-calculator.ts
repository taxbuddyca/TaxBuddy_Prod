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
    };
}

export class LifeCalculator {
    private riskAnalyzer: AuditRiskAnalyzer;

    constructor() {
        this.riskAnalyzer = new AuditRiskAnalyzer();
    }

    calculate(facts: TaxFacts, events: TaxEvent[]): LifeEngineResult {
        const breakdown: LifeEngineResult['breakdown'] = {};
        let totalSavings = 0;

        // Calculate savings for each triggered event
        events.forEach(event => {
            switch (event.type) {
                case 'recommend_spousal_rrsp':
                    const spousalSavings = this.calculateSpousalRRSPSavings(facts);
                    breakdown.spousal_rrsp_savings = spousalSavings;
                    totalSavings += spousalSavings;
                    break;

                case 'pension_splitting':
                    const pensionSavings = this.calculatePensionSplittingSavings(facts);
                    breakdown.pension_splitting_savings = pensionSavings;
                    totalSavings += pensionSavings;
                    break;

                case 'childcare_allocation':
                    const childcareSavings = this.calculateChildcareSavings(facts);
                    breakdown.childcare_savings = childcareSavings;
                    totalSavings += childcareSavings;
                    break;

                case 'tuition_carryforward_recommendation':
                    const tuitionSavings = this.calculateTuitionSavings(facts);
                    breakdown.tuition_savings = tuitionSavings;
                    break;

                case 'moving_expense_deduction':
                    const movingSavings = this.calculateMovingExpenseSavings(facts);
                    breakdown.moving_expense_savings = movingSavings;
                    totalSavings += movingSavings;
                    break;

                case 'gst_credit_reminder':
                    breakdown.gst_credit_value = 500; // Estimated annual GST credit
                    break;
            }
        });

        const riskScore = this.riskAnalyzer.calculateRiskScore(facts);

        return {
            total_savings: totalSavings,
            recommendations: events,
            risk_score: riskScore,
            summary: this.generateSummary(events, totalSavings),
            breakdown
        };
    }

    private calculateSpousalRRSPSavings(facts: TaxFacts): number {
        if (!facts.income_difference) return 0;

        // Simplified calculation: ~15% tax savings on income difference
        const potentialContribution = Math.min(facts.income_difference * 0.18, 31560); // 2025 RRSP limit
        return potentialContribution * 0.15;
    }

    private calculatePensionSplittingSavings(facts: TaxFacts): number {
        if (!facts.income || !facts.spouse_income) return 0;

        // Estimate pension income (simplified)
        const pensionIncome = facts.income * 0.3; // Assume 30% is pension
        const splitAmount = pensionIncome * 0.5;

        // Calculate marginal rate difference
        const higherRate = this.getMarginalRate(facts.income);
        const lowerRate = this.getMarginalRate(facts.spouse_income || 0);

        return splitAmount * (higherRate - lowerRate);
    }

    private calculateChildcareSavings(facts: TaxFacts): number {
        if (!facts.childcare_expenses) return 0;

        // Allocate to lower earner (higher marginal benefit)
        const lowerIncome = Math.min(facts.income, facts.spouse_income || 0);
        const marginalRate = this.getMarginalRate(lowerIncome);

        return facts.childcare_expenses * marginalRate;
    }

    private calculateTuitionSavings(facts: TaxFacts): number {
        if (!facts.tuition_credits_available) return 0;

        // Potential savings if carried forward to higher income year
        const futureRate = 0.30; // Assume 30% marginal rate at $60k+
        const currentRate = this.getMarginalRate(facts.income);

        return facts.tuition_credits_available * (futureRate - currentRate);
    }

    private calculateMovingExpenseSavings(facts: TaxFacts): number {
        // Estimate average moving expenses
        const estimatedMovingCosts = 3000;
        const marginalRate = this.getMarginalRate(facts.income);

        return estimatedMovingCosts * marginalRate;
    }

    private getMarginalRate(income: number): number {
        // 2025 Federal + Provincial (average) marginal rates
        if (income <= 57375) return 0.25;
        if (income <= 114750) return 0.32;
        if (income <= 177882) return 0.37;
        if (income <= 253414) return 0.43;
        return 0.48;
    }

    private generateSummary(events: TaxEvent[], totalSavings: number): string {
        if (events.length === 0) {
            return "No specific tax optimization opportunities identified based on your profile.";
        }

        const strategies = events.map(e => {
            switch (e.type) {
                case 'pension_splitting':
                    return 'pension splitting';
                case 'childcare_allocation':
                    return 'childcare expense allocation';
                case 'recommend_spousal_rrsp':
                    return 'spousal RRSP contributions';
                case 'tuition_carryforward_recommendation':
                    return 'tuition credit carry-forward';
                case 'moving_expense_deduction':
                    return 'moving expense deduction';
                default:
                    return e.params.category;
            }
        });

        if (totalSavings > 0) {
            return `By implementing ${strategies.join(', ')}, you could save approximately $${totalSavings.toLocaleString()} in taxes.`;
        }

        return `Consider these strategies: ${strategies.join(', ')}.`;
    }
}
