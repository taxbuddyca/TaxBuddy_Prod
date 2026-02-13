import GrowthEngine from '@/components/tax-engine/GrowthEngine';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Growth Engine - Business Tax Optimizer | TaxBuddy Canada',
    description: 'Optimize business taxes with TOSI compliance strategies, HST Quick Method analysis, and vehicle write-off optimization for contractors and incorporated businesses.',
    alternates: {
        canonical: '/tools/tax-engine/growth',
    },
};

export default function GrowthEnginePage() {
    return <GrowthEngine />;
}
