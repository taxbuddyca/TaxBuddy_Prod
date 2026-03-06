// Niche Engine Rules - Specialized Tax Scenarios
export const nicheEngineRules = [
    // ─── CRYPTO AUDITOR ───────────────────────────────────────────────────────

    // High-frequency trading — CRA classifies as Business Income
    {
        "conditions": {
            "all": [
                { "fact": "crypto_trades_per_year", "operator": "greaterThan", "value": 50 },
                { "fact": "average_holding_period_days", "operator": "lessThan", "value": 30 }
            ]
        },
        "event": {
            "type": "crypto_business_income_warning",
            "params": {
                "message": "⚠️ High-frequency crypto trading (50+ trades, avg hold <30 days) is classified as Business Income by CRA, NOT capital gains. 100% of profits are taxable (not 50%). Budget full marginal rate. No ACB averaging relief applies.",
                "classification": "business_income",
                "inclusion_rate": 1.0,
                "risk_level": "high",
                "category": "crypto_auditor",
                "priority": "critical"
            }
        }
    },

    // Grey zone — moderate trades, moderate holding period
    {
        "conditions": {
            "all": [
                { "fact": "crypto_trades_per_year", "operator": "greaterThanInclusive", "value": 20 },
                { "fact": "crypto_trades_per_year", "operator": "lessThanInclusive", "value": 50 },
                { "fact": "average_holding_period_days", "operator": "lessThan", "value": 365 }
            ]
        },
        "event": {
            "type": "crypto_grey_zone_warning",
            "params": {
                "message": "Your crypto trading pattern is in the grey zone — CRA may reclassify from Capital Gains to Business Income. Document your intent (investment vs. speculation) in writing. Consider a CPA review before filing.",
                "classification": "grey_zone",
                "risk_level": "medium",
                "category": "crypto_auditor",
                "priority": "high"
            }
        }
    },

    // Long-term HODL — Capital Gains (50% inclusion for gains ≤ $250k)
    {
        "conditions": {
            "all": [
                { "fact": "crypto_trades_per_year", "operator": "lessThan", "value": 20 },
                { "fact": "average_holding_period_days", "operator": "greaterThanInclusive", "value": 365 }
            ]
        },
        "event": {
            "type": "crypto_capital_gains",
            "params": {
                "message": "Long-term HODL strategy: profits are Capital Gains. For 2025, the inclusion rate is 50% on the first $250,000 of annual gains. Gains above $250,000 are taxed at 66.67% inclusion rate (2024 Budget change, effective June 25, 2024).",
                "classification": "capital_gains",
                "inclusion_rate_under_250k": 0.50,
                "inclusion_rate_over_250k": 0.6667,
                "threshold_for_higher_rate": 250000,
                "risk_level": "low",
                "category": "crypto_auditor",
                "priority": "medium"
            }
        }
    },

    // High gains — 66.67% inclusion rate kicks in above $250k
    {
        "conditions": {
            "all": [
                { "fact": "crypto_gains_amount", "operator": "greaterThan", "value": 250000 }
            ]
        },
        "event": {
            "type": "crypto_high_gains_warning",
            "params": {
                "message": "Capital gains over $250,000 in 2025 are subject to a 66.67% inclusion rate (increased from 50% under the 2024 Federal Budget). Plan before year-end: consider spreading dispositions across tax years to stay under the $250k threshold.",
                "inclusion_rate": 0.6667,
                "threshold": 250000,
                "risk_level": "high",
                "category": "crypto_auditor",
                "priority": "critical"
            }
        }
    },

    // ─── REAL ESTATE FLIPPER ──────────────────────────────────────────────────

    // Anti-Flipping Tax — owned < 365 days
    {
        "conditions": {
            "all": [
                { "fact": "property_ownership_days", "operator": "lessThan", "value": 365 }
            ]
        },
        "event": {
            "type": "anti_flipping_tax",
            "params": {
                "message": "Property owned <365 days: Canada's Anti-Flipping Tax (effective Jan 1, 2023) classifies the profit as 100% Business Income — NOT capital gains. The Principal Residence Exemption does NOT apply. You will owe full tax at your marginal rate.",
                "tax_treatment": "business_income",
                "exemption_available": false,
                "risk_level": "high",
                "category": "real_estate_flipper",
                "priority": "critical"
            }
        }
    },

    // Anti-Flipping Exemption — life event exceptions
    {
        "conditions": {
            "all": [
                { "fact": "property_ownership_days", "operator": "lessThan", "value": 365 },
                { "fact": "sale_reason", "operator": "in", "value": ["safety", "death", "job_change", "disability", "divorce"] }
            ]
        },
        "event": {
            "type": "anti_flipping_exemption",
            "params": {
                "message": "Life event detected — you may qualify for an Anti-Flipping exemption (death, divorce, job relocation > 40km, disability, safety). Document the reason thoroughly and file Form T2091 with relevant supporting documents.",
                "exemption_available": true,
                "risk_level": "low",
                "category": "real_estate_flipper",
                "priority": "high"
            }
        }
    },

    // Multiple property sales — business activity flag
    {
        "conditions": {
            "all": [
                { "fact": "properties_sold_in_year", "operator": "greaterThan", "value": 1 }
            ]
        },
        "event": {
            "type": "multiple_property_warning",
            "params": {
                "message": "Selling more than 1 property in a year is a strong CRA audit trigger. CRA may reclassify ALL property profits as Business Income, denying Principal Residence Exemption on all sales. Ensure each sale has documentation of lifestyle intent.",
                "risk_level": "high",
                "category": "real_estate_flipper",
                "priority": "critical"
            }
        }
    },

    // Underused Housing Tax — non-principal residence vacant > 180 days
    {
        "conditions": {
            "all": [
                { "fact": "is_vacant_property", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "underused_housing_tax",
            "params": {
                "message": "Underused Housing Tax (UHT) may apply: 1% of assessed value annually for residential properties that are vacant or underused (< 180 days). File UHT-2900 by April 30. Principal residence is exempt. Penalties up to $10,000 for non-filing.",
                "annual_rate": 0.01,
                "filing_form": "UHT-2900",
                "risk_level": "high",
                "category": "real_estate_flipper",
                "priority": "high"
            }
        }
    },

    // ─── CROSS-BORDER ─────────────────────────────────────────────────────────

    // Cross-Border — US income not reported in Canada
    {
        "conditions": {
            "all": [
                { "fact": "has_us_income", "operator": "equal", "value": true },
                { "fact": "filed_us_taxes", "operator": "equal", "value": false }
            ]
        },
        "event": {
            "type": "cross_border_warning",
            "params": {
                "message": "US income must be reported on your Canadian T1 (converted to CAD at the Bank of Canada rate for the day received). File a US 1040-NR or 1040 as required, then claim foreign tax credits (Form T2209) in Canada to avoid double taxation. Also check for treaty-reduced withholding rates.",
                "risk_level": "high",
                "category": "cross_border",
                "priority": "critical"
            }
        }
    },

    // Cross-Border — filed US taxes, foreign tax credits available
    {
        "conditions": {
            "all": [
                { "fact": "has_us_income", "operator": "equal", "value": true },
                { "fact": "filed_us_taxes", "operator": "equal", "value": true }
            ]
        },
        "event": {
            "type": "foreign_tax_credit_available",
            "params": {
                "message": "You paid US taxes — claim the Foreign Tax Credit on Form T2209 to recover taxes paid to the IRS. The credit is limited to the Canadian tax owing on the same income. Excess US tax can be carried back 3 years or forward 10 years.",
                "risk_level": "low",
                "category": "cross_border",
                "priority": "medium"
            }
        }
    }
];
