import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Case Studies | Success Stories | Free 15-Minute Consultation',
    description: 'Real success stories from TaxBuddy Canada clients. See how we help Canadian businesses save time and money. Book a free 15-minute consultation to discuss your business goals.',
    alternates: {
        canonical: '/case-studies',
    },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
