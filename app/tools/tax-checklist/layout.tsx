import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2026 Canadian Tax Return Preparation Checklist | TaxBuddy',
    description: 'The ultimate Canadian tax preparation checklist for 2026. Ensure you have all documents, slips, and receipts ready for your CRA tax filing.',
    keywords: ['tax checklist Canada', 'tax prep checklist', 'what to bring to accountant', 'CRA document checklist', '2026 tax slips', 'T4 checklist'],
    alternates: {
        canonical: '/tools/tax-checklist',
    },
    openGraph: {
        title: '2026 Canadian Tax Return Preparation Checklist | TaxBuddy',
        description: 'The ultimate Canadian tax prep checklist. Ensure you have all required documents to maximize your CRA refund.',
        url: 'https://taxbuddycanada.ca/tools/tax-checklist',
        siteName: 'TaxBuddy Canada',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '2026 Canadian Tax Return Preparation Checklist | TaxBuddy',
        description: 'Never miss a deduction again. Use our comprehensive Canadian tax checklist to prepare for the 2026 tax season.',
    }
};

export default function TaxChecklistLayout({ children }: { children: React.ReactNode }) {
    return children;
}
