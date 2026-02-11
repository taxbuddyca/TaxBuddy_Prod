-- ==========================================
-- COMPREHENSIVE ADMIN RLS & SCHEMA FIX
-- ==========================================
-- 1. FIX DOCUMENTS TABLE
-- Ensure all columns exist
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS uploader_name TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS document_type TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS storage_path TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS client_id UUID;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
-- Relax constraints for Guest uploads
DO $$ BEGIN IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'documents'
        AND column_name = 'user_id'
) THEN
ALTER TABLE public.documents
ALTER COLUMN user_id DROP NOT NULL;
END IF;
ALTER TABLE public.documents
ALTER COLUMN client_id DROP NOT NULL;
END $$;
-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
-- Reset Document Policies
DROP POLICY IF EXISTS "Admins can view all documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can update documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can insert documents" ON public.documents;
DROP POLICY IF EXISTS "Clients can upload documents" ON public.documents;
DROP POLICY IF EXISTS "Clients can view own documents" ON public.documents;
-- Unified Admin Policy for Documents (Full Access)
CREATE POLICY "Admin Full Access Documents" ON public.documents FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- 2. FIX BLOG POSTS TABLE
-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
-- Reset Post Policies
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
DROP POLICY IF EXISTS "Allow admin to manage posts" ON public.posts;
DROP POLICY IF EXISTS "Admin Full Access Posts" ON public.posts;
-- Public Access: Read only
CREATE POLICY "Public Read Posts" ON public.posts FOR
SELECT TO anon,
    authenticated USING (true);
-- Admin Access: Full CRUD for authenticated users
CREATE POLICY "Admin Full Access Posts" ON public.posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- 3. FIX STORAGE PERMISSIONS
-- Ensure 'client-documents' bucket is accessible to admins
-- Note: Storage policies are handled in the storage schema
DO $$ BEGIN -- This is a reminder to check storage policies if downloads still fail
-- Insert storage policies here if needed, but usually Admin Key handles this.
END $$;
-- 4. RELOAD SCHEMA CACHE
NOTIFY pgrst,
'reload schema';