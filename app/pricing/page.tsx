
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import PricingTable from "@/components/PricingTable";
import { CheckCircle2, Building, Car, Calculator, Stethoscope, Activity, FileSpreadsheet, GraduationCap, BookOpen, ArrowRight, ShieldCheck, Briefcase, Scale, Settings } from "lucide-react";
import PageBackground from "@/components/PageBackground";
import { services } from "@/lib/data/services";
import { industries as allIndustries, IndustryItem } from "@/lib/data/industries";
import ServicePricingCard from "@/components/services/ServicePricingCard";

type Category = 'accounting' | 'tax' | 'operations' | 'industries';

export default function PricingPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('accounting');

    // Flatten industries for easier access
    const industryList = allIndustries.flatMap(cat => cat.items);
    const [activeIndustrySlug, setActiveIndustrySlug] = useState<string>(industryList[0]?.slug || 'real-estate');

    const categories = [
        { id: 'accounting', label: 'Core Accounting', icon: Calculator },
        { id: 'tax', label: 'Tax & Compliance', icon: Scale },
        { id: 'operations', label: 'Business Operations', icon: Settings },
        { id: 'industries', label: 'Industry Specialist Plans', icon: Briefcase },
    ];

    const categoryContent = {
        accounting: {
            title: "Core Accounting Services",
            subtitle: "Foundation for growth. Predictable fees for businesses of all sizes.",
            color: "text-growth",
            serviceIds: ['accounting', 'small-business', 'medium-business', 'online-accounting', 'virtual-accounting']
        },
        tax: {
            title: "Tax & Compliance",
            subtitle: "Minimize your liabilities and ensure total CRA compliance.",
            color: "text-blue-500",
            serviceIds: ['personal-tax', 'tax']
        },
        operations: {
            title: "Business Operations",
            subtitle: "Hassle-free payroll, bookkeeping, and payables management.",
            color: "text-navy-600",
            serviceIds: ['bookkeeping', 'payroll', 'accounts-payable']
        },
        industries: {
            title: "Industry Specialist Plans",
            subtitle: "Custom-tailored solutions for specialized professional sectors.",
            color: "text-growth"
        }
    };

    const activeIndustry = industryList.find(i => i.slug === activeIndustrySlug);

    const activeCatContent = categoryContent[activeCategory];

    return (
        <main className="min-h-screen pt-32 selection:bg-growth selection:text-white">
            <PageBackground />
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 flashy-reveal">
                        <span className={`font-black uppercase tracking-[0.3em] text-[10px] mb-4 block ${activeCatContent.color}`}>Simple & Fair</span>
                        <h1 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tighter mb-8 transition-all duration-300">{activeCatContent.title}</h1>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed mb-12 min-h-[60px]">
                            {activeCatContent.subtitle}
                        </p>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id as Category)}
                                    className={`px-8 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-3 ${activeCategory === cat.id
                                        ? 'bg-navy-950 text-white border-navy-950 scale-105 shadow-xl'
                                        : 'bg-white text-navy-900/60 border-gray-200 hover:border-growth hover:text-growth'
                                        }`}
                                >
                                    <cat.icon size={16} />
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Content Area */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {activeCategory !== 'industries' ? (
                                <PricingTable serviceSlug={activeCategory} />
                            ) : (
                                <>
                                    {/* Industry Sub-Tabs */}
                                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                                        {industryList.map((ind) => (
                                            <button
                                                key={ind.slug}
                                                onClick={() => setActiveIndustrySlug(ind.slug)}
                                                className={`px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeIndustrySlug === ind.slug
                                                    ? 'bg-growth text-white border-growth shadow-md'
                                                    : 'bg-white/50 text-navy-950/60 border-gray-200 hover:border-growth/50'
                                                    }`}
                                            >
                                                {ind.title}
                                            </button>
                                        ))}
                                    </div>

                                    {activeIndustry && (
                                        <div className="text-left mb-20 transition-all duration-500">
                                            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
                                                <div>
                                                    <h3 className="text-2xl font-black text-navy-950 mb-6">{activeIndustry.title} - Specialized Features</h3>
                                                    <div className="space-y-8">
                                                        {activeIndustry.solutions.items.slice(0, 3).map((feat, i) => (
                                                            <div key={i} className="flex gap-4">
                                                                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-growth/10 text-growth">
                                                                    {feat.icon && <feat.icon size={24} />}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-navy-950 text-lg">{feat.title}</h4>
                                                                    <p className="text-navy-900/60 text-sm leading-relaxed">{feat.text}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                                    <h3 className="text-xl font-black text-navy-950 mb-6">Sector Checklist</h3>
                                                    <ul className="space-y-4">
                                                        {activeIndustry.benefits.items.map((item, i) => (
                                                            <li key={i} className="flex items-center gap-3 text-navy-900/80 font-medium">
                                                                <CheckCircle2 className="shrink-0 text-growth" size={20} />
                                                                {item.title}: <span className="text-navy-900/40 text-sm font-normal">{item.text}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <div className="mt-8 pt-8 border-t border-gray-200">
                                                        <div className="text-sm text-navy-900/40 font-bold uppercase tracking-wider mb-2">Recommended Plan</div>
                                                        <div className="text-2xl font-black text-navy-950">
                                                            Expert Business / Specialist
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <PricingTable serviceSlug={activeIndustrySlug} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
