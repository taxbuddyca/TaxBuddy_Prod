"use client";

import React from 'react';
import Link from 'next/link';
import { Users, Briefcase, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    examples: string[];
    href: string;
    color: string;
}

const ProfileCard = ({ title, description, icon, examples, href, color }: ProfileCardProps) => {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.02, y: -8 }}
                className={`group relative p-8 rounded-3xl border-2 ${color} bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer h-full`}
            >
                <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl ${color.replace('border', 'bg').replace('hover:border', '')} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        {icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-navy-950 mb-3 tracking-tight">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-navy-900/60 font-bold mb-6 leading-relaxed">
                        {description}
                    </p>

                    {/* Examples */}
                    <div className="space-y-2 mb-6 flex-grow">
                        <div className="text-xs font-black text-navy-900/40 uppercase tracking-wider mb-3">
                            Examples:
                        </div>
                        {examples.map((example, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-navy-900/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                <span>{example}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-blue-600 font-black text-sm group-hover:gap-4 transition-all">
                        Start Optimization
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default function ProfileDetector() {
    return (
        <div className="min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-blue-600 border border-blue-100"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                        Intelligent Tax Optimization
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-navy-950 mb-6 tracking-tight leading-tight"
                    >
                        Who are you?
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-navy-900/60 max-w-3xl mx-auto font-bold leading-relaxed"
                    >
                        Our intelligent 3-Brain Tax Engine routes you to personalized strategies based on your unique situation.
                    </motion.p>
                </div>

                {/* Profile Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    <ProfileCard
                        title="Individual & Family"
                        description="Optimize personal and family taxes with smart strategies"
                        icon={<Users size={32} className="text-emerald-600" />}
                        examples={[
                            "Employees & Families",
                            "Students & New Grads",
                            "Retirees",
                            "Newcomers to Canada"
                        ]}
                        href="/tools/tax-engine/life"
                        color="border-emerald-200 hover:border-emerald-400"
                    />

                    <ProfileCard
                        title="Business Owner"
                        description="Maximize business deductions and minimize tax liability"
                        icon={<Briefcase size={32} className="text-blue-600" />}
                        examples={[
                            "Contractors & Gig Workers",
                            "Incorporated Businesses",
                            "Startups & Founders",
                            "Small Business Owners"
                        ]}
                        href="/tools/tax-engine/growth"
                        color="border-blue-200 hover:border-blue-400"
                    />

                    <ProfileCard
                        title="Investor & Specialist"
                        description="Navigate complex tax scenarios with expert guidance"
                        icon={<TrendingUp size={32} className="text-purple-600" />}
                        examples={[
                            "Real Estate Investors",
                            "Crypto Traders",
                            "Cross-Border Workers",
                            "Day Traders"
                        ]}
                        href="/tools/tax-engine/niche"
                        color="border-purple-200 hover:border-purple-400"
                    />
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 grid md:grid-cols-4 gap-6"
                >
                    {[
                        { icon: "🧠", title: "Rule-Based Logic", desc: "Intelligent tax rules engine" },
                        { icon: "📊", title: "Risk Scoring", desc: "CRA audit risk analysis" },
                        { icon: "💰", title: "Savings Calculator", desc: "Precise tax savings estimates" },
                        { icon: "📁", title: "Scenario Comparison", desc: "Compare multiple strategies" }
                    ].map((feature, i) => (
                        <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="text-4xl mb-3">{feature.icon}</div>
                            <div className="text-sm font-black text-navy-950 mb-1">{feature.title}</div>
                            <div className="text-xs text-navy-900/40 font-bold">{feature.desc}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
