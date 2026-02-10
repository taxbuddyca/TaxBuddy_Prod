-- SQL Migration for Pricing Plans Table
-- Create a table for pricing plans
CREATE TABLE IF NOT EXISTS pricing_plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    tag TEXT,
    popular BOOLEAN DEFAULT false,
    features TEXT [] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable RLS
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
-- Allow public read access
CREATE POLICY "Allow public read to pricing_plans" ON pricing_plans FOR
SELECT USING (true);
-- Only authenticated admins can modify pricing plans
CREATE POLICY "Allow authenticated admins to modify pricing_plans" ON pricing_plans FOR ALL TO authenticated USING (true);
-- Initial data seed
INSERT INTO pricing_plans (name, price, tag, popular, features, order_index)
VALUES (
        'Growth',
        '$299',
        'Small Businesses',
        false,
        ARRAY ['Bi-weekly Bookkeeping', 'GST/HST Filings', 'Corporate Tax Return', 'Basic Portal Access', 'Email Support'],
        1
    ),
    (
        'Enterprise',
        '$599',
        'Most Popular',
        true,
        ARRAY ['Real-time Reporting', 'Payroll (up to 5)', 'Tax Planning Session', 'Admin Dash Access', 'Unlimited Priority Support', 'Dedicated CPA Pod'],
        2
    ),
    (
        'Controllership',
        'Custom',
        'Scale-ups',
        false,
        ARRAY ['Dedicated Finance Team', 'CFO Advisory', 'Audit Defence & Support', 'Advanced API Access', 'Custom SaaS Integration', 'Strategic R&D Credits'],
        3
    ) ON CONFLICT (id) DO NOTHING;