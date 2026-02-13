"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    Calculator, Calendar, User,
    ArrowRight, Info, Trash2,
    Briefcase, Users, Zap
} from 'lucide-react';

interface Scenario {
    id: string;
    name: string;
    brain_type: 'life' | 'growth' | 'niche';
    scenario_type: string;
    facts: any;
    results: any;
    created_at: string;
}

export default function AdminScenariosTable() {
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchScenarios();
    }, []);

    const fetchScenarios = async () => {
        try {
            const { data, error } = await supabase
                .from('tax_scenarios')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setScenarios(data || []);
        } catch (error) {
            console.error('Error fetching scenarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteScenario = async (id: string) => {
        if (!confirm('Are you sure you want to delete this scenario?')) return;

        try {
            const { error } = await supabase
                .from('tax_scenarios')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setScenarios(scenarios.filter(s => s.id !== id));
        } catch (error) {
            alert('Failed to delete scenario');
        }
    };

    if (loading) {
        return <div className="p-20 text-center text-navy-900/20 font-bold uppercase animate-pulse">Loading Scenarios...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
                <div>
                    <h2 className="text-3xl font-black text-navy-950 mb-2">Saved Scenarios</h2>
                    <p className="text-navy-900/40 text-sm font-medium">Review and manage tax optimization scenarios saved by users</p>
                </div>
                <div className="bg-navy-950 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    {scenarios.length} Total
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-navy-900/30 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="px-8 py-4">Scenario Name</th>
                            <th className="px-8 py-4">Brain Type</th>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-8 py-4">Savings</th>
                            <th className="px-8 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scenarios.map((scenario) => (
                            <tr key={scenario.id} className="bg-gray-50/50 hover:bg-gray-50 transition-all group">
                                <td className="px-8 py-5 first:rounded-l-[1.5rem] border-y border-l border-gray-100">
                                    <div className="font-bold text-navy-950">{scenario.name}</div>
                                    <div className="text-[10px] text-navy-900/40 font-black uppercase mt-1">
                                        {scenario.scenario_type.replace(/_/g, ' ')}
                                    </div>
                                </td>
                                <td className="px-8 py-5 border-y border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.5 rounded-lg ${scenario.brain_type === 'life' ? 'bg-emerald-100 text-emerald-600' :
                                                scenario.brain_type === 'growth' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-purple-100 text-purple-600'
                                            }`}>
                                            {scenario.brain_type === 'life' && <Users size={14} />}
                                            {scenario.brain_type === 'growth' && <Briefcase size={14} />}
                                            {scenario.brain_type === 'niche' && <Zap size={14} />}
                                        </div>
                                        <span className="text-sm font-bold capitalize">{scenario.brain_type}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 border-y border-gray-100 text-navy-900/40 text-xs font-medium">
                                    {new Date(scenario.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-8 py-5 border-y border-gray-100">
                                    <div className="text-sm font-black text-emerald-600">
                                        ${scenario.results.total_savings?.toLocaleString() || 0}
                                    </div>
                                </td>
                                <td className="px-8 py-5 last:rounded-r-[1.5rem] border-y border-r border-gray-100 text-right">
                                    <button
                                        onClick={() => deleteScenario(scenario.id)}
                                        className="p-2 text-navy-900/20 hover:text-red-500 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {scenarios.length === 0 && (
                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                    <Calculator size={48} className="mx-auto text-navy-900/10 mb-4" />
                    <p className="text-navy-900/40 font-bold italic">No scenarios saved yet</p>
                </div>
            )}
        </div>
    );
}
