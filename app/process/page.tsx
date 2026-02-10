"use client";

import ProcessTimeline from "@/components/ProcessTimeline";
import GlassCard from "@/components/GlassCard";
import { Check, X, Shield, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProcessPage() {
    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden bg-blue-50/50">
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">The Roadmap</span>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.95]">
                            Our Working <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">Process.</span>
                        </h1>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            From discovery to ongoing success, we've refined our process to be as frictionless as possible for high-growth Canadian companies.
                        </p>
                    </div>
                    <ProcessTimeline />

                    {/* Why it Works */}
                    <div className="mt-40 grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1 flashy-reveal">
                            <h3 className="text-3xl font-black text-navy-950 mb-6 tracking-tight">Built for the <br />Modern World.</h3>
                            <p className="text-navy-900/40 text-base font-medium leading-relaxed mb-8">
                                Traditional firms optimize for billable hours. We optimize for your bandwidth and financial clarity.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-growth font-black uppercase tracking-widest hover:gap-4 transition-all text-xs">
                                Request an invite <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                            {[
                                { icon: <Shield />, title: "Bank-Grade Security", desc: "Your data is encrypted end-to-end and stored exclusively on Canadian soil." },
                                { icon: <Zap />, title: "Real-time Access", desc: "No more month-end surprises. See your margins every single morning." },
                                { icon: <Users />, title: "Infinite Scaling", desc: "Your pod scales with you. No need to re-onboard as you grow." },
                                { icon: <Check />, title: "Fixed Pricing", desc: "Predictable monthly subscriptions. No hidden hourly surprises." }
                            ].map((item, i) => (
                                <GlassCard key={i} className="p-8 group hover-flash" intensity="light">
                                    <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center text-growth mb-6 group-hover:bg-growth group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-navy-950 mb-3">{item.title}</h4>
                                    <p className="text-navy-900/40 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Section */}
                    <div className="mt-40 bg-gray-50 rounded-[3rem] p-12 lg:p-20 border border-gray-100">
                        <div className="text-center mb-16 flashy-reveal">
                            <h3 className="text-3xl font-black text-navy-950 mb-4 tracking-tight">The Traditional vs. The Buddy</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                        <X size={32} />
                                    </div>
                                    <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">Traditional Firms</h4>
                                </div>
                                {[
                                    "Paper-based workflows & office visits",
                                    "Opaque hourly billing traps",
                                    "Delayed reporting (30+ days behind)",
                                    "Inconsistent staff turnover",
                                    "Siloed financial advice"
                                ].map((off, i) => (
                                    <div key={i} className="flex gap-4 items-center p-4 bg-white/50 rounded-2xl border border-gray-100 opacity-60">
                                        <X size={16} className="text-red-500" />
                                        <span className="text-navy-950/40 font-bold text-xs italic">{off}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-growth/10 text-growth rounded-full flex items-center justify-center mx-auto mb-4 border border-growth/20 shadow-lg shadow-growth/10">
                                        <Check size={32} />
                                    </div>
                                    <h4 className="text-sm font-black text-growth uppercase tracking-widest">TaxBuddy</h4>
                                </div>
                                {[
                                    "100% digital, 100% remote workflow",
                                    "Predictable fixed monthly pricing",
                                    "Real-time dashboards & oversight",
                                    "Dedicated pod structure (Stable talent)",
                                    "Holistic tax & tech strategy"
                                ].map((off, i) => (
                                    <div key={i} className="flex gap-4 items-center p-4 bg-white rounded-2xl border border-growth/20 shadow-premium hover-flash">
                                        <Check size={16} className="text-growth font-black" />
                                        <span className="text-navy-950 font-black text-xs">{off}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
