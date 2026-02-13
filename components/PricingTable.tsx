"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Zap, Rocket, Shield, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';
import { getPricingPlans, PricingPlan } from '@/lib/pricing';

const fallbackPlans = [
    {
        name: "Growth",
        price: "$299",
        tag: "Small Businesses",
        icon: <Zap className="w-8 h-8 text-growth" />,
        features: ["Bi-weekly Bookkeeping", "GST/HST Filings", "Corporate Tax Return", "Basic Portal Access", "Email Support"]
    },
    {
        name: "Enterprise",
        price: "$599",
        tag: "Most Popular",
        icon: <Rocket className="w-8 h-8 text-growth" />,
        popular: true,
        features: ["Real-time Reporting", "Payroll (up to 5)", "Tax Planning Session", "Admin Dash Access", "Unlimited Priority Support", "Dedicated CPA Pod"]
    },
    {
        name: "Controllership",
        price: "Custom",
        tag: "Scale-ups",
        icon: <Shield className="w-8 h-8 text-growth" />,
        features: ["Dedicated Finance Team", "CFO Advisory", "Audit Defence & Support", "Advanced API Access", "Custom SaaS Integration", "Strategic R&D Credits"]
    }
];

export default function PricingTable() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getPricingPlans();
                if (data && data.length > 0) {
                    setPlans(data);
                } else {
                    // @ts-ignore
                    setPlans(fallbackPlans);
                }
            } catch (err) {
                console.error("Using fallback pricing due to connection error");
                // @ts-ignore
                setPlans(fallbackPlans);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const getIcon = (name: string) => {
        if (name.includes("Growth")) return <Zap className="w-8 h-8 text-growth" />;
        if (name.includes("Enterprise")) return <Rocket className="w-8 h-8 text-growth" />;
        return <Shield className="w-8 h-8 text-growth" />;
    };

    if (loading) return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-[600px] bg-gray-50 rounded-[3rem] animate-pulse" />
            ))}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
            {plans.map((plan, i) => (
                <GlassCard
                    key={i}
                    className={`p-12 flex flex-col items-start relative overflow-hidden transition-all duration-500 group border-gray-100 bg-white shadow-sm ${plan.popular ? 'border-growth/50 shadow-premium scale-105 z-10' : 'hover:border-growth/20 hover:shadow-lg'}`}
                    intensity="light"
                >
                    {plan.popular && (
                        <div className="absolute top-8 -right-12 rotate-45 bg-growth text-white px-12 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg">
                            Popular
                        </div>
                    )}
                    <div className="mb-8 p-4 bg-blue-50/50 rounded-2xl group-hover:bg-growth group-hover:text-white transition-all duration-500 border border-blue-100/50">
                        {getIcon(plan.name)}
                    </div>
                    <h4 className="text-3xl font-black text-navy-950 mb-2">{plan.name}</h4>
                    <div className="text-xs font-black text-growth/80 uppercase tracking-[0.2em] mb-8">{plan.tag}</div>

                    <div className="text-5xl font-black text-navy-950 mb-10 tracking-tighter">
                        {plan.price}
                        {plan.price !== "Custom" && !plan.price.includes("Custom") && <span className="text-lg text-navy-900/40 font-bold ml-1">{plan.frequency || '/mo'}</span>}
                    </div>

                    <div className="w-full space-y-4 mb-12">
                        <div className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.2em] mb-4">Core Benefits</div>
                        {plan.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm font-medium text-navy-900/80 group-hover:text-navy-950 transition-colors">
                                <div className="w-5 h-5 rounded-full bg-growth/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-growth" />
                                </div>
                                <span className="truncate">{feat}</span>
                            </div>
                        ))}
                    </div>

                    <Link href="/contact" className={`w-full py-5 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 mt-auto ${plan.popular ? 'bg-growth text-white hover:bg-growth-600 hover:shadow-lg shadow-growth/20' : 'bg-navy-950 text-white hover:bg-navy-900 hover:scale-[1.02]'}`}>
                        {plan.price.includes("Custom") ? "Contact Sales" : "Get Started"} <ArrowRight size={20} />
                    </Link>

                    <div className="mt-6 w-full text-center">
                        <div className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest italic leading-relaxed">
                            No hourly billing. <br /> Total price transparency.
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
