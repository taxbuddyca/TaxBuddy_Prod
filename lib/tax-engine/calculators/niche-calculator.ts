import { TaxFacts, TaxEvent } from '../rules-engine';
import { AuditRiskAnalyzer, RiskScore } from '../risk-analyzer';

export interface NicheEngineResult {
    total_savings: number;
    recommendations: TaxEvent[];
    risk_score: RiskScore;
    summary: string;
    breakdown: {
        crypto_tax_impact?: number;
        real_estate_tax_impact?: number;
        cross_border_savings?: number;
    };
}

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
                case 'crypto_capital_gains':
                    const cryptoSavings = this.calculateCryptoTaxImpact(facts, 'capital_gains');
                    breakdown.crypto_tax_impact = cryptoSavings;
                    totalSavings += cryptoSavings;
                    break;

                case 'crypto_business_income_warning':
                    const cryptoCost = this.calculateCryptoTaxImpact(facts, 'business_income');
                    breakdown.crypto_tax_impact = cryptoCost;
                    // This is a cost, not savings
                    break;

                case 'anti_flipping_exemption':
                    const realEstateSavings = this.calculateRealEstateTaxImpact(facts, true);
                    breakdown.real_estate_tax_impact = realEstateSavings;
                    totalSavings += realEstateSavings;
                    break;

                case 'anti_flipping_tax':
                    const realEstateCost = this.calculateRealEstateTaxImpact(facts, false);
                    breakdown.real_estate_tax_impact = realEstateCost;
                    // This is a cost, not savings
                    break;

                case 'cross_border_warning':
                    const crossBorderSavings = this.calculateCrossBorderSavings(facts);
                    breakdown.cross_border_savings = crossBorderSavings;
                    totalSavings += crossBorderSavings;
                    break;
            }
        });

        const riskScore = this.riskAnalyzer.calculateRiskScore(facts);

        return {
            total_savings: parseFloat(totalSavings.toFixed(3)),
            recommendations: events,
            risk_score: riskScore,
            summary: this.generateSummary(events, totalSavings),
            breakdown
        };
    }

    private calculateCryptoTaxImpact(facts: TaxFacts, classification: 'capital_gains' | 'business_income'): number {
        // Estimate crypto gains (simplified - would need actual gain data)
        const estimatedGains = 10000; // Placeholder

        if (classification === 'capital_gains') {
            // 50% inclusion rate
            const taxableAmount = estimatedGains * 0.50;
            const marginalRate = this.getMarginalRate(facts.income);
            return parseFloat((estimatedGains - (taxableAmount * marginalRate)).toFixed(3));
        } else {
            // 100% inclusion rate (business income)
            const marginalRate = this.getMarginalRate(facts.income);
            return parseFloat((-(estimatedGains * marginalRate)).toFixed(3)); // Negative = cost
        }
    }

    private calculateRealEstateTaxImpact(facts: TaxFacts, exemptionApplies: boolean): number {
        // Estimate property gain (simplified - would need actual gain data)
        const estimatedGain = 50000; // Placeholder

        if (exemptionApplies) {
            // Principal residence exemption applies
            const marginalRate = this.getMarginalRate(facts.income);
            return parseFloat((estimatedGain * marginalRate).toFixed(3)); // Tax saved
        } else {
            // Anti-flipping tax: 100% business income
            const marginalRate = this.getMarginalRate(facts.income);
            return parseFloat((-(estimatedGain * marginalRate)).toFixed(3)); // Negative = cost
        }
    }

    private calculateCrossBorderSavings(facts: TaxFacts): number {
        // Foreign tax credit can reduce double taxation
        // Estimate US tax paid that can be credited
        const estimatedUSTax = 5000; // Placeholder
        return parseFloat((estimatedUSTax * 0.80).toFixed(3)); // 80% of US tax can typically be credited
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
            return "No specific specialized tax issues identified.";
        }

        const warnings = events.filter(e =>
            e.type.includes('warning') || e.params.risk_level === 'high'
        );

        if (warnings.length > 0) {
            const warningMessages = warnings.map(w => w.params.message).join(' ');
            return `⚠️ Important: ${warningMessages}`;
        }

        if (totalSavings > 0) {
            return `Potential tax savings of $${totalSavings.toLocaleString()} identified through proper classification and exemptions.`;
        }

        return "Review your specialized tax situation carefully to ensure proper reporting.";
    }
}
