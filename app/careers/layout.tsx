import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Careers | TaxBuddy Canada',
    description: 'Join the TaxBuddy Canada team. Explore career opportunities in virtual accounting, tax, and CFO services.',
    alternates: {
        canonical: '/careers',
    },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
    return children;
}
