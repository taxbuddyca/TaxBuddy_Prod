"use client";

import { useState } from "react";
import { FileText, Download, Trash2, Search, User, Loader2, Calendar, FileType } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";

interface Document {
    id: string;
    name: string;
    size: string;
    status: string;
    storage_path: string;
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
    const [documents, setDocuments] = useState<Document[]>(initialDocs);
    const [filter, setFilter] = useState("");
    const [downloading, setDownloading] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const supabase = createClient();

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
                .createSignedUrl(path, 60);

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
        if (!confirm("Are you sure you want to delete this document?")) return;
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
        const searchStr = `${doc.name} ${getUploaderName(doc)} ${doc.document_type || ''}`.toLowerCase();
        return searchStr.includes(filter.toLowerCase());
    });

    return (
        <div className="space-y-6">
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/30" />
                <input
                    type="text"
                    placeholder="Search files, clients, or types..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-navy-900 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition font-medium"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {filteredDocs.length === 0 ? (
                <div className="p-20 text-center bg-white rounded-[2.5rem] border border-dashed border-gray-200 shadow-sm">
                    <FileText className="mx-auto mb-4 text-navy-900/10" size={48} />
                    <p className="text-navy-900/40 font-bold italic">No documents found matching your search</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDownload(doc.storage_path, doc.name)}
                                        disabled={downloading === doc.storage_path}
                                        className="p-3 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                                        title="Download"
                                    >
                                        {downloading === doc.storage_path ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id, doc.storage_path)}
                                        disabled={deleting === doc.id}
                                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                                        title="Delete"
                                    >
                                        {deleting === doc.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <h3 className="font-extrabold text-navy-950 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" title={doc.name}>
                                    {doc.name || 'Unnamed Document'}
                                </h3>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-navy-900/60">
                                        <User size={14} className="flex-shrink-0" />
                                        <span className="text-sm font-bold truncate">{getUploaderName(doc)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-navy-900/40">
                                        <FileType size={14} className="flex-shrink-0" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{doc.document_type || 'General'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                                <div className="flex items-center gap-2 text-navy-900/30">
                                    <Calendar size={12} />
                                    <span className="text-[10px] font-black uppercase whitespace-nowrap">
                                        {doc.created_at ? format(new Date(doc.created_at), "MMM d, yyyy") : 'Unknown Date'}
                                    </span>
                                </div>
                                <span className="text-[10px] font-black bg-gray-100 text-navy-950 px-3 py-1 rounded-full uppercase tracking-widest">
                                    {doc.size || '0 MB'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
