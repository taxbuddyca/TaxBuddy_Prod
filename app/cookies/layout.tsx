import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | TaxBuddy Canada',
    description: 'Cookie policy for TaxBuddy Canada. Learn how we use cookies on our website.',
    alternates: {
        canonical: '/cookies',
    },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
