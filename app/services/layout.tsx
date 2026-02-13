import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services | TaxBuddy Canada',
    description: 'Comprehensive virtual accounting services including tax filing, bookkeeping, payroll, and CFO services for Canadian businesses and individuals.',
    alternates: {
        canonical: '/services',
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
