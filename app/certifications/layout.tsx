import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Certifications | TaxBuddy Canada',
    description: 'Our professional certifications and credentials. CPA certified accountants serving Canadian businesses.',
    alternates: {
        canonical: '/certifications',
    },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
