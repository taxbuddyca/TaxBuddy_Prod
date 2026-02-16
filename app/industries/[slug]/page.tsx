import React from 'react';
import { notFound } from 'next/navigation';
import { industries } from '@/lib/data/industries';
import IndustryHero from '@/components/industry/IndustryHero';
import IndustryChallenges from '@/components/industry/IndustryChallenges';
import IndustrySolutions from '@/components/industry/IndustrySolutions';
import IndustryBenefits from '@/components/industry/IndustryBenefits';
import IndustryFAQ from '@/components/industry/IndustryFAQ';
import { IndustryTestimonials } from '@/components/industry/IndustryTestimonials';
import { IndustrySoftware } from '@/components/industry/IndustrySoftware';
import { IndustryDetailedContent } from '@/components/industry/IndustryDetailedContent';

export async function generateStaticParams() {
    return industries.flatMap(cat => cat.items.map(item => ({ slug: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = industries.flatMap(cat => cat.items).find(i => i.slug === slug);

    if (!item) return {};

    return {
        title: `${item.hero.title} | Free 15-Minute Consultation | TaxBuddy`,
        description: `${item.hero.subtitle} Book a free 15-minute consultation with our specialized CPA team.`,
        alternates: {
            canonical: `/industries/${slug}`,
        },
    };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = industries.flatMap(cat => cat.items).find(i => i.slug === slug);
    const category = industries.find(cat => cat.items.some(i => i.slug === slug));

    if (!item) {
        notFound();
    }

    return (
        <main className="min-h-screen selection:bg-growth selection:text-white">
            <IndustryHero
                title={item.hero.title}
                subtitle={item.hero.subtitle}
                image={item.hero.image}
                category={category?.category}
            />

            {/* Intro Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-950 mb-6">
                        {item.intro.heading}
                    </h2>
                    <p className="text-xl text-navy-900/70 leading-relaxed">
                        {item.intro.text}
                    </p>
                </div>
            </section>

            <IndustryChallenges
                title={item.challenges.title}
                items={item.challenges.items}
            />

            <IndustrySolutions
                title={item.solutions.title}
                items={item.solutions.items}
            />

            <IndustryBenefits
                title={item.benefits.title}
                items={item.benefits.items}
            />

            <IndustrySoftware software={item.software || []} />

            <IndustryDetailedContent content={item.detailedContent || []} />

            <IndustryTestimonials testimonials={item.testimonials || []} />

            {item.faq && item.faq.length > 0 && (
                <IndustryFAQ items={item.faq} />
            )}
        </main>
    );
}
