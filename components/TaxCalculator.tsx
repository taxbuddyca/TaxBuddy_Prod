"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    DollarSign,
    RefreshCw,
    Calculator as CalcIcon,
    ArrowRight,
    ChevronDown,
    Info,
    ShieldCheck,
    Zap,
    HelpCircle,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// 2025 Tax Year Data (Filing in 2026)
const FEDERAL_RATES = {
    brackets: [57375, 114750, 177882, 253414],
    rates: [0.145, 0.205, 0.26, 0.29, 0.33],
    bpa: 15705 // 2025 Federal Basic Personal Amount
};

const CPP_2025 = {
    ympe: 71300,
    yampe: 81200,
    exemption: 3500,
    rate1: 0.0595,
    rate2: 0.04,
    max1: 4034.10,
    max2: 396.00
};

const EI_2025 = {
    mie: 65700,
    rate: 0.0164,
    rateQC: 0.0131,
    max: 1077.48,
    maxQC: 860.67
};

const PROVINCIAL_DATA: Record<string, { name: string, brackets: number[], rates: number[], bpa: number, divEligible: number, divIneligible: number }> = {
    ON: {
        name: "Ontario",
        brackets: [52886, 105775, 150000, 220000],
        rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
        bpa: 12399,
        divEligible: 0.10, // Approx provincial dividend tax credit
        divIneligible: 0.0298
    },
    BC: {
        name: "British Columbia",
        brackets: [49279, 98560, 113158, 137407, 186306, 259829],
        rates: [0.0506, 0.0770, 0.1050, 0.1229, 0.1470, 0.1680, 0.2050],
        bpa: 12580,
        divEligible: 0.12,
        divIneligible: 0.0196
    },
    AB: {
        name: "Alberta",
        brackets: [151234, 181481, 241974, 362961],
        rates: [0.10, 0.12, 0.13, 0.14, 0.15],
        bpa: 21885,
        divEligible: 0.0812,
        divIneligible: 0.0218
    },
    QC: {
        name: "Quebec",
        brackets: [53255, 106495, 129590],
        rates: [0.14, 0.19, 0.24, 0.2575],
        bpa: 18056,
        divEligible: 0.117,
        divIneligible: 0.04
    },
    NS: {
        name: "Nova Scotia",
        brackets: [30507, 61015, 95883, 154650],
        rates: [0.0879, 0.1495, 0.1667, 0.1750, 0.21],
        bpa: 11481,
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
        bpa: 18491,
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
        brackets: [33928, 65820, 106890, 142250],
        rates: [0.095, 0.1347, 0.166, 0.1762, 0.187],
        bpa: 13500,
        divEligible: 0.105,
        divIneligible: 0.013
    },
    NL: {
        name: "Newfoundland and Labrador",
        brackets: [44192, 88382, 157792, 220910, 282214, 564429, 1128858],
        rates: [0.087, 0.145, 0.158, 0.178, 0.198, 0.208, 0.213, 0.218],
        bpa: 10818,
        divEligible: 0.063,
        divIneligible: 0.032
    }
};

