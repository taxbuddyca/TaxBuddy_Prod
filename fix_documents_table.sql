-- RUN THIS IN SUPABASE SQL EDITOR
-- 1. Fix the Table Columns (This addresses "column created_at does not exist" error)
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
-- Allow guest uploads (client_id is null for guests)
ALTER TABLE public.documents
ALTER COLUMN client_id DROP NOT NULL;
-- 2. Fix Table Permissions (Row Level Security)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
-- Allow ANYONE (including guests) to insert
DROP POLICY IF EXISTS "Anyone can upload documents" ON public.documents;
CREATE POLICY "Anyone can upload documents" ON public.documents FOR
INSERT WITH CHECK (true);
-- Allow Admins/App to view everything
DROP POLICY IF EXISTS "View all documents" ON public.documents;
CREATE POLICY "View all documents" ON public.documents FOR
SELECT USING (true);
-- Allow Admins/App to delete
DROP POLICY IF EXISTS "Delete documents" ON public.documents;
CREATE POLICY "Delete documents" ON public.documents FOR DELETE USING (true);