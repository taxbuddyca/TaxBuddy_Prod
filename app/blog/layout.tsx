import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | TaxBuddy Canada',
    description: 'Tax tips, accounting insights, and financial advice for Canadian entrepreneurs and small business owners.',
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
