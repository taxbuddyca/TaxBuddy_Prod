
"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Save, GripVertical, Loader2 } from 'lucide-react';
import GlassCard from './GlassCard';

interface ChecklistCategory {
    id?: number;
    category: string;
    items: string[];
    order_index: number;
}

export default function AdminChecklistManager() {
    const [categories, setCategories] = useState<ChecklistCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<ChecklistCategory>>({});

    useEffect(() => {
        fetchChecklists();
    }, []);

    const fetchChecklists = async () => {
        try {
            const { data, error } = await supabase
                .from('checklists')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (err) {
            console.error("Error fetching checklists:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (id?: number) => {
        try {
            if (id) {
                // Update
                const { error } = await supabase
                    .from('checklists')
                    .update({
                        category: editForm.category,
                        items: editForm.items,
                        order_index: editForm.order_index
                    })
                    .eq('id', id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('checklists')
                    .insert([{
                        category: editForm.category || "New Category",
                        items: editForm.items || [],
                        order_index: categories.length
                    }]);
                if (error) throw error;
            }

            setEditingId(null);
            setEditForm({});
            fetchChecklists();
        } catch (err) {
            alert("Error saving checklist. Check console.");
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            const { error } = await supabase.from('checklists').delete().eq('id', id);
            if (error) throw error;
            fetchChecklists();
        } catch (err) {
            alert("Error deleting.");
        }
    };

    const startEdit = (cat: ChecklistCategory) => {
        setEditingId(cat.id!);
        setEditForm(cat);
    };

    const startNew = () => {
        setEditingId(-1); // Temporary ID for new
        setEditForm({ category: "New Category", items: [], order_index: categories.length });
    };

    if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin inline-block text-growth" /> Loading Checklists...</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-4">
                <div>
                    <h2 className="text-2xl font-black text-navy-950">Checklist Manager</h2>
                    <p className="text-navy-900/40 text-sm font-medium">Customize the "Ultimate Tax Checklist" for clients</p>
                </div>
                <button
                    onClick={startNew}
                    className="bg-growth text-white px-6 py-3 rounded-xl font-bold hover:bg-growth-600 transition flex items-center gap-2 shadow-lg shadow-growth/20"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {editingId === -1 && (
                    <GlassCard className="p-6 border border-growth ring-4 ring-growth/10">
                        <Editor
                            form={editForm}
                            setForm={setEditForm}
                            onSave={() => handleSave()}
                            onCancel={() => setEditingId(null)}
                        />
                    </GlassCard>
                )}

                {categories.map((cat) => (
                    <div key={cat.id}>
                        {editingId === cat.id ? (
                            <GlassCard className="p-6 border border-growth ring-4 ring-growth/10">
                                <Editor
                                    form={editForm}
                                    setForm={setEditForm}
                                    onSave={() => handleSave(cat.id)}
                                    onCancel={() => setEditingId(null)}
                                />
                            </GlassCard>
                        ) : (
                            <GlassCard className="p-6 border border-gray-100 flex justify-between items-start group hover:border-growth/20 transition-all">
                                <div>
                                    <h3 className="text-lg font-black text-navy-950 mb-2">{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map((item, i) => (
                                            <span key={i} className="text-[10px] font-bold bg-gray-50 text-navy-900/60 px-2 py-1 rounded-md border border-gray-100">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(cat)} className="p-2 bg-gray-50 hover:bg-growth hover:text-white rounded-lg transition text-navy-900/40">Edit</button>
                                    <button onClick={() => handleDelete(cat.id!)} className="p-2 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition text-red-400"><Trash2 size={16} /></button>
                                </div>
                            </GlassCard>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Editor({ form, setForm, onSave, onCancel }: { form: any, setForm: any, onSave: any, onCancel: any }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Category Name</label>
                <input
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-lg font-black text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Personal Information"
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Checklist Items</label>
                    <button
                        onClick={() => setForm({ ...form, items: [...(form.items || []), ""] })}
                        className="text-xs font-bold bg-navy-950 text-white px-3 py-1.5 rounded-lg hover:bg-navy-900 transition flex items-center gap-1"
                    >
                        <Plus size={14} /> Add Item
                    </button>
                </div>
                <div className="space-y-2">
                    {form.items?.map((item: string, idx: number) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <span className="text-navy-900/20 cursor-move"><GripVertical size={16} /></span>
                            <input
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                                value={item}
                                onChange={(e) => {
                                    const newItems = [...(form.items || [])];
                                    newItems[idx] = e.target.value;
                                    setForm({ ...form, items: newItems });
                                }}
                                placeholder="New checklist item..."
                            />
                            <button
                                onClick={() => {
                                    const newItems = (form.items || []).filter((_: any, i: number) => i !== idx);
                                    setForm({ ...form, items: newItems });
                                }}
                                className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button onClick={onCancel} className="px-6 py-3 rounded-xl font-bold text-navy-900/40 hover:text-navy-950 transition">Cancel</button>
                <button onClick={onSave} className="bg-growth text-white px-8 py-3 rounded-xl font-bold hover:bg-growth-600 transition shadow-lg shadow-growth/20 flex items-center gap-2">
                    <Save size={18} /> Save Changes
                </button>
            </div>
        </div>
    );
}
