"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Users as UsersIcon, Zap, Car,
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

type ScenarioType = 'hiring' | 'hst' | 'vehicle' | null;

export default function GrowthEngine() {
    const [scenario, setScenario] = useState<ScenarioType>(null);
    const [showAdvancedRisk, setShowAdvancedRisk] = useState(false);
    const [facts, setFacts] = useState<Partial<TaxFacts>>({
        income: 0,
        revenue: 0,
        province: 'ON',
        business_expenses: 0,
        hiring_spouse: false,
        spouse_hours_per_week: 0,
        spouse_age: 0,
        industry: '',
        vehicle_type: 'gas',
        vehicle_cost: 0,
        business_use_percentage: 0
    });
    const [results, setResults] = useState<any>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [activeTab, setActiveTab] = useState('calculator');



    useEffect(() => {
        if (scenario && facts.revenue && facts.revenue > 0) {
            calculateResults();
        }
    }, [facts, scenario]);

    const calculateResults = async () => {
        setIsCalculating(true);
        try {
            const response = await fetch('/api/tax-engine/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ brainType: 'growth', facts }),
            });
            if (!response.ok) {
                throw new Error('Calculation failed');
            }
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
                                scenarioName={scenario === 'hiring' ? 'Hiring Logic' : scenario === 'hst' ? 'HST Optimizer' : 'Vehicle Matrix'}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('revenue', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <div className="flex items-center gap-4">
            <input
                type="checkbox"
                id="hiring_spouse"
                checked={facts.hiring_spouse || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('hiring_spouse', e.target.checked)}
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('spouse_hours_per_week', parseFloat(e.target.value) || 0)}
                    helpText="TOSI rules require 20+ hours/week for salary deductibility"
                />

                <FormField
                    label="Spouse's Age"
                    type="number"
                    value={facts.spouse_age || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('spouse_age', parseInt(e.target.value) || 0)}
                    helpText="Age 65+ exempts from TOSI rules"
                />

                <FormField
                    label="Target Spouse Salary"
                    type="number"
                    value={facts.target_spouse_salary || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('target_spouse_salary', parseFloat(e.target.value) || 0)}
                    prefix="$"
                    helpText="Annual salary to pay your spouse"
                />
            </>
        )}

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

