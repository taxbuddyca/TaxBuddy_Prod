
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
    // --- EXISTING POSTS (Kept for idempotency checks) ---
    {
        title: "2026 Canadian Tax Brackets: What You Need to Know",
        slug: "2026-canadian-tax-brackets-update",
        category: "Tax News",
        excerpt: "An overview of the federal and provincial tax brackets for the 2026 tax year. Understand how inflation adjustments affect your take-home pay.",
        content: `# 2026 Canadian Tax Brackets: What You Need to Know\n\nAs we enter the 2026 tax year, the Canada Revenue Agency (CRA) has adjusted federal tax brackets and non-refundable tax credits to account for inflation. This indexation is crucial for ensuring that your purchasing power isn't eroded by "bracket creep."\n\n## Federal Tax Brackets for 2026\n\n(Note: These figures are estimates based on standard inflation adjustments. Consult the CRA website for official finalized numbers.)\n\n- **15%** on the first $57,000 of taxable income,\n- **20.5%** on the portion of taxable income over $57,000 up to $114,000,\n- **26%** on the portion of taxable income over $114,000 up to $177,000,\n- **29%** on the portion of taxable income over $177,000 up to $253,000,\n- **33%** of taxable income over $253,000.\n\n## Basic Personal Amount (BPA)\n\nThe Basic Personal Amount continues to increase. For 2026, most Canadians can earn up to approximately $16,500 without paying any federal income tax. This amount is gradually reduced for high-income earners.\n\n## Planning Tips\n\n1. **Check Your Pay Stub:** Ensure your employer has updated your tax deductions based on the new TD1 forms.\n2. **RRSP Contributions:** Higher income brackets might make RRSP contributions even more valuable for reducing your taxable income.\n3. **Review Installments:** If you are self-employed, review your quarterly tax installments to match your projected 2026 income.\n\nStaying informed about these changes is the first step in effective tax planning for the year ahead.`,
        cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date().toISOString()
    },
    {
        title: "RRSP vs. TFSA: Choosing the Right Vehicle for Your Goals",
        slug: "rrsp-vs-tfsa-comparison-canada",
        category: "Financial Planning",
        excerpt: "Confused between RRSPs and TFSAs? We break down the key differences, contribution limits, and withdrawal rules to help you decide.",
        content: `# RRSP vs. TFSA: Choosing the Right Vehicle for Your Goals\n\nTwo of the most powerful tools for Canadian investors are the Registered Retirement Savings Plan (RRSP) and the Tax-Free Savings Account (TFSA). While both offer tax advantages, they serve different purposes.\n\n## The Breakdown\n\n### RRSP (Registered Retirement Savings Plan)\n- **Primary Goal:** Retirement savings.\n- **Tax Benefit:** Contributions are tax-deductible (reduce your taxable income now). Growth is tax-deferred.\n- **Withdrawals:** Taxed as income when you withdraw.\n- **Best For:** High-income earners looking to lower their tax bill today.\n\n### TFSA (Tax-Free Savings Account)\n- **Primary Goal:** Short to medium-term goals, or tax-free retirement income.\n- **Tax Benefit:** Contributions are **not** tax-deductible (made with after-tax dollars). Growth is completely tax-free.\n- **Withdrawals:** Completely tax-free.\n- **Best For:** Lower-income earners, saving for a down payment, or an emergency fund.\n\n## The Decision Matrix\n\n| Scenario | Winner |\n| :--- | :--- |\n| Earning > $100k/year | **RRSP** |\n| Earning < $50k/year | **TFSA** |\n| Saving for House (FHSA aside) | **RRSP** (HBP) or **TFSA** |\n| Need Flexibility | **TFSA** |\n\nIdeally, a balanced financial plan often utilizes both accounts to maximize tax efficiency over your lifetime. Consult with a financial planner to see what mix is right for you.`,
        cover_image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
        title: "Self-Employed? Don't Miss These Deductible Expenses",
        slug: "self-employed-tax-deductions-canada",
        category: "Self-Employment",
        excerpt: "Maximize your tax return by claiming all eligible business expenses. From home office costs to vehicle mileage, here is your checklist.",
        content: `# Self-Employed? Don't Miss These Deductible Expenses\n\nRunning your own business or freelancing in Canada comes with perks, and one of them is the ability to deduct reasonable business expenses to lower your taxable income.\n\n## Top Deductions Checklist\n\n### 1. Home Office Expenses\nIf you use a workspace in your home exclusively for earning business income, or if you meet clients there regularly, you can deduct a portion of:\n- Utilities (Heat, Hydro, Water)\n- Internet\n- Maintenance & Repairs\n- Rent (if you rent) or Property Taxes/Mortgage Interest (if you own)\n\n### 2. Vehicle Expenses\nKeep a mileage log! You can deduct the percentage of business use for:\n- Gas & Oil\n- Insurance\n- Repairs\n- Lease payments or Capital Cost Allowance (CCA)\n\n### 3. Advertising & Marketing\nWebsite hosting, business cards, online ads, and promotional materials are 100% deductible.\n\n### 4. Professional Fees\nAccounting fees (like hiring TaxBuddy!), legal fees, and memberships in professional organizations.\n\n### 5. Office Supplies\nSoftware subscriptions (Adobe, Office 365), stationery, stamps, and pens.\n\n## The Golden Rule\n\n**Keep your receipts.** If the CRA audits you, a credit card statement is often not enough. You need the itemized receipt showing what was purchased. Digital copies are acceptable and highly recommended.`,
        cover_image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    },
    {
        title: "Understanding the Multi-Generational Home Renovation Tax Credit",
        slug: "multigenerational-home-renovation-tax-credit",
        category: "Tips",
        excerpt: "Building a secondary suite for a senior or disabled family member? You could claim up to $50,000 in qualifying expenditures.",
        content: `# Understanding the Multi-Generational Home Renovation Tax Credit (MHRTC)\n\nFor families looking to live together and support one another, the Canadian government introduced the MHRTC. This refundable tax credit is designed to assist with the cost of renovating an eligible dwelling to establish a secondary unit.\n\n## What is it?\n\nThe credit allows you to claim up to **$50,000** in qualifying expenditures for each qualifying renovation. The tax credit is **15%** of your costs, meaning a maximum refund of **$7,500**.\n\n## Who is Eligible?\n- **Qualifying Individual:** A senior (65+) or an adult eligible for the disability tax credit.\n- **Qualifying Relation:** A parent, grandparent, child, grandchild, brother, sister, aunt, uncle, niece, or nephew of the qualifying individual (or their spouse).\n\n## What Renovations Qualify?\nThe renovation must create a self-contained secondary unit (private entrance, kitchen, bathroom, sleeping area) within the home. Examples include:\n- Basement suites\n- Garden suites (laneway homes)\n- Additions to the existing home\n\n## Ineligible Expenses\n- Furniture or appliances\n- Routine maintenance (cleaning, gardening)\n- Tools or equipment rentals\n\nBe sure to keep all contracts and invoices related to the construction. This credit can significantly offset the high cost of creating a multi-generational home.`,
        cover_image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
    },
    {
        title: "GST/HST Returns: Determining Your Filing Frequency",
        slug: "gst-hst-filing-frequency-guide",
        category: "Accounting",
        excerpt: "Annual, Quarterly, or Monthly? How to determine when you need to file and remit your sales tax to the CRA.",
        content: `# GST/HST Returns: Determining Your Filing Frequency\n\nIf your business is registered for GST/HST, knowing when to file is critical to avoiding penalties and interest.\n\n## Thresholds for Filing Periods\n\nThe CRA assigns your filing period based on your annual taxable supplies (sales) from the previous fiscal year.\n\n### 1. Annual Filer\n- **Threshold:** Annual taxable supplies of **$1.5 million or less**.\n- **Requirement:** File once a year. However, if you owe more than $3,000 in net tax, you may need to make quarterly installment payments the following year.\n\n### 2. Quarterly Filer\n- **Threshold:** Annual taxable supplies of **more than $1.5 million up to $6 million**.\n- **Requirement:** File and remit every 3 months.\n\n### 3. Monthly Filer\n- **Threshold:** Annual taxable supplies of **more than $6 million**.\n- **Requirement:** File and remit every month.\n\n## Can I Change My Frequency?\n\nYes! You can often elect to file more frequently (e.g., monthly instead of quarterly) if you want to get your refund checks faster (common for exporters or startups with high expenses). However, you generally cannot elect to report *less* frequently than your threshold allows.\n\nLog in to your CRA My Business Account to view your current assigned period and make changes.`,
        cover_image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 345600000).toISOString() // 4 days ago
    },
    {
        title: "Financial Literacy 101: Teaching Kids About Money",
        slug: "financial-literacy-for-kids-canada",
        category: "Education",
        excerpt: "It's never too early to start. Strategies for introducing concepts of earning, saving, and investing to the next generation.",
        content: `# Financial Literacy 101: Teaching Kids About Money\n\nBuilding strong financial habits starts at home. In an era of digital transactions and "invisible money," teaching kids the value of a dollar is harder—and more important—than ever.\n\n## Age-Appropriate Lessons\n\n### Ages 3-5: The Basics\n- **Concept:** Money buys things.\n- **Activity:** Play store with fake money. Explain that you exchange coins for toys or treats.\n\n### Ages 6-10: Earning and Saving\n- **Concept:** Money is earned.\n- **Activity:** Give an allowance tied to chores. Use three jars: **Spend**, **Save**, and **Give**. Visualizing the pile growing in the "Save" jar is powerful.\n\n### Ages 11-14: Budgeting and Opportunity Cost\n- **Concept:** You can't have everything.\n- **Activity:** Involve them in deeper shopping decisions. "We have $100 for back-to-school clothes. If you buy these expensive shoes, you won't have enough for the hoodie you want."\n\n### Ages 15+: Investing and Credit\n- **Concept:** Money can grow; Debt costs money.\n- **Activity:** Help them open a student bank account. Explain compound interest. If they borrow money from you, charge a small "interest rate" so they understand the cost of borrowing.\n\nSetting this foundation prepares them for the complex financial decisions of adulthood, from student loans to mortgages.`,
        cover_image: "https://images.unsplash.com/photo-1565514020176-db7936a7d5ea?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 432000000).toISOString() // 5 days ago
    },
    // --- NEW POSTS ---
    {
        title: "The First Home Savings Account (FHSA): A Game Changer",
        slug: "first-home-savings-account-guide",
        category: "Financial Planning",
        excerpt: "The FHSA combines the best of RRSPs and TFSAs for aspiring homeowners. Learn how you can save up to $40,000 tax-free.",
        content: `# The First Home Savings Account (FHSA): A Game Changer\n\nLooking to buy your first home? The new Tax-Free First Home Savings Account (FHSA) is arguably the best savings vehicle Canada has ever introduced.\n\n## Best of Both Worlds\n\nThe FHSA is unique because it offers:\n1. **Tax Deductions** on contributions (like an RRSP).\n2. **Tax-Free Withdrawals** for a qualifying home purchase (like a TFSA).\n\n## Key Details\n- **Contribution Limit:** $8,000 per year.\n- **Lifetime Limit:** $40,000.\n- **Carry Forward:** You can carry forward up to $8,000 of unused contribution room to the next year.\n- **Eligibility:** You must be a Canadian resident, at least 18 years old, and a first-time home buyer.\n\n## Strategic Use\nEven if you aren't sure if you'll buy a home, opening an FHSA can be smart. If you don't buy a home, you can transfer the funds tax-free to your RRSP without using your RRSP contribution room. It's effectively $40,000 of extra RRSP room!\n\nStart contributing today to maximize your down payment potential.`,
        cover_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 518400000).toISOString()
    },
    {
        title: "Capital Gains Inclusion Rate Update: Who Does it Affect?",
        slug: "capital-gains-inclusion-rate-change-2025",
        category: "Tax News",
        excerpt: "The inclusion rate for capital gains has increased from 50% to 66.67% for certain gains. Find out if your portfolio or cottage sale will be impacted.",
        content: `# Capital Gains Inclusion Rate Update: Who Does it Affect?\n\nOne of the most significant changes in recent budgets is the adjustment to the Capital Gains Inclusion Rate. This change aims to improve tax fairness but has implications for investors and business owners.\n\n## The Change\n\nPreviously, 50% of any capital gain was taxable. Effective June 25, 2024, the inclusion rate increased to **66.67% (2/3)** for:\n- Corporations and Trusts (on all capital gains).\n- Individuals (on the portion of capital gains **exceeding $250,000** in a year).\n\n## Who is Safe?\nMost Canadians will **not** be affected. If you are selling a stock portfolio with a $20,000 gain, your inclusion rate remains 50%. The $250,000 threshold for individuals is quite high.\n\n## Who is Impacted?\n1. **Cottage Owners:** If you sell a secondary property with significant appreciation (e.g., a $500,000 gain), the amount over $250,000 will be taxed at the higher rate.\n2. **Business Owners:** Selling a business inside a corporation or personally might trigger higher taxes.\n3. **Estate Executors:** Upon death, deemed disposition of assets might push total gains over the $250k limit.\n\nTalk to your accountant about timing your asset sales to potentially spread gains over multiple years to stay under the threshold.`,
        cover_image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 604800000).toISOString()
    },
    {
        title: "The Canada Carbon Rebate: Dates and Amounts",
        slug: "canada-carbon-rebate-dates",
        category: "Tax News",
        excerpt: "Formerly the Climate Action Incentive Payment (CAIP). Check your bank account on these dates to receive your quarterly tax-free payments.",
        content: `# The Canada Carbon Rebate (CCR): Dates and Amounts\n\nThe federal pollution pricing system returns the majority of proceeds directly to families through the Canada Carbon Rebate. This is a tax-free quarterly payment.\n\n## Payment Dates\nPayments are generally issued on the 15th of:\n- **April**\n- **July**\n- **October**\n- **January**\n\n## Eligibility\nYou must file your income tax return to receive this! Even if you have no income, filing your return is the trigger for the CRA to calculate and send your payment.\n\n## Rural Top-up\nResidents of small and rural communities are now eligible for a **20% supplement** (increased from 10%) on their base amount. You must tick the box on page 2 of your tax return to claim this rural residency.\n\nDirect deposit is the fastest way to get your money. Ensure your banking info is up to date with the CRA.`,
        cover_image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 691200000).toISOString()
    },
    {
        title: "Canadian Dental Care Plan (CDCP): What You Need to Know",
        slug: "canadian-dental-care-plan-eligibility",
        category: "Tips",
        excerpt: "The CDCP is rolling out to specific age groups. See if you qualify for coverage to help with the cost of oral health care.",
        content: `# Canadian Dental Care Plan (CDCP): What You Need to Know\n\nThe CDCP is a federal program helping eligible Canadian residents access oral health care services.\n\n## Eligibility Criteria\nTo qualify, you must:\n1. Not have access to dental insurance (e.g., through an employer, pension, or private plan).\n2. Have an adjusted family net income of less than **$90,000**.\n3. Be a resident of Canada for tax purposes.\n4. Have filed your tax return.\n\n## Phased Rollout\nApplications opened in phases:\n- Seniors aged 87+ (Started Dec 2023)\n- Seniors aged 70-86 (Early 2024)\n- Seniors aged 65-69 (May 2024)\n- Children under 18 and people with a valid Disability Tax Credit certificate (June 2024)\n- All remaining eligible residents (2025)\n\n## Coverage\nDepending on your income, the plan covers between **40% to 100%** of eligible dental costs. You may still have a co-payment if your income is between $70,000 and $90,000.\n\nCheck the Service Canada website to apply online.`,
        cover_image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 777600000).toISOString()
    },
    {
        title: "Digital News Subscription Tax Credit: Support Local Journalism",
        slug: "digital-news-subscription-tax-credit",
        category: "Tips",
        excerpt: "Did you know you can claim up to $500 for digital news subscriptions? Learn how to claim this credit on your tax return.",
        content: `# Digital News Subscription Tax Credit\n\nTo support Canadian journalism, the government offers a non-refundable tax credit for subscriptions to Qualifying Canadian Journalism Organizations (QCJO).\n\n## The Benefit\nYou can claim up to **$500** per year for eligible digital news subscriptions. The credit is calculate at the lowest personal income tax rate (15%), meaning you could get a maximum tax reduction of **$75**.\n\n## Eligible Subscriptions\nThe subscription must be for digital content (e.g., website access, e-newspaper) provided by a QCJO. Common examples likely include major Canadian digital papers like The Globe and Mail, Toronto Star, La Presse, etc. (Check their invoices, they usually state eligibility).\n\n## How to content\nKeep your receipt! Line 31350 on your T1 return is where you enter the total amount paid. If you share a subscription with a spouse or partner, you can split the claim, but the total combined claim cannot exceed $500.\n\nThis credit is currently slated to expire, so make sure to take advantage of it while it's available.`,
        cover_image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 864000000).toISOString()
    },
    {
        title: "Sole Proprietorship vs. Incorporation: When to Switch?",
        slug: "sole-proprietorship-vs-incorporation-canada",
        category: "Self-Employment",
        excerpt: "As your business grows, you might wonder if it's time to incorporate. We analyze the tax deferral advantages and administrative costs.",
        content: `# Sole Proprietorship vs. Incorporation: When to Switch?\n\nStarting as a sole proprietor is easy and cheap. But as your profits grow, the tax bite can become painful. Is it time to incorporate?\n\n## Sole Proprietorship\n- **Pros:** Simple setup, low cost, easy tax filing (T2125 form on personal return).\n- **Cons:** Unlimited liability (your personal assets are at risk), high personal tax rates on high income.\n\n## Incorporation\n- **Pros:** Limited liability (legal separation), **Tax Deferral**.\n- **Cons:** Higher setup costs, annual legal filings, separate corporate tax return (T2).\n\n## The Tipping Point\nThe main tax reason to incorporate is **Tax Deferral**. Small businesses pay a low corporate tax rate (approx. 12.2% in Ontario, varies by province) on active business income up to $500,000.\n\nCompare this to the top personal marginal rate (over 53% in some provinces). \n\n**The Rule of Thumb:** If you are earning more money than you need to live on, and can leave significant savings *inside* the corporation to invest or grow the business, incorporation makes sense. If you pull out every dollar you earn to pay for personal living expenses, incorporation rarely saves you tax and costs more to maintain.`,
        cover_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 950400000).toISOString()
    },
    {
        title: "Claiming Medical Expenses on Your Tax Return",
        slug: "claiming-medical-expenses-canada",
        category: "Tips",
        excerpt: "From dental work to gluten-free food, the list of eligible medical expenses is long. Learn how to bundle them for the biggest refund.",
        content: `# Claiming Medical Expenses on Your Tax Return\n\nThe Medical Expense Tax Credit (METC) is an underutilized goldmine for many Canadian families.\n\n## How it Works\nIt is a non-refundable credit. You can claim eligible medical expenses paid for yourself, your spouse, and your children.\n\n**The Threshold:** You can only claim expenses that exceed **3% of your net income** or **$2,635** (whichever is lower, 2024 threshold indexed). \n\n**Strategy:** Because of the threshold, it almost always makes sense for the **lower-income spouse** to claim the medical expenses, as their 3% threshold will be lower to reach.\n\n## What is Eligible?\n- Prescription drugs\n- Dental services\n- Eyeglasses and contact lenses\n- Laser eye surgery\n- Orthodontics\n- Private health insurance premiums (deducted from your pay)\n- Travel for medical services (if > 40km away)\n- Glue-free food (the incremental cost) for Celiacs\n\n## What is NOT Eligible?\n- Gym memberships\n- Over-the-counter vitamins and supplements\n- Cosmetic surgery (purely for looks)\n\nYou can claim expenses from any **12-month period** ending in the tax year, not just the calendar year. Pick the 12 months with the highest costs!`,
        cover_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 1036800000).toISOString()
    },
    {
        title: "Disability Tax Credit (DTC): Accessing Benefits",
        slug: "disability-tax-credit-application-guide",
        category: "Tax News",
        excerpt: "The DTC is a gateway to further benefits like the RDSP. Here is how to determine eligibility and apply.",
        content: `# Disability Tax Credit (DTC): Accessing Benefits\n\nThe DTC is a non-refundable tax credit that helps persons with disabilities or their supporting persons reduce the amount of income tax they may have to pay.\n\n## Why is it Important?\nBeing approved for the DTC is the "key" to unlocking other programs:\n1. **Registered Disability Savings Plan (RDSP):** Incredible gov't matching grants.\n2. **Canada Workers Benefit disability supplement.**\n3. **Child Disability Benefit.**\n\n## Eligibility\nYou must have a severe and prolonged impairment in physical or mental functions. "Prolonged" means it has lasted or is expected to last for at least 12 months. "Severe" typically means you are restricted at least 90% of the time.\n\n## How to Apply\n1. Download Form **T2201**, Disability Tax Credit Certificate.\n2. Fill out Part A yourself.\n3. Take the form to a medical practitioner (Doctor, Nurse Practitioner, Optometrist, Audiologist, etc.) to complete Part B.\n4. Submit via CRA My Account.\n\nIf approved, the CRA will tell you for which years you are valid. You can often ask for a readjustment of prior years' tax returns to claim the credit retroactively (up to 10 years).`,
        cover_image: "https://images.unsplash.com/photo-1616168923058-2946be484439?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 1123200000).toISOString()
    },
    {
        title: "Payroll 101 for Small Business Owners",
        slug: "payroll-basics-for-canadian-business",
        category: "Accounting",
        excerpt: "Hiring your first employee? Learn the basics of source deductions (CPP, EI, Tax) and remittance deadlines.",
        content: `# Payroll 101 for Small Business Owners\n\nTransitioning from a solopreneur to an employer is a big milestone. It also comes with strict responsibilities.\n\n## The Big Three Deductions\nYou are responsible for withholding and remitting:\n1. **Income Tax** (Federal & Provincial)\n2. **Canada Pension Plan (CPP)** - You deduct the employee portion AND pay a matching employer portion.\n3. **Employment Insurance (EI)** - You deduct the employee portion AND pay the employer portion (1.4x the employee amount).\n\n## Open a Payroll Account\nYou need to add a payroll program account (RP) to your Business Number before you pay your first employee.\n\n## Remittance Schedule\nMost new employers are "Regular Remitters," meaning you must remit deductions by the **15th of the month following the month** you paid your employees. (e.g., Pay employees in January -> Remit by Feb 15).\n\n## Penalties\nThe CRA does not mess around with payroll. Penalties for late remittance start at 3% and go up to 20%. The money you withhold is considered "trust funds"—it's not your money to use for cash flow.\n\nConsider using payroll software (Wagepoint, QuickBooks Payroll, PaymentEvolution) to automate calculations and remittances.`,
        cover_image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 1209600000).toISOString()
    },
    {
        title: "The Lifetime Capital Gains Exemption (LCGE) in 2025",
        slug: "lifetime-capital-gains-exemption-guide",
        category: "Tax News",
        excerpt: "Planning to sell your qualified small business shares or farm property? The LCGE limit is indexed to inflation and could save you huge tax bills.",
        content: `# The Lifetime Capital Gains Exemption (LCGE) in 2025\n\nFor Canadian business owners, the LCGE is the holy grail of tax planning.\n\n## What is it?\nIt allows you to sell "Qualifying Small Business Corporation Shares" (QSBCS) or qualified farm/fishing property tax-free, up to a lifetime limit.\n\n## The Limit\nThe limit is indexed inflation. For 2024, it was roughly $1,016,836. (Budget 2024 proposed increasing this to **$1.25 million** effective June 25, 2024). This means the first $1.25 million of capital gains on the sale of your business could be tax-free.\n\n## Qualifying\nThis is the tricky part. To qualify as QSBCS:\n1. **Holding Period:** You must have owned the shares for at least 24 months.\n2. **Asset Test:** At the time of sale, 90% or more of the corporation's assets must be used in an active business in Canada.\n3. **50% Test:** Throughout the 24 months prior to sale, more than 50% of assets must have been used in active business.\n\n**Purification:** Often, businesses accumulate too much cash or investments ("passive assets"), failing the 90% test. You may need to "purify" the company by paying out dividends or moving assets before a sale.\n\nConsult a TaxBuddy expert well in advance of any potential sale.`,
        cover_image: "https://images.unsplash.com/photo-1563986768494-4dee46a3d78b?auto=format&fit=crop&q=80&w=2622&ixlib=rb-4.0.3",
        published_at: new Date(Date.now() - 1296000000).toISOString()
    }
];

async function seedPosts() {
    console.log('🌱 Starting seed...');

    for (const post of posts) {
        const { data: existing } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', post.slug)
            .single();

        if (existing) {
            console.log(`Skipping existing post: ${post.title}`);
            continue;
        }

        const { error } = await supabase.from('posts').insert([post]);

        if (error) {
            console.error(`Error inserting ${post.title}:`, error.message);
        } else {
            console.log(`✅ Inserted: ${post.title}`);
        }
    }

    console.log('✨ Seed complete!');
}

seedPosts().catch((err) => {
    console.error(err);
    process.exit(1);
});
