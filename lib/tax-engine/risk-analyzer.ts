import { TaxFacts } from './schemas';

export interface RiskScore {
    score: number;
    level: 'LOW' | 'MEDIUM' | 'HIGH';
    flags: RiskFlag[];
    recommendations: string[];
}

export interface RiskFlag {
    category: string;
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    points: number;
}

export class AuditRiskAnalyzer {
    private readonly RISK_THRESHOLDS = {
        LOW: 30,
        MEDIUM: 60,
        HIGH: 100
    };

    calculateRiskScore(facts: TaxFacts): RiskScore {
        const flags: RiskFlag[] = [];
        let totalScore = 0;

        // --- TIER 1: AUTOMATED TRIGGERS (95-100% Probability) ---

        // 1. T-Slip Mismatch
        if (facts.total_t_slips_income && facts.income) {
            if (facts.total_t_slips_income > facts.income) {
                const points = 100;
                totalScore += points;
                flags.push({
                    category: 'automation',
                    message: `T-Slip Mismatch (100% Probability): Reported $${facts.income.toLocaleString()} income, but CRA received T-slips for $${facts.total_t_slips_income.toLocaleString()}. The computer spots this gap instantly.`,
                    severity: 'critical',
                    points
                });
            }
        }

        // 2. GST vs Income Mismatch
        if (facts.gst_revenue && facts.revenue) {
            if (Math.abs(facts.gst_revenue - facts.revenue) > 1000) {
                const points = 99;
                totalScore += points;
                flags.push({
                    category: 'automation',
                    message: `GST vs Income Mismatch (99% Probability): Reported $${facts.revenue.toLocaleString()} on T2125 but $${facts.gst_revenue.toLocaleString()} on GST/HST return.`,
                    severity: 'critical',
                    points
                });
            }
        }

        // 3. Medical Expenses > $15k or > 20% Income
        if (facts.reported_medical_expenses) {
            const income = facts.income || facts.revenue || 0;
            const isHighMedical = facts.reported_medical_expenses > 15000 || (income > 0 && facts.reported_medical_expenses / income > 0.20);
            if (isHighMedical) {
                const points = 90;
                totalScore += points;
                flags.push({
                    category: 'automation',
                    message: `Medical Expenses Review (90% Probability): Claiming $${facts.reported_medical_expenses.toLocaleString()} in medical expenses triggers iterative "Processing Review" for receipts.`,
                    severity: 'critical',
                    points
                });
            }
        }

        // 4. 100% Vehicle Use (No 2nd car)
        if (facts.business_use_percentage === 100 && facts.num_vehicles_owned === 1) {
            const points = 95;
            totalScore += points;
            flags.push({
                category: 'automation',
                message: `100% Vehicle Use (95% Probability): Claiming 100% business use for a personal vehicle while having no second car registered.`,
                severity: 'critical',
                points
            });
        }

        // 5. Family Payroll without Remittance
        if (facts.hiring_spouse && facts.family_remittance_transfer_confirmed === false) {
            const points = 95;
            totalScore += points;
            flags.push({
                category: 'automation',
                message: `Family Payroll Risk (95% Probability): Issued T4 to spouse but business bank account shows no actual money transfer.`,
                severity: 'critical',
                points
            });
        }

        // --- TIER 2: HIGH RISK BEHAVIORAL TRIGGERS (60-80% Probability) ---

        // 6. Lifestyle Gap
        if (facts.lifestyle_gap_detected) {
            const points = 80;
            totalScore += points;
            flags.push({
                category: 'behavioral',
                message: `The "Lifestyle" Gap (80% Probability): Reported income doesn't match lifestyle (postal code average or luxury car ownership).`,
                severity: 'high',
                points
            });
        }

        // 7. Real Estate Flip (< 365 Days)
        if (facts.property_sold_within_365_days && facts.is_principal_residence_claim) {
            const points = 85;
            totalScore += points;
            flags.push({
                category: 'behavioral',
                message: `Real Estate Flip (85% Probability): Sold property in <365 days and claimed as Principal Residence instead of Business Income.`,
                severity: 'high',
                points
            });
        }

        // 8. Construction/Reno Cash Deposits
        if (facts.industry === 'Construction' && facts.cash_deposits_frequency_high) {
            const points = 75;
            totalScore += points;
            flags.push({
                category: 'behavioral',
                message: `Cash Deposit Risk (75% Probability): Frequent cash deposits just under $10k reporting limit for renovation company.`,
                severity: 'high',
                points
            });
        }

        // 9. Consecutive Business Losses
        if (facts.business_loss_years_consecutive && facts.business_loss_years_consecutive >= 3 && facts.income > 50000) {
            const points = 70;
            totalScore += points;
            flags.push({
                category: 'behavioral',
                message: `Consecutive Losses (70% Probability): Business losses for ${facts.business_loss_years_consecutive} years in a row while having full-time employment.`,
                severity: 'high',
                points
            });
        }

        // 10. Home Office > 20%
        if (facts.home_office_percentage && facts.home_office_percentage > 20) {
            const points = 65;
            totalScore += points;
            flags.push({
                category: 'behavioral',
                message: `High Home Office (65% Probability): Claiming ${facts.home_office_percentage.toFixed(3)}% of home as business. (CRA expects 5-10%).`,
                severity: 'medium',
                points
            });
        }

        // --- TIER 3: OUTLIER TRIGGERS (30-50% Probability) ---

        // 11. Meals & Ent. > 5% of Revenue
        const rev = facts.revenue || 0;
        if (facts.meals_expenses && rev > 0) {
            const mealRatio = (facts.meals_expenses / rev) * 100;
            if (mealRatio > 5) {
                const points = 50;
                totalScore += points;
                flags.push({
                    category: 'outlier',
                    message: `Meals & Ent. Outlier (50% Probability): Claims $${facts.meals_expenses.toLocaleString()} (${mealRatio.toFixed(3)}% of revenue). Industry average is ~1-2%.`,
                    severity: 'medium',
                    points
                });
            }
        }

        // 12. High Contractor Expenses without T4As
        if (facts.subcontractor_fees && facts.subcontractor_fees > 10000 && !facts.t4a_slips_issued) {
            const points = 45;
            totalScore += points;
            flags.push({
                category: 'outlier',
                message: `Subcontractor Risk (45% Probability): Claimed high fees ($${facts.subcontractor_fees.toLocaleString()}) but issued zero T4A slips.`,
                severity: 'medium',
                points
            });
        }

        // 13. Crypto Wallet Alerts
        if (facts.crypto_cashout_amount && facts.crypto_cashout_amount >= 20000 && (facts.income === 0 || !facts.crypto_trades_per_year)) {
            const points = 50;
            totalScore += points;
            flags.push({
                category: 'outlier',
                message: `Crypto Alert (50% Probability): Cashed out $${facts.crypto_cashout_amount.toLocaleString()}+ from exchange but reported $0 capital gains.`,
                severity: 'medium',
                points
            });
        }

        // 14. Donations > 20% of Income
        if (facts.donations_amount && facts.income && facts.income > 0 && (facts.donations_amount / facts.income > 0.20)) {
            const points = 40;
            totalScore += points;
            flags.push({
                category: 'outlier',
                message: `Donation Outlier (40% Probability): Claimed $${facts.donations_amount.toLocaleString()} in donations relative to $${facts.income.toLocaleString()} income.`,
                severity: 'medium',
                points
            });
        }

        // 15. Late Filing History
        if (facts.late_filing_years && facts.late_filing_years >= 2) {
            const points = 35;
            totalScore += points;
            flags.push({
                category: 'outlier',
                message: `Non-Compliant History (35% Probability): Filed late for ${facts.late_filing_years} years in a row, increasing general scrutiny.`,
                severity: 'low',
                points
            });
        }

        // --- DEATH ZONE (Specific High-Risk Numbers) ---
        if (facts.irregular_mileage_log) {
            const points = 100;
            totalScore += points;
            flags.push({
                category: 'death_zone',
                message: `Fake Mileage Log (100% Risk): Repetitive or exactly matching weekly numbers are rejected as fraudulent.`,
                severity: 'critical',
                points
            });
        }

        if (facts.unpaid_shareholder_loan) {
            const points = 90;
            totalScore += points;
            flags.push({
                category: 'death_zone',
                message: `Shareholder Loan (90% Risk): Withdrawing money from corp without repayment within 1 year makes it fully taxable.`,
                severity: 'critical',
                points
            });
        }

        if (facts.union_dues_claim_mismatch) {
            const points = 100;
            totalScore += points;
            flags.push({
                category: 'death_zone',
                message: `Union Dues Mismatch (100% Risk): Claiming dues when T4 box 44 is empty triggers instant rejection.`,
                severity: 'critical',
                points
            });
        }

        // Cap score at 100
        const finalScore = Math.min(totalScore, 100);

        return {
            score: finalScore,
            level: this.getRiskLevel(finalScore),
            flags,
            recommendations: this.generateRecommendations(finalScore, flags)
        };
    }

