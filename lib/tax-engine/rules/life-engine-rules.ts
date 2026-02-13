// Life Engine Rules - Personal & Family Tax Optimization
export const lifeEngineRules = [
    // Scenario A: Family Optimizer - Spousal RRSP Loan
    {
        "conditions": {
            "all": [
                { "fact": "marital_status", "operator": "equal", "value": "married" },
                { "fact": "income_difference", "operator": "greaterThan", "value": 30000 }
            ]
        },
        "event": {
            "type": "recommend_spousal_rrsp",
            "params": {
                "message": "Should the high earner lend money to the low earner to invest?",
                "category": "family_optimizer",
                "priority": "high"
            }
        }
    },

    // Scenario A: Family Optimizer - Pension Splitting
    {
        "conditions": {
            "all": [
                { "fact": "age", "operator": "greaterThanInclusive", "value": 65 },
                { "fact": "has_pension", "operator": "equal", "value": true },
                { "fact": "marital_status", "operator": "equal", "value": "married" }
            ]
        },
        "event": {
            "type": "pension_splitting",
            "params": {
                "message": "Allocate up to 50% of pension to lower earner",
                "max_split": 0.5,
                "category": "family_optimizer",
                "priority": "high"
            }
        }
    },

    // Scenario A: Family Optimizer - Childcare Deduction
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
                "message": "Always auto-allocate childcare expenses to the lower income spouse (CRA Rule)",
                "allocate_to": "lower_earner",
                "category": "family_optimizer",
                "priority": "high"
            }
        }
    },

    // Scenario B: Student/New Grad - Tuition Carry-Forward
    {
        "conditions": {
            "all": [
                { "fact": "tuition_credits_available", "operator": "greaterThan", "value": 0 },
                { "fact": "income", "operator": "lessThan", "value": 60000 }
            ]
        },
        "event": {
            "type": "tuition_carryforward_recommendation",
            "params": {
                "message": "Do not use all credits this year if income is low. Carry forward to when you earn $60k+",
                "optimal_income_threshold": 60000,
                "category": "student",
                "priority": "medium"
            }
        }
    },

    // Scenario B: Student/New Grad - Moving Expenses
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
                "message": "Did you move >40km for a new job? Deduct moving costs against that new job's income",
                "category": "student",
                "priority": "medium"
            }
        }
    },

    // Scenario C: Newcomer - World Income Reporting
    {
        "conditions": {
            "all": [
                { "fact": "arrival_date", "operator": "greaterThan", "value": "2024-01-01" },
                { "fact": "has_foreign_income", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "newcomer_income_split",
            "params": {
                "message": "Report income earned before arrival date (for credits) vs. after arrival (for tax)",
                "category": "newcomer",
                "priority": "high"
            }
        }
    },

    // Scenario C: Newcomer - GST Credit
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
                "message": "Apply immediately even if no income yet",
                "category": "newcomer",
                "priority": "high"
            }
        }
    }
];
