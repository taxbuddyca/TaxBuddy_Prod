
import Link from "next/link";
import { MoveRight, Mail, FileCheck, HeartHandshake, ArrowRight, MessageSquare } from "lucide-react";

export default function SwitchPage() {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white/80 border-b border-gray-100">
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-growth font-bold text-xs uppercase tracking-widest mb-8 border border-blue-100">
                        <MoveRight size={16} /> Concierge Switching Service
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-navy-950">
                        Breaking Up is Hard. <br />
                        <span className="text-growth">We Make it Easy.</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                        Feel stuck with an accountant who doesn't call you back? We handle the awkward conversations, the file transfers, and the setup. You just sign.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="bg-growth text-navy-950 px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all shadow-lg shadow-growth/20 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                            Start Your Switch <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* The "Why Switch" Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-black text-navy-950 mb-6">Signs It's Time to Move On</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            "You only hear from them once a year.",
                            "They use paper, binders, or ancient portals.",
                            "You found errors in your last return.",
                            "They don't understand your digital business.",
                            "You're afraid to ask questions due to hourly billing.",
                            "They speak 'Accounting-ese', not English."
                        ].map((pain, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 flex items-start gap-4 hover:bg-white hover:shadow-xl transition-all">
                                <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 font-bold">!</div>
                                <p className="text-navy-900 font-medium leading-relaxed">{pain}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Handle It */}
            <section className="py-24 bg-blue-50/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black text-navy-950 mb-16 text-center tracking-tighter">The "No Awkwardness" Process</h2>

                        <div className="space-y-12 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gray-200 hidden md:block" />

                            <div className="flex flex-col md:flex-row gap-8 relative">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-growth shrink-0 font-black text-xl z-10">1</div>
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-1">
                                    <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center text-growth mb-6">
                                        <MessageSquare size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-navy-950 mb-3">We Break the News</h3>
                                    <p className="text-navy-900/60 leading-relaxed">
                                        You don't have to call them. We draft a professional "Courtesy Letter" informing your previous accountant that you're moving to TaxBuddy. You just sign it digitally.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 relative">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-growth shrink-0 font-black text-xl z-10">2</div>
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-1">
                                    <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center text-growth mb-6">
                                        <FileCheck size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-navy-950 mb-3">We Transfer the Files</h3>
                                    <p className="text-navy-900/60 leading-relaxed">
                                        We coordinate directly with your old firm to get your historical tax returns, trial balances, and access codes. We handle the admin headache.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 relative">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-growth shrink-0 font-black text-xl z-10">3</div>
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex-1">
                                    <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center text-growth mb-6">
                                        <HeartHandshake size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-navy-950 mb-3">Fresh Start Onboarding</h3>
                                    <p className="text-navy-900/60 leading-relaxed">
                                        We review your past returns for missed opportunities (the "Second Look") and set you up on our modern, paperless platform.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guarantee */}
            <section className="py-24 bg-navy-950 text-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-block p-4 rounded-full bg-white/10 mb-8 backdrop-blur-md">
                        <Mail size={48} className="text-growth" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">We'll Even Write the Email.</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Ready to switch? Book a call and we'll have the transfer papers ready for you to sign before we hang up.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-growth text-navy-950 px-12 py-6 rounded-2xl text-xl font-black hover:scale-105 transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                        Book Your Switch Call <ArrowRight size={24} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
