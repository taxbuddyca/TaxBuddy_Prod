"use client";

import ServiceTabs from "@/components/ServiceTabs";
import ExpertiseGrid from "@/components/ExpertiseGrid";
import Link from "next/link";
import { XeroLogo, QuickBooksLogo, StripeLogo, ShopifyLogo, WagepointLogo, DeelLogo, HubdocLogo, DextLogo, KarbonLogo, SlackLogo, ZoomLogo, NotionLogo } from "@/components/BrandLogos";

export default function ServicesPage() {
    return (
        <main className="min-h-screen pt-32 bg-white selection:bg-growth selection:text-white">
            <section className="bg-blue-50/50 py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-50/30 to-blue-100/20" />
                    <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-24 flashy-reveal">
                        <span className="text-growth font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 tracking-tighter mb-8">Full-Service Financial Management.</h2>
                        <p className="text-lg text-navy-900/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            Choose the level of support your business needs. We act as your entire finance department, seamlessly integrated with your existing tech.
                        </p>
                    </div>

                    <ServiceTabs />

                    {/* Tech Stack Integration */}
                    <div className="mt-40">
                        <div className="text-center mb-16 flashy-reveal">
                            <h3 className="text-3xl font-black text-navy-950 mb-4 tracking-tight">The Tech Ecosystem</h3>
                            <p className="text-navy-900/40 text-sm font-medium italic">We integrate your world with modern finance</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[
                                { name: 'Xero', Logo: XeroLogo },
                                { name: 'QuickBooks', Logo: QuickBooksLogo },
                                { name: 'Stripe', Logo: StripeLogo },
                                { name: 'Shopify', Logo: ShopifyLogo },
                                { name: 'Wagepoint', Logo: WagepointLogo },
                                { name: 'Deel', Logo: DeelLogo },
                                { name: 'Hubdoc', Logo: HubdocLogo },
                                { name: 'Dext', Logo: DextLogo },
                                { name: 'Karbon', Logo: KarbonLogo },
                                { name: 'Slack', Logo: SlackLogo },
                                { name: 'Zoom', Logo: ZoomLogo },
                                { name: 'Notion', Logo: NotionLogo }
                            ].map((tool) => (
                                <div key={tool.name} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-center text-navy-950 hover:border-growth hover:text-growth transition-all shadow-sm hover-flash group">
                                    <tool.Logo className="h-8 w-auto text-navy-900 group-hover:text-growth transition-colors grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-40 mb-16 flashy-reveal">
                        <h3 className="text-3xl font-black text-navy-950 mb-4 tracking-tight">Deep Industry Expertise</h3>
                        <p className="text-navy-900/40 text-sm font-medium italic">Specialized knowledge across Canada's most dynamic sectors</p>
                    </div>
                    <ExpertiseGrid />

                    {/* Final CTA */}
                    <div className="mt-40 bg-navy-950 rounded-[3rem] p-16 lg:p-20 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-growth/10 via-transparent to-transparent" />
                        <h3 className="text-4xl lg:text-5xl font-black text-white mb-8 relative z-10 tracking-tighter">Ready to upgrade your <br />back-office?</h3>
                        <p className="text-white/40 text-lg font-medium mb-12 relative z-10 max-w-2xl mx-auto">
                            Stop worrying about bookkeeping and start focusing on growth. Our pods are ready to integrate.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                            <Link href="/contact" className="bg-growth text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all text-lg shadow-lg shadow-growth/20">
                                Talk to a CPA
                            </Link>
                            <Link href="/pricing" className="bg-white/10 text-white px-10 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-lg border border-white/10">
                                View Plans
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
