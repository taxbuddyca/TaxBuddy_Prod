"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
            } else {
                setAuthorized(true);
            }
            setLoading(false);
        };
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 bg-navy-950/10 rounded-xl flex items-center justify-center text-navy-950/20">
                        <Lock size={24} />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-navy-900/30">
                        Verifying Clearance...
                    </div>
                </div>
            </div>
        );
    }

    if (!authorized) return null;

    return <>{children}</>;
}
