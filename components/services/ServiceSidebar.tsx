"use client";

import { ServiceItem } from "@/lib/data/services";
import GlassCard from "../GlassCard";
import { CheckCircle2, DollarSign, Download, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { PricingPlan } from "@/lib/pricing";

interface ServiceSidebarProps {
    sidebar: ServiceItem['sidebar'];
    dynamicPricing?: PricingPlan | null;
}

export default function ServiceSidebar({ sidebar, dynamicPricing }: ServiceSidebarProps) {
    if (!sidebar) return null;

    const pricing = dynamicPricing ? {
        title: dynamicPricing.name,
        package: dynamicPricing.tag,
        price: dynamicPricing.price,
        unit: dynamicPricing.frequency || "",
        features: dynamicPricing.features
    } : sidebar.pricing;

    const [email, setEmail] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Lead Magnet Submitted:", { email, selectedOption });
        // TODO: Integrate with backend
        alert("Thanks! Your download link will be sent shortly.");
    };

    return (
        <div className="sticky top-32 space-y-8">
            {/* Pricing Card */}
            <GlassCard className="p-8 bg-white/80 backdrop-blur-md shadow-xl border-white/60">
                <div className="bg-blue-50/50 rounded-2xl p-6 text-center mb-6 border border-blue-100/50">
                    <h3 className="text-xl font-black text-navy-950 mb-2">{pricing?.title}</h3>
                    <p className="text-navy-900/60 font-medium uppercase tracking-widest text-xs mb-4">{pricing?.package}</p>
                    <div className="flex items-end justify-center gap-1 text-growth">
                        <DollarSign size={24} className="mb-2" />
                        <span className="text-5xl font-black tracking-tight">{pricing?.price}</span>
                        <span className="text-navy-900/40 font-bold mb-2">{pricing?.unit}</span>
                    </div>
                </div>

                <ul className="space-y-4 mb-8">
                    {pricing?.features.map((feat, i) => (
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

            {/* Lead Magnet */}
            <GlassCard className="p-8 bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-md shadow-xl border-white/60">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-growth/10 flex items-center justify-center text-growth border border-growth/20 shadow-inner">
                        <Download size={20} />
                    </div>
                    <h3 className="text-lg font-black text-navy-950">{sidebar.leadMagnet.title}</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder={sidebar.leadMagnet.inputs[0].placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition-all placeholder:text-gray-400 font-medium text-navy-900"
                        required
                    />

                    <div className="space-y-3">
                        {sidebar.leadMagnet.options.map((opt, i) => (
                            <label key={i} className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center mt-0.5">
                                    <input
                                        type="radio"
                                        name="leadMagnetOption"
                                        value={opt}
                                        checked={selectedOption === opt}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-growth peer-checked:bg-growth transition-all" />
                                </div>
                                <span className="text-xs font-bold text-navy-900/70 group-hover:text-navy-900 transition-colors leading-snug">
                                    {opt}
                                </span>
                            </label>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-growth text-white py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-growth/90 hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        Download Now <Download size={16} />
                    </button>

                    <p className="text-[10px] text-navy-900/40 text-center leading-tight">
                        By downloading, you agree to our Terms & Privacy Policy.
                    </p>
                </form>
            </GlassCard>
        </div>
    );
}
