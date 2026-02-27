import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | TaxBuddy Canada',
    description: 'Secure client and admin login portal.',
    robots: { index: false, follow: false }
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
