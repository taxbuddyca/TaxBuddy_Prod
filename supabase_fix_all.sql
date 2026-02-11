-- 1. Fix Leads Table
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS revenue_range TEXT;
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS services_interested TEXT [];
-- Array of strings
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS referral_source TEXT;
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS current_accounting_system TEXT;
-- 2. Create Checklists Table
CREATE TABLE IF NOT EXISTS public.checklists (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    items TEXT [] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Checklists RLS
ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'checklists'
        AND policyname = 'Allow public read access'
) THEN CREATE POLICY "Allow public read access" ON public.checklists FOR
SELECT USING (true);
END IF;
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'checklists'
        AND policyname = 'Allow admin write access'
) THEN CREATE POLICY "Allow admin write access" ON public.checklists FOR ALL TO authenticated USING (true);
END IF;
END $$;
-- 3. Fix Documents Table (Create if missing, then add columns)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS client_id UUID;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS storage_path TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS uploader_name TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS document_type TEXT;
-- Documents RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN -- Admin Access (Select All)
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'documents'
        AND policyname = 'Admins can view all documents'
) THEN CREATE POLICY "Admins can view all documents" ON public.documents FOR
SELECT TO authenticated USING (true);
END IF;
-- Admin Access (Delete)
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'documents'
        AND policyname = 'Admins can delete documents'
) THEN CREATE POLICY "Admins can delete documents" ON public.documents FOR DELETE TO authenticated USING (true);
END IF;
-- Client Access (Insert their own)
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'documents'
        AND policyname = 'Clients can upload documents'
) THEN CREATE POLICY "Clients can upload documents" ON public.documents FOR
INSERT TO authenticated WITH CHECK (auth.uid() = client_id);
END IF;
-- Client Access (Select their own)
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'documents'
        AND policyname = 'Clients can view own documents'
) THEN CREATE POLICY "Clients can view own documents" ON public.documents FOR
SELECT TO authenticated USING (auth.uid() = client_id);
END IF;
END $$;
-- 4. Clients Table (Ensure it exists for metadata)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    name TEXT,
    -- Will need a trigger to sync from auth.users meta, or manually updated
    email TEXT,
    status TEXT DEFAULT 'Active',
    files_count INTEGER DEFAULT 0,
    last_upload TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN -- Only admins should manage clients directly
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'clients'
        AND policyname = 'Admins can manage clients'
) THEN CREATE POLICY "Admins can manage clients" ON public.clients FOR ALL TO authenticated USING (true);
-- Ideally restrict to admin role
END IF;
END $$;
-- 5. Trigger to Sync New Users to Clients Table
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN
INSERT INTO public.clients (id, email, name)
VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name'
    );
RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
) THEN CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
END IF;
END $$;
-- 6. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    category TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE,
    author TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- 7. Fix Pricing Plans Table
ALTER TABLE public.pricing_plans
ADD COLUMN IF NOT EXISTS frequency TEXT;
-- Blog Posts RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN -- Public Read Access
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'posts'
        AND policyname = 'Allow public read access'
) THEN CREATE POLICY "Allow public read access" ON public.posts FOR
SELECT USING (true);
END IF;
-- Admin Write Access
IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE tablename = 'posts'
        AND policyname = 'Allow admin write access'
) THEN CREATE POLICY "Allow admin write access" ON public.posts FOR ALL TO authenticated USING (true);
END IF;
END $$;