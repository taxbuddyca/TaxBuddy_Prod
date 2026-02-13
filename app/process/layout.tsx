import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Process | TaxBuddy Canada',
    description: 'Learn about our streamlined virtual accounting process. How we onboard clients and deliver exceptional service.',
    alternates: {
        canonical: '/process',
    },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
    return children;
}
