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
        marital_status: 'single',
        is_first_time_buyer: false,
        has_rrsp: false,
        has_dependent_with_infirmity: false
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
                    <Link href="/tools/tax-engine" className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
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

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="is_first_time_buyer"
                checked={(facts as any).is_first_time_buyer || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('is_first_time_buyer' as any, e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="is_first_time_buyer" className="font-bold text-navy-950">
                Are you a first-time home buyer?
            </label>
        </div>

        {(facts as any).is_first_time_buyer && (
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    id="has_rrsp"
                    checked={(facts as any).has_rrsp || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('has_rrsp' as any, e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                />
                <label htmlFor="has_rrsp" className="font-bold text-navy-950">
                    Do you have an existing RRSP?
                </label>
            </div>
        )}

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="has_dependent_with_infirmity"
                checked={(facts as any).has_dependent_with_infirmity || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('has_dependent_with_infirmity' as any, e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="has_dependent_with_infirmity" className="font-bold text-navy-950">
                Are you supporting a dependant with a disability or infirmity?
            </label>
        </div>

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
            value={facts.canadian_income || facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = parseFloat(e.target.value) || 0;
                updateFact('canadian_income', val);
                updateFact('income', val); // Map to core income for tax calculations
            }}
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
                id="has_foreign_income_nwcmp"
                checked={facts.has_foreign_income || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateFact('has_foreign_income', e.target.checked);
                    if (!e.target.checked) updateFact('foreign_income', 0);
                }}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="has_foreign_income_nwcmp" className="font-bold text-navy-950">
                Did you earn income outside Canada before arriving?
            </label>
        </div>

        {facts.has_foreign_income && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FormField
                    label="Amount Earned Outside Canada (CAD)"
                    type="number"
                    value={facts.foreign_income || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('foreign_income', parseFloat(e.target.value) || 0)}
                    prefix="$"
                    helpText="Required to calculate if you meet the CRA 90% Rule for un-prorated credits."
                />
            </div>
        )}

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="moved_for_work_nwcmp"
                checked={facts.moved_for_work || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('moved_for_work', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="moved_for_work_nwcmp" className="font-bold text-navy-950">
                Did you move to Canada specifically for a new job or business?
            </label>
        </div>

        {facts.moved_for_work && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FormField
                    label="Distance Moved (km)"
                    type="number"
                    value={facts.moving_distance_km || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('moving_distance_km', parseFloat(e.target.value) || 0)}
                    helpText="Moving expenses are deductible if you moved at least 40km closer to a new workplace."
                />
            </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <input
                type="checkbox"
                id="applied_for_gst_credit_nwcmp"
                checked={facts.applied_for_gst_credit || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('applied_for_gst_credit', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="applied_for_gst_credit_nwcmp" className="font-bold text-navy-950">
                Have you applied for the GST/HST credit (RC151)?
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

const CheckItem = ({ id, label, checked, onChange, color, dark }: any) => (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${color || 'border-gray-200 bg-white'}`}>
        <input type="checkbox" id={id} checked={checked} onChange={(e) => onChange(e.target.checked)} className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 ${dark ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`} />
        <label htmlFor={id} className={`text-sm font-bold cursor-pointer ${dark ? 'text-gray-300' : 'text-navy-950'}`}>{label}</label>
    </div>
);

const AuditRiskSection = ({ facts, updateFact }: any) => {
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    return (
        <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-navy-950/40 uppercase tracking-widest flex items-center gap-2">
                    <Shield size={14} />
                    CRA Audit Risk Factors (Optional)
                </h4>
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider flex items-center gap-1 transition-colors">
                    {showAdvanced ? 'Hide' : 'Show All Triggers'}
                </button>
            </div>

            {/* Always-visible */}
            <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Total T-Slip Income" type="number" value={facts.total_t_slips_income || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('total_t_slips_income', parseFloat(e.target.value) || 0)} prefix="$" helpText="Sum of all T4/T5/T3 slips CRA received" />
                <FormField label="Medical Expenses Claimed" type="number" value={facts.reported_medical_expenses || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('reported_medical_expenses', parseFloat(e.target.value) || 0)} prefix="$" helpText="Flagged if > $15,000 or > 9% of income" />
                <FormField label="Charitable Donations" type="number" value={facts.donations_amount || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('donations_amount', parseFloat(e.target.value) || 0)} prefix="$" helpText="Flagged if > 10% of income" />
                <FormField label="Late Filing Years" type="number" value={facts.late_filing_years || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('late_filing_years', parseInt(e.target.value) || 0)} helpText="2+ consecutive years increases scrutiny" />
            </div>

            {showAdvanced && (
                <div className="mt-6 space-y-5">
                    {/* Tier 1 */}
                    <div className="p-5 bg-red-50 rounded-2xl border border-red-200">
                        <h5 className="text-xs font-black text-red-900 uppercase tracking-widest mb-1">Tier 1 — Automated Matching (95–100%)</h5>
                        <p className="text-xs text-red-700 font-medium mb-4">CRA computers flag these before a human reads your return.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField label="Platform/Gig Income (Uber, Etsy, etc.)" type="number" value={facts.platform_income || ''} onChange={(e: any) => updateFact('platform_income', parseFloat(e.target.value) || 0)} prefix="$" helpText="CRA receives T4As from platforms directly" />
                            <FormField label="Rental Income Received" type="number" value={facts.rental_income || ''} onChange={(e: any) => updateFact('rental_income', parseFloat(e.target.value) || 0)} prefix="$" helpText="Must declare on T776" />
                        </div>
                        <div className="mt-3 space-y-3">
                            <CheckItem id="platform_reported_life" label="Platform/gig income has been declared on this return" checked={facts.platform_income_reported || false} onChange={(v: boolean) => updateFact('platform_income_reported', v)} />
                            <CheckItem id="rental_reported_life" label="Rental income declared on T776" checked={facts.rental_income_reported || false} onChange={(v: boolean) => updateFact('rental_income_reported', v)} />
                            <CheckItem id="unreported_life" label="Potential unreported income suspected" checked={facts.unreported_income_suspected || false} onChange={(v: boolean) => updateFact('unreported_income_suspected', v)} color="border-red-300 bg-red-100" />
                        </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200">
                        <h5 className="text-xs font-black text-yellow-900 uppercase tracking-widest mb-1">Tier 2 — Behavioral Patterns (60–85%)</h5>
                        <p className="text-xs text-yellow-700 font-medium mb-4">Statistical deviations from your peer income group.</p>
                        <FormField label="Income Change % vs Last Year" type="number" value={facts.income_change_percent_yoy !== undefined ? facts.income_change_percent_yoy : ''} onChange={(e: any) => updateFact('income_change_percent_yoy', parseFloat(e.target.value) || 0)} suffix="%" helpText="Negative = dropped. >40% drop flagged." />
                        <div className="mt-3 space-y-3">
                            <CheckItem id="lifestyle_life" label="Lifestyle doesn't match income (luxury purchase, postal code outlier)" checked={facts.lifestyle_gap_detected || false} onChange={(v: boolean) => updateFact('lifestyle_gap_detected', v)} />
                            <CheckItem id="prior_reassess_life" label="Prior CRA reassessments on file" checked={facts.repeated_cra_reassessments || false} onChange={(v: boolean) => updateFact('repeated_cra_reassessments', v)} />
                        </div>
                    </div>

                    {/* Tier 4 — International */}
                    <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-200">
                        <h5 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Tier 4 — International / Offshore (80–95%)</h5>
                        <p className="text-xs text-indigo-700 font-medium mb-4">Canada auto-shares data with 100+ countries via OECD CRS.</p>
                        <div className="space-y-3">
                            <CheckItem id="foreign_assets_life" label="Foreign assets > $100,000 CAD at any point this year" checked={facts.foreign_assets_over_100k || false} onChange={(v: boolean) => updateFact('foreign_assets_over_100k', v)} />
                            <CheckItem id="t1135_life" label="T1135 (Foreign Income Verification) filed" checked={facts.t1135_filed || false} onChange={(v: boolean) => updateFact('t1135_filed', v)} />
                            <CheckItem id="offshore_life" label="Bank accounts or investments held outside Canada" checked={facts.has_offshore_accounts || false} onChange={(v: boolean) => updateFact('has_offshore_accounts', v)} color="border-indigo-300 bg-indigo-100" />
                        </div>
                    </div>

                    {/* Tier 5 */}
                    <div className="p-5 bg-gray-950 rounded-2xl border border-gray-800">
                        <h5 className="text-xs font-black text-white uppercase tracking-widest mb-1">⚠️ Death Zone — Near-Certain Rejection (90–100%)</h5>
                        <p className="text-xs text-gray-400 font-medium mb-4">Almost universally rejected with gross negligence penalties.</p>
                        <div className="space-y-3">
                            <CheckItem id="union_dues_life" label="Union dues claimed but T4 Box 44 is blank" checked={facts.union_dues_claim_mismatch || false} onChange={(v: boolean) => updateFact('union_dues_claim_mismatch', v)} color="border-gray-700 bg-gray-900" dark />
                            <CheckItem id="tax_shelter_life" label="Aggressive tax shelter claimed (GLGI, leveraged donations)" checked={facts.aggressive_tax_shelter_claimed || false} onChange={(v: boolean) => updateFact('aggressive_tax_shelter_claimed', v)} color="border-red-900 bg-red-950" dark />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



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

    const riskColor = results.risk_score.level === 'LOW' ? 'bg-green-50 border-green-200 text-green-900' :
        results.risk_score.level === 'MEDIUM' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' :
            results.risk_score.level === 'HIGH' ? 'bg-orange-50 border-orange-300 text-orange-900' :
                'bg-red-100 border-red-500 text-red-950'; // CRITICAL

    const tierColors: Record<number, string> = {
        1: 'bg-red-100 text-red-700', 2: 'bg-yellow-100 text-yellow-700',
        3: 'bg-blue-100 text-blue-700', 4: 'bg-indigo-100 text-indigo-700', 5: 'bg-black text-yellow-400'
    };

    return (
        <div className="space-y-6 sticky top-24">
            {/* Savings Summary */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <DollarSign size={32} />
                    <div className="text-sm font-black uppercase tracking-wider opacity-90">Estimated Savings</div>
                </div>
                <div className="text-5xl font-black mb-2">${results.total_savings.toLocaleString()}</div>
                <p className="text-emerald-50 font-bold leading-relaxed">{results.summary}</p>
            </div>

            {/* Risk Score */}
            <div className={`rounded-3xl border-2 ${riskColor} p-6`}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Shield size={22} />
                        <div className="text-sm font-black uppercase tracking-wider">CRA Audit Risk</div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black">{results.risk_score.score}<span className="text-base font-bold opacity-50">/100</span></div>
                        <div className="text-xs font-black">{results.risk_score.level}</div>
                    </div>
                </div>
                {results.risk_score.recommendations?.length > 0 && (
                    <div className="mb-4 space-y-1">
                        {results.risk_score.recommendations.map((r: string, i: number) => (
                            <p key={i} className="text-xs font-bold opacity-80">{r}</p>
                        ))}
                    </div>
                )}
                {results.risk_score.flags.length > 0 && (
                    <div className="space-y-3 mt-4">
                        {results.risk_score.flags.map((flag: any, i: number) => (
                            <details key={i} className="text-xs rounded-xl overflow-hidden border border-current/20">
                                <summary className="flex items-start gap-2 p-3 cursor-pointer font-bold hover:bg-black/5 list-none">
                                    <AlertTriangle size={13} className="mt-0.5 flex-shrink-0" />
                                    <span className="flex-1">{flag.message}</span>
                                    <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-black flex-shrink-0 ${tierColors[flag.tier] || 'bg-gray-100 text-gray-700'}`}>{flag.code}</span>
                                </summary>
                                {flag.action && (
                                    <div className="px-3 pb-3 pt-1 bg-white/50 text-[11px] font-medium leading-relaxed border-t border-current/10">
                                        <span className="font-black uppercase tracking-wide text-[10px] block mb-1">→ What to do:</span>
                                        {flag.action}
                                    </div>
                                )}
                            </details>
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
