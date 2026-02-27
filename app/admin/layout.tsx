import AdminGuard from "@/components/AdminGuard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard | TaxBuddy Canada",
    description: "Secure admin management portal",
    robots: { index: false, follow: false }
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminGuard>{children}</AdminGuard>;
}
