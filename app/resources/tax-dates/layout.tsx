import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Canadian Tax Dates 2024-2025 | TaxBuddy Canada',
    description: 'Important Canadian tax deadlines and dates for individuals and businesses. Never miss a CRA deadline again.',
    alternates: {
        canonical: '/resources/tax-dates',
    },
};

export default function TaxDatesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
