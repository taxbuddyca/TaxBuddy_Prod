import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | TaxBuddy Canada',
    description: 'Transparent pricing for virtual tax filing, bookkeeping, and CFO services. Fixed monthly rates with no hidden fees. Plans for startups, small businesses, and enterprises.',
    alternates: {
        canonical: '/pricing',
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
