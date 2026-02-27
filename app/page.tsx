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
import FAQAccordion from "@/components/FAQAccordion";
import Testimonials from "@/components/Testimonials";
import PageBackground from "@/components/PageBackground";

import LogoMarquee from "@/components/LogoMarquee";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Home() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) / 50;
        const moveY = (clientY - window.innerHeight / 2) / 50;
        setMousePos({ x: moveX, y: moveY });
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen text-navy-950 selection:bg-growth selection:text-white"
        >
            <PageBackground />

            {/* Premium Modern Hero Section */}
            <section className="relative min-h-screen flex items-center pt-28 pb-12 overflow-hidden bg-white/50 border-b border-blue-50/50">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <motion.div
                        style={{ x: mousePos.x * 0.5, y: y1 }}
                        className="absolute -top-[20%] -right-[10%] w-[1000px] h-[1000px] bg-growth/5 rounded-full blur-[150px]"
                    />
                    <motion.div
                        style={{ x: -mousePos.x * 0.3, y: y2 }}
                        className="absolute top-[20%] -left-[10%] w-[800px] h-[800px] bg-blue-400/5 rounded-full blur-[120px]"
                    />

                    {/* Slow Motion Floating Financial Objects */}
                    <motion.div
                        style={{ y: y3, rotate }}
                        className="absolute top-[15%] right-[15%] w-64 h-64 border border-growth/10 rounded-[3rem] p-8 flex items-center justify-center backdrop-blur-sm opacity-20"
                    >
                        <BarChart3 className="text-growth w-full h-full" />
                    </motion.div>

                    {/* Modern Hero Image Overlay - Right side with split-glass effect */}
                    <div className="absolute right-0 top-[10%] w-[45%] h-[80%] hidden lg:block overflow-hidden rounded-l-[100px] shadow-2xl z-0">
                        <motion.div
                            style={{ scale: 1.1, x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
                            className="w-full h-full"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1600"
                                alt="Modern Finance Administration"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center lg:items-start justify-center h-full text-center lg:text-left">
                    <div className="max-w-2xl flex flex-col items-center lg:items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy-950 leading-[0.95] tracking-tighter mb-6">
                                Virtual <span className="text-growth relative inline-block italic">
                                    Tax
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                                        className="absolute -bottom-1 left-0 h-2 bg-growth/20 rounded-full"
                                    />
                                </span> <br />
                                & Finance Teams.
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-base md:text-xl text-navy-900/50 mb-10 leading-relaxed max-w-xl font-semibold tracking-tight"
                        >
                            Modern online tax filing, bookkeeping, and fractional CFO services <br className="hidden md:block" />
                            for Halifax and the modern Canadian entrepreneur.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-5 mb-14 w-full sm:w-auto"
                        >
                            <Link href="/contact" className="group relative bg-navy-950 text-white px-10 py-4 rounded-2xl text-lg font-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-navy-950/20 overflow-hidden focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                <motion.div
                                    className="absolute inset-0 bg-growth/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/services" className="bg-white/40 backdrop-blur-xl text-navy-950 px-10 py-4 rounded-2xl text-lg font-black hover:bg-white/60 transition-all text-center border border-navy-950/5 hover:border-navy-950/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                Explore Services
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="flex flex-col md:flex-row items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-navy-900/30"
                        >
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-navy-950/5 shadow-premium">
                                <ShieldCheck size={16} className="text-growth" />
                                Max Refund Guarantee
                            </div>
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-navy-950/5 shadow-premium">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                100% Virtual & Secure
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trusted By - Logo Marquee */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="py-10 border-b border-gray-50 bg-gray-50/10"
            >
                <div className="container mx-auto px-6 mb-8 text-center">
                    <p className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.4em]">Trusted by Industry Leaders</p>
                </div>
                <LogoMarquee />
            </motion.section>

            {/* Service Verticals */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-growth font-black uppercase tracking-[0.3em] text-[9px] mb-4 block">Our Approach</span>
                            <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-8 tracking-tighter leading-[1.05]">
                                More than just <br />
                                <span className="text-growth">Accountants.</span>
                            </h2>
                            <p className="text-lg text-navy-900/60 font-medium leading-relaxed mb-10">
                                We combine high-end technology with professional CPA expertise to give you a real-time view of your business performance.
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-3 text-xs font-black text-navy-950 hover:text-growth transition uppercase tracking-widest group focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-8">
                            {[
                                {
                                    title: "Tax & Advisory",
                                    desc: "Strategic planning and corporate filings that maximize your wealth.",
                                    icon: <BarChart3 className="text-white" size={20} />,
                                    img: "/images/approach/partner.png"
                                },
                                {
                                    title: "Cloud Bookkeeping",
                                    desc: "Real-time ledger management integrated with your entire tech stack.",
                                    icon: <Zap className="text-white" size={20} />,
                                    img: "/images/approach/automation.png"
                                },
                                {
                                    title: "Fractional CFO",
                                    desc: "High-level strategy to help you scale from seed to Series C.",
                                    icon: <Rocket className="text-white" size={20} />,
                                    img: "/images/approach/clarity.png"
                                }
                            ].map((service, i) => (
                                <GlassCard key={i} className="group overflow-hidden p-0 hover:border-growth/30 transition-all duration-500" intensity="light">
                                    <div className="flex flex-col md:flex-row h-full">
                                        <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-sky-50/50 flex items-center justify-center p-6 border-r border-gray-100">
                                            <img
                                                src={service.img}
                                                alt={service.title}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                                            />
                                        </div>
                                        <div className="p-8 flex-1">
                                            <div className="w-12 h-12 bg-navy-950 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-growth transition-colors mb-6 shadow-lg">
                                                {service.icon}
                                            </div>
                                            <h3 className="text-2xl font-black text-navy-950 mb-3 tracking-tight">{service.title}</h3>
                                            <p className="text-navy-900/60 font-medium leading-relaxed">{service.desc}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy / Future of Finance Section */}
            <section className="py-32 relative overflow-hidden bg-navy-950 text-white">
                <div className="absolute inset-0 opacity-20">
                    <motion.img
                        style={{ y: y1, scale: 1.2 }}
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
                        alt="Modern Accounting Philosophy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-950/60" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="max-w-4xl mx-auto text-center mb-24"
                    >
                        <div className="w-24 h-1 bg-growth mx-auto mb-10 rounded-full" />
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.95]">
                            We're not your father's <br />
                            <span className="text-growth italic">accounting firm.</span>
                        </h2>
                        <p className="text-2xl text-white/60 leading-relaxed font-semibold max-w-2xl mx-auto">
                            "The industry and tech are changing too fast for traditional firms to keep up. We built TaxBuddy to be the agile, tech-forward partner that modern entrepreneurs actually need."
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "100% Cloud-Native",
                                desc: "We live in the cloud. Xero, QBO, Dext, Stripe. We integrate your entire stack so data flows automatically. No paper, no shoeboxes.",
                                icon: <Zap size={24} className="text-white" />
                            },
                            {
                                title: "Kill the Billable Hour",
                                desc: "Traditional firms bill by time; we bill by value. Our upfront pricing aligns our incentives with yours: efficiency, speed, and results.",
                                icon: <Clock size={24} className="text-white" />
                            },
                            {
                                title: "Real-Time Visibility",
                                desc: "Stop driving with your rear-view mirror. We provide up-to-date dashboards so you can make decisions based on today's numbers.",
                                icon: <BarChart3 size={24} className="text-white" />
                            },
                            {
                                title: "Direct Expert Access",
                                desc: "No gatekeepers. You get direct access to your dedicated CPA and finance team via video, chat, or email. We're an extension of your team.",
                                icon: <ShieldCheck size={24} className="text-white" />
                            }
                        ].map((item, i) => (
                            <GlassCard key={i} className="p-10 group hover:border-growth/50 transition-all duration-500 bg-white/5 backdrop-blur-2xl" intensity="heavy">
                                <div className="flex items-start gap-8">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-growth transition-colors shadow-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                                        <p className="text-white/50 font-medium leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <Testimonials />
            </motion.div>

            {/* FAQ Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Common Questions</span>
                        <h2 className="text-5xl md:text-7xl font-black text-navy-950 mb-6 tracking-tighter leading-[0.95]">
                            You've got questions. <br />
                            <span className="text-growth italic">We've got answers.</span>
                        </h2>
                    </motion.div>
                    <FAQAccordion />
                    <div className="text-center mt-12">
                        <Link href="/faq" className="text-sm font-bold text-navy-900/40 hover:text-growth transition uppercase tracking-widest border-b border-transparent hover:border-growth inline-block pb-1 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                            View All FAQs
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 text-center"
                >
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block font-bold">Join the Revolution</span>
                    <h2 className="text-4xl md:text-6xl font-black text-navy-950 tracking-tighter mb-8 leading-[1.05]">Ready to upgrade?</h2>
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-navy-950 text-white px-12 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                        Schedule a Call <Send size={20} />
                    </Link>
                </motion.div>
            </section>

        </main>
    );
}
