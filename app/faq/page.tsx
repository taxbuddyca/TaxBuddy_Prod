"use client";

import FAQAccordion from "@/components/FAQAccordion";
import { Send } from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";

export default function FAQPage() {
    return (
        <main className="min-h-screen pt-32 selection:bg-growth selection:text-white">
            <PageBackground />
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-6 block font-bold">Knowledge Base</span>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.95]">
                            Frequently <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">Answered.</span>
                        </h1>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            Everything you need to know about switching to a modern, virtual-first accounting partner.
                        </p>
                    </div>

                    <FAQAccordion />

                    <div className="mt-40 bg-gray-50 rounded-[3rem] p-16 text-center border border-gray-100 hover-flash">
                        <h3 className="text-3xl font-black text-navy-950 mb-6">Still have questions?</h3>
                        <p className="text-navy-900/40 text-base font-medium mb-12 max-w-xl mx-auto italic">
                            Our team is available for deep-dive calls to discuss your specific business structure and tax needs.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 bg-navy-950 text-white px-10 py-5 rounded-2xl font-black hover:bg-navy-900 hover:scale-105 transition-all text-lg shadow-xl"
                        >
                            Contact Support <Send size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
