
"use client";

import React, { useState, useEffect } from 'react';
import { getClientDocuments, deleteDocument, Document } from '@/lib/clients';
import { FileText, Download, Trash2, X, Loader2 } from 'lucide-react';

interface AdminClientFilesProps {
    clientId: string;
    clientName: string;
    onClose: () => void;
}

export default function AdminClientFiles({ clientId, clientName, onClose }: AdminClientFilesProps) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        fetchDocs();
    }, [clientId]);

    const fetchDocs = async () => {
        try {
            const docs = await getClientDocuments(clientId);
            setDocuments(docs);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (doc: Document) => {
        if (!confirm(`Permanently delete "${doc.name}"?`)) return;

        setDeletingId(doc.id!);
        try {
            // Extract file path from URL or use logic if stored differently. 
            // Assuming name is the path or we need the path. 
            // For now, let's assume the path is 'clientId/fileName' based on standard upload logic,
            // or we need to pass the full path. 
            // Update: We'll attempt to delete using the name as path prefix if that's how it was uploaded
            // OR ideally we should store the 'path' in the DB.
            // Let's assume 'name' is the file name and path is `{clientId}/{name}`.

            await deleteDocument(doc.id!, `${clientId}/${doc.name}`);
            setDocuments(prev => prev.filter(d => d.id !== doc.id));
        } catch (err) {
            alert("Failed to delete file. It may not exist in storage.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-3xl">
                    <div>
                        <h3 className="text-xl font-black text-navy-950">Client Files</h3>
                        <p className="text-navy-900/40 text-sm font-bold">{clientName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                        <X size={20} className="text-navy-900" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 flex-1">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="animate-spin text-growth" size={32} />
                        </div>
                    ) : documents.length === 0 ? (
                        <div className="text-center py-12 text-navy-900/30 font-bold italic">
                            No documents uploaded yet.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-growth/30 transition group">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-growth shrink-0 border border-gray-100">
                                            <FileText size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-navy-950 truncate">{doc.name}</div>
                                            <div className="text-xs text-navy-900/40 font-medium">
                                                {doc.size} • {new Date(doc.created_at || '').toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-2 text-navy-900/40 hover:text-growth hover:bg-white rounded-lg transition focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(doc)}
                                            disabled={deletingId === doc.id}
                                            className="p-2 text-navy-900/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deletingId === doc.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
