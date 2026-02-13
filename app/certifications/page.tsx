import React from 'react';
import { certifications } from '@/lib/data/certifications';
import PageBackground from '@/components/PageBackground';
import GlassCard from '@/components/GlassCard';
import { Award, ShieldCheck } from 'lucide-react';

export default function CertificationsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 selection:bg-growth selection:text-white">
            <PageBackground />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Qualified & Verified</span>
                    <h1 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter">
                        Certifications & <span className="text-growth">Designations</span>
                    </h1>
                    <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium leading-relaxed">
                        We are committed to maintaining the highest professional standards. Our team holds leading industry certifications.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {certifications.map((cert) => (
                        <GlassCard key={cert.code} className="p-10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300" intensity="light">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-growth mb-8 relative">
                                <Award size={32} />
                                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                                    <ShieldCheck size={16} className="text-green-500" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-navy-950 mb-4">{cert.title}</h3>
                            <div className="bg-navy-950 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                                {cert.code}
                            </div>
                            <p className="text-navy-900/60 font-medium leading-relaxed">
                                {cert.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </main>
    );
}
