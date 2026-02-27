"use client";

import React, { useState } from 'react';
import { Save, X, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface SaveScenarioButtonProps {
    brainType: 'life' | 'growth' | 'niche';
    scenarioType: string;
    facts: any;
    results: any;
}

export default function SaveScenarioButton({
    brainType,
    scenarioType,
    facts,
    results
}: SaveScenarioButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Please enter a name for this scenario');
            return;
        }

        setIsSaving(true);
        setError('');

        try {
            const supabase = createClient();

            // Check if user is authenticated
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                // Redirect to login
                router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
                return;
            }

            // Save scenario
            const response = await fetch('/api/tax-engine/scenarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    brain_type: brainType,
                    scenario_type: scenarioType,
                    facts,
                    results
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to save scenario');
            }

            // Success
            setIsOpen(false);
            setName('');

            // Show success message (you could use a toast library here)
            alert('Scenario saved successfully!');

        } catch (err: any) {
            setError(err.message || 'Failed to save scenario');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-navy-950 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            >
                <Save size={18} />
                Save Scenario
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-navy-950">Save This Scenario</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                                Scenario Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., Family 2025 Plan"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none font-bold text-navy-950"
                                disabled={isSaving}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-600 font-bold">{error}</p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                disabled={isSaving}
                                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 font-bold text-navy-950 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Scenario
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
