import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2026 Canada Income Tax Calculator | TaxBuddy',
    description: 'Free Canadian tax calculator. Estimate your 2026 income tax, federal/provincial tax brackets, RRSP deductions, and potential CRA refund instantly.',
    keywords: ['tax calculator Canada', 'income tax estimator', '2026 tax brackets', 'Canada tax refund calculator', 'after tax income calculator', 'CRA tax calculator', 'provincial tax rates'],
    alternates: {
        canonical: '/tools/tax-calculator',
    },
    openGraph: {
        title: '2026 Canada Income Tax Calculator | TaxBuddy',
        description: 'Estimate your 2026 Canada taxes instantly. See your federal and provincial brackets, take-home pay, and expected CRA refund.',
        url: 'https://taxbuddycanada.ca/tools/tax-calculator',
        siteName: 'TaxBuddy Canada',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '2026 Canada Income Tax Calculator | TaxBuddy',
        description: 'Free, instant Canadian income tax estimator for all provinces. Find out your 2026 tax brackets and CRA refund.',
    }
};

export default function TaxCalculatorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
