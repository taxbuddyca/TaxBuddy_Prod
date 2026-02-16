import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Audit Protection | CRA Audit Support | Free 15-Minute Consultation',
    description: 'CRA audit protection and support services. Expert guidance if you face a tax audit. Book a free 15-minute consultation to secure your business and personal tax returns.',
    alternates: {
        canonical: '/audit-protection',
    },
};

export default function AuditProtectionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
