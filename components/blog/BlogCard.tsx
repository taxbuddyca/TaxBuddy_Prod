
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    published_at: string;
    author: string;
    category: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-gray-100">
                {post.cover_image ? (
                    <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        No Image
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy-900 uppercase tracking-wide">
                    {post.category || 'General'}
                </div>
            </Link>

            <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-4 text-xs text-navy-900/50 mb-4">
                    <div className="flex items-center gap-1.5 ">
                        <Calendar size={14} />
                        {formattedDate}
                    </div>
                    {/* <div className="flex items-center gap-1.5">
                        <User size={14} />
                        {post.author}
                    </div> */}
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-navy-950 group-hover:text-growth transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-navy-900/60 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                </p>

                <div className="mt-auto">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-bold text-growth hover:text-growth-dark group/link">
                        Read Article
                        <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
