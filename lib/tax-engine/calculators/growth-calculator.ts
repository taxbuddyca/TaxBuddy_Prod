import { TaxFacts, TaxEvent } from '../rules-engine';
import { AuditRiskAnalyzer, RiskScore } from '../risk-analyzer';

export interface GrowthEngineResult {
    total_savings: number;
    recommendations: TaxEvent[];
    risk_score: RiskScore;
    summary: string;
    breakdown: {
        hst_quick_method_savings?: number;
        ev_writeoff_value?: number;
        salary_vs_dividend_savings?: number;
        vehicle_optimization_savings?: number;
    };
}

export class GrowthCalculator {
    private riskAnalyzer: AuditRiskAnalyzer;

    constructor() {
        this.riskAnalyzer = new AuditRiskAnalyzer();
    }

    calculate(facts: TaxFacts, events: TaxEvent[]): GrowthEngineResult {
        const breakdown: GrowthEngineResult['breakdown'] = {};
        let totalSavings = 0;

        events.forEach(event => {
            switch (event.type) {
                case 'hst_quick_method_recommendation':
                    const hstSavings = this.calculateHSTQuickMethodSavings(facts);
                    breakdown.hst_quick_method_savings = hstSavings;
                    totalSavings += hstSavings;
                    break;

                case 'ev_class_54_writeoff':
                    const evValue = this.calculateEVWriteoffValue(facts);
                    breakdown.ev_writeoff_value = evValue;
                    totalSavings += evValue;
                    break;

                case 'spouse_salary_recommendation':
                    const salarySavings = this.calculateSalaryVsDividendSavings(facts);
                    breakdown.salary_vs_dividend_savings = salarySavings;
                    totalSavings += salarySavings;
                    break;

                case 'vehicle_ownership_warning':
                    const vehicleSavings = this.calculateVehicleOptimizationSavings(facts);
                    breakdown.vehicle_optimization_savings = vehicleSavings;
                    totalSavings += vehicleSavings;
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

    private calculateHSTQuickMethodSavings(facts: TaxFacts): number {
        if (!facts.revenue) return 0;

        // Quick Method saves ~3% of revenue for service businesses
        return facts.revenue * 0.03;
    }

    private calculateEVWriteoffValue(facts: TaxFacts): number {
        if (!facts.vehicle_cost) return 0;

        // Class 54: 100% CCA in year 1 for EVs up to $61k
        const eligibleAmount = Math.min(facts.vehicle_cost, 61000);
        const corporateRate = 0.125; // 12.5% small business rate

        return eligibleAmount * corporateRate;
    }

    private calculateSalaryVsDividendSavings(facts: TaxFacts): number {
        if (!facts.spouse_income) return 0;

        // Estimate reasonable salary vs dividend tax difference
        const reasonableSalary = 40000; // Estimate
        const dividendTax = reasonableSalary * 0.48; // TOSI rate
        const salaryTax = reasonableSalary * 0.25; // Lower marginal rate

        return dividendTax - salaryTax;
    }

    private calculateVehicleOptimizationSavings(facts: TaxFacts): number {
        if (!facts.vehicle_cost || !facts.business_use_percentage) return 0;

        // Savings from avoiding taxable benefit
        const standbyCharge = facts.vehicle_cost * 0.02 * 12; // 2% per month
        const operatingBenefit = 3000; // Estimated annual
        const totalBenefit = standbyCharge + operatingBenefit;

        return totalBenefit * 0.30; // Tax on benefit avoided
    }

    private generateSummary(events: TaxEvent[], totalSavings: number): string {
        if (events.length === 0) {
            return "No specific business tax optimization opportunities identified.";
        }

        const strategies = events.map(e => {
            switch (e.type) {
                case 'hst_quick_method_recommendation':
                    return 'HST Quick Method';
                case 'ev_class_54_writeoff':
                    return 'EV Class 54 write-off';
                case 'spouse_salary_recommendation':
                    return 'salary-based compensation';
                case 'tosi_warning':
                    return 'TOSI compliance';
                case 'vehicle_ownership_warning':
                    return 'vehicle ownership optimization';
                default:
                    return e.params.category;
            }
        });

        if (totalSavings > 0) {
            return `By implementing ${strategies.join(', ')}, your business could save approximately $${totalSavings.toLocaleString()} annually.`;
        }

        return `Consider these business strategies: ${strategies.join(', ')}.`;
    }
}
