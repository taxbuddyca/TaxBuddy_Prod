"use client";

import PricingTable from "@/components/PricingTable";

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden bg-blue-50/50">
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Simple & Fair</span>
                        <h1 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tighter mb-8">Transparent Pricing.</h1>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            No hidden fees. No hourly billing. Just a predictable monthly subscription for your entire finance team.
                        </p>
                    </div>
                    <PricingTable />
                </div>
            </section>
        </main>
    );
}
