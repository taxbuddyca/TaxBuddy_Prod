import GlassCard from "@/components/GlassCard";

export default function CookiePolicy() {
    return (
        <main className="min-h-screen pt-40 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-24">
                            <span className="text-growth font-black uppercase tracking-[0.3em] text-sm mb-6 block">Legal Portfolio</span>
                            <h1 className="text-6xl md:text-8xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.9]">
                                Cookie <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-teal-500 text-glow">Policy.</span>
                            </h1>
                            <p className="text-navy-900/40 font-medium">Last Updated: February 10, 2026</p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { title: "1. What are Cookies?", content: "Cookies are essential encrypted data keys stored in your browser to maintain secure sessions between our Cloud Portal and your endpoint. They ensure your financial data remains private during active advisory sessions." },
                                { title: "2. Strategic Usage", content: "We use performance cookies to monitor portal load speeds and ensure our real-time reporting stays fast across Canada. We do not use third-party marketing cookies that track you across other websites." },
                                { title: "3. Management", content: "You may choose to disable non-essential cookies in your browser, but essential session cookies are required to access the secure Admin and Client interfaces." }
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
