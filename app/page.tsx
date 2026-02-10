"use client";

import {
    ArrowRight,
    ShieldCheck,
    Zap,
    Clock,
    Rocket,
    Send,
    Video,
    FileText,
    Monitor
} from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import Testimonials from "@/components/Testimonials";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-navy-950 selection:bg-growth selection:text-white">

            {/* Hero Section */}
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
                            100% Canadian, <br />
                            <span className="text-growth">No Outsourcing.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/80 mb-6 leading-relaxed max-w-2xl font-medium">
                            While the majority of accounting firms outsource overseas, we're doubling down on an exceptional Canadian workforce.
                        </p>
                        <ul className="text-sm md:text-base text-navy-900/60 font-semibold mb-10 space-y-2">
                            <li>✨ Reliable controllership services for tax, bookkeeping, payroll, AP/AR, reporting and tech support</li>
                            <li>✨ Regular check-ins with your team</li>
                            <li>✨ Never worry about turnover in your finance team</li>
                        </ul>

                        <div className="bg-white/50 border border-growth/20 p-4 rounded-xl mb-12">
                            <p className="text-sm font-bold text-growth">
                                Ideal for companies with $3M-$15M in revenue or 1-3 people in your finance department
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 mb-12 w-full sm:w-auto justify-center">
                            <Link href="/contact" className="group bg-growth text-white px-10 py-5 rounded-2xl text-base font-black hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-growth/20 whitespace-nowrap">
                                Get Started <ArrowRight size={18} />
                            </Link>
                            <Link href="/services" className="bg-white text-navy-950 px-10 py-5 rounded-2xl text-base font-black hover:bg-gray-50 transition-all text-center border border-gray-200 hover:border-gray-300 whitespace-nowrap">
                                Explore Services
                            </Link>
                        </div>
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-100/50 border border-blue-200 rounded-full text-growth font-bold text-[10px] uppercase tracking-[0.3em] shadow-sm backdrop-blur-md">
                            <ShieldCheck size={14} /> 10+ Years Experience • 60+ Team Members
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 border-b border-gray-100 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.4em] mb-2">Organizations we've helped</p>
                        <h3 className="text-2xl font-black text-navy-950 tracking-tight">You're in good company.</h3>
                        <p className="text-navy-900/50 text-sm mt-2 max-w-xl mx-auto">
                            Reach out knowing we've helped some of the best companies in Canada with tax planning, bookkeeping and structuring their financial back office.
                        </p>
                    </div>

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

                    <div className="text-center mt-12">
                        <Link href="/contact" className="text-growth font-bold text-sm hover:underline">View Case Studies →</Link>
                        <p className="text-xs text-navy-900/40 mt-1">It's free, and you'll learn something!</p>
                    </div>
                </div>
            </section>

            {/* Features / Pillars */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Always On Support */}
                        <div className="flex flex-col items-start group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-8 group-hover:scale-110 transition-transform">
                                <Video size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-navy-950 mb-4">Always On Support</h3>
                            <p className="text-navy-900/60 font-medium leading-relaxed mb-6">
                                Your entire accounting team, including your CPA, on call when you need them. Connect with them over video chat, phone, or email.
                            </p>
                        </div>

                        {/* Upfront Pricing */}
                        <div className="flex flex-col items-start group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-8 group-hover:scale-110 transition-transform">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-navy-950 mb-4">Upfront Pricing</h3>
                            <p className="text-navy-900/60 font-medium leading-relaxed mb-6">
                                Agreed upfront monthly prices. No hidden charges, cancellation fees, or minimum term contracts.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full">
                                <p className="text-xs font-bold text-navy-950 mb-1">Want to lower your bill?</p>
                                <p className="text-xs text-navy-900/50">We'll optimize or share duties to fit your budget.</p>
                            </div>
                        </div>

                        {/* 100% Online */}
                        <div className="flex flex-col items-start group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-8 group-hover:scale-110 transition-transform">
                                <Monitor size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-navy-950 mb-4">100% Online</h3>
                            <p className="text-navy-900/60 font-medium leading-relaxed mb-6">
                                Using only online tools allows us to collaborate virtually in real-time giving you up-to-date financial information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

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
