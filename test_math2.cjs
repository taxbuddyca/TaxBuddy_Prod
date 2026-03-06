const fs = require('fs');

const FEDERAL_RATES = {
    brackets: [58523, 117045, 181440, 258482],
    rates: [0.14, 0.205, 0.26, 0.29, 0.33],
    bpaMax: 16452,
    bpaMin: 14829,
    ceaMax: 1501,
};

const CPP_2026 = {
    ympe: 74600,
    yampe: 85000,
    exemption: 3500,
    baseRate: 0.0495,
    enhancedRate: 0.01,
    rate2: 0.04,
    max2: 416.00
};

const EI_2026 = {
    mie: 68900,
    rate: 0.0163,
    max: 1123.07,
    rateQC: 0.0130,
    maxQC: 895.70
};

const PROVINCIAL_DATA = {
    ON: {
        name: "Ontario",
        brackets: [53891, 107785, 150000, 220000],
        rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
        bpa: 12399,
        divEligible: 0.10,
        divIneligible: 0.0298
    },
    BC: {
        name: "British Columbia",
        brackets: [50363, 100728, 115648, 140430, 190405, 265545],
        rates: [0.056, 0.077, 0.105, 0.1229, 0.147, 0.168, 0.205],
        bpa: 12580,
        divEligible: 0.12,
        divIneligible: 0.0196
    },
    NS: {
        name: "Nova Scotia",
        brackets: [30995, 61991, 97417, 157124],
        rates: [0.0879, 0.1495, 0.1667, 0.1750, 0.21],
        bpa: 11932,
        divEligible: 0.0885,
        divIneligible: 0.0299
    }
};

