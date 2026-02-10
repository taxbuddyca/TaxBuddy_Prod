"use client";

import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Clock,
    Rocket,
    ShieldAlert, // Not used in the provided content, but kept as per instruction to only add Send
    Target, // Not used in the provided content, but kept as per instruction to only add Send
    BarChart3,
    Dna, // Not used in the provided content, but kept as per instruction to only add Send
    Send // Added as per instruction
} from "lucide-react";
import Link from "next/link";
import { SlantDivider, WaveDivider } from "@/components/VisualElements";
import GlassCard from "@/components/GlassCard";
import ExpertiseGrid from "@/components/ExpertiseGrid";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-navy-950 selection:bg-growth selection:text-white">

            {/* Compact Light Blue Hero with CSS Texture */}
            <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-blue-50/50 border-b border-blue-100">
                {/* CSS Texture Background */}
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400/20 opacity-50 blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <div className="max-w-4xl flashy-reveal flex flex-col items-center">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-navy-950 leading-[1.1] tracking-tighter mb-8 transition-all duration-700 hover:tracking-wide">
                            The Finance Team <br />
                            <span className="text-growth">for Growth.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/80 mb-10 leading-relaxed max-w-2xl font-medium">
                            Tax, bookkeeping, and fractional CFO expertise for Canada's most ambitious companies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 mb-12 w-full sm:w-auto justify-center">
                            <Link href="/contact" className="group bg-growth text-white px-10 py-5 rounded-2xl text-base font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-growth/20 whitespace-nowrap">
                                Get Started <ArrowRight size={18} />
                            </Link>
                            <Link href="/services" className="bg-white text-navy-950 px-10 py-5 rounded-2xl text-base font-black hover:bg-gray-50 transition-all text-center border border-gray-200 hover:border-gray-300 whitespace-nowrap">
                                Explore Services
                            </Link>
                        </div>
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-100/50 border border-blue-200 rounded-full text-growth font-bold text-[10px] uppercase tracking-[0.3em] shadow-sm backdrop-blur-md">
                            <ShieldCheck size={14} /> 100% Virtual. 100% Canadian.
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By - Logo Cloud */}
            <section className="py-20 border-b border-gray-100 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <p className="text-center text-[10px] font-black text-navy-900/40 uppercase tracking-[0.4em] mb-12">Trusted by Industry Leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700">
                        {/* Custom SVG Logos for a premium look */}
                        <div className="flex items-center gap-3 grayscale filter">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-navy-950"><path d="M12 2L2 22h20L12 2zM5.5 19l6.5-13 6.5 13h-13z" /></svg>
                            <span className="text-lg font-black tracking-tighter text-navy-950">VELOCITY</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale filter">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-navy-950"><circle cx="12" cy="12" r="10" /><path d="M12 7v10M7 12h10" /></svg>
                            <span className="text-lg font-black tracking-tighter text-navy-950">CROWDFUND</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale filter">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-navy-950"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 12l2 2 4-4" /></svg>
                            <span className="text-lg font-black tracking-tighter text-navy-950">STENCIL</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale filter">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-navy-950"><path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" /></svg>
                            <span className="text-lg font-black tracking-tighter text-navy-950">CYPHER</span>
                        </div>
                        <div className="flex items-center gap-3 grayscale filter">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-navy-950"><path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm-1 3h2v6H9V9h2V7z" /></svg>
                            <span className="text-lg font-black tracking-tighter text-navy-950">MERIDIAN</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Verticals */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <div className="flashy-reveal">
                            <span className="text-growth font-black uppercase tracking-[0.3em] text-[9px] mb-4 block">Our Approach</span>
                            <h2 className="text-3xl md:text-4xl font-black text-navy-950 mb-8 tracking-tighter leading-[1.1]">
                                More than just <br />
                                <span className="text-growth">Accountants.</span>
                            </h2>
                            <p className="text-base text-navy-900/60 font-medium leading-relaxed mb-10">
                                We combine high-end technology with professional CPA expertise to give you a real-time view of your business performance.
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-2 text-[10px] font-black text-navy-950 hover:text-growth transition uppercase tracking-widest group">
                                Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "Tax & Advisory", desc: "Strategic planning and corporate filings that maximize your wealth.", icon: <BarChart3 className="text-white" size={20} /> },
                                { title: "Cloud Bookkeeping", desc: "Real-time ledger management integrated with your entire tech stack.", icon: <Zap className="text-white" size={20} /> },
                                { title: "Fractional CFO", desc: "High-level strategy to help you scale from seed to Series C.", icon: <Rocket className="text-white" size={20} /> }
                            ].map((service, i) => (
                                <GlassCard key={i} className="p-8 hover-flash group" intensity="light">
                                    <div className="flex gap-6 items-start">
                                        <div className="w-12 h-12 bg-navy-950 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-growth transition-colors">
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-navy-950 mb-2 tracking-tight">{service.title}</h3>
                                            <p className="text-navy-900/50 text-sm font-medium leading-relaxed">{service.desc}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimalist Philosophy Section */}
            <section className="py-24 relative overflow-hidden bg-white text-navy-950 border-y border-gray-100">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center flashy-reveal">
                        <div className="w-16 h-1 bg-growth mx-auto mb-10 rounded-full opacity-30" />
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-8 leading-[1.1]">
                            We're building the <br />
                            <span className="text-growth">future of finance.</span>
                        </h2>
                        <p className="text-lg text-navy-900/60 mb-10 leading-relaxed font-semibold max-w-2xl mx-auto">
                            "The industry and tech are changing too fast for traditional accounting firms to keep up. We built TaxBuddy to be the agile partner that modern entrepreneurs actually need."
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left pt-12 border-t border-gray-50">
                            {[
                                { val: "100%", label: "Cloud Based" },
                                { val: "No", label: "Timesheets" },
                                { val: "Direct", label: "CPA Access" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-black text-growth mb-1">{stat.val}</div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-navy-900/30">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 text-center flashy-reveal">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-8 block font-bold">Join the Revolution</span>
                    <h2 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tighter mb-12 leading-[1.1]">Ready to upgrade?</h2>
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-navy-950 text-white px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all shadow-xl">
                        Schedule a Call <Send size={20} />
                    </Link>
                </div>
            </section>

        </main>
    );
}
