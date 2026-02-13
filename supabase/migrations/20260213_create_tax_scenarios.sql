-- Create tax_scenarios table for saving user tax optimization scenarios
CREATE TABLE IF NOT EXISTS tax_scenarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    brain_type TEXT NOT NULL CHECK (brain_type IN ('life', 'growth', 'niche')),
    scenario_type TEXT NOT NULL,
    facts JSONB NOT NULL,
    results JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_tax_scenarios_user_id ON tax_scenarios(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_scenarios_brain_type ON tax_scenarios(brain_type);
CREATE INDEX IF NOT EXISTS idx_tax_scenarios_created_at ON tax_scenarios(created_at DESC);
-- Enable Row Level Security
ALTER TABLE tax_scenarios ENABLE ROW LEVEL SECURITY;
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own scenarios" ON tax_scenarios;
DROP POLICY IF EXISTS "Users can insert their own scenarios" ON tax_scenarios;
DROP POLICY IF EXISTS "Users can update their own scenarios" ON tax_scenarios;
DROP POLICY IF EXISTS "Users can delete their own scenarios" ON tax_scenarios;
-- Create RLS policies
CREATE POLICY "Users can view their own scenarios" ON tax_scenarios FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own scenarios" ON tax_scenarios FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own scenarios" ON tax_scenarios FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own scenarios" ON tax_scenarios FOR DELETE USING (auth.uid() = user_id);
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_tax_scenarios_updated_at ON tax_scenarios;
CREATE TRIGGER update_tax_scenarios_updated_at BEFORE
UPDATE ON tax_scenarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();