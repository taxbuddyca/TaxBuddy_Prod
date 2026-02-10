"use client";

import { useState } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { uploadGuestFile } from "@/actions/upload";

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            setSuccess(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadGuestFile(formData);

            if (result.error) {
                throw new Error(result.error);
            }

            setSuccess(true);
            setFile(null);

            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-navy-950 mb-4 flex items-center gap-2">
                <Upload size={20} className="text-growth" />
                Quick Document Upload
            </h3>

            {success ? (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <div className="font-bold">Upload Successful!</div>
                        <div className="text-xs opacity-80">Our team has been notified.</div>
                    </div>
                </div>
            ) : null}

            {!file ? (
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-growth hover:bg-growth/5 transition-all group">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-md transition-all">
                        <Upload size={24} className="text-navy-900/40 group-hover:text-growth" />
                    </div>
                    <span className="text-sm font-bold text-navy-900/60 group-hover:text-navy-950">Click to select a file</span>
                    <span className="text-xs text-navy-900/40 mt-1">PDF, JPG, PNG up to 10MB</span>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
            ) : (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                                <FileText size={20} className="text-navy-950" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-sm font-bold text-navy-950 truncate">{file.name}</div>
                                <div className="text-xs text-navy-900/50">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                            </div>
                        </div>
                        <button onClick={() => setFile(null)} className="p-2 hover:bg-gray-200 rounded-lg text-navy-900/40 hover:text-red-500 transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="w-full bg-navy-950 text-white py-3 rounded-xl font-bold text-sm hover:bg-navy-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {uploading ? "Uploading..." : "Confirm Upload"}
                    </button>
                </div>
            )}
        </div>
    );
}
