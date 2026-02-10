"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Send, User, MapPin, Calculator, Briefcase } from "lucide-react";

const steps = [
    { id: "personal", title: "Personal Info", icon: <User className="w-5 h-5" /> },
    { id: "address", title: "Location", icon: <MapPin className="w-5 h-5" /> },
    { id: "income", title: "Income Types", icon: <Briefcase className="w-5 h-5" /> },
    { id: "summary", title: "Review", icon: <Calculator className="w-5 h-5" /> },
];

export default function TaxIntakePortal() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
            {/* Progress Header */}
            <div className="bg-gray-50 border-b border-gray-100 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Tax Intake Portal</h2>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                        Step {currentStep + 1} of {steps.length}
                    </span>
                </div>
                <div className="flex gap-4">
                    {steps.map((step, idx) => (
                        <div key={step.id} className="flex-1">
                            <div className={`h-2 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
                            <div className={`mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${idx <= currentStep ? 'text-primary' : 'text-gray-400'}`}>
                                {step.icon} <span className="hidden sm:inline">{step.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Content */}
            <div className="p-8 sm:p-12 min-h-[400px]">
                {currentStep === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-2xl font-bold text-gray-900">Let's start with the basics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-2xl font-bold text-gray-900">Where are you filing from?</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Province / Territory</label>
                            <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none">
                                <option>Nova Scotia</option>
                                <option>Ontario</option>
                                <option>British Columbia</option>
                                <option>Alberta</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-2xl font-bold text-gray-900">Tell us about your income</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['Employment (T4)', 'Self-Employed', 'Investments', 'Rental Income', 'Foreign Income', 'Other'].map((type) => (
                                <label key={type} className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl cursor-pointer hover:bg-primary/5 hover:border-primary transition group">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <span className="font-medium text-gray-700 group-hover:text-primary transition">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 text-center py-8">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">Ready to Submit</h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            You're all set! Review your details and hit submit. Our experts will contact you within 24 hours.
                        </p>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 font-bold px-6 py-3 rounded-full transition ${currentStep === 0 ? 'text-gray-300 pointer-events-none' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                    <ChevronLeft className="w-5 h-5" /> Back
                </button>
                {currentStep < steps.length - 1 ? (
                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-opacity-90 transition shadow-lg shadow-primary/20"
                    >
                        Continue <ChevronRight className="w-5 h-5" />
                    </button>
                ) : (
                    <button className="flex items-center gap-2 bg-green-600 text-white font-bold px-10 py-3 rounded-full hover:bg-green-700 transition shadow-lg shadow-green-600/20">
                        Submit Application <Send className="w-4 h-4 ml-1" />
                    </button>
                )}
            </div>
        </div>
    );
}

function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}
