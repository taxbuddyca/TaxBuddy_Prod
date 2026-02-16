import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Calgary Tax Accountants | Free 15-Minute Consultation | TaxBuddy',
    description: 'Expert Calgary tax accountants providing virtual tax filing and bookkeeping. Book a free 15-minute consultation today! 100% remote personal service.',
    alternates: {
        canonical: '/calgary-tax-accountants',
    },
};

export default function CalgaryLayout({ children }: { children: React.ReactNode }) {
    return children;
}
