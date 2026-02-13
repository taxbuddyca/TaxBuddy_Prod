
import React from 'react';

export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': ['AccountingService', 'FinancialService'],
        name: 'TaxBuddy Canada',
        alternateName: 'TaxBuddy',
        description: 'Professional virtual bookkeeping, tax planning, and CFO services for Canadian startups and businesses.',
        logo: 'https://mytaxbuddy4u.com/logo.png',
        image: 'https://mytaxbuddy4u.com/icon.png',
        '@id': 'https://mytaxbuddy4u.com/#organization',
        url: 'https://mytaxbuddy4u.com',
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
        areaServed: [
            {
                '@type': 'City',
                name: 'Halifax'
            },
            {
                '@type': 'State',
                name: 'Nova Scotia'
            },
            {
                '@type': 'Country',
                name: 'Canada'
            }
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Canadian Tax and Accounting Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Personal Tax Filing & CRA EFILE',
                        description: 'Virtual personal tax service with max refund guarantee using legal CRA loopholes.'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Online Bookkeeping Halifax',
                        description: 'Modern cloud-based bookkeeping for small businesses in Nova Scotia and beyond.'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Virtual CFO Advisory',
                        description: 'Strategic financial growth and tax planning for Canadian startups.'
                    }
                }
            ]
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '128'
        },
        review: [
            {
                '@type': 'Review',
                author: {
                    '@type': 'Person',
                    name: 'Local Client'
                },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'The best virtual personal tax service in Halifax! Saved me thousands.'
            }
        ],
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
            ],
            opens: '09:00',
            closes: '17:00',
        },
        sameAs: [
            'https://www.facebook.com/taxbuddy',
            'https://twitter.com/taxbuddy',
            'https://www.linkedin.com/company/taxbuddy',
        ],
    };

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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
        </>
    );
}
