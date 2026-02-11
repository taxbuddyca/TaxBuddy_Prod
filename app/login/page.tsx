"use client";

import React, { useState } from 'react';
import GlassCard from "@/components/GlassCard";
import { ShieldCheck, Zap, ArrowRight, Lock, Mail, Key } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Real Supabase Auth
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Check if admin (for now, simply redirect to admin if email matches, AdminGuard will verify actual session)
            // Check if admin (for now, simply redirect to admin if email matches, AdminGuard will verify actual session)
            if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("taxbuddy")) {
                // Use window.location to force a hard refresh to ensure middleware/cookies pick up the new session
                window.location.href = "/admin";
            } else {
                window.location.href = "/portal";
            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Invalid credentials.");
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white selection:bg-growth selection:text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-growth/5 via-white to-gray-50">
            <div className="max-w-md w-full">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-8">
                        <div className="w-12 h-12 bg-growth rounded-2xl flex items-center justify-center rotate-3 shadow-lg shadow-growth/20">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-navy-950">mytaxbuddy<span className="text-growth">4u</span></span>
                    </div>
                    <h1 className="text-4xl font-black text-navy-950 tracking-tighter mb-4">Secure Portal Login</h1>
                    <p className="text-navy-900/40 font-medium tracking-tight uppercase text-xs tracking-[0.2em] font-black">Authorized Personnel Only</p>
                </div>

                <GlassCard className="p-8 md:p-12 relative overflow-hidden" intensity="heavy">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-navy-950">
                        <ShieldCheck size={120} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/20" />
                                <input
                                    type="email"
                                    required
                                    placeholder="your-email@taxbuddy.ca"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-navy-950 placeholder:text-navy-900/20 outline-none focus:ring-2 focus:ring-growth transition font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-900/20" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-navy-950 placeholder:text-navy-900/20 outline-none focus:ring-2 focus:ring-growth transition font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-navy-950 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-navy-900 transition-all disabled:opacity-50"
                        >
                            {loading ? "Authenticating..." : "Enter Command Center"}
                            {!loading && <ArrowRight size={20} />}
                        </button>

                        <div className="text-center pt-4">
                            <Link href="/contact" className="text-[10px] font-black text-navy-900/20 uppercase tracking-[0.2em] hover:text-growth transition">
                                Forgotten Credentials? Contact IT Support
                            </Link>
                        </div>
                    </form>
                </GlassCard>

                <div className="mt-12 text-center text-[10px] font-black text-navy-900/10 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                    <div className="w-12 h-px bg-gray-100" />
                    <span className="flex items-center gap-2 italic"><Lock size={10} /> PIPEDA Compliant Session</span>
                    <div className="w-12 h-px bg-gray-100" />
                </div>
            </div>
        </main>
    );
}
