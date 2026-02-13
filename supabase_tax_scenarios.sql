-- Create Tax Scenarios Table
CREATE TABLE IF NOT EXISTS public.tax_scenarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    name TEXT NOT NULL,
    brain_type TEXT NOT NULL,
    -- 'life', 'growth', 'niche'
    scenario_type TEXT NOT NULL,
    facts JSONB NOT NULL,
    results JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- RLS Policies
ALTER TABLE public.tax_scenarios ENABLE ROW LEVEL SECURITY;
-- Policy: Users can view their own scenarios
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'tax_scenarios'
        AND policyname = 'Users can view own scenarios'
) THEN CREATE POLICY "Users can view own scenarios" ON public.tax_scenarios FOR
SELECT TO authenticated USING (auth.uid() = user_id);
END IF;
END $$;
-- Policy: Users can insert their own scenarios
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'tax_scenarios'
        AND policyname = 'Users can create own scenarios'
) THEN CREATE POLICY "Users can create own scenarios" ON public.tax_scenarios FOR
INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
END IF;
END $$;
-- Policy: Users can delete their own scenarios
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'tax_scenarios'
        AND policyname = 'Users can delete own scenarios'
) THEN CREATE POLICY "Users can delete own scenarios" ON public.tax_scenarios FOR DELETE TO authenticated USING (auth.uid() = user_id);
END IF;
END $$;