"use client";

import { useState, useEffect } from "react";
import { Zap, Settings, LayoutDashboard, Menu, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Process", href: "/process" },
        { name: "Pricing", href: "/pricing" },
        { name: "Calculator", href: "/tools/tax-calculator" },
        { name: "Checklist", href: "/tools/tax-checklist" },

        { name: "FAQ", href: "/faq" },
        { name: "Portal", href: "/portal/documents" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${isScrolled ? 'pt-4' : 'pt-6'}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full px-8 py-4 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'shadow-premium py-3' : 'shadow-glass'}`}>
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative w-14 h-14 flex items-center justify-center">
                            <div className="absolute inset-0 bg-navy-950 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl" />
                            <div className="absolute inset-x-0 inset-y-0.5 bg-white rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-premium border border-gray-100" />
                            <Logo className="relative w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col -gap-1">
                            <span className="text-2xl font-black tracking-tighter text-navy-950 dark:text-white leading-none">Tax<span className="text-blue-600">Buddy</span></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-navy-900/30">Advisory</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest transition ${pathname === link.href ? 'text-growth' : 'text-navy-900/60 hover:text-growth'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-6 w-px bg-gray-200" />
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 bg-navy-900 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition active:scale-95 shadow-lg shadow-navy-900/10"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-navy-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full px-4 pt-4 animate-in fade-in slide-in-from-top-5 duration-300">
                    <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-[2rem] p-8 shadow-2xl">
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-black text-navy-950 uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-gray-100 w-full" />
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-navy-950 text-white px-8 py-4 rounded-xl font-black text-center shadow-lg"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/portal/documents"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-gray-100 text-navy-950 px-8 py-4 rounded-xl font-black text-center shadow-lg hover:bg-gray-200"
                            >
                                Client Portal
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
