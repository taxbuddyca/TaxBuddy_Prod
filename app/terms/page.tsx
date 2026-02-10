import GlassCard from "@/components/GlassCard";

export default function TermsOfService() {
    return (
        <main className="min-h-screen pt-40 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-24">
                            <span className="text-growth font-black uppercase tracking-[0.3em] text-sm mb-6 block">Legal Portfolio</span>
                            <h1 className="text-6xl md:text-8xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.9]">
                                Terms of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-teal-500 text-glow">Service.</span>
                            </h1>
                            <p className="text-navy-900/40 font-medium">Last Updated: February 10, 2026</p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { title: "1. Professional Engagement", content: "By utilizing the TaxBuddy platform, you are engaging a professional CPA firm governed by provincial regulatory bodies. You agree to provide timely, accurate, and complete financial data necessary for professional engagement." },
                                { title: "2. Subscription & Billing", content: "All recurring services are billed monthly via the established buddy-portal. Cancellations require 30 days notice to ensure proper transition of accounting files and final CRA filings." },
                                { title: "3. Professional Liability", content: "Our team provides strategic advice based on current Canadian Income Tax laws. Final responsibility for the accuracy of self-reported data rests with the taxpayer." }
                            ].map((section, i) => (
                                <GlassCard key={i} className="p-12" intensity="light">
                                    <h2 className="text-2xl font-black text-navy-950 mb-6">{section.title}</h2>
                                    <p className="text-navy-900/60 text-lg leading-relaxed font-medium">
                                        {section.content}
                                    </p>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
