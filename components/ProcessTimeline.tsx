import React from 'react';
import { MessageSquare, ClipboardCheck, TrendingUp, Sparkles } from 'lucide-react';
import GlassCard from './GlassCard';

const steps = [
    {
        title: "Discovery",
        icon: <MessageSquare className="w-6 h-6" />,
        desc: "A video deep-dive into your current systems, pain points, and growth goals."
    },
    {
        title: "Onboarding",
        icon: <ClipboardCheck className="w-6 h-6" />,
        desc: "We migrate your data to modern tools and set up your secure buddy-portal."
    },
    {
        title: "Strategy",
        icon: <TrendingUp className="w-6 h-6" />,
        desc: "Monthly advisory meetings to optimize tax and identify efficiency gains."
    },
    {
        title: "Success",
        icon: <Sparkles className="w-6 h-6" />,
        desc: "Real-time visibility into your finances. No more year-end surprises."
    },
];

export default function ProcessTimeline() {
    return (
        <div className="py-20 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 hidden lg:block" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-white border border-growth/20 rounded-full flex items-center justify-center text-navy-900 shadow-premium mb-6 group-hover:bg-growth group-hover:text-white group-hover:scale-110 transition-all duration-500">
                            {step.icon}
                        </div>
                        <div className="bg-growth/20 px-3 py-1 rounded-full text-[10px] font-black text-growth uppercase tracking-widest mb-4">Step 0{i + 1}</div>
                        <h4 className="text-2xl font-black text-white mb-3">{step.title}</h4>
                        <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[200px]">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