const HSTForm = ({ facts, updateFact }: any) => (
    <div className="space-y-6">
        <FormField
            label="Annual Business Revenue"
            type="number"
            value={facts.revenue || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('revenue', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <FormField
            label="Annual Business Expenses"
            type="number"
            value={facts.business_expenses || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('business_expenses', parseFloat(e.target.value) || 0)}
            prefix="$"
        />

        <div>
            <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                Industry
            </label>
            <select
                value={facts.industry || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFact('industry', e.target.value)}
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

        <AuditRiskSection facts={facts} updateFact={updateFact} />
    </div>
);

const AuditRiskSection = ({ facts, updateFact }: any) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-navy-900/40 uppercase tracking-widest flex items-center gap-2">
                    <Shield size={14} />
                    CRA Audit Risk Factors
                </h4>
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                    {showAdvanced ? 'Hide' : 'Show All Triggers'}
                    <TrendingUp size={12} className={showAdvanced ? 'rotate-180' : ''} />
                </button>
            </div>

            {/* Always-visible basic fields */}
            <div className="grid md:grid-cols-2 gap-4">
                <FormField
                    label="Annual Meal Expenses"
                    type="number"
                    value={facts.meals_expenses || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('meals_expenses', parseFloat(e.target.value) || 0)}
                    prefix="$"
                    helpText="Flagged if > 2% of revenue"
                />
                <FormField
                    label="Home Office %"
                    type="number"
                    value={facts.home_office_percentage ? (facts.home_office_percentage).toFixed(0) : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('home_office_percentage', parseFloat(e.target.value) || 0)}
                    suffix="%"
                    helpText="Flagged if > 20% — CRA expects 5–15%"
                />
                <FormField
                    label="Total Annual Home Expenses"
                    type="number"
                    value={facts.total_home_expenses || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('total_home_expenses', parseFloat(e.target.value) || 0)}
                    prefix="$"
                    helpText="Heat, hydro, insurance, property tax"
                />
                <FormField
                    label="Cash Revenue %"
                    type="number"
                    value={facts.cash_revenue_percentage ? (facts.cash_revenue_percentage).toFixed(0) : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFact('cash_revenue_percentage', parseFloat(e.target.value) || 0)}
                    suffix="%"
                    helpText="Flagged if > 30% in high-revenue business"
                />
            </div>

            {showAdvanced && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">

                    {/* TIER 1 — Automated Income Matching */}
                    <div className="p-5 bg-red-50 rounded-2xl border border-red-200">
                        <h5 className="text-xs font-black text-red-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <AlertTriangle size={12} className="text-red-600" />
                            Tier 1 — Automated Income Matching (95–100% audit trigger)
                        </h5>
                        <p className="text-xs text-red-700 font-medium mb-4">CRA's computers flag these before a human reads your return.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                label="Total T-Slip Income (T4/T5/T3/T5013)"
                                type="number"
                                value={facts.total_t_slips_income || ''}
                                onChange={(e: any) => updateFact('total_t_slips_income', parseFloat(e.target.value) || 0)}
                                prefix="$"
                                helpText="All slips CRA received — must match reported income"
                            />
                            <FormField
                                label="GST/HST Return Revenue"
                                type="number"
                                value={facts.gst_revenue || ''}
                                onChange={(e: any) => updateFact('gst_revenue', parseFloat(e.target.value) || 0)}
                                prefix="$"
                                helpText="Revenue on your GST/HST filing — must match T2125"
                            />
                            <FormField
                                label="Platform / Gig Income (Uber, Airbnb, etc.)"
                                type="number"
                                value={facts.platform_income || ''}
                                onChange={(e: any) => updateFact('platform_income', parseFloat(e.target.value) || 0)}
                                prefix="$"
                                helpText="CRA receives T4As from these platforms"
                            />
                            <div>
                                <label className="block text-xs font-black text-navy-950 mb-2 uppercase tracking-wider">Platform Income Reported?</label>
                                <div className="flex gap-4 mt-1">
                                    {[true, false].map(v => (
                                        <label key={String(v)} className="flex items-center gap-2 font-bold text-sm cursor-pointer">
                                            <input type="radio" name="platform_reported" checked={facts.platform_income_reported === v} onChange={() => updateFact('platform_income_reported', v)} />
                                            {v ? 'Yes — declared' : 'No — not reported'}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <FormField
                                label="Medical Expenses Claimed"
                                type="number"
                                value={facts.reported_medical_expenses || ''}
                                onChange={(e: any) => updateFact('reported_medical_expenses', parseFloat(e.target.value) || 0)}
                                prefix="$"
                                helpText="Flagged if > $15,000 or > 9% of income"
                            />
                            <FormField
                                label="Vehicles Registered in Name"
                                type="number"
                                value={facts.num_vehicles_owned || ''}
                                onChange={(e: any) => updateFact('num_vehicles_owned', parseInt(e.target.value) || 0)}
                                helpText="CRA checks for 2nd car if 100% use claimed"
                            />
                        </div>
                        <div className="mt-4 space-y-3">
                            <CheckItem id="family_remittance" label="Spouse T4 issued AND actual bank transfer confirmed" checked={facts.family_remittance_transfer_confirmed || false} onChange={(v: boolean) => updateFact('family_remittance_transfer_confirmed', v)} color="border-red-200 bg-white" />
                            <CheckItem id="unreported_income" label="Potential unreported income suspected (tip, discrepancy, or prior year issue)" checked={facts.unreported_income_suspected || false} onChange={(v: boolean) => updateFact('unreported_income_suspected', v)} color="border-red-300 bg-red-100" />
                        </div>
                    </div>

                    {/* TIER 2 — Behavioral Pattern Flags */}
                    <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200">
                        <h5 className="text-xs font-black text-yellow-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <AlertTriangle size={12} className="text-yellow-600" />
                            Tier 2 — Behavioral Patterns (60–85% audit trigger)
                        </h5>
                        <p className="text-xs text-yellow-700 font-medium mb-4">CRA's statistical models compare your return against thousands of similar profiles.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                label="Consecutive Business Loss Years"
                                type="number"
                                value={facts.business_loss_years_consecutive || ''}
                                onChange={(e: any) => updateFact('business_loss_years_consecutive', parseInt(e.target.value) || 0)}
                                helpText="3+ years triggers 'hobby business' test"
                            />
                            <FormField
                                label="Income Change % vs Last Year"
                                type="number"
                                value={facts.income_change_percent_yoy !== undefined ? facts.income_change_percent_yoy : ''}
                                onChange={(e: any) => updateFact('income_change_percent_yoy', parseFloat(e.target.value) || 0)}
                                suffix="%"
                                helpText="Negative = income dropped. >40% drop is flagged."
                            />
                        </div>
                        <div className="mt-4 space-y-3">
                            <CheckItem id="lifestyle_gap" label="Lifestyle / income gap (luxury car, postal code outlier, large asset purchase)" checked={facts.lifestyle_gap_detected || false} onChange={(v: boolean) => updateFact('lifestyle_gap_detected', v)} color="border-yellow-200 bg-white" />
                            <CheckItem id="cash_deposits" label="Frequent near-$10,000 cash deposits (construction or renovation industry)" checked={facts.cash_deposits_frequency_high || false} onChange={(v: boolean) => updateFact('cash_deposits_frequency_high', v)} color="border-yellow-200 bg-white" />
                            <CheckItem id="worker_misclass" label="Some contractors may legally qualify as employees (same tools, same hours, controlled schedule)" checked={facts.worker_misclassification_suspected || false} onChange={(v: boolean) => updateFact('worker_misclassification_suspected', v)} color="border-yellow-200 bg-white" />
                            <CheckItem id="prior_reassessments" label="Prior CRA reassessments on file (increases scrutiny on this year)" checked={facts.repeated_cra_reassessments || false} onChange={(v: boolean) => updateFact('repeated_cra_reassessments', v)} color="border-yellow-200 bg-white" />
                        </div>
                    </div>

                    {/* TIER 3 — Expense Ratio Outliers */}
                    <div className="p-5 bg-blue-50 rounded-2xl border border-blue-200">
                        <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <AlertTriangle size={12} className="text-blue-600" />
                            Tier 3 — Expense Ratios & Outliers (30–65% audit trigger)
                        </h5>
                        <p className="text-xs text-blue-700 font-medium mb-4">Deductions beyond industry benchmarks trigger automated outlier scoring.</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                label="Subcontractor Fees Paid"
                                type="number"
                                value={facts.subcontractor_fees || ''}
                                onChange={(e: any) => updateFact('subcontractor_fees', parseFloat(e.target.value) || 0)}
                                prefix="$"
                                helpText="T4A required for each contractor > $500"
                            />
                            <FormField
                                label="Number of T4A Contractors"
                                type="number"
                                value={facts.num_t4a_contractors || ''}
                                onChange={(e: any) => updateFact('num_t4a_contractors', parseInt(e.target.value) || 0)}
                                helpText="Leave 0 if none issued"
                            />
                            <FormField
                                label="Donations Claimed"
                                type="number"
                                value={facts.donations_amount || ''}
                                onChange={(e: any) => updateFact('donations_amount', parseFloat(e.target.value) || 0)}
                                prefix="$"
                                helpText="Flagged if > 10% of income"
                            />
                            <FormField
                                label="Late Filing Years"
                                type="number"
                                value={facts.late_filing_years || ''}
                                onChange={(e: any) => updateFact('late_filing_years', parseInt(e.target.value) || 0)}
                                helpText="2+ consecutive late years = heightened scrutiny"
                            />
                        </div>
                        <div className="mt-4 space-y-3">
                            <CheckItem id="t4a_issued" label="T4A slips issued for all contractor payments > $500" checked={facts.t4a_slips_issued || false} onChange={(v: boolean) => updateFact('t4a_slips_issued', v)} color="border-blue-200 bg-white" />
                            <CheckItem id="gst_new_registrant" label="Claiming a large GST/HST refund in first year of registration" checked={facts.gst_refund_claim_new_registrant || false} onChange={(v: boolean) => updateFact('gst_refund_claim_new_registrant', v)} color="border-blue-200 bg-white" />
                            <CheckItem id="shareholder_benefits" label="Corporate funds used for personal expenses (meals, car, home renovation) not included in personal income" checked={facts.shareholder_benefits_not_reported || false} onChange={(v: boolean) => updateFact('shareholder_benefits_not_reported', v)} color="border-blue-300 bg-blue-100" />
                        </div>
                    </div>

                    {/* TIER 4 — International */}
                    <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-200">
                        <h5 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <AlertTriangle size={12} className="text-indigo-600" />
                            Tier 4 — International / Offshore (80–95% audit trigger)
                        </h5>
                        <p className="text-xs text-indigo-700 font-medium mb-4">Canada shares financial data with 100+ countries via the OECD Common Reporting Standard (CRS).</p>
                        <div className="space-y-3">
                            <CheckItem id="foreign_assets" label="Foreign assets (stocks, property, bank accounts) exceeded $100,000 CAD at any point this year" checked={facts.foreign_assets_over_100k || false} onChange={(v: boolean) => updateFact('foreign_assets_over_100k', v)} color="border-indigo-200 bg-white" />
                            <CheckItem id="t1135_filed" label="T1135 (Foreign Income Verification Statement) filed with this return" checked={facts.t1135_filed || false} onChange={(v: boolean) => updateFact('t1135_filed', v)} color="border-indigo-200 bg-white" />
                            <CheckItem id="offshore_accounts" label="Bank accounts or investments held outside Canada" checked={facts.has_offshore_accounts || false} onChange={(v: boolean) => updateFact('has_offshore_accounts', v)} color="border-indigo-300 bg-indigo-100" />
                        </div>
                    </div>

                    {/* TIER 5 — Death Zone */}
                    <div className="p-5 bg-gray-950 rounded-2xl border border-gray-800">
                        <h5 className="text-xs font-black text-white uppercase tracking-widest mb-1 flex items-center gap-2">
                            <AlertTriangle size={12} className="text-yellow-400" />
                            ⚠️ Death Zone — Near-Certain Rejection (90–100%)
                        </h5>
                        <p className="text-xs text-gray-400 font-medium mb-4">These items are almost universally rejected by CRA with gross negligence penalties.</p>
                        <div className="space-y-3">
                            <CheckItem id="fake_log" label="Mileage logbook has repetitive round numbers, exact duplicates, or impossible trip patterns" checked={facts.irregular_mileage_log || false} onChange={(v: boolean) => updateFact('irregular_mileage_log', v)} color="border-gray-700 bg-gray-900 text-gray-300" dark />
                            <CheckItem id="loan" label="Shareholder loan not repaid within 1 year of corporate fiscal year-end" checked={facts.unpaid_shareholder_loan || false} onChange={(v: boolean) => updateFact('unpaid_shareholder_loan', v)} color="border-gray-700 bg-gray-900 text-gray-300" dark />
                            <CheckItem id="union_dues" label="Union dues claimed but T4 Box 44 is blank" checked={facts.union_dues_claim_mismatch || false} onChange={(v: boolean) => updateFact('union_dues_claim_mismatch', v)} color="border-gray-700 bg-gray-900 text-gray-300" dark />
                            <CheckItem id="tax_shelter" label="Aggressive tax shelter claimed (GLGI, leveraged donations, gifting schemes)" checked={facts.aggressive_tax_shelter_claimed || false} onChange={(v: boolean) => updateFact('aggressive_tax_shelter_claimed', v)} color="border-red-900 bg-red-950 text-red-300" dark />
                            <CheckItem id="salary_low" label="Owner-manager salary is below minimum wage while corporation earns significant revenue (TOSI risk)" checked={facts.salary_below_minimum_wage || false} onChange={(v: boolean) => updateFact('salary_below_minimum_wage', v)} color="border-red-900 bg-red-950 text-red-300" dark />
                        </div>
                    </div>

                    {/* Audit-Proofing Tips */}
                    <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <h5 className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Shield size={12} />
                            How to Reduce Your Risk to Under 1%
                        </h5>
                        <div className="space-y-3">
                            {[
                                ['Attach an Explanatory Note', 'Unusual years (big expenses, major loss, large refund) — attach a brief note to your return. It prevents CRA from flagging unknowns.'],
                                ['Run the Ratio Check', 'Before filing, check every expense as a % of revenue. If Meals are 8% of revenue or Office Supplies are 15%, flag it.'],
                                ['Keep Records 6 Years', 'CRA can review any return up to 6 years after the notice of assessment date. That means 2024 → keep until 2030.'],
                                ['Digital Mileage Logs', 'Apps like TripLog or MileIQ automatically generate GPS-verified logs that CRA accepts without question.'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600 font-black text-xs">{String(i + 1).padStart(2, '0')}</div>
                                    <div className="text-sm"><p className="font-bold text-navy-950">{title}</p><p className="text-navy-900/60 font-medium">{desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CheckItem = ({ id, label, checked, onChange, color, dark }: any) => (
    <div className={`flex items-start gap-3 p-3 rounded-xl border ${color || 'border-gray-200 bg-white'}`}>
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 ${dark ? 'border-gray-600 bg-gray-800' : 'border-gray-300'}`}
        />
        <label htmlFor={id} className={`text-sm font-bold cursor-pointer ${dark ? 'text-gray-300' : 'text-navy-950'}`}>
            {label}
        </label>
    </div>
);



const VehicleForm = ({ facts, updateFact }: any) => {
    const calculateBusinessUse = (total: number, business: number) => {
        if (total > 0) {
            updateFact('business_use_percentage', (business / total) * 100);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
                <FormField
                    label="Vehicle Cost (Pre-tax)"
                    type="number"
                    value={facts.vehicle_cost || ''}
                    onChange={(e: any) => updateFact('vehicle_cost', parseFloat(e.target.value) || 0)}
                    prefix="$"
                    helpText="Manufacturer's Suggested Retail Price"
                />

                <div>
                    <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                        Financing Type
                    </label>
                    <select
                        value={facts.vehicle_financing_type || 'purchase'}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFact('vehicle_financing_type', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold text-navy-950"
                    >
                        <option value="purchase">Purchase (Buy/Finance)</option>
                        <option value="lease">Lease</option>
                    </select>
                </div>
            </div>

            {facts.vehicle_financing_type === 'lease' && (
                <FormField
                    label="Monthly Lease Payment"
                    type="number"
                    value={facts.monthly_lease_payment || ''}
                    onChange={(e: any) => updateFact('monthly_lease_payment', parseFloat(e.target.value) || 0)}
                    prefix="$"
                    helpText="Monthly payment before tax"
                />
            )}

            <div>
                <label className="block text-sm font-black text-navy-950 mb-2 uppercase tracking-wider">
                    Vehicle Type
                </label>
                <select
                    value={facts.vehicle_type || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFact('vehicle_type', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none font-bold text-navy-950"
                >
                    <option value="">Select type</option>
                    <option value="zero_emission">Zero-Emission (EV)</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="gas">Gas/Diesel</option>
                </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <FormField
                    label="Total Annual Mileage"
                    type="number"
                    value={facts.total_annual_mileage || ''}
                    onChange={(e: any) => {
                        const val = parseFloat(e.target.value) || 0;
                        updateFact('total_annual_mileage', val);
                        calculateBusinessUse(val, facts.business_mileage || 0);
                    }}
                    suffix="km"
                    helpText="Total km driven in the year"
                />

                <FormField
                    label="Business Mileage"
                    type="number"
                    value={facts.business_mileage || ''}
                    onChange={(e: any) => {
                        const val = parseFloat(e.target.value) || 0;
                        updateFact('business_mileage', val);
                        calculateBusinessUse(facts.total_annual_mileage || 0, val);
                    }}
                    suffix="km"
                    helpText="Km driven for business purposes"
                />
            </div>

            <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-green-900 uppercase tracking-wider">Calculated Business Use</span>
                    <span className="text-2xl font-black text-green-600">
                        {facts.business_use_percentage ? facts.business_use_percentage.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : "0.000"}%
                    </span>
                </div>
            </div>

            <FormField
                label="Annual Operating Expenses"
                type="number"
                value={facts.vehicle_expenses || ''}
                onChange={(e: any) => updateFact('vehicle_expenses', parseFloat(e.target.value) || 0)}
                prefix="$"
                helpText="Fuel, maintenance, insurance (100% total)"
            />

            <AuditRiskSection facts={facts} updateFact={updateFact} />
        </div>
    );
};

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
        1: 'bg-red-100 text-red-700',
        2: 'bg-yellow-100 text-yellow-700',
        3: 'bg-blue-100 text-blue-700',
        4: 'bg-indigo-100 text-indigo-700',
        5: 'bg-black text-yellow-400'
    };

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
                    ${results.total_savings.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                </div>
                <p className="text-blue-50 font-bold leading-relaxed">
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

            {scenarioType === 'vehicle' && results.breakdown.vehicle_matrix && (
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Car size={18} className="text-navy-950" />
                            <div className="text-sm font-black uppercase tracking-wider text-navy-950">
                                Vehicle Ownership Matrix
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-[10px] font-black uppercase tracking-widest text-navy-950/40 mb-1">Corporate Model</div>
                                <div className="text-xl font-black text-navy-950">
                                    ${results.breakdown.vehicle_matrix.corporate_net_benefit.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </div>
                                <div className="text-[10px] font-bold text-navy-950/60">Net Tax Value</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                                <div className="text-[10px] font-black uppercase tracking-widest text-green-900/40 mb-1">Personal Model</div>
                                <div className="text-xl font-black text-green-600">
                                    ${results.breakdown.vehicle_matrix.personal_reimbursement.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </div>
                                <div className="text-[10px] font-bold text-green-900/60">Tax-Free Receipt</div>
                            </div>
                        </div>
                        <div className="flex gap-3 p-4 bg-navy-950 rounded-2xl shadow-lg">
                            <Zap size={20} className="text-yellow-400 flex-shrink-0" />
                            <p className="text-xs font-bold text-white leading-relaxed">
                                {results.breakdown.vehicle_matrix.recommendation}
                            </p>
                        </div>
                    </div>
                </div>
            )}

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
