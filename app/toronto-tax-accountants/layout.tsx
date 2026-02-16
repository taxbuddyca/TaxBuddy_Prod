import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Toronto Tax Accountants | Free 15-Minute Consultation | TaxBuddy',
    description: 'Expert Toronto tax accountants providing virtual tax filing and bookkeeping. Book a free 15-minute consultation today! 100% remote personal service.',
    alternates: {
        canonical: '/toronto-tax-accountants',
    },
};

export default function TorontoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
