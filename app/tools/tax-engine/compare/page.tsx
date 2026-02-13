import ScenarioComparison from '@/components/tax-engine/ScenarioComparison';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Compare Tax Scenarios | TaxBuddy Canada',
    description: 'Compare multiple tax optimization scenarios side-by-side to find the best strategy for your situation.',
    alternates: {
        canonical: '/tools/tax-engine/compare',
    },
};

export default function ComparisonPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-32 pb-24 flex items-center justify-center"><div className="text-xl font-bold text-navy-900/60">Loading...</div></div>}>
            <ScenarioComparison />
        </Suspense>
    );
}
