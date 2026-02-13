import { test, expect } from '@playwright/test';
import { AuditRiskAnalyzer } from '../lib/tax-engine/risk-analyzer';
import { TaxFacts } from '../lib/tax-engine/schemas';

test.describe('AuditRiskAnalyzer - Advanced Triggers', () => {
    const analyzer = new AuditRiskAnalyzer();

    const baseFacts: TaxFacts = {
        income: 50000,
        province: 'ON',
        revenue: 100000
    };

    test('Tier 1: T-Slip Mismatch (100% Probability)', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            total_t_slips_income: 52000 // Higher than reported income
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(100);
        expect(risk.flags.some(f => f.message.includes('T-Slip Mismatch'))).toBe(true);
    });

    test('Tier 1: 100% Vehicle Use without 2nd car', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            business_use_percentage: 100,
            num_vehicles_owned: 1
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(95);
        expect(risk.flags.some(f => f.message.includes('100% Vehicle Use'))).toBe(true);
    });

    test('Tier 2: Real Estate Flip (< 365 Days)', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            property_sold_within_365_days: true,
            is_principal_residence_claim: true
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(85);
        expect(risk.flags.some(f => f.message.includes('Real Estate Flip'))).toBe(true);
    });

    test('Tier 2: High Home Office (> 20%)', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            home_office_percentage: 35
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(65);
        expect(risk.flags.some(f => f.message.includes('High Home Office'))).toBe(true);
    });

    test('Tier 3: Meals & Ent Outlier (> 5%)', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            meals_expenses: 12000 // 12% of 100k revenue
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(50);
        expect(risk.flags.some(f => f.message.includes('Meals & Ent. Outlier'))).toBe(true);
    });

    test('Death Zone: Repetitive Mileage Log', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            irregular_mileage_log: true
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(100);
        expect(risk.flags.some(f => f.category === 'death_zone')).toBe(true);
    });

    test('Cumulative Risk Score Cap', () => {
        const facts: TaxFacts = {
            ...baseFacts,
            total_t_slips_income: 52000, // 100 points
            irregular_mileage_log: true, // 100 points
            unpaid_shareholder_loan: true // 90 points
        };
        const risk = analyzer.calculateRiskScore(facts);
        expect(risk.score).toBe(100); // Should be capped at 100
        expect(risk.level).toBe('HIGH');
    });
});
