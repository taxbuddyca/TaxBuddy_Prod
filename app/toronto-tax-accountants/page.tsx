"use client";

import {
    ArrowRight,
    ShieldCheck,
    Globe,
    Building2,
    HelpCircle,
    Send,
    MapPin,
    Phone,
    Mail,
    Star
} from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import FAQAccordion from "@/components/FAQAccordion";
import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import { faqs } from "@/lib/data/faq";

export default function TorontoLandingPage() {
    // Extract local FAQs
    const localFaqs = faqs.find(f => f.category === "Local & Regional (Toronto/GTA)")?.items || [];

    return (
        <main className="min-h-screen text-navy-950 selection:bg-growth selection:text-white pb-20">
            <PageBackground />

            {/* Localized Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white/50 border-b border-blue-50/50">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-growth/10 text-growth rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-growth/20">
                                <MapPin size={14} /> Virtual Expert in Toronto & The GTA
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-navy-950 leading-[0.95] tracking-tighter mb-8">
                                Top Tax Accountant <br />
                                <span className="text-growth italic">in Toronto & The GTA.</span>
                            </h1>
                            <p className="text-xl text-navy-900/50 mb-10 leading-relaxed max-w-2xl mx-auto font-semibold tracking-tight">
                                CPA-led virtual tax filing and bookkeeping for Toronto entrepreneurs, families, and tech startups.
                                Maximize your Ontario tax credits without the downtown commute.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
                        >
                            <Link href="/contact" className="group relative bg-navy-950 text-white px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-navy-950/20 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                Start My GTA Tax Return <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/services" className="bg-white/60 backdrop-blur-xl text-navy-950 px-10 py-5 rounded-2xl text-lg font-black hover:bg-white/80 transition-all text-center border border-navy-950/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                View Services
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                            {[
                                { label: "CPA-Led", icon: ShieldCheck },
                                { label: "Toronto Focus", icon: Building2 },
                                { label: "100% Virtual", icon: Globe },
                                { label: "High ROI", icon: Star }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-navy-950/5">
                                    <item.icon size={24} className="text-growth" />
                                    <span className="text-[10px] font-black uppercase tracking-wider text-navy-900/40">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Local Context Content */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-black text-navy-950 mb-6 tracking-tight">Expert Tax Preparation for the GTA.</h2>
                                <p className="text-lg text-navy-900/60 leading-relaxed mb-6 font-medium">
                                    Whether you are a startup in <strong>Liberty Village</strong>, a family in <strong>North York</strong>, or a small business in <strong>Mississauga</strong>,
                                    TaxBuddy Canada provides the expert CPA oversight you need without the gridlock.
                                </p>
                                <p className="text-lg text-navy-900/60 leading-relaxed font-medium">
                                    We serve the entire <strong>Greater Toronto Area</strong>, including <strong>Brampton</strong>, <strong>Vaughan</strong>,
                                    and <strong>Scarborough</strong>. Our virtual model is designed for the modern GTA taxpayer who values accuracy and speed over office visits.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <GlassCard className="p-8 border-growth/10" intensity="light">
                                    <h3 className="text-xl font-black text-navy-950 mb-4 flex items-center gap-3">
                                        <MapPin className="text-growth" size={20} /> Ontario Specifics
                                    </h3>
                                    <p className="text-navy-900/60 font-medium">We specialize in Ontario tax credits, including the OTB, CARE, and Senior Home Safety Tax Credit.</p>
                                </GlassCard>
                                <GlassCard className="p-8 border-navy-950/5" intensity="light">
                                    <h3 className="text-xl font-black text-navy-950 mb-4 flex items-center gap-3">
                                        <ShieldCheck className="text-growth" size={20} /> CRA Ready
                                    </h3>
                                    <p className="text-navy-900/60 font-medium">Stop worrying about audits. We ensure your GTA business or personal return is filed with 100% compliance.</p>
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialized local FAQ */}
            <section className="py-24 bg-navy-50/30">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">GTA Q&A</span>
                        <h2 className="text-3xl md:text-5xl font-black text-navy-950 mb-6 tracking-tight">Toronto Tax <span className="text-growth italic">Questions.</span></h2>
                        <p className="text-lg text-navy-900/50 font-medium">Expert answers for taxpayers in Toronto and the Greater Toronto Area.</p>
                    </div>

                    <FAQAccordion items={localFaqs} />

                    <div className="text-center mt-12">
                        <Link href="/faq" className="text-sm font-bold text-navy-900/40 hover:text-growth transition uppercase tracking-widest group inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                            View National FAQ <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Local Business CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <GlassCard className="max-w-5xl mx-auto p-12 md:p-20 text-center relative overflow-hidden bg-navy-950 border-navy-900" intensity="heavy">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
                                Ready to work with <br />
                                <span className="text-growth">Toronto's best?</span>
                            </h2>
                            <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                                Join hundreds of GTA entrepreneurs who have traded the commute for a better, faster, and more professional virtual tax experience.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href="/contact" className="bg-growth text-white px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all inline-flex items-center justify-center gap-3 shadow-2xl shadow-growth/20 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    Book a GTA Consultation <Send size={20} />
                                </Link>
                                <a href="tel:+13068804017" className="bg-white/10 text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3 backdrop-blur-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    <Phone size={20} /> (416) XXX-XXXX
                                </a>
                            </div>
                        </div>

                        {/* Background flare */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-growth/20 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                    </GlassCard>
                </div>
            </section>
        </main>
    );
}
