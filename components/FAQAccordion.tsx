"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import GlassCard from './GlassCard';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    {
        category: "Sales & Onboarding",
        question: "How long does onboarding take?",
        answer: "Typically 2-4 weeks. This includes a deep dive into your current systems, data migration to Xero/QBO, and setting up your dedicated 'pod' communication channels."
    },
    {
        category: "Sales & Onboarding",
        question: "Do I have to switch to Xero?",
        answer: "We highly recommend Xero or QuickBooks Online for their robust API ecosystems. If you're on a legacy system, part of our onboarding is a managed migration to these modern tools."
    },
    {
        category: "Technical & Ops",
        question: "Will I have a dedicated accountant?",
        answer: "Yes. You are assigned a 'Pod' which includes a Lead CPA, a Bookkeeper, and a Tech Specialist. This ensures continuity even if one person is away."
    },
    {
        category: "Technical & Ops",
        question: "How do you handle payroll?",
        answer: "We integrate with tools like Wagepoint and Deel. We manage the filings, remittances, and T4/T4A production as part of our Enterprise and Controllership tiers."
    },
    {
        category: "Pricing & Plans",
        question: "Is there an setup fee?",
        answer: "For complex migrations, we may charge a one-time onboarding fee. For standard cloud-to-cloud moves, it is usually waived upon signing a 12-month agreement."
    }
];

interface FAQAccordionProps {
    items?: { question: string; answer: string; category?: string }[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const displayFaqs = items || faqs;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {displayFaqs.map((faq, i) => (
                <GlassCard
                    key={i}
                    className="overflow-hidden border-gray-100/50 hover:border-growth/20 transition-all duration-300"
                    intensity="light"
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full p-8 flex items-center justify-between text-left group"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`p-3 rounded-xl transition-all duration-500 ${openIndex === i ? 'bg-growth text-white rotate-12' : 'bg-gray-100 text-navy-900/50'}`}>
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] mb-1">{faq.category}</div>
                                <h4 className={`text-xl font-black tracking-tight transition-colors ${openIndex === i ? 'text-growth' : 'text-navy-950 group-hover:text-growth'}`}>{faq.question}</h4>
                            </div>
                        </div>
                        <div className={`text-navy-900/30 group-hover:text-growth transition-all ${openIndex === i ? 'rotate-180 text-growth' : ''}`}>
                            <ChevronDown size={24} />
                        </div>
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-8 pb-8 pt-0 ml-16">
                            <div className="w-full h-px bg-gray-100/20 mb-6" />
                            <p className="text-navy-900/70 text-lg font-medium leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
