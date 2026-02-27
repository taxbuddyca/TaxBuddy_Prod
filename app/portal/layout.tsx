import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Client Portal | TaxBuddy Canada',
    description: 'Secure client portal for document uploads and tax intake.',
    robots: { index: false, follow: false }
};

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
