import ProfileDetector from '@/components/tax-engine/ProfileDetector';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '3-Brain Tax Engine™: Personalized Tax Strategies | TaxBuddy',
    description: 'Intelligent tax optimization engine providing personalized strategies for individuals, businesses, and investors to beat the CRA system legally.',
    keywords: ['tax optimization Canada', 'AI tax planning', 'custom tax strategy', 'CRA audit risk', 'tax strategy engine', 'reduce taxes Canada'],
    alternates: {
        canonical: '/tools/tax-engine',
    },
    openGraph: {
        title: '3-Brain Tax Engine™ | TaxBuddy Canada',
        description: 'Get advanced, personalized tax strategies designed to maximize your return and minimize CRA audit risk.',
        url: 'https://taxbuddycanada.ca/tools/tax-engine',
        siteName: 'TaxBuddy Canada',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: '3-Brain Tax Engine™ | TaxBuddy Canada',
        description: 'Intelligent AI-driven tax optimization engine for Canadians. Get personalized strategies instantly.',
    }
};

export default function TaxEnginePage() {
    return <ProfileDetector />;
}
