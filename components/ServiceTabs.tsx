"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GlassCard from "./GlassCard";
import { services } from "@/lib/data/services";

export default function ServiceTabs() {
    const searchParams = useSearchParams();
    const displayServices = services;
    const [activeTab, setActiveTab] = useState(services[0].id);

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && services.some(s => s.id === tab)) {
            setActiveTab(tab);
            // Scroll to tabs if a specific tab is requested
            const element = document.getElementById("service-tabs-section");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [searchParams]);

    return (
        <div className="w-full" id="service-tabs-section">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {services.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${activeTab === s.id ? 'bg-growth text-white shadow-lg shadow-growth/20 scale-105' : 'bg-gray-50 text-navy-900/40 hover:bg-gray-100 hover:text-navy-900'}`}
                    >
                        <s.icon className="w-6 h-6" />
                        {s.title}
                    </button>
                ))}
            </div>

            <div className="max-w-6xl mx-auto">
                {displayServices.map((s) => (
                    <div key={s.id} className={`${activeTab === s.id ? 'block animate-in fade-in slide-in-from-bottom-5 duration-500' : 'hidden'}`}>
                        <GlassCard className="p-16 border-2 border-gray-100 bg-white shadow-sm" intensity="light">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                <div>
                                    <div className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-growth mb-8 shadow-sm border border-blue-100">
                                        <s.icon className="w-10 h-10" />
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
                                    {(s.features || s.content?.servicesList?.items.map(i => i.title))?.slice(0, 6).map((feat, i) => (
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
