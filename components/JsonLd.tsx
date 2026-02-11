
import React from 'react';

export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'TaxBuddy Stats',
        image: 'https://taxbuddy.ca/icon.png',
        '@id': 'https://taxbuddy.ca',
        url: 'https://taxbuddy.ca',
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
