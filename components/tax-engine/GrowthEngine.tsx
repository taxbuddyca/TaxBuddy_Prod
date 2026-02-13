"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Users as UsersIcon, Zap, Car,
    Calculator, AlertTriangle, CheckCircle2,
    TrendingUp, DollarSign, Shield, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { TaxRulesEngine, TaxFacts } from '@/lib/tax-engine/rules-engine';
import { GrowthCalculator } from '@/lib/tax-engine/calculators/growth-calculator';
import SaveScenarioButton from './SaveScenarioButton';

type ScenarioType = 'hiring' | 'hst' | 'vehicle' | null;

export default function GrowthEngine() {
    const [scenario, setScenario] = useState<ScenarioType>(null);
    const [facts, setFacts] = useState<Partial<TaxFacts>>({
        income: 0,
        revenue: 0,
        province: 'ON'
    });
    const [results, setResults] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const engine = new TaxRulesEngine();
    const calculator = new GrowthCalculator();

    useEffect(() => {
        if (scenario && facts.revenue && facts.revenue > 0) {
            calculateResults();
        }
    }, [facts, scenario]);

    const calculateResults = async () => {
        setIsCalculating(true);
        try {
            const events = await engine.evaluate('growth', facts as TaxFacts);
            const calculatedResults = calculator.calculate(facts as TaxFacts, events);
            setResults(calculatedResults);
        } catch (error) {
            console.error('Calculation error:', error);
        } finally {
            setIsCalculating(false);
        }
    };

    const updateFact = (key: keyof TaxFacts, value: any) => {
        setFacts(prev => ({ ...prev, [key]: value }));
    };

    if (!scenario) {
        return (
            <div className="min-h-screen pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <Link href="/tools/tax-engine" className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-8 transition-colors">
                        <ArrowLeft size={20} />
                        Back to Brain Selection
                    </Link>

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <Briefcase size={32} className="text-blue-600" />
                            </div>
                            <h1 className="text-5xl font-black text-navy-950 tracking-tight">
                                Growth Engine
                            </h1>
                        </div>
                        <p className="text-xl text-navy-900/60 font-bold max-w-2xl mx-auto">
                            Business Tax Optimization
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <ScenarioCard
                            icon={<UsersIcon size={28} className="text-pink-600" />}
                            title="Hiring Logic"
                            description="Hiring spouse or family members"
                            features={[
                                "TOSI compliance check",
                                "Salary vs dividend analysis",
                                "Age 65+ exemptions"
                            ]}
                            onClick={() => setScenario('hiring')}
                            color="border-pink-200 hover:border-pink-400"
                        />

                        <ScenarioCard
                            icon={<Zap size={28} className="text-yellow-600" />}
                            title="HST Optimizer"
                            description="Quick Method vs Regular"
                            features={[
                                "Quick Method savings",
                                "Low expense optimization",
                                "Service business focus"
                            ]}
                            onClick={() => setScenario('hst')}
                            color="border-yellow-200 hover:border-yellow-400"
                        />

                        <ScenarioCard
                            icon={<Car size={28} className="text-green-600" />}
                            title="Vehicle Matrix"
                            description="Lease vs Buy vs EV"
                            features={[
                                "EV Class 54 write-off",
                                "Luxury tax warnings",
                                "Business use optimization"
                            ]}
                            onClick={() => setScenario('vehicle')}
                            color="border-green-200 hover:border-green-400"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-8">
                    <button
                        onClick={() => {
                            setScenario(null);
                            setResults(null);
                            setFacts({ income: 0, revenue: 0, province: 'ON' });
                        }}
                        className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Change Scenario
                    </button>
                    <h2 className="text-4xl font-black text-navy-950 mb-2">
                        {scenario === 'hiring' && 'Hiring Logic (TOSI Compliance)'}
                        {scenario === 'hst' && 'HST Optimizer'}
                        {scenario === 'vehicle' && 'Vehicle Matrix'}
                    </h2>
                    <p className="text-navy-900/60 font-bold">
                        Answer the questions below to optimize your business taxes
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                            {scenario === 'hiring' && <HiringForm facts={facts} updateFact={updateFact} />}
                            {scenario === 'hst' && <HSTForm facts={facts} updateFact={updateFact} />}
                            {scenario === 'vehicle' && <VehicleForm facts={facts} updateFact={updateFact} />}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        {results ? (
                            <ResultsPanel
                                results={results}
                                isCalculating={isCalculating}
                                brainType="growth"
                                scenarioType={scenario || ''}
                                facts={facts}
                            />
                        ) : (
                            <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
                                <Calculator size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-navy-900/40 font-bold">
                                    Fill out the form to see your business tax optimization strategies
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ScenarioCard = ({ icon, title, description, features, onClick, color }: any) => (
    <motion.button
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={onClick}
        className={`group text-left p-8 rounded-3xl border-2 ${color} bg-white hover:shadow-xl transition-all duration-300`}
    >
        <div className="mb-6">{icon}</div>
        <h3 className="text-2xl font-black text-navy-950 mb-3 tracking-tight">{title}</h3>
        <p className="text-navy-900/60 font-bold mb-6">{description}</p>
        <div className="space-y-2">
            {features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-navy-900/60">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    <span>{feature}</span>
                </div>
            ))}
        </div>
    </motion.button>
);

const HiringForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Annual Business Revenue"
            type="number"
            value={facts.revenue || ''}
            onChange={(e) => updateFact('revenue', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="hiring_spouse"
                checked={facts.hiring_spouse || false}
                onChange={(e) => updateFact('hiring_spouse', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="hiring_spouse" className="font-bold text-navy-950">
                Are you hiring your spouse?
            </label>
        </div>

        {facts.hiring_spouse && (
            <>
                <FormField
                    label="Spouse's Hours Per Week"
                    type="number"
                    value={facts.spouse_hours_per_week || ''}
                    onChange={(e) => updateFact('spouse_hours_per_week', parseFloat(e.target.value) || 0)}
                    helpText="TOSI rules require 20+ hours/week for salary deductibility"
                />

                <FormField
                    label="Spouse's Age"
                    type="number"
                    value={facts.spouse_age || ''}
                    onChange={(e) => updateFact('spouse_age', parseInt(e.target.value) || 0)}
                    helpText="Age 65+ exempts from TOSI rules"
                />
            </>
        )}
    </div>
);

const HSTForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Annual Business Revenue"
            type="number"
            value={facts.revenue || ''}
            onChange={(e) => updateFact('revenue', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Annual Business Expenses"
            type="number"
            value={facts.business_expenses || ''}
            onChange={(e) => updateFact('business_expenses', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <div>
            <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                Industry
            </label>
            <select
                value={facts.industry || ''}
                onChange={(e) => updateFact('industry', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-navy-950"
            >
                <option value="">Select industry</option>
                <option value="IT">IT / Software</option>
                <option value="Consulting">Consulting</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
            </select>
        </div>
    </div>
);

const VehicleForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Vehicle Cost"
            type="number"
            value={facts.vehicle_cost || ''}
            onChange={(e) => updateFact('vehicle_cost', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <div>
            <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                Vehicle Type
            </label>
            <select
                value={facts.vehicle_type || ''}
                onChange={(e) => updateFact('vehicle_type', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-navy-950"
            >
                <option value="">Select type</option>
                <option value="zero_emission">Zero-Emission (EV)</option>
                <option value="hybrid">Hybrid</option>
                <option value="gas">Gas/Diesel</option>
            </select>
        </div>

        <FormField
            label="Business Use Percentage"
            type="number"
            value={facts.business_use_percentage ? facts.business_use_percentage * 100 : ''}
            onChange={(e) => updateFact('business_use_percentage', (parseFloat(e.target.value) || 0) / 100)}
            suffix="%"
            helpText="Percentage of vehicle use for business purposes"
        />

        <FormField
            label="Annual Vehicle Expenses"
            type="number"
            value={facts.vehicle_expenses || ''}
            onChange={(e) => updateFact('vehicle_expenses', parseFloat(e.target.value) || 0)}
            prefix="$"
            helpText="Fuel, maintenance, insurance, etc."
        />
    </div>
);

const FormField = ({ label, type, value, onChange, prefix, suffix, helpText }: any) => (
    <div>
        <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
            {label}
        </label>
        <div className="relative">
            {prefix && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-900/40 font-bold">
                    {prefix}
                </span>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full ${prefix ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-10' : 'pr-4'} py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none font-bold text-navy-950 transition-colors`}
            />
            {suffix && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-900/40 font-bold">
                    {suffix}
                </span>
            )}
        </div>
        {helpText && (
            <p className="mt-1 text-xs text-navy-900/40 font-bold">{helpText}</p>
        )}
    </div>
);

const ResultsPanel = ({ results, isCalculating, brainType, scenarioType, facts }: any) => {
    if (isCalculating) {
        return (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        );
    }

    const riskColor = results.risk_score.level === 'LOW' ? 'bg-green-50 border-green-200' :
        results.risk_score.level === 'MEDIUM' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200';

    return (
        <div className="space-y-6 sticky top-24">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <DollarSign size={32} />
                    <div className="text-sm font-black uppercase tracking-wider opacity-90">
                        Estimated Savings
                    </div>
                </div>
                <div className="text-5xl font-black mb-2">
                    ${results.total_savings.toLocaleString()}
                </div>
                <p className="text-blue-50 font-bold leading-relaxed">
                    {results.summary}
                </p>
            </div>

            <div className={`rounded-3xl border-2 ${riskColor} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                    <Shield size={24} />
                    <div className="text-sm font-black uppercase tracking-wider">
                        CRA Audit Risk
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-4xl font-black">{results.risk_score.score}</div>
                    <div className="text-lg font-bold opacity-60">/100</div>
                </div>
                <div className="text-sm font-black mb-4">{results.risk_score.level} RISK</div>
                {results.risk_score.flags.length > 0 && (
                    <div className="space-y-2">
                        {results.risk_score.flags.map((flag: any, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                                <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                                <span className="font-bold">{flag.message}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {results.recommendations.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={20} className="text-blue-600" />
                        <div className="text-sm font-black uppercase tracking-wider text-navy-950">
                            Recommendations
                        </div>
                    </div>
                    <div className="space-y-3">
                        {results.recommendations.map((rec: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <CheckCircle2 size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm font-bold text-navy-950">{rec.params.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save Scenario Button */}
            <div className="flex justify-center">
                <SaveScenarioButton
                    brainType={brainType}
                    scenarioType={scenarioType}
                    facts={facts}
                    results={results}
                />
            </div>
        </div>
    );
};
