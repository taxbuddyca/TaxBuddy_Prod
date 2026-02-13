import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Case Studies | TaxBuddy Canada',
    description: 'Real success stories from TaxBuddy Canada clients. See how we help Canadian businesses save time and money.',
    alternates: {
        canonical: '/case-studies',
    },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
