"use client";

import React, { useState, useEffect } from 'react';
import { FolderOpen, Trash2, Loader2, CheckSquare, Square } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface SavedScenario {
    id: string;
    name: string;
    brain_type: string;
    scenario_type: string;
    facts: any;
    results: any;
    created_at: string;
}

interface SavedScenariosPanelProps {
    brainType?: 'life' | 'growth' | 'niche';
    onLoadScenario?: (scenario: SavedScenario) => void;
}

export default function SavedScenariosPanel({
    brainType,
    onLoadScenario
}: SavedScenariosPanelProps) {
    const [scenarios, setScenarios] = useState<SavedScenario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(brainType || null);
    const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchScenarios();
    }, [selectedFilter]);

    const fetchScenarios = async () => {
        setIsLoading(true);
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setScenarios([]);
                setIsLoading(false);
                return;
            }

            const url = selectedFilter
                ? `/api/tax-engine/scenarios?brain_type=${selectedFilter}`
                : '/api/tax-engine/scenarios';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch scenarios');

            const data = await response.json();
            setScenarios(data.scenarios || []);
        } catch (error) {
            console.error('Error fetching scenarios:', error);
            setScenarios([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this scenario?')) return;

        try {
            const response = await fetch(`/api/tax-engine/scenarios/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete scenario');

            // Refresh list
            fetchScenarios();

            // Remove from comparison selection if selected
            setSelectedForComparison(prev => prev.filter(sid => sid !== id));
        } catch (error) {
            console.error('Error deleting scenario:', error);
            alert('Failed to delete scenario');
        }
    };

    const toggleComparisonSelection = (id: string) => {
        setSelectedForComparison(prev => {
            if (prev.includes(id)) {
                return prev.filter(sid => sid !== id);
            } else {
                // Limit to 4 scenarios for comparison
                if (prev.length >= 4) {
                    alert('You can compare up to 4 scenarios at a time');
                    return prev;
                }
                return [...prev, id];
            }
        });
    };

    const handleCompare = () => {
        if (selectedForComparison.length < 2) {
            alert('Please select at least 2 scenarios to compare');
            return;
        }

        // Navigate to comparison page with selected IDs
        router.push(`/tools/tax-engine/compare?ids=${selectedForComparison.join(',')}`);
    };

    const getBrainColor = (brain: string) => {
        switch (brain) {
            case 'life': return 'bg-emerald-100 text-emerald-700';
            case 'growth': return 'bg-blue-100 text-blue-700';
            case 'niche': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'LOW': return 'text-green-600';
            case 'MEDIUM': return 'text-yellow-600';
            case 'HIGH': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <div className="flex items-center justify-center gap-3 text-navy-900/60">
                    <Loader2 size={24} className="animate-spin" />
                    <span className="font-bold">Loading scenarios...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <FolderOpen size={24} className="text-navy-950" />
                <h3 className="text-xl font-black text-navy-950">Saved Scenarios</h3>
            </div>

            {/* Filters */}
            {!brainType && (
                <div className="flex gap-2 mb-6 flex-wrap">
                    <button
                        onClick={() => setSelectedFilter(null)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${selectedFilter === null
                                ? 'bg-navy-950 text-white'
                                : 'bg-gray-100 text-navy-900/60 hover:bg-gray-200'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setSelectedFilter('life')}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${selectedFilter === 'life'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            }`}
                    >
                        Life
                    </button>
                    <button
                        onClick={() => setSelectedFilter('growth')}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${selectedFilter === 'growth'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                    >
                        Growth
                    </button>
                    <button
                        onClick={() => setSelectedFilter('niche')}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${selectedFilter === 'niche'
                                ? 'bg-purple-600 text-white'
                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            }`}
                    >
                        Niche
                    </button>
                </div>
            )}

            {/* Scenarios List */}
            {scenarios.length === 0 ? (
                <div className="text-center py-8 text-navy-900/40">
                    <p className="font-bold">No saved scenarios yet</p>
                    <p className="text-sm mt-2">Save your first scenario to see it here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {scenarios.map((scenario) => (
                        <div
                            key={scenario.id}
                            className="border-2 border-gray-200 rounded-2xl p-4 hover:border-gray-300 transition-colors"
                        >
                            <div className="flex items-start gap-3">
                                {/* Comparison Checkbox */}
                                <button
                                    onClick={() => toggleComparisonSelection(scenario.id)}
                                    className="mt-1 flex-shrink-0"
                                >
                                    {selectedForComparison.includes(scenario.id) ? (
                                        <CheckSquare size={20} className="text-emerald-600" />
                                    ) : (
                                        <Square size={20} className="text-gray-400" />
                                    )}
                                </button>

                                <div className="flex-1 min-w-0">
                                    {/* Name */}
                                    <h4 className="font-black text-navy-950 mb-2 truncate">
                                        {scenario.name}
                                    </h4>

                                    {/* Meta */}
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getBrainColor(scenario.brain_type)}`}>
                                            {scenario.brain_type.charAt(0).toUpperCase() + scenario.brain_type.slice(1)} Engine
                                        </span>
                                        <span className="text-xs text-navy-900/40 font-bold">
                                            {scenario.scenario_type}
                                        </span>
                                    </div>

                                    {/* Results */}
                                    <div className="flex items-center gap-4 text-sm mb-3">
                                        <span className="font-bold text-navy-950">
                                            ${scenario.results.total_savings?.toLocaleString() || 0} savings
                                        </span>
                                        <span className={`font-bold ${getRiskColor(scenario.results.risk_score?.level)}`}>
                                            {scenario.results.risk_score?.level || 'N/A'} risk
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {onLoadScenario && (
                                            <button
                                                onClick={() => onLoadScenario(scenario)}
                                                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
                                            >
                                                Load
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(scenario.id)}
                                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center gap-1"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Compare Button */}
            {selectedForComparison.length >= 2 && (
                <button
                    onClick={handleCompare}
                    className="w-full mt-6 px-4 py-3 bg-navy-950 text-white rounded-xl font-bold hover:bg-navy-900 transition-colors"
                >
                    Compare Selected ({selectedForComparison.length})
                </button>
            )}
        </div>
    );
}
