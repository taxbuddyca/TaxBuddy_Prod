
"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';

interface AdminBlogEditorProps {
    post?: any;
}

export default function AdminBlogEditor({ post }: AdminBlogEditorProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: 'General',
        cover_image: ''
    });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                slug: post.slug || '',
                content: post.content || '',
                excerpt: post.excerpt || '',
                category: post.category || 'General',
                cover_image: post.cover_image || ''
            });
        }
    }, [post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if creating new
        if (name === 'title' && !post) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            updated_at: new Date().toISOString()
        };

        let result;
        if (post?.id) {
            // Update
            result = await supabase.from('posts').update(payload).eq('id', post.id);
        } else {
            // Insert
            result = await supabase.from('posts').insert([payload]);
        }

        if (result.error) {
            alert(`Error: ${result.error.message}`);
        } else {
            router.push('/admin/blog');
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 pt-32">
            <div className="flex items-center justify-between mb-8">
                <Link href="/admin/blog" className="flex items-center gap-2 text-navy-900/40 hover:text-navy-950 transition font-bold">
                    <ArrowLeft size={18} /> Back
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-growth text-navy-950 px-6 py-3 rounded-xl font-black hover:bg-growth/90 transition shadow-lg disabled:opacity-50"
                >
                    <Save size={18} />
                    {loading ? 'Saving...' : 'Save Post'}
                </button>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div>
                        <label className="block text-xs font-black text-navy-900 uppercase tracking-wider mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition font-bold text-lg"
                            placeholder="Enter post title..."
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-navy-900 uppercase tracking-wider mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition font-mono text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-navy-900 uppercase tracking-wider mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition"
                            >
                                <option value="General">General</option>
                                <option value="Tax News">Tax News</option>
                                <option value="Tips">Tips</option>
                                <option value="Security">Security</option>
                                <option value="Education">Education</option>
                                <option value="Self-Employment">Self-Employment</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-navy-900 uppercase tracking-wider mb-2">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition"
                            placeholder="Short summary for comments..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-navy-900 uppercase tracking-wider mb-2">Cover Image</label>
                        <div className="space-y-4">
                            {formData.cover_image && (
                                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                    <img src={formData.cover_image} alt="Cover" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, cover_image: '' }))}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 text-gray-400">
                                    <ImageIcon size={20} />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        name="cover_image"
                                        value={formData.cover_image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition mb-2"
                                        placeholder="https://... or upload below"
                                    />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                if (!e.target.files || e.target.files.length === 0) return;
                                                setUploading(true);
                                                const file = e.target.files[0];
                                                const fileExt = file.name.split('.').pop();
                                                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                                                const filePath = `${fileName}`;

                                                const { error: uploadError } = await supabase.storage
                                                    .from('blog-images')
                                                    .upload(filePath, file);

                                                if (uploadError) {
                                                    alert(uploadError.message);
                                                } else {
                                                    const { data: { publicUrl } } = supabase.storage
                                                        .from('blog-images')
                                                        .getPublicUrl(filePath);
                                                    setFormData(prev => ({ ...prev, cover_image: publicUrl }));
                                                }
                                                setUploading(false);
                                            }}
                                            className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-xs file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100
                                            "
                                        />
                                        {uploading && <span className="absolute right-0 top-0 text-xs text-blue-600 font-bold">Uploading...</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                    <label className="block text-xs font-black text-navy-900 uppercase tracking-wider mb-2">Content (Markdown)</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={20}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-growth focus:ring-2 focus:ring-growth/20 outline-none transition font-mono text-sm leading-relaxed"
                        placeholder="# Heading&#10;&#10;Write your post here..."
                    />
                    <p className="mt-2 text-xs text-right text-gray-400">Supports standard Markdown</p>
                </div>
            </div>
        </form>
    );
}
