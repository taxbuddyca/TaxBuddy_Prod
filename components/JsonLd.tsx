
import React from 'react';
import { faqs } from '@/lib/data/faq';
import { services } from '@/lib/data/services';

export default function JsonLd() {
    // Top 5 FAQs for the schema
    const topFaqs = [
        faqs[0].items[0], // Why pick TaxBuddy?
        faqs[0].items[1], // What cities?
        faqs[0].items[2], // Physical office?
        faqs[1].items[0], // Software?
        faqs[2].items[1], // Corporate tax deadline?
    ];

    const organizationLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://mytaxbuddy4u.com/#organization',
        name: 'TaxBuddy Canada',
        url: 'https://mytaxbuddy4u.com',
        logo: 'https://mytaxbuddy4u.com/logo.png',
        sameAs: [
            'https://www.facebook.com/taxbuddy',
            'https://twitter.com/taxbuddy',
            'https://www.linkedin.com/company/taxbuddy',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+13068804017',
            contactType: 'customer service',
            email: 'taxbuddyca4u@gmail.com',
            areaServed: 'CA',
            availableLanguage: ['English', 'French']
        }
    };

    const localBusinessLd = {
        '@context': 'https://schema.org',
        '@type': ['AccountingService', 'FinancialService', 'LocalBusiness'],
        '@id': 'https://mytaxbuddy4u.com/#localbusiness',
        name: 'TaxBuddy Canada',
        description: 'Professional virtual bookkeeping, tax planning, and CFO services for Canadian startups and businesses.',
        image: 'https://mytaxbuddy4u.com/icon.png',
        telephone: '+13068804017',
        email: 'taxbuddyca4u@gmail.com',
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Unit 608 - 569 Washmill Lake Dr',
            addressLocality: 'Halifax',
            addressRegion: 'NS',
            postalCode: 'B3S 0E3',
            addressCountry: 'CA',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 44.6464,
            longitude: -63.6360,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00',
        },
        areaServed: {
            '@type': 'Country',
            name: 'Canada'
        }
    };

    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: topFaqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    const servicesLd = services.map(service => ({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `https://mytaxbuddy4u.com/services/${service.slug}#service`,
        name: service.title,
        description: service.answerFirst || service.desc,
        provider: {
            '@id': 'https://mytaxbuddy4u.com/#organization'
        },
        areaServed: {
            '@type': 'Country',
            name: 'Canada'
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: service.title,
            itemListElement: (service as any).features?.map((feature: string, index: number) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: feature
                },
                position: index + 1
            }))
        }
    }));

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://mytaxbuddy4u.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Services',
                'item': 'https://mytaxbuddy4u.com/services'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
            />
            {servicesLd.map((service, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
                />
            ))}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
        </>
    );
}
