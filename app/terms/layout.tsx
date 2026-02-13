import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | TaxBuddy Canada',
    description: 'Terms of service for TaxBuddy Canada virtual accounting services.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
