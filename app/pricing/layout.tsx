import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | Free 15-Minute Consultation | TaxBuddy Canada',
    description: 'Transparent pricing for virtual tax filing, bookkeeping, and CFO services. Book a free 15-minute consultation to find the perfect plan for you. Fixed monthly rates with no hidden fees.',
    alternates: {
        canonical: '/pricing',
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
