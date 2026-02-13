import NicheEngine from '@/components/tax-engine/NicheEngine';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Niche Engine - Specialized Tax Scenarios | TaxBuddy Canada',
    description: 'Navigate complex tax scenarios including crypto trading classification, real estate anti-flipping rules, and cross-border income optimization.',
    alternates: {
        canonical: '/tools/tax-engine/niche',
    },
};

export default function NicheEnginePage() {
    return <NicheEngine />;
}
