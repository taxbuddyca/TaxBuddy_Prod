
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const samplePosts = [
    {
        title: "How to Avoid Mistakes on Box 85 of the T4 Slip",
        slug: "avoid-mistakes-box-85-t4-slip",
        category: "Guides",
        author: "TaxBuddy Team",
        excerpt: "Filing T4s can be tricky. Here’s a quick guide on ensuring your employee benefits and premiums are correctly reported in Box 85.",
        content: `
            <p>Box 85 on the T4 slip is often a source of confusion for many employers. It is used to report the employee-paid portion of premiums for private health services plans.</p>
            <h3>Why is this important?</h3>
            <p>Reporting this correctly ensures your employees can claim these amounts as medical expenses on their personal tax returns. If missed, you might need to amend T4s later, which is administratively burdensome.</p>
            <h3>Common Mistakes</h3>
            <ul>
                <li><strong>Reporting employer contributions:</strong> Only the employee's portion should be included.</li>
                <li><strong>Including provincial plan premiums:</strong> Only private health services plans qualify.</li>
            </ul>
            <p>Make sure to review your payroll setup before year-end to automate this calculation.</p>
        `,
        tags: ["Payroll", "T4", "Compliance"],
        cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
        published_at: new Date().toISOString()
    },
    {
        title: "Commission Expenses Must Stay in Current Year",
        slug: "commission-expenses-current-year",
        category: "Accounting",
        author: "TaxBuddy Team",
        excerpt: "Tax Court confirms that commission expenses cannot be deferred. Learn how this impacts your accrual accounting.",
        content: `
            <p>A recent Tax Court of Canada decision has reaffirmed that commission expenses must be deducted in the year they are incurred, matching the revenue they helped generate.</p>
            <h3>Accrual vs. Cash Basis</h3>
            <p>For most corporations, accrual accounting is required. This means if a salesperson earns a commission in December 2024, the expense belongs to 2024, even if paid in January 2025.</p>
            <p>Ensure your year-end adjusting entries capture all unpaid commissions to reduce your taxable income for the current year.</p>
        `,
        tags: ["Tax Court", "Deductions", "Corporate Tax"],
        cover_image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000",
        published_at: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
    },
    {
        title: "Canada's Carbon Rebate for Small Businesses",
        slug: "canada-carbon-rebate-small-business",
        category: "Small Business",
        author: "TaxBuddy Team",
        excerpt: "Eligible Canadian-controlled private corporations (CCPCs) can now access the new Carbon Rebate. Are you eligible?",
        content: `
            <p>The Canada Carbon Rebate for Small Businesses is a refundable tax credit designed to return a portion of fuel charge proceeds to eligible businesses.</p>
            <h3>Eligibility Criteria</h3>
            <ul>
                <li>Must be a CCPC.</li>
                <li>Must file a tax return for the applicable year.</li>
                <li>Must have employees in designated provinces.</li>
            </ul>
            <p>The rebate is calculated based on the number of employees in these provinces. No application is needed; the CRA will automatically determine your eligibility when you file.</p>
        `,
        tags: ["Rebates", "CRA", "Small Business"],
        cover_image: "https://images.unsplash.com/photo-1532619187553-f41152a1ebd6?auto=format&fit=crop&q=80&w=1000",
        published_at: new Date(Date.now() - 86400000 * 15).toISOString() // 15 days ago
    }
];

async function seedBlog() {
    console.log("Seeding Blog Posts...");

    // Check if posts exist
    const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true });

    if (count && count > 0) {
        console.log(`Found ${count} existing posts. Skipping seed.`);
        return;
    }

    const { data, error } = await supabase.from('posts').insert(samplePosts).select();

    if (error) {
        console.error("Error seeding posts:", error);
    } else {
        console.log(`Successfully seeded ${data.length} posts.`);
    }
}

seedBlog();
