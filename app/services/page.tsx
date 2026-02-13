"use client";

import { Suspense } from "react";
import ServiceTabs from "@/components/ServiceTabs";
import ExpertiseGrid from "@/components/ExpertiseGrid";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";


export default function ServicesPage() {
    return (
        <main className="min-h-screen pt-32 selection:bg-growth selection:text-white relative">
            <PageBackground />
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tight mb-8">Full-Service Financial Management.</h2>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            Choose the level of support your business needs. We act as your entire finance department, seamlessly integrated with your existing tech.
                        </p>
                    </div>

                    <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-4 border-growth border-t-transparent rounded-full animate-spin"></div></div>}>
                        <ServiceTabs />
                    </Suspense>
                    {/* Why Choose TaxBuddy - Replaced Tech Ecosystem */}
                    <div className="mt-40">
                        <div className="text-center mb-16 flashy-reveal">
                            <h3 className="text-3xl font-black text-navy-950 mb-4 tracking-tight">Why Choose TaxBuddy?</h3>
                            <p className="text-navy-900/40 text-sm font-medium italic">Modern accounting designed for Canadian businesses</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-6 group-hover:scale-110 transition-transform">
                                    <span className="font-black text-xl">01.</span>
                                </div>
                                <h4 className="text-xl font-black text-navy-950 mb-3">Expert-Led, Always.</h4>
                                <p className="text-navy-900/70 font-medium leading-relaxed">
                                    No bots or offshore call centers. You get a dedicated Canadian CPA team that understands your local tax laws.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-6 group-hover:scale-110 transition-transform">
                                    <span className="font-black text-xl">02.</span>
                                </div>
                                <h4 className="text-xl font-black text-navy-950 mb-3">Proactive Planning.</h4>
                                <p className="text-navy-900/70 font-medium leading-relaxed">
                                    We don't just file taxes; we plan them. Our year-round advisory helps you keep more of what you earn.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-growth mb-6 group-hover:scale-110 transition-transform">
                                    <span className="font-black text-xl">03.</span>
                                </div>
                                <h4 className="text-xl font-black text-navy-950 mb-3">Secure & Paperless.</h4>
                                <p className="text-navy-900/70 font-medium leading-relaxed">
                                    Upload documents securely from your phone. Bank-level encryption keeps your financial data safe.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-40 mb-16 flashy-reveal">
                        <h3 className="text-3xl font-black text-navy-950 mb-4 tracking-tight">Deep Industry Expertise</h3>
                        <p className="text-navy-900/40 text-sm font-medium italic">Specialized knowledge across Canada's most dynamic sectors</p>
                    </div>
                    <ExpertiseGrid />

                    {/* Final CTA */}
                    <div className="mt-40 bg-navy-950 rounded-[3rem] p-16 lg:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-growth/10 via-transparent to-transparent" />
                        <h3 className="text-4xl lg:text-5xl font-black text-white mb-8 relative z-10 tracking-tighter">Ready to upgrade your <br />back-office?</h3>
                        <p className="text-white/40 text-lg font-medium mb-12 relative z-10 max-w-2xl mx-auto">
                            Stop worrying about bookkeeping and start focusing on growth. Our pods are ready to integrate.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                            <Link href="/contact" className="bg-growth text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all text-lg shadow-lg shadow-growth/20">
                                Talk to Advisor
                            </Link>
                            <Link href="/pricing" className="bg-white/10 text-white px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-lg border border-white/10">
                                View Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
