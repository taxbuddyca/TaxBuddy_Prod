-- Fix Blog Post RLS Policies
-- 1. Enable RLS explicitly
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
-- 2. Allow Public Read Access (Anyone can view posts)
-- This ensures your blog is visible to the world
DROP POLICY IF EXISTS "Allow public read access" ON public.posts;
CREATE POLICY "Allow public read access" ON public.posts FOR
SELECT USING (true);
-- 3. Allow Admin (Authenticated Users) Full Access
-- This allows you to Insert, Update, and Delete posts
DROP POLICY IF EXISTS "Allow admin to manage posts" ON public.posts;
CREATE POLICY "Allow admin to manage posts" ON public.posts FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
-- 4. Grant Permissions (Just in case they are missing)
GRANT ALL ON public.posts TO authenticated;
GRANT SELECT ON public.posts TO anon;
GRANT ALL ON public.posts TO service_role;