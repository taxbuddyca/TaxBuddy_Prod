"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Heart, GraduationCap, Plane,
    Calculator, AlertTriangle, CheckCircle2,
    TrendingUp, DollarSign, Shield, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { TaxFacts } from '@/lib/tax-engine/schemas';

import SaveScenarioButton from './SaveScenarioButton';
import SavedScenariosPanel from './SavedScenariosPanel';
import TabNavigation from './TabNavigation';
import PDFExportButton from './PDFExportButton';
import { LayoutDashboard, Save } from 'lucide-react';

type ScenarioType = 'family' | 'student' | 'newcomer' | null;

export default function LifeEngine() {
    const [scenario, setScenario] = useState<ScenarioType>(null);
    const [facts, setFacts] = useState<Partial<TaxFacts>>({
        income: 0,
        province: 'ON',
        marital_status: 'single'
    });
    const [results, setResults] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [activeTab, setActiveTab] = useState('calculator');

    useEffect(() => {
        if (scenario && facts.income && facts.income > 0) {
            calculateResults();
        }
    }, [facts, scenario]);

    const calculateResults = async () => {
        setIsCalculating(true);
        try {
            const response = await fetch('/api/tax-engine/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    brainType: 'life',
                    facts: facts
                }),
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const calculatedResults = await response.json();
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
                    {/* Back Button */}
                    <Link href="/tools/tax-engine" className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-8 transition-colors">
                        <ArrowLeft size={20} />
                        Back to Brain Selection
                    </Link>

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                <Users size={32} className="text-emerald-600" />
                            </div>
                            <h1 className="text-5xl font-black text-navy-950 tracking-tight">
                                Life Engine
                            </h1>
                        </div>
                        <p className="text-xl text-navy-900/60 font-bold max-w-2xl mx-auto">
                            Personal & Family Tax Optimization
                        </p>
                    </div>

                    {/* Scenario Selection */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <ScenarioCard
                            icon={<Heart size={28} className="text-pink-600" />}
                            title="Family Optimizer"
                            description="Married couples with children"
                            features={[
                                "Spousal RRSP strategies",
                                "Pension splitting (65+)",
                                "Childcare deductions"
                            ]}
                            onClick={() => setScenario('family')}
                            color="border-pink-200 hover:border-pink-400"
                        />

                        <ScenarioCard
                            icon={<GraduationCap size={28} className="text-blue-600" />}
                            title="Student / New Grad"
                            description="Recent graduates with student loans"
                            features={[
                                "Tuition carry-forward",
                                "Moving expenses",
                                "Student loan interest"
                            ]}
                            onClick={() => setScenario('student')}
                            color="border-blue-200 hover:border-blue-400"
                        />

                        <ScenarioCard
                            icon={<Plane size={28} className="text-purple-600" />}
                            title="Newcomer"
                            description="New to Canada"
                            features={[
                                "World income reporting",
                                "GST credit application",
                                "First-year optimization"
                            ]}
                            onClick={() => setScenario('newcomer')}
                            color="border-purple-200 hover:border-purple-400"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => {
                            setScenario(null);
                            setResults(null);
                            setFacts({ income: 0, province: 'ON' });
                        }}
                        className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Change Scenario
                    </button>
                    <h2 className="text-4xl font-black text-navy-950 mb-2">
                        {scenario === 'family' && 'Family Optimizer'}
                        {scenario === 'student' && 'Student / New Grad'}
                        {scenario === 'newcomer' && 'Newcomer to Canada'}
                    </h2>
                    <p className="text-navy-900/60 font-bold">
                        Answer the questions below to get personalized tax optimization strategies
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Input Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                            {scenario === 'family' && <FamilyForm facts={facts} updateFact={updateFact} />}
                            {scenario === 'student' && <StudentForm facts={facts} updateFact={updateFact} />}
                            {scenario === 'newcomer' && <NewcomerForm facts={facts} updateFact={updateFact} />}
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-1">
                        {results ? (
                            <ResultsPanel
                                results={results}
                                isCalculating={isCalculating}
                                brainType="life"
                                scenarioType={scenario || ''}
                                facts={facts}
                                scenarioName={scenario === 'family' ? 'Family Optimizer' : scenario === 'student' ? 'Student / New Grad' : 'Newcomer to Canada'}
                            />
                        ) : (
                            <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
                                <Calculator size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-navy-900/40 font-bold">
                                    Fill out the form to see your personalized recommendations
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Scenario Card Component
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
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>{feature}</span>
                </div>
            ))}
        </div>
    </motion.button>
);

