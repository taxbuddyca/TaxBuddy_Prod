// Growth Engine Rules - Business Tax Optimization
export const growthEngineRules = [
    // Scenario A: Hiring Logic - Spouse Salary (TOSI Compliant)
    {
        "conditions": {
            "all": [
                { "fact": "hiring_spouse", "operator": "equal", "value": true },
                { "fact": "spouse_hours_per_week", "operator": "greaterThanInclusive", "value": 20 }
            ]
        },
        "event": {
            "type": "spouse_salary_recommendation",
            "params": {
                "message": "Pay reasonable Salary (T4). Deductible.",
                "method": "T4",
                "risk_level": "low",
                "category": "hiring_logic",
                "priority": "high"
            }
        }
    },

    // Scenario A: Hiring Logic - TOSI Warning
    {
        "conditions": {
            "all": [
                { "fact": "hiring_spouse", "operator": "equal", "value": true },
                { "fact": "spouse_hours_per_week", "operator": "lessThan", "value": 20 }
            ]
        },
        "event": {
            "type": "tosi_warning",
            "params": {
                "message": "Do NOT pay Dividends (High Tax Risk under TOSI rules)",
                "risk_level": "high",
                "warning": "CRA may reassess as personal income",
                "category": "hiring_logic",
                "priority": "critical"
            }
        }
    },

    // Scenario A: Hiring Logic - TOSI Exemption (Age 65+)
    {
        "conditions": {
            "all": [
                { "fact": "spouse_age", "operator": "greaterThan", "value": 65 }
            ]
        },
        "event": {
            "type": "tosi_exemption",
            "params": {
                "message": "TOSI rules do not apply. Income split freely.",
                "risk_level": "low",
                "category": "hiring_logic",
                "priority": "medium"
            }
        }
    },

    // Scenario B: HST Optimizer - Quick Method Recommendation
    {
        "conditions": {
            "all": [
                { "fact": "business_expenses", "operator": "lessThan", "value": 10000 },
                { "fact": "revenue", "operator": "greaterThan", "value": 30000 },
                { "fact": "industry", "operator": "in", "value": ["IT", "Consulting", "Professional Services"] }
            ]
        },
        "event": {
            "type": "hst_quick_method_recommendation",
            "params": {
                "message": "Since you have few expenses (no office rent), switch to the Quick Method. You will pocket ~3% of your revenue as pure profit (~$3,000 on $100k revenue)",
                "savings_percentage": 0.03,
                "category": "hst_optimizer",
                "priority": "high"
            }
        }
    },

    // Scenario C: Vehicle Matrix - EV Class 54 Write-off
    {
        "conditions": {
            "all": [
                { "fact": "vehicle_type", "operator": "equal", "value": "zero_emission" },
                { "fact": "vehicle_cost", "operator": "lessThanInclusive", "value": 61000 }
            ]
        },
        "event": {
            "type": "ev_class_54_writeoff",
            "params": {
                "message": "Is it Zero-Emission? Use Class 54 (100% write-off up to $61k)",
                "class": "54",
                "writeoff_percentage": 100,
                "category": "vehicle_matrix",
                "priority": "high"
            }
        }
    },

    // Scenario C: Vehicle Matrix - Luxury Tax Warning
    {
        "conditions": {
            "all": [
                { "fact": "vehicle_cost", "operator": "greaterThan", "value": 37000 }
            ]
        },
        "event": {
            "type": "luxury_tax_warning",
            "params": {
                "message": "Is cost > $37,000? Trigger 'Luxury Tax Trap' warning (deduction capped)",
                "risk_level": "medium",
                "cap_amount": 37000,
                "category": "vehicle_matrix",
                "priority": "medium"
            }
        }
    },

    // Scenario C: Vehicle Matrix - Business Use Warning
    {
        "conditions": {
            "all": [
                { "fact": "business_use_percentage", "operator": "lessThan", "value": 90 }
            ]
        },
        "event": {
            "type": "vehicle_ownership_warning",
            "params": {
                "message": "Business use < 90%? Do NOT put car in Corporation name (Taxable Benefit trigger). Keep it personal and pay mileage.",
                "recommendation": "personal_ownership_with_mileage",
                "risk_level": "high",
                "category": "vehicle_matrix",
                "priority": "critical"
            }
        }
    }
];
