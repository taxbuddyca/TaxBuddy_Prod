"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import RRSPCalculator from "@/components/RRSPCalculator";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    ChevronDown,
    Plus,
    Minus,
    ArrowRight,
    PlayCircle,
    Download,
    Calculator,
    Calendar,
    Target,
    ShieldCheck
} from "lucide-react";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-100 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left group"
            >
                <span className="text-lg font-black text-navy-950 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{question}</span>
                {isOpen ? <Minus size={20} className="text-blue-600" /> : <Plus size={20} className="text-navy-900/30" />}
            </button>
            {isOpen && (
                <div className="mt-4 text-navy-900/60 font-bold leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default function RRSPCalculatorPage() {
    return (
        <>
            <main className="pt-32 pb-24 overflow-hidden">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-emerald-600 border border-emerald-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                            2025 RRSP Savings Tool
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tight leading-tight max-w-4xl uppercase">
                            RRSP Tax Savings Calculator
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/60 max-w-3xl font-bold leading-relaxed mb-12">
                            Contributing to an RRSP is one of the most effective ways to lower your taxes. Use our calculator to see how much you can save on your 2025 return.
                        </p>
                    </div>

                    <RRSPCalculator />
                </div>

                {/* Savings Strategy Section */}
                <section className="bg-navy-950 py-24 text-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="text-4xl font-black mb-8 tracking-tighter uppercase leading-tight">
                                    Why your RRSP is a <span className="text-blue-400">tax superpower</span>
                                </h2>
                                <p className="text-white/40 font-bold mb-12 leading-relaxed text-lg">
                                    Every dollar you contribute to your Registered Retirement Savings Plan reduces your taxable income for that year. This means you skip the income tax on those earnings until you withdraw them in retirement.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Instant Tax Reduction", desc: "Lower your taxable income dollar-for-dollar." },
                                        { title: "Tax-Deferred Growth", desc: "Your investments grow tax-free within the plan." },
                                        { title: "Spousal Contributions", desc: "Balance income with your partner for long-term savings." },
                                    ].map((benefit, i) => (
                                        <div key={i} className="flex gap-6 items-start group">
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600 transition-colors">
                                                <Target size={24} className="text-blue-400 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black mb-1">{benefit.title}</h4>
                                                <p className="text-white/20 font-bold">{benefit.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-[4rem] p-12 border border-white/10">
                                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">2025 Benchmarks</h3>
                                <div className="space-y-8">
                                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                        <div>
                                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Max Deduction Limit</div>
                                            <div className="text-5xl font-black">$32,490</div>
                                        </div>
                                        <Link href="/resources/rrsp-limits" className="text-white/20 hover:text-white mb-2 underline decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">Learn More</Link>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                        <div>
                                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Contribution Deadline</div>
                                            <div className="text-3xl font-black">March 2, 2026</div>
                                        </div>
                                    </div>
                                    <div className="bg-white text-navy-950 p-8 rounded-3xl mt-8">
                                        <h4 className="font-black mb-2 uppercase tracking-tight">Expert Strategy</h4>
                                        <p className="text-sm font-bold opacity-60 leading-relaxed mb-6">
                                            If your income is lower than normal this year, you can still contribute now but save the deduction for a future year when you're in a higher tax bracket.
                                        </p>
                                        <Link href="/contact" className="text-blue-600 font-black uppercase text-xs tracking-widest flex items-center gap-2">Talk to an advisor <ArrowRight size={14} /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-black text-navy-950 tracking-tighter uppercase mb-12 text-center">RRSP Frequently asked questions</h2>
                        <div className="space-y-2">
                            <FAQItem
                                question="What is the maximum RRSP contribution for 2025?"
                                answer="The limit is 18% of your earned income from 2024, up to a maximum of $32,490. You can find your exact limit on your most recent Notice of Assessment from the CRA."
                            />
                            <FAQItem
                                question="What happens if I over-contribute to my RRSP?"
                                answer="The CRA allows a lifetime over-contribution buffer of $2,000. Any amount above that is subject to a 1% per month penalty tax until it's withdrawn or corrected."
                            />
                            <FAQItem
                                question="Can I use my RRSP for a home down payment?"
                                answer="Yes, through the Home Buyers' Plan (HBP). You can withdraw up to $60,000 tax-free for a first home purchase, provided it's paid back over 15 years."
                            />
                            <FAQItem
                                question="What is the difference between an RRSP and a TFSA?"
                                answer="RRSPs provide a tax deduction today but are taxed upon withdrawal. TFSAs do not offer a deduction, but all growth and withdrawals are completely tax-free."
                            />
                        </div>
                    </div>
                </section>

                {/* Resources Grid */}
                <section className="py-24 bg-gray-50 border-t border-gray-100 no-print">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16">
                            <h2 className="text-3xl font-black tracking-tighter uppercase mb-4 text-navy-950">More Tools for Canadians</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { type: "Resources", title: "Dividend Tax Guide", action: "Read guide", icon: PlayCircle, href: "/resources/dividend-tax" },
                                {
                                    type: "Resources",
                                    title: "Tax Prep Checklist",
                                    action: "Download",
                                    icon: Download,
                                    onClick: () => {
                                        window.location.href = '/resources/tax-checklist';
                                        // Once on page, user can click "Download PDF"
                                    }
                                },
                                { type: "Tools", title: "Income Tax Calculator", action: "Use calculator", icon: Calculator, href: "/tools/tax-calculator" },
                                {
                                    type: "Tools",
                                    title: "Tax Deadline Reminder",
                                    action: "Add to calendar",
                                    icon: Calendar,
                                    onClick: () => {
                                        const icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260430T090000Z\nDTEND:20260430T170000Z\nSUMMARY:TaxBuddy: Canada Tax Filing Deadline 2026\nDESCRIPTION:Today is the deadline to file your 2025 personal income tax return and pay any balance owing to the CRA.\nLOCATION:Canada\nEND:VEVENT\nEND:VCALENDAR";
                                        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', 'tax-deadline-reminder.ics');
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                },
                            ].map((item, i) => {
                                const CardContent = (
                                    <div className="p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-premium transition-all group h-full flex flex-col cursor-pointer">
                                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">{item.type}</div>
                                        <h3 className="text-xl font-black mb-8 tracking-tight text-navy-950">{item.title}</h3>
                                        <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-widest border-t border-gray-100 pt-6 text-navy-950/40 group-hover:text-blue-600 transition-colors">
                                            <item.icon size={18} className="text-blue-600" />
                                            {item.action}
                                        </div>
                                    </div>
                                );

                                return item.href ? (
                                    <Link href={item.href} key={i}>{CardContent}</Link>
                                ) : (
                                    <div key={i} onClick={item.onClick}>{CardContent}</div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
