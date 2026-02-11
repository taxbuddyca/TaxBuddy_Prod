
"use client";

import { Star, Quote } from "lucide-react";
import GlassCard from "./GlassCard";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Founder, TechFlow",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        quote: "TaxBuddy handles our complex SaaS revenue recognition perfectly. I don't lose sleep over audits anymore."
    },
    {
        name: "Michael Chen",
        role: "Real Estate Investor",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        quote: "The Real Estate specialized team found deductions my previous accountant missed for 3 years. Incredible value."
    },
    {
        name: "Dr. Emily Al-Fayed",
        role: "Medical Professional",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
        quote: "Finally, a firm that understands MPC incorporation and dividends. The digital portal is a lifesaver for my busy schedule."
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[9px] mb-4 block">Social Proof</span>
                    <h2 className="text-3xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                        Don't just take our <br />
                        <span className="text-growth">word for it.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <GlassCard key={i} className="p-8 h-full flex flex-col relative group hover:-translate-y-2 transition-transform duration-300" intensity="light">
                            <div className="absolute top-8 right-8 text-growth/10 group-hover:text-growth/20 transition-colors">
                                <Quote size={48} />
                            </div>

                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>

                            <p className="text-navy-900/70 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-navy-950 text-sm">{t.name}</div>
                                    <div className="text-navy-900/40 text-xs font-bold uppercase tracking-wider">{t.role}</div>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
