import { Star, CheckCircle2 } from 'lucide-react';

interface Software {
    name: string;
    rating: number | string;
    type: string;
    description: string;
}

interface IndustrySoftwareProps {
    software: Software[];
}

export function IndustrySoftware({ software }: IndustrySoftwareProps) {
    if (!software || software.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Recommended Software</h2>
                <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                    We work with all major industry-standard software platforms to ensure your data is accurate, secure, and accessible.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {software.map((sw, index) => (
                        <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl text-slate-900">{sw.name}</h3>
                                <div className="flex items-center bg-white px-2 py-1 rounded-md border border-slate-200">
                                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span className="text-xs font-bold">{sw.rating}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    {sw.type}
                                </span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {sw.description}
                            </p>
                            <div className="flex items-center text-emerald-600 text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Supported
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
