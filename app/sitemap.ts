
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://taxbuddy.ca';

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
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
