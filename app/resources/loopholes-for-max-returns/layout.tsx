import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CRA Tax Loopholes for Maximum Returns | TaxBuddy Canada',
    description: 'Legal CRA tax loopholes and strategies to maximize your Canadian tax return. Expert tips from certified CPAs.',
    alternates: {
        canonical: '/resources/loopholes-for-max-returns',
    },
};

export default function LoopholesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
