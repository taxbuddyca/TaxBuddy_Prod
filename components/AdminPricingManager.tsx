"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Tag, CheckCircle2, Zap, Save, X } from 'lucide-react';
import GlassCard from './GlassCard';
import { getPricingPlans, updatePricingPlan, createPricingPlan, deletePricingPlan, PricingPlan } from '@/lib/pricing';
import { services } from '@/lib/data/services';

export default function AdminPricingManager() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<PricingPlan>>({});

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            // Fetch all plans for admin management (both global and service-specific)
            const supabase = (await import('@/utils/supabase/client')).createClient();
            const { data, error } = await supabase
                .from("pricing_plans")
                .select("*")
                .order("order_index", { ascending: true });

            if (error) throw error;
            setPlans(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (plan: PricingPlan) => {
        setEditingId(plan.id!);
        setEditForm(plan);
    };

    const handleSave = async (id: number) => {
        try {
            await updatePricingPlan(id, editForm);
            setEditingId(null);
            fetchPlans();
        } catch (err) {
            console.error("AdminPricingManager: detailed save error:", err);
            alert("Error saving plan. Check console for details.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deletePricingPlan(id);
            fetchPlans();
        } catch (err) {
            alert("Error deleting plan");
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse text-navy-950 font-black">Synchronizing with Command Center...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
                <div>
                    <h2 className="text-2xl font-black text-navy-950">Subscription Management</h2>
                    <p className="text-navy-900/40 text-sm font-medium">Update public pricing and feature lists in real-time</p>
                </div>
                <button
                    onClick={() => createPricingPlan({ name: "New Plan", price: "$0", tag: "Draft", popular: false, features: [], order_index: plans.length + 1 }).then(fetchPlans)}
                    className="bg-growth text-white px-6 py-3 rounded-xl font-bold hover:bg-growth-600 transition flex items-center gap-2 shadow-lg shadow-growth/20"
                >
                    <Plus size={18} /> New Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <GlassCard key={plan.id} className={`p-8 border ${plan.popular ? 'border-growth/50 shadow-growth/5' : 'border-gray-100'}`} intensity="light">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl transition-all ${plan.popular ? 'bg-growth text-white rotate-12' : 'bg-gray-100 text-navy-950'}`}>
                                {plan.popular ? <Zap size={20} /> : <Tag size={20} />}
                            </div>
                            <div className="flex gap-2">
                                {editingId === plan.id ? (
                                    <button onClick={() => setEditingId(null)} className="p-2 text-navy-900/40 hover:text-red-500 rounded-lg transition"><X size={16} /></button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(plan)} className="p-2 text-navy-900/20 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition"><Edit3 size={16} /></button>
                                        <button onClick={() => handleDelete(plan.id!)} className="p-2 text-navy-900/20 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={16} /></button>
                                    </>
                                )}
                            </div>
                        </div>

                        {editingId === plan.id ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Plan Name</label>
                                    <input
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Price</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-lg font-black text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                                            value={editForm.price}
                                            onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                            placeholder="$0"
                                        />
                                        <input
                                            className="w-1/3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-lg font-bold text-navy-950 outline-none focus:ring-2 focus:ring-growth transition text-center"
                                            value={editForm.frequency || ''}
                                            onChange={(e) => setEditForm({ ...editForm, frequency: e.target.value })}
                                            placeholder="/mo"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="popular"
                                        checked={editForm.popular || false}
                                        onChange={(e) => setEditForm({ ...editForm, popular: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-growth focus:ring-growth"
                                    />
                                    <label htmlFor="popular" className="text-sm font-bold text-navy-950">Featured / Popular</label>
                                </div>


                                <div>
                                    <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Plan Tag (e.g. "Best Value")</label>
                                    <input
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                                        value={editForm.tag || ''}
                                        onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Service Association</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                                        value={editForm.service_slug || ''}
                                        onChange={(e) => setEditForm({ ...editForm, service_slug: e.target.value || null })}
                                    >
                                        <option value="">Global (Pricing Page)</option>
                                        {services.filter(s => s.slug).map(s => (
                                            <option key={s.slug} value={s.slug}>{s.title} ({s.slug})</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-widest pl-1">Features List</label>
                                        <button
                                            onClick={() => setEditForm({ ...editForm, features: [...(editForm.features || []), ""] })}
                                            className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded hover:bg-growth hover:text-white transition"
                                        >
                                            + ADD
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {editForm.features?.map((feature, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-navy-950 outline-none focus:ring-2 focus:ring-growth transition"
                                                    value={feature}
                                                    onChange={(e) => {
                                                        const newFeatures = [...(editForm.features || [])];
                                                        newFeatures[idx] = e.target.value;
                                                        setEditForm({ ...editForm, features: newFeatures });
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const newFeatures = (editForm.features || []).filter((_, i) => i !== idx);
                                                        setEditForm({ ...editForm, features: newFeatures });
                                                    }}
                                                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSave(plan.id!)}
                                    className="w-full bg-navy-950 text-white py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-navy-900 transition-all mt-4"
                                >
                                    <Save size={16} /> Update Plan
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-black text-navy-950">{plan.name}</h3>
                                <div className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] mb-2">{plan.tag}</div>
                                {plan.service_slug && (
                                    <div className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded mb-4">
                                        Service: {plan.service_slug}
                                    </div>
                                )}
                                <div className="text-3xl font-black text-navy-950 mb-6">
                                    {plan.price}<span className="text-lg text-navy-900/40 font-bold">{plan.frequency || '/mo'}</span>
                                </div>
                                <div className="space-y-2">
                                    {plan.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-navy-900/60 uppercase tracking-tight">
                                            <CheckCircle2 size={12} className="text-growth flex-shrink-0" /> {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>
        </div >
    );
}
