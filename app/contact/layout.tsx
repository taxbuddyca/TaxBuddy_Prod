import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | TaxBuddy Canada',
    description: 'Get in touch with TaxBuddy Canada. Book a free consultation to discuss your tax, bookkeeping, and CFO needs. Based in Halifax, serving all of Canada.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
