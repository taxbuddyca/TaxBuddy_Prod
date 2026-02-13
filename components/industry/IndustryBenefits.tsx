

import { Check } from "lucide-react";

interface IndustryBenefitsProps {
    title: string;
    items: {
        title: string;
        text: string;
    }[];
}

export default function IndustryBenefits({ title, items }: IndustryBenefitsProps) {
    return (
        <section className="py-24 bg-navy-950 text-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-growth/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                            {title}
                        </h2>
                        <div className="space-y-8">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex gap-6">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-growth flex items-center justify-center text-white shadow-lg shadow-growth/30">
                                            <Check className="w-5 h-5" strokeWidth={3} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-white/70 leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Visual/Image side */}
                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md p-8 flex items-center justify-center">
                            {/* Placeholder generic abstract visualization */}
                            <div className="text-center">
                                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-400 mb-4">
                                    100%
                                </div>
                                <div className="text-xl font-medium text-white/50">
                                    Focus on Client Success
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
