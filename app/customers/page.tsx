"use client";

import ExpertiseGrid from "@/components/ExpertiseGrid";
import GlassCard from "@/components/GlassCard";
import { Quote, ExternalLink, ArrowRight, Zap, Rocket, Shield } from "lucide-react";
import Link from "next/link";
import { MapleConstructionLogo, CoastalCafeLogo, TechNorthLogo, OntarioLogisticsLogo, PrairieFarmsLogo } from "@/components/BrandLogos";

const caseStudies = [
    {
        industry: "SaaS & Tech",
        company: "InnovateFlow",
        stat: "40% Tax Savings",
        description: "Optimized SR&ED tax credits and structured multi-currency payroll for a scaling Series B startup.",
        icon: <Zap className="w-8 h-8 text-growth" />
    },
    {
        industry: "E-Commerce",
        company: "VividGoods",
        stat: "Real-time COGS",
        description: "Automated inventory accounting and sales tax nexus across 15+ US states for a Shopify Plus brand.",
        icon: <Rocket className="w-8 h-8 text-growth" />
    },
    {
        industry: "Professional Services",
        company: "DesignArch",
        stat: "$2M+ Managed",
        description: "Implemented a full-service controllership pod to manage high-volume project billings and partner distributions.",
        icon: <Shield className="w-8 h-8 text-growth" />
    }
];

const testimonials = [
    {
        quote: "TaxBuddy didn't just do our taxes; they became our entire back office. Our growth wouldn't be possible without their pod structure.",
        author: "Sarah Jenkins",
        role: "CEO, InnovateFlow"
    },
    {
        quote: "The real-time visibility into our margins changed how we run our Shopify store. Best investment we've made this year.",
        author: "Markus Chen",
        role: "Founder, VividGoods"
    }
];

export default function CustomersPage() {
    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            {/* Header */}
            <section className="py-24 relative overflow-hidden bg-blue-50/50">
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Community</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.95]">
                            Powering Canada's <span className="text-growth">Local Businesses.</span>
                        </h1>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed mb-16">
                            From local cafes to growing construction firms, we provide the fractional finance team that helps Canadian small businesses thrive.
                        </p>
                    </div>

                    {/* Canadian Small Business Logo Grid */}
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 mb-12">
                        <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 text-navy-900">
                            <MapleConstructionLogo className="h-10 w-auto" />
                        </div>
                        <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 text-navy-900">
                            <CoastalCafeLogo className="h-12 w-auto" />
                        </div>
                        <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 text-navy-900">
                            <TechNorthLogo className="h-9 w-auto" />
                        </div>
                        <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 text-navy-900">
                            <OntarioLogisticsLogo className="h-10 w-auto" />
                        </div>
                        <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 text-navy-900">
                            <PrairieFarmsLogo className="h-12 w-auto" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-32 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {caseStudies.map((study, idx) => (
                            <GlassCard key={idx} className="p-8 hover-flash transition-all duration-500 group" intensity="light">
                                <div className="mb-8 p-4 bg-growth/10 rounded-2xl w-fit group-hover:bg-growth group-hover:text-white transition-colors">
                                    {study.icon}
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-growth mb-2">{study.industry}</div>
                                <h3 className="text-2xl font-black text-navy-950 mb-6">{study.company}</h3>
                                <div className="text-3xl font-black text-navy-950 mb-6 tracking-tighter py-4 border-y border-gray-100 italic">
                                    "{study.stat}"
                                </div>
                                <p className="text-navy-900/60 text-sm font-medium mb-8 leading-relaxed">
                                    {study.description}
                                </p>
                                <button className="flex items-center gap-2 text-[10px] font-black text-navy-950 hover:text-growth transition uppercase tracking-widest">
                                    Read Case Study <ArrowRight size={14} />
                                </button>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-40">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-black text-navy-950 tracking-tighter mb-6">Deep Expertise. Across Borders.</h2>
                        <p className="text-navy-900/40 font-medium max-w-2xl mx-auto italic">
                            Specialized accounting for modern business models that standard firms don't understand.
                        </p>
                    </div>
                    <ExpertiseGrid />
                </div>
            </section>

            {/* Wall of Love Testimonials - Light Theme */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-50/50 blur-[120px] rounded-full" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-6 block font-bold">Wall of Love</span>
                            <h2 className="text-5xl font-black tracking-tighter mb-8 leading-[0.95] text-navy-950">What our <span className="text-growth">Partners</span> say.</h2>
                            <p className="text-navy-900/60 text-lg font-medium mb-12 italic">
                                Join 500+ Canadian companies that have upgraded their finance stack.
                            </p>
                            <Link href="/contact" className="inline-flex items-center gap-4 bg-growth text-white px-10 py-5 rounded-2xl font-black hover:bg-growth-600 transition shadow-xl shadow-growth/20">
                                Apply to Join <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            {testimonials.map((t, idx) => (
                                <GlassCard key={idx} intensity="light" className="p-10 border-gray-100 bg-white/50 hover:bg-white hover:border-growth/20 transition shadow-sm hover:shadow-lg">
                                    <Quote className="text-growth mb-6 w-10 h-10 opacity-50" />
                                    <p className="text-2xl font-bold mb-8 leading-tight italic text-navy-950">"{t.quote}"</p>
                                    <div>
                                        <div className="font-black text-navy-950">{t.author}</div>
                                        <div className="text-growth text-sm font-bold uppercase tracking-widest">{t.role}</div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-40 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-5xl font-black text-navy-950 tracking-tighter mb-12">Ready to scale your <span className="text-growth">back office</span>?</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/pricing" className="px-12 py-6 bg-navy-950 text-white rounded-2xl font-black text-lg hover:bg-navy-900 transition shadow-2xl">
                            View Pricing Plans
                        </Link>
                        <Link href="/contact" className="px-12 py-6 bg-white border-2 border-navy-950 text-navy-950 rounded-2xl font-black text-lg hover:bg-gray-50 transition">
                            Talk to a CPA
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
