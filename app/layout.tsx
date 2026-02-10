import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-plus-jakarta'
});

export const metadata: Metadata = {
    title: "TaxBuddy | Professional Tax & Business Services",
    description: "Your Trusted Tax and Business Consultant. Specializing in Individual Tax, Corporate Tax, and Bookkeeping.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable}`}>
            <body className={`${plusJakartaSans.className} bg-white antialiased`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
