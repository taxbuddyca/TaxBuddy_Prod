
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
            streetAddress: '201 21st St E',
            addressLocality: 'Saskatoon',
            addressRegion: 'SK',
            postalCode: 'S7K 0B8',
            addressCountry: 'CA',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 52.1289,
            longitude: -106.6617,
        },
        areaServed: {
            '@type': 'Country',
            name: 'Canada'
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Accounting and Tax Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Corporate Tax Filing'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Virtual CFO Services'
                    }
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Bookkeeping'
                    }
                }
            ]
        },
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

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
