"use client";

import GlassCard from "@/components/GlassCard";
import { Users, Linkedin, Mail, Twitter, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TeamPage() {
    const team = [
        { name: "Mr B Vekariya", role: "Senior Tax Expert", bio: "Your dedicated expert for complex tax planning and business strategy. bringing years of specialized experience to your financial team." },
        { name: "Kerry Sharpe", role: "CEO & Co-Founder", bio: "Leading the vision for a paperless accounting future. Always looking for the next SaaS integration." },
        { name: "Colin Sharpe", role: "COO & Co-Founder", bio: "Driving excellence in remote operations and team pods. Master of process efficiency." },
        { name: "Sarah Williams", role: "Head of Tax", bio: "Expert in Canadian corporate restructuring and SR&ED. Your guide through complex T2 filings." }
    ];

    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden bg-blue-50/50">
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-6 block font-bold">The Collective</span>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[0.95]">
                            Smart People. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">Remote Culture.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            A 100% Canadian team of specialists working remotely across the country to support your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
                        {team.map((member, i) => (
                            <GlassCard key={i} className="p-8 group relative overflow-hidden hover-flash bg-white border-gray-100" intensity="light">
                                <div className="absolute inset-0 bg-gradient-to-br from-growth/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="w-full aspect-square bg-white rounded-3xl mb-10 flex items-center justify-center text-navy-900/10 overflow-hidden relative border border-gray-100 shadow-sm">
                                    <Users size={64} className="group-hover:scale-110 transition-transform duration-700 ease-out z-10 opacity-40 text-navy-950" />
                                    <div className="absolute inset-0 bg-growth/0 group-hover:bg-growth/5 transition-all duration-500" />
                                </div>
                                <h3 className="text-xl font-black text-navy-950 mb-1 group-hover:text-growth transition-colors">{member.name}</h3>
                                <div className="text-[10px] font-black text-growth/80 uppercase tracking-[0.2em] mb-6">{member.role}</div>
                                <p className="text-navy-900/70 text-sm font-medium leading-relaxed mb-8">{member.bio}</p>
                                <div className="flex gap-4">
                                    <button className="w-9 h-9 bg-navy-50 border border-navy-100 rounded-xl flex items-center justify-center text-navy-400 hover:text-growth hover:border-growth/80 transition-all">
                                        <Linkedin size={14} />
                                    </button>
                                    <button className="w-9 h-9 bg-navy-50 border border-navy-100 rounded-xl flex items-center justify-center text-navy-400 hover:text-growth hover:border-growth/80 transition-all">
                                        <Mail size={14} />
                                    </button>
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    <div className="bg-navy-950 rounded-[3rem] p-16 lg:p-20 relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-growth/20 rounded-full blur-[120px] animate-pulse" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                            <div className="text-left flashy-reveal">
                                <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter leading-[0.95]">We're always looking for great talent.</h2>
                                <p className="text-white/40 text-lg font-medium leading-relaxed mb-12 italic">
                                    Think you have what it takes to join Canada's most innovative accounting team? We're hiring across all pods.
                                </p>
                                <Link
                                    href="/careers"
                                    className="inline-flex items-center gap-3 bg-growth text-white px-10 py-5 rounded-2xl font-black shadow-lg shadow-growth/20 hover:scale-105 transition-all text-lg"
                                >
                                    Join Our Team <ChevronRight />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { val: "100%", label: "Remote" },
                                    { val: "60+", label: "Specialists" },
                                    { val: "10Y+", label: "Experience" },
                                    { val: "Zero", label: "Outsourcing" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover-flash">
                                        <div className="text-3xl font-black text-growth mb-2">{stat.val}</div>
                                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
