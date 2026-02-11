-- Run this in Supabase SQL Editor to see the current state of your database
-- 1. Check Columns in 'documents' table
SELECT column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'documents';
-- 2. Check RLS Policies on 'documents' table
SELECT policyname,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'documents';
-- 3. Check Storage Policies (for file uploads)
SELECT policyname,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'storage'
    AND tablename = 'objects';