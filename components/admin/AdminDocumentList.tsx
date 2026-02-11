"use client";

import { useState } from "react";
import {
    FileText,
    Download,
    Trash2,
    Search,
    User,
    Loader2,
    Calendar,
    FileType,
    MoreVertical,
    CheckCircle2,
    Clock
} from "lucide-react";
import { createClient } from '@/utils/supabase/client';
import { format } from "date-fns";

interface Document {
    id: string;
    file_name: string; // Changed from name to file_name
    size: string;
    status: string;
    file_path: string; // Changed from storage_path to file_path
    client_id: string | null;
    uploader_name: string | null;
    document_type: string | null;
    created_at: string;
}

interface Client {
    id: string;
    name: string;
}

export default function AdminDocumentList({ documents: initialDocs, clients }: { documents: any[], clients: Client[] }) {
    const supabase = createClient();
    const [documents, setDocuments] = useState<Document[]>(initialDocs);
    const [filter, setFilter] = useState("");
    const [downloading, setDownloading] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);


    const getUploaderName = (doc: Document) => {
        if (doc.client_id) {
            const client = clients.find(c => c.id === doc.client_id);
            return client ? client.name : 'Unknown Client';
        }
        return doc.uploader_name || 'Anonymous Guest';
    };

    const handleDownload = async (path: string, filename: string) => {
        if (!path) return;
        setDownloading(path);
        try {
            const { data, error } = await supabase.storage
                .from('client-documents')
                .createSignedUrl(path, 3600); // 1 hour link

            if (error) throw error;
            if (data?.signedUrl) {
                window.open(data.signedUrl, '_blank');
            }
        } catch (err) {
            console.error("Download failed", err);
            alert("Could not generate download link.");
        } finally {
            setDownloading(null);
        }
    };

    const handleDelete = async (id: string, path: string) => {
        if (!confirm("Are you sure you want to delete this document permanently?")) return;
        setDeleting(id);
        try {
            if (path) {
                await supabase.storage.from('client-documents').remove([path]);
            }
            const { error } = await supabase.from('documents').delete().eq('id', id);
            if (error) throw error;

            setDocuments(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete document.");
        } finally {
            setDeleting(null);
        }
    };

    const filteredDocs = documents.filter(doc => {
        const searchStr = `${doc.file_name} ${getUploaderName(doc)} ${doc.document_type || ''}`.toLowerCase(); // Updated field
        return searchStr.includes(filter.toLowerCase());
    });

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/30" />
                    <input
                        type="text"
                        placeholder="Search by file name, uploader, or type..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-navy-900 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition font-medium text-sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-navy-900/40 uppercase tracking-widest px-2">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span>{documents.length} Total Documents</span>
                </div>
            </div>

            {/* Desktop Table Container */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-[10px] font-black text-navy-900/40 uppercase tracking-widest">Document</th>
                                <th className="p-6 text-[10px] font-black text-navy-900/40 uppercase tracking-widest">Uploader</th>
                                <th className="p-6 text-[10px] font-black text-navy-900/40 uppercase tracking-widest text-center">Type</th>
                                <th className="p-6 text-[10px] font-black text-navy-900/40 uppercase tracking-widest text-center">Size</th>
                                <th className="p-6 text-[10px] font-black text-navy-900/40 uppercase tracking-widest">Date</th>
                                <th className="p-6 text-[10px] font-black text-navy-900/40 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredDocs.map((doc) => (
                                <tr key={doc.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <div className="font-extrabold text-navy-950 text-sm line-clamp-1 truncate max-w-[200px]" title={doc.file_name}>
                                                    {doc.file_name || 'Unnamed'}
                                                </div>
                                                <div className="text-[10px] font-bold text-navy-900/30 uppercase tracking-tighter">
                                                    ID: {doc.id.slice(0, 8)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-navy-900/40">
                                                <User size={12} />
                                            </div>
                                            <span className="text-sm font-bold text-navy-900/70">{getUploaderName(doc)}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-700 uppercase tracking-widest">
                                            {doc.document_type || 'General'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className="text-[11px] font-bold text-navy-900/40">{doc.size || '0 MB'}</span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-1.5 text-navy-900/50">
                                            <Calendar size={12} />
                                            <span className="text-xs font-medium">
                                                {doc.created_at ? format(new Date(doc.created_at), "MMM d, yyyy") : 'Unknown'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleDownload(doc.file_path, doc.file_name)}
                                                disabled={downloading === doc.file_path}
                                                className="p-2.5 hover:bg-blue-600 hover:text-white text-navy-900/40 rounded-xl transition-all shadow-sm bg-gray-50"
                                                title="Download"
                                            >
                                                {downloading === doc.file_path ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id, doc.file_path)}
                                                disabled={deleting === doc.id}
                                                className="p-2.5 hover:bg-red-500 hover:text-white text-red-400 rounded-xl transition-all shadow-sm bg-red-50/50"
                                                title="Delete"
                                            >
                                                {deleting === doc.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDocs.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-[2rem] mb-4">
                            <FileText size={40} className="text-navy-900/10" />
                        </div>
                        <h3 className="text-lg font-black text-navy-900/40 italic">No documents found</h3>
                        <p className="text-sm text-navy-900/20 font-medium mt-1">Try adjusting your search filters</p>
                    </div>
                )}
            </div>

            {/* Mobile View Reminder */}
            <div className="md:hidden p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-[10px] font-bold text-orange-700 uppercase tracking-widest text-center">
                    Switch to desktop for full column view
                </p>
            </div>
        </div>
    );
}
