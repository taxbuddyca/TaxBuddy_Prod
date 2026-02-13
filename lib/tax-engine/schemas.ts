import { z } from 'zod';

export const TaxFactsSchema = z.object({
    // Common facts
    income: z.number().min(0),
    province: z.string(),

    // Life Engine facts
    marital_status: z.enum(['single', 'married', 'common_law']).optional(),
    income_difference: z.number().optional(),
    age: z.number().min(0).optional(),
    has_pension: z.boolean().optional(),
    has_children: z.boolean().optional(),
    childcare_expenses: z.number().min(0).optional(),
    tuition_credits_available: z.number().min(0).optional(),
    moved_for_work: z.boolean().optional(),
    moving_distance_km: z.number().min(0).optional(),
    arrival_date: z.string().optional(),
    has_foreign_income: z.boolean().optional(),
    is_newcomer: z.boolean().optional(),
    applied_for_gst_credit: z.boolean().optional(),
    spouse_income: z.number().min(0).optional(),

    // Growth Engine facts
    hiring_spouse: z.boolean().optional(),
    spouse_hours_per_week: z.number().min(0).optional(),
    spouse_age: z.number().min(0).optional(),
    business_expenses: z.number().min(0).optional(),
    revenue: z.number().min(0).optional(),
    industry: z.string().optional(),
    vehicle_type: z.enum(['zero_emission', 'gas', 'hybrid']).optional(),
    vehicle_cost: z.number().min(0).optional(),
    business_use_percentage: z.number().min(0).max(100).optional(),

    // Niche Engine facts
    crypto_trades_per_year: z.number().min(0).optional(),
    average_holding_period_days: z.number().min(0).optional(),
    property_ownership_days: z.number().min(0).optional(),
    sale_reason: z.enum(['safety', 'death', 'job_change', 'disability', 'divorce', 'other']).optional(),
    properties_sold_in_year: z.number().min(0).optional(),
    has_us_income: z.boolean().optional(),
    filed_us_taxes: z.boolean().optional(),

    // Risk factors
    meals_expenses: z.number().min(0).optional(),
    home_office_percentage: z.number().min(0).max(100).optional(),
    vehicle_expenses: z.number().min(0).optional(),
    cash_revenue_percentage: z.number().min(0).max(100).optional(),
});

export type TaxFacts = z.infer<typeof TaxFactsSchema>;

export const CalculateRequestSchema = z.object({
    brainType: z.enum(['life', 'growth', 'niche']),
    facts: TaxFactsSchema,
});

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;
