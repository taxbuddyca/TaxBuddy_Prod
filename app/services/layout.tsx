import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Virtual Personal Tax & Cloud Bookkeeping Services Canada | TaxBuddy',
    description: 'Comprehensive virtual accounting services including personal tax filing, corporate tax, cloud bookkeeping, payroll, and fractional CFO services for Canadian businesses.',
    alternates: {
        canonical: '/services',
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
