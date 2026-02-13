import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | TaxBuddy Canada',
    description: 'Privacy policy for TaxBuddy Canada. Learn how we protect and handle your personal and financial information.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children;
}
