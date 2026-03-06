import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '3-Brain Tax Engine | Smart Canadian Tax Optimization | TaxBuddy',
    description: 'Use our proprietary 3-Brain Tax Engine to simulate life scenarios, optimize corporate structures, and maximize your Canadian tax refund instantly.',
    alternates: {
        canonical: '/tools/tax-engine',
    },
};

export default function TaxEngineLayout({ children }: { children: React.ReactNode }) {
    return children;
}
