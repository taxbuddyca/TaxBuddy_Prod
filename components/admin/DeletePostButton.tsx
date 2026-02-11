"use client";

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({ postId }: { postId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('posts').delete().eq('id', postId);
            if (error) throw error;
            router.refresh();
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-navy-900/40 hover:text-red-600 hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100 transition-all disabled:opacity-50"
            title="Delete Post"
        >
            <Trash2 size={16} />
        </button>
    );
}
