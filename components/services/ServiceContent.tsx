import { ServiceItem } from "@/lib/data/services";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceContentProps {
    content: ServiceItem['content'];
}

export default function ServiceContent({ content }: ServiceContentProps) {
    if (!content) return null;

    return (
        <div className="space-y-16">
            {/* Intro Section */}
            <section className="prose prose-lg prose-indigo max-w-none">
                <h2 className="text-3xl font-black text-navy-950 mb-6">{content.intro.heading}</h2>
                <div
                    className="text-navy-900/80 leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: content.intro.text }}
                />
            </section>

            {/* Services List */}
            <section className="bg-blue-50/50 rounded-[2.5rem] p-10 md:p-14 border border-blue-100">
                <h2 className="text-3xl font-black text-navy-950 mb-6">{content.servicesList.heading}</h2>
                <p className="text-lg text-navy-900/70 mb-10 max-w-3xl">{content.servicesList.intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {content.servicesList.items.map((item, i) => (
                        <div key={i} className="group">
                            <h3 className="text-xl font-bold text-navy-950 mb-3 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-growth shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={18} />
                                </span>
                                {item.title}
                            </h3>
                            <p className="text-navy-900/70 pl-11 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits */}
            <section>
                <h2 className="text-3xl font-black text-navy-950 mb-6">{content.benefits.heading}</h2>
                <p className="text-lg text-navy-900/70 mb-10 max-w-3xl">{content.benefits.intro}</p>

                <div className="space-y-8">
                    {content.benefits.items.map((item, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-growth/10 flex items-center justify-center text-growth mt-1 font-black text-xl">
                                {i + 1}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-navy-950 mb-2">{item.title}</h3>
                                <p className="text-navy-900/70 leading-relaxed text-base">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing */}
            <section className="bg-navy-950 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <p className="text-lg font-medium text-white/90 leading-relaxed mb-8 max-w-3xl">
                        {content.closing.text}
                    </p>
                    {content.closing.cta && (
                        <Link href={content.closing.cta.link} className="inline-flex items-center gap-3 bg-growth text-white px-8 py-4 rounded-xl font-black hover:bg-growth/90 hover:scale-105 transition-all shadow-lg shadow-growth/20">
                            {content.closing.cta.text} <ArrowRight size={20} />
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
}
