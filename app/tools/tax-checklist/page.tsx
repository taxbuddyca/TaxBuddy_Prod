
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { CheckSquare, Square, Download, Printer, Share2, FileText, User, Briefcase, Home, DollarSign } from "lucide-react";

import { supabase } from '@/lib/supabase';

interface ChecklistCategory {
    id: number;
    category: string;
    items: string[];
    order_index: number;
    icon?: React.ReactNode;
}

// Helper to map category names to icons (since icons aren't in DB)
const getIcon = (category: string) => {
    if (category.includes("Personal")) return <User size={20} />;
    if (category.includes("Income")) return <DollarSign size={20} />;
    if (category.includes("Deduction")) return <Home size={20} />;
    if (category.includes("Home") || category.includes("Work")) return <Briefcase size={20} />;
    return <FileText size={20} />;
}

export default function TaxChecklistPage() {
    const [checklistData, setChecklistData] = useState<ChecklistCategory[]>([]);
    const [loading, setLoading] = useState(true);
    // Track checked items state
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchChecklists = async () => {
            try {
                const { data, error } = await supabase
                    .from('checklists')
                    .select('*')
                    .order('order_index', { ascending: true });

                if (data) {
                    setChecklistData(data.map(d => ({
                        ...d,
                        icon: getIcon(d.category)
                    })));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChecklists();
    }, []);

    const toggleItem = (item: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const printChecklist = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-navy-900 selection:bg-growth/20 print:bg-white">
            <div className="print:hidden">
                <Navbar />
            </div>

            <main className="pt-32 pb-24 px-6 md:px-12 print:pt-8 print:pb-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 print:mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-blue-800 print:hidden">
                            <FileText size={14} />
                            Free Resource
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tight leading-tight">
                            The Ultimate 2026 <span className="text-growth">Tax Checklist</span>
                        </h1>
                        <p className="text-xl text-navy-900/60 max-w-2xl mx-auto mb-8">
                            Don't miss a deduction. Go through this list to ensure you have everything ready for your TaxBuddy expert.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 print:hidden">
                            <button
                                onClick={printChecklist}
                                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-navy-950 hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
                            >
                                <Printer size={18} /> Print List
                            </button>
                            {/* <button className="flex items-center gap-2 px-6 py-3 bg-navy-950 text-white rounded-xl font-bold hover:bg-navy-900 transition shadow-lg">
                                <Download size={18} /> Download PDF
                            </button> */}
                        </div>
                    </div>

                    {/* Checklist Grid */}
                    {loading ? (
                        <div className="text-center py-20 text-navy-900/30 font-bold animate-pulse">Loading Checklist...</div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {checklistData.map((section, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm break-inside-avoid">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-growth">
                                            {section.icon}
                                        </div>
                                        <h2 className="text-xl font-black text-navy-950">{section.category}</h2>
                                    </div>
                                    <ul className="space-y-4">
                                        {section.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 group cursor-pointer"
                                                onClick={() => toggleItem(item)}
                                            >
                                                <div className={`mt-1 shrink-0 transition-colors ${checkedItems[item] ? 'text-growth' : 'text-gray-300 group-hover:text-growth/50'}`}>
                                                    {checkedItems[item] ? <CheckSquare size={20} /> : <Square size={20} />}
                                                </div>
                                                <span className={`text-sm font-medium transition-all ${checkedItems[item] ? 'text-navy-900 line-through opacity-50' : 'text-navy-900/80'}`}>
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Footer / Call to Action */}
                    <div className="bg-navy-950 text-white rounded-[2.5rem] p-12 text-center relative overflow-hidden print:hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-growth/10 opacity-20" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-6">Got everything?</h2>
                            <p className="text-white/60 max-w-xl mx-auto mb-8 text-lg">
                                Upload your documents to our secure portal and we'll handle the rest. No appointments, no waiting.
                            </p>
                            <a href="/portal/documents" className="inline-flex items-center gap-2 bg-growth text-navy-950 px-8 py-4 rounded-xl font-black hover:scale-105 transition-all shadow-lg">
                                Upload Documents <Share2 size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
}
