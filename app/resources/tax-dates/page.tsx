
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, AlertCircle } from "lucide-react";

export const metadata = {
    title: "Important Tax Dates Canada 2026 | TaxBuddy",
    description: "Key deadlines for personal tax returns, RRSP contributions, and benefit payments in Canada for 2026."
};

export default function TaxDatesPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-growth selection:text-white">
            <Navbar />

            <main className="pt-32 pb-24">
                {/* Header */}
                <section className="container mx-auto px-6 mb-16 text-center">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[9px] mb-4 block">Mark Your Calendars</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                        Important <span className="text-growth">Tax Dates</span> 2026
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto">
                        Don't get penalized. Keep track of these critical filing deadlines and payment dates.
                    </p>
                </section>

                <div className="container mx-auto px-6 max-w-4xl space-y-8">

                    {/* Key Deadlines - Highlighted */}
                    <div className="bg-navy-950 text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-growth/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                                <Calendar className="text-growth" /> Key Filing Deadlines
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <div className="text-growth font-black text-4xl mb-2">Apr 30</div>
                                    <h3 className="font-bold text-xl mb-2">Personal Tax Deadline</h3>
                                    <p className="text-white/60 text-sm">Last day to file 2025 income tax and pay any balance owed to avoid interest.</p>
                                </div>
                                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <div className="text-growth font-black text-4xl mb-2">Jun 16</div>
                                    <h3 className="font-bold text-xl mb-2">Self-Employed Filing</h3>
                                    <p className="text-white/60 text-sm">Filing deadline for self-employed individuals (taxes owed still due Apr 30).</p>
                                </div>
                                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <div className="text-growth font-black text-4xl mb-2">Mar 02</div>
                                    <h3 className="font-bold text-xl mb-2">RRSP Contribution</h3>
                                    <p className="text-white/60 text-sm">Deadline to contribute to your RRSP for the 2025 tax year deduction.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Benefit Dates */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-black text-navy-950 mb-8">Benefit Payment Dates</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-navy-950 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" /> Canada Child Benefit (CCB)
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {["Jan 20", "Feb 20", "Mar 20", "Apr 20", "May 20", "Jun 19", "Jul 20", "Aug 20", "Sep 18", "Oct 20", "Nov 20", "Dec 11"].map((date, i) => (
                                        <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-center font-medium text-navy-900/70 border border-gray-100">
                                            {date}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-gray-100" />

                            <div>
                                <h3 className="text-xl font-bold text-navy-950 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" /> GST/HST Credit
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {["Jan 5", "Apr 2", "Jul 3", "Oct 5"].map((date, i) => (
                                        <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-center font-medium text-navy-900/70 border border-gray-100">
                                            {date}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-px bg-gray-100" />

                            <div>
                                <h3 className="text-xl font-bold text-navy-950 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full" /> Canada Carbon Rebate (CCR)
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {["Jan 15", "Apr 15", "Jul 15", "Oct 15"].map((date, i) => (
                                        <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-center font-medium text-navy-900/70 border border-gray-100">
                                            {date}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-6 flex items-start gap-4 border border-blue-100">
                        <AlertCircle className="text-blue-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-navy-950 mb-2">Note on Capital Gains</h4>
                            <p className="text-sm text-navy-900/70 leading-relaxed">
                                The capital gains inclusion rate change has a new effective date of January 1, 2026.
                                Impacted filers may have extended deadlines to June 2, 2025 (T1) or May 1, 2025 (T3).
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
