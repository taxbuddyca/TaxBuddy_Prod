"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import TaxCalculator from "@/components/TaxCalculator";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    ChevronDown,
    CheckCircle2,
    ArrowRight,
    Plus,
    Minus,
    PlayCircle,
    Download,
    Calculator,
    Calendar,
    Smartphone,
    ExternalLink,
    Zap
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

export default function CalculatorPage() {
    return (
        <>
            <main className="pt-32 pb-24 overflow-hidden">
                {/* Calculator Hero Section */}
                <div className="max-w-7xl mx-auto px-6 mb-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-blue-600 border border-blue-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Free 2025 Income Tax Calculator
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tight leading-tight max-w-4xl">
                            Canada Income Tax Calculator
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/60 max-w-3xl font-bold leading-relaxed mb-12">
                            Estimate your 2025-26 Canada taxes with our federal Income Tax Calculator. Instantly see your refund, after-tax income, and latest provincial tax brackets.
                        </p>
                    </div>

                    <TaxCalculator />
                </div>

                {/* Tax Brackets Section */}
                <section className="bg-[#fefefe] py-24 border-y border-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-3xl font-black text-navy-950 mb-8 tracking-tighter uppercase">Federal tax brackets 2025</h2>
                                <p className="text-navy-900/60 font-bold mb-8">
                                    Here are the tax brackets for Canada based on your taxable income. Each year, thresholds are adjusted for inflation.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                            <Calculator className="text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-navy-950 tracking-tight">What are tax brackets?</div>
                                            <div className="text-xs text-navy-900/40 font-bold mt-1">Lear how marginal tax rates impact your take-home pay.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-navy-950 text-white">
                                            <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Federal tax bracket</th>
                                            <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-right">Federal tax rates</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {[
                                            { range: "$57,375 or less", rate: "14.50%" },
                                            { range: "$57,376 to $114,750", rate: "20.50%" },
                                            { range: "$114,751 to $177,882", rate: "26.00%" },
                                            { range: "$177,883 to $253,414", rate: "29.00%" },
                                            { range: "more than $253,414", rate: "33.00%" },
                                        ].map((row, i) => (
                                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="px-8 py-5 font-black text-navy-950">{row.range}</td>
                                                <td className="px-8 py-5 font-black text-navy-950 text-right">{row.rate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tax Tips Cards */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-16">
                            <h2 className="text-4xl font-black text-navy-950 tracking-tighter uppercase mb-4">Tax tips to get your best refund</h2>
                            <p className="text-navy-900/60 font-bold max-w-2xl">Expert insights on maximizing your Canadian tax return.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { cat: "Credit & Deductions", title: "Popular Canadian tax deductions and credits", desc: "Uncover 19 essential Canadian tax deductions and credits that could lower your bill and boost your refund.", href: "/resources/tax-checklist" },
                                { cat: "Income & Investments", title: "Understanding RRSP contribution limit", desc: "Learn how RRSP contributions work, where to find your limit, and how they can help you save on taxes.", href: "/resources/rrsp-limits" },
                                { cat: "Income & Investments", title: "How are dividends taxed in Canada?", desc: "Learn the difference between eligible and ineligible dividends and how you can benefit from the dividend tax credit.", href: "/resources/dividend-tax" },
                                { cat: "Employment & Employees", title: "How much tax is deducted from a paycheque?", desc: "Get to know the basics of income tax withholding and how it impacts your refund or taxes owed.", href: "/resources/tax-withholding" },
                            ].map((card, i) => (
                                <Link href={card.href} key={i} className="group bg-gray-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-premium border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">{card.cat}</div>
                                    <h3 className="text-xl font-black text-navy-950 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-navy-900/40 font-bold leading-relaxed mb-6">{card.desc}</p>
                                    <div className="flex items-center gap-2 text-xs font-black text-navy-950 uppercase tracking-widest group-hover:gap-4 transition-all">
                                        Read more <ArrowRight size={14} className="text-blue-600" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Resources Grid */}
                <section className="py-24 bg-navy-950 text-white relative overflow-hidden no-print">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="mb-16">
                            <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">Resources and tools to help you stay organized</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { type: "Resources", title: "Canadian tax basics", action: "Watch video", icon: PlayCircle, href: "/resources/tax-brackets" },
                                {
                                    type: "Resources",
                                    title: "Free tax prep checklist",
                                    action: "Download checklist",
                                    icon: Download,
                                    onClick: () => {
                                        window.location.href = '/resources/tax-checklist';
                                    }
                                },
                                { type: "Tools", title: "RRSP savings calculator", action: "Use calculator", icon: Calculator, href: "/tools/rrsp-calculator" },
                                {
                                    type: "Tools",
                                    title: "Set a tax deadline reminder",
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
                                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 hover:bg-white hover:text-navy-950 transition-all group h-full flex flex-col cursor-pointer">
                                        <div className="text-[10px] font-black text-blue-400 group-hover:text-blue-600 uppercase tracking-[0.2em] mb-4">{item.type}</div>
                                        <h3 className="text-xl font-black mb-8 tracking-tight">{item.title}</h3>
                                        <div className="mt-auto flex items-center gap-3 text-xs font-black uppercase tracking-widest border-t border-white/10 group-hover:border-navy-950/10 pt-6">
                                            <item.icon size={18} className="text-blue-400 group-hover:text-blue-600" />
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

                {/* FAQ Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-black text-navy-950 tracking-tighter uppercase mb-12 text-center">Frequently asked questions</h2>
                        <div className="space-y-2">
                            <FAQItem
                                question="When are taxes due in Canada?"
                                answer="For most individuals, the deadline to file your personal income tax return and pay any balance owing is April 30th. If you or your spouse/partner are self-employed, the filing deadline is June 15th, but any balance owing must still be paid by April 30th."
                            />
                            <FAQItem
                                question="How long does it take to get a tax refund in Canada?"
                                answer="The CRA generally aims to process digital returns within 2 weeks. Paper returns can take up to 8 weeks. Using NETFILE is the fastest way to get your refund."
                            />
                            <FAQItem
                                question="How do I pay income taxes online?"
                                answer="You can pay online through your financial institution's online banking (using 'CRA' as a payee), through the CRA's My Account portal, or via the CRA MyPayment service."
                            />
                            <FAQItem
                                question="Does everyone need to file an income tax return?"
                                answer="You must file if you owe tax, want to claim a refund, or want to receive benefits like the GST/HST credit or Canada Child Benefit."
                            />
                            <FAQItem
                                question="How long should I keep my income tax records?"
                                answer="In Canada, you should keep your tax records and all supporting documents for a period of six years from the end of the tax year they relate to."
                            />
                        </div>
                    </div>
                </section>

                {/* Mobile App Promotion */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-[#0a0f29] rounded-[4rem] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
                            <div className="max-w-xl relative z-10 text-center lg:text-left">
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-400 border border-white/10 mb-8">
                                    <Smartphone size={14} />
                                    TaxBuddy Mobile App
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight uppercase">
                                    Do your taxes with the TaxBuddy mobile app
                                </h2>
                                <p className="text-lg text-white/60 font-medium leading-relaxed mb-12 capitalize">
                                    Work on your tax return anytime, anywhere. TaxBuddy is available for Apple iOS and Google Android devices.
                                </p>

                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <div className="h-14 px-8 bg-white text-navy-950 rounded-2xl flex items-center gap-3 font-black text-sm uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform">
                                        <div className="w-8 h-8 flex items-center justify-center bg-navy-950 rounded-lg">
                                            <div className="w-4 h-5 border-2 border-white rounded-sm" />
                                        </div>
                                        App Store
                                    </div>
                                    <div className="h-14 px-8 bg-white text-navy-950 rounded-2xl flex items-center gap-3 font-black text-sm uppercase tracking-widest cursor-pointer hover:scale-105 transition-transform">
                                        <div className="w-8 h-8 flex items-center justify-center bg-navy-950 rounded-lg text-[8px] text-white">PLAY</div>
                                        Google Play
                                    </div>
                                </div>
                            </div>

                            <div className="relative group lg:w-[400px]">
                                <div className="absolute inset-0 bg-blue-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-4 p-8 pt-12 shadow-2xl">
                                    <div className="space-y-4">
                                        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right duration-700 delay-150">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                <Zap size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase">CRA Direct</div>
                                                <div className="text-sm font-black text-navy-950">Importing tax slips...</div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right duration-700 delay-300">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-gray-400 uppercase">Expert Review</div>
                                                <div className="text-sm font-black text-navy-950">Taren is reviewing...</div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-2xl p-6 text-center animate-in slide-in-from-right duration-700 delay-500 shadow-xl border-2 border-blue-600/10">
                                            <div className="text-3xl font-black text-navy-950 tracking-tighter mb-1">$3,644</div>
                                            <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Expected Refund</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Provincial Calculators List */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-black text-navy-950 tracking-tight uppercase mb-16">Provincial tax calculators</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                "Alberta", "British Columbia", "Manitoba", "Newfoundland and Labrador",
                                "New Brunswick", "Northwest Territories", "Nova Scotia", "Nunavut",
                                "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"
                            ].map((prov) => (
                                <div key={prov} className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 border border-gray-100 rounded-full text-xs font-black text-navy-950 uppercase tracking-widest hover:bg-white hover:shadow-premium hover:border-blue-600/20 transition-all cursor-pointer group">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[8px] text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">TAX</div>
                                    {prov} tax calculator
                                    <ExternalLink size={12} className="text-navy-900/10 group-hover:text-blue-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
