import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RRSP Calculator | TaxBuddy Canada',
    description: 'Calculate your RRSP contribution room and potential tax savings. Free Canadian RRSP calculator.',
    alternates: {
        canonical: '/tools/rrsp-calculator',
    },
};

export default function RRSPCalculatorLayout({ children }: { children: React.ReactNode }) {
    return children;
}
