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
    foreign_income: z.number().min(0).optional(),
    canadian_income: z.number().min(0).optional(),
    moved_to_canada_for_work: z.boolean().optional(),
    is_newcomer: z.boolean().optional(),
    applied_for_gst_credit: z.boolean().optional(),
    spouse_income: z.number().min(0).optional(),
    is_first_time_buyer: z.boolean().optional(),
    has_rrsp: z.boolean().optional(),
    has_dependent_with_infirmity: z.boolean().optional(),

    // Underused Housing Tax
    is_vacant_property: z.boolean().optional(),
    property_assessed_value: z.number().min(0).optional(),

    // Growth Engine facts
    hiring_spouse: z.boolean().optional(),
    spouse_hours_per_week: z.number().min(0).optional(),
    spouse_age: z.number().min(0).optional(),
    target_spouse_salary: z.number().min(0).optional(),
    business_expenses: z.number().min(0).optional(),
    revenue: z.number().min(0).optional(),
    industry: z.string().optional(),
    vehicle_type: z.enum(['zero_emission', 'gas', 'hybrid']).optional(),
    vehicle_cost: z.number().min(0).optional(),
    vehicle_financing_type: z.enum(['lease', 'purchase']).optional(),
    monthly_lease_payment: z.number().min(0).optional(),
    total_annual_mileage: z.number().min(0).optional(),
    business_mileage: z.number().min(0).optional(),
    business_use_percentage: z.number().min(0).max(100).optional(),

    // Niche Engine facts
    crypto_trades_per_year: z.number().min(0).optional(),
    average_holding_period_days: z.number().min(0).optional(),
    crypto_gains_amount: z.number().min(0).optional(),
    // Real Estate Flips
    property_ownership_days: z.number().min(0).optional(),
    sale_reason: z.enum(['safety', 'death', 'job_change', 'disability', 'divorce', 'other']).optional(),
    property_sale_gain: z.number().optional(), // Expected profit/gain from the sale
    properties_sold_in_year: z.number().min(0).optional(),
    has_us_income: z.boolean().optional(),
    filed_us_taxes: z.boolean().optional(),

    // Risk factors
    meals_expenses: z.number().min(0).optional(),
    home_office_percentage: z.number().min(0).max(100).optional(),
    total_home_expenses: z.number().min(0).optional(),
    vehicle_expenses: z.number().min(0).optional(),
    cash_revenue_percentage: z.number().min(0).max(100).optional(),

    // ─── INCOME VERIFICATION ────────────────────────────────────────────────
    gst_revenue: z.number().min(0).optional(),              // Revenue on GST/HST return
    total_t_slips_income: z.number().min(0).optional(),     // Sum of all T4/T5/T3/T5013 slips
    reported_t5_income: z.number().min(0).optional(),       // Investment income on T5 slips
    unreported_income_suspected: z.boolean().optional(),    // CRA tip / known discrepancy
    platform_income: z.number().min(0).optional(),          // Uber/Airbnb/Etsy/Fiverr etc.
    platform_income_reported: z.boolean().optional(),       // Whether platform income declared
    rental_income: z.number().min(0).optional(),            // Gross rental receipts
    rental_income_reported: z.boolean().optional(),         // Whether rental income declared
    income_change_percent_yoy: z.number().optional(),       // % change in income year-over-year (negative = drop)

    // ─── BUSINESS / EXPENSE RATIOS ──────────────────────────────────────────
    num_vehicles_owned: z.number().int().min(0).optional(),
    family_remittance_transfer_confirmed: z.boolean().optional(),
    lifestyle_gap_detected: z.boolean().optional(),
    cash_deposits_frequency_high: z.boolean().optional(),
    business_loss_years_consecutive: z.number().int().min(0).optional(),
    subcontractor_fees: z.number().min(0).optional(),
    t4a_slips_issued: z.boolean().optional(),
    donations_amount: z.number().min(0).optional(),
    late_filing_years: z.number().int().min(0).optional(),
    irregular_mileage_log: z.boolean().optional(),
    unpaid_shareholder_loan: z.boolean().optional(),
    union_dues_claim_mismatch: z.boolean().optional(),
    gst_refund_claim_new_registrant: z.boolean().optional(), // GST refund claimed in first year
    worker_misclassification_suspected: z.boolean().optional(), // Paying contractors who act like employees
    num_t4a_contractors: z.number().int().min(0).optional(), // Number of T4A contractors
    reported_medical_expenses: z.number().min(0).optional(),

    // ─── REAL ESTATE ────────────────────────────────────────────────────────
    property_sold_within_365_days: z.boolean().optional(),
    is_principal_residence_claim: z.boolean().optional(),
    num_properties_owned: z.number().int().min(0).optional(), // Total properties owned
    airbnb_rental_days: z.number().min(0).optional(),        // Days rented on platform

    // ─── CRYPTO & DIGITAL ASSETS ────────────────────────────────────────────
    crypto_cashout_amount: z.number().min(0).optional(),     // Amount cashed out from exchanges
    crypto_gains_reported: z.boolean().optional(),           // Whether gains declared on return

    // ─── INTERNATIONAL / OFFSHORE ───────────────────────────────────────────
    foreign_assets_over_100k: z.boolean().optional(),        // T1135 required if CAD > $100k
    t1135_filed: z.boolean().optional(),                     // Whether T1135 was filed
    has_offshore_accounts: z.boolean().optional(),           // Bank accounts outside Canada

    // ─── HIGH-RISK INDICATORS ───────────────────────────────────────────────
    aggressive_tax_shelter_claimed: z.boolean().optional(),  // GLGI, leveraged donation schemes etc.
    repeated_cra_reassessments: z.boolean().optional(),      // Prior reassessments on file
    shareholder_benefits_not_reported: z.boolean().optional(), // Corp paid personal expenses as business
    salary_below_minimum_wage: z.boolean().optional(),       // Corp pays owner less than min wage (split income flag)
});

export type TaxFacts = z.infer<typeof TaxFactsSchema>;

export const CalculateRequestSchema = z.object({
    brainType: z.enum(['life', 'growth', 'niche']),
    facts: TaxFactsSchema,
});

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;
