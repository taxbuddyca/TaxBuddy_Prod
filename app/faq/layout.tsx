import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | TaxBuddy Canada',
    description: 'Frequently asked questions about our virtual tax filing, bookkeeping, and CFO services. Learn about our process, pricing, and how we can help your business.',
    alternates: {
        canonical: '/faq',
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
