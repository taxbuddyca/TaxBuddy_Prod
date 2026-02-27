
import Navbar from "@/components/Navbar";
import { ShieldCheck, ArrowRight, Zap, Target, Calculator, FileText, Bookmark, Share2, Info, Landmark } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "CRA Tax Loopholes 2026: Maximize Your Canadian Tax Refund | TaxBuddy",
    description: "Discover legal CRA tax loopholes and strategies to maximize your 2026 tax return. Learn about secret deductions, RRSP tricks, and business expense hacks.",
    keywords: ["CRA tax loopholes", "maximize tax refund Canada", "Canadian tax savings", "legal tax avoidance Canada", "Halifax tax planning"]
};

export default function LoopholesPage() {
    return (
        <>
            <main className="pt-32 pb-24 selection:bg-growth selection:text-navy-950">
                {/* Hero Section */}
                <section className="container mx-auto px-6 mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-growth/10 rounded-full text-[10px] font-black uppercase tracking-widest text-growth mb-6 border border-growth/20">
                        <Zap size={12} /> Insider Strategy Guide
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-navy-950 mb-8 tracking-tighter leading-[1.05]">
                        Legal <span className="text-growth">CRA Loopholes</span> to <br className="hidden md:block" />
                        Maximize Your 2026 Refund
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto leading-relaxed">
                        Don't leave money on the table. Our CPAs have identified the most effective legal strategies to reduce your taxable income and maximize your Canadian tax benefits.
                    </p>
                </section>

                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {/* Strategy 1 */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-premium hover:shadow-2xl transition-all group">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Landmark size={24} />
                            </div>
                            <h3 className="text-xl font-black text-navy-950 mb-4 tracking-tight">The RRSP Multiplier</h3>
                            <p className="text-navy-900/60 text-sm leading-relaxed mb-6">
                                Reinvesting your RRSP refund back into your RRSP creates a compounding tax shield that the CRA can't touch.
                            </p>
                            <Link href="/tools/rrsp-calculator" className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                Calculate Savings <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Strategy 2 */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-premium hover:shadow-2xl transition-all group">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                                <Target size={24} />
                            </div>
                            <h3 className="text-xl font-black text-navy-950 mb-4 tracking-tight">FHSA Double-Dip</h3>
                            <p className="text-navy-900/60 text-sm leading-relaxed mb-6">
                                The First Home Savings Account is the ultimate "loophole"—it's tax-deductible to go in, and tax-free to come out.
                            </p>
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                                High Impact Strategy
                            </span>
                        </div>

                        {/* Strategy 3 */}
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-premium hover:shadow-2xl transition-all group">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                                <FileText size={24} />
                            </div>
                            <h3 className="text-xl font-black text-navy-950 mb-4 tracking-tight">Home Office Hacks</h3>
                            <p className="text-navy-900/60 text-sm leading-relaxed mb-6">
                                Learn how to property claim square footage and utilities to significantly lower your personal tax burden.
                            </p>
                            <span className="text-xs font-black uppercase tracking-widest text-purple-600 flex items-center gap-2">
                                For Remote Workers
                            </span>
                        </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="prose prose-navy max-w-none bg-gray-50/50 p-8 md:p-16 rounded-[3rem] border border-gray-100 mb-20">
                        <h2 className="text-3xl font-black text-navy-950 mb-8 tracking-tight">Top 5 "Secret" Deductions Most Canadians Miss</h2>
                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="hidden sm:flex w-10 h-10 rounded-full bg-navy-950 text-white items-center justify-center font-black shrink-0">1</div>
                                <div>
                                    <h4 className="text-xl font-black text-navy-950 mb-2">Medical Travel Expenses</h4>
                                    <p className="text-navy-900/70 leading-relaxed">If you have to travel at least 40km to get medical services not available in your community, you can claim the cost of travel. Over 80km? You can claim meals and accommodation too.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="hidden sm:flex w-10 h-10 rounded-full bg-navy-950 text-white items-center justify-center font-black shrink-0">2</div>
                                <div>
                                    <h4 className="text-xl font-black text-navy-950 mb-2">Moving for Work/School</h4>
                                    <p className="text-navy-900/70 leading-relaxed">If you moved at least 40km closer to a new job or to study full-time at a post-secondary institution, you can deduct huge moving expenses—including the cost of selling your old home.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="hidden sm:flex w-10 h-10 rounded-full bg-navy-950 text-white items-center justify-center font-black shrink-0">3</div>
                                <div>
                                    <h4 className="text-xl font-black text-navy-950 mb-2">Digital News Subscription</h4>
                                    <p className="text-navy-900/70 leading-relaxed">Supporting journalism? You can claim a non-refundable tax credit for expenses paid for news subscriptions from qualified Canadian journalism organizations.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Halifax Specific CTA */}
                    <div className="bg-navy-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden text-center mb-20">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-growth/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to maximize your return in <span className="text-growth">Halifax</span>?</h2>
                            <p className="text-lg text-white/60 mb-10 leading-relaxed">
                                Our virtual CPAs serve clients across Nova Scotia and all of Canada. Use our modern online filing system to get the expert results you deserve without leaving your home.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/contact" className="bg-growth text-navy-950 px-8 py-4 rounded-xl font-black hover:scale-105 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    Start Your 2026 Return <ArrowRight size={18} />
                                </Link>
                                <Link href="/tools/tax-calculator" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-black hover:bg-white/20 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    Estimate My Refund <Calculator size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Mini */}
                    <div className="max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl font-black text-navy-950 mb-10 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                <h4 className="font-bold text-navy-950 mb-2 flex items-center gap-2">
                                    <Info size={16} className="text-blue-500" /> Are these loopholes legal?
                                </h4>
                                <p className="text-sm text-navy-900/60">Yes. At TaxBuddy, we perform "tax avoidance," which is the legal arrangement of your affairs to minimize tax. We never engage in "tax evasion," which is illegal.</p>
                            </div>
                            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                <h4 className="font-bold text-navy-950 mb-2 flex items-center gap-2">
                                    <Info size={16} className="text-blue-500" /> Can virtual accountants EFILE?
                                </h4>
                                <p className="text-sm text-navy-900/60">Absolutely. We are authorized CRA EFILE providers. We can file your taxes securely from Halifax to any province in Canada using our encrypted portal.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
