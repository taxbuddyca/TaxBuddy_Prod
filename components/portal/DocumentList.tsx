"use client";

import { FileText, Download, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

type Document = {
    id: string;
    file_name: string;
    file_size: number;
    uploaded_at: string;
    status: string;
};

export default function DocumentList({ documents }: { documents: Document[] }) {
    if (documents.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FileText size={32} className="text-navy-900/20" />
                </div>
                <h3 className="text-navy-950 font-bold mb-1">No documents yet</h3>
                <p className="text-navy-900/40 text-sm">Upload your first document to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {documents.map((doc) => (
                <div key={doc.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-growth/30 transition-all group">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center text-blue-600">
                            <FileText size={24} />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold text-navy-950 truncate">{doc.file_name}</h4>
                            <div className="flex items-center gap-3 text-xs text-navy-900/50 mt-1">
                                <span>{(doc.file_size / 1024 / 1024).toFixed(2)} MB</span>
                                <span>•</span>
                                <span>{format(new Date(doc.uploaded_at), "MMM d, yyyy")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                                doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                            }`}>
                            {doc.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
