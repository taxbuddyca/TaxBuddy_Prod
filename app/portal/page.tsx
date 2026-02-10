"use client";

import React, { useState } from 'react';
import { LayoutDashboard, Upload, FileCheck, LogOut, Settings, MessageSquare } from 'lucide-react';
import SecureUploadPortal from '@/components/SecureUploadPortal';
import TaxIntakePortal from '@/components/TaxIntakePortal';
import GlassCard from '@/components/GlassCard';

export default function PortalPage() {
    const [activeView, setActiveView] = useState<'overview' | 'upload' | 'tax'>('overview');

    const sidebarItems = [
        { id: 'overview', icon: <LayoutDashboard size={20} />, label: 'Overview' },
        { id: 'upload', icon: <Upload size={20} />, label: 'Secure Upload' },
        { id: 'tax', icon: <FileCheck size={20} />, label: 'Tax Intake' },
    ];

    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-20 selection:bg-growth selection:text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-72 shrink-0">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveView(item.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeView === item.id ? 'bg-growth text-white' : 'text-navy-900/40 hover:text-navy-900 hover:bg-gray-50'}`}
                                >
                                    {item.icon} {item.label}
                                </button>
                            ))}
                            <hr className="my-4 border-gray-100" />
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-navy-900/40 hover:text-red-500 hover:bg-red-50 transition-all">
                                <LogOut size={20} /> Sign Out
                            </button>
                        </div>

                        <div className="mt-8 bg-navy-950 rounded-3xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-growth/20 blur-3xl" />
                            <h4 className="font-black mb-2 relative z-10 text-sm italic">Need priority help?</h4>
                            <p className="text-xs text-white/60 mb-4 relative z-10 leading-relaxed">Your dedicated CPA pod is available Mon-Fri, 9am - 5pm EST.</p>
                            <button className="w-full bg-growth text-white py-3 rounded-xl text-xs font-black relative z-10 hover:bg-growth-600 transition flex items-center justify-center gap-2">
                                <MessageSquare size={14} /> Open Support Chat
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {activeView === 'overview' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <section>
                                    <h1 className="text-4xl font-black text-navy-950 mb-2 tracking-tight">Welcome, Finance Partner.</h1>
                                    <p className="text-navy-900/40 font-medium">Here's a snapshot of your tax and controllership status.</p>
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <GlassCard intensity="light" className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                                                <FileCheck size={24} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-navy-900/20">Fiscal 2024</span>
                                        </div>
                                        <h3 className="text-xl font-black text-navy-950 mb-2">Corporate Tax Return</h3>
                                        <p className="text-sm text-navy-900/40 font-medium mb-6">Status: Awaiting T2 Supporting Docs</p>
                                        <button onClick={() => setActiveView('tax')} className="text-xs font-black text-growth hover:text-growth-600 transition flex items-center gap-2 group">
                                            Continue Intake <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </GlassCard>

                                    <GlassCard intensity="light" className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-growth/10 text-growth rounded-xl">
                                                <Upload size={24} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-navy-900/20">Action Required</span>
                                        </div>
                                        <h3 className="text-xl font-black text-navy-950 mb-2">Secure Document Drop</h3>
                                        <p className="text-sm text-navy-900/40 font-medium mb-6">Request: Proof of R&D Credits (SR&ED)</p>
                                        <button onClick={() => setActiveView('upload')} className="text-xs font-black text-growth hover:text-growth-600 transition flex items-center gap-2 group">
                                            Upload Files <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </GlassCard>
                                </div>
                            </div>
                        )}

                        {activeView === 'upload' && (
                            <div className="animate-in fade-in slide-in-from-right-4">
                                <div className="mb-8">
                                    <h1 className="text-4xl font-black text-navy-950 mb-2 tracking-tight">Secure Upload</h1>
                                    <p className="text-navy-900/40 font-medium">AES-256 Encrypted Transfer to our secure storage.</p>
                                </div>
                                <SecureUploadPortal />
                            </div>
                        )}

                        {activeView === 'tax' && (
                            <div className="animate-in fade-in slide-in-from-right-4">
                                <div className="mb-8">
                                    <h1 className="text-4xl font-black text-navy-950 mb-2 tracking-tight">Tax Intake Portal</h1>
                                    <p className="text-navy-900/40 font-medium">Complete your details to help us optimize your return.</p>
                                </div>
                                <TaxIntakePortal />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
