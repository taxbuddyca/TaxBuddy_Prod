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
        vehicle_matrix?: {
            corporate_net_benefit: number;
            personal_reimbursement: number;
            recommendation: string;
        };
        meal_deduction_savings?: number;
        home_office_savings?: number;
        hst_regular_method_itcs?: number;
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
                    const hstResult = this.calculateHSTComparison(facts);
                    breakdown.hst_quick_method_savings = hstResult.quickMethodSavings;
                    breakdown.hst_regular_method_itcs = hstResult.regularMethodITCs;
                    totalSavings += Math.max(0, hstResult.quickMethodSavings - hstResult.regularMethodITCs);
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
                    const vehicleResult = this.calculateVehicleMatrix(facts);
                    breakdown.vehicle_matrix = vehicleResult;
                    breakdown.vehicle_optimization_savings = Math.max(vehicleResult.corporate_net_benefit, vehicleResult.personal_reimbursement);
                    totalSavings += breakdown.vehicle_optimization_savings;
                    break;
            }
        });

        // Add deduction-specific savings even if they don't trigger a specific rule
        // Add deduction-specific savings even if they don't trigger a specific rule
        if (facts.meals_expenses) {
            const mealSavings = facts.meals_expenses * 0.50 * 0.125;
            breakdown.meal_deduction_savings = parseFloat(mealSavings.toFixed(3));
            totalSavings += mealSavings;
        }

        if (facts.home_office_percentage && facts.total_home_expenses) {
            const homeOfficeSavings = (facts.total_home_expenses * facts.home_office_percentage / 100) * 0.125;
            breakdown.home_office_savings = parseFloat(homeOfficeSavings.toFixed(3));
            totalSavings += homeOfficeSavings;
        }

        const riskScore = this.riskAnalyzer.calculateRiskScore(facts);

        return {
            total_savings: parseFloat(totalSavings.toFixed(3)),
            recommendations: events,
            risk_score: riskScore,
            summary: this.generateSummary(events, totalSavings),
            breakdown
        };
    }

    private calculateHSTComparison(facts: TaxFacts): { quickMethodSavings: number; regularMethodITCs: number } {
        if (!facts.revenue) return { quickMethodSavings: 0, regularMethodITCs: 0 };

        // 1. Quick Method (Ontario Service Rate: 8.8% on Gross Revenue)
        const hstCollected = facts.revenue * 0.13;
        const grossRevenue = facts.revenue + hstCollected;

        // Remittance = 8.8% of gross
        const rawRemittance = grossRevenue * 0.088;

        // 1% credit on first 30k of gross (incl. tax)
        const credit = Math.min(grossRevenue, 30000) * 0.01;

        const netQuickRemittance = rawRemittance - credit;
        const quickMethodSavings = hstCollected - netQuickRemittance;

        // 2. Regular Method ITCs (Input Tax Credits)
        // ITCs = (Business Expenses + 50% Meals + Home Office portion) * 0.13
        const homeOfficeExpenses = (facts.total_home_expenses || 0) * ((facts.home_office_percentage || 0) / 100);
        const totalEligibleExpenses = (facts.business_expenses || 0) + ((facts.meals_expenses || 0) * 0.5) + homeOfficeExpenses;
        const regularMethodITCs = totalEligibleExpenses * 0.13;

        return {
            quickMethodSavings: parseFloat(quickMethodSavings.toFixed(3)),
            regularMethodITCs: parseFloat(regularMethodITCs.toFixed(3))
        };
    }

    private calculateEVWriteoffValue(facts: TaxFacts): number {
        if (!facts.vehicle_cost) return 0;

        // Class 54: 100% CCA in year 1 for EVs up to $61k
        const eligibleAmount = Math.min(facts.vehicle_cost, 61000);
        const corporateRate = 0.125; // 12.5% small business rate

        return parseFloat((eligibleAmount * corporateRate).toFixed(3));
    }

    private calculateSalaryVsDividendSavings(facts: TaxFacts): number {
        if (!facts.hiring_spouse) return 0;

        const targetSalary = facts.target_spouse_salary || 40000;

        // If owner is in high bracket (assume 45%) and spouse is in low (assume 20%)
        // Savings = Salary * (OwnerRate - SpouseRate)
        const ownerRate = 0.45;
        const spouseRate = 0.20;

        // Also account for payroll tax cost (employer portion of CPP ~5.95%)
        const payrollTaxCost = targetSalary * 0.0595;

        const incomeTaxSavings = targetSalary * (ownerRate - spouseRate);

        return Math.max(0, incomeTaxSavings - payrollTaxCost);
    }

    private calculateVehicleMatrix(facts: TaxFacts): any {
        const isEV = facts.vehicle_type === 'zero_emission';
        const cost = facts.vehicle_cost || 0;
        const bizUse = (facts.business_use_percentage || 0) / 100;
        const isLease = facts.vehicle_financing_type === 'lease';
        const leasePayment = facts.monthly_lease_payment || 0;

        // 1. Corporate Model (Buy or Lease)
        let deduction = 0;
        if (isLease) {
            // Lease limit: $950/mo + tax (simplified)
            const deductibleLease = Math.min(leasePayment, 950);
            deduction = deductibleLease * 12 * bizUse;
        } else {
            // Purchase CCA
            if (isEV) {
                deduction = Math.min(cost, 61000) * bizUse; // 100% write-off
            } else {
                deduction = Math.min(cost, 37000) * 0.30 * 0.5 * bizUse; // 30% rate, half-year
            }
        }

        const ccaOrLeaseSavings = deduction * 0.125; // 12.5% corp rate
        const operatingSavings = (facts.vehicle_expenses || 0) * bizUse * 0.125;
        const totalCorpTaxSavings = ccaOrLeaseSavings + operatingSavings;

        // Taxable Benefits
        const standbyCharge = cost * 0.02 * 12;
        const operatingBenefit = (facts.total_annual_mileage || 10000) * 0.33;
        const personalTaxOnBenefits = (standbyCharge + operatingBenefit) * (1 - bizUse) * 0.40;

        const corporateNetBenefit = totalCorpTaxSavings - personalTaxOnBenefits;

        // 2. Personal Model (Mileage)
        const personalReimbursement = (facts.business_mileage || 0) * 0.70;

        let recommendation = "";
        if (personalReimbursement > corporateNetBenefit) {
            recommendation = "Keep vehicle personal and pay mileage per km. It's more tax-efficient.";
        } else {
            recommendation = "Put vehicle in corporation. Tax write-offs outweigh the personal benefit tax.";
        }

        return {
            corporate_net_benefit: parseFloat(corporateNetBenefit.toFixed(3)),
            personal_reimbursement: parseFloat(personalReimbursement.toFixed(3)),
            recommendation
        };
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
