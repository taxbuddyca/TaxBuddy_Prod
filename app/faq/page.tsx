"use client";

import React from 'react';
import { faqs } from '@/lib/data/faq';
import { Send, HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function FAQPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 selection:bg-growth selection:text-white">
            <PageBackground />
            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-20">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Knowledge Base</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                        Frequently Asked <span className="text-growth">Questions</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Everything you need to know about switching to a modern, virtual-first accounting partner.
                    </p>
                </div>

                <div className="space-y-12">
                    {faqs.map((category) => (
                        <div key={category.category} className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-xl">
                            <h2 className="text-2xl font-black text-navy-950 mb-8 flex items-center gap-3">
                                <HelpCircle size={24} className="text-growth" />
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.items.map((item, i) => (
                                    <details key={i} className="group [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-2xl bg-white p-6 text-navy-900 font-bold hover:bg-gray-50 transition border border-gray-100 shadow-sm">
                                            <h3 className="text-lg">{item.question}</h3>
                                            <ChevronDown className="shrink-0 transition duration-300 group-open:-rotate-180 text-navy-900/40" />
                                        </summary>
                                        <div className="mt-4 px-6 leading-relaxed text-navy-900/70 font-medium">
                                            <p>{item.answer}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 bg-navy-950 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-6">Still have questions?</h3>
                        <p className="text-white/60 text-base font-medium mb-12 max-w-xl mx-auto">
                            Our team is available for deep-dive calls to discuss your specific business structure and tax needs.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-growth text-white px-10 py-5 rounded-2xl font-black hover:bg-growth-600 transition-all text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                        >
                            Contact Support <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
