"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Mail, Calendar, Trash2, Clock, CheckCircle2 } from 'lucide-react';

interface Lead {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company_name?: string;
    revenue_range?: string;
    referral_source?: string;
    current_accounting_system?: string;
    services_interested?: string[];
    website?: string;
    message?: string;
    status: string;
    created_at: string;
}

export default function AdminLeadsTable() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating lead:', error);
        } else {
            fetchLeads();
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'contacted': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            case 'converted': return 'bg-growth/10 text-growth border-growth/20';
            default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
        }
    };

    const filteredLeads = leads.filter(l =>
        (l.first_name + ' ' + l.last_name).toLowerCase().includes(filter.toLowerCase()) ||
        l.email.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4">
                <div>
                    <h2 className="text-2xl font-black text-navy-950">Sales Leads</h2>
                    <p className="text-navy-900/40 text-sm font-medium">Manage incoming inquiries and sales pipeline</p>
                </div>
                <div className="relative lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/30" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-navy-900 focus:ring-2 focus:ring-growth outline-none transition font-medium text-sm"
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="p-20 text-center text-navy-900/20 font-bold uppercase tracking-widest animate-pulse">
                    Loading Data Stream...
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="p-20 text-center bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                    <Mail className="mx-auto mb-4 text-navy-900/10" size={48} />
                    <p className="text-navy-900/40 font-bold italic">No leads found matching your criteria</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-navy-900/30 text-[10px] font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-4">Name / Company</th>
                                <th className="px-8 py-4">Contact</th>
                                <th className="px-8 py-4">Details</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Received</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="bg-gray-50/50 hover:bg-gray-50 transition-all group">
                                    <td className="px-8 py-5 first:rounded-l-[1.5rem] border-y border-l border-gray-100 font-bold text-navy-950">
                                        <div>{lead.first_name} {lead.last_name}</div>
                                        {lead.company_name && <div className="text-[10px] text-navy-900/40 font-black uppercase tracking-wider mt-1">{lead.company_name}</div>}
                                    </td>
                                    <td className="px-8 py-5 border-y border-gray-100">
                                        <div className="text-sm font-bold text-navy-900/60">{lead.email}</div>
                                        {lead.phone && <div className="text-xs text-navy-900/40 font-medium mt-1">{lead.phone}</div>}
                                        {lead.website && <div className="text-[10px] text-growth font-black truncate max-w-[150px] mt-1">{lead.website}</div>}
                                        {lead.current_accounting_system && <div className="text-[9px] text-navy-900/30 uppercase tracking-widest mt-1">System: {lead.current_accounting_system}</div>}
                                    </td>
                                    <td className="px-8 py-5 border-y border-gray-100 space-y-2">
                                        {lead.revenue_range && <div className="text-[10px] font-black text-navy-950 uppercase tracking-wider">{lead.revenue_range}</div>}
                                        {lead.referral_source && <div className="text-[9px] text-navy-900/30 font-bold uppercase tracking-widest">Via: {lead.referral_source}</div>}
                                        {lead.services_interested && lead.services_interested.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {lead.services_interested.slice(0, 2).map((s, i) => (
                                                    <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-navy-900/50 text-[8px] font-bold uppercase tracking-wider rounded-md">{s}</span>
                                                ))}
                                                {lead.services_interested.length > 2 && <span className="px-1.5 py-0.5 bg-gray-100 text-navy-900/30 text-[8px] font-bold rounded-md">+{lead.services_interested.length - 2}</span>}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 border-y border-gray-100">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusStyle(lead.status)}`}>
                                            {lead.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 border-y border-gray-100 text-navy-900/40 text-[10px] font-black flex items-center gap-2 uppercase tracking-widest">
                                        <Clock size={12} /> {new Date(lead.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-5 last:rounded-r-[1.5rem] border-y border-r border-gray-100 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => updateStatus(lead.id, 'contacted')}
                                                className="p-2 text-navy-900/20 hover:text-amber-500 hover:bg-white hover:shadow-sm rounded-lg transition"
                                                title="Mark as Contacted"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(lead.id, 'converted')}
                                                className="p-2 text-navy-900/20 hover:text-growth hover:bg-white hover:shadow-sm rounded-lg transition"
                                                title="Convert to Client"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-navy-900/20 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-lg transition">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
