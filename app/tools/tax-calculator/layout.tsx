import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tax Calculator | TaxBuddy Canada',
    description: 'Free Canadian tax calculator. Estimate your income tax, deductions, and refund for the current tax year.',
    alternates: {
        canonical: '/tools/tax-calculator',
    },
};

export default function TaxCalculatorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
