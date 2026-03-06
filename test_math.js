const FEDERAL_RATES = {
    brackets: [57375, 114750, 177882, 253414],
    rates: [0.15, 0.205, 0.26, 0.29, 0.33],
    bpaMax: 16129,
    bpaMin: 14538,
    ceaMax: 1433,
};

const CPP_2026 = {
    ympe: 73200,
    yampe: 85200,
    exemption: 3500,
    baseRate: 0.0495,
    enhancedRate: 0.01,
    rate2: 0.04,
    max2: 480
};

const EI_2026 = {
    mie: 67200,
    rate: 0.0164,
    max: 1102.08,
    rateQC: 0.0132,
    maxQC: 887.04
};

const PROVINCIAL_DATA = {
    ON: {
        name: "Ontario",
        brackets: [52054, 104111, 150000, 220000],
        rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
        bpa: 12891,
        divEligible: 0.0396,
        divIneligible: 0.0603
    },
    BC: {
        name: "British Columbia",
        brackets: [48455, 96911, 111453, 135804, 184541, 266155],
        rates: [0.0506, 0.077, 0.105, 0.1229, 0.147, 0.168, 0.205],
        bpa: 13038,
        divEligible: 0.0152,
        divIneligible: 0.063
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

    const taxableIncome = Math.max(0, inclusionIncome - rrspContribution - deductibleCPP);

    let fedTaxBeforeCredits = calculateProgressiveTax(taxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
    const fedBPA = calculateFederalBPA(taxableIncome);
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
results.push({ scenario: "SCENARIO 2: $100k Salary with $25k Taxes Pre-Paid", result: calculate(100000, "ON", false, 25000, 0, 0) });
results.push({ scenario: "SCENARIO 3: $150k Self-Employed in BC", result: calculate(150000, "BC", true, 0, 0, 0) });
results.push({ scenario: "SCENARIO 4: $100k Salary with exactly $10k RRSP Deduction", result: calculate(100000, "ON", false, 0, 10000, 0) });
results.push({ scenario: "SCENARIO 5: $100k Salary + $50k Capital Gains", result: calculate(100000, "ON", false, 0, 0, 50000) });

const fs = require('fs');
fs.writeFileSync('d:/Taxbuddycanada/test_output.json', JSON.stringify(results, null, 2));
