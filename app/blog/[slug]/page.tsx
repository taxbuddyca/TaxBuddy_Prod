import { createClient } from "@/utils/supabase/server";
// import { createClient as createBrowserClient } from "@/utils/supabase/client";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';

// Revalidate every 60 seconds
export const revalidate = 60;

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function generateStaticParams() {
    // specific client for static generation to avoid cookie issues during build
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: posts } = await supabase.from('posts').select('slug');
    return posts?.map(({ slug }) => ({ slug })) || [];
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <main className="pt-32 pb-24">
            <article className="container mx-auto px-6 max-w-4xl">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-navy-900/40 hover:text-navy-950 transition mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-navy-900/40 mb-6">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{post.category || 'General'}</span>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(post.published_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            5 min read
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-950 tracking-tighter leading-tight mb-8">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="text-xl md:text-2xl text-navy-900/60 font-medium leading-relaxed font-serif">
                            {post.excerpt}
                        </p>
                    )}
                </div>

                {/* Cover Image */}
                {post.cover_image && (
                    <div className="w-full h-[400px] bg-navy-900/5 rounded-3xl mb-12 overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent z-10" />
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-lg prose-headings:font-black prose-headings:text-navy-950 prose-p:text-navy-900/80 prose-a:text-growth prose-strong:text-navy-950 max-w-none">
                    <ReactMarkdown>{post.content || ''}</ReactMarkdown>
                </div>

                {/* Footer / Share */}
                <div className="mt-20 pt-10 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-navy-900 font-bold">
                            TM
                        </div>
                        <div>
                            <div className="font-bold text-navy-950 text-sm">TaxBuddy Market Team</div>
                            <div className="text-xs text-navy-900/40 font-bold uppercase tracking-wider">Author</div>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-navy-900/40 hover:text-growth transition">
                        <Share2 size={16} /> Share Article
                    </button>
                </div>
            </article>
        </main>
    );
}
