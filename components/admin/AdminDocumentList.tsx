"use client";

import { useState } from "react";
import { FileText, Download, Check, X, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

// ... Type definition ...
type Document = {
    id: string;
    file_name: string;
    file_size: number;
    uploaded_at: string;
    status: string;
    file_path: string;
    user_id: string; // To show who uploaded
};

export default function AdminDocumentList({ documents }: { documents: Document[] }) {
    const [downloading, setDownloading] = useState<string | null>(null);
    const [updating, setUpdating] = useState<string | null>(null);
    const supabase = createClient();
    const router = useRouter();

    const handleDownload = async (path: string, filename: string) => {
        setDownloading(path);
        try {
            const { data, error } = await supabase.storage.from('client-documents').download(path);
            if (error) throw error;

            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed", err);
            alert("Download failed");
        } finally {
            setDownloading(null);
        }
    };

    const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
        setUpdating(id);
        try {
            const { error } = await supabase
                .from('documents')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            router.refresh();
        } catch (err) {
            console.error("Update failed", err);
            alert("Update failed");
        } finally {
            setUpdating(null);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs font-black text-navy-900/40 uppercase tracking-widest">
                        <th className="p-4">Document</th>
                        <th className="p-4">Uploaded</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-navy-950 text-sm">{doc.file_name}</div>
                                        <div className="text-xs text-navy-900/50">{(doc.file_size / 1024 / 1024).toFixed(2)} MB</div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-sm text-navy-900/60 font-medium">
                                {format(new Date(doc.uploaded_at), "MMM d, yyyy")}
                            </td>
                            <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {doc.status}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => handleStatusUpdate(doc.id, 'approved')}
                                        disabled={!!updating}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Approve"
                                    >
                                        <Check size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                                        disabled={!!updating}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                        title="Reject"
                                    >
                                        <X size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDownload(doc.file_path, doc.file_name)}
                                        disabled={downloading === doc.file_path}
                                        className="p-2 text-navy-900/60 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                        title="Download"
                                    >
                                        {downloading === doc.file_path ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {documents.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-navy-900/40 font-medium text-sm">No documents found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
