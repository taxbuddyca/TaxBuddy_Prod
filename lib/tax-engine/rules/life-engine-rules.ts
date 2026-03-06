// Life Engine Rules - Personal & Family Tax Optimization
export const lifeEngineRules = [
    // ─── FAMILY OPTIMIZER ────────────────────────────────────────────────────

    // Spousal RRSP — income splitting when gap > $30k
    {
        "conditions": {
            "all": [
                { "fact": "marital_status", "operator": "in", "value": ["married", "common_law"] },
                { "fact": "income_difference", "operator": "greaterThan", "value": 30000 }
            ]
        },
        "event": {
            "type": "recommend_spousal_rrsp",
            "params": {
                "message": "Income difference is significant — contribute to a Spousal RRSP. Withdrawals are taxed in the lower earner's hands (after the 3-year attribution rule), reducing your combined tax bill.",
                "category": "family_optimizer",
                "priority": "high"
            }
        }
    },

    // Pension Splitting (Line 21000/31400) — 65+ with pension income
    {
        "conditions": {
            "all": [
                { "fact": "age", "operator": "greaterThanInclusive", "value": 65 },
                { "fact": "has_pension", "operator": "equal", "value": true },
                { "fact": "marital_status", "operator": "in", "value": ["married", "common_law"] }
            ]
        },
        "event": {
            "type": "pension_splitting",
            "params": {
                "message": "Allocate up to 50% of eligible pension income to your spouse using T1032 (Joint Election to Split Pension Income). This can drop both of you into a lower bracket.",
                "max_split": 0.5,
                "category": "family_optimizer",
                "priority": "high"
            }
        }
    },

    // Childcare Deduction — must go to lower earner (CRA rule, Line 21400)
    {
        "conditions": {
            "all": [
                { "fact": "has_children", "operator": "equal", "value": true },
                { "fact": "childcare_expenses", "operator": "greaterThan", "value": 0 }
            ]
        },
        "event": {
            "type": "childcare_allocation",
            "params": {
                "message": "Childcare expenses (Line 21400) MUST be claimed by the lower-income spouse (CRA rule). Limits: $8,000/child under 7, $5,000 ages 7–16.",
                "allocate_to": "lower_earner",
                "category": "family_optimizer",
                "priority": "high"
            }
        }
    },

    // ─── FIRST-TIME BUYER ─────────────────────────────────────────────────────

    // FHSA — First Home Savings Account for first-time buyers under 71
    {
        "conditions": {
            "all": [
                { "fact": "age", "operator": "lessThan", "value": 71 },
                { "fact": "is_first_time_buyer", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "fhsa_recommendation",
            "params": {
                "message": "Open a First Home Savings Account (FHSA). Contributions are tax-deductible (like RRSP), growth is tax-free, and withdrawals for a first home are tax-free. Annual limit $8,000, lifetime $40,000.",
                "annual_limit": 8000,
                "lifetime_limit": 40000,
                "category": "first_time_buyer",
                "priority": "high"
            }
        }
    },

    // Home Buyers' Plan — withdraw up to $35k from RRSP
    {
        "conditions": {
            "all": [
                { "fact": "is_first_time_buyer", "operator": "equal", "value": true },
                { "fact": "has_rrsp", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "home_buyers_plan",
            "params": {
                "message": "You qualify for the Home Buyers' Plan (HBP). Withdraw up to $35,000 tax-free from your RRSP toward a first home. Repay over 15 years or it's added back to your income.",
                "max_withdrawal": 35000,
                "repayment_years": 15,
                "category": "first_time_buyer",
                "priority": "high"
            }
        }
    },

    // ─── STUDENT / NEW GRAD ───────────────────────────────────────────────────

    // Tuition Carry-Forward — hold credits for higher-income years
    {
        "conditions": {
            "all": [
                { "fact": "tuition_credits_available", "operator": "greaterThan", "value": 0 },
                { "fact": "income", "operator": "lessThan", "value": 50000 }
            ]
        },
        "event": {
            "type": "tuition_carryforward_recommendation",
            "params": {
                "message": "Your income is low — tuition credits (Schedule 11) are worth more in a higher-income year. Carry them forward (or transfer up to $5,000 to a parent/grandparent) until you earn $50,000+.",
                "optimal_income_threshold": 50000,
                "max_transfer": 5000,
                "category": "student",
                "priority": "medium"
            }
        }
    },

    // Moving Expenses — must move 40+ km closer to work/school
    {
        "conditions": {
            "all": [
                { "fact": "moved_for_work", "operator": "equal", "value": true },
                { "fact": "moving_distance_km", "operator": "greaterThan", "value": 40 }
            ]
        },
        "event": {
            "type": "moving_expense_deduction",
            "params": {
                "message": "Moved 40+ km for a new job or school (CRA Form T1-M)? Deduct moving costs (truck, travel, storage) against income earned at the new location. Keep all receipts.",
                "category": "student",
                "priority": "medium"
            }
        }
    },

    // ─── CAREGIVER ────────────────────────────────────────────────────────────

    // Canada Caregiver Credit — supporting a dependent with infirmity
    {
        "conditions": {
            "all": [
                { "fact": "has_dependent_with_infirmity", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "caregiver_credit",
            "params": {
                "message": "You may qualify for the Canada Caregiver Credit (Line 30400/30450/30500) for supporting an infirm dependant. Credit up to $2,616 federally (2025). Also check provincial caregiver credits.",
                "federal_credit_2025": 2616,
                "category": "caregiver",
                "priority": "high"
            }
        }
    },

    // ─── NEWCOMER ─────────────────────────────────────────────────────────────

    // World Income Reporting — report foreign income for credits
    {
        "conditions": {
            "all": [
                { "fact": "is_newcomer", "operator": "equal", "value": true },
                { "fact": "has_foreign_income", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "newcomer_income_split",
            "params": {
                "message": "As a new resident, report income earned before your arrival date separately (T1 General, world income section). Foreign income may qualify for foreign tax credits (Form T2209) to avoid double taxation.",
                "category": "newcomer",
                "priority": "high"
            }
        }
    },

    // GST Credit — apply immediately after arriving
    {
        "conditions": {
            "all": [
                { "fact": "is_newcomer", "operator": "equal", "value": true },
                { "fact": "applied_for_gst_credit", "operator": "equal", "value": false }
            ]
        },
        "event": {
            "type": "gst_credit_reminder",
            "params": {
                "message": "Apply for GST/HST credit (RC151 form) immediately — even with zero income. Single person receives $519/year (2024–25). Married: ~$680. Each child adds ~$179. Paid quarterly.",
                "single_annual": 519,
                "married_annual": 680,
                "per_child_annual": 179,
                "category": "newcomer",
                "priority": "high"
            }
        }
    },

    // Newcomer 90% Rule Assessment
    {
        "conditions": {
            "all": [
                { "fact": "is_newcomer", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "newcomer_90_percent_rule",
            "params": {
                "message": "Assessing CRA 90% Rule for un-prorated tax credits.",
                "category": "newcomer",
                "priority": "high"
            }
        }
    }
];
