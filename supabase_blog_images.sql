-- Create a specific bucket for blog images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true) ON CONFLICT (id) DO NOTHING;
-- Policy to allow public read access to blog images
CREATE POLICY "Public Access" ON storage.objects FOR
SELECT USING (bucket_id = 'blog-images');
-- Policy to allow authenticated (admin) users to upload images
CREATE POLICY "Admin Upload" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
-- Policy to allow authenticated (admin) users to update/delete images
CREATE POLICY "Admin Update Delete" ON storage.objects FOR
UPDATE TO authenticated USING (bucket_id = 'blog-images');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images');