"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface FAQItem {
    question: string;
    answer: React.ReactNode;
    category: string;
}

const faqs: FAQItem[] = [
    {
        category: "General",
        question: "What does TaxBuddy do?",
        answer: (
            <>
                We serve as both an extension to finance departments or act as the entire finance team for Canadian medium-sized businesses typically earning between $3M and $15M in revenue.
                <br /><br />
                Recognizing the unique challenges faced by these companies, we offer a suite of outsourced financial services designed to fill knowledge gaps, manage workload overflow, and provide expert guidance when needed.
                <br /><br />
                Our clients gain a reliable partner in tax services, bookkeeping, payroll management, accounts payable, and other essential finance functions.
                <br /><br />
                Our dedicated team of specialists is committed to ensuring you have support without the need for additional full-time hires. We tailor our services to integrate smoothly with your business, ensuring that you have scalable solutions that adapt to your evolving needs.
            </>
        )
    },
    {
        category: "Team",
        question: "How many employees work at TaxBuddy?",
        answer: "~60 team members."
    },
    {
        category: "Why Us",
        question: "Why TaxBuddy?",
        answer: (
            <>
                We've worked with over 1,000 Canadian companies and have helped each one create a custom financial back-office that works for them.
                <br /><br />
                We're usually the firm people come to when they've outgrown their current Canadian bookkeeper/CPA firm or would like to de-risk any turnover issues in their finance department.
                <br /><br />
                Your needs may change over time (hiring internally, adding/subtracting services) and we'll work with you ensure you're using us for exactly what you need.
            </>
        )
    },
    {
        category: "Fit",
        question: "Who is your ideal customer?",
        answer: (
            <>
                Any industry that does not subscribe to the typical tech 'grow at all costs' mentality and emphasizes sustainable and stable business practices.
                <br /><br />
                Some industry examples include professional services, agencies, retail, e-commerce, healthcare, non-profits, real estate and financial services (typically not bootstrapped startups, restaurants, or construction).
            </>
        )
    },
    {
        category: "Service Area",
        question: "What cities do you serve?",
        answer: (
            <>
                We work in all Canadian cities, including Toronto, Vancouver, Halifax, Edmonton, Calgary and Winnipeg. Because we're remote, we can perform bookkeeping and tax no matter where you're located in Canada.
                <br /><br />
                We also support USA and other Global companies who are operating in Canada.
            </>
        )
    },
    {
        category: "Fit",
        question: "I'm a sole proprietor, can you help?",
        answer: "While we only work with corporations, we may be able to point you in the right direction or recommend another firm that may be able to help."
    }
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
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

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-8 pb-8 pt-0 ml-16">
                            <div className="w-full h-px bg-gray-100/20 mb-6" />
                            <div className="text-navy-900/70 text-lg font-medium leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
}
