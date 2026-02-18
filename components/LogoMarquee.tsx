"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    XeroLogo,
    QuickBooksLogo,
    StripeLogo,
    ShopifyLogo,
    SlackLogo,
    ZoomLogo,
    NotionLogo,
    DextLogo,
    HubdocLogo,
    WagepointLogo,
    DeelLogo,
    KarbonLogo
} from "./BrandLogos";

const logos = [
    { component: XeroLogo, name: "Xero" },
    { component: QuickBooksLogo, name: "QuickBooks" },
    { component: StripeLogo, name: "Stripe" },
    { component: ShopifyLogo, name: "Shopify" },
    { component: SlackLogo, name: "Slack" },
    { component: ZoomLogo, name: "Zoom" },
    { component: NotionLogo, name: "Notion" },
    { component: DextLogo, name: "Dext" },
    { component: HubdocLogo, name: "Hubdoc" },
    { component: WagepointLogo, name: "Wagepoint" },
    { component: DeelLogo, name: "Deel" },
    { component: KarbonLogo, name: "Karbon" },
];

export default function LogoMarquee() {
    // Duplicate the logos array to create a seamless loop
    const doubledLogos = [...logos, ...logos];

    return (
        <div className="w-full py-12 bg-white/30 backdrop-blur-sm relative overflow-hidden select-none">
            {/* Gradient Fades for Smooth Edges */}
            <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />

            <div className="max-w-[1400px] mx-auto overflow-hidden">
                <motion.div
                    className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
                    animate={{
                        x: [0, -1920], // Adjust based on content width approximation
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30, // Slow, smooth speed
                            ease: "linear",
                        },
                    }}
                >
                    {doubledLogos.map((logo, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 group transition-all duration-500"
                        >
                            <div className="group-hover:scale-110 transition-all duration-500">
                                <logo.component className="h-8 md:h-10 w-auto" />
                            </div>
                            <span className="text-lg font-black tracking-tighter text-navy-950 group-hover:text-growth transition-colors duration-500">
                                {logo.name.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Vibeful pulsing background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-growth/5 to-transparent animate-pulse pointer-events-none" />
        </div>
    );
}
