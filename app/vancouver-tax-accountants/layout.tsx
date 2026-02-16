import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Vancouver Tax Accountants | Free 15-Minute Consultation | TaxBuddy',
    description: 'Expert Vancouver tax accountants providing virtual tax filing and bookkeeping. Book a free 15-minute consultation today! 100% remote personal service.',
    alternates: {
        canonical: '/vancouver-tax-accountants',
    },
};

export default function VancouverLayout({ children }: { children: React.ReactNode }) {
    return children;
}
