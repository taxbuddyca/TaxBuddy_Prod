import React from 'react';
import Link from 'next/link';
import { industries } from '@/lib/data/industries';
import PageBackground from '@/components/PageBackground';
import GlassCard from '@/components/GlassCard';
import { ArrowRight } from 'lucide-react';

export default function IndustriesPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 selection:bg-growth selection:text-white">
            <PageBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Specialized Expertise</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                        Industries We <span className="text-growth">Serve</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        Every industry has unique tax rules and financial challenges. We tailor our accounting services to fit your specific niche.
                    </p>
                </div>

                <div className="space-y-24">
                    {industries.map((category) => (
                        <div key={category.category}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 rounded-2xl bg-growth/10 flex items-center justify-center text-growth">
                                    <category.icon size={24} />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-navy-950 tracking-tight">{category.category}</h2>
                                    <p className="text-navy-900/50 font-medium">{category.description}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.items.map((item) => (
                                    <Link key={item.slug} href={`/industries/${item.slug}`} className="group h-full">
                                        <GlassCard className="h-full p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 border-gray-100 bg-white/50" intensity="light">
                                            <h3 className="text-2xl font-black text-navy-950 mb-4 group-hover:text-growth transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-navy-900/60 text-sm leading-relaxed mb-8 flex-grow">
                                                {item.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-bold text-navy-950 mt-auto">
                                                Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </GlassCard>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
