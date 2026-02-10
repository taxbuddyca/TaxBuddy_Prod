"use client";

import GlassCard from "@/components/GlassCard";
import { Send, FileText, ShieldCheck, Scale, Globe } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen pt-40 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-24">
                            <span className="text-growth font-black uppercase tracking-[0.3em] text-sm mb-6 block">Legal Portfolio</span>
                            <h1 className="text-6xl md:text-8xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.9]">
                                Privacy <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-teal-500 text-glow">Policy.</span>
                            </h1>
                            <p className="text-navy-900/40 font-medium">Last Updated: February 10, 2026</p>
                        </div>

                        <div className="space-y-12">
                            {[
                                {
                                    icon: <Globe size={20} />,
                                    title: "1. Data Collection & Purpose",
                                    content: "We collect information necessary to provide professional tax and accounting services in Canada. This includes personal identification (SIN, addresses), financial records (T-slips, expense reports), and business documentation. This data is used exclusively to fulfill our professional engagements and comply with CRA requirements."
                                },
                                {
                                    icon: <ShieldCheck size={20} />,
                                    title: "2. Sovereignty & Security",
                                    content: "All client data is encrypted using AES-256 standards during transit and at rest. We adhere strictly to PIPEDA regulations. Unlike global firms, your data is stored on secure servers with Canadian data residency, ensuring it never leaves our legal jurisdiction without your explicit consent."
                                },
                                {
                                    icon: <Scale size={20} />,
                                    title: "3. Professional Disclosure",
                                    content: "TaxBuddy does not sell, trade, or rent your personal information. Information is only disclosed to the Canada Revenue Agency (CRA) or provincial tax authorities as required by law. Third-party software partners (e.g., Xero, Wagepoint) only receive data necessary to facilitate your business operations."
                                }
                            ].map((section, i) => (
                                <GlassCard key={i} className="p-12" intensity="light">
                                    <div className="flex items-start gap-8">
                                        <div className="p-4 bg-gray-50 rounded-2xl text-growth flex-shrink-0">
                                            {section.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-navy-950 mb-6">{section.title}</h3>
                                            <p className="text-navy-900/60 text-lg leading-relaxed font-medium">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>

                        <div className="mt-32 p-12 bg-navy-950 rounded-[3rem] text-center border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-growth/20 rounded-full blur-[100px]" />
                            <h3 className="text-3xl font-black text-white mb-6 relative z-10">Have questions about your data?</h3>
                            <p className="text-white/40 mb-10 relative z-10">Our Chief Privacy Officer is available to discuss our data residency and security protocols.</p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-growth text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all relative z-10"
                            >
                                Contact Privacy Officer <Send size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
