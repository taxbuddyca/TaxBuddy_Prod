import { ServiceUSP } from "@/lib/data/services";
import GlassCard from "../GlassCard";
import { CheckCircle2 } from "lucide-react";

interface ServiceUSPProps {
    usps: ServiceUSP[];
}

export default function ServiceUSPs({ usps }: ServiceUSPProps) {
    if (!usps || usps.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {usps.map((usp, i) => (
                <GlassCard key={i} className="p-8 h-full bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-white flex items-center justify-center text-growth mb-6 shadow-sm border border-blue-100/50">
                        <usp.icon size={24} />
                    </div>
                    <h3 className="text-lg font-black text-navy-950 mb-4">{usp.title}</h3>
                    <ul className="space-y-3">
                        {usp.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-navy-900/80">
                                <CheckCircle2 size={16} className="text-growth mt-0.5 flex-shrink-0" />
                                <span className="leading-snug">{item}</span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
            ))}
        </div>
    );
}
