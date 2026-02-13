

import { LucideIcon } from "lucide-react";

interface IndustryChallengesProps {
    title: string;
    items: {
        title: string;
        text: string;
        icon: any;
    }[];
}

export default function IndustryChallenges({ title, items }: IndustryChallengesProps) {
    return (
        <section className="py-24 bg-blue-50/50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-4xl font-black text-navy-950 mb-6 tracking-tight">
                        {title}
                    </h2>
                    <div className="h-1.5 w-24 bg-growth mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform">
                                    {Icon && <Icon className="w-8 h-8" />}
                                </div>
                                <h3 className="text-2xl font-bold text-navy-950 mb-4">{item.title}</h3>
                                <p className="text-navy-900/60 leading-relaxed">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