const calculateProgressiveTax = (income, brackets, rates) => {
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

const calculateFederalBPA = (netIncome) => {
    if (netIncome <= FEDERAL_RATES.brackets[2]) return FEDERAL_RATES.bpaMax;
    if (netIncome >= FEDERAL_RATES.brackets[3]) return FEDERAL_RATES.bpaMin;
    const reduction = ((netIncome - FEDERAL_RATES.brackets[2]) / (FEDERAL_RATES.brackets[3] - FEDERAL_RATES.brackets[2])) * (FEDERAL_RATES.bpaMax - FEDERAL_RATES.bpaMin);
    return FEDERAL_RATES.bpaMax - reduction;
};

const calculateCEA = (employmentIncome) => {
    return Math.min(employmentIncome, FEDERAL_RATES.ceaMax) * FEDERAL_RATES.rates[0];
};

function calculate(income, provinceCode, isSelfEmployed, taxesPaid, rrspContribution, capitalGains) {
    const prov = PROVINCIAL_DATA[provinceCode];
    const otherIncome = 0;
    const eligibleDividends = 0;
    const ineligibleDividends = 0;

    const grossedEligible = eligibleDividends * 1.38;
    const grossedIneligible = ineligibleDividends * 1.15;

    const totalIncome = income + otherIncome + capitalGains + eligibleDividends + ineligibleDividends;
    const inclusionIncome = income + otherIncome + (capitalGains > 0 ? capitalGains * 0.5 : 0) + grossedEligible + grossedIneligible;

    const cpp1Basis = Math.min(Math.max(0, income), CPP_2026.ympe) - CPP_2026.exemption;
    const cpp1BasisPositive = Math.max(0, cpp1Basis);

    let baseCppContribution = 0;
    let enhancedCppContribution = 0;
    let cpp2Contribution = 0;
    let employerCppDeduction = 0;

    const maxBaseCpp = (CPP_2026.ympe - CPP_2026.exemption) * CPP_2026.baseRate;
    const maxEnhancedCpp = (CPP_2026.ympe - CPP_2026.exemption) * CPP_2026.enhancedRate;

    if (isSelfEmployed) {
        baseCppContribution = Math.min(cpp1BasisPositive * CPP_2026.baseRate, maxBaseCpp);
        enhancedCppContribution = Math.min(cpp1BasisPositive * CPP_2026.enhancedRate, maxEnhancedCpp);
        employerCppDeduction = baseCppContribution + enhancedCppContribution;

        const cpp2Basis = Math.max(0, Math.min(income, CPP_2026.yampe) - CPP_2026.ympe);
        const halfCpp2 = Math.min(cpp2Basis * CPP_2026.rate2, CPP_2026.max2);
        cpp2Contribution = halfCpp2 * 2;
        employerCppDeduction += halfCpp2;
    } else {
        baseCppContribution = Math.min(cpp1BasisPositive * CPP_2026.baseRate, maxBaseCpp);
        enhancedCppContribution = Math.min(cpp1BasisPositive * CPP_2026.enhancedRate, maxEnhancedCpp);

        const cpp2Basis = Math.max(0, Math.min(income, CPP_2026.yampe) - CPP_2026.ympe);
        cpp2Contribution = Math.min(cpp2Basis * CPP_2026.rate2, CPP_2026.max2);
    }

    const totalCPPPaid = baseCppContribution + enhancedCppContribution + cpp2Contribution + employerCppDeduction;
    const deductibleCPP = enhancedCppContribution + (isSelfEmployed ? (cpp2Contribution / 2) : cpp2Contribution) + employerCppDeduction;
    const creditableCPP = baseCppContribution;

    const eiRate = provinceCode === 'QC' ? EI_2026.rateQC : EI_2026.rate;
    const eiMax = provinceCode === 'QC' ? EI_2026.maxQC : EI_2026.max;
    const totalEIPaid = isSelfEmployed ? 0 : Math.min(income * eiRate, eiMax);
    const creditableEI = totalEIPaid;

    // RULE 2: Correct Taxable Income
    const taxableIncome = Math.max(0, inclusionIncome - rrspContribution - deductibleCPP);

    let fedTaxBeforeCredits = calculateProgressiveTax(taxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
    const fedBPA = calculateFederalBPA(taxableIncome);

    // RULE 3: Correct NRTC
    fedTaxBeforeCredits -= (fedBPA * FEDERAL_RATES.rates[0]);
    fedTaxBeforeCredits -= calculateCEA(income);
    fedTaxBeforeCredits -= ((creditableCPP + creditableEI) * FEDERAL_RATES.rates[0]);

    let finalFederalTax = Math.max(0, fedTaxBeforeCredits);

    let provTaxBeforeCredits = calculateProgressiveTax(taxableIncome, prov.brackets, prov.rates);
    provTaxBeforeCredits -= (prov.bpa * prov.rates[0]);
    provTaxBeforeCredits -= ((creditableCPP + creditableEI) * prov.rates[0]);
    let finalProvTax = Math.max(0, provTaxBeforeCredits);

    if (provinceCode === 'ON') {
        let surtax = 0;
        if (finalProvTax > 5818) surtax += (finalProvTax - 5818) * 0.20;
        if (finalProvTax > 7446) surtax += (finalProvTax - 7446) * 0.36;
        finalProvTax += surtax;
    }

    const totalTax = finalFederalTax + finalProvTax + totalCPPPaid + totalEIPaid;
    const netIncome = totalIncome - totalTax - rrspContribution;
    const difference = taxesPaid - (finalFederalTax + finalProvTax + (isSelfEmployed ? totalCPPPaid : 0));

    return {
        TotalIncome: totalIncome.toFixed(2),
        FederalTax: finalFederalTax.toFixed(2),
        ProvincialTax: finalProvTax.toFixed(2),
        TotalCPPEI: (totalCPPPaid + totalEIPaid).toFixed(2),
        TotalTax: totalTax.toFixed(2),
        AfterTaxIncome: netIncome.toFixed(2),
        RefundOrOwed: Math.round(difference)
    };
}

const results = [];

results.push({ scenario: "SCENARIO 1: $100k Salary in Ontario", result: calculate(100000, "ON", false, 0, 0, 0) });
results.push({ scenario: "SCENARIO 2: $100k Salary in Nova Scotia", result: calculate(100000, "NS", false, 0, 0, 0) });
fs.writeFileSync('d:/Taxbuddycanada/test_output.json', JSON.stringify(results, null, 2));
