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
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const pathname = usePathname();

    // Determine if the current page has a dark hero section
    const isDarkHeroPage = pathname?.startsWith('/services/') || pathname?.startsWith('/industries/');
    // Apply dark theme (white text) when on a dark hero page, not scrolled, and mobile menu is closed
    const isDarkTheme = isDarkHeroPage && !isScrolled && !isMobileMenuOpen;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

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
        { title: "3-Brain Tax Engine", href: "/tools/tax-engine", description: "Advanced tax optimization & strategy.", icon: CalcIcon },
        { title: "Tax Calculator", href: "/tools/tax-calculator", description: "Estimate your 2025 refund instantly.", icon: Target },
        { title: "RRSP Savings Tool", href: "/tools/rrsp-calculator", description: "Maximize your tax savings.", icon: TrendingUp },
        { title: "Tax Resources", href: "/resources/tax-brackets", description: "Learn about Canadian tax rules.", icon: BookOpen },
        { title: "FAQ", href: "/faq", description: "Answers to common questions.", icon: HelpCircle },
        { title: "Case Studies", href: "/case-studies", description: "See how we help businesses grow.", icon: Briefcase },
        { title: "Client Portal", href: "/portal/documents", description: "Secure document exchange.", icon: LayoutDashboard },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-gray-200 shadow-sm py-3' : 'bg-transparent border-transparent py-5'} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2 rounded-xl">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-navy-950 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-lg" />
                            <div className="absolute inset-x-0 inset-y-0.5 bg-white rounded-xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-premium border border-gray-100" />
                            <Logo className="relative w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col -gap-1">
                            <span className={`text-xl font-black tracking-tight leading-none ${isDarkTheme ? 'text-white' : 'text-navy-950'}`}>Tax<span className={isDarkTheme ? 'text-blue-400' : 'text-blue-600'}>Buddy</span></span>
                            <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDarkTheme ? 'text-white/60' : 'text-navy-900/40'}`}>Advisory</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-5">
                        <NavDropdown title="Services" items={servicesItems} isDarkTheme={isDarkTheme} />
                        <NavDropdown title="Industries" groups={industriesGroups} isDarkTheme={isDarkTheme} />

                        <Link href="/pricing" className={`text-sm font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2 rounded-md ${isDarkTheme ? 'text-white/80 hover:text-white' : 'text-navy-900/70 hover:text-growth'}`}>
                            Pricing
                        </Link>

                        <NavDropdown title="Resources" items={resourcesItems} isDarkTheme={isDarkTheme} />

                        <div className={`h-6 w-px mx-1 ${isDarkTheme ? 'bg-white/20' : 'bg-gray-200'}`} />
                        <Link
                            href="/contact"
                            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2 hover:-translate-y-0.5 ${isDarkTheme
                                ? 'bg-white text-navy-950 hover:bg-gray-100'
                                : 'bg-navy-950 text-white hover:bg-growth'
                                }`}
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`lg:hidden p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2 ${isDarkTheme ? 'text-white hover:bg-white/10' : 'text-navy-950 hover:bg-gray-100'
                            }`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full px-4 pt-4 animate-in fade-in slide-in-from-top-5 duration-300">
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
                                className="bg-navy-950 text-white px-8 py-4 rounded-xl font-black text-center shadow-lg hover:bg-navy-900 transition-colors"
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
