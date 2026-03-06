import { TaxFacts, TaxEvent } from '../rules-engine';
import { AuditRiskAnalyzer, RiskScore } from '../risk-analyzer';

export interface GrowthEngineResult {
    total_savings: number;
    recommendations: TaxEvent[];
    risk_score: RiskScore;
    summary: string;
    breakdown: {
        hst_quick_method_savings?: number;
        hst_regular_method_itcs?: number;
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
    };
}

// CRA 2025 Constants — Growth Engine
const CORPORATE_SBD_RATE_2025 = 0.122;        // Federal 9% + ON 3.2% SBD rate
const VEHICLE_CLASS_10_1_CAP_2025 = 37000;    // Non-EV luxury CCA cap
const VEHICLE_EV_CLASS_54_CAP_2025 = 61000;   // EV Class 54 cap
const VEHICLE_LEASE_DEDUCTION_LIMIT_2025 = 1100; // Monthly lease deduction cap (incl. tax)
const MILEAGE_RATE_FIRST_5K_2025 = 0.72;      // Per km, first 5,000 km
const MILEAGE_RATE_AFTER_5K_2025 = 0.62;      // Per km after 5,000 km
const HST_QUICK_METHOD_ON_SERVICES = 0.088;   // Ontario services: 8.8% of gross incl. HST
const HST_QUICK_METHOD_ON_GOODS = 0.018;      // Ontario goods: 1.8% of gross
const HST_RATE_ON = 0.13;                     // Ontario HST rate
const CPP_EMPLOYER_RATE_2025 = 0.0595;        // Employer CPP contribution rate

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
                case 'hst_quick_method_recommendation': {
                    const hstResult = this.calculateHSTComparison(facts);
                    breakdown.hst_quick_method_savings = hstResult.quickMethodSavings;
                    breakdown.hst_regular_method_itcs = hstResult.regularMethodITCs;
                    const netHSTSavings = Math.max(0, hstResult.quickMethodSavings - hstResult.regularMethodITCs);
                    totalSavings += netHSTSavings;
                    break;
                }
                case 'ev_class_54_writeoff': {
                    const evValue = this.calculateEVWriteoffValue(facts);
                    breakdown.ev_writeoff_value = evValue;
                    totalSavings += evValue;
                    break;
                }
                case 'spouse_salary_recommendation': {
                    const salarySavings = this.calculateSalaryVsDividendSavings(facts);
                    breakdown.salary_vs_dividend_savings = salarySavings;
                    totalSavings += salarySavings;
                    break;
                }
                case 'vehicle_ownership_warning': {
                    const vehicleResult = this.calculateVehicleMatrix(facts);
                    breakdown.vehicle_matrix = vehicleResult;
                    const vehicleSavings = Math.max(vehicleResult.corporate_net_benefit, vehicleResult.personal_reimbursement);
                    breakdown.vehicle_optimization_savings = vehicleSavings;
                    totalSavings += vehicleSavings;
                    break;
                }
            }
        });

        // Meal deductions (50% deductible — CRA rule for business meals)
        if (facts.meals_expenses && facts.meals_expenses > 0) {
            const deductibleMeals = facts.meals_expenses * 0.50;
            const mealSavings = deductibleMeals * CORPORATE_SBD_RATE_2025;
            breakdown.meal_deduction_savings = parseFloat(mealSavings.toFixed(2));
            totalSavings += mealSavings;
        }

        // Home office deductions (actual % of home expenses)
        if (facts.home_office_percentage && facts.total_home_expenses) {
            const officePercent = facts.home_office_percentage / 100; // already stored as percentage (e.g. 20 = 20%)
            const homeOfficeAmount = facts.total_home_expenses * officePercent;
            const homeOfficeSavings = homeOfficeAmount * CORPORATE_SBD_RATE_2025;
            breakdown.home_office_savings = parseFloat(homeOfficeSavings.toFixed(2));
            totalSavings += homeOfficeSavings;
        }

        const riskScore = this.riskAnalyzer.calculateRiskScore(facts);

        return {
            total_savings: parseFloat(totalSavings.toFixed(2)),
            recommendations: events,
            risk_score: riskScore,
            summary: this.generateSummary(events, totalSavings),
            breakdown
        };
    }

    /**
     * HST Quick Method vs Regular Method comparison.
     * Quick Method (ON Services): collect 13% HST, remit 8.8% of gross (incl. HST).
     * 1% credit on first $30k of gross revenue.
     * Max eligible revenue: $400,000.
     */
    private calculateHSTComparison(facts: TaxFacts): { quickMethodSavings: number; regularMethodITCs: number } {
        if (!facts.revenue) return { quickMethodSavings: 0, regularMethodITCs: 0 };

        const hstCollected = facts.revenue * HST_RATE_ON;
        const grossRevenue = facts.revenue + hstCollected;

        // Quick Method: 8.8% of gross (services in Ontario)
        const rawRemittance = grossRevenue * HST_QUICK_METHOD_ON_SERVICES;
        // 1% first-year credit on first $30k of gross revenue (incl. HST)
        const credit = Math.min(grossRevenue, 30000) * 0.01;
        const netQuickRemittance = rawRemittance - credit;
        const quickMethodSavings = parseFloat((hstCollected - netQuickRemittance).toFixed(2));

        // Regular Method: recover ITCs on eligible business expenses
        const homeOfficeExpenses = (facts.total_home_expenses || 0) * ((facts.home_office_percentage || 0) / 100);
        const totalEligibleExpenses = (facts.business_expenses || 0)
            + ((facts.meals_expenses || 0) * 0.50) // 50% meals
            + homeOfficeExpenses;
        const regularMethodITCs = parseFloat((totalEligibleExpenses * HST_RATE_ON).toFixed(2));

        return { quickMethodSavings, regularMethodITCs };
    }

    /**
     * EV Class 54 write-off value.
     * 100% CCA Year 1, half-year rule WAIVED, cap $61,000 (2025).
     */
    private calculateEVWriteoffValue(facts: TaxFacts): number {
        if (!facts.vehicle_cost) return 0;
        const eligibleAmount = Math.min(facts.vehicle_cost, VEHICLE_EV_CLASS_54_CAP_2025);
        const bizUse = (facts.business_use_percentage || 100) / 100;
        const deductibleAmount = eligibleAmount * bizUse;

        // Tax savings at corporate rate
        return parseFloat((deductibleAmount * CORPORATE_SBD_RATE_2025).toFixed(2));
    }

    /**
     * Salary vs Dividend savings for hiring spouse.
     * Uses actual marginal rates based on income rather than hardcoded values.
     */
    private calculateSalaryVsDividendSavings(facts: TaxFacts): number {
        if (!facts.hiring_spouse) return 0;

        const targetSalary = facts.target_spouse_salary || 50000;
        const ownerRate = this.getMarginalRate(facts.income || 0);
        // Spouse starts at $0 income before salary — their marginal rate on the new salary
        const spouseRate = this.getMarginalRate(targetSalary / 2); // avg marginal on first $targetSalary

        // Employer CPP cost (2025: 5.95% on earnings over $3,500)
        const cppable = Math.max(0, Math.min(targetSalary, 71300) - 3500);
        const employerCPP = cppable * CPP_EMPLOYER_RATE_2025;

        const incomeTaxSavings = targetSalary * Math.max(0, ownerRate - spouseRate);

        return parseFloat(Math.max(0, incomeTaxSavings - employerCPP).toFixed(2));
    }

    /**
     * Vehicle ownership matrix — corporate vs personal model.
     * Incorporates 2025 CRA constants: lease limit $1,100/mo, CCA caps, mileage rates.
     */
    private calculateVehicleMatrix(facts: TaxFacts): { corporate_net_benefit: number; personal_reimbursement: number; recommendation: string } {
        const isEV = facts.vehicle_type === 'zero_emission';
        const cost = facts.vehicle_cost || 0;
        const bizUse = (facts.business_use_percentage || 0) / 100;
        const isLease = facts.vehicle_financing_type === 'lease';
        const leasePayment = facts.monthly_lease_payment || 0;

        // ── Corporate Model ──
        let deduction = 0;
        if (isLease) {
            // Lease: deductible portion limited to $1,100/mo (2025)
            const deductibleMonthly = Math.min(leasePayment, VEHICLE_LEASE_DEDUCTION_LIMIT_2025);
            deduction = deductibleMonthly * 12 * bizUse;
        } else if (isEV) {
            // Class 54: 100% write-off up to $61k, half-year rule waived
            deduction = Math.min(cost, VEHICLE_EV_CLASS_54_CAP_2025) * bizUse;
        } else {
            if (cost <= VEHICLE_CLASS_10_1_CAP_2025) {
                // Class 10: 30% CCA, half-year rule applies (15% Year 1)
                deduction = cost * 0.15 * bizUse;
            } else {
                // Class 10.1: capped at $37k, 30% rate, half-year rule = 15%
                deduction = VEHICLE_CLASS_10_1_CAP_2025 * 0.15 * bizUse;
            }
        }

        const ccaSavings = deduction * CORPORATE_SBD_RATE_2025;
        const operatingSavings = (facts.vehicle_expenses || 0) * bizUse * CORPORATE_SBD_RATE_2025;
        const totalCorpTaxSavings = ccaSavings + operatingSavings;

        // Taxable Benefits (Standby Charge + Operating Benefit)
        const standbyCharge = cost * 0.02 * 12; // 2% of cost × 12 months
        const personalKm = Math.max(0, (facts.total_annual_mileage || 10000) - (facts.business_mileage || 0));
        const operatingBenefit = personalKm * 0.33; // CRA operating benefit per km 2025
        const personalTaxOnBenefits = (standbyCharge + operatingBenefit) * 0.40; // marginal rate est.
        const persBizAdjustment = 1 - bizUse;
        const adjustedBenefitTax = personalTaxOnBenefits * persBizAdjustment;

        const corporateNetBenefit = totalCorpTaxSavings - adjustedBenefitTax;

        // ── Personal Model (Mileage) ──
        const businessKm = facts.business_mileage || 0;
        // 2025: $0.72 first 5,000km, $0.62 after
        const tier1 = Math.min(businessKm, 5000) * MILEAGE_RATE_FIRST_5K_2025;
        const tier2 = Math.max(0, businessKm - 5000) * MILEAGE_RATE_AFTER_5K_2025;
        const personalReimbursement = tier1 + tier2;

        const recommendation = personalReimbursement > corporateNetBenefit
            ? `Keep vehicle personal. Tax-free CRA mileage ($0.72/km for first 5,000km, then $0.62/km) is worth $${Math.round(personalReimbursement).toLocaleString()} vs corporate net benefit of $${Math.round(corporateNetBenefit).toLocaleString()}.`
            : `Corporate model is more tax-efficient. Net tax savings of $${Math.round(corporateNetBenefit).toLocaleString()} vs personal mileage claim of $${Math.round(personalReimbursement).toLocaleString()}.`;

        return {
            corporate_net_benefit: parseFloat(corporateNetBenefit.toFixed(2)),
            personal_reimbursement: parseFloat(personalReimbursement.toFixed(2)),
            recommendation
        };
    }

    /**
     * Combined federal + ON marginal rates (same breakpoints as LifeCalculator).
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

    private generateSummary(events: TaxEvent[], totalSavings: number): string {
        if (events.length === 0) {
            return 'No specific business tax optimization opportunities identified. Ensure you\'re tracking all deductible expenses with receipts.';
        }

        const strategies = events.map(e => {
            switch (e.type) {
                case 'hst_registration_required': return 'mandatory HST registration';
                case 'hst_quick_method_recommendation': return 'HST Quick Method';
                case 'ev_class_54_writeoff': return 'EV Class 54 write-off';
                case 'spouse_salary_recommendation': return 'salary-based spousal compensation';
                case 'tosi_warning': return 'TOSI compliance action required';
                case 'tosi_exemption': return 'TOSI exemption (spouse 65+)';
                case 'vehicle_ownership_warning': return 'vehicle ownership optimization';
                case 'luxury_tax_warning': return 'Class 10.1 CCA cap planning';
                default: return e.params.category;
            }
        });

        if (totalSavings > 0) {
            return `By implementing ${strategies.join(', ')}, your business could save approximately $${Math.round(totalSavings).toLocaleString()} annually.`;
        }

        return `Review these strategies: ${strategies.join(', ')}.`;
    }
}
