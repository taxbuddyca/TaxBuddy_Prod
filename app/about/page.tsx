"use client";

import GlassCard from "@/components/GlassCard";
import { Zap, Users, Globe, ShieldCheck, Clock, Rocket, Send } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const milestones = [
        { year: "2015", title: "LiveCA Launched", desc: "Canada's first virtual-first accounting firm was born with a mission to eliminate paper and office overhead." },
        { year: "2018", title: "Scale to 30+", desc: "Expanded our 'pods' structure to support specialized sectors like SaaS and E-commerce." },
        { year: "2021", title: "Tech Strategy Hub", desc: "Launched our dedicated tech advisory wing to help clients integrate Stripe, Shopify, and Xero." },
        { year: "2024", title: "Modern Back-Office", desc: "Serving over 800+ Canadian companies with a 100% remote, 100% Canadian team." }
    ];

    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <section className="bg-blue-50/50 py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-24 flashy-reveal">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 border border-blue-200/50 rounded-full text-growth font-black uppercase tracking-[0.2em] mb-8 text-[10px] shadow-sm">
                            <Globe size={14} /> 100% Virtual. 100% Canadian.
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.95]">
                            Accounting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">Reimagined.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/70 leading-relaxed font-medium max-w-2xl mx-auto">
                            We aren't just accountants. We are your technology-forward finance team, built to scale with the modern Canadian entrepreneur.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-40">
                        <GlassCard className="p-12 relative group overflow-hidden border-2 border-gray-100 bg-white hover:border-growth/20 hover-flash shadow-sm" intensity="light">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-growth/5 rounded-full blur-3xl group-hover:bg-growth/10 transition-all duration-500" />
                            <ShieldCheck className="w-12 h-12 text-growth mb-8" />
                            <h3 className="text-3xl font-black text-navy-950 mb-6 tracking-tight">No Outsourcing. <br />Professional Only.</h3>
                            <p className="text-navy-900/60 text-base leading-relaxed font-medium">
                                While many firms outsource their back-office to lower-cost regions, we invest exclusively in a high-skill Canadian workforce. You get experts who understand the local tax code and your business culture.
                            </p>
                        </GlassCard>
                        <GlassCard className="p-12 relative group overflow-hidden border-2 border-gray-100 bg-white hover:border-blue-500/20 hover-flash shadow-sm" intensity="light">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500" />
                            <Zap className="w-12 h-12 text-blue-500 mb-8" />
                            <h3 className="text-3xl font-black text-navy-950 mb-6 tracking-tight">Built for the <br />Software World.</h3>
                            <p className="text-navy-900/60 text-base leading-relaxed font-medium">
                                We've spent a decade mastering the tools you use every day. Stripe, Shopify, Xero, QBO — we integrate them all to provide a single source of truth for your finances.
                            </p>
                        </GlassCard>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />
                        <div className="space-y-32 relative z-10">
                            {milestones.map((m, i) => (
                                <div key={i} className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                    <div className={`flex-1 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} flashy-reveal`}>
                                        <h4 className="text-4xl font-black text-growth mb-4">{m.year}</h4>
                                        <h5 className="text-2xl font-black text-navy-950 mb-6">{m.title}</h5>
                                        <p className="text-navy-900/40 text-base font-medium leading-relaxed">{m.desc}</p>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white border-8 border-gray-50 rounded-full flex items-center justify-center shadow-premium relative z-10">
                                            <div className="w-4 h-4 bg-growth rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                                        </div>
                                        <div className="absolute w-24 h-24 bg-growth/5 rounded-full blur-xl animate-pulse" />
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-navy-950 mb-10 tracking-tighter">Ready for a better <br />finance experience?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/contact" className="bg-growth text-white px-12 py-6 rounded-2xl text-xl font-black hover:scale-105 hover:shadow-premium transition-all flex items-center justify-center gap-3">
                            Talk to our team <Send size={20} />
                        </Link>
                        <Link href="/pricing" className="bg-white border border-gray-200 text-navy-900 px-12 py-6 rounded-2xl text-xl font-black hover:bg-gray-50 transition-all shadow-sm">
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
