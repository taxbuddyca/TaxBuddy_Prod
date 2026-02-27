"use client";

import { useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

export default function DocumentUploadUI() {
    const [files, setFiles] = useState<{ name: string; size: string; status: 'uploading' | 'complete' }[]>([]);

    const mockUpload = (fileName: string) => {
        const newFile = { name: fileName, size: "1.2 MB", status: 'uploading' as const };
        setFiles(prev => [...prev, newFile]);

        setTimeout(() => {
            setFiles(prev => prev.map(f => f.name === fileName ? { ...f, status: 'complete' } : f));
        }, 1500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="relative group">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-[2rem] bg-gray-50 hover:bg-primary/5 hover:border-primary transition-all cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-[0.02] transition-opacity" />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8" />
                        </div>
                        <p className="mb-2 text-xl font-bold text-gray-900 leading-none">Drop your tax docs here</p>
                        <p className="text-sm text-gray-500">T4s, Receipts, or ID (PDF, JPG up to 10MB)</p>
                    </div>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files) {
                                Array.from(e.target.files).forEach(file => mockUpload(file.name));
                            }
                        }}
                    />
                </label>
            </div>

            {files.length > 0 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest px-2">Recently Uploaded</h4>
                    {files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size} • {file.status === 'uploading' ? 'Uploading...' : 'Securely Uploaded'}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {file.status === 'complete' ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                )}
                                <button className="text-gray-300 hover:text-red-500 transition focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
