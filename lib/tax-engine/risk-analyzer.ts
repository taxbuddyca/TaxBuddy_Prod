import { TaxFacts } from './rules-engine';

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

        console.log('AuditRiskAnalyzer: Analyzing facts:', JSON.stringify(facts, null, 2));

        // Analyze meal expenses
        const baseRevenue = facts.revenue || facts.income;
        if (facts.meals_expenses && baseRevenue) {
            const mealPercentage = facts.meals_expenses / baseRevenue;
            if (mealPercentage >= 0.10) {
                const points = 35;
                totalScore += points;
                flags.push({
                    category: 'meals',
                    message: `Meal expenses (${(mealPercentage * 100).toFixed(1)}%) >= 10% of revenue triggers CRA flags. Recommend reducing or verifying receipts.`,
                    severity: 'high',
                    points
                });
            }
        }

        // Analyze home office deduction
        if (facts.home_office_percentage) {
            if (facts.home_office_percentage >= 0.20) {
                const points = 30; // Increased to hit MEDIUM alone
                totalScore += points;
                flags.push({
                    category: 'home_office',
                    message: `Home office deduction (${(facts.home_office_percentage * 100).toFixed(0)}%) >= 20% may require justification and floor plan.`,
                    severity: 'medium',
                    points
                });
            }
        }

        // Analyze vehicle expenses with low business use
        if (facts.vehicle_expenses && facts.business_use_percentage) {
            if (facts.business_use_percentage <= 0.50 && facts.vehicle_expenses >= 5000) {
                const points = 30; // Increased to hit MEDIUM alone
                totalScore += points;
                flags.push({
                    category: 'vehicle',
                    message: `Low business use (${(facts.business_use_percentage * 100).toFixed(0)}%) with high vehicle expenses ($${facts.vehicle_expenses.toLocaleString()}) may be challenged.`,
                    severity: 'high',
                    points
                });
            }
        }

        // Analyze cash-heavy business
        if (facts.cash_revenue_percentage) {
            if (facts.cash_revenue_percentage >= 0.30) {
                const points = 35;
                totalScore += points;
                flags.push({
                    category: 'cash_revenue',
                    message: `Cash-heavy business (${(facts.cash_revenue_percentage * 100).toFixed(0)}% cash) increases audit likelihood. Maintain detailed records.`,
                    severity: 'critical',
                    points
                });
            }
        }

        // Analyze crypto trading frequency
        if (facts.crypto_trades_per_year) {
            if (facts.crypto_trades_per_year >= 100) {
                const points = 20;
                totalScore += points;
                flags.push({
                    category: 'crypto',
                    message: `High-frequency crypto trading (${facts.crypto_trades_per_year} trades/year) may be classified as business income (100% taxable).`,
                    severity: 'medium',
                    points
                });
            }
        }

        // Analyze real estate flipping
        if (facts.properties_sold_in_year) {
            if (facts.properties_sold_in_year >= 2) {
                const points = 40;
                totalScore += points;
                flags.push({
                    category: 'real_estate',
                    message: `Multiple property sales (${facts.properties_sold_in_year} properties) may indicate business activity. All profits could be taxed as business income.`,
                    severity: 'critical',
                    points
                });
            }
        }

        // Analyze TOSI risk (spouse/family dividends)
        if (facts.hiring_spouse && facts.spouse_hours_per_week) {
            if (facts.spouse_hours_per_week < 20) {
                const points = 35;
                totalScore += points;
                flags.push({
                    category: 'tosi',
                    message: `Spouse works <20 hours/week. Dividend payments subject to TOSI (Tax on Split Income) at highest marginal rate.`,
                    severity: 'critical',
                    points
                });
            }
        }

        // Analyze cross-border income
        if (facts.has_us_income && !facts.filed_us_taxes) {
            const points = 35;
            totalScore += points;
            flags.push({
                category: 'cross_border',
                message: `US income without US tax filing may trigger IRS and CRA scrutiny. File both returns to claim foreign tax credits.`,
                severity: 'critical',
                points
            });
        }

        // Cap score at 100
        const finalScore = Math.min(totalScore, 100);
        console.log(`AuditRiskAnalyzer: Final Score: ${finalScore}, Risk Level: ${this.getRiskLevel(finalScore)}`);

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

        if (flagCategories.has('meals')) {
            recommendations.push('🍽️ Keep detailed meal receipts with business purpose noted');
            recommendations.push('📝 Consider reducing meal deductions to <10% of revenue');
        }

        if (flagCategories.has('home_office')) {
            recommendations.push('🏠 Prepare floor plan showing dedicated office space');
            recommendations.push('📐 Calculate square footage accurately and keep utility bills');
        }

        if (flagCategories.has('vehicle')) {
            recommendations.push('🚗 Maintain detailed mileage log (date, destination, purpose, km)');
            recommendations.push('⛽ Keep all fuel and maintenance receipts');
        }

        if (flagCategories.has('crypto')) {
            recommendations.push('₿ Maintain detailed transaction logs for all crypto trades');
            recommendations.push('📊 Use crypto tax software (e.g., Koinly, CoinTracker) for accurate reporting');
        }

        if (flagCategories.has('real_estate')) {
            recommendations.push('🏘️ Document intention to hold property long-term (if applicable)');
            recommendations.push('📄 Keep records of all property-related expenses and improvements');
        }

        if (flagCategories.has('tosi')) {
            recommendations.push('👥 Pay spouse via T4 salary instead of dividends');
            recommendations.push('⏰ Increase spouse working hours to 20+/week or document reasonableness');
        }

        if (flagCategories.has('cross_border')) {
            recommendations.push('🌎 File both US and Canadian tax returns');
            recommendations.push('💰 Claim foreign tax credits to avoid double taxation');
        }

        return recommendations;
    }

    // Helper method to get risk color for UI
    getRiskColor(level: 'LOW' | 'MEDIUM' | 'HIGH'): string {
        switch (level) {
            case 'LOW':
                return 'bg-green-50 border-green-200 text-green-900';
            case 'MEDIUM':
                return 'bg-yellow-50 border-yellow-200 text-yellow-900';
            case 'HIGH':
                return 'bg-red-50 border-red-200 text-red-900';
        }
    }

    // Helper method to get risk icon
    getRiskIcon(level: 'LOW' | 'MEDIUM' | 'HIGH'): string {
        switch (level) {
            case 'LOW':
                return '✅';
            case 'MEDIUM':
                return '⚠️';
            case 'HIGH':
                return '🚨';
        }
    }
}
