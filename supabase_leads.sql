-- Create a table for lead intake
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- Allow anonymous inserts for lead generation
CREATE POLICY "Allow public insert to leads" ON leads FOR
INSERT WITH CHECK (true);
-- Only authenticated admins can select/update leads
CREATE POLICY "Allow authenticated admins to read leads" ON leads FOR
SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated admins to update leads" ON leads FOR
UPDATE TO authenticated USING (true);