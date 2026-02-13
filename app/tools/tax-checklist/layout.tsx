import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tax Checklist | TaxBuddy Canada',
    description: 'Comprehensive Canadian tax checklist. Ensure you have all documents and information ready for tax filing.',
    alternates: {
        canonical: '/tools/tax-checklist',
    },
};

export default function TaxChecklistLayout({ children }: { children: React.ReactNode }) {
    return children;
}
