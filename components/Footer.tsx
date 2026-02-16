"use client";

import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Github, TrendingUp } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="relative z-10 bg-white pt-16 pb-8 border-t border-gray-100 selection:bg-growth selection:text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center rotate-3 shadow-emerald">
                                <Logo className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-black tracking-tight text-navy-950" style={{ color: '#0a0f29' }}>Tax<span className="text-blue-600">Buddy</span></span>
                        </div>
                        <p className="text-navy-900/40 font-medium leading-relaxed mb-6 text-sm">
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
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-4">Regional</h4>
                        <div className="flex flex-col gap-3 text-xs font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/halifax-tax-accountants" className="hover:text-growth transition">Halifax</Link>
                            <Link href="/toronto-tax-accountants" className="hover:text-growth transition">Toronto</Link>
                            <Link href="/vancouver-tax-accountants" className="hover:text-growth transition">Vancouver</Link>
                            <Link href="/calgary-tax-accountants" className="hover:text-growth transition">Calgary</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-4">Industries</h4>
                        <div className="flex flex-col gap-3 text-xs font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/industries/real-estate-investors-tax" className="hover:text-growth transition">Real Estate</Link>
                            <Link href="/industries/construction-trades-accounting" className="hover:text-growth transition">Construction</Link>
                            <Link href="/industries/rideshare-delivery-tax-accounting" className="hover:text-growth transition">Gig Economy</Link>
                            <Link href="/industries/ecommerce-tax-accounting" className="hover:text-growth transition">E-Commerce</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-4">Support</h4>
                        <div className="flex flex-col gap-3 text-xs font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/about" className="hover:text-growth transition">About Us</Link>
                            <Link href="/blog" className="hover:text-growth transition">Blog</Link>
                            <Link href="/faq" className="hover:text-growth transition">FAQ</Link>
                            <Link href="/contact" className="hover:text-growth transition">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black text-navy-950 uppercase tracking-[0.2em] mb-4">Legal</h4>
                        <div className="flex flex-col gap-3 text-xs font-bold text-navy-900/40 uppercase tracking-widest">
                            <Link href="/privacy" className="hover:text-growth transition">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-growth transition">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
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
