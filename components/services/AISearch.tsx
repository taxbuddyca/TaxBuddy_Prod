import Link from "next/link";
import { Brain, Search, ExternalLink, Sparkles } from "lucide-react";
import GlassCard from "../GlassCard";
import { AISearchQuery } from "@/lib/data/services";

interface AISearchProps {
    queries: AISearchQuery[];
}

export default function AISearch({ queries }: AISearchProps) {
    if (!queries || queries.length === 0) return null;

    return (
        <GlassCard className="p-8 mb-12 bg-gradient-to-br from-white/40 to-white/10 border-white/40 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-growth/10 flex items-center justify-center text-growth border border-growth/20 shadow-inner">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-navy-950 tracking-tight">Summarize with AI</h3>
                    <p className="text-xs text-navy-900/60 font-medium uppercase tracking-widest">Get an instant unbiased summary</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {queries.map((q, i) => (
                    <Link
                        key={i}
                        href={q.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden bg-white/50 hover:bg-white border border-white/60 hover:border-growth/30 rounded-xl p-4 transition-all duration-300 hover:shadow-lg flex items-center justify-between"
                    >
                        <span className="font-bold text-navy-900 group-hover:text-growth transition-colors">{q.platform}</span>
                        <ExternalLink size={14} className="text-navy-900/40 group-hover:text-growth transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Link>
                ))}
            </div>

            <p className="mt-4 text-[10px] text-navy-900/40 text-center italic">
                *Opens in a new tab with a pre-filled query ensuring trusted sources are used.
            </p>
        </GlassCard>
    );
}
