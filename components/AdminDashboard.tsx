"use client";

import React, { useState, useEffect } from 'react';
import { Search, Download, MoreVertical, CheckCircle2, Clock, AlertCircle, FileArchive } from 'lucide-react';
import AdminPricingManager from './AdminPricingManager';
import AdminLeadsTable from './AdminLeadsTable';
import { getClients, updateClientStatus, Client } from '@/lib/clients';

export default function AdminDashboard() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [activeTab, setActiveTab] = useState<'clients' | 'leads' | 'pricing'>('clients');

    useEffect(() => {
        if (activeTab === 'clients') {
            fetchClients();
        }
    }, [activeTab]);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const data = await getClients();
            setClients(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateClientStatus(id, newStatus);
            fetchClients();
        } catch (err) {
            alert("Error updating status");
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-growth/20 text-growth border-growth/30';
            case 'Reviewing': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
            case 'Pending': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
            default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed': return <CheckCircle2 className="w-4 h-4" />;
            case 'Reviewing': return <Clock className="w-4 h-4" />;
            case 'Pending': return <AlertCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(filter.toLowerCase()) ||
        c.id.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="w-full bg-white p-6 sm:p-10 rounded-[3rem] border border-gray-100 shadow-premium text-navy-900">
            <div className="flex gap-4 mb-10 p-1 bg-gray-50 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'clients' ? 'bg-white shadow-sm text-navy-900' : 'text-navy-900/40 hover:text-navy-900'}`}
                >
                    Client Management
                </button>
                <button
                    onClick={() => setActiveTab('leads')}
                    className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'leads' ? 'bg-white shadow-sm text-navy-900' : 'text-navy-900/40 hover:text-navy-900'}`}
                >
                    Leads Management
                </button>
                <button
                    onClick={() => setActiveTab('pricing')}
                    className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${activeTab === 'pricing' ? 'bg-white shadow-sm text-navy-900' : 'text-navy-900/40 hover:text-navy-900'}`}
                >
                    Pricing Control
                </button>
            </div>

            {activeTab === 'clients' ? (
                <>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 px-4">
                        <div>
                            <h2 className="text-3xl font-black text-navy-950 mb-2 tracking-tight">Financial Command</h2>
                            <p className="text-navy-900/40 font-medium text-sm text-center lg:text-left">Oversee all document workflows and professional advisory requests</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="relative flex-1 lg:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/30" />
                                <input
                                    type="text"
                                    placeholder="Search Client ID or Name..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-navy-900 focus:ring-2 focus:ring-growth outline-none transition font-medium"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center gap-2 bg-navy-950 text-white px-6 py-3 rounded-xl font-bold hover:bg-navy-900 transition shadow-lg">
                                <FileArchive className="w-5 h-5" /> Export All
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-20 text-center text-navy-900/20 font-bold uppercase tracking-widest animate-pulse">Synchronizing Records...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-3">
                                <thead>
                                    <tr className="text-navy-900/30 text-[10px] font-black uppercase tracking-[0.2em]">
                                        <th className="px-8 py-4">Portal ID</th>
                                        <th className="px-8 py-4">Client Name</th>
                                        <th className="px-8 py-4">Status</th>
                                        <th className="px-8 py-4">Files</th>
                                        <th className="px-8 py-4">Activity</th>
                                        <th className="px-8 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClients.map((client) => (
                                        <tr key={client.id} className="bg-gray-50/50 hover:bg-gray-50 transition-all group">
                                            <td className="px-8 py-5 first:rounded-l-[1.5rem] border-y border-l border-gray-100 font-mono text-growth font-black text-xs">{client.id}</td>
                                            <td className="px-8 py-5 border-y border-gray-100 font-bold text-navy-950">{client.name}</td>
                                            <td className="px-8 py-5 border-y border-gray-100">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStatusStyle(client.status)}`}>
                                                    {getStatusIcon(client.status)} {client.status}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 border-y border-gray-100 text-navy-900/60 font-bold text-sm">{client.files_count} Files</td>
                                            <td className="px-8 py-5 border-y border-gray-100 text-navy-900/40 text-xs font-medium">
                                                {client.last_upload ? new Date(client.last_upload).toLocaleDateString() : 'No activity'}
                                            </td>
                                            <td className="px-8 py-5 last:rounded-r-[1.5rem] border-y border-r border-gray-100 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(client.id, 'Reviewing')}
                                                        className="p-2 text-navy-900/20 hover:text-growth hover:bg-white hover:shadow-sm rounded-lg transition" title="Start Review">
                                                        <Clock className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(client.id, 'Completed')}
                                                        className="p-2 text-navy-900/20 hover:text-navy-900 hover:bg-white hover:shadow-sm rounded-lg transition" title="Mark Complete">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : activeTab === 'leads' ? (
                <AdminLeadsTable />
            ) : (
                <AdminPricingManager />
            )}
        </div>
    );
}
