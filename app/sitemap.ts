
import { MetadataRoute } from 'next';

import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mytaxbuddy4u.com';

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
        '/tools/tax-checklist',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

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

    return [...routes, ...blogRoutes];
}
