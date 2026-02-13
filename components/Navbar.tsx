"use client";

import { useState, useEffect } from "react";
import { Zap, Settings, LayoutDashboard, Menu, X, TrendingUp, Briefcase, BookOpen, HelpCircle, Award, Calculator as CalcIcon, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavDropdown from "./NavDropdown";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";

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

    // Prepare structure for dropdowns
    const servicesItems = services.map(s => ({
        title: s.title,
        href: s.href,
        description: s.desc,
        icon: s.icon
    }));

    const industriesGroups = industries.map(cat => ({
        category: cat.category,
        items: cat.items.map(item => ({
            title: item.title,
            href: `/industries/${item.slug}`,
            icon: cat.icon
        }))
    }));

    const resourcesItems = [
        { title: "Tax Calculator", href: "/tools/tax-calculator", description: "Estimate your 2025 refund instantly.", icon: CalcIcon },
        { title: "RRSP Savings Tool", href: "/tools/rrsp-calculator", description: "Maximize your tax savings.", icon: Target },
        { title: "Tax Resources", href: "/resources/tax-brackets", description: "Learn about Canadian tax rules.", icon: BookOpen },
        { title: "FAQ", href: "/faq", description: "Answers to common questions.", icon: HelpCircle },
        { title: "Case Studies", href: "/case-studies", description: "See how we help businesses grow.", icon: Briefcase },
        { title: "Client Portal", href: "/portal/documents", description: "Secure document exchange.", icon: LayoutDashboard },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${isScrolled ? 'pt-2' : 'pt-4'}`}>
            <div className="max-w-7xl mx-auto">
                <div className={`bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full px-6 py-2 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'shadow-premium py-1.5' : 'shadow-glass'}`}>
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-navy-950 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg" />
                            <div className="absolute inset-x-0 inset-y-0.5 bg-white rounded-xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-premium border border-gray-100" />
                            <Logo className="relative w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col -gap-1">
                            <span className="text-xl font-black tracking-tight text-navy-950 leading-none" style={{ color: '#0a0f29' }}>Tax<span className="text-blue-600">Buddy</span></span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-navy-900/30">Advisory</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavDropdown title="Services" items={servicesItems} />
                        <NavDropdown title="Industries" groups={industriesGroups} />

                        <Link href="/pricing" className="text-sm font-bold uppercase tracking-widest text-navy-900/60 hover:text-growth transition">
                            Pricing
                        </Link>

                        <NavDropdown title="Resources" items={resourcesItems} />

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
                    <div className="bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-[2rem] p-8 shadow-2xl overflow-y-auto max-h-[80vh]">
                        <div className="flex flex-col gap-6">

                            <div className="space-y-4">
                                <div className="text-xs font-black uppercase tracking-widest text-navy-900/40">Services</div>
                                {servicesItems.map(item => (
                                    <Link key={item.title} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-navy-950 pl-2 border-l-2 border-transparent hover:border-growth hover:text-growth transition-all">{item.title}</Link>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <div className="text-xs font-black uppercase tracking-widest text-navy-900/40">Industries</div>
                                {industriesGroups.map((group) => (
                                    <div key={group.category} className="pl-2">
                                        <div className="text-xs font-bold text-growth uppercase tracking-wider mb-2">{group.category}</div>
                                        {group.items.map(item => (
                                            <Link key={item.title} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-bold text-navy-950 pl-4 py-1 border-l border-gray-100 hover:border-growth hover:text-growth transition-all">{item.title}</Link>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black text-navy-950 uppercase tracking-widest">
                                Pricing
                            </Link>

                            <div className="space-y-4">
                                <div className="text-xs font-black uppercase tracking-widest text-navy-900/40">Resources</div>
                                {resourcesItems.map(item => (
                                    <Link key={item.title} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-bold text-navy-950 pl-2 border-l-2 border-transparent hover:border-growth hover:text-growth transition-all">{item.title}</Link>
                                ))}
                            </div>

                            <div className="h-px bg-gray-100 w-full" />
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-navy-950 text-white px-8 py-4 rounded-xl font-black text-center shadow-lg"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
