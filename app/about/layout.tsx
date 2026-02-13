import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | TaxBuddy Canada',
    description: 'Learn about TaxBuddy Canada - our story, values, and mission to give Canadian entrepreneurs their time back through modern virtual accounting services.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
