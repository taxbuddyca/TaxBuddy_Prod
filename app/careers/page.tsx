"use client";

import GlassCard from "@/components/GlassCard";
import { Shield, Sparkles, Target, Zap, ChevronRight, Briefcase } from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function CareersPage() {
    const benefits = [
        { icon: <Shield className="w-6 h-6" />, title: "100% Remote", desc: "Work where you perform best. Our team is spread across every Canadian province." },
        { icon: <Zap className="w-6 h-6" />, title: "The Tech Stack", desc: "Say goodbye to legacy desktop apps. We live in Xero, Slack, Notion, and Zoom." },
        { icon: <Sparkles className="w-6 h-6" />, title: "Wellness Reserve", desc: "Comprehensive health and mental wellness coverage from day one." },
        { icon: <Target className="w-6 h-6" />, title: "Innovation Friday", desc: "10% of your time dedicated to process improvement and tool experimentation." }
    ];

    return (
        <main className="min-h-screen pt-32 selection:bg-growth selection:text-white">
            <PageBackground />
            <section className="bg-transparent py-24 relative overflow-hidden">

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-6 block font-bold">Join the Pod</span>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.95]">
                            Scale your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">Professionalism.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/70 max-w-3xl mx-auto font-medium leading-relaxed">
                            We're building Canada's most innovative virtual accounting firm. No offices, no outsourcing, just exceptional talent and modern tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
                        {benefits.map((b, i) => (
                            <GlassCard key={i} className="p-8 group hover:border-growth/20 transition-all duration-500 hover-flash bg-white border-gray-100" intensity="light">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-8 group-hover:bg-growth group-hover:text-white transition-all duration-500 shadow-sm border border-blue-100">
                                    {b.icon}
                                </div>
                                <h3 className="text-xl font-black text-navy-950 mb-3">{b.title}</h3>
                                <p className="text-navy-900/70 text-sm font-medium leading-relaxed">{b.desc}</p>
                            </GlassCard>
                        ))}
                    </div>

                    <div className="bg-gray-50 rounded-[3rem] p-12 lg:p-20 border border-gray-100 relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                            <div className="flashy-reveal">
                                <h2 className="text-4xl lg:text-5xl font-black text-navy-950 mb-8 tracking-tighter leading-[0.95]">Open Roles</h2>
                                <p className="text-navy-900/40 text-lg font-medium leading-relaxed mb-12 italic">
                                    We are always looking for CPAs, Bookkeepers, and Tech Integration Specialists who value autonomy and excellence.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Senior Tax Specialist (CPA Required)",
                                        "Cloud Bookkeeping Pod Lead",
                                        "Fintech Implementation Specialist"
                                    ].map((role, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-growth hover:shadow-premium transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 bg-growth rounded-full" />
                                                <span className="font-bold text-navy-950 text-sm">{role}</span>
                                            </div>
                                            <ChevronRight className="text-navy-900/20 group-hover:text-growth transition-colors" size={18} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <GlassCard className="p-10 rotate-2 hover-flash" intensity="heavy">
                                    <Briefcase className="w-10 h-10 text-growth mb-8" />
                                    <h3 className="text-2xl font-black text-navy-950 mb-6 tracking-tight">Don't see your fit?</h3>
                                    <p className="text-navy-900/40 text-sm font-medium leading-relaxed mb-8">
                                        We are always hiring for talent, not just positions. Send us your resume and tell us how you can help scale the modern back-office.
                                    </p>
                                    <Link href="/contact" className="text-growth font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 hover:gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                        General Inquiry <ChevronRight size={14} />
                                    </Link>
                                </GlassCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
