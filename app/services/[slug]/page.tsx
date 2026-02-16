import { services } from "@/lib/data/services";
import { notFound } from "next/navigation";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceUSPs from "@/components/services/ServiceUSP";
import ServiceContent from "@/components/services/ServiceContent";
import AISearch from "@/components/services/AISearch";
import ServiceSidebar from "@/components/services/ServiceSidebar";
import TaxTipsSidebar from "@/components/blog/TaxTipsSidebar";
import { getPricingPlans } from "@/lib/pricing";

// Allow dynamic updates
export const revalidate = 60;

export async function generateStaticParams() {
    return services
        .filter(s => s.slug) // Only generate pages for items with a slug
        .map((s) => ({
            slug: s.slug,
        }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const service = services.find(s => s.slug === params.slug);
    if (!service) return {};

    const baseTitle = service.meta?.title || `${service.title} | TaxBuddy`;
    const description = service.meta?.description || service.desc;

    return {
        title: `${baseTitle} | Free 15-Min Consultation`,
        description: `${description} Book a free 15-minute consultation to discuss our ${service.title.toLowerCase()}.`,
        alternates: {
            canonical: `/services/${params.slug}`,
        },
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services.find(s => s.slug === slug);

    if (!service) {
        notFound();
    }

    // Fetch dynamic pricing from DB
    let dynamicPricing = null;
    try {
        const plans = await getPricingPlans(slug);
        dynamicPricing = plans && plans.length > 0 ? plans[0] : null;
    } catch (err) {
        console.error("Error fetching dynamic pricing for service:", slug, err);
    }

    return (
        <main className="bg-white min-h-screen">
            {service.hero && <ServiceHero hero={{ ...service.hero, answerFirst: service.answerFirst } as any} />}

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Main Content Column */}
                    <div className="flex-1 min-w-0">
                        {service.aiSearch && <AISearch queries={service.aiSearch} />}

                        {service.usps && <ServiceUSPs usps={service.usps} />}

                        {service.content && <ServiceContent content={service.content} />}
                    </div>

                    {/* Sidebar Column */}
                    <aside className="w-full lg:w-[400px] flex-shrink-0 space-y-12 sticky top-32 self-start">
                        {service.sidebar && <ServiceSidebar sidebar={service.sidebar} dynamicPricing={dynamicPricing} />}
                        <TaxTipsSidebar />
                    </aside>
                </div>
            </div>
        </main>
    );
}
