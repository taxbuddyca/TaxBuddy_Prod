import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Book a Free 15-Minute Consultation | TaxBuddy Canada',
    description: 'Get in touch with TaxBuddy Canada. Book a free 15-minute consultation to discuss your tax, bookkeeping, and CFO needs. Fast response, expert CPA advice, 100% virtual.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
