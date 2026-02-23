import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2026 RRSP Contribution & Tax Savings Calculator | TaxBuddy',
    description: 'Calculate your RRSP contribution room and see exactly how much you can save on your 2026 Canadian taxes. Free RRSP deduction calculator.',
    keywords: ['RRSP calculator', 'RRSP contribution limit', 'tax savings Canada', 'RRSP deduction calculator', 'retirement savings plan', 'CRA RRSP limit'],
    alternates: {
        canonical: '/tools/rrsp-calculator',
    },
    openGraph: {
        title: '2026 RRSP Tax Savings Calculator | TaxBuddy',
        description: 'See how much tax you can save this year by contributing to your RRSP. Instantly calculate your tax refund boost.',
        url: 'https://taxbuddycanada.ca/tools/rrsp-calculator',
        siteName: 'TaxBuddy Canada',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '2026 RRSP Tax Savings Calculator | TaxBuddy',
        description: 'Calculate your RRSP contribution room and see exactly how much you can save on your Canadian taxes.',
    }
};

export default function RRSPCalculatorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
