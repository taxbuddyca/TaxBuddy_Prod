import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | TaxBuddy Canada | Your Virtual CPA Team',
    description: 'Learn about TaxBuddy Canada - our mission to provide modern virtual accounting and tax services. Book a free 15-minute consultation with our professional CPA team today.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
