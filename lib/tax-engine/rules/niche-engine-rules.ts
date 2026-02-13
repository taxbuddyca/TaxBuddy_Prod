// Niche Engine Rules - Specialized Tax Scenarios
export const nicheEngineRules = [
    // Scenario A: Crypto Auditor - Business Income Warning
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
                "message": "Warning: Your trading frequency looks like 'Business Income' to CRA. Budget 30% for tax, not 15%",
                "classification": "business_income",
                "tax_rate": 0.30,
                "risk_level": "high",
                "category": "crypto_auditor",
                "priority": "critical"
            }
        }
    },

    // Scenario A: Crypto Auditor - Capital Gains
    {
        "conditions": {
            "all": [
                { "fact": "crypto_trades_per_year", "operator": "lessThan", "value": 20 },
                { "fact": "average_holding_period_days", "operator": "greaterThan", "value": 365 }
            ]
        },
        "event": {
            "type": "crypto_capital_gains",
            "params": {
                "message": "HODL strategy detected. Profit is Capital Gains (50% Taxable)",
                "classification": "capital_gains",
                "inclusion_rate": 0.50,
                "risk_level": "low",
                "category": "crypto_auditor",
                "priority": "medium"
            }
        }
    },

    // Scenario B: Real Estate Flipper - Anti-Flipping Tax
    {
        "conditions": {
            "all": [
                { "fact": "property_ownership_days", "operator": "lessThan", "value": 365 }
            ]
        },
        "event": {
            "type": "anti_flipping_tax",
            "params": {
                "message": "Did you own it for less than 365 days? Anti-Flipping Tax applies. Profit is 100% Business Income (No Principal Residence Exemption)",
                "tax_treatment": "business_income",
                "exemption_available": false,
                "risk_level": "high",
                "category": "real_estate_flipper",
                "priority": "critical"
            }
        }
    },

    // Scenario B: Real Estate Flipper - Exemption Check
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
                "message": "Did you move due to 'Safety', 'Death', or 'Job Change'? Unlock exemption",
                "exemption_available": true,
                "risk_level": "low",
                "category": "real_estate_flipper",
                "priority": "high"
            }
        }
    },

    // Additional: Multiple Property Sales Warning
    {
        "conditions": {
            "all": [
                { "fact": "properties_sold_in_year", "operator": "greaterThan", "value": 2 }
            ]
        },
        "event": {
            "type": "multiple_property_warning",
            "params": {
                "message": "Multiple property sales may indicate business activity. CRA may classify all profits as business income",
                "risk_level": "high",
                "category": "real_estate_flipper",
                "priority": "critical"
            }
        }
    },

    // Additional: Cross-Border Income
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
                "message": "US income must be reported in Canada. Foreign tax credits available to avoid double taxation",
                "risk_level": "high",
                "category": "cross_border",
                "priority": "critical"
            }
        }
    }
];
