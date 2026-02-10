"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, ShieldCheck, CheckCircle, Info } from 'lucide-react';
import GlassCard from './GlassCard';

export default function SecureUploadPortal() {
    const [files, setFiles] = useState<{ id: string; name: string; size: string; status: 'uploading' | 'complete' | 'error'; progress: number }[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const fileId = Math.random().toString(36).substring(7);
            const newFile = {
                id: fileId,
                name: file.name,
                size: (file.size / 1024).toFixed(1) + ' KB',
                status: 'uploading' as const,
                progress: 0
            };

            setFiles(prev => [...prev, newFile]);

            // Mock upload progress
            let p = 0;
            const interval = setInterval(() => {
                p += 10;
                setFiles(prev => prev.map(f => f.id === fileId ? { ...f, progress: p } : f));
                if (p >= 100) {
                    clearInterval(interval);
                    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'complete', progress: 100 } : f));
                }
            }, 200);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 p-1">
            <GlassCard intensity="heavy" className="p-10 text-center relative overflow-hidden group">
                <div {...getRootProps()} className={`border-2 border-dashed rounded-[1.5rem] p-12 transition-all cursor-pointer ${isDragActive ? 'border-growth bg-growth/5' : 'border-gray-200 hover:border-growth hover:bg-gray-50'}`}>
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all ${isDragActive ? 'bg-growth text-white scale-110' : 'bg-growth/10 text-growth group-hover:scale-105'}`}>
                            <Upload className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-950 mb-2">Secure Document Dropzone</h3>
                        <p className="text-navy-900/60 mb-6 font-medium">Drag and drop your T4s, receipts, or ID here</p>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-growth">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-growth/10 rounded-full border border-growth/20">
                                <ShieldCheck className="w-3.5 h-3.5" /> AES-256 Encrypted
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-100/50 text-navy-900/50 rounded-full border border-gray-200">
                                <Info className="w-3.5 h-3.5" /> Max 50MB
                            </span>
                        </div>
                    </div>
                </div>
            </GlassCard>

            {files.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <h4 className="text-sm font-bold text-growth uppercase tracking-widest px-2">Uploaded Documents</h4>
                    {files.map((file) => (
                        <div key={file.id} className="relative bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm group">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-growth transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-navy-900 truncate">{file.name}</p>
                                    <p className="text-xs text-navy-900/40 font-medium">{file.size} • {file.status === 'uploading' ? `Uploading ${file.progress}%` : 'Securely Stored'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    {file.status === 'complete' ? (
                                        <CheckCircle className="w-5 h-5 text-growth" />
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-growth border-t-transparent rounded-full animate-spin" />
                                    )}
                                    <button onClick={() => removeFile(file.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            {/* Progress Bar Background */}
                            {file.status === 'uploading' && (
                                <div className="absolute bottom-0 left-0 h-1 bg-growth transition-all duration-300 rounded-b-2xl" style={{ width: `${file.progress}%` }} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
