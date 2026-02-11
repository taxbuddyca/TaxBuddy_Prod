
import Link from "next/link";
import { Shield, Lock, Scale, FileText, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";

export default function AuditProtectionPage() {
    return (
        <main className="pt-24">
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-white/80 border-b border-gray-100">
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-bold text-xs uppercase tracking-widest mb-8 border border-blue-100">
                        <Shield size={16} /> Premium Protection Plan
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-navy-950">
                        Never Talk to the <br />
                        <span className="text-blue-600">CRA Again.</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 mb-10 leading-relaxed font-medium max-w-2xl mx-auto">
                        Audits are stressful, time-consuming, and expensive. With our Audit Protection Service, we handle everything. You sleep soundly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact" className="bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                            Add Protection for $99/yr <ArrowRight size={20} />
                        </Link>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-8 text-navy-900/40 text-sm font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-growth" /> 100% Representation
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-growth" /> Legal Defense
                        </div>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-navy-950 rounded-[3rem] rotate-3 opacity-5" />
                            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 relative">
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-8">
                                    <AlertTriangle size={32} />
                                </div>
                                <h3 className="text-3xl font-black text-navy-950 mb-6">The "Review Letter" Panic</h3>
                                <p className="text-navy-900/60 text-lg leading-relaxed mb-6">
                                    It starts with a brown envelope. The CRA wants to see your receipts for moving expenses, medical costs, or childcare. Even if you did everything right, proving it is a nightmare.
                                </p>
                                <p className="text-navy-900/60 text-lg leading-relaxed">
                                    Without protection, you face hours of hold times, confusing portals, and the risk of having your refund denied.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-navy-950 mb-8 tracking-tighter">We Become Your <span className="text-blue-600">Shield.</span></h2>
                            <p className="text-lg text-navy-900/70 mb-8 leading-relaxed">
                                When you subscribe to Audit Protection, we become your authorized legal representative with the CRA. They call us, not you. They write to us, not you.
                            </p>
                            <ul className="space-y-6">
                                {[
                                    { title: "Correspondence Management", desc: "We draft and send all professional replies to CRA inquiries." },
                                    { title: "In-Person Representation", desc: "If a meeting is required, we go. You stay home." },
                                    { title: "Penalty Negotiation", desc: "We fight to abate penalties and reduce interest if errors occur." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 mt-1">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-navy-950 text-lg">{item.title}</h4>
                                            <p className="text-navy-900/60">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-black text-navy-950 mb-6">Complete Peace of Mind</h2>
                        <p className="text-navy-900/60 text-lg">For less than the cost of one hour with a lawyer, you get year-round protection.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: FileText, title: "Review Letter Response", desc: "Simple requests for receipts? We gather, organize, and submit them for you." },
                            { icon: Scale, title: "Audit Defense", desc: "Full-scale audits involving aggressive reassessments? We fight tooth and nail." },
                            { icon: Lock, title: "Identity Theft Help", desc: "If your CRA account is compromised, we help restore your secure access." }
                        ].map((feat, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                                    <feat.icon size={32} />
                                </div>
                                <h3 className="text-xl font-black text-navy-950 mb-4">{feat.title}</h3>
                                <p className="text-navy-900/60 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - Blue Theme */}
            <section className="py-24 bg-blue-600 text-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-block p-4 rounded-full bg-white/10 mb-8 backdrop-blur-md">
                        <Shield size={48} className="text-white" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Protect Your Refund Today.</h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Don't let a brown envelope ruin your summer. Add Audit Protection to your tax package for just $99/year.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 px-12 py-6 rounded-2xl text-xl font-black hover:scale-105 transition-all shadow-xl">
                        Get Protected <ArrowRight size={24} />
                    </Link>
                    <p className="mt-8 text-sm text-white/40 font-bold uppercase tracking-widest">
                        Available for Personal & Corporate Returns
                    </p>
                </div>
            </section>
        </main>
    );
}
