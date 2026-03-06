import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Important Canadian Tax Dates 2025 | TaxBuddy Canada',
    description: 'Important Canadian tax deadlines and dates for individuals and businesses for the 2025 tax season. Never miss a CRA deadline again.',
    alternates: {
        canonical: '/resources/tax-dates',
    },
};

export default function TaxDatesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
