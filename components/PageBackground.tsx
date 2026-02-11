"use client";

import React from 'react';

export default function PageBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
            {/* Mesh Gradient Layer */}
            <div className="absolute inset-0 opacity-40">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[100px]"
                    style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)' }}
                />
            </div>

            {/* Noise/Grain Texture Layer */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.65"
                            numOctaves="3"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Top Shine */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-growth/20 to-transparent" />
        </div>
    );
}