    private getRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
        if (score < this.RISK_THRESHOLDS.LOW) return 'LOW';
        if (score < this.RISK_THRESHOLDS.MEDIUM) return 'MEDIUM';
        return 'HIGH';
    }

    private generateRecommendations(score: number, flags: RiskFlag[]): string[] {
        const recommendations: string[] = [];

        // General recommendations based on score
        if (score > 60) {
            recommendations.push('🔴 Consider consulting with a CPA before filing to review high-risk items');
            recommendations.push('📁 Ensure all receipts and documentation are organized and readily available');
            recommendations.push('📊 Prepare detailed explanations for any unusual deductions or income patterns');
        } else if (score > 30) {
            recommendations.push('🟡 Review flagged items with a tax professional');
            recommendations.push('📋 Maintain detailed records for all deductions');
        } else {
            recommendations.push('🟢 Your tax profile appears low-risk');
            recommendations.push('✅ Continue maintaining good record-keeping practices');
        }

        // Specific recommendations based on flags
        const flagCategories = new Set(flags.map(f => f.category));

        if (flagCategories.has('automation')) {
            recommendations.push('⚠️ Immediate action required: Tier 1 flags are automated and will trigger letters.');
        }

        if (flagCategories.has('death_zone')) {
            recommendations.push('💀 Death Zone Warning: One or more entries are in the 90-100% rejection zone. Correct these before filing.');
        }

        return recommendations;
    }

    getRiskColor(level: 'LOW' | 'MEDIUM' | 'HIGH'): string {
        switch (level) {
            case 'LOW': return 'bg-green-50 border-green-200 text-green-900';
            case 'MEDIUM': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
            case 'HIGH': return 'bg-red-50 border-red-200 text-red-900';
        }
    }

    getRiskIcon(level: 'LOW' | 'MEDIUM' | 'HIGH'): string {
        switch (level) {
            case 'LOW': return '✅';
            case 'MEDIUM': return '⚠️';
            case 'HIGH': return '🚨';
        }
    }
}
