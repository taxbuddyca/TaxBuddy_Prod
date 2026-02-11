
"use client";

import React, { useState } from 'react';
import { DollarSign, RefreshCw, Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TaxCalculator() {
    const [income, setIncome] = useState<number | ''>('');
    const [taxesPaid, setTaxesPaid] = useState<number | ''>('');
    const [province, setProvince] = useState('ON');
    const [result, setResult] = useState<{ refund: number; owing: number } | null>(null);

    // 2024/2025 Combined Marginal Tax Rate Estimations (Simplified Top-of-bracket)
    // Source: Taxtips.ca / CRA (Approximated for estimation tool)
    const taxRates: Record<string, { brackets: number[], rates: number[] }> = {
        ON: { // Ontario
            brackets: [51446, 102894, 150000, 220000],
            rates: [0.2005, 0.2415, 0.3148, 0.4616, 0.5353]
        },
        BC: { // British Columbia
            brackets: [47937, 95875, 110076, 252752],
            rates: [0.2006, 0.2270, 0.3100, 0.4070, 0.5350]
        },
        AB: { // Alberta
            brackets: [148269, 177922, 237230, 355845],
            rates: [0.2500, 0.3050, 0.3600, 0.3800, 0.4800]
        },
        NS: { // Nova Scotia (High tax)
            brackets: [29590, 59180, 93000, 150000],
            rates: [0.2379, 0.2432, 0.3048, 0.3717, 0.5000] // Approx combined
        },
        QC: { // Quebec (Very distinct, approx)
            brackets: [51780, 103545, 126000, 240000], // QC provincial + Federal abatement
            rates: [0.2753, 0.3253, 0.3712, 0.4112, 0.5331]
        },
        SK: { // Saskatchewan
            brackets: [52057, 148734, 220000],
            rates: [0.2550, 0.3050, 0.4000, 0.4750]
        },
        MB: { // Manitoba
            brackets: [47000, 100000, 220000],
            rates: [0.2580, 0.3325, 0.4340, 0.5040]
        },
        NB: { // New Brunswick
            brackets: [49958, 99916, 185000],
            rates: [0.2400, 0.2900, 0.4200, 0.5250]
        },
        PE: { // PEI
            brackets: [32656, 64313, 105000],
            rates: [0.2480, 0.2887, 0.3720, 0.5137]
        },
        NL: { // Newfoundland
            brackets: [43198, 86395, 154244],
            rates: [0.2370, 0.2950, 0.4030, 0.5180]
        },
    };

    const calculateTax = () => {
        const incomeVal = Number(income) || 0;
        const paidVal = Number(taxesPaid) || 0;

        // Default to a generous flat rate if province not found (safe fallback)
        const provData = taxRates[province] || taxRates['ON'];

        let estimatedTax = 0;
        let remainingIncome = incomeVal;
        let previousBracketLimit = 0;

        // Progressive Calculation
        // NOTE: This IS an estimation. Real tax involves credits (Basic Personal Amount), deductions, CPP/EI.
        // To make it simple but "feeling" right: We calculate gross tax then subtract BPA approx worth ~3k.

        let calculated = false;

        // Simple effective rate lookup (faster for lead gen tool than full loop)
        // Find which bracket we are in and apply roughly the effective rate for that income level
        // This avoids complex marginal math for user-facing "Estimation"

        let effectiveRate = provData.rates[0];

        if (incomeVal > provData.brackets[provData.brackets.length - 1]) {
            effectiveRate = (provData.rates[provData.rates.length - 1] + provData.rates[provData.rates.length - 2]) / 2; // High income avg
        } else {
            for (let i = 0; i < provData.brackets.length; i++) {
                if (incomeVal <= provData.brackets[i]) {
                    effectiveRate = i === 0 ? provData.rates[0] : (provData.rates[i] + provData.rates[i - 1]) / 2;
                    break;
                }
            }
        }

        estimatedTax = incomeVal * effectiveRate;

        // Basic Personal Amount Credit (Approx $15k @ 15% fed + prov ~ $2500-$3000 reduction)
        const basicPersonalCredit = 3000;
        estimatedTax = Math.max(0, estimatedTax - basicPersonalCredit);

        const difference = paidVal - estimatedTax;

        if (difference > 0) {
            setResult({ refund: difference, owing: 0 });
        } else {
            setResult({ refund: 0, owing: Math.abs(difference) });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-navy-950 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-growth/10 opacity-20 pointer-events-none" />
                <h2 className="text-2xl md:text-3xl font-black mb-2 relative z-10">Free Tax Refund Estimator</h2>
                <p className="text-white/60 relative z-10">See how much you could get back this year.</p>
            </div>

            <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-navy-900 mb-2">Employment Income</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(Number(e.target.value))}
                                    placeholder="50000"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-growth/50 focus:border-growth outline-none transition font-bold text-lg text-navy-950"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-navy-900 mb-2">Taxes Paid (from T4)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="number"
                                    value={taxesPaid}
                                    onChange={(e) => setTaxesPaid(Number(e.target.value))}
                                    placeholder="10000"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-growth/50 focus:border-growth outline-none transition font-bold text-lg text-navy-950"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-navy-900 mb-2">Province</label>
                            <select
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-growth/50 focus:border-growth outline-none transition font-bold text-lg text-navy-950 appearance-none"
                            >
                                <option value="ON">Ontario</option>
                                <option value="BC">British Columbia</option>
                                <option value="AB">Alberta</option>
                                <option value="QC">Quebec</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="MB">Manitoba</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="NB">New Brunswick</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="NL">Newfoundland & Labrador</option>
                            </select>
                        </div>

                        <button
                            onClick={calculateTax}
                            className="w-full py-4 bg-growth text-navy-950 rounded-xl font-black text-lg hover:bg-growth-dark transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-growth/20 flex items-center justify-center gap-2"
                        >
                            <Calculator className="w-6 h-6" />
                            Calculate Refund
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-gray-200 relative">
                        {!result ? (
                            <>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                                    <RefreshCw className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-2">Your Estimate Awaits</h3>
                                <p className="text-navy-900/40 text-sm">Enter your details to see your potential refund instantly.</p>
                            </>
                        ) : (
                            <div className="w-full animate-in fade-in zoom-in duration-500">
                                <div className="text-sm font-bold text-navy-900/50 uppercase tracking-widest mb-4">Estimated {result.refund > 0 ? 'Refund' : 'Amount Owing'}</div>
                                <div className={`text-5xl md:text-6xl font-black mb-6 ${result.refund > 0 ? 'text-growth' : 'text-red-500'}`}>
                                    ${(result.refund || result.owing).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                                <p className="text-navy-900/60 mb-8 text-sm leading-relaxed">
                                    This is a rough estimate. Our experts can help you find every deduction you deserve to maximize this number.
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full py-3 bg-navy-950 text-white rounded-xl font-bold hover:bg-navy-900 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    Start Filing Now <ArrowRight size={18} />
                                </Link>
                                <p className="mt-4 text-xs text-navy-900/30">
                                    *Estimation purposes only. Not a guarantee.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
