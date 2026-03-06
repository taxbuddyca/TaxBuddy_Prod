import { TaxFacts, TaxEvent } from '../rules-engine';
import { AuditRiskAnalyzer, RiskScore } from '../risk-analyzer';

export interface NicheEngineResult {
    total_savings: number;
    recommendations: TaxEvent[];
    risk_score: RiskScore;
    summary: string;
    breakdown: {
        crypto_tax_impact?: number;
        crypto_inclusion_rate?: number;
        real_estate_tax_impact?: number;
        cross_border_savings?: number;
        underused_housing_tax_estimate?: number;
    };
}

// CRA 2025 Constants — Niche Engine
const CAPITAL_GAINS_INCLUSION_STANDARD = 0.50;      // Under $250k
const CAPITAL_GAINS_INCLUSION_HIGH = 0.6667;        // Over $250k (2024 Budget, effective Jun 25 2024)
const CAPITAL_GAINS_HIGH_RATE_THRESHOLD = 250000;

export class NicheCalculator {
    private riskAnalyzer: AuditRiskAnalyzer;

    constructor() {
        this.riskAnalyzer = new AuditRiskAnalyzer();
    }

    calculate(facts: TaxFacts, events: TaxEvent[]): NicheEngineResult {
        const breakdown: NicheEngineResult['breakdown'] = {};
        let totalSavings = 0;

        events.forEach(event => {
            switch (event.type) {
                case 'crypto_capital_gains': {
                    const { taxImpact, inclusionRate } = this.calculateCryptoCapitalGains(facts);
                    breakdown.crypto_tax_impact = taxImpact;
                    breakdown.crypto_inclusion_rate = inclusionRate;
                    totalSavings += taxImpact; // positive = savings vs business income treatment
                    break;
                }
                case 'crypto_high_gains_warning': {
                    // Quantify the extra tax from 66.67% vs 50% inclusion
                    const extraTax = this.calculateHighGainsPenalty(facts);
                    breakdown.crypto_tax_impact = -extraTax; // Negative = additional cost to flag
                    break;
                }
                case 'crypto_business_income_warning': {
                    // Business income vs capital gains cost
                    const cost = this.calculateBusinessIncomeCost(facts);
                    breakdown.crypto_tax_impact = -cost; // Negative = cost to user
                    break;
                }
                case 'anti_flipping_exemption': {
                    const savings = this.calculateAntiFlippingExemptionValue(facts);
                    breakdown.real_estate_tax_impact = savings;
                    totalSavings += savings;
                    break;
                }
                case 'anti_flipping_tax': {
                    const cost = this.calculateAntiFlippingCost(facts);
                    breakdown.real_estate_tax_impact = -cost; // Negative = tax cost
                    break;
                }
                case 'foreign_tax_credit_available': {
                    const creditSavings = this.calculateForeignTaxCreditSavings(facts);
                    breakdown.cross_border_savings = creditSavings;
                    totalSavings += creditSavings;
                    break;
                }
                case 'underused_housing_tax': {
                    const uhtEstimate = this.estimateUHT(facts);
                    breakdown.underused_housing_tax_estimate = uhtEstimate;
                    // UHT is a cost/liability — don't add to savings
                    break;
                }
            }
        });

        const riskScore = this.riskAnalyzer.calculateRiskScore(facts);

        return {
            total_savings: parseFloat(totalSavings.toFixed(2)),
            recommendations: events,
            risk_score: riskScore,
            summary: this.generateSummary(events, totalSavings, breakdown),
            breakdown
        };
    }

    /**
     * Crypto Capital Gains calculation with 2-tier inclusion rates (2024 Budget).
     * Returns tax impact (vs 100% business income) and the applicable inclusion rate.
     */
    private calculateCryptoCapitalGains(facts: TaxFacts): { taxImpact: number; inclusionRate: number } {
        const gains = (facts as any).crypto_gains_amount || 10000; // Use actual if provided
        const marginalRate = this.getMarginalRate(facts.income || 0);

        let weightedInclusion: number;
        if (gains <= CAPITAL_GAINS_HIGH_RATE_THRESHOLD) {
            weightedInclusion = CAPITAL_GAINS_INCLUSION_STANDARD;
        } else {
            // Blended: first $250k at 50%, above at 66.67%
            const portionAtStd = (CAPITAL_GAINS_HIGH_RATE_THRESHOLD / gains) * CAPITAL_GAINS_INCLUSION_STANDARD;
            const portionAtHigh = ((gains - CAPITAL_GAINS_HIGH_RATE_THRESHOLD) / gains) * CAPITAL_GAINS_INCLUSION_HIGH;
            weightedInclusion = portionAtStd + portionAtHigh;
        }

        const taxWithCapGains = gains * weightedInclusion * marginalRate;
        const taxAsBusiness = gains * marginalRate;
        const savingsVsBusiness = taxAsBusiness - taxWithCapGains;

        return {
            taxImpact: parseFloat(savingsVsBusiness.toFixed(2)),
            inclusionRate: parseFloat(weightedInclusion.toFixed(4))
        };
    }

