import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Audit Protection | TaxBuddy Canada',
    description: 'CRA audit protection and support services. Expert guidance if you face a tax audit.',
    alternates: {
        canonical: '/audit-protection',
    },
};

export default function AuditProtectionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
