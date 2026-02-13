import React from 'react';
import PageBackground from '@/components/PageBackground';
import GlassCard from '@/components/GlassCard';
import { ArrowRight, TrendingUp, Users, Clock } from 'lucide-react';
import Link from 'next/link';

const caseStudies = [
    {
        title: "Scaling a SaaS Startup",
        client: "TechFlow Inc.",
        result: "$45k Annual Tax Savings",
        description: "We implemented SR&ED tracking and reorganized their corporate structure to optimize for the Lifetime Capital Gains Exemption.",
        industry: "Technology",
        icon: TrendingUp
    },
    {
        title: "Medical Practice Optimization",
        client: "Dr. Sarah Chen, DPC",
        result: "Reduced Admin Time by 80%",
        description: "Transitioned a busy family practice from paper records to a tailored digital ecosystem with Xero and Dext.",
        industry: "Healthcare",
        icon: Users
    },
    {
        title: "Construction Cash Flow",
        client: "BuildRight Contractors",
        result: "Positive Cash Flow in 3 Months",
        description: "Implemented job costing and progress billing workflows to ensure expenses were recovered before the next project phase began.",
        industry: "Construction",
        icon: Clock
    }
];

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 selection:bg-growth selection:text-white">
            <PageBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Proven Results</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                        Client <span className="text-growth">Success Stories</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Real examples of how we've helped Canadian businesses save money and grow faster.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, i) => (
                        <GlassCard key={i} className="p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300" intensity="light">
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xs font-bold uppercase tracking-wider text-navy-900/40 bg-gray-100 px-3 py-1 rounded-full">{study.industry}</span>
                                <div className="w-10 h-10 bg-growth/10 rounded-xl flex items-center justify-center text-growth">
                                    <study.icon size={20} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-navy-950 mb-2">{study.title}</h3>
                            <p className="text-sm font-bold text-navy-900/40 mb-6">{study.client}</p>

                            <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
                                <span className="block text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Impact</span>
                                <span className="text-lg font-black text-navy-950">{study.result}</span>
                            </div>

                            <p className="text-navy-900/60 text-sm leading-relaxed mb-8 flex-grow">
                                {study.description}
                            </p>

                            <Link href="/contact" className="flex items-center gap-2 text-sm font-bold text-navy-950 mt-auto group">
                                Start Your Success Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </main>
    );
}
