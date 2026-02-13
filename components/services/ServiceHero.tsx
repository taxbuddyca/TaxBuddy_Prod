import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceHeroProps {
    hero: {
        title: string;
        subtitle: string;
        image: string;
        cta: string;
    };
}

export default function ServiceHero({ hero }: ServiceHeroProps) {
    if (!hero) return null;

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
                        {hero.title}
                    </h1>
                    <p className="text-xl text-white/80 mb-10 leading-relaxed font-medium">
                        {hero.subtitle}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-growth text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-growth/90 hover:scale-105 transition-all shadow-lg shadow-growth/20"
                    >
                        {hero.cta} <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
