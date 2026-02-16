"use client";

import { Calendar, Lightbulb, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";

export default function TaxTipsSidebar() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    const deadlines = [
        { date: "Feb 28", event: "T4/T5 Filing Deadline" },
        { date: "Apr 30", event: "Personal Tax Deadline" },
        { date: "Jun 15", event: "Self-Employed Deadline" }
    ];

    const monthlyTip = {
        title: "Home Office Deductions",
        text: "Did you know you can claim a portion of your utilities, internet, and even rent if you work from home? Make sure to track your square footage accurately."
    };

    return (
        <aside className="space-y-8">
            {/* Deadlines Card */}
            <GlassCard className="p-6 border-blue-500/10" intensity="light">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600">
                        <Calendar size={20} />
                    </div>
                    <h3 className="text-sm font-black text-navy-950 uppercase tracking-widest">Key Deadlines</h3>
                </div>

                <div className="space-y-4">
                    {deadlines.map((d, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-navy-950/5 last:border-0">
                            <span className="text-xs font-black text-navy-950">{d.date}</span>
                            <span className="text-xs font-bold text-navy-900/40 text-right">{d.event}</span>
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Monthly Tip Card */}
            <GlassCard className="p-6 border-growth/10 overflow-hidden relative" intensity="light">
                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-10 h-10 bg-growth/10 rounded-xl flex items-center justify-center text-growth">
                        <Lightbulb size={20} />
                    </div>
                    <h3 className="text-sm font-black text-navy-950 uppercase tracking-widest">{currentMonth} Tip</h3>
                </div>

                <div className="relative z-10">
                    <h4 className="text-md font-black text-navy-950 mb-2">{monthlyTip.title}</h4>
                    <p className="text-sm text-navy-900/60 leading-relaxed mb-4 font-medium italic">
                        "{monthlyTip.text}"
                    </p>
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-growth/5 rounded-full blur-2xl" />
            </GlassCard>

            {/* Quick Audit Check CTA */}
            <Link href="/contact" className="group block">
                <GlassCard className="p-6 bg-navy-950 border-navy-900 overflow-hidden relative" intensity="heavy">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="text-growth" size={20} />
                            <h3 className="text-xs font-black text-white uppercase tracking-widest">Audit Risk?</h3>
                        </div>
                        <p className="text-sm text-white/50 mb-4 font-bold">
                            Get a free 15-minute risk assessment with a CPA.
                        </p>
                        <div className="flex items-center gap-2 text-growth font-black text-xs uppercase tracking-widest">
                            Book Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-growth/10 rounded-full blur-3xl -mr-16 -mt-16" />
                </GlassCard>
            </Link>
        </aside>
    );
}
