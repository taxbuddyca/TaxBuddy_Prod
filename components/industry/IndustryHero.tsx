

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface IndustryHeroProps {
    title: string;
    subtitle: string;
    image: string;
    category?: string;
}

export default function IndustryHero({ title, subtitle, image, category }: IndustryHeroProps) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-blue-600/30 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 text-center">
                {category && (
                    <span className="inline-block py-1 px-3 rounded-full bg-growth/20 text-growth text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-growth/20">
                        {category}
                    </span>
                )}
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight max-w-5xl mx-auto drop-shadow-md">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-blue-50 max-w-3xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-sm">
                    {subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/contact"
                        className="bg-growth text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-growth-600 transition-all shadow-lg hover:shadow-growth/20 flex items-center gap-2 group"
                    >
                        Book Free Consultation
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#solutions"
                        className="px-8 py-4 rounded-xl font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                        Explore Services
                    </Link>
                </div>
            </div>

            {/* Decorative bottom curve */}

        </section>
    );
}
