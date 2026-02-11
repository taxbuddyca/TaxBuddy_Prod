
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import GlassCard from "@/components/GlassCard";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogIndexPage() {
    const supabase = createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-growth selection:text-white">
            <Navbar />

            <main className="pt-32 pb-24">
                {/* Header */}
                <section className="container mx-auto px-6 mb-20 text-center">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[9px] mb-4 block">Our Insights</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                        Tax Tips & <span className="text-growth">Financial Wisdom</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto">
                        Expert advice on tax planning, corporate finance, and growing your Canadian business.
                    </p>
                </section>

                {/* Grid */}
                <section className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts?.map((post: any) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                                <GlassCard className="h-full flex flex-col overflow-hidden hover:-translate-y-2 transition-transform duration-300" intensity="light">
                                    {/* Cover Image Placeholder - In real app, use post.cover_image */}
                                    <div className="h-48 bg-navy-900/5 w-full relative overflow-hidden">
                                        <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/10 transition-colors" />
                                        {/* If we had images, we'd put <img /> here. For now, a pattern. */}
                                        <div className="w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900 via-transparent to-transparent" />
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-navy-900/40 mb-4">
                                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md">{post.category || 'General'}</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <h2 className="text-xl font-black text-navy-950 mb-3 group-hover:text-growth transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-navy-900/60 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt || "Read more about this topic..."}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between text-navy-950 font-bold text-sm group/btn">
                                            <span>Read Article</span>
                                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>

                    {(!posts || posts.length === 0) && (
                        <div className="text-center py-24 text-navy-900/40">
                            <p className="text-xl font-bold">No articles published yet.</p>
                            <p>Check back soon!</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
