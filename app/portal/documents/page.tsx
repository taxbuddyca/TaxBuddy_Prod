import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FileUpload from "@/components/portal/FileUpload";
import DocumentList from "@/components/portal/DocumentList";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    const { data: documents } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", session.user.id)
        .order("uploaded_at", { ascending: false });

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-navy-950 tracking-tight">Secure Documents</h1>
                        <p className="text-navy-900/60 font-medium mt-2">Upload and manage your financial records securely.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/50 border border-green-200 rounded-full text-green-700 font-bold text-xs uppercase tracking-wider">
                        <ShieldCheck size={16} />
                        End-to-End Encrypted
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-1">
                        <FileUpload />
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-black text-navy-950">Your Files</h2>
                        <DocumentList documents={documents || []} />
                    </div>
                </div>
            </div>
        </div>
    );
}
