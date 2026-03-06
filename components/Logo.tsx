"use client";

import { motion } from 'framer-motion';

/**
 * TaxBuddy Canada Logo — Animated
 * Faceted maple leaf with:
 *  1. Initial "Blooming" entrance (Scale + Rotate)
 *  2. Continuous "Floating Down" motion (Drift + Tilt)
 *  3. Rotating shimmer sweep that flashes across the leaf
 *  4. Subtle sparkle pulse on the top tip
 */
export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 430"
            width="100%"
            height="100%"
            className={className}
            aria-label="TaxBuddy Canada Logo"
            role="img"
            initial="initial"
            animate="animate"
        >
            <defs>
                <filter id="calc-shadow-tb" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#000000" floodOpacity="0.32" />
                </filter>

                {/* Shimmer gradient — sweeps left-to-right */}
                <linearGradient id="shimmer-grad" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="40%" stopColor="white" stopOpacity="0" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="white" stopOpacity="0" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                    <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        from="-1.5 0"
                        to="1.5 0"
                        dur="3.2s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </linearGradient>

                {/* Clip the shimmer to the leaf shape */}
                <clipPath id="leaf-clip">
                    <g transform="rotate(-12, 200, 210)">
                        <polygon points="200,15 178,100 200,245" />
                        <polygon points="178,100 132,68 152,148 200,245" />
                        <polygon points="152,148 28,128 78,172 200,245" />
                        <polygon points="78,172 12,205 78,242 200,245" />
                        <polygon points="78,242 62,282 140,265 200,245" />
                        <polygon points="140,265 184,278 200,245" />
                        <polygon points="200,15 222,100 200,245" />
                        <polygon points="222,100 268,68 248,148 200,245" />
                        <polygon points="248,148 372,128 322,172 200,245" />
                        <polygon points="322,172 388,205 322,242 200,245" />
                        <polygon points="322,242 338,282 260,265 200,245" />
                        <polygon points="260,265 216,278 200,245" />
                        <rect x="184" y="270" width="32" height="10" />
                    </g>
                </clipPath>
            </defs>

            {/* ===== LEAF GROUP — blooming & falling animations ===== */}
            <motion.g
                variants={{
                    initial: { scale: 0, opacity: 0, rotate: -30, y: -20 },
                    animate: {
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                        y: 0,
                        transition: {
                            type: "spring",
                            stiffness: 80,
                            damping: 15,
                            duration: 1.2
                        }
                    }
                }}
            >
                {/* Continuous falling/drifting animation */}
                <motion.g
                    animate={{
                        y: [0, 8, 0],
                        rotate: [-2, 2, -2],
                        x: [-2, 2, -2]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <g transform="rotate(-12, 200, 210)">
                        {/* LEFT HALF — Reds */}
                        <polygon points="200,15  178,100  200,245" fill="#F45B45" />
                        <polygon points="178,100  132,68   152,148  200,245" fill="#ED4A3B" />
                        <polygon points="152,148  28,128   78,172   200,245" fill="#D9362E" />
                        <polygon points="78,172   12,205   78,242   200,245" fill="#C22424" />
                        <polygon points="78,242   62,282   140,265  200,245" fill="#A31A1F" />
                        <polygon points="140,265  184,278  200,245" fill="#801117" />

                        {/* RIGHT HALF — Deeper reds */}
                        <polygon points="200,15  222,100  200,245" fill="#DA3831" />
                        <polygon points="222,100  268,68   248,148  200,245" fill="#C22424" />
                        <polygon points="248,148  372,128  322,172  200,245" fill="#A81A1A" />
                        <polygon points="322,172  388,205  322,242  200,245" fill="#8F1010" />
                        <polygon points="322,242  338,282  260,265  200,245" fill="#740808" />
                        <polygon points="260,265  216,278  200,245" fill="#560404" />

                        {/* Flat base */}
                        <rect x="184" y="270" width="32" height="10" fill="#52080D" />

                        {/* Curved stem */}
                        <path
                            d="M 193,278 C 193,300 220,320 215,360 C 212,390 196,400 200,405"
                            stroke="#3A0202"
                            strokeWidth="14"
                            strokeLinecap="round"
                            fill="none"
                        />

                        {/* ===== SHIMMER SWEEP OVERLAY ===== */}
                        <rect
                            x="0" y="0" width="400" height="430"
                            fill="url(#shimmer-grad)"
                            clipPath="url(#leaf-clip)"
                            opacity="0.9"
                        />

                        {/* Top tip sparkle — pulses every 3s */}
                        <motion.circle
                            cx="200" cy="18" r="6" fill="white"
                            animate={{
                                opacity: [0, 0, 0.8, 0, 0],
                                r: [4, 4, 10, 4, 4]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                times: [0, 0.3, 0.5, 0.7, 1]
                            }}
                        />
                    </g>
                </motion.g>
            </motion.g>

            {/* ===== CENTER CALCULATOR (stays upright, no float) ===== */}
            <motion.g
                filter="url(#calc-shadow-tb)"
                variants={{
                    initial: { scale: 0, opacity: 0 },
                    animate: {
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 0.6, duration: 0.8, type: "spring" }
                    }
                }}
            >
                <rect x="150" y="135" width="100" height="135" rx="13" fill="#0F1C2E" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
                <rect x="166" y="151" width="68" height="26" rx="4" fill="#FFFFFF" />
                <rect x="166" y="192" width="16" height="15" rx="3" fill="#FFFFFF" />
                <rect x="192" y="192" width="16" height="15" rx="3" fill="#FFFFFF" />
                <rect x="218" y="192" width="16" height="15" rx="3" fill="#FFFFFF" />
                <rect x="166" y="217" width="16" height="15" rx="3" fill="#FFFFFF" />
                <rect x="192" y="217" width="16" height="15" rx="3" fill="#FFFFFF" />
                <rect x="218" y="217" width="16" height="15" rx="3" fill="#FFFFFF" />
                <rect x="166" y="242" width="42" height="15" rx="3" fill="#FFFFFF" />
                <rect x="218" y="242" width="16" height="15" rx="3" fill="#FFFFFF" />
            </motion.g>
        </motion.svg>
    );
}
