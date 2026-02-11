-- Create posts table for the blog
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    -- Storing markdown or HTML content
    cover_image TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    author TEXT,
    category TEXT,
    tags TEXT [],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
-- Create policy to allow public read access to all posts
CREATE POLICY "Allow public read access" ON posts FOR
SELECT USING (true);
-- Create policy to allow authenticated users (admin) to insert/update/delete
-- Assuming authenticated users are admins for now, or we can restricting to specific emails later.
CREATE POLICY "Allow admin to manage posts" ON posts FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');