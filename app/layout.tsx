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
    metadataBase: new URL('https://mytaxbuddy4u.com'),
    title: {
        default: "TaxBuddy Canada | Halifax Accountants & Virtual personal tax service",
        template: "%s | TaxBuddy Canada"
    },
    description: "Virtual personal tax filing, online bookkeeping, and CFO services in Halifax & across Canada. Maximize tax savings with legal CRA loopholes. 100% remote personal service.",
    keywords: [
        "Halifax accountants", "virtual CPA Canada", "online tax filing", "personal tax service Halifax",
        "CRA tax loopholes", "maximize tax return Canada", "virtual bookkeeping Halifax",
        "tax savings Canada", "remote accounting services", "startup CFO Canada"
    ],
    authors: [{ name: "TaxBuddy Canada", url: "https://mytaxbuddy4u.com" }],
    creator: "TaxBuddy Canada",
    publisher: "TaxBuddy Canada",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_CA",
        url: "https://mytaxbuddy4u.com",
        title: "TaxBuddy Canada | Halifax Accountants & Virtual personal tax service",
        description: "Modern virtual bookkeeping, tax planning, and CFO services for Halifax and Canadian startups. Expert CPAs available via Zoom/Phone.",
        siteName: "TaxBuddy Canada",
    },
    twitter: {
        card: "summary_large_image",
        title: "TaxBuddy Canada | Virtual personal tax service & CFOs",
        description: "Maximize your Canadian tax refund with expert virtual tax services. Based in Halifax, serving all of Canada.",
        creator: "@taxbuddyca",
    },
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "TaxBuddy",
    },
    verification: {
        google: "google-site-verification-id", // User should provide real ID if available
    }
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
