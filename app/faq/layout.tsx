import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | Tax & Accounting Questions | Free 15-Minute Consultation',
    description: 'Frequently asked questions about our virtual tax filing, bookkeeping, and CFO services. Get the expert advice you need. Book a free 15-minute consultation to discuss your specific questions.',
    alternates: {
        canonical: '/faq',
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
