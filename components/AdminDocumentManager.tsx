"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Download, Trash2, Search, User } from 'lucide-react';
import { Client } from '@/lib/clients';

interface AdminDocumentManagerProps {
    clients: Client[];
}

interface Document {
    id: string;
    client_id: string;
    name: string;
    size: string;
    status: string;
    url: string;
    created_at: string;
    storage_path?: string;
    uploader_name?: string;
    document_type?: string;
}

export default function AdminDocumentManager({ clients }: AdminDocumentManagerProps) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDocuments(data || []);
        } catch (err) {
            console.error("Error fetching documents:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (path: string) => {
        try {
            const { data, error } = await supabase.storage
                .from('client-documents')
                .createSignedUrl(path, 60); // Valid for 60 seconds

            if (error) throw error;
            if (data?.signedUrl) {
                window.open(data.signedUrl, '_blank');
            }
        } catch (err) {
            console.error("Error downloading file:", err);
            alert("Could not generate download link.");
        }
    };

    const handleDelete = async (id: string, path: string) => {
        if (!confirm("Are you sure you want to delete this file? This cannot be undone.")) return;

        try {
            // Delete from storage
            if (path) {
                const { error: storageError } = await supabase.storage
                    .from('client-documents')
                    .remove([path]);
                if (storageError) console.error("Storage delete error:", storageError);
            }

            const { error: dbError } = await supabase.from('documents').delete().eq('id', id);
            if (dbError) throw dbError;

            fetchDocuments();
        } catch (err) {
            alert("Error deleting document");
            console.error(err);
        }
    };

    const getClientName = (doc: Document) => {
        if (doc.client_id) {
            const client = clients.find(c => c.id === doc.client_id);
            return client ? client.name : 'Unknown Client';
        }
        return doc.uploader_name ? `${doc.uploader_name} (Guest)` : 'Unknown Guest';
    };

    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(filter.toLowerCase()) ||
        getClientName(doc).toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4">
                <div>
                    <h2 className="text-2xl font-black text-navy-950">Document Repository</h2>
                    <p className="text-navy-900/40 text-sm font-medium">Global view of all client uploads</p>
                </div>
                <div className="relative lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/30" />
                    <input
                        type="text"
                        placeholder="Search files or clients..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-navy-900 focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="p-20 text-center text-navy-900/20 font-bold uppercase tracking-widest animate-pulse">Loading Documents...</div>
            ) : filteredDocs.length === 0 ? (
                <div className="p-20 text-center bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                    <FileText className="mx-auto mb-4 text-navy-900/10" size={48} />
                    <p className="text-navy-900/40 font-bold italic">No documents found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <FileText size={20} />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDownload(doc.storage_path || doc.url)}
                                        className="p-2 bg-gray-50 hover:bg-growth hover:text-white rounded-lg transition"
                                        title="Download"
                                    >
                                        <Download size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doc.id, doc.storage_path || '')}
                                        className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-navy-950 truncate mb-1" title={doc.name}>{doc.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <User size={12} className="text-navy-900/30" />
                                <span className="text-xs text-navy-900/50 font-medium truncate">{getClientName(doc)}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <span className="text-[10px] font-black uppercase tracking-widest text-navy-900/30">{doc.size}</span>
                                <span className="text-[10px] font-bold text-navy-900/30">{new Date(doc.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
