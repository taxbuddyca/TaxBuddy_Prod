"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, DollarSign, Shield, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Scenario {
    id: string;
    name: string;
    brain_type: string;
    scenario_type: string;
    results: {
        total_savings: number;
        risk_score: {
            score: number;
            level: string;
            flags: Array<{ message: string; severity: string }>;
        };
        recommendations: Array<{ params: { message: string } }>;
    };
}

export default function ScenarioComparison() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchScenarios();
    }, []);

    const fetchScenarios = async () => {
        const ids = searchParams.get('ids')?.split(',') || [];

        if (ids.length < 2) {
            setError('Please select at least 2 scenarios to compare');
            setIsLoading(false);
            return;
        }

        if (ids.length > 4) {
            setError('You can compare up to 4 scenarios at a time');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/tax-engine/scenarios');
            if (!response.ok) throw new Error('Failed to fetch scenarios');

            const data = await response.json();
            const selectedScenarios = data.scenarios.filter((s: Scenario) =>
                ids.includes(s.id)
            );

            if (selectedScenarios.length !== ids.length) {
                setError('Some scenarios could not be found');
            }

            setScenarios(selectedScenarios);
        } catch (err: any) {
            setError(err.message || 'Failed to load scenarios');
        } finally {
            setIsLoading(false);
        }
    };

    const getWinnerIndex = () => {
        if (scenarios.length === 0) return -1;
        let maxSavings = -Infinity;
        let winnerIdx = 0;

        scenarios.forEach((scenario, idx) => {
            if (scenario.results.total_savings > maxSavings) {
                maxSavings = scenario.results.total_savings;
                winnerIdx = idx;
            }
        });

        return winnerIdx;
    };

    const getBrainColor = (brain: string) => {
        switch (brain) {
            case 'life': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'growth': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'niche': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
            case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
                <div className="flex items-center gap-3 text-navy-900/60">
                    <Loader2 size={32} className="animate-spin" />
                    <span className="text-xl font-bold">Loading scenarios...</span>
                </div>
            </div>
        );
    }

    if (error || scenarios.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <AlertTriangle size={64} className="mx-auto text-red-600 mb-6" />
                    <h1 className="text-3xl font-black text-navy-950 mb-4">
                        {error || 'No scenarios to compare'}
                    </h1>
                    <Link
                        href="/tools/tax-engine"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-navy-950 text-white rounded-xl font-bold hover:bg-navy-900 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Tax Engine
                    </Link>
                </div>
            </div>
        );
    }

    const winnerIndex = getWinnerIndex();

    return (
        <div className="min-h-screen pt-24 lg:pt-32 pb-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/tools/tax-engine"
                        className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Tax Engine
                    </Link>
                    <h1 className="text-4xl font-black text-navy-950 mb-2">
                        Scenario Comparison
                    </h1>
                    <p className="text-navy-900/60 font-bold">
                        Comparing {scenarios.length} tax optimization strategies
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {scenarios.map((scenario, idx) => {
                        const isWinner = idx === winnerIndex;

                        return (
                            <div
                                key={scenario.id}
                                className={`bg-white rounded-3xl border-2 ${isWinner ? 'border-yellow-400 shadow-xl' : 'border-gray-200'
                                    } p-6 relative`}
                            >
                                {/* Winner Badge */}
                                {isWinner && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full font-black text-sm flex items-center gap-2 shadow-lg">
                                            <Trophy size={16} />
                                            WINNER
                                        </div>
                                    </div>
                                )}

                                {/* Scenario Name */}
                                <h3 className="text-xl font-black text-navy-950 mb-4 mt-2">
                                    {scenario.name}
                                </h3>

                                {/* Brain Type */}
                                <div className="mb-4">
                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${getBrainColor(scenario.brain_type)}`}>
                                        {scenario.brain_type.charAt(0).toUpperCase() + scenario.brain_type.slice(1)} Engine
                                    </span>
                                </div>

                                {/* Scenario Type */}
                                <p className="text-sm text-navy-900/60 font-bold mb-6">
                                    {scenario.scenario_type}
                                </p>

                                {/* Savings */}
                                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign size={20} />
                                        <span className="text-xs font-black uppercase tracking-wider opacity-90">
                                            Tax Savings
                                        </span>
                                    </div>
                                    <div className="text-4xl font-black">
                                        ${scenario.results.total_savings.toLocaleString()}
                                    </div>
                                </div>

                                {/* Risk Score */}
                                <div className={`rounded-2xl border-2 p-4 mb-4 ${getRiskColor(scenario.results.risk_score.level)}`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Shield size={18} />
                                        <span className="text-xs font-black uppercase tracking-wider">
                                            CRA Risk
                                        </span>
                                    </div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <div className="text-3xl font-black">{scenario.results.risk_score.score}</div>
                                        <div className="text-sm font-bold opacity-60">/100</div>
                                    </div>
                                    <div className="text-xs font-black">
                                        {scenario.results.risk_score.level} RISK
                                    </div>
                                </div>

                                {/* Recommendations Count */}
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle2 size={18} className="text-emerald-600" />
                                        <span className="text-xs font-black uppercase tracking-wider text-navy-950">
                                            Recommendations
                                        </span>
                                    </div>
                                    <div className="text-2xl font-black text-navy-950">
                                        {scenario.results.recommendations.length}
                                    </div>
                                    <div className="text-xs text-navy-900/60 font-bold mt-1">
                                        strategies identified
                                    </div>
                                </div>

                                {/* Risk Flags */}
                                {scenario.results.risk_score.flags.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="text-xs font-black uppercase tracking-wider text-navy-900/60 mb-2">
                                            Risk Flags
                                        </div>
                                        <div className="space-y-2">
                                            {scenario.results.risk_score.flags.slice(0, 3).map((flag, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <AlertTriangle size={12} className="text-red-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-xs text-navy-900/60 font-bold line-clamp-2">
                                                        {flag.message}
                                                    </span>
                                                </div>
                                            ))}
                                            {scenario.results.risk_score.flags.length > 3 && (
                                                <div className="text-xs text-navy-900/40 font-bold">
                                                    +{scenario.results.risk_score.flags.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Summary */}
                <div className="mt-12 bg-white rounded-3xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-black text-navy-950 mb-6">Comparison Summary</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Highest Savings */}
                        <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                            <Trophy size={32} className="mx-auto text-emerald-600 mb-3" />
                            <div className="text-sm font-black uppercase tracking-wider text-emerald-700 mb-2">
                                Highest Savings
                            </div>
                            <div className="text-2xl font-black text-navy-950 mb-1">
                                {scenarios[winnerIndex].name}
                            </div>
                            <div className="text-3xl font-black text-emerald-600">
                                ${scenarios[winnerIndex].results.total_savings.toLocaleString()}
                            </div>
                        </div>

                        {/* Lowest Risk */}
                        <div className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                            <Shield size={32} className="mx-auto text-green-600 mb-3" />
                            <div className="text-sm font-black uppercase tracking-wider text-green-700 mb-2">
                                Lowest Risk
                            </div>
                            <div className="text-2xl font-black text-navy-950 mb-1">
                                {scenarios.reduce((lowest, s) =>
                                    s.results.risk_score.score < lowest.results.risk_score.score ? s : lowest
                                ).name}
                            </div>
                            <div className="text-3xl font-black text-green-600">
                                {Math.min(...scenarios.map(s => s.results.risk_score.score))}/100
                            </div>
                        </div>

                        {/* Most Recommendations */}
                        <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                            <CheckCircle2 size={32} className="mx-auto text-blue-600 mb-3" />
                            <div className="text-sm font-black uppercase tracking-wider text-blue-700 mb-2">
                                Most Strategies
                            </div>
                            <div className="text-2xl font-black text-navy-950 mb-1">
                                {scenarios.reduce((most, s) =>
                                    s.results.recommendations.length > most.results.recommendations.length ? s : most
                                ).name}
                            </div>
                            <div className="text-3xl font-black text-blue-600">
                                {Math.max(...scenarios.map(s => s.results.recommendations.length))}
                            </div>
                        </div>
                    </div>

                    {/* Recommendation */}
                    <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                        <div className="flex items-start gap-4">
                            <Trophy size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                                <div className="text-sm font-black uppercase tracking-wider text-yellow-700 mb-2">
                                    Our Recommendation
                                </div>
                                <p className="text-navy-950 font-bold leading-relaxed">
                                    Based on your comparison, <strong>{scenarios[winnerIndex].name}</strong> offers
                                    the highest tax savings of <strong>${scenarios[winnerIndex].results.total_savings.toLocaleString()}</strong> with
                                    a <strong>{scenarios[winnerIndex].results.risk_score.level}</strong> CRA audit risk level.
                                    This strategy provides the best balance of savings and compliance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
