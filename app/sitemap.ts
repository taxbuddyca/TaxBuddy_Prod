
import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { services } from '@/lib/data/services';
import { industries } from '@/lib/data/industries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://taxbuddycanada.ca';

    // Core pages
    const routes = [
        '',
        '/services',
        '/pricing',
        '/process',
        '/about',
        '/contact',
        '/faq',
        '/switch',
        '/audit-protection',
        '/tools/tax-calculator',
        '/tools/rrsp-calculator',
        '/tools/tax-engine',
        '/tools/tax-checklist',
        '/blog',
        '/resources/loopholes-for-max-returns',
        '/resources/tax-dates',
        '/halifax-tax-accountants',
        '/toronto-tax-accountants',
        '/vancouver-tax-accountants',
        '/calgary-tax-accountants',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Service pages
    const serviceRoutes: MetadataRoute.Sitemap = services
        .filter(s => s.slug)
        .map((s) => ({
            url: `${baseUrl}/services/${s.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }));

    // Industry pages
    const industryRoutes: MetadataRoute.Sitemap = industries.flatMap(category =>
        category.items.map(item => ({
            url: `${baseUrl}/industries/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.85,
        }))
    );

    // Fetch dynamic blog posts
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: posts } = await supabase
        .from('posts')
        .select('slug, published_at')
        .not('slug', 'is', null)
        .order('published_at', { ascending: false });

    const blogRoutes: MetadataRoute.Sitemap = (posts || [])
        .filter((post) => post.slug && post.published_at)
        .map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.published_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

    return [...routes, ...serviceRoutes, ...industryRoutes, ...blogRoutes];
}
