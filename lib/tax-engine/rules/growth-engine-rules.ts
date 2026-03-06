// Growth Engine Rules - Business Tax Optimization
export const growthEngineRules = [
    // ─── HST REGISTRATION ─────────────────────────────────────────────────────

    // HST Registration — mandatory over $30,000 in any 4 consecutive quarters
    {
        "conditions": {
            "all": [
                { "fact": "revenue", "operator": "greaterThan", "value": 30000 }
            ]
        },
        "event": {
            "type": "hst_registration_required",
            "params": {
                "message": "Revenue exceeds $30,000 — CRA requires mandatory GST/HST registration. File Form RC1 or register via My Business Account. Charge HST to clients and remit quarterly/annually.",
                "threshold": 30000,
                "category": "hst_optimizer",
                "priority": "critical"
            }
        }
    },

    // ─── HST QUICK METHOD ─────────────────────────────────────────────────────

    // Quick Method — best for low-expense service businesses under $400k
    {
        "conditions": {
            "all": [
                { "fact": "revenue", "operator": "greaterThan", "value": 30000 },
                { "fact": "revenue", "operator": "lessThanInclusive", "value": 400000 },
                { "fact": "business_expenses", "operator": "lessThan", "value": 10000 },
                { "fact": "industry", "operator": "in", "value": ["IT", "Consulting", "Professional Services"] }
            ]
        },
        "event": {
            "type": "hst_quick_method_recommendation",
            "params": {
                "message": "Switch to the GST/HST Quick Method (RC4058). You collect 13% HST but only remit 8.8% (ON services). Pocket the ~4.2% spread as tax-free profit — worth ~$4,200 on $100k revenue. Plus a 1% credit on your first $30k of gross revenue.",
                "rate_on": 8.8,
                "rate_goods_on": 1.8,
                "max_revenue": 400000,
                "savings_percentage": 0.042,
                "category": "hst_optimizer",
                "priority": "high"
            }
        }
    },

    // ─── HIRING LOGIC (TOSI) ──────────────────────────────────────────────────

    // TOSI Exemption — spouse 65+, split freely
    {
        "conditions": {
            "all": [
                { "fact": "spouse_age", "operator": "greaterThanInclusive", "value": 65 }
            ]
        },
        "event": {
            "type": "tosi_exemption",
            "params": {
                "message": "TOSI (Tax on Split Income) rules do NOT apply when the income recipient is 65+. You may pay dividends or salary to your spouse freely without the punitive split income tax.",
                "risk_level": "low",
                "category": "hiring_logic",
                "priority": "medium"
            }
        }
    },

    // Spouse Salary — 20+ hours/week qualifies as arm's length (TOSI safe)
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
                "message": "Spouse works 20+ hours/week — pay a reasonable T4 salary (CRA calls this 'reasonable for the work'). The salary is a deductible business expense. Issue a T4 slip and remit source deductions including CPP (employer rate 5.95%) and EI.",
                "method": "T4",
                "risk_level": "low",
                "category": "hiring_logic",
                "priority": "high"
            }
        }
    },

    // TOSI Warning — < 20 hours/week, dividends are high-risk
    {
        "conditions": {
            "all": [
                { "fact": "hiring_spouse", "operator": "equal", "value": true },
                { "fact": "spouse_hours_per_week", "operator": "lessThan", "value": 20 },
                { "fact": "spouse_age", "operator": "lessThan", "value": 65 }
            ]
        },
        "event": {
            "type": "tosi_warning",
            "params": {
                "message": "Do NOT pay dividends to spouse working <20 hrs/week. TOSI rules (ITA s.120.4) will tax those dividends at the top federal-provincial rate (~53% in ON). CRA may also reassess as personal income.",
                "risk_level": "high",
                "warning": "TOSI — top marginal rate applies to split income",
                "category": "hiring_logic",
                "priority": "critical"
            }
        }
    },

    // ─── VEHICLE MATRIX ───────────────────────────────────────────────────────

    // EV Class 54 — 100% write-off up to $61,000
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
                "message": "Zero-emission vehicle (Class 54): 100% CCA write-off in Year 1 up to $61,000 (CRA 2025). First-year half-year rule is WAIVED for eligible EVs. Maximum deduction: $61,000 × business use %.",
                "class": "54",
                "cap_2025": 61000,
                "writeoff_percentage": 100,
                "half_year_rule_applies": false,
                "category": "vehicle_matrix",
                "priority": "high"
            }
        }
    },

    // Class 10.1 — luxury car CCA cap warning ($37,000)
    {
        "conditions": {
            "all": [
                { "fact": "vehicle_cost", "operator": "greaterThan", "value": 37000 },
                { "fact": "vehicle_type", "operator": "notEqual", "value": "zero_emission" }
            ]
        },
        "event": {
            "type": "luxury_tax_warning",
            "params": {
                "message": "Non-EV vehicle over $37,000 (2025 CRA Class 10.1 limit). CCA is capped at $37,000 × 30% × 50% (half-year rule) = max $5,550 in Year 1. Excess cost is NOT deductible. Consider leasing instead.",
                "risk_level": "medium",
                "cap_amount": 37000,
                "max_year1_cca": 5550,
                "category": "vehicle_matrix",
                "priority": "medium"
            }
        }
    },

    // Business Use < 90% — don't put car in corp
    {
        "conditions": {
            "all": [
                { "fact": "business_use_percentage", "operator": "lessThan", "value": 90 },
                { "fact": "business_use_percentage", "operator": "greaterThan", "value": 0 }
            ]
        },
        "event": {
            "type": "vehicle_ownership_warning",
            "params": {
                "message": "Business use <90% — do NOT put vehicle in corporation. CRA will add a Standby Charge and Operating Cost Benefit to your T4 as taxable income, often costing more than the deductions. Keep personal and claim mileage at $0.72/km (first 5,000km) and $0.62/km after.",
                "recommendation": "personal_ownership_with_mileage",
                "mileage_rate_first_5k": 0.72,
                "mileage_rate_after": 0.62,
                "risk_level": "high",
                "category": "vehicle_matrix",
                "priority": "critical"
            }
        }
    }
];
