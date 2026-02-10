-- SQL Migration Script for Supabase setup
-- 1. Create Pricing Table
CREATE TABLE public.pricing_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    tag TEXT,
    popular BOOLEAN DEFAULT false,
    features TEXT [] DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- 2. Insert Initial Data
INSERT INTO public.pricing_plans (name, price, tag, popular, features)
VALUES (
        'Growth',
        '$299',
        'Small Businesses',
        false,
        '{"Bi-weekly Bookkeeping", "GST/HST Filings", "Corporate Tax Return", "Basic Portal Access"}'
    ),
    (
        'Enterprise',
        '$599',
        'Most Popular',
        true,
        '{"Real-time Reporting", "Payroll (up to 5)", "Tax Planning Session", "Admin Dash Access", "Unlimited Support"}'
    ),
    (
        'Controllership',
        'Custom',
        'Scale-ups',
        false,
        '{"Dedicated Finance Team", "CFO Advisory", "Audit Support", "Advanced API Access", "Custom Integration"}'
    );
-- 3. Enable RLS
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
-- 4. Polices
CREATE POLICY "Public profiles are viewable by everyone." ON public.pricing_plans FOR
SELECT USING (true);
CREATE POLICY "Admins can update pricing." ON public.pricing_plans FOR ALL USING (auth.jwt()->>'email' LIKE '%@taxbuddy.ca');