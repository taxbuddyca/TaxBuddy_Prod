"use client";

import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Info, Calculator, Target, TrendingUp, Landmark } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

const getContent = (slug: string) => {
    switch (slug) {
        case 'tax-checklist':
            return {
                title: "19 Popular Canadian Tax Deductions & Credits",
                subtitle: "Maximize your refund with this comprehensive guide to deductions and credits recognized by the CRA.",
                intro: "The Canada Revenue Agency (CRA) recognizes over 400 tax deductions and credits. Knowing which ones apply to you can significantly reduce your tax bill or increase your refund. Tax deductions lower your taxable income, while tax credits directly reduce the amount of tax you owe.",
                sections: [
                    {
                        title: "Key Refundable Credits",
                        content: "Refundable credits can result in a payment even if you owe no tax.",
                        items: [
                            "GST/HST Credit: Offsets sales tax for low to modest-income Canadians.",
                            "Canada Workers Benefit (CWB): Supplements income for low-income workers.",
                            "Canada Child Benefit (CCB): Tax-free monthly payment for raising children."
                        ]
                    },
                    {
                        title: "Common Non-Refundable Credits",
                        content: "These reduce your tax payable to zero but do not result in a refund of the excess.",
                        items: [
                            "Basic Personal Amount: Every Canadian can claim this to reduce their taxable income.",
                            "Tuition Tax Credit: For eligible post-secondary education fees.",
                            "Medical Expenses: For costs exceeding 3% of your net income.",
                            "Home Buyers' Amount (HBA): Up to $1,500 for first-time home buyers."
                        ]
                    },
                    {
                        title: "Essential Deductions",
                        content: "Deductions lower the total income you are taxed on.",
                        items: [
                            "RRSP Contributions: Directly reduce your taxable income.",
                            "Child Care Expenses: For costs incurred to work or study.",
                            "Moving Expenses: If you moved at least 40km closer to work or school.",
                            "First Home Savings Account (FHSA): Tax-free savings for your first home."
                        ]
                    }
                ],
                cta: "Ready to claim your credits?",
                icon: FileText
            };
        case 'rrsp-limits':
            return {
                title: "Understanding RRSP Contribution Limits",
                subtitle: "A beginner's guide to how contribution room is generated, calculated, and carried forward.",
                intro: "Your RRSP contribution limit (or 'room') is the maximum amount you can put into your Registered Retirement Savings Plan each year. This is one of the most powerful tax-saving tools in Canada, as every cent contributed is tax-deductible.",
                sections: [
                    {
                        title: "How Room is Generated",
                        content: "New room is created based on your earned income from the previous year.",
                        items: [
                            "Calculation: 18% of your earned income from the previous year.",
                            "Annual Cap: For 2025, the maximum new room is $32,490.",
                            "Pension Adjustment: Box 52 on your T4 reduces your available room."
                        ]
                    },
                    {
                        title: "Tracking Your Room",
                        content: "The CRA tracks your limit exactly, so you don't have to guess.",
                        items: [
                            "Notice of Assessment (NOA): Your limit is printed here every year.",
                            "CRA My Account: The most up-to-date source for your contribution room.",
                            "Carry Forward: Unused room from previous years rolls over indefinitely."
                        ]
                    },
                    {
                        title: "Over-contribution Rules",
                        content: "Contributing too much can lead to penalties.",
                        items: [
                            "Lifetime Buffer: You have a $2,000 accidental over-contribution grace amount.",
                            "1% Penalty: Any amount above the buffer is taxed at 1% per month.",
                            "Deduction Timing: You can contribute now but save the deduction for a higher-income year."
                        ]
                    }
                ],
                cta: "Optimize your RRSP strategy",
                icon: Target
            };
        case 'dividend-tax':
            return {
                title: "How Dividends are Taxed in Canada",
                subtitle: "Decode the technical process of dividend 'gross-up' and tax credits.",
                intro: "Dividends are taxed differently than employment income or interest. Because corporations have already paid tax on their profits, the Canadian tax system uses a 'gross-up' and 'dividend tax credit' mechanism to avoid double taxation on the same income.",
                sections: [
                    {
                        title: "Eligible vs. Non-Eligible",
                        content: "The type of dividend determines the tax rate and credit you receive.",
                        items: [
                            "Eligible Dividends: From corporations taxed at the general rate. 38% gross-up.",
                            "Non-Eligible Dividends: From small businesses taxed at a lower rate. 15% gross-up.",
                            "Foreign Dividends: Taxed as regular interest; no dividend tax credit applies."
                        ]
                    },
                    {
                        title: "The Gross-up & Credit Mechanism",
                        content: "How your dividend payment is processed on your tax return.",
                        items: [
                            "Gross-up: Your actual payment is increased to represent pre-tax corporate profit.",
                            "Tax Calculation: You pay tax on this larger, grossed-up amount.",
                            "Tax Credit: You subtract a percentage to account for the tax the company already paid."
                        ]
                    },
                    {
                        title: "Tax Efficiency",
                        content: "Dividends are generally more tax-efficient than interest.",
                        items: [
                            "Lower Effective Rate: Usually lower than employment income tax rates.",
                            "Capital Gains Comparison: Dividends are often taxed higher than capital gains.",
                            "Investment Income: Ideal for non-registered investment accounts."
                        ]
                    }
                ],
                cta: "Plan your investment income",
                icon: TrendingUp
            };
        case 'tax-withholding':
            return {
                title: "Incme Tax Withholding: Paycheque Basics",
                subtitle: "Why your 'take-home pay' is lower than your salary and how to adjust it.",
                intro: "When you receive a paycheque, your employer acts as an agent for the CRA, withholding taxes, CPP, and EI premiums. This ensures that the government receives tax revenue throughout the year, rather than just in April.",
                sections: [
                    {
                        title: "Payroll Deductions",
                        content: "The three primary items removed from every Canadian paycheque.",
                        items: [
                            "Income Tax: Based on federal and provincial tax brackets.",
                            "CPP Contributions: Canada Pension Plan (CPP1 and CPP2 in 2025).",
                            "EI Premiums: Employment Insurance for future benefits."
                        ]
                    },
                    {
                        title: "The TD1 Form",
                        content: "This form tells your employer how much tax to withhold.",
                        items: [
                            "Personal Tax Credits: Claiming the basic amount or tuition.",
                            "Adjusting Amounts: You can ask for more tax to be taken off.",
                            "Multiple Jobs: Ensure only one employer claims the basic personal amount."
                        ]
                    },
                    {
                        title: "Customizing Withholding",
                        content: "You can change how much tax is taken off under specific conditions.",
                        items: [
                            "Form T1213: Request a reduction if you have large RRSP or childcare deductions.",
                            "Refund vs. Balance: Withholding aim is to have a zero balance owing in April.",
                            "T4 Box 22: Shows the total income tax withheld for the year."
                        ]
                    }
                ],
                cta: "Check your payroll setup",
                icon: Landmark
            };
        case 'tax-brackets':
            return {
                title: "2025 Federal and Provincial Tax Brackets",
                subtitle: "A complete reference for Canada's progressive tax rates.",
                intro: "Canada uses a progressive tax system, meaning your income is divided into segments, each taxed at a different rate. Your 'marginal tax rate' is the percentage you pay on your last dollar of earned income.",
                sections: [
                    {
                        title: "The 2025 Federal Brackets",
                        content: "These apply to all Canadians outside of Quebec (who have separate provincial rates).",
                        items: [
                            "14.5% on the first $57,375",
                            "20.5% on the next portion up to $114,750",
                            "26% on the next portion up to $177,882",
                            "29% on the next portion up to $253,414",
                            "33% on any taxable income over $253,414"
                        ]
                    },
                    {
                        title: "Provincial Tax Ranges",
                        content: "Your total tax rate is your federal rate plus your provincial rate.",
                        items: [
                            "Ontario: Brackets range from 5.05% to 13.16%.",
                            "British Columbia: Brackets range from 5.06% to 20.5%.",
                            "Alberta: Flat-ish tax with brackets from 10% to 15%.",
                            "Quebec: Highest provincial rates, ranging from 14% to 25.75%."
                        ]
                    },
                    {
                        title: "Marginal vs. Average Rate",
                        content: "Understanding the difference is key to tax planning.",
                        items: [
                            "Marginal Rate: The rate on your next dollar of income.",
                            "Average Rate: Your total tax divided by your total income.",
                            "Tax Planning: Only the marginal rate impacts decisions like RRSP contributions."
                        ]
                    }
                ],
                cta: "Estimate your 2025 taxes",
                icon: Calculator
            };
        default:
            return { title: "Tax Resource", subtitle: "Resource content loading...", intro: "Resource content loading...", sections: [], cta: "Contact us", icon: Info };
    }
};
export default function ResourcesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);

    const data = getContent(slug);
    const Icon = data.icon;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white text-navy-950 font-sans selection:bg-blue-600/10 print:bg-white">
            <style jsx global>{`
                @media print {
                    .no-print, nav, header, footer, [role="navigation"] { 
                        display: none !important; 
                        visibility: hidden !important;
                        height: 0 !important;
                        overflow: hidden !important;
                    }
                    main { 
                        padding-top: 0 !important; 
                        margin-top: 0 !important;
                        position: relative !important;
                    }
                    .print-only { display: block !important; }
                    .shadow-sm, .shadow-premium { box-shadow: none !important; border: none !important; }
                    .bg-gray-50 { background: white !important; border: 1px solid #eee !important; }
                    body { color: black !important; background: white !important; }
                    .max-w-7xl { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
                }
            `}</style>
            <main className="pt-32 pb-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header Section */}
                    <div className="max-w-3xl mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-blue-600 border border-blue-100 shadow-sm no-print">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            TaxBuddy Knowledge Base
                        </div>

                        {/* Print Only Header */}
                        <div className="hidden print:block mb-10 border-b-2 border-navy-950 pb-6">
                            <div className="text-2xl font-black text-navy-950 mb-1 tracking-tighter uppercase">TaxBuddy Canada</div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Tax Preparation Checklist • 2025</div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tight leading-tight uppercase">
                            {data.title}
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/60 font-bold leading-relaxed mb-8">
                            {data.subtitle}
                        </p>

                        {slug === 'tax-checklist' && (
                            <button
                                onClick={handlePrint}
                                className="no-print inline-flex items-center gap-3 px-8 py-4 bg-navy-950 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-premium focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                            >
                                <FileText size={18} className="text-blue-400" />
                                Download PDF Checklist
                            </button>
                        )}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-16 items-start">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="p-8 md:p-12 bg-gray-50 rounded-[3rem] border border-gray-100">
                                <p className="text-lg text-navy-900/60 font-bold leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-navy-950 first-letter:mr-3 first-letter:float-left">
                                    {data.intro}
                                </p>
                            </div>

                            <div className="space-y-16">
                                {data.sections.map((section, idx) => (
                                    <div key={idx} className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">{idx + 1}</div>
                                        <h2 className="text-2xl font-black text-navy-950 mb-4 tracking-tight uppercase">{section.title}</h2>
                                        <p className="text-navy-900/40 font-bold mb-8 leading-relaxed">{section.content}</p>
                                        <div className="grid md:grid-cols-1 gap-4">
                                            {section.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-600/20 transition-all shadow-sm group">
                                                    <CheckCircle2 className="text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" size={20} />
                                                    <span className="text-navy-950 font-black text-sm">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6 sticky top-32 no-print">
                            <div className="bg-navy-950 text-white rounded-[3rem] p-10 relative overflow-hidden group shadow-premium">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                                        <Icon size={24} className="text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight uppercase leading-tight">{data.cta}</h3>
                                    <p className="text-white/40 font-bold mb-8 leading-relaxed">
                                        Don't let tax complexity hold you back. Let our CPAs maximize your benefits.
                                    </p>
                                    <Link href="/contact" className="inline-flex h-14 px-8 bg-blue-600 text-white rounded-2xl font-black items-center justify-center gap-3 hover:scale-105 transition-all w-full shadow-lg focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                        Book a Free Consultation <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-[3rem] p-8 border border-gray-100">
                                <h4 className="text-xs font-black text-navy-950 uppercase tracking-widest mb-6 border-b border-navy-950/10 pb-4 flex items-center gap-2">
                                    <ShieldCheck className="text-emerald-600" size={16} /> Certified Knowledge
                                </h4>
                                <p className="text-[10px] text-navy-900/40 font-bold leading-relaxed mb-6">
                                    All TaxBuddy resources are reviewed by Canadian Chartered Professional Accountants to ensure accuracy with current CRA regulations.
                                </p>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                                    ))}
                                    <div className="flex-1 text-[10px] font-black text-navy-950 ml-6 flex items-center">
                                        Join 1,000+ happy clients
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Link href="/tools/tax-calculator" className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-600 transition-all font-black text-xs uppercase tracking-tight text-navy-950 group focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    Income Tax Calculator <ArrowRight size={14} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/tools/rrsp-calculator" className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-600 transition-all font-black text-xs uppercase tracking-tight text-navy-950 group focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    RRSP Savings Tool <ArrowRight size={14} className="text-emerald-600 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
