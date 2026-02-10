"use client";

import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white pt-32 pb-16 border-t border-gray-100 selection:bg-growth selection:text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-growth rounded-xl flex items-center justify-center rotate-3 shadow-emerald">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-black tracking-tight text-navy-950">Tax<span className="text-growth">Buddy</span></span>
                        </div>
                        <p className="text-navy-900/40 font-medium leading-relaxed mb-8">
                            A different kind of CPA firm. 100% remote, 100% Canadian. Built for the modern entrepreneur.
                        </p>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-navy-900/20 hover:text-growth transition-all">
                                <Twitter size={18} />
                            </button>
                            <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-navy-900/20 hover:text-growth transition-all">
                                <Linkedin size={18} />
                            </button>
                            <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-navy-900/20 hover:text-growth transition-all">
                                <Github size={18} />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
                        <div className="flex flex-col gap-4 text-sm font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/services" className="hover:text-growth transition">Services</Link>
                            <Link href="/pricing" className="hover:text-growth transition">Pricing</Link>
                            <Link href="/process" className="hover:text-growth transition">Process</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-8">Company</h4>
                        <div className="flex flex-col gap-4 text-sm font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/about" className="hover:text-growth transition">About Us</Link>
                            <Link href="/careers" className="hover:text-growth transition">Careers</Link>
                            <Link href="/faq" className="hover:text-growth transition">FAQ</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-8">Legal</h4>
                        <div className="flex flex-col gap-4 text-sm font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/privacy" className="hover:text-growth transition">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-growth transition">Terms of Service</Link>
                            <Link href="/cookies" className="hover:text-growth transition">Cookie Policy</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-navy-900/20 text-xs font-black uppercase tracking-[0.2em]">
                        © 2026 TaxBuddy. No Outsourcing. No Bull.
                    </div>
                    <div className="flex items-center gap-6 text-navy-900/20 text-[10px] font-black uppercase tracking-widest">
                        <span>Built with ❤️ in Canada</span>
                        <div className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span>Certified CPA</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
