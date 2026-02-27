import { Metadata } from "next";

const getContent = (slug: string) => {
    switch (slug) {
        case 'tax-checklist': return { title: "19 Popular Canadian Tax Deductions & Credits", subtitle: "Maximize your refund with this comprehensive guide to deductions and credits recognized by the CRA." };
        case 'rrsp-limits': return { title: "Understanding RRSP Contribution Limits", subtitle: "A beginner's guide to how contribution room is generated, calculated, and carried forward." };
        case 'dividend-tax': return { title: "How Dividends are Taxed in Canada", subtitle: "Decode the technical process of dividend 'gross-up' and tax credits." };
        case 'tax-withholding': return { title: "Income Tax Withholding: Paycheque Basics", subtitle: "Why your 'take-home pay' is lower than your salary and how to adjust it." };
        case 'tax-brackets': return { title: "2025 Federal and Provincial Tax Brackets", subtitle: "A complete reference for Canada's progressive tax rates." };
        default: return { title: "Tax Resource", subtitle: "Resource content loading..." };
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const data = getContent(slug);
    return {
        title: `${data.title} | TaxBuddy Canada`,
        description: data.subtitle,
    };
}

export default function ResourceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
