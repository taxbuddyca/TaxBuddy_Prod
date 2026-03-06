"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp as TrendingUpIcon, Home, Globe,
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

type ScenarioType = 'crypto' | 'real_estate' | 'cross_border' | null;

export default function NicheEngine() {
    const [scenario, setScenario] = useState<ScenarioType>(null);
    const [facts, setFacts] = useState<Partial<TaxFacts>>({
        income: 0,
        province: 'ON',
        crypto_trades_per_year: 0,
        average_holding_period_days: 0,
        crypto_gains_amount: 0,
        property_ownership_days: 0,
        sale_reason: 'other',
        properties_sold_in_year: 0,
        has_us_income: false,
        filed_us_taxes: false
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brainType: 'niche', facts }),
            });
            if (!response.ok) throw new Error('Calculation failed');
            const data = await response.json();
            setResults(data);
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
                    <Link href="/tools/tax-engine" className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                        <ArrowLeft size={20} />
                        Back to Brain Selection
                    </Link>

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                                <TrendingUpIcon size={32} className="text-purple-600" />
                            </div>
                            <h1 className="text-5xl font-black text-navy-950 tracking-tight">
                                Niche Engine
                            </h1>
                        </div>
                        <p className="text-xl text-navy-900/60 font-bold max-w-2xl mx-auto">
                            Specialized Tax Scenarios
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <ScenarioCard
                            icon={<TrendingUpIcon size={28} className="text-orange-600" />}
                            title="Crypto Auditor"
                            description="Income vs Capital Gains"
                            features={[
                                "Trading frequency analysis",
                                "HODL vs day-trading",
                                "Business income warnings"
                            ]}
                            onClick={() => setScenario('crypto')}
                            color="border-orange-200 hover:border-orange-400"
                        />

                        <ScenarioCard
                            icon={<Home size={28} className="text-indigo-600" />}
                            title="Real Estate Flipper"
                            description="Anti-flipping tax rules"
                            features={[
                                "365-day rule check",
                                "Exemption eligibility",
                                "Multiple property warnings"
                            ]}
                            onClick={() => setScenario('real_estate')}
                            color="border-indigo-200 hover:border-indigo-400"
                        />

                        <ScenarioCard
                            icon={<Globe size={28} className="text-teal-600" />}
                            title="Cross-Border"
                            description="US/Canada tax optimization"
                            features={[
                                "Foreign income reporting",
                                "Tax credit optimization",
                                "Dual filing requirements"
                            ]}
                            onClick={() => setScenario('cross_border')}
                            color="border-teal-200 hover:border-teal-400"
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
                    <Link href="/tools/tax-engine" className="inline-flex items-center gap-2 text-navy-900/60 hover:text-navy-950 font-bold mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                        <ArrowLeft size={20} />
                        Change Scenario
                    </Link>
                    <h2 className="text-4xl font-black text-navy-950 mb-2">
                        {scenario === 'crypto' && 'Crypto Auditor'}
                        {scenario === 'real_estate' && 'Real Estate Flipper'}
                        {scenario === 'cross_border' && 'Cross-Border Tax'}
                    </h2>
                    <p className="text-navy-900/60 font-bold mb-6">
                        Answer the questions below to understand your specialized tax situation
                    </p>

                    <TabNavigation
                        tabs={[
                            { id: 'calculator', label: 'Calculator', icon: <LayoutDashboard /> },
                            { id: 'saved', label: 'Saved Scenarios', icon: <Save /> }
                        ]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {activeTab === 'calculator' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                                {scenario === 'crypto' && <CryptoForm facts={facts} updateFact={updateFact} />}
                                {scenario === 'real_estate' && <RealEstateForm facts={facts} updateFact={updateFact} />}
                                {scenario === 'cross_border' && <CrossBorderForm facts={facts} updateFact={updateFact} />}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            {results ? (
                                <ResultsPanel
                                    results={results}
                                    isCalculating={isCalculating}
                                    brainType="niche"
                                    scenarioType={scenario || ''}
                                    facts={facts}
                                    scenarioName={scenario === 'crypto' ? 'Crypto Tax' : scenario === 'real_estate' ? 'Real Estate Flipper' : 'Cross-Border Tax'}
                                />
                            ) : (
                                <div className="bg-white rounded-3xl border border-gray-200 p-8 text-center">
                                    <Calculator size={48} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-navy-900/40 font-bold">
                                        Fill out the form to see your specialized tax analysis
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
                        <SavedScenariosPanel
                            brainType="niche"
                            onLoadScenario={(loadedScenario) => {
                                setScenario(loadedScenario.scenario_type as ScenarioType);
                                setFacts(loadedScenario.facts);
                                setResults(loadedScenario.results);
                                setActiveTab('calculator');
                            }}
                        />
                    </div>
                )}
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
                    <CheckCircle2 size={16} className="text-purple-600" />
                    <span>{feature}</span>
                </div>
            ))}
        </div>
    </motion.button>
);

const CryptoForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Your Annual Income"
            type="number"
            value={facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('income', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Number of Crypto Trades This Year"
            type="number"
            value={facts.crypto_trades_per_year || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('crypto_trades_per_year', parseInt(e.target.value) || 0)}
            helpText="Total buy/sell transactions across all exchanges"
        />

        <FormField
            label="Average Holding Period (Days)"
            type="number"
            value={facts.average_holding_period_days || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('average_holding_period_days', parseInt(e.target.value) || 0)}
            helpText="How long do you typically hold crypto before selling?"
        />

        <FormField
            label="Estimated Crypto Gains This Year"
            type="number"
            value={facts.crypto_gains_amount || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('crypto_gains_amount', parseFloat(e.target.value) || 0)}
            prefix="$"
            helpText="Total capital gains amount (over $250k triggers 66.67% inclusion rate)"
        />

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

const RealEstateForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Your Annual Income"
            type="number"
            value={facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('income', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Property Ownership Period (Days)"
            type="number"
            value={facts.property_ownership_days || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('property_ownership_days', parseInt(e.target.value) || 0)}
            helpText="How many days did you own the property before selling?"
        />

        <FormField
            label="Estimated Profit From Sale (Capital Gain)"
            type="number"
            value={facts.property_sale_gain || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('property_sale_gain', parseFloat(e.target.value) || 0)}
            prefix="$"
            helpText="The net profit made on the sale of the property."
        />

        <FormField
            label="Property Assessed Value"
            type="number"
            value={facts.property_assessed_value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('property_assessed_value', parseFloat(e.target.value) || 0)}
            prefix="$"
            helpText="Required to calculate potential Underused Housing Tax (UHT) penalties."
        />

        <FormField
            label="Properties Sold This Year"
            type="number"
            value={facts.properties_sold_in_year || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('properties_sold_in_year', parseInt(e.target.value) || 0)}
        />

        <div>
            <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                Reason for Sale
            </label>
            <select
                value={facts.sale_reason || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFact('sale_reason', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none font-bold text-navy-950"
            >
                <option value="">Select reason</option>
                <option value="safety">Safety concerns</option>
                <option value="death">Death in family</option>
                <option value="job_change">Job relocation</option>
                <option value="disability">Disability</option>
                <option value="divorce">Divorce/separation</option>
                <option value="other">Other/Investment</option>
            </select>
        </div>

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="is_vacant_property"
                checked={facts.is_vacant_property || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('is_vacant_property', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="is_vacant_property" className="font-bold text-navy-950">
                Was the property vacant or unoccupied for more than 180 days?
            </label>
        </div>

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

const CrossBorderForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Canadian Income"
            type="number"
            value={facts.income || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('income', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="has_us_income"
                checked={facts.has_us_income || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('has_us_income', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300"
            />
            <label htmlFor="has_us_income" className="font-bold text-navy-950">
                Do you have US income?
            </label>
        </div>

        {facts.has_us_income && (
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    id="filed_us_taxes"
                    checked={facts.filed_us_taxes || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('filed_us_taxes', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                />
                <label htmlFor="filed_us_taxes" className="font-bold text-navy-950">
                    Have you filed US tax returns?
                </label>
            </div>
        )}

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

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
                    className={`w-full ${prefix ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-10' : 'pr-4'} py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none font-bold text-navy-950 transition-colors`}
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
    const [show, setShow] = React.useState(false);
    return (
        <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-navy-900/40 uppercase tracking-widest flex items-center gap-2">
                    <Shield size={14} />
                    CRA Audit Risk Factors
                </h4>
                <button onClick={() => setShow(!show)} className="text-xs font-black text-purple-600 hover:text-purple-700 uppercase tracking-wider transition-colors">
                    {show ? 'Hide' : 'Show All Triggers'}
                </button>
            </div>

            {/* Always-visible */}
            <div className="grid md:grid-cols-2 gap-4">
                <FormField label="Annual Meal Expenses" type="number" value={facts.meals_expenses || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('meals_expenses', parseFloat(e.target.value) || 0)} prefix="$" helpText="Flagged if > 2% of revenue" />
                <FormField label="Home Office %" type="number" value={facts.home_office_percentage || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('home_office_percentage', parseFloat(e.target.value) || 0)} suffix="%" helpText="Flagged if > 20%" />
                <FormField label="Cash Revenue %" type="number" value={facts.cash_revenue_percentage || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('cash_revenue_percentage', parseFloat(e.target.value) || 0)} suffix="%" helpText="High cash intake triggers scrutiny" />
                <FormField label="Late Filing Years" type="number" value={facts.late_filing_years || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('late_filing_years', parseInt(e.target.value) || 0)} helpText="2+ years = heightened scrutiny" />
            </div>

            {show && (
                <div className="mt-6 space-y-5">
                    {/* Tier 1 — Income */}
                    <div className="p-5 bg-red-50 rounded-2xl border border-red-200">
                        <h5 className="text-xs font-black text-red-900 uppercase tracking-widest mb-3">Tier 1 — Automated Income Matching</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField label="Total T-Slip Income" type="number" value={facts.total_t_slips_income || ''} onChange={(e: any) => updateFact('total_t_slips_income', parseFloat(e.target.value) || 0)} prefix="$" helpText="Must match reported income" />
                            <FormField label="Medical Expenses" type="number" value={facts.reported_medical_expenses || ''} onChange={(e: any) => updateFact('reported_medical_expenses', parseFloat(e.target.value) || 0)} prefix="$" helpText="Flagged if > $15k" />
                        </div>
                        <div className="mt-3 space-y-3">
                            <CheckItem id="crypto_reported" label="Crypto gains/income declared on this return" checked={facts.crypto_gains_reported || false} onChange={(v: boolean) => updateFact('crypto_gains_reported', v)} />
                            <CheckItem id="rental_reported_niche" label="Rental/Airbnb income declared on T776" checked={facts.rental_income_reported || false} onChange={(v: boolean) => updateFact('rental_income_reported', v)} />
                            <CheckItem id="unreported_niche" label="Potential unreported income suspected (tip or discrepancy)" checked={facts.unreported_income_suspected || false} onChange={(v: boolean) => updateFact('unreported_income_suspected', v)} color="border-red-300 bg-red-100" />
                        </div>
                    </div>

                    {/* Tier 2 — Behavioral */}
                    <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200">
                        <h5 className="text-xs font-black text-yellow-900 uppercase tracking-widest mb-3">Tier 2 — Behavioral Patterns</h5>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField label="Airbnb / Short-Term Rental Days" type="number" value={facts.airbnb_rental_days || ''} onChange={(e: any) => updateFact('airbnb_rental_days', parseInt(e.target.value) || 0)} helpText=">14 days triggers reporting obligation" />
                            <FormField label="Properties Owned" type="number" value={facts.num_properties_owned || ''} onChange={(e: any) => updateFact('num_properties_owned', parseInt(e.target.value) || 0)} helpText="Multiple properties = multiple PRE risk" />
                        </div>
                        <div className="mt-3 space-y-3">
                            <CheckItem id="lifestyle_niche" label="Lifestyle doesn't match income (luxury car, large property)" checked={facts.lifestyle_gap_detected || false} onChange={(v: boolean) => updateFact('lifestyle_gap_detected', v)} />
                            <CheckItem id="prior_niche" label="Prior CRA reassessments on file" checked={facts.repeated_cra_reassessments || false} onChange={(v: boolean) => updateFact('repeated_cra_reassessments', v)} />
                        </div>
                    </div>

                    {/* Tier 4 — International */}
                    <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-200">
                        <h5 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-3">Tier 4 — International / Offshore (80–95%)</h5>
                        <div className="space-y-3">
                            <CheckItem id="foreign_niche" label="Foreign assets > $100,000 CAD — T1135 required" checked={facts.foreign_assets_over_100k || false} onChange={(v: boolean) => updateFact('foreign_assets_over_100k', v)} />
                            <CheckItem id="t1135_niche" label="T1135 filed with this return" checked={facts.t1135_filed || false} onChange={(v: boolean) => updateFact('t1135_filed', v)} />
                            <CheckItem id="offshore_niche" label="Offshore bank accounts or investments" checked={facts.has_offshore_accounts || false} onChange={(v: boolean) => updateFact('has_offshore_accounts', v)} color="border-indigo-300 bg-indigo-100" />
                        </div>
                    </div>

                    {/* Tier 5 */}
                    <div className="p-5 bg-gray-950 rounded-2xl border border-gray-800">
                        <h5 className="text-xs font-black text-white uppercase tracking-widest mb-3">⚠️ Death Zone (90–100%)</h5>
                        <div className="space-y-3">
                            <CheckItem id="shelter_niche" label="Aggressive tax shelter claimed (GLGI, leveraged donations)" checked={facts.aggressive_tax_shelter_claimed || false} onChange={(v: boolean) => updateFact('aggressive_tax_shelter_claimed', v)} color="border-red-900 bg-red-950" dark />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



const ResultsPanel = ({ results, isCalculating, brainType, scenarioType, facts, scenarioName }: any) => {
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
            <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                    <DollarSign size={32} />
                    <div className="text-sm font-black uppercase tracking-wider opacity-90">
                        Estimated Savings
                    </div>
                </div>
                <div className="text-5xl font-black mb-2">
                    ${Math.abs(results.total_savings).toLocaleString()}
                </div>
                <p className="text-purple-50 font-bold leading-relaxed">
                    {results.summary}
                </p>
            </div>

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

            {results.recommendations.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={20} className="text-purple-600" />
                        <div className="text-sm font-black uppercase tracking-wider text-navy-950">
                            Recommendations
                        </div>
                    </div>
                    <div className="space-y-3">
                        {results.recommendations.map((rec: any, i: number) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                                {rec.params.risk_level === 'high' || rec.params.risk_level === 'critical' ? (
                                    <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                                ) : (
                                    <CheckCircle2 size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                                )}
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
