import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FileUpload from "@/components/portal/FileUpload";
import DocumentList from "@/components/portal/DocumentList";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
    const supabase = await createClient();

    // For Guest Portal, we won't show previous documents for now, or maybe only show if we had a guest session/cookie.
    // Since user requested "no login", showing "Your Files" is tricky without auth.
    // We will just show the Upload component and maybe an empty list or remove the list.
    // User said "provide upfront document upload facility", implying just the upload box is key.

    // We'll pass empty array for documents since we can't securely identify the guest's previous files without auth.
    const documents: any[] = [];

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 pt-32 md:pt-40">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-navy-950 tracking-tight">Secure Document Upload</h1>
                        <p className="text-navy-900/60 font-medium mt-2">Securely upload your financial records to our team.</p>
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
                        {/* List Section Removed for Guest Mode */}
                        <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                            <h2 className="text-lg font-bold text-navy-950 mb-2">How it works</h2>
                            <ul className="list-disc list-inside text-sm text-navy-900/70 space-y-2">
                                <li>Upload your documents using the secure form.</li>
                                <li>Our team will be notified immediately.</li>
                                <li>We will review and contact you if needed.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
