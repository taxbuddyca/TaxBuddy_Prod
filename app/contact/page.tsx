"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

import { submitLead } from "@/lib/leads";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company_name: "",
        current_accounting_system: "",
        services_interested: [] as string[],
        website: "",
        revenue_range: "",
        referral_source: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await submitLead(formData);
            setStatus("success");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <section className="py-24 relative overflow-hidden">
                {/* Background image removed for clean white look */}

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div className="flashy-reveal">
                                <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block font-bold">Get In Touch</span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy-950 tracking-tighter mb-8 leading-[0.95]">Let's build your finance team.</h1>
                                <p className="text-lg text-navy-900/70 leading-relaxed font-medium mb-12 italic">
                                    Fill out the form and our sales team will respond within one business day to discuss how we can support your growth.
                                </p>

                                <div className="space-y-8">
                                    <div className="space-y-8">
                                        <a href="mailto:taxbuddyca4u@gmail.com" className="flex gap-6 items-center group">
                                            <div className="w-12 h-12 bg-navy-950 rounded-2xl flex items-center justify-center text-white group-hover:bg-growth transition-all shadow-sm">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.2em]">Email Us</div>
                                                <div className="text-base font-black text-navy-950 group-hover:text-growth transition-colors">taxbuddyca4u@gmail.com</div>
                                            </div>
                                        </a>

                                        <a href="tel:+13068804017" className="flex gap-6 items-center group">
                                            <div className="w-12 h-12 bg-navy-950 rounded-2xl flex items-center justify-center text-white group-hover:bg-growth transition-all shadow-sm">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.2em]">Call Us</div>
                                                <div className="text-base font-black text-navy-950 group-hover:text-growth transition-colors">+ 1 306-880-4017</div>
                                            </div>
                                        </a>

                                        <div className="flex gap-6 items-center group">
                                            <div className="w-12 h-12 bg-navy-950 rounded-2xl flex items-center justify-center text-white group-hover:bg-growth transition-all shadow-sm">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.2em]">Headquarters</div>
                                                <div className="text-base font-black text-navy-950 group-hover:text-growth transition-colors">Unit 608 - 569 Washmill Lake Dr, Halifax, NS, Canada, B3S 0E3</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <GlassCard className="p-10 relative overflow-hidden border border-gray-100 bg-white/80 shadow-2xl backdrop-blur-xl hover-flash" intensity="medium">
                                {status === "success" ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                                        <div className="w-20 h-20 bg-growth/10 rounded-full flex items-center justify-center text-growth mb-8">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-3xl font-black text-navy-950 mb-4">Request Received!</h3>
                                        <p className="text-navy-900/40 font-medium italic">One of our specialists will be in touch shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {status === "error" && (
                                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100 mb-6">
                                                Something went wrong. Please try again or email us directly.
                                            </div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">First Name</label>
                                                <input required name="first_name" value={formData.first_name} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                                <input required name="last_name" value={formData.last_name} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Work Email</label>
                                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Phone</label>
                                                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm" placeholder="(555) 555-5555" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Company Name</label>
                                            <input required name="company_name" value={formData.company_name} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Annual Revenue</label>
                                                <select name="revenue_range" value={formData.revenue_range} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm text-navy-950">
                                                    <option value="">Select Range</option>
                                                    <option value="Pre-Revenue">Pre-Revenue</option>
                                                    <option value="$0 - $100k">$0 - $100k</option>
                                                    <option value="$100k - $500k">$100k - $500k</option>
                                                    <option value="$500k - $1M">$500k - $1M</option>
                                                    <option value="$1M - $5M">$1M - $5M</option>
                                                    <option value="$5M+">$5M+</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">How did you hear?</label>
                                                <select name="referral_source" value={formData.referral_source} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm text-navy-950">
                                                    <option value="">Select Source</option>
                                                    <option value="Google">Google Search</option>
                                                    <option value="LinkedIn">LinkedIn</option>
                                                    <option value="Referral">Client Referral</option>
                                                    <option value="Clutch">Clutch.co</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Current Accounting System?</label>
                                            <select name="current_accounting_system" value={formData.current_accounting_system} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm text-navy-950">
                                                <option value="">Select System</option>
                                                <option value="QuickBooks Online">QuickBooks Online</option>
                                                <option value="Xero">Xero</option>
                                                <option value="Sage">Sage</option>
                                                <option value="Freshbooks">Freshbooks</option>
                                                <option value="Wave">Wave</option>
                                                <option value="Excel/Spreadsheets">Excel/Spreadsheets</option>
                                                <option value="None">None</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Services of Interest</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {[
                                                    "Corporate Taxes",
                                                    "Bookkeeping",
                                                    "Accounts Payable",
                                                    "Payroll",
                                                    "CFO Services",
                                                    "One-time Consult",
                                                    "Personal Taxes",
                                                    "Other"
                                                ].map((service) => (
                                                    <label key={service} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100 cursor-pointer hover:border-growth/50 transition-all group/check">
                                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${formData.services_interested.includes(service) ? 'bg-growth border-growth text-white' : 'border-gray-200 bg-white'}`}>
                                                            {formData.services_interested.includes(service) && <CheckCircle2 size={12} />}
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            className="hidden"
                                                            checked={formData.services_interested.includes(service)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setFormData(prev => ({ ...prev, services_interested: [...prev.services_interested, service] }));
                                                                } else {
                                                                    setFormData(prev => ({ ...prev, services_interested: prev.services_interested.filter(s => s !== service) }));
                                                                }
                                                            }}
                                                        />
                                                        <span className={`text-xs font-bold transition-colors ${formData.services_interested.includes(service) ? 'text-navy-950' : 'text-navy-900/60'}`}>{service}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">Company Website</label>
                                            <input name="website" value={formData.website} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm" placeholder="https://" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-navy-900/30 uppercase tracking-[0.2em] ml-1">How can we help?</label>
                                            <textarea name="message" value={formData.message} onChange={handleChange} rows={2} className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-growth outline-none transition font-medium resize-none text-sm" />
                                        </div>
                                        <button
                                            disabled={status === "sending"}
                                            className="w-full bg-growth text-white py-4 rounded-xl font-black text-base shadow-lg shadow-growth/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {status === "sending" ? "Processing..." : <>Send Request <Send size={18} /></>}
                                        </button>
                                    </form>
                                )}
                            </GlassCard>
                        </div>

                        {/* Premium Info Bars */}
                        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "SOC2 Type II Compliant", label: "Certified Security", desc: "Your financial data is protected by bank-level encryption and Canadian-only localized storage." },
                                { title: "24h SLA for Leads", label: "Response Promise", desc: "We respect your time. Expect a detailed response or discovery call invite within one business day." },
                                { title: "Integration Experts", label: "Ecosystem Focus", desc: "We specialize in Xero, QBO, Stripe, and Shopify. We won't ask you to 'fax' us anything, ever." }
                            ].map((info, i) => (
                                <div key={i} className="p-10 bg-gray-50/50 rounded-3xl border border-gray-100 flex flex-col items-center text-center hover-flash">
                                    <div className="text-growth mb-4 font-black uppercase tracking-[0.2em] text-[10px] italic">{info.label}</div>
                                    <h4 className="text-lg font-black text-navy-950 mb-2">{info.title}</h4>
                                    <p className="text-navy-900/40 text-sm font-medium leading-relaxed italic">{info.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Localized Presence */}
                        <div className="mt-40 text-center flashy-reveal">
                            <h3 className="text-2xl font-black text-navy-950 mb-8 tracking-tight">Proudly Operating from Coast to Coast.</h3>
                            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                                {['Vancouver', 'Calgary', 'Toronto', 'Montreal', 'Halifax'].map((city) => (
                                    <div key={city} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-growth rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                                        <span className="text-navy-900/40 font-black uppercase tracking-widest text-[9px]">{city}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