// Family Optimizer Form
const FamilyForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Your Annual Income"
            type="number"
            value={facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('income', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Spouse's Annual Income"
            type="number"
            value={facts.spouse_income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const spouseIncome = parseFloat(e.target.value) || 0;
                updateFact('spouse_income', spouseIncome);
                updateFact('income_difference', Math.abs(facts.income - spouseIncome));
                updateFact('marital_status', 'married');
            }}
            prefix="$"
        />

        <FormField
            label="Your Age"
            type="number"
            value={facts.age || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('age', parseInt(e.target.value) || 0)}
        />

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="has_pension"
                checked={facts.has_pension || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('has_pension', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="has_pension" className="font-bold text-navy-950">
                Do you receive pension income?
            </label>
        </div>

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="has_children"
                checked={facts.has_children || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('has_children', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="has_children" className="font-bold text-navy-950">
                Do you have children?
            </label>
        </div>

        {facts.has_children && (
            <FormField
                label="Annual Childcare Expenses"
                type="number"
                value={facts.childcare_expenses || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('childcare_expenses', parseFloat(e.target.value) || 0)}
                prefix="$"
            />
        )}

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

// Student Form
const StudentForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Your Annual Income"
            type="number"
            value={facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('income', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Unused Tuition Credits"
            type="number"
            value={facts.tuition_credits_available || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('tuition_credits_available', parseFloat(e.target.value) || 0)}
            prefix="$"
            helpText="Total amount of tuition credits you haven't used yet"
        />

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="moved_for_work"
                checked={facts.moved_for_work || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('moved_for_work', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="moved_for_work" className="font-bold text-navy-950">
                Did you move for a new job this year?
            </label>
        </div>

        {facts.moved_for_work && (
            <FormField
                label="Distance Moved (km)"
                type="number"
                value={facts.moving_distance_km || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('moving_distance_km', parseFloat(e.target.value) || 0)}
                helpText="Must be at least 40km closer to new workplace"
            />
        )}

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

// Newcomer Form
const NewcomerForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Your Annual Income (in Canada)"
            type="number"
            value={facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('income', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Arrival Date in Canada"
            type="date"
            value={facts.arrival_date || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateFact('arrival_date', e.target.value);
                updateFact('is_newcomer', true);
            }}
        />

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="has_foreign_income"
                checked={facts.has_foreign_income || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('has_foreign_income', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="has_foreign_income" className="font-bold text-navy-950">
                Did you earn income outside Canada before arriving?
            </label>
        </div>

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="applied_for_gst_credit"
                checked={facts.applied_for_gst_credit || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('applied_for_gst_credit', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="applied_for_gst_credit" className="font-bold text-navy-950">
                Have you applied for GST/HST credit?
            </label>
        </div>

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

// Form Field Component
const FormField = ({ label, type, value, onChange, prefix, suffix, helpText }: any) => {
    const id = React.useId();
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                {label}
            </label>
            <div className="relative">
                {prefix && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-900/40 font-bold">
                        {prefix}
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`w-full ${prefix ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-10' : 'pr-4'} py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none font-bold text-navy-950 transition-colors`}
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
};

const AuditRiskSection = ({ facts, updateFact }: any) => (
    <div className="pt-6 border-t border-gray-100">
        <h4 className="text-sm font-black text-navy-950/40 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield size={14} />
            Audit Risk Factors (Optional)
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
            <FormField
                label="Annual Meal Expenses"
                type="number"
                value={facts.meals_expenses || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('meals_expenses', parseFloat(e.target.value) || 0)}
                prefix="$"
                helpText="Flagged if >= 10% of income"
            />
            <FormField
                label="Home Office %"
                type="number"
                value={facts.home_office_percentage ? facts.home_office_percentage * 100 : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('home_office_percentage', (parseFloat(e.target.value) || 0) / 100)}
                suffix="%"
                helpText="Flagged if >= 20%"
            />
        </div>

        <FormField
            label="Cash Revenue %"
            type="number"
            value={facts.cash_revenue_percentage ? facts.cash_revenue_percentage * 100 : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('cash_revenue_percentage', (parseFloat(e.target.value) || 0) / 100)}
            suffix="%"
            helpText="High cash intake triggers scrutiny"
        />
    </div>
);

// Results Panel Component
const ResultsPanel = ({ results, isCalculating, brainType, scenarioType, facts, scenarioName }: any) => {
    if (isCalculating) {
        return (
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    const riskColor = results.risk_score.level === 'LOW' ? 'bg-green-50 border-green-200' :
        results.risk_score.level === 'MEDIUM' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200';

    return (
        <div className="space-y-6 sticky top-24">
            {/* Savings Summary */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <DollarSign size={32} />
                    <div className="text-sm font-black uppercase tracking-wider opacity-90">
                        Estimated Savings
                    </div>
                </div>
                <div className="text-5xl font-black mb-2">
                    ${results.total_savings.toLocaleString()}
                </div>
                <p className="text-emerald-50 font-bold leading-relaxed">
                    {results.summary}
                </p>
            </div>

            {/* Risk Score */}
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

            {/* Recommendations */}
            {results.recommendations.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={20} className="text-emerald-600" />
                        <div className="text-sm font-black uppercase tracking-wider text-navy-950">
                            Recommendations
                        </div>
                    </div>
                    <div className="space-y-3">
                        {results.recommendations.map((rec: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm font-bold text-navy-950">{rec.params.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save and Export Buttons */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-center">
                    <SaveScenarioButton
                        brainType={brainType}
                        scenarioType={scenarioType}
                        facts={facts}
                        results={results}
                    />
                </div>
                <div className="flex justify-center">
                    <PDFExportButton
                        scenarioName={scenarioName}
                        brainType={brainType}
                        scenarioType={scenarioType}
                        facts={facts}
                        results={results}
                    />
                </div>
            </div>
        </div>
    );
};
