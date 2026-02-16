import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Halifax Tax Accountants | Free 15-Minute Consultation | TaxBuddy',
    description: 'Expert Halifax tax accountants providing virtual tax filing and bookkeeping. Book a free 15-minute consultation today! Locally based in Halifax, serving all HRM.',
    alternates: {
        canonical: '/halifax-tax-accountants',
    },
};

export default function HalifaxLayout({ children }: { children: React.ReactNode }) {
    return children;
}
