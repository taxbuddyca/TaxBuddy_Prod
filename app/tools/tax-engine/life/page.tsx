import LifeEngine from '@/components/tax-engine/LifeEngine';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Life Engine - Personal & Family Tax Optimizer | TaxBuddy Canada',
    description: 'Optimize personal and family taxes with intelligent strategies for spousal RRSP, pension splitting, childcare deductions, tuition carry-forward, and newcomer benefits.',
    alternates: {
        canonical: '/tools/tax-engine/life',
    },
};

export default function LifeEnginePage() {
    return <LifeEngine />;
}
