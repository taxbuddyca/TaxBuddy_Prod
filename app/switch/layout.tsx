import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Switch to TaxBuddy | TaxBuddy Canada',
    description: 'Make the switch to modern virtual accounting. Easy transition process with no disruption to your business.',
    alternates: {
        canonical: '/switch',
    },
};

export default function SwitchLayout({ children }: { children: React.ReactNode }) {
    return children;
}
