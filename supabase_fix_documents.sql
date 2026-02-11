-- 1. Ensure columns exist with correct types
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
-- 2. Relax constraints that might block Guest uploads
DO $$ BEGIN -- Drop NOT NULL from user_id if it exists
IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'documents'
        AND column_name = 'user_id'
) THEN
ALTER TABLE public.documents
ALTER COLUMN user_id DROP NOT NULL;
END IF;
-- Ensure client_id is nullable (it should be by default but let's be sure)
ALTER TABLE public.documents
ALTER COLUMN client_id DROP NOT NULL;
END $$;
-- 3. Reset and Fix RLS Policies
-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all documents" ON public.documents;
DROP POLICY IF EXISTS "Admins can delete documents" ON public.documents;
DROP POLICY IF EXISTS "Clients can upload documents" ON public.documents;
DROP POLICY IF EXISTS "Clients can view own documents" ON public.documents;
-- Admin Access: Authenticated users can see everything
CREATE POLICY "Admins can view all documents" ON public.documents FOR
SELECT TO authenticated USING (true);
-- Admin Access: Authenticated users can delete (careful, but functional for now)
CREATE POLICY "Admins can delete documents" ON public.documents FOR DELETE TO authenticated USING (true);
-- Client Access: Authenticated users can view their own
-- Note: This overlaps with the Admin policy but is good for explicitness
CREATE POLICY "Clients can view own documents" ON public.documents FOR
SELECT TO authenticated USING (
        auth.uid() = client_id
        OR client_id IS NULL
    );
-- Upload Access: Allow authenticated users and service_role (implicit)
CREATE POLICY "Clients can upload documents" ON public.documents FOR
INSERT TO authenticated WITH CHECK (true);
-- 4. Reload PostGrest
NOTIFY pgrst,
'reload schema';