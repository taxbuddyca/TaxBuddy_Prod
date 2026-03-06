export type TaxYear = "2025" | "2026";

export interface ProvincialTaxData {
    name: string;
    brackets: number[];
    rates: number[];
    bpa: number;
    divEligible: number;
    divIneligible: number;
    surtaxThreshold1?: number;
    surtaxRate1?: number;
    surtaxThreshold2?: number;
    surtaxRate2?: number;
}

export interface TaxYearConfig {
    federal: {
        brackets: number[];
        rates: number[];
        bpaMax: number;
        bpaMin: number;
        ceaMax: number;
    };
    cpp: {
        ympe: number;
        yampe: number;
        exemption: number;
        rate1: number;
        baseRate: number;
        enhancedRate: number;
        rate2: number;
        max1: number;
        max2: number;
    };
    ei: {
        mie: number;
        rate: number;
        rateQC: number;
        max: number;
        maxQC: number;
    };
    provincial: Record<string, ProvincialTaxData>;
    rrspLimit: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// CRA-Verified Tax Constants
// Sources: canada.ca, novascotia.ca, gov.bc.ca, alberta.ca, taxtips.ca
// ─────────────────────────────────────────────────────────────────────────────
export const TAX_CONSTANTS: Record<TaxYear, TaxYearConfig> = {
    // ═══════════════════════════════════════════════════════════════════════
    // 2025 TAX YEAR (Filing in 2026)
    // Federal indexation factor: 2.7%
    // Effective lowest federal rate: 14.5% (blended: 15% Jan-Jun, 14% Jul-Dec)
    // ═══════════════════════════════════════════════════════════════════════
    "2025": {
        federal: {
            brackets: [57375, 114750, 177882, 253414],
            rates: [0.145, 0.205, 0.26, 0.29, 0.33],
            bpaMax: 16129,
            bpaMin: 14538,
            ceaMax: 1471
        },
        cpp: {
            ympe: 71300,
            yampe: 81200,
            exemption: 3500,
            rate1: 0.0595,
            baseRate: 0.0495,
            enhancedRate: 0.0100,
            rate2: 0.04,
            max1: 4034.10,
            max2: 396.00
        },
        ei: {
            mie: 65700,
            rate: 0.0164,
            rateQC: 0.0131,
            max: 1077.48,
            maxQC: 860.67
        },
        provincial: {
            ON: {
                name: "Ontario",
                brackets: [52886, 105775, 150000, 220000],
                rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
                bpa: 12747,
                divEligible: 0.10,
                divIneligible: 0.0298,
                surtaxThreshold1: 5710,
                surtaxRate1: 0.20,
                surtaxThreshold2: 7307,
                surtaxRate2: 0.36
            },
            BC: {
                name: "British Columbia",
                brackets: [49279, 98560, 113158, 137407, 186306, 259829],
                rates: [0.0506, 0.077, 0.105, 0.1229, 0.147, 0.168, 0.205],
                bpa: 12932,
                divEligible: 0.12,
                divIneligible: 0.0196
            },
            AB: {
                name: "Alberta",
                brackets: [60000, 151234, 181481, 241974, 362961],
                rates: [0.08, 0.10, 0.12, 0.13, 0.14, 0.15],
                bpa: 22323,
                divEligible: 0.0812,
                divIneligible: 0.0218
            },
            QC: {
                name: "Quebec",
                brackets: [54345, 108680, 132245],
                rates: [0.14, 0.19, 0.24, 0.2575],
                bpa: 18571,
                divEligible: 0.117,
                divIneligible: 0.04
            },
            NS: {
                name: "Nova Scotia",
                brackets: [30507, 61015, 95883, 154650],
                rates: [0.0879, 0.1495, 0.1667, 0.1750, 0.21],
                bpa: 11744,
                divEligible: 0.0885,
                divIneligible: 0.0299
            },
            MB: {
                name: "Manitoba",
                brackets: [47000, 100000],
                rates: [0.108, 0.1275, 0.174],
                bpa: 15780,
                divEligible: 0.08,
                divIneligible: 0.0078
            },
            SK: {
                name: "Saskatchewan",
                brackets: [53463, 152750],
                rates: [0.105, 0.125, 0.145],
                bpa: 19491,
                divEligible: 0.11,
                divIneligible: 0.0336
            },
            NB: {
                name: "New Brunswick",
                brackets: [51306, 102614, 190060],
                rates: [0.094, 0.14, 0.16, 0.195],
                bpa: 13396,
                divEligible: 0.116,
                divIneligible: 0.0275
            },
            PE: {
                name: "Prince Edward Island",
                brackets: [33328, 64656, 105000, 140000],
                rates: [0.095, 0.1347, 0.166, 0.1762, 0.19],
                bpa: 14650,
                divEligible: 0.105,
                divIneligible: 0.013
            },
            NL: {
                name: "Newfoundland and Labrador",
                brackets: [43198, 86395, 154244, 216043, 275970, 551839, 1103578],
                rates: [0.087, 0.145, 0.158, 0.178, 0.198, 0.208, 0.213, 0.218],
                bpa: 11067,
                divEligible: 0.063,
                divIneligible: 0.032
            },
            YT: {
                name: "Yukon",
                brackets: [57375, 114750, 177882, 500000],
                rates: [0.064, 0.09, 0.109, 0.128, 0.15],
                bpa: 16129,
                divEligible: 0.152,
                divIneligible: 0.02
            },
            NT: {
                name: "Northwest Territories",
                brackets: [52058, 104115, 169197],
                rates: [0.059, 0.086, 0.122, 0.1405],
                bpa: 17842,
                divEligible: 0.068,
                divIneligible: 0.028
            },
            NU: {
                name: "Nunavut",
                brackets: [57375, 114750, 177882],
                rates: [0.04, 0.07, 0.09, 0.115],
                bpa: 19274,
                divEligible: 0.036,
                divIneligible: 0.01
            }
        },
        rrspLimit: 32490
    },
    // ═══════════════════════════════════════════════════════════════════════
    // 2026 TAX YEAR (Filing in 2027)
    // Federal indexation factor: 2.0%
    // Lowest federal rate: 14% (full year)
    // ═══════════════════════════════════════════════════════════════════════
    "2026": {
        federal: {
            brackets: [58523, 117045, 181440, 258482],
            rates: [0.14, 0.205, 0.26, 0.29, 0.33],
            bpaMax: 16452,
            bpaMin: 14829,
            ceaMax: 1501
        },
        cpp: {
            ympe: 74600,
            yampe: 85000,
            exemption: 3500,
            rate1: 0.0595,
            baseRate: 0.0495,
            enhancedRate: 0.0100,
            rate2: 0.04,
            max1: 4230.45,
            max2: 416.00
        },
        ei: {
            mie: 68900,
            rate: 0.0163,
            rateQC: 0.0130,
            max: 1123.07,
            maxQC: 895.70
        },
        provincial: {
            ON: {
                name: "Ontario",
                brackets: [53891, 107785, 150000, 220000],
                rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
                bpa: 12989,
                divEligible: 0.10,
                divIneligible: 0.0298,
                surtaxThreshold1: 5818,
                surtaxRate1: 0.20,
                surtaxThreshold2: 7446,
                surtaxRate2: 0.36
            },
            BC: {
                name: "British Columbia",
                brackets: [50363, 100728, 115648, 140430, 190405, 265545],
                rates: [0.0506, 0.077, 0.105, 0.1229, 0.147, 0.168, 0.205],
                bpa: 13217,
                divEligible: 0.12,
                divIneligible: 0.0196
            },
            AB: {
                name: "Alberta",
                brackets: [61200, 154259, 185111, 246813, 370220],
                rates: [0.08, 0.10, 0.12, 0.13, 0.14, 0.15],
                bpa: 22770,
                divEligible: 0.0812,
                divIneligible: 0.0218
            },
            QC: {
                name: "Quebec",
                brackets: [54345, 108680, 132245],
                rates: [0.14, 0.19, 0.24, 0.2575],
                bpa: 18571,
                divEligible: 0.117,
                divIneligible: 0.04
            },
            NS: {
                name: "Nova Scotia",
                brackets: [30995, 61991, 97417, 157124],
                rates: [0.0879, 0.1495, 0.1667, 0.1750, 0.21],
                bpa: 11932,
                divEligible: 0.0885,
                divIneligible: 0.0299
            },
            MB: {
                name: "Manitoba",
                brackets: [47000, 100000],
                rates: [0.108, 0.1275, 0.174],
                bpa: 15780,
                divEligible: 0.08,
                divIneligible: 0.0078
            },
            SK: {
                name: "Saskatchewan",
                brackets: [53463, 152750],
                rates: [0.105, 0.125, 0.145],
                bpa: 19491,
                divEligible: 0.11,
                divIneligible: 0.0336
            },
            NB: {
                name: "New Brunswick",
                brackets: [51306, 102614, 190060],
                rates: [0.094, 0.14, 0.16, 0.195],
                bpa: 13544,
                divEligible: 0.116,
                divIneligible: 0.0275
            },
            PE: {
                name: "Prince Edward Island",
                brackets: [33328, 64656, 105000, 140000],
                rates: [0.095, 0.1347, 0.166, 0.1762, 0.19],
                bpa: 14650,
                divEligible: 0.105,
                divIneligible: 0.013
            },
            NL: {
                name: "Newfoundland and Labrador",
                brackets: [44192, 88382, 157792, 220910, 282214, 564429, 1128858],
                rates: [0.087, 0.145, 0.158, 0.178, 0.198, 0.208, 0.213, 0.218],
                bpa: 11067,
                divEligible: 0.063,
                divIneligible: 0.032
            },
            YT: {
                name: "Yukon",
                brackets: [58523, 117045, 181440, 500000],
                rates: [0.064, 0.09, 0.109, 0.128, 0.15],
                bpa: 16452,
                divEligible: 0.152,
                divIneligible: 0.02
            },
            NT: {
                name: "Northwest Territories",
                brackets: [53003, 106009, 172346],
                rates: [0.059, 0.086, 0.122, 0.1405],
                bpa: 18198,
                divEligible: 0.068,
                divIneligible: 0.028
            },
            NU: {
                name: "Nunavut",
                brackets: [58523, 117045, 181440],
                rates: [0.04, 0.07, 0.09, 0.115],
                bpa: 19274,
                divEligible: 0.036,
                divIneligible: 0.01
            }
        },
        rrspLimit: 33560
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Shared Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

export const calculateProgressiveTax = (income: number, brackets: number[], rates: number[]) => {
    let tax = 0;
    let prevLimit = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (income > brackets[i]) {
            tax += (brackets[i] - prevLimit) * rates[i];
            prevLimit = brackets[i];
        } else {
            tax += (income - prevLimit) * rates[i];
            return tax;
        }
    }

    tax += (income - prevLimit) * rates[rates.length - 1];
    return tax;
};

export const calculateFederalBPA = (netIncome: number, federalConfig: TaxYearConfig["federal"]) => {
    if (netIncome <= federalConfig.brackets[2]) return federalConfig.bpaMax;
    if (netIncome >= federalConfig.brackets[3]) return federalConfig.bpaMin;
    const reduction = ((netIncome - federalConfig.brackets[2]) / (federalConfig.brackets[3] - federalConfig.brackets[2])) * (federalConfig.bpaMax - federalConfig.bpaMin);
    return federalConfig.bpaMax - reduction;
};

export const calculateCEA = (employmentIncome: number, federalConfig: TaxYearConfig["federal"]) => {
    return Math.min(employmentIncome, federalConfig.ceaMax) * federalConfig.rates[0];
};

/**
 * Ontario Health Premium (OHP) — CRA ON428 Worksheet, Part 4.
 * Each tier: lesser of [tierMax] or [prevTierMax + rate × (income − tierStart)]
 *
 * Tier 1: $0–$20,000 → $0
 * Tier 2: $20,001–$36,000 → lesser of $300 or 6% × (income − $20,000)
 * Tier 3: $36,001–$48,000 → lesser of $450 or $300 + 6% × (income − $36,000)
 * Tier 4: $48,001–$72,000 → lesser of $600 or $450 + 25% × (income − $48,000)
 * Tier 5: $72,001–$200,600 → lesser of $750 or $600 + 25% × (income − $72,000)
 * Tier 6: $200,601+ → $900
 */
export const calculateOntarioHealthPremium = (taxableIncome: number): number => {
    if (taxableIncome <= 20000) return 0;
    if (taxableIncome <= 36000) return Math.min(300, (taxableIncome - 20000) * 0.06);
    if (taxableIncome <= 48000) return Math.min(450, 300 + (taxableIncome - 36000) * 0.06);
    if (taxableIncome <= 72000) return Math.min(600, 450 + (taxableIncome - 48000) * 0.25);
    if (taxableIncome <= 200600) return Math.min(750, 600 + (taxableIncome - 72000) * 0.25);
    return 900;
};
