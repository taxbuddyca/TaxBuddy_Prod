import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: 'light' | 'medium' | 'heavy';
}

export default function GlassCard({ children, className = '', intensity = 'medium' }: GlassCardProps) {
    const intensities = {
        light: 'bg-white/10 backdrop-blur-sm border-white/10',
        medium: 'bg-white/20 backdrop-blur-md border-white/20',
        heavy: 'bg-white/30 backdrop-blur-lg border-white/30',
    };

    return (
        <div className={`rounded-[2rem] border shadow-glass transition-all duration-300 hover:shadow-2xl ${intensities[intensity]} ${className}`}>
            {children}
        </div>
    );
}
