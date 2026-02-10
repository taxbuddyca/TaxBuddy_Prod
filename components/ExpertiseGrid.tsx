"use client";

import React from 'react';
import { Cpu, ShoppingCart, Home, Briefcase, Zap, Globe, Shield } from 'lucide-react';
import GlassCard from './GlassCard';

const industries = [
    {
        name: "SaaS & Tech",
        icon: <Cpu className="w-8 h-8" />,
        desc: "Managing MRR recognition, SR&ED credits, and complex cap table accounting.",
        color: "from-blue-500/20"
    },
    {
        name: "E-commerce",
        icon: <ShoppingCart className="w-8 h-8" />,
        desc: "Inventory reconciliation across Shopify, Amazon, and Walmart with multi-currency tax logic.",
        color: "from-growth/20"
    },
    {
        name: "Professional Services",
        icon: <Briefcase className="w-8 h-8" />,
        desc: "Streamlining partner draws, multi-provincial billing, and lean ops for law & consulting firms.",
        color: "from-amber-500/20"
    },
    {
        name: "Health & MedTech",
        icon: <Shield className="w-8 h-8" />,
        desc: "Compliance-heavy accounting for clinics and health-platforms scaling across Canada.",
        color: "from-teal-500/20"
    }
];

export default function ExpertiseGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((ind, i) => (
                <GlassCard
                    key={i}
                    className="p-10 group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden"
                    intensity="light"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${ind.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    <div className="w-16 h-16 bg-white border border-growth/30 rounded-2xl flex items-center justify-center text-navy-950 mb-8 group-hover:bg-growth group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-premium relative z-10">
                        {ind.icon}
                    </div>
                    <h4 className="text-2xl font-black text-navy-950 mb-4 tracking-tight relative z-10">{ind.name}</h4>
                    <p className="text-navy-900/70 text-sm font-medium leading-relaxed relative z-10 group-hover:text-navy-950 transition-colors">
                        {ind.desc}
                    </p>
                    <div className="absolute bottom-6 right-8 text-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0 relative z-10">
                        <Zap size={40} />
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
