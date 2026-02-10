import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDocumentList from "@/components/admin/AdminDocumentList";

export const dynamic = "force-dynamic";

export default async function AdminDocumentsPage() {
    const supabase = createServerComponentClient({ cookies });

    const { data: { session } } = await supabase.auth.getSession();

    // Verify Admin Access
    if (!session || session.user.user_metadata.role !== 'admin') {
        redirect("/login");
    }

    const { data: documents } = await supabase
        .from("documents")
        .select("*")
        .order("uploaded_at", { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-navy-950 tracking-tight">Client Documents</h1>
                    <p className="text-navy-900/60 font-medium mt-2">Manage and review all client uploads.</p>
                </div>

                <AdminDocumentList documents={documents || []} />
            </div>
        </div>
    );
}
