"use client";

import React, { useState, useMemo } from 'react';
import {
    DollarSign,
    ChevronDown,
    Calculator as CalcIcon,
    TrendingUp,
    Info,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

import { TAX_CONSTANTS, TaxYear, calculateProgressiveTax, calculateFederalBPA, calculateCEA, calculateOntarioHealthPremium } from '../utils/taxConstants';

export default function RRSPCalculator() {
    const [selectedYear, setSelectedYear] = useState<TaxYear>("2025");
    const [income, setIncome] = useState<number>(0);
    const [isSelfEmployed, setIsSelfEmployed] = useState<boolean>(false);
    const [otherIncome, setOtherIncome] = useState<number>(0);
    const [taxesPaid, setTaxesPaid] = useState<number>(0);
    const [contribution, setContribution] = useState<number>(0);
    const [province, setProvince] = useState('ON');

    const config = TAX_CONSTANTS[selectedYear];
    const FEDERAL_RATES = config.federal;
    const CPP_2026 = config.cpp;
    const EI_2026 = config.ei;
    const PROVINCIAL_DATA = config.provincial;
    const RRSP_ANNUAL_LIMIT = config.rrspLimit;
    const RRSP_CONTRIBUTION_DEADLINE = selectedYear === "2026" ? "March 1, 2027" : "March 1, 2026";

    // Results Calculation
    const results = useMemo(() => {
        const totalIncome = income + otherIncome;
        const prov = PROVINCIAL_DATA[province];

        // 2026 Exact CPP/EI
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

        const deductibleCPP = enhancedCppContribution + (isSelfEmployed ? (cpp2Contribution / 2) : cpp2Contribution) + employerCppDeduction;
        const creditableCPP = baseCppContribution;

        const eiRate = province === 'QC' ? EI_2026.rateQC : EI_2026.rate;
        const eiMax = province === 'QC' ? EI_2026.maxQC : EI_2026.max;
        const creditableEI = Math.min(income * eiRate, eiMax);

        // --- RUN 1. Calculate Tax WITHOUT RRSP Contribution ---
        const taxableIncomeNoRRSP = Math.max(0, totalIncome - deductibleCPP);

        let fedTaxNoRRSP = calculateProgressiveTax(taxableIncomeNoRRSP, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
        fedTaxNoRRSP -= (calculateFederalBPA(taxableIncomeNoRRSP, FEDERAL_RATES) * FEDERAL_RATES.rates[0]);
        fedTaxNoRRSP -= calculateCEA(income, FEDERAL_RATES);
        fedTaxNoRRSP -= ((creditableCPP + creditableEI) * FEDERAL_RATES.rates[0]);
        fedTaxNoRRSP = Math.max(0, fedTaxNoRRSP);
        if (province === 'QC') fedTaxNoRRSP -= (fedTaxNoRRSP * 0.165); // Abatement

        let provTaxNoRRSP = calculateProgressiveTax(taxableIncomeNoRRSP, prov.brackets, prov.rates);
        provTaxNoRRSP -= (prov.bpa * prov.rates[0]);
        provTaxNoRRSP -= ((creditableCPP + creditableEI) * prov.rates[0]);
        provTaxNoRRSP = Math.max(0, provTaxNoRRSP);
        if (prov.surtaxThreshold1 && prov.surtaxRate1) {
            let surtax = 0;
            if (provTaxNoRRSP > prov.surtaxThreshold1) surtax += (provTaxNoRRSP - prov.surtaxThreshold1) * prov.surtaxRate1;
            if (prov.surtaxThreshold2 && prov.surtaxRate2 && provTaxNoRRSP > prov.surtaxThreshold2) surtax += (provTaxNoRRSP - prov.surtaxThreshold2) * prov.surtaxRate2;
            provTaxNoRRSP += surtax;
        }
        if (province === 'ON') {
            provTaxNoRRSP += calculateOntarioHealthPremium(taxableIncomeNoRRSP);
        }

        const totalTaxNoRRSP = fedTaxNoRRSP + provTaxNoRRSP;

        // --- RUN 2. Calculate Tax WITH RRSP Contribution ---
        const taxableIncomeWithRRSP = Math.max(0, totalIncome - contribution - deductibleCPP);

        let fedTaxWithRRSP = calculateProgressiveTax(taxableIncomeWithRRSP, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
        fedTaxWithRRSP -= (calculateFederalBPA(taxableIncomeWithRRSP, FEDERAL_RATES) * FEDERAL_RATES.rates[0]);
        fedTaxWithRRSP -= calculateCEA(income, FEDERAL_RATES);
        fedTaxWithRRSP -= ((creditableCPP + creditableEI) * FEDERAL_RATES.rates[0]);
        fedTaxWithRRSP = Math.max(0, fedTaxWithRRSP);
        if (province === 'QC') fedTaxWithRRSP -= (fedTaxWithRRSP * 0.165);

        let provTaxWithRRSP = calculateProgressiveTax(taxableIncomeWithRRSP, prov.brackets, prov.rates);
        provTaxWithRRSP -= (prov.bpa * prov.rates[0]);
        provTaxWithRRSP -= ((creditableCPP + creditableEI) * prov.rates[0]);
        provTaxWithRRSP = Math.max(0, provTaxWithRRSP);
        if (prov.surtaxThreshold1 && prov.surtaxRate1) {
            let surtax = 0;
            if (provTaxWithRRSP > prov.surtaxThreshold1) surtax += (provTaxWithRRSP - prov.surtaxThreshold1) * prov.surtaxRate1;
            if (prov.surtaxThreshold2 && prov.surtaxRate2 && provTaxWithRRSP > prov.surtaxThreshold2) surtax += (provTaxWithRRSP - prov.surtaxThreshold2) * prov.surtaxRate2;
            provTaxWithRRSP += surtax;
        }
        if (province === 'ON') {
            provTaxWithRRSP += calculateOntarioHealthPremium(taxableIncomeWithRRSP);
        }

        const totalTaxWithRRSP = fedTaxWithRRSP + provTaxWithRRSP;

        // The Tax Savings is the difference between tax owed before vs after
        const taxSavings = Math.max(0, totalTaxNoRRSP - totalTaxWithRRSP);
        const rrLimit = Math.min(income * 0.18, RRSP_ANNUAL_LIMIT);

        // Actual cash remaining after paying your total tax liability, and putting cash into your RRSP
        const actualNetCashInHand = totalIncome - totalTaxWithRRSP;

        return {
            totalIncome,
            taxSavings,
            limit: rrLimit,
            netIncome: actualNetCashInHand,
            refund: taxSavings // Assumption: tax savings translates to a refund increase
        };
    }, [selectedYear, income, isSelfEmployed, otherIncome, contribution, province]);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start bg-[#f4f7f9] p-4 rounded-3xl">
            {/* Input Section */}
            <div className="flex-1 space-y-4 w-full bg-white p-6 rounded-2xl shadow-sm">
                <div className="grid md:grid-cols-1 gap-4">
                    <div className="space-y-4">
                        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                            <span className="block text-xs font-bold text-gray-500 uppercase">Tax Year</span>
                            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-200 sm:w-1/2">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value as TaxYear)}
                                    className="w-full h-12 px-4 bg-transparent font-bold text-navy-950 text-lg outline-none appearance-none cursor-pointer"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </label>
                        <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                            <span className="block text-xs font-bold text-gray-500 uppercase">Province</span>
                            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-200 sm:w-1/2">
                                <select
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="w-full h-12 px-4 bg-transparent font-bold text-navy-950 text-lg outline-none appearance-none cursor-pointer"
                                >
                                    {Object.entries(PROVINCIAL_DATA).map(([code, data]) => (
                                        <option key={code} value={code}>{data.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </label>

                        <div className="space-y-8 mt-8">
                            <div>
                                <h3 className="text-[10px] font-black text-navy-950 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2"><DollarSign size={14} className="text-blue-600" /> Current Income</h3>
                                <div className="space-y-4">
                                    <div className="pb-4 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Employment Type</span>
                                        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 sm:w-1/2">
                                            <button
                                                onClick={() => setIsSelfEmployed(false)}
                                                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${!isSelfEmployed ? 'bg-white text-blue-600 shadow-sm border border-gray-200' : 'text-gray-400 hover:text-navy-950'}`}
                                            >
                                                Employee
                                            </button>
                                            <button
                                                onClick={() => setIsSelfEmployed(true)}
                                                className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${isSelfEmployed ? 'bg-white text-blue-600 shadow-sm border border-gray-200' : 'text-gray-400 hover:text-navy-950'}`}
                                            >
                                                Self-Employed
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Employment & Business Income", value: income, setter: setIncome },
                                            { label: "Other income", value: otherIncome, setter: setOtherIncome },
                                        ].map((field, idx) => (
                                            <label key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                                <span className="block text-xs font-bold text-gray-500">{field.label}</span>
                                                <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-200 sm:w-1/2">
                                                    <div className="pl-4 pr-2 text-gray-400 font-semibold">$</div>
                                                    <input
                                                        type="number"
                                                        value={field.value || ''}
                                                        onChange={(e) => field.setter(Number(e.target.value))}
                                                        className="w-full h-12 bg-transparent font-bold text-navy-950 text-lg outline-none placeholder:text-gray-300 placeholder:font-normal"
                                                        placeholder="0"
                                                    />
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-black text-navy-950 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2"><TrendingUp size={14} className="text-emerald-600" /> Plan</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Planned RRSP Contribution", value: contribution, setter: setContribution },
                                    ].map((field, idx) => (
                                        <label key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                            <span className="block text-xs font-bold text-emerald-600">{field.label}</span>
                                            <div className="relative flex items-center bg-emerald-50/50 border border-emerald-100 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-500 transition-all duration-200 sm:w-1/2">
                                                <div className="pl-4 pr-2 text-emerald-600 font-semibold">$</div>
                                                <input
                                                    type="number"
                                                    value={field.value || ''}
                                                    onChange={(e) => field.setter(Number(e.target.value))}
                                                    className="w-full h-12 bg-transparent font-bold text-emerald-700 text-lg outline-none placeholder:text-emerald-300 placeholder:font-normal"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                            <Info className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-navy-950 mb-1 uppercase tracking-tight">Pro Tip: Contribution Limit</h4>
                            <p className="text-xs text-navy-900/40 font-bold leading-relaxed">
                                Your estimated 2026 contribution room based on current income is <span className="text-navy-950">${Math.round(results.limit).toLocaleString()}</span>.
                                The deadline for your 2026 return is {RRSP_CONTRIBUTION_DEADLINE}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Sidebar */}
            <div className="w-full lg:w-[360px] space-y-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-5">
                        <div className="text-center">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Tax Savings</div>
                            <div className="text-5xl font-black text-emerald-600 tracking-tight">
                                ${Math.round(results.taxSavings).toLocaleString()}
                            </div>
                            <div className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">
                                Instant Refund Increase
                            </div>
                        </div>

                        <div className="space-y-3 pt-5 border-t border-gray-100">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-bold">Total annual income</span>
                                <span className="text-navy-950 font-black">${Math.round(results.totalIncome).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-bold">RRSP Deduction Room</span>
                                <span className="text-navy-950 font-black">${Math.round(results.limit).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <span className="text-navy-950 font-black text-base">Remaining Room</span>
                                <span className="text-navy-950 font-black text-base">${Math.max(0, Math.round(results.limit - contribution)).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="py-4 text-center bg-navy-950 rounded-xl shadow-xl">
                            <h4 className="text-white text-xs font-black mb-0.5 px-4 leading-tight">Grow your wealth faster.</h4>
                            <Link
                                href="/contact"
                                className="inline-block mt-3 px-8 py-2 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                            >
                                Maximize My Savings
                            </Link>
                        </div>

                        <div className="text-center">
                            <Link href="/resources/rrsp-limits" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                Learn about RRSP rules <ArrowRight size={10} className="inline ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-emerald-600" />
                        </div>
                        <h3 className="font-black text-navy-950 uppercase tracking-tight text-sm">Wealth Advisor</h3>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold leading-relaxed mb-4">
                        TaxBuddy CPAs don't just file your taxes; we help you build a strategy to minimize liability and maximize net worth.
                    </p>
                    <Link href="/services" className="text-[10px] font-black text-navy-950 uppercase tracking-widest border-b border-navy-950/10 pb-1">Our Strategy</Link>
                </div>
            </div>
        </div>
    );
}
