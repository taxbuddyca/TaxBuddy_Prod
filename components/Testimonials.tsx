"use client";

import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Some products & services are nice-to-haves and some are integral. For us, TaxBuddy is integral. Their flexibility and responsiveness through the COVID-19 experience has been great.",
        author: "Adam McIsaac",
        role: "Co-Founder",
        company: "Robin"
    },
    {
        quote: "BetaKit doesn't have a full-time CFO, so TaxBuddy filled that gap for us: selecting the technology stack, reporting structure, and support that would work for our growing team.",
        author: "Douglas Soltys",
        role: "Editor-in-chief",
        company: "BetaKit"
    },
    {
        quote: "As always, the TaxBuddy team is invaluable. This is another great example of going above and beyond for your clients.",
        author: "Andrew Kwok",
        role: "Co-Founder",
        company: "Routific"
    },
    {
        quote: "TaxBuddy quickly and efficiently set up a seamless virtual accounting system for our firm that is very easy to use. It's highly automated and delivers the timely, accurate information we need.",
        author: "Patrick Keefe",
        role: "General Partner",
        company: ""
    },
    {
        quote: "I would recommend TaxBuddy as your CPA for any fast growing business. It is a full service experience, at reasonable costs, and they use modern technology as the backbone so it scales as you grow.",
        author: "Paul Teshima",
        role: "CEO",
        company: ""
    },
    {
        quote: "I have nothing but wonderful things to say about everyone I've worked with at TaxBuddy. Your team is FANTASTIC!",
        author: "Nicole Kovaks",
        role: "COO",
        company: ""
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-navy-950 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Client Stories</span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Don't just take our word for it.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                            <Quote className="text-growth mb-6 opacity-50 group-hover:opacity-100 transition-opacity" size={32} />
                            <p className="text-lg font-medium leading-relaxed mb-6 text-gray-300">"{t.quote}"</p>
                            <div>
                                <div className="font-bold text-white">{t.author}</div>
                                <div className="text-xs font-black uppercase tracking-widest text-growth">{t.role} {t.company && `• ${t.company}`}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-growth/20 to-blue-500/20 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <p className="text-xl md:text-2xl font-black italic mb-4">"TaxBuddy isn't your typical accounting firm. They think and operate like a tech company which is a perfect fit for us."</p>
                        <div className="text-sm font-bold opacity-70">MIKE KATCHEN, CEO of WealthSimple</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
