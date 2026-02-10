import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import { CheckCircle, XCircle, Shield, User } from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Verify Admin Access
    if (!session || session.user.user_metadata.role !== 'admin') {
        redirect("/login");
    }

    const adminAuthClient = createAdminClient();
    const { data: { users }, error } = await adminAuthClient.auth.admin.listUsers();

    if (error) {
        return <div className="p-8 text-red-500">Error loading users: {error.message}</div>;
    }

    async function toggleUploadPermission(userId: string, currentStatus: boolean) {
        "use server";
        const adminClient = createAdminClient();
        await adminClient.auth.admin.updateUserById(userId, {
            user_metadata: { can_upload: !currentStatus }
        });
        revalidatePath("/admin/users");
    }

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-navy-950 tracking-tight">User Management</h1>
                    <p className="text-navy-900/60 font-medium mt-2">Manage user permissions and access.</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-widest text-navy-900/50">
                                <th className="p-6 font-bold">User</th>
                                <th className="p-6 font-bold">Role</th>
                                <th className="p-6 font-bold">Upload Access</th>
                                <th className="p-6 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => {
                                const canUpload = user.user_metadata?.can_upload === true;
                                const isAdmin = user.user_metadata?.role === 'admin';

                                return (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-navy-900/40">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-navy-950">{user.email}</div>
                                                    <div className="text-xs text-navy-900/40 font-mono">{user.id.slice(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            {isAdmin ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    <Shield size={12} /> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    Client
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            {canUpload || isAdmin ? (
                                                <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm">
                                                    <CheckCircle size={16} /> Allowed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-red-500 font-bold text-sm">
                                                    <XCircle size={16} /> Restricted
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            <form action={toggleUploadPermission.bind(null, user.id, canUpload)}>
                                                <button
                                                    type="submit"
                                                    disabled={isAdmin} // Admins always have access conceptually, or handle differently
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${canUpload
                                                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                                                            : "bg-green-50 text-green-600 hover:bg-green-100"
                                                        } ${isAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
                                                >
                                                    {canUpload ? "Revoke Access" : "Grant Access"}
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
