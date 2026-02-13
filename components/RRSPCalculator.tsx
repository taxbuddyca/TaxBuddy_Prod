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

// 2025 Tax Year Constants
const RRSP_ANNUAL_LIMIT_2025 = 32490;
const RRSP_CONTRIBUTION_DEADLINE = "March 2, 2026";

export default function RRSPCalculator() {
    const [income, setIncome] = useState<number>(0);
    const [otherIncome, setOtherIncome] = useState<number>(0);
    const [taxesPaid, setTaxesPaid] = useState<number>(0);
    const [contribution, setContribution] = useState<number>(0);
    const [province, setProvince] = useState('ON');

    // Results Calculation
    const results = useMemo(() => {
        const totalIncome = income + otherIncome;

        // Simplified tax calculation logic for RRSP demonstration
        // In a real app, we'd use the full tax engine here
        // For the calculator, we'll estimate a 25% average savings for most users 
        // who contribute to an RRSP (based on typical marginal rates)

        const estMarginalRate = totalIncome > 114000 ? 0.43 : totalIncome > 57000 ? 0.31 : 0.20;
        const taxSavings = contribution * estMarginalRate;
        const rrLimit = Math.min(income * 0.18, RRSP_ANNUAL_LIMIT_2025);

        return {
            totalIncome,
            taxSavings,
            limit: rrLimit,
            netIncome: totalIncome - taxSavings, // This is a bit simplified
            refund: taxSavings // Assumption: tax savings translates to a refund increase
        };
    }, [income, otherIncome, contribution]);

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-start bg-[#f4f7f9] p-4 rounded-3xl">
            {/* Input Section */}
            <div className="flex-1 space-y-4 w-full bg-white p-6 rounded-2xl shadow-sm">
                <div className="grid md:grid-cols-1 gap-4">
                    <div className="space-y-4">
                        <label className="block border-b border-gray-100 pb-3">
                            <span className="block text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">Province</span>
                            <div className="relative">
                                <select
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="w-full h-10 bg-transparent font-black text-lg text-navy-950 outline-none appearance-none cursor-pointer"
                                >
                                    <option value="ON">Ontario</option>
                                    <option value="BC">British Columbia</option>
                                    <option value="AB">Alberta</option>
                                    <option value="QC">Quebec</option>
                                    {/* Simplified for brevity, usually full list here */}
                                </select>
                                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-navy-900/30 pointer-events-none" size={16} />
                            </div>
                        </label>

                        {[
                            { label: "Employment income", value: income, setter: setIncome },
                            { label: "Other income", value: otherIncome, setter: setOtherIncome },
                            { label: "Income taxes paid", value: taxesPaid, setter: setTaxesPaid },
                            { label: "Planned RRSP Contribution", value: contribution, setter: setContribution },
                        ].map((field, idx) => (
                            <label key={idx} className="block border-b border-gray-100 pb-3">
                                <span className="block text-[10px] font-black text-gray-400 mb-0.5 uppercase tracking-widest">{field.label}</span>
                                <div className="relative group">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-lg font-black text-navy-950/20 group-focus-within:text-blue-600 transition-colors">$</span>
                                    <input
                                        type="number"
                                        value={field.value || ''}
                                        onChange={(e) => field.setter(Number(e.target.value))}
                                        className="w-full h-10 pl-5 bg-transparent font-black text-xl text-navy-950 outline-none placeholder:text-gray-200"
                                        placeholder="0"
                                    />
                                </div>
                            </label>
                        ))}
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
                                Your estimated 2025 contribution room based on current income is <span className="text-navy-950">${Math.round(results.limit).toLocaleString()}</span>.
                                The deadline for your 2025 return is {RRSP_CONTRIBUTION_DEADLINE}.
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
                                className="inline-block mt-3 px-8 py-2 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition shadow-sm"
                            >
                                Maximize My Savings
                            </Link>
                        </div>

                        <div className="text-center">
                            <Link href="/resources/rrsp-limits" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline decoration-2">
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
