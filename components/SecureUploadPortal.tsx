"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, ShieldCheck, CheckCircle, Info, AlertCircle, ArrowRight, Trash2 } from 'lucide-react';
import GlassCard from './GlassCard';
import { createClient } from '@/utils/supabase/client';

export default function SecureUploadPortal() {
    const [files, setFiles] = useState<{ id: string; name: string; size: string; status: 'pending' | 'uploading' | 'complete' | 'error'; progress: number; path?: string }[]>([]);
    const supabase = createClient();

    const uploadFile = async (fileId: string) => {
        const fileObj = files.find(f => f.id === fileId);
        // We need the actual File object here. 
        // PROPOSAL: Store File object in state as well.
        // Since we didn't store it before, we need to modify state to store 'file: File'.
        return;
    };

    // REDESIGN: We need to store the File object to upload it later.
    const [fileObjects, setFileObjects] = useState<{ [key: string]: File }>({});

    const processUpload = async (fileId: string) => {
        const file = fileObjects[fileId];
        if (!file) return;

        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'uploading', progress: 0 } : f));

        try {
            const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('client-documents')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Insert into Database
            const { error: dbError } = await supabase
                .from('documents')
                .insert([{
                    file_name: file.name,
                    file_path: fileName,
                    size: (file.size / 1024).toFixed(1) + ' KB',
                    document_type: file.type || 'unknown',
                    status: 'uploaded',
                }]);

            if (dbError) {
                console.error('Database record creation failed:', dbError);
                throw dbError;
            }

            setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'complete', progress: 100, path: fileName } : f));

        } catch (error) {
            console.error('Upload failed:', error);
            setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'error', progress: 0 } : f));
        }
    };

    const uploadAll = async () => {
        const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
        if (pendingFiles.length === 0) return;
        await Promise.all(pendingFiles.map(f => processUpload(f.id)));
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const fileId = Math.random().toString(36).substring(7);
            const newFile = {
                id: fileId,
                name: file.name,
                size: (file.size / 1024).toFixed(1) + ' KB',
                status: 'pending' as const,
                progress: 0
            };

            setFiles(prev => [...prev, newFile]);
            setFileObjects(prev => ({ ...prev, [fileId]: file }));
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true // Explicitly allow multiple files
    });

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
        setFileObjects(prev => {
            const newState = { ...prev };
            delete newState[id];
            return newState;
        });
    };

    const clearAll = () => {
        setFiles([]);
        setFileObjects({});
    };

    const pendingCount = files.filter(f => f.status === 'pending').length;
    const isSubmitting = files.some(f => f.status === 'uploading');

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
                    <div className="flex items-center justify-between px-2">
                        <h4 className="text-sm font-bold text-growth uppercase tracking-widest">
                            {pendingCount > 0 ? `${pendingCount} File(s) Ready to Upload` : 'Documents'}
                        </h4>
                        {pendingCount > 0 && (
                            <button onClick={clearAll} disabled={isSubmitting} className="text-xs font-bold text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                                <Trash2 size={12} /> Clear All
                            </button>
                        )}
                    </div>

                    {files.map((file) => (
                        <div key={file.id} className="relative bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-sm group">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-growth transition-colors">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-navy-900 truncate">{file.name}</p>
                                    <p className="text-xs text-navy-900/40 font-medium">
                                        {file.size} • {
                                            file.status === 'pending' ? <span className="text-amber-500 font-bold">Pending</span> :
                                                file.status === 'uploading' ? `Uploading ${file.progress}%` :
                                                    file.status === 'error' ? 'Failed' :
                                                        'Securely Stored'
                                        }
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    {file.status === 'complete' ? (
                                        <CheckCircle className="w-5 h-5 text-growth" />
                                    ) : file.status === 'error' ? (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    ) : file.status === 'pending' ? (
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    ) : (
                                        <div className="w-5 h-5 border-2 border-growth border-t-transparent rounded-full animate-spin" />
                                    )}
                                    <button onClick={() => removeFile(file.id)} disabled={isSubmitting} className="text-gray-300 hover:text-red-500 transition-colors p-1 disabled:opacity-50">
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

                    {pendingCount > 0 && (
                        <button
                            onClick={uploadAll}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-growth text-white rounded-2xl font-black text-lg shadow-lg shadow-growth/20 hover:bg-growth-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                        >
                            <Upload className="w-5 h-5" /> {isSubmitting ? 'Uploading...' : `Upload ${pendingCount} Files`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
