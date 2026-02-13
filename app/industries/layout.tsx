import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Industries We Serve | TaxBuddy Canada',
    description: 'Specialized accounting services for various industries including real estate, medical professionals, e-commerce, tech startups, and more.',
    alternates: {
        canonical: '/industries',
    },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
