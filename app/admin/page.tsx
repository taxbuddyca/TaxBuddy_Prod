"use client";

import AdminDashboard from "@/components/AdminDashboard";
import AdminGuard from "@/components/AdminGuard";

export default function AdminPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50 selection:bg-growth selection:text-white">
            <div className="container mx-auto px-6">
                <AdminDashboard />
            </div>
        </main>
    );
}
