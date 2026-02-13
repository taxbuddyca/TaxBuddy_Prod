import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const posts = [
    {
        title: "First Home Savings Account (FHSA): What You Need to Know",
        slug: "fhsa-guide-canada",
        category: "Tax News",
        excerpt: "The new FHSA allows prospective first-time home buyers to save for their first home tax-free. Here is how it works.",
        cover_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
        content: `
# First Home Savings Account (FHSA)

The Tax-Free First Home Savings Account (FHSA) is a new registered plan to help prospective first-time home buyers save for their first home.

## Key Features
*   **Tax-Deductible Contributions**: Like an RRSP, contributions you make to an FHSA are tax-deductible.
*   **Tax-Free Withdrawals**: Like a TFSA, withdrawals to purchase a qualifying home are tax-free.
*   **Annual Limit**: You can contribute up to $8,000 per year.
*   **Lifetime Limit**: The lifetime contribution limit is $40,000.

## Eligibility
To open an FHSA, you must be:
*   A resident of Canada
*   At least 18 years of age
*   A first-time home buyer

This is a powerful tool for Canadians looking to enter the housing market. Contact us to set up a plan to maximize your contributions.
        `
    },
    {
        title: "2024 Tax Brackets and Basic Personal Amount",
        slug: "2024-tax-brackets-canada",
        category: "Tax News",
        excerpt: "Inflation has pushed the federal tax brackets higher for 2024. See where you fall and how to plan.",
        cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
        content: `
# 2024 Canadian Tax Brackets

The Canada Revenue Agency (CRA) has announced the indexation adjustment for personal income tax brackets for 2024 is 4.7%.

## Federal Tax Brackets for 2024
*   15% on the first $55,867 of taxable income
*   20.5% on the portion of taxable income over $55,867 up to $111,733
*   26% on the portion of taxable income over $111,733 up to $173,205
*   29% on the portion of taxable income over $173,205 up to $246,752
*   33% on taxable income over $246,752

## Basic Personal Amount
The Basic Personal Amount (BPA) has also increased to $15,705. This means you can earn up to this amount before paying any federal income tax.
        `
    },
    {
        title: "Line 31270: Home Buyers' Amount",
        slug: "line-31270-home-buyers-amount",
        category: "Tips",
        excerpt: "Did you buy a home this year? You might be eligible for a $10,000 non-refundable tax credit.",
        cover_image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80&w=1000",
        content: `
# Home Buyers' Amount (Line 31270)

If you purchased a qualifying home in the tax year, you can claim up to $10,000 on Line 31270 of your return.

## Value of the Credit
Since this is a non-refundable tax credit calculated at the lowest federal tax rate (15%), the maximum tax savings is **$1,500**.

## Qualifying Home
To qualify, the home must be registered in your name or your spouse's name and must be located in Canada. It can be existing or under construction.

## First-Time Home Buyer
You are considered a first-time home buyer if you did not live in another home that you or your spouse owned in the year of acquisition or in any of the four preceding years.
        `
    },
    {
        title: "Payroll Deductions: A Guide for Employers",
        slug: "payroll-deductions-guide",
        category: "Business",
        excerpt: "Understanding CPP, EI, and Income Tax deductions is critical for every Canadian employer.",
        cover_image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1000",
        content: `
# Mastering Payroll Deductions

As an employer, you are responsible for deducting, remitting, and reporting payroll deductions. Failure to do so can result in significant penalties.

## The Big Three
1.  **Canada Pension Plan (CPP)**: Both you and the employee contribute. For 2024, the maximum pensionable earnings are $68,500.
2.  **Employment Insurance (EI)**: Employees contribute a percentage of their earnings, and employers contribute 1.4 times the employee amount.
3.  **Income Tax**: Deducted from the employee's pay based on their TD1 forms and tax tables.

## Remittance Schedule
Depending on your payroll size, you may be a regular remitter (due the 15th of the following month) or a quarterly remitter. Always check your status with the CRA.
        `
    }
];

async function seedBlog() {
    console.log("Seeding blog posts...");

    for (const post of posts) {
        const { data, error } = await supabase
            .from('posts')
            .upsert(
                { ...post, published_at: new Date().toISOString() },
                { onConflict: 'slug' }
            )
            .select();

        if (error) {
            console.error(`Error inserting ${post.title}:`, error.message);
        } else {
            console.log(`Success: ${post.title}`);
        }
    }
    console.log("Seeding complete.");
}

seedBlog();
