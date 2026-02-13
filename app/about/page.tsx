"use client";

import GlassCard from "@/components/GlassCard";
import { Zap, Users, Globe, ShieldCheck, Clock, Rocket, Send, CheckCircle2, Award, TrendingUp, Code2, Database, CreditCard, ShoppingCart, Workflow, Lock } from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";

export default function AboutPage() {
    const values = [
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Your Time is Sacred",
            desc: "We automate the boring stuff so you can focus on growth, not tax forms."
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Transparency Over Everything",
            desc: "Fixed pricing. No surprise bills. No hidden fees. Ever."
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "100% Canadian, 100% Virtual",
            desc: "Your data stays in Canada. Your team speaks your language. Your accountant is a Slack message away."
        }
    ];

    const techStack = [
        { name: "Xero", category: "Accounting", icon: <Database size={20} /> },
        { name: "QuickBooks Online", category: "Accounting", icon: <Database size={20} /> },
        { name: "Stripe", category: "Payments", icon: <CreditCard size={20} /> },
        { name: "Square", category: "Payments", icon: <CreditCard size={20} /> },
        { name: "Shopify", category: "E-commerce", icon: <ShoppingCart size={20} /> },
        { name: "WooCommerce", category: "E-commerce", icon: <ShoppingCart size={20} /> },
        { name: "Zapier", category: "Automation", icon: <Workflow size={20} /> },
        { name: "Make", category: "Automation", icon: <Workflow size={20} /> },
    ];

    const milestones = [
        {
            year: "2019",
            title: "TaxBuddy Launched",
            desc: "Started with 10 clients and a mission to eliminate paper-based tax filing for Canadian entrepreneurs."
        },
        {
            year: "2020",
            title: "Virtual-First Pioneer",
            desc: "When COVID hit, we were already 100% remote. Helped 200+ businesses transition to cloud accounting seamlessly."
        },
        {
            year: "2022",
            title: "Tech Integration Hub",
            desc: "Launched automated Stripe→Xero sync and Shopify integrations, saving clients 10+ hours per month."
        },
        {
            year: "2024",
            title: "Serving 500+ Canadian Entrepreneurs",
            desc: "From solo founders to Series A startups, all managed through one modern, integrated platform."
        }
    ];

    const metrics = [
        { value: "500+", label: "Active Clients" },
        { value: "$50M+", label: "Tax Savings Secured" },
        { value: "4.9/5", label: "Average Rating" },
        { value: "100%", label: "Virtual & Canadian" }
    ];

    return (
        <main className="min-h-screen pt-32 selection:bg-growth selection:text-white">
            <PageBackground />

            {/* Hero - Mission Statement */}
            <section className="bg-transparent py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 border border-blue-200/50 rounded-full text-growth font-black uppercase tracking-[0.2em] mb-8 text-[10px] shadow-sm">
                            <Globe size={14} /> 100% Virtual. 100% Canadian.
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[1.05]">
                            We exist to give Canadian <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">entrepreneurs their time back.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-navy-900/70 leading-relaxed font-medium max-w-3xl mx-auto">
                            Modern tax filing, bookkeeping, and CFO services built for founders who'd rather build their business than manage spreadsheets.
                        </p>
                    </motion.div>

                    {/* Social Proof Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-24"
                    >
                        {metrics.map((metric, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-black text-growth mb-2">{metric.value}</div>
                                <div className="text-sm text-navy-900/60 font-medium uppercase tracking-wider">{metric.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why We Started */}
            <section className="py-24 bg-gray-50/50 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-8 tracking-tighter">
                                Why We Started TaxBuddy
                            </h2>
                            <div className="space-y-6 text-lg text-navy-900/70 leading-relaxed font-medium">
                                <p>
                                    Traditional accounting firms were built for a different era. Long wait times, paper-based processes, and hourly billing that punished efficiency.
                                </p>
                                <p>
                                    We started TaxBuddy because we believe Canadian entrepreneurs deserve better: <strong className="text-navy-950">instant access, transparent pricing, and a team that moves at the speed of your business.</strong>
                                </p>
                                <p>
                                    No more waiting weeks for tax returns. No more surprise bills. No more wondering if your accountant actually understands your tech stack.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                            What We Believe
                        </h2>
                        <p className="text-lg text-navy-900/60 max-w-2xl mx-auto font-medium">
                            These aren't just values on a wall. They guide every decision we make.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <GlassCard className="p-8 h-full hover:border-growth/30 transition-all group" intensity="light">
                                    <div className="w-16 h-16 bg-growth/10 rounded-2xl flex items-center justify-center mb-6 text-growth group-hover:bg-growth group-hover:text-white transition-all">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-navy-950 mb-4 tracking-tight">{value.title}</h3>
                                    <p className="text-navy-900/60 leading-relaxed font-medium">{value.desc}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-32 bg-navy-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-growth rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-growth font-black uppercase tracking-[0.2em] mb-8 text-[10px]">
                            <Code2 size={14} /> Tech-Driven, Human-Led
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                            Our Tech Stack
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto font-medium">
                            We're not just accountants—we're systems integrators. Here's what powers your financial back-office.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-growth/50 transition-all group"
                            >
                                <div className="text-growth mb-3 group-hover:scale-110 transition-transform">
                                    {tech.icon}
                                </div>
                                <div className="text-sm font-black mb-1">{tech.name}</div>
                                <div className="text-xs text-white/50 uppercase tracking-wider">{tech.category}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                            <Lock size={16} className="text-growth" />
                            <span className="text-sm font-medium">256-bit encryption • 2FA • SOC 2 compliant storage</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                            Our Journey
                        </h2>
                        <p className="text-lg text-navy-900/60 max-w-2xl mx-auto font-medium">
                            From a small idea to serving hundreds of Canadian entrepreneurs.
                        </p>
                    </motion.div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />
                        <div className="space-y-32 relative z-10">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <h4 className="text-4xl font-black text-growth mb-4">{m.year}</h4>
                                        <h5 className="text-2xl font-black text-navy-950 mb-6">{m.title}</h5>
                                        <p className="text-navy-900/60 text-base font-medium leading-relaxed">{m.desc}</p>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white border-8 border-gray-50 rounded-full flex items-center justify-center shadow-premium relative z-10">
                                            <div className="w-4 h-4 bg-growth rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                                        </div>
                                        <div className="absolute w-24 h-24 bg-growth/5 rounded-full blur-xl animate-pulse" />
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-growth rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                            Ready to Get Your <br />
                            <span className="text-growth">Weekends Back?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-navy-900/60 mb-12 max-w-2xl mx-auto font-medium">
                            Book a free 15-minute call. We'll show you exactly how much time (and money) you could save.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link href="/contact" className="group relative bg-navy-950 text-white px-12 py-6 rounded-2xl text-xl font-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-navy-950/20 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-growth/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                <span className="relative z-10">Book Free Consultation</span>
                                <Send size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/pricing" className="bg-white border-2 border-gray-200 text-navy-900 px-12 py-6 rounded-2xl text-xl font-black hover:bg-gray-50 hover:border-growth/30 transition-all shadow-sm">
                                View Pricing
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