const calculateProgressiveTax = (income: number, brackets: number[], rates: number[]) => {
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

export default function TaxCalculator() {
    const [income, setIncome] = useState<number>(0);
    const [selfEmployment, setSelfEmployment] = useState<number>(0);
    const [taxesPaid, setTaxesPaid] = useState<number>(0);
    const [rrspContribution, setRrspContribution] = useState<number>(0);
    const [otherIncome, setOtherIncome] = useState<number>(0);
    const [capitalGains, setCapitalGains] = useState<number>(0);
    const [eligibleDividends, setEligibleDividends] = useState<number>(0);
    const [ineligibleDividends, setIneligibleDividends] = useState<number>(0);
    const [province, setProvince] = useState('ON');

    // Results Calculation
    const results = useMemo(() => {
        const prov = PROVINCIAL_DATA[province];

        // Dividend Gross-up
        const grossedEligible = eligibleDividends * 1.38;
        const grossedIneligible = ineligibleDividends * 1.15;

        // Total and Taxable Income
        const totalIncome = income + selfEmployment + otherIncome + (capitalGains > 0 ? capitalGains * 0.5 : 0) + eligibleDividends + ineligibleDividends;

        // Inclusion income for tax calculation (grossed up dividends, 50% capital gains)
        const inclusionIncome = income + selfEmployment + otherIncome + (capitalGains > 0 ? capitalGains * 0.5 : 0) + grossedEligible + grossedIneligible;
        const taxableIncome = Math.max(0, inclusionIncome - rrspContribution);

        // CPP & EI Calculation (Simplified for 2025)
        const employmentEarnings = income + selfEmployment;

        // CPP1
        const cpp1Basis = Math.min(employmentEarnings, CPP_2025.ympe) - CPP_2025.exemption;
        const cpp1 = Math.max(0, cpp1Basis * CPP_2025.rate1);
        const finalCpp1 = Math.min(cpp1, CPP_2025.max1);

        // CPP2
        const cpp2Basis = Math.max(0, Math.min(employmentEarnings, CPP_2025.yampe) - CPP_2025.ympe);
        const cpp2 = cpp2Basis * CPP_2025.rate2;
        const finalCpp2 = Math.min(cpp2, CPP_2025.max2);

        const totalCPP = finalCpp1 + finalCpp2;

        // EI
        const eiRate = province === 'QC' ? EI_2025.rateQC : EI_2025.rate;
        const eiMax = province === 'QC' ? EI_2025.maxQC : EI_2025.max;
        const ei = Math.min(income * eiRate, eiMax);

        const totalCPPEI = totalCPP + ei;

        // Federal Tax
        let fedTaxBeforeCredits = calculateProgressiveTax(taxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
        // Basic Personal Amount Credit (14.5% of BPA)
        fedTaxBeforeCredits -= (FEDERAL_RATES.bpa * 0.145);
        // Dividend Tax Credits
        fedTaxBeforeCredits -= (grossedEligible * 0.1502);
        fedTaxBeforeCredits -= (grossedIneligible * 0.0903);

        const federalTax = Math.max(0, fedTaxBeforeCredits);

        // Provincial Tax
        let provTaxBeforeCredits = calculateProgressiveTax(taxableIncome, prov.brackets, prov.rates);
        // BPA
        provTaxBeforeCredits -= (prov.bpa * prov.rates[0]);
        // Provincial Dividend Credits (Approximate)
        provTaxBeforeCredits -= (grossedEligible * prov.divEligible);
        provTaxBeforeCredits -= (grossedIneligible * prov.divIneligible);

        const provTax = Math.max(0, provTaxBeforeCredits);

        const totalTax = federalTax + provTax + totalCPPEI;
        const netIncome = totalIncome - totalTax;

        const averageRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

        // Marginal Rate calculation
        const testIncome = taxableIncome + 100;
        const testTaxFed = calculateProgressiveTax(testIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
        const testTaxProv = calculateProgressiveTax(testIncome, prov.brackets, prov.rates);
        const marginalRate = (((testTaxFed + testTaxProv) - (calculateProgressiveTax(taxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates) + calculateProgressiveTax(taxableIncome, prov.brackets, prov.rates))) / 100) * 100;

        return {
            totalIncome,
            federalTax,
            provTax,
            totalCPPEI,
            totalTax,
            netIncome,
            averageRate,
            marginalRate,
            difference: taxesPaid - (federalTax + provTax) // Refund/Owed excluding CPP/EI usually
        };
    }, [income, selfEmployment, taxesPaid, rrspContribution, otherIncome, capitalGains, eligibleDividends, ineligibleDividends, province]);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start bg-[#f4f7f9] p-4 rounded-3xl">
            {/* Input Section */}
            <div className="flex-1 space-y-4 w-full bg-white p-6 rounded-2xl shadow-sm">
                <div className="grid md:grid-cols-1 gap-2">
                    <div className="space-y-2">
                        <label className="block border-b border-gray-100 pb-2">
                            <span className="block text-[8px] font-black text-gray-400 mb-0.5 uppercase tracking-widest">Province</span>
                            <div className="relative">
                                <select
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="w-full h-8 bg-transparent font-black text-base text-navy-950 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select Province</option>
                                    {Object.entries(PROVINCIAL_DATA).map(([code, data]) => (
                                        <option key={code} value={code}>{data.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-navy-900/30 pointer-events-none" size={12} />
                            </div>
                        </label>

                        {[
                            { label: "Employment income", value: income, setter: setIncome },
                            { label: "Self-employment income", value: selfEmployment, setter: setSelfEmployment },
                            { label: "Income taxes paid (Federal)", value: taxesPaid, setter: setTaxesPaid },
                            { label: "RRSP and FHSA contribution", value: rrspContribution, setter: setRrspContribution },
                            { label: "Other income (incl. EI)", value: otherIncome, setter: setOtherIncome },
                            { label: "Capital gains & losses", value: capitalGains, setter: setCapitalGains },
                            { label: "Eligible dividends", value: eligibleDividends, setter: setEligibleDividends },
                            { label: "Ineligible dividends", value: ineligibleDividends, setter: setIneligibleDividends },
                        ].map((field, idx) => (
                            <label key={idx} className="block border-b border-gray-100 pb-2">
                                <span className="block text-[8px] font-black text-gray-400 mb-0 uppercase tracking-widest">{field.label}</span>
                                <div className="relative group">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-black text-navy-950/20 group-focus-within:text-blue-600 transition-colors">$</span>
                                    <input
                                        type="number"
                                        value={field.value || ''}
                                        onChange={(e) => field.setter(Number(e.target.value))}
                                        className="w-full h-8 pl-4 bg-transparent font-black text-lg text-navy-950 outline-none placeholder:text-gray-200"
                                        placeholder="0"
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Result Sidebar */}
            <div className="w-full lg:w-[360px] space-y-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-5">
                        <div className="text-center">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated amount</div>
                            <div className="text-5xl font-black text-navy-950 tracking-tight">
                                ${Math.abs(Math.round(results.difference)).toLocaleString()}
                            </div>
                            <div className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">
                                {results.difference >= 0 ? "Refund" : "Balance Due"}
                            </div>
                        </div>

                        <div className="space-y-3 pt-5 border-t border-gray-100">
                            {[
                                { label: "Total income", value: results.totalIncome },
                                { label: "Federal tax", value: results.federalTax },
                                { label: "Provincial tax", value: results.provTax },
                                { label: "CPP/EI Premiums", value: results.totalCPPEI },
                            ].map((res, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold">{res.label}</span>
                                    <span className="text-navy-950 font-black">${Math.round(res.value).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <span className="text-navy-950 font-black text-base">Total tax</span>
                                <span className="text-navy-950 font-black text-base">${Math.round(results.totalTax).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-bold">Net income</span>
                                <span className="text-navy-950 font-black">${Math.round(results.netIncome).toLocaleString()}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-3">
                                <div className="text-center bg-gray-50 py-2 rounded-xl">
                                    <div className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Average rate</div>
                                    <div className="text-sm font-black text-navy-950">{results.averageRate.toFixed(2)}%</div>
                                </div>
                                <div className="text-center bg-gray-50 py-2 rounded-xl">
                                    <div className="text-[8px] font-black text-gray-400 uppercase mb-0.5">Marginal rate</div>
                                    <div className="text-sm font-black text-navy-950">{results.marginalRate.toFixed(2)}%</div>
                                </div>
                            </div>
                        </div>

                        <div className="py-4 text-center bg-blue-600 rounded-xl">
                            <h4 className="text-white text-xs font-black mb-0.5 px-4 leading-tight">Get ahead of your taxes this year.</h4>
                            <Link
                                href="/contact"
                                className="inline-block mt-3 px-8 py-2 bg-white text-blue-600 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                            >
                                Get started
                            </Link>
                        </div>

                        <p className="text-[8px] text-gray-400 text-center leading-relaxed">
                            Results are approximate, for illustration only, and are not tax advice.
                        </p>
                    </div>
                </div>

                {/* Mobile App Rebrand section for sidebar or below */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-white" />
                        </div>
                        <h3 className="font-black text-navy-950">File with Confidence</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        TaxBuddy pairs you with expert CPAs to handle every detail of your 2024 return. 100% accurate, 100% on-time.
                    </p>
                </div>
            </div>
        </div>
    );
}
