"use client";

import React from 'react';

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Shield representing Security/Tax Compliance */}
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-blue-600" fill="currentColor" fillOpacity="0.1" stroke="none" />
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="text-blue-600" strokeWidth="2" fill="none" />

            {/* Rising Graph representing Growth/Finance */}
            <path d="M8 13v4" className="text-blue-600" strokeWidth="2" />
            <path d="M12 10v7" className="text-blue-600" strokeWidth="2" />
            <path d="M16 7v10" className="text-blue-600" strokeWidth="2" />
        </svg>
    );
}
