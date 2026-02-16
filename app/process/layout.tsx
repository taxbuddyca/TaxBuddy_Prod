import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Process | How It Works | Free 15-Minute Consultation | TaxBuddy',
    description: 'Learn about our streamlined virtual accounting process. From onboarding to tax filing, we make it simple and efficient. Book a free 15-minute consultation to get started.',
    alternates: {
        canonical: '/process',
    },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
    return children;
}
