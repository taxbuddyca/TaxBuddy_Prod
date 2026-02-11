-- Make user_id nullable for guest uploads
ALTER TABLE documents
ALTER COLUMN user_id DROP NOT NULL;
-- Add columns for guest information
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS uploader_name TEXT;
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS uploader_email TEXT;
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS document_type TEXT;
-- Update RLS policies to allow public inserts (if not already handled by service role key in action)
-- actually the action uses service role key so RLS is bypassed for insert.
-- But if we want public read later, we might need policies. For now, leave as is.