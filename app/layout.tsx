import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    variable: '--font-plus-jakarta'
});

export const viewport: Viewport = {
    themeColor: "#2cd4be",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://taxbuddy.ca'),
    title: "TaxBuddy Canada | Modern Accounting for Startups",
    description: "Virtual bookkeeping, tax, and CFO services for Canadian businesses.",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "TaxBuddy",
    },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

import WhatsAppFab from "@/components/WhatsAppFab";

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
                <WhatsAppFab />
                <JsonLd />
            </body>
        </html>
    );
}
