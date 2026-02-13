import ProfileDetector from '@/components/tax-engine/ProfileDetector';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '3-Brain Tax Engine | TaxBuddy Canada',
    description: 'Intelligent tax optimization engine with personalized strategies for individuals, businesses, and investors. Get CRA audit risk scoring and scenario comparison.',
    alternates: {
        canonical: '/tools/tax-engine',
    },
};

export default function TaxEnginePage() {
    return <ProfileDetector />;
}
