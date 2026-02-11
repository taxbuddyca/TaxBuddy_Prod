-- Migration to ensure 'documents' table has all required columns and correct policies.
-- Run this in the Supabase SQL Editor.
BEGIN;
-- 1. Add missing columns (IF NOT EXISTS)
-- Based on error "column documents.created_at does not exist" and code usage.
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS uploader_name TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS document_type TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS storage_path TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS size TEXT;
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
-- Ensure client_id is nullable for Guest uploads
ALTER TABLE public.documents
ALTER COLUMN client_id DROP NOT NULL;
-- 2. Re-apply RLS Policies (Just to be safe and ensure they are correct)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
-- Allow Anonymous Inserts
DROP POLICY IF EXISTS "Anyone can upload documents" ON public.documents;
CREATE POLICY "Anyone can upload documents" ON public.documents FOR
INSERT WITH CHECK (
        auth.role() = 'anon'
        OR auth.role() = 'authenticated'
        OR auth.role() = 'service_role'
    );
-- Allow Admin/Service Role to View All
DROP POLICY IF EXISTS "Admins/ServiceRole view all" ON public.documents;
CREATE POLICY "Admins/ServiceRole view all" ON public.documents FOR
SELECT TO authenticated,
    service_role USING (true);
-- Allow Admin to Delete
DROP POLICY IF EXISTS "Admins can delete documents" ON public.documents;
CREATE POLICY "Admins can delete documents" ON public.documents FOR DELETE TO authenticated,
service_role USING (true);
-- 3. Fix Storage Permissions (if not already applicable)
-- Ensure 'client-documents' bucket allows inserts from anon
-- (This part requires the 'storage' schema permissions which might need special handling in some setups, but usually works).
-- We will try to add it, but wrap in a DO block to avoid failure if extension not active or similar issues, 
-- though 'storage' schema is standard in Supabase.
DO $$ BEGIN IF EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'storage'
        AND tablename = 'objects'
) THEN DROP POLICY IF EXISTS "Anyone can upload to client-documents" ON storage.objects;
CREATE POLICY "Anyone can upload to client-documents" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'client-documents'
        AND (
            auth.role() = 'anon'
            OR auth.role() = 'authenticated'
            OR auth.role() = 'service_role'
        )
    );
-- Allow select for download (signed urls usually use service_role but public access helps if signed url fails)
-- Admin uses signed URLs which verify permissions. 
-- authenticated users (Admins) need select permission on the bucket objects.
DROP POLICY IF EXISTS "Admins can view client-documents" ON storage.objects;
CREATE POLICY "Admins can view client-documents" ON storage.objects FOR
SELECT TO authenticated,
    service_role USING (
        bucket_id = 'client-documents'
    );
DROP POLICY IF EXISTS "Admins can delete client-documents" ON storage.objects;
CREATE POLICY "Admins can delete client-documents" ON storage.objects FOR DELETE TO authenticated,
service_role USING (
    bucket_id = 'client-documents'
);
END IF;
END $$;
COMMIT;