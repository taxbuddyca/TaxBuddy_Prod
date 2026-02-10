"use client";

import { useState } from "react";
import { Target, BarChart3, Dna, CheckCircle2, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import GlassCard from "./GlassCard";

const services = [
    {
        id: "bookkeeping",
        title: "Bookkeeping & Controllership",
        icon: <Target className="w-8 h-8" />,
        desc: "A full back-office finance team handling your daily operations.",
        features: [
            "Accounts Payable & Receivable",
            "Real-time Bookkeeping (Xero/QBO)",
            "Monthly Management Reports",
            "Payroll Administration (up to 100 employees)",
            "Sales Tax (GST/HST/PST) Filings",
            "Dedicated Controller Level Support"
        ]
    },
    {
        id: "tax",
        title: "Tax & Advisory",
        icon: <BarChart3 className="w-8 h-8" />,
        desc: "Strategic tax planning to protect your capital and ensure compliance.",
        features: [
            "Corporate Tax Returns (T2)",
            "Personal Tax Returns for Owners (T1)",
            "Scientific Research & Experimental Development (SR&ED)",
            "Multi-Province Tax Planning",
            "Corporate Restructuring & Rollovers",
            "Audit Defence & Representation"
        ]
    },
    {
        id: "tech",
        title: "Tech Consulting & Strategy",
        icon: <Dna className="w-8 h-8" />,
        desc: "Optimizing your SaaS stack for seamless financial workflows.",
        features: [
            "Xero & QBO Migration & Implementation",
            "Stripe & Shopify Integration",
            "Automated Accounts Payable (Dext/Hubdoc)",
            "E-commerce Inventory Workflows",
            "Custom API Connections",
            "Ongoing Software Training & Support"
        ]
    }
];

export default function ServiceTabs() {
    const [activeTab, setActiveTab] = useState(services[0].id);

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {services.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${activeTab === s.id ? 'bg-growth text-white shadow-lg shadow-growth/20 scale-105' : 'bg-gray-50 text-navy-900/40 hover:bg-gray-100 hover:text-navy-900'}`}
                    >
                        {s.icon}
                        {s.title}
                    </button>
                ))}
            </div>

            <div className="max-w-6xl mx-auto">
                {services.map((s) => (
                    <div key={s.id} className={`${activeTab === s.id ? 'block animate-in fade-in slide-in-from-bottom-5 duration-500' : 'hidden'}`}>
                        <GlassCard className="p-16 border-2 border-gray-100 bg-white shadow-sm" intensity="light">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                <div>
                                    <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-growth mb-8 shadow-sm border border-blue-100">
                                        {s.icon}
                                    </div>
                                    <h3 className="text-4xl font-black text-navy-950 mb-6 tracking-tight">{s.title}</h3>
                                    <p className="text-xl text-navy-900/70 leading-relaxed font-medium mb-10">
                                        {s.desc}
                                    </p>
                                    <Link href="/contact" className="bg-navy-950 text-white px-10 py-5 rounded-xl font-black flex items-center gap-3 hover:bg-navy-900 hover:scale-105 transition-all shadow-xl w-fit">
                                        Get started with {s.id} <ArrowRight size={20} />
                                    </Link>
                                </div>
                                <div className="space-y-6 bg-blue-50/50 rounded-[2rem] p-10 border border-blue-100">
                                    <div className="text-xs font-black text-navy-900/30 uppercase tracking-widest mb-6">What's Included</div>
                                    {s.features.map((feat, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-growth/10 flex items-center justify-center text-growth flex-shrink-0">
                                                <CheckCircle2 size={12} />
                                            </div>
                                            <span className="text-navy-900 font-bold">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>
    );
}
