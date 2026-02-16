import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Certifications | Qualified CPA Team | TaxBuddy Canada',
    description: 'Our professional certifications and credentials. CPA certified accountants serving Canadian businesses with expert tax and financial advice. Book a free 15-minute consultation today.',
    alternates: {
        canonical: '/certifications',
    },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
