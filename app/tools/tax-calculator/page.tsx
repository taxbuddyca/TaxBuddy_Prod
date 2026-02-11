
import Navbar from "@/components/Navbar";
import TaxCalculator from "@/components/TaxCalculator";
import { CheckCircle2 } from "lucide-react";

export default function CalculatorPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-navy-900 selection:bg-growth/20">
            <Navbar />

            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-growth/10 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-growth-700">
                        <span className="w-2 h-2 rounded-full bg-growth animate-pulse"></span>
                        Free Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tight leading-tight">
                        Estimate Your <span className="text-growth">2026 Refund</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto">
                        Use our free calculator to see how much money you could get back this tax season. It takes less than a minute.
                    </p>
                </div>

                <TaxCalculator />

                <div className="max-w-3xl mx-auto mt-24">
                    <h2 className="text-2xl font-black text-navy-950 mb-8 text-center">Why file with TaxBuddy?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="font-bold text-navy-950 mb-2">Max Refund Guarantee</h3>
                            <p className="text-sm text-navy-900/60">We find every deduction to ensure you get the most back.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="font-bold text-navy-950 mb-2">Audit Protection</h3>
                            <p className="text-sm text-navy-900/60">We stand by our work. If the CRA asks, we answer.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="font-bold text-navy-950 mb-2">Expert Review</h3>
                            <p className="text-sm text-navy-900/60">Every return is reviewed by a senior tax professional.</p>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
