
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import PricingTable from "@/components/PricingTable";
import { CheckCircle2, Building, Car, Calculator, Stethoscope, Activity, FileSpreadsheet, GraduationCap, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import PageBackground from "@/components/PageBackground";

type Industry = 'general' | 'real-estate' | 'medical' | 'students';

export default function PricingPage() {
    const [activeIndustry, setActiveIndustry] = useState<Industry>('general');

    const industries = [
        { id: 'general', label: 'General', icon: null },
        { id: 'real-estate', label: 'Real Estate', icon: Building },
        { id: 'medical', label: 'Medical', icon: Stethoscope },
        { id: 'students', label: 'Students', icon: GraduationCap },
    ];

    const content = {
        general: {
            title: "Transparent Pricing.",
            subtitle: "No hidden fees. No hourly billing. Just a predictable monthly subscription for your entire finance team.",
            checklist: [],
            color: "text-growth"
        },
        'real-estate': {
            title: "Real Estate Specialist Plans",
            subtitle: "Keep more of your commission. features built for Top Producers.",
            color: "text-growth",
            features: [
                { icon: Building, title: "PREC Implementation", desc: "Defer taxes & split income." },
                { icon: Car, title: "Auto Expenses", desc: "Lease vs. Buy optimization." },
                { icon: Calculator, title: "HST Filing", desc: "Never miss a quarterly payment." }
            ],
            checklist: [
                "PREC Incorporation Strategy",
                "Vehicle & Mileage Tracking",
                "Home Office Deductions",
                "Advertising & Marketing Costs",
                "TREB/OREA Dues"
            ]
        },
        medical: {
            title: "Medical Professional Plans",
            subtitle: "Tax care for caregivers. Protect your practice's retained earnings.",
            color: "text-blue-500",
            features: [
                { icon: Activity, title: "Incorporation (MPC)", desc: "Optimize detailed medical corporation tax." },
                { icon: FileSpreadsheet, title: "Income Splitting", desc: "Navigate TOSI rules safely." },
                { icon: ShieldCheck, title: "Risk Management", desc: "Asset protection strategies." }
            ],
            checklist: [
                "Professional Corporation (MPC) Setup",
                "Dividend vs. Salary Optimization",
                "Overhead & Staff Payroll",
                "Association Dues (CMA, OMA)",
                "Medical Equipment Write-offs"
            ]
        },
        students: {
            title: "Student Discount Plans",
            subtitle: "More money for books & beer. Save 30% on filing.",
            color: "text-growth",
            features: [
                { icon: BookOpen, title: "Tuition Carry-Forward", desc: "Maximize future tax credits." },
                { icon: Calculator, title: "Loan Interest", desc: "Claim 100% of student loan interest." },
                { icon: ArrowRight, title: "Moving Expenses", desc: "Claim costs if moving 40km+ for school." }
            ],
            checklist: [
                "T2202 Tuition Slip",
                "T4 Slips (Part-time jobs)",
                "Rent receipts",
                "Student Loan Interest statement",
                "Direct Deposit info"
            ]
        }
    };

    const activeContent = content[activeIndustry];

    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <PageBackground />
            <section className="py-24 relative overflow-hidden">

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 flashy-reveal">
                        <span className={`font-black uppercase tracking-[0.3em] text-[10px] mb-4 block ${activeContent.color}`}>Simple & Fair</span>
                        <h1 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tighter mb-8 transition-all duration-300">{activeContent.title}</h1>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed mb-12 min-h-[60px]">
                            {activeContent.subtitle}
                        </p>

                        {/* Industry Tabs */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {industries.map((ind) => (
                                <button
                                    key={ind.id}
                                    onClick={() => setActiveIndustry(ind.id as Industry)}
                                    className={`px-6 py-3 rounded-full border text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 ${activeIndustry === ind.id
                                        ? 'bg-navy-950 text-white border-navy-950 scale-105 shadow-lg'
                                        : 'bg-white text-navy-900/60 border-gray-200 hover:border-growth hover:text-growth'
                                        }`}
                                >
                                    {ind.icon && <ind.icon size={14} />}
                                    {ind.label}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Content Area */}
                        {activeIndustry !== 'general' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-20 text-left">
                                <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
                                    <div>
                                        <h3 className="text-2xl font-black text-navy-950 mb-6">Specialized Features</h3>
                                        <div className="space-y-8">
                                            {/* @ts-ignore */}
                                            {activeContent.features?.map((feat, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${activeIndustry === 'medical' ? 'bg-blue-100 text-blue-600' : 'bg-growth/10 text-growth'}`}>
                                                        <feat.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-navy-950 text-lg">{feat.title}</h4>
                                                        <p className="text-navy-900/60 text-sm leading-relaxed">{feat.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                        <h3 className="text-xl font-black text-navy-950 mb-6">Tax Checklist</h3>
                                        <ul className="space-y-4">
                                            {activeContent.checklist.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-navy-900/80 font-medium">
                                                    <CheckCircle2 className={`shrink-0 ${activeIndustry === 'medical' ? 'text-blue-500' : 'text-growth'}`} size={20} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                            <div className="text-sm text-navy-900/40 font-bold uppercase tracking-wider mb-2">Recommended Plan</div>
                                            <div className="text-2xl font-black text-navy-950">
                                                {activeIndustry === 'students' ? 'Personal / Basic' : 'Corporate / Growth'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <PricingTable />
                </div>
            </section>
        </main>
    );
}
