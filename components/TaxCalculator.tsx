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

import { TAX_CONSTANTS, TaxYear, calculateProgressiveTax, calculateFederalBPA, calculateCEA, calculateOntarioHealthPremium } from '../utils/taxConstants';

export default function TaxCalculator() {
    const [selectedYear, setSelectedYear] = useState<TaxYear>("2025");
    const [income, setIncome] = useState<number>(0);
    const [isSelfEmployed, setIsSelfEmployed] = useState<boolean>(false);
    const [taxesPaid, setTaxesPaid] = useState<number>(0);
    const [rrspContribution, setRrspContribution] = useState<number>(0);
    const [otherIncome, setOtherIncome] = useState<number>(0);
    const [capitalGains, setCapitalGains] = useState<number>(0);
    const [eligibleDividends, setEligibleDividends] = useState<number>(0);
    const [ineligibleDividends, setIneligibleDividends] = useState<number>(0);
    const [province, setProvince] = useState('ON');

    const config = TAX_CONSTANTS[selectedYear];
    const FEDERAL_RATES = config.federal;
    const CPP_2026 = config.cpp;
    const EI_2026 = config.ei;
    const PROVINCIAL_DATA = config.provincial;

    // Results Calculation
    const results = useMemo(() => {
        const prov = PROVINCIAL_DATA[province];

        // Dividend Gross-up
        const grossedEligible = eligibleDividends * 1.38;
        const grossedIneligible = ineligibleDividends * 1.15;

        // Total Cash Income (Before Tax)
        // Capital gains are fully added to cash flow (not just the 50% taxable portion)
        const totalIncome = income + otherIncome + capitalGains + eligibleDividends + ineligibleDividends;

        // Inclusion income for tax calculation (Taxable portion only)
        const inclusionIncome = income + otherIncome + (capitalGains > 0 ? capitalGains * 0.5 : 0) + grossedEligible + grossedIneligible;

        // 2026 CPP Logic (Deductible vs Credit-Eligible)
        const cpp1Basis = Math.min(Math.max(0, income), CPP_2026.ympe) - CPP_2026.exemption;
        const cpp1BasisPositive = Math.max(0, cpp1Basis);

        // Base CPP (Credit) vs Enhanced CPP (Deduction)
        let baseCppContribution = 0;
        let enhancedCppContribution = 0;
        let cpp2Contribution = 0;
        let employerCppDeduction = 0;

        const maxBaseCpp = (CPP_2026.ympe - CPP_2026.exemption) * CPP_2026.baseRate;
        const maxEnhancedCpp = (CPP_2026.ympe - CPP_2026.exemption) * CPP_2026.enhancedRate;

        if (isSelfEmployed) {
            baseCppContribution = Math.min(cpp1BasisPositive * CPP_2026.baseRate, maxBaseCpp);
            enhancedCppContribution = Math.min(cpp1BasisPositive * CPP_2026.enhancedRate, maxEnhancedCpp);
            employerCppDeduction = baseCppContribution + enhancedCppContribution; // employer portion

            const cpp2Basis = Math.max(0, Math.min(income, CPP_2026.yampe) - CPP_2026.ympe);
            const halfCpp2 = Math.min(cpp2Basis * CPP_2026.rate2, CPP_2026.max2);
            cpp2Contribution = halfCpp2 * 2; // Paid in full by self-employed
            employerCppDeduction += halfCpp2; // Half is deductible as employer portion
        } else {
            baseCppContribution = Math.min(cpp1BasisPositive * CPP_2026.baseRate, maxBaseCpp);
            enhancedCppContribution = Math.min(cpp1BasisPositive * CPP_2026.enhancedRate, maxEnhancedCpp);

            const cpp2Basis = Math.max(0, Math.min(income, CPP_2026.yampe) - CPP_2026.ympe);
            cpp2Contribution = Math.min(cpp2Basis * CPP_2026.rate2, CPP_2026.max2);
        }

        const totalCPPPaid = baseCppContribution + enhancedCppContribution + cpp2Contribution + employerCppDeduction;
        const deductibleCPP = enhancedCppContribution + (isSelfEmployed ? (cpp2Contribution / 2) : cpp2Contribution) + employerCppDeduction;
        const creditableCPP = baseCppContribution;

        // 2026 EI Logic
        const eiRate = province === 'QC' ? EI_2026.rateQC : EI_2026.rate;
        const eiMax = province === 'QC' ? EI_2026.maxQC : EI_2026.max;
        const totalEIPaid = isSelfEmployed ? 0 : Math.min(income * eiRate, eiMax);
        const creditableEI = totalEIPaid;

        // Taxable Income Calculation (After Deductions)
        const taxableIncome = Math.max(0, inclusionIncome - rrspContribution - deductibleCPP);

        // Federal Tax (2026 Brackets)
        let fedTaxBeforeCredits = calculateProgressiveTax(taxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);

        // Federal Non-Refundable Tax Credits
        const fedBPA = calculateFederalBPA(taxableIncome, FEDERAL_RATES);
        fedTaxBeforeCredits -= (fedBPA * FEDERAL_RATES.rates[0]);
        fedTaxBeforeCredits -= calculateCEA(income, FEDERAL_RATES);
        fedTaxBeforeCredits -= ((creditableCPP + creditableEI) * FEDERAL_RATES.rates[0]);
        fedTaxBeforeCredits -= (grossedEligible * 0.1502);
        fedTaxBeforeCredits -= (grossedIneligible * 0.0903);

        let finalFederalTax = Math.max(0, fedTaxBeforeCredits);

        // Quebec Federal Abatement
        if (province === 'QC') {
            finalFederalTax -= (finalFederalTax * 0.165);
        }

        // Provincial Tax
        let provTaxBeforeCredits = calculateProgressiveTax(taxableIncome, prov.brackets, prov.rates);
        provTaxBeforeCredits -= (prov.bpa * prov.rates[0]);
        provTaxBeforeCredits -= ((creditableCPP + creditableEI) * prov.rates[0]);
        provTaxBeforeCredits -= (grossedEligible * prov.divEligible);
        provTaxBeforeCredits -= (grossedIneligible * prov.divIneligible);

        let finalProvTax = Math.max(0, provTaxBeforeCredits);

        // Provincial Surtax (dynamic from config, e.g. Ontario)
        if (prov.surtaxThreshold1 && prov.surtaxRate1) {
            let surtax = 0;
            if (finalProvTax > prov.surtaxThreshold1) {
                surtax += (finalProvTax - prov.surtaxThreshold1) * prov.surtaxRate1;
            }
            if (prov.surtaxThreshold2 && prov.surtaxRate2 && finalProvTax > prov.surtaxThreshold2) {
                surtax += (finalProvTax - prov.surtaxThreshold2) * prov.surtaxRate2;
            }
            finalProvTax += surtax;
        }

        // Ontario Health Premium (OHP) — added to provincial tax
        if (province === 'ON') {
            finalProvTax += calculateOntarioHealthPremium(taxableIncome);
        }

        // Auto-simulate T4 Withholdings if user hasn't typed anything
        let assumedTaxesPaid = taxesPaid;

        if (taxesPaid === 0 && !isSelfEmployed && income > 0) {
            // BUG FIX: Only Enhanced CPP and CPP2 are deductible. Base CPP is a Non-Refundable Tax Credit!
            const mockTaxableIncome = Math.max(0, income - enhancedCppContribution - cpp2Contribution);

            let mockFed = calculateProgressiveTax(mockTaxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
            mockFed -= (calculateFederalBPA(mockTaxableIncome, FEDERAL_RATES) * FEDERAL_RATES.rates[0]);
            mockFed -= calculateCEA(income, FEDERAL_RATES);
            // BUG FIX: Base CPP correctly applied as a Credit here.
            mockFed -= ((baseCppContribution + totalEIPaid) * FEDERAL_RATES.rates[0]);
            mockFed = Math.max(0, mockFed);
            if (province === 'QC') mockFed -= (mockFed * 0.165);

            let mockProv = calculateProgressiveTax(mockTaxableIncome, prov.brackets, prov.rates);
            mockProv -= (prov.bpa * prov.rates[0]);
            mockProv -= ((baseCppContribution + totalEIPaid) * prov.rates[0]);
            mockProv = Math.max(0, mockProv);
            if (prov.surtaxThreshold1 && prov.surtaxRate1) {
                let mockSurtax = 0;
                if (mockProv > prov.surtaxThreshold1) mockSurtax += (mockProv - prov.surtaxThreshold1) * prov.surtaxRate1;
                if (prov.surtaxThreshold2 && prov.surtaxRate2 && mockProv > prov.surtaxThreshold2) mockSurtax += (mockProv - prov.surtaxThreshold2) * prov.surtaxRate2;
                mockProv += mockSurtax;
            }
            if (province === 'ON') {
                mockProv += calculateOntarioHealthPremium(mockTaxableIncome);
            }
            assumedTaxesPaid = mockFed + mockProv;
        }

        const totalTax = finalFederalTax + finalProvTax + totalCPPPaid + totalEIPaid;

        // Actual net cash retained (Gross Cash - Total True Tax Liability)
        const netIncome = totalIncome - totalTax;

        const averageRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

        // Marginal Rate calculation
        const testIncome = taxableIncome + 100;
        const testTaxFed = calculateProgressiveTax(testIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
        const testTaxProv = calculateProgressiveTax(testIncome, prov.brackets, prov.rates);
        let testFinalFed = testTaxFed;
        if (province === 'QC') testFinalFed -= (testFinalFed * 0.165);

        let testFinalProv = testTaxProv;
        if (prov.surtaxThreshold1 && prov.surtaxRate1) {
            let surtax = 0;
            if (testFinalProv > prov.surtaxThreshold1) surtax += (testFinalProv - prov.surtaxThreshold1) * prov.surtaxRate1;
            if (prov.surtaxThreshold2 && prov.surtaxRate2 && testFinalProv > prov.surtaxThreshold2) surtax += (testFinalProv - prov.surtaxThreshold2) * prov.surtaxRate2;
            testFinalProv += surtax;
        }

        const baseTestTaxFed = calculateProgressiveTax(taxableIncome, FEDERAL_RATES.brackets, FEDERAL_RATES.rates);
        const baseTestTaxProv = calculateProgressiveTax(taxableIncome, prov.brackets, prov.rates);
        let baseFinalFed = baseTestTaxFed;
        if (province === 'QC') baseFinalFed -= (baseFinalFed * 0.165);
        let baseFinalProv = baseTestTaxProv;
        if (prov.surtaxThreshold1 && prov.surtaxRate1) {
            let surtax = 0;
            if (baseFinalProv > prov.surtaxThreshold1) surtax += (baseFinalProv - prov.surtaxThreshold1) * prov.surtaxRate1;
            if (prov.surtaxThreshold2 && prov.surtaxRate2 && baseFinalProv > prov.surtaxThreshold2) surtax += (baseFinalProv - prov.surtaxThreshold2) * prov.surtaxRate2;
            baseFinalProv += surtax;
        }

        const marginalRate = (((testFinalFed + testFinalProv) - (baseFinalFed + baseFinalProv)) / 100) * 100;

        return {
            totalIncome,
            federalTax: finalFederalTax,
            provTax: finalProvTax,
            totalIncomeTax: finalFederalTax + finalProvTax,
            totalCPPEI: totalCPPPaid + totalEIPaid,
            totalTax,
            netIncome,
            averageRate,
            marginalRate,
            assumedTaxesPaid,
            difference: assumedTaxesPaid - (finalFederalTax + finalProvTax + (isSelfEmployed ? totalCPPPaid : 0)) // Refund/Owed subtracting what they still owe
        };
    }, [selectedYear, income, isSelfEmployed, taxesPaid, rrspContribution, otherIncome, capitalGains, eligibleDividends, ineligibleDividends, province]);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start bg-[#f4f7f9] p-4 rounded-3xl">
            {/* Input Section */}
            <div className="flex-1 space-y-4 w-full bg-white p-6 rounded-2xl shadow-sm">
                <div className="grid md:grid-cols-1 gap-2">
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
                                    <option value="" disabled>Select Province</option>
                                    {Object.entries(PROVINCIAL_DATA).map(([code, data]) => (
                                        <option key={code} value={code}>{data.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </label>

                        <div className="space-y-8 mt-8">
                            <div>
                                <h3 className="text-[10px] font-black text-navy-950 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2"><DollarSign size={14} className="text-blue-600" /> Core Income</h3>
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
                                            { label: "Other income (incl. EI)", value: otherIncome, setter: setOtherIncome },
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
                                <h3 className="text-[10px] font-black text-navy-950 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2"><TrendingUp size={14} className="text-blue-600" /> Investments</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "Capital gains & losses", value: capitalGains, setter: setCapitalGains },
                                        { label: "Eligible dividends", value: eligibleDividends, setter: setEligibleDividends },
                                        { label: "Ineligible dividends", value: ineligibleDividends, setter: setIneligibleDividends },
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

                            <div>
                                <h3 className="text-[10px] font-black text-navy-950 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2"><ShieldCheck size={14} className="text-blue-600" /> Deductions & Withholdings</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: "RRSP & FHSA contribution", value: rrspContribution, setter: setRrspContribution },
                                        { label: "Income taxes already withheld", value: taxesPaid, setter: setTaxesPaid, autoValue: results.assumedTaxesPaid },
                                    ].map((field, idx) => (
                                        <label key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                                            <span className="block text-xs font-bold text-gray-500">{field.label}</span>
                                            <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-200 sm:w-1/2">
                                                <div className="pl-4 pr-2 text-gray-400 font-semibold">$</div>
                                                <input
                                                    type="number"
                                                    value={field.value || ''}
                                                    onChange={(e) => field.setter(Number(e.target.value))}
                                                    className={`w-full h-12 bg-transparent font-bold text-lg outline-none ${field.value ? 'text-navy-950' : 'text-gray-600 placeholder:text-gray-400 placeholder:font-semibold'}`}
                                                    placeholder={field.autoValue && field.value === 0 ? `Auto-est: ${Math.round(field.autoValue).toLocaleString()}` : "0"}
                                                />
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Sidebar */}
            <div className="w-full lg:w-[360px] space-y-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 space-y-5">
                        <div className="text-center">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated amount</div>
                            <div className={`text-5xl font-black tracking-tight ${results.difference >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {results.difference >= 0 ? '' : '-'}${Math.abs(Math.round(results.difference)).toLocaleString()}
                            </div>
                            <div className={`text-[11px] font-black mt-1 uppercase tracking-widest px-3 py-1 rounded-full inline-block ${results.difference >= 0
                                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                                : 'text-rose-700 bg-rose-50 border border-rose-200'
                                }`}>
                                {results.difference >= 0 ? '✓ Tax Refund' : '⚠ Balance Due'}
                            </div>
                        </div>

                        <div className="space-y-3 pt-5 border-t border-gray-100">
                            {[
                                { label: "Total income", value: results.totalIncome },
                                { label: "Federal tax", value: results.federalTax },
                                { label: "Provincial tax", value: results.provTax },
                            ].map((res, i) => (
                                <div key={i} className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold">{res.label}</span>
                                    <span className="text-navy-950 font-black">${Math.round(res.value).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                <span className="text-navy-950 font-black text-base">Total income tax</span>
                                <span className="text-navy-950 font-black text-base">${Math.round(results.totalIncomeTax).toLocaleString()}</span>
                            </div>
                            {taxesPaid > 0 ? (
                                <div className="flex justify-between items-center text-xs text-blue-600 mt-1 pb-1">
                                    <span className="font-bold">Taxes withheld</span>
                                    <span className="font-black">-${Math.round(taxesPaid).toLocaleString()}</span>
                                </div>
                            ) : (results.assumedTaxesPaid > 0 && !isSelfEmployed) ? (
                                <div className="flex justify-between items-center text-xs text-emerald-600 mt-1 pb-1" title="Estimated Employer Waitings based on T4">
                                    <span className="font-bold border-b border-dashed border-emerald-300 pb-0.5 cursor-help">Assumed withholdings</span>
                                    <span className="font-black">-${Math.round(results.assumedTaxesPaid).toLocaleString()}</span>
                                </div>
                            ) : null}

                            <div className="pt-2 mt-2 border-t border-gray-100 border-dashed">
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span className="font-bold">Mandatory CPP/EI Premiums</span>
                                    <span className="font-black">${Math.round(results.totalCPPEI).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-xs mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <span className="text-gray-600 font-bold uppercase tracking-wider text-[10px]">After-tax income</span>
                                <span className="text-emerald-600 font-black text-sm">${Math.round(results.netIncome).toLocaleString()}</span>
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
