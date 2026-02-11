
import AdminBlogEditor from "@/components/AdminBlogEditor";
import { createClient } from "@/utils/supabase/server";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single();

    return <AdminBlogEditor post={post} />;
}
