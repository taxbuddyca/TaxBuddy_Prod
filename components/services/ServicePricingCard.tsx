"use client";

import React from 'react';
import Link from "next/link";
import { CheckCircle2, DollarSign, ArrowRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";

interface PricingPlanData {
    title: string;
    package: string;
    price: string;
    unit: string;
    features: string[];
}

interface ServicePricingCardProps {
    pricing: PricingPlanData | undefined;
    className?: string;
}

export default function ServicePricingCard({ pricing, className = "" }: ServicePricingCardProps) {
    if (!pricing) return null;

    return (
        <GlassCard className={`p-8 bg-white/80 backdrop-blur-md shadow-xl border-white/60 ${className}`}>
            <div className="bg-blue-50/50 rounded-2xl p-6 text-center mb-6 border border-blue-100/50">
                <h3 className="text-xl font-black text-navy-950 mb-2">{pricing.title}</h3>
                <p className="text-navy-900/60 font-medium uppercase tracking-widest text-xs mb-4">{pricing.package}</p>
                <div className="flex items-end justify-center gap-1 text-growth">
                    <DollarSign size={24} className="mb-2" />
                    <span className="text-5xl font-black tracking-tight">{pricing.price}</span>
                    <span className="text-navy-900/40 font-bold mb-2">{pricing.unit}</span>
                </div>
            </div>

            <ul className="space-y-4 mb-8">
                {pricing.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-bold text-navy-900/80">
                        <CheckCircle2 size={16} className="text-growth flex-shrink-0" />
                        {feat}
                    </li>
                ))}
            </ul>

            <Link href="/contact" className="w-full bg-navy-950 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-navy-900 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                Get a Quote <ArrowRight size={18} />
            </Link>
        </GlassCard>
    );
}