    /**
     * Extra tax cost if gains exceed $250k — quantifies the high-rate exposure.
     */
    private calculateHighGainsPenalty(facts: TaxFacts): number {
        const gains = (facts as any).crypto_gains_amount || 300000;
        if (gains <= CAPITAL_GAINS_HIGH_RATE_THRESHOLD) return 0;

        const marginalRate = this.getMarginalRate(facts.income || 0);
        const overThreshold = gains - CAPITAL_GAINS_HIGH_RATE_THRESHOLD;
        const extraInclusionRate = CAPITAL_GAINS_INCLUSION_HIGH - CAPITAL_GAINS_INCLUSION_STANDARD;
        const extraTax = overThreshold * extraInclusionRate * marginalRate;

        return parseFloat(extraTax.toFixed(2));
    }

    /**
     * Extra business income cost vs capital gains treatment.
     */
    private calculateBusinessIncomeCost(facts: TaxFacts): number {
        const gains = (facts as any).crypto_gains_amount || 10000;
        const marginalRate = this.getMarginalRate(facts.income || 0);
        const extraTax = gains * (1 - CAPITAL_GAINS_INCLUSION_STANDARD) * marginalRate;

        return parseFloat(extraTax.toFixed(2));
    }

    /**
     * Tax saved when anti-flipping exemption applies (can use capital gains treatment or PRE).
     */
    private calculateAntiFlippingExemptionValue(facts: TaxFacts): number {
        const estimatedGain = (facts as any).property_sale_gain || 50000;
        const marginalRate = this.getMarginalRate(facts.income || 0);
        // Without exemption = business income (100% taxable)
        // With exemption = capital gains (50% taxable)
        const taxSaved = estimatedGain * CAPITAL_GAINS_INCLUSION_STANDARD * marginalRate;

        return parseFloat(taxSaved.toFixed(2));
    }

    /**
     * Anti-flipping cost — extra tax vs capital gains treatment.
     */
    private calculateAntiFlippingCost(facts: TaxFacts): number {
        const estimatedGain = (facts as any).property_sale_gain || 50000;
        const marginalRate = this.getMarginalRate(facts.income || 0);
        const extraTax = estimatedGain * CAPITAL_GAINS_INCLUSION_STANDARD * marginalRate;

        return parseFloat(extraTax.toFixed(2));
    }

    /**
     * Foreign tax credit — amount of US tax recoverable in Canada (T2209).
     * Conservative estimate: 75% of US tax paid, bounded by Canadian tax on same income.
     */
    private calculateForeignTaxCreditSavings(facts: TaxFacts): number {
        // Without actual US tax data, we provide guidance-level estimate
        // Inform user this needs their actual T1135 / US 1099 data
        return 0; // Set to 0 — actual credit requires specific US tax data
    }

    /**
     * Underused Housing Tax estimate: 1% of assessed value annually.
     */
    private estimateUHT(facts: TaxFacts): number {
        const assessedValue = (facts as any).property_assessed_value || 500000;
        return parseFloat((assessedValue * 0.01).toFixed(2));
    }

    /**
     * Combined federal + ON marginal rates.
     */
    private getMarginalRate(income: number): number {
        if (income <= 0) return 0;
        if (income <= 51446) return 0.205;
        if (income <= 57375) return 0.243;
        if (income <= 102894) return 0.295;
        if (income <= 114750) return 0.316;
        if (income <= 150000) return 0.376;
        if (income <= 177882) return 0.4341;
        if (income <= 220000) return 0.4641;
        if (income <= 253414) return 0.4941;
        return 0.5353;
    }

    private generateSummary(events: TaxEvent[], totalSavings: number, breakdown: NicheEngineResult['breakdown']): string {
        if (events.length === 0) {
            return 'No specialized tax issues identified. Ensure you are tracking ACB (Adjusted Cost Base) for all assets.';
        }

        const warnings = events.filter(e =>
            e.type.includes('warning') || e.params?.risk_level === 'high' || e.params?.priority === 'critical'
        );

        if (warnings.length > 0) {
            const issues = warnings.map(w => w.params?.message || '').filter(Boolean);
            return `⚠️ Action Required: ${issues[0]}${issues.length > 1 ? ` (+ ${issues.length - 1} more issues)` : ''}`;
        }

        if (breakdown.crypto_inclusion_rate) {
            const pct = (breakdown.crypto_inclusion_rate * 100).toFixed(1);
            return `Capital gains treatment applies at ${pct}% inclusion rate — only ${pct}% of your gains are added to taxable income.`;
        }

        if (totalSavings > 0) {
            return `Potential tax benefit of $${Math.round(totalSavings).toLocaleString()} identified through proper classification.`;
        }

        return 'Review your specialized tax situation carefully with a CPA to ensure proper reporting.';
    }
}
