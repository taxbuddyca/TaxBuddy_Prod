

import { CheckCircle2 } from "lucide-react";

interface IndustrySolutionsProps {
    title: string;
    items: {
        title: string;
        text: string;
        icon: any;
    }[];
}

export default function IndustrySolutions({ title, items }: IndustrySolutionsProps) {
    return (
        <section id="solutions" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-growth font-bold uppercase tracking-widest text-sm mb-3 block">Our Expertise</span>
                    <h2 className="text-2xl md:text-4xl font-black text-navy-950 mb-6 tracking-tight">
                        {title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                    {items.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div key={idx} className="flex gap-6 group">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-growth group-hover:text-white transition-colors duration-300">
                                        {Icon && <Icon className="w-8 h-8" />}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-navy-950 mb-3">{item.title}</h3>
                                    <p className="text-navy-900/70 leading-relaxed text-lg">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
