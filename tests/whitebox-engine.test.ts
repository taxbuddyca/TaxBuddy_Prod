import { test, expect } from '@playwright/test';
import { TaxRulesEngine } from '../lib/tax-engine/rules-engine';
import { GrowthCalculator } from '../lib/tax-engine/calculators/growth-calculator';
import { AuditRiskAnalyzer } from '../lib/tax-engine/risk-analyzer';
import { TaxFacts } from '../lib/tax-engine/schemas';

test.describe('Tax Engine Whitebox Testing', () => {
    const rulesEngine = new TaxRulesEngine();
    const growthCalc = new GrowthCalculator();
    const riskAnalyzer = new AuditRiskAnalyzer();

    const minimalFacts: TaxFacts = {
        income: 50000,
        province: 'ON'
    };

    test('Engine stability with minimal facts', async () => {
        // Should not crash even with most facts missing
        const events = await rulesEngine.evaluate('growth', minimalFacts);
        const results = growthCalc.calculate(minimalFacts, events);

        expect(results.total_savings).toBe(0.000);
        expect(results.risk_score.score).toBe(0);
    });

    test('Division by zero protection in RiskAnalyzer', () => {
        const zeroFacts: TaxFacts = {
            ...minimalFacts,
            revenue: 0,
            income: 0,
            meals_expenses: 5000,
            reported_medical_expenses: 10000,
            donations_amount: 5000
        };

        // This would have crashed before if denominators weren't checked
        const risk = riskAnalyzer.calculateRiskScore(zeroFacts);
        expect(risk.score).toBeDefined();
        // Since revenue is 0, mealRatio calculation is skipped
        expect(risk.flags.some(f => f.category === 'outlier')).toBe(false);
    });

    test('Precision: HST Remittance Credit Cap', () => {
        const highRevFacts: TaxFacts = {
            ...minimalFacts,
            revenue: 10000000 // $10M
        };

        // HST Collected = 1.3M
        // Gross = 11.3M
        // Remittance = 11.3M * 0.088 = 994,400
        // Credit = min(11.3M, 30000) * 0.01 = 300
        // Net Remittance = 994,100
        // Savings = 1,300,000 - 994,100 = 305,900

        const events = [{ type: 'hst_quick_method_recommendation', params: { message: '', category: 'tax', priority: 'high' } }] as any;
        const results = growthCalc.calculate(highRevFacts, events);

        expect(results.breakdown.hst_quick_method_savings).toBe(305900.000);
    });

    test('Boundary: Retirement Age (65)', () => {
        // Spouse age 64 vs 65 usually affects TOSI rules (simplified in our logic)
        // Currently our rules-engine handles rule matching, calculator just does math if rule matched
        const facts64: TaxFacts = { ...minimalFacts, hiring_spouse: true, spouse_age: 64, target_spouse_salary: 50000 };
        const facts65: TaxFacts = { ...minimalFacts, hiring_spouse: true, spouse_age: 65, target_spouse_salary: 50000 };

        const savings64 = growthCalc.calculate(facts64, []); // No rules matched, manual calc anyway?
        // Actually growth-calculator has a specific case for spouse salary
        const calc64 = growthCalc['calculateSalaryVsDividendSavings'](facts64);
        const calc65 = growthCalc['calculateSalaryVsDividendSavings'](facts65);

        // Currently the math formula in growth-calculator.ts doesn't differentiate age, 
        // the RULES determine IF the recommendation is shown.
        expect(calc64).toBe(calc65);
    });

    test('Logic: Inconsistent Mileage (Biz > Total)', () => {
        const inconsistentFacts: TaxFacts = {
            ...minimalFacts,
            total_annual_mileage: 10000,
            business_mileage: 15000 // Error in user input
        };

        const results = growthCalc.calculate(inconsistentFacts, [{ type: 'vehicle_ownership_warning', params: { message: '', category: 'tax', priority: 'medium' } }] as any);

        // business_use_percentage should be calculated. 15000/10000 = 150%?
        // GrowthEngine.tsx frontend usually caps this, let's see what backend does.
        // GrowthCalculator: const bizUse = (facts.business_use_percentage || 0) / 100;
        // The percentage is calculated in the FRONTEND in GrowthEngine.tsx:431
        // If it's passed directly as > 100, we should ensure logic doesn't blow up.

        const factsWithHighPercent: TaxFacts = { ...minimalFacts, business_use_percentage: 150 };
        const resultsHigh = growthCalc.calculate(factsWithHighPercent, [{ type: 'vehicle_ownership_warning', params: { message: '', category: 'tax', priority: 'medium' } }] as any);

        expect(resultsHigh.total_savings).toBeGreaterThan(0);
    });

    test('Rounding: Cumulative fixed(3) check across all engines', async () => {
        const messyFacts: TaxFacts = {
            ...minimalFacts,
            revenue: 100000.333333,
            business_expenses: 20000.666666,
            meals_expenses: 1234.5678,
            income_difference: 12345.6789,
            childcare_expenses: 5432.1098
        };

        // Growth (already verified but keep for consistency)
        const growthResults = growthCalc.calculate(messyFacts, [{ type: 'hst_quick_method_recommendation', params: { message: '', category: 'tax', priority: 'high' } }] as any);
        expect(Number.isInteger(growthResults.total_savings * 1000)).toBe(true);

        // Life
        const lifeResults = new (await import('../lib/tax-engine/calculators/life-calculator')).LifeCalculator().calculate(messyFacts, [{ type: 'childcare_allocation', params: { message: '', category: 'tax', priority: 'high' } }] as any);
        expect(Number.isInteger(lifeResults.total_savings * 1000)).toBe(true);

        // Niche
        const nicheResults = new (await import('../lib/tax-engine/calculators/niche-calculator')).NicheCalculator().calculate(messyFacts, [{ type: 'crypto_capital_gains', params: { message: '', category: 'tax', priority: 'high' } }] as any);
        expect(Number.isInteger(nicheResults.total_savings * 1000)).toBe(true);
    });

    test('Rule Engine: Brain Selection Logic', () => {
        const lifeOnly = minimalFacts;
        const growthFacts = { ...minimalFacts, revenue: 100 };
        const nicheFacts = { ...minimalFacts, crypto_trades_per_year: 5 };

        expect(rulesEngine.determinePrimaryBrain(lifeOnly)).toBe('life');
        expect(rulesEngine.determinePrimaryBrain(growthFacts)).toBe('growth');
        expect(rulesEngine.determinePrimaryBrain(nicheFacts)).toBe('niche');
    });
});
