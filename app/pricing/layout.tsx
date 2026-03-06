import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Transparent Pricing | Virtual Tax & CFO Services | TaxBuddy Canada',
    description: 'Fixed monthly rates for remote tax filing, bookkeeping, and fractional CFO services. Book your free 15-minute consultation with our Halifax-based CPAs, serving all of Canada.',
    alternates: {
        canonical: '/pricing',
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
