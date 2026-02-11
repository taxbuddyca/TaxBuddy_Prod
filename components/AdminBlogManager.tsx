
"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';

export default function AdminBlogManager() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('published_at', { ascending: false });

        if (data) setPosts(data);
        if (error) console.error("Error fetching posts:", error);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (!error) {
            fetchPosts();
        } else {
            alert("Failed to delete post.");
        }
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 px-4">
                <div>
                    <h2 className="text-3xl font-black text-navy-950 mb-2 tracking-tight">Blog Manager</h2>
                    <p className="text-navy-900/40 font-medium text-sm text-center lg:text-left">Create and manage your articles and insights.</p>
                </div>
                <div>
                    <Link
                        href="/admin/blog/new"
                        className="flex items-center gap-2 bg-navy-950 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-900 transition shadow-lg"
                    >
                        <Plus size={18} />
                        Create New Post
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="p-20 text-center text-navy-900/20 font-bold uppercase tracking-widest animate-pulse">Loading Posts...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-navy-900/30 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Title</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Published</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} className="bg-gray-50/50 hover:bg-gray-50 transition-all group">
                                    <td className="px-8 py-5 first:rounded-l-[1.5rem] border-y border-l border-gray-100">
                                        <div className="font-bold text-navy-950 mb-1">{post.title}</div>
                                        <div className="text-xs text-navy-900/40 font-mono">/{post.slug}</div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-gray-100">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white border border-gray-200 text-navy-800 shadow-sm">
                                            {post.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 border-y border-gray-100 text-navy-900/60 font-medium text-sm">
                                        {new Date(post.published_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-5 last:rounded-r-[1.5rem] border-y border-r border-gray-100 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-navy-900/20 hover:text-navy-950 hover:bg-white hover:shadow-sm rounded-lg transition" title="View">
                                                <Eye size={20} />
                                            </Link>
                                            {/* We can re-use the 'new' page logic for edit if we add ID param, 
                                                but for now let's just allow View/Delete to start. 
                                                Editing can be added later or simply implemented by populating the form. 
                                            */}
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-navy-900/20 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-lg transition" title="Delete">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-8 py-12 text-center text-navy-900/40 font-medium">
                                        No posts found. Start writing!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
