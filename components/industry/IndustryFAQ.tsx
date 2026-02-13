"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface IndustryFAQProps {
    items: {
        question: string;
        answer: string;
    }[];
}

export default function IndustryFAQ({ items }: IndustryFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-blue-50/50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-black text-navy-950 mb-6">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                                className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-lg font-bold text-navy-950">{item.question}</span>
                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${idx === openIndex ? 'bg-growth text-white' : 'bg-gray-100 text-navy-900'}`}>
                                    {idx === openIndex ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>

                            <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${idx === openIndex ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-8 pb-8 text-navy-900/70 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
