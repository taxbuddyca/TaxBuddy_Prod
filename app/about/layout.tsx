import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About TaxBuddy | Top Virtual Personal Tax Service Canada',
    description: 'Founded in Halifax, TaxBuddy is a leading virtual CPA team for Canadian entrepreneurs. Automated cloud accounting, proactive tax planning, and expert CFO advisory.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
