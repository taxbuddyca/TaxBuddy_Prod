
import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import DeletePostButton from '@/components/admin/DeletePostButton';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });

    return (
        <div className="p-8 pt-32">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-navy-950">Blog Manager</h1>
                    <p className="text-navy-900/60">Manage your articles and insights.</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-4 py-2 bg-navy-950 text-white rounded-lg font-bold text-sm hover:bg-navy-900 transition-colors"
                >
                    <Plus size={16} />
                    New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-navy-900 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-xs font-bold text-navy-900 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-bold text-navy-900 uppercase tracking-wider">Published</th>
                            <th className="px-6 py-4 text-xs font-bold text-navy-900 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts?.map((post: any) => (
                            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-navy-950 mb-1">{post.title}</div>
                                    <div className="text-xs text-navy-900/50 font-mono">/{post.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-navy-800">
                                        {post.category || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-navy-900/70">
                                    {new Date(post.published_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-navy-600 hover:text-navy-950 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all" title="View Post">
                                            <Eye size={18} />
                                        </Link>
                                        <Link href={`/admin/blog/${post.id}`} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition-all" title="Edit Post">
                                            <Edit size={18} />
                                        </Link>
                                        {/* TODO: Add delete functionality */}
                                        <DeletePostButton postId={post.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!posts || posts.length === 0) && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-navy-900/40">
                                    No posts found. Create your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
