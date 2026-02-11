
import AdminBlogEditor from "@/components/AdminBlogEditor";
import { createClient } from "@/utils/supabase/server";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();

    return <AdminBlogEditor post={post} />;
}
