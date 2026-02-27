"use client";

import GlassCard from "@/components/GlassCard";
import { Zap, Users, Globe, ShieldCheck, Clock, Rocket, Send, CheckCircle2, Award, TrendingUp, Code2, Database, CreditCard, ShoppingCart, Workflow, Lock, Heart, Smile, Coffee, Star, MessageCircle, ThumbsUp, Target, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
    const founderStory = {
        quote: "I watched my best friend spend his entire weekend doing taxes for his startup instead of being with his newborn daughter. That's when I knew something had to change.",
        author: "Bhupendra Vekariya, Founder & CPA",
        context: "After 10 years at Big Four firms, I saw the same pattern: brilliant entrepreneurs wasting precious time on spreadsheets instead of building their dreams. TaxBuddy was born from a simple belief—your accountant should give you time back, not take it away."
    };

    const testimonials = [
        {
            quote: "TaxBuddy saved me 15 hours a month. I used that time to close two new clients. Best ROI I've ever had.",
            author: "Sarah Chen",
            role: "SaaS Founder, Vancouver",
            rating: 5,
            savings: "$12,000 in first year"
        },
        {
            quote: "Finally, an accountant who speaks my language. They integrated my Stripe data in 24 hours. My old firm took 3 weeks.",
            author: "Marcus Thompson",
            role: "E-commerce Owner, Toronto",
            rating: 5,
            savings: "15 hours/month saved"
        },
        {
            quote: "I was terrified of CRA audits. TaxBuddy not only handled everything but taught me how to stay compliant. I sleep better now.",
            author: "Priya Patel",
            role: "Freelance Developer, Halifax",
            rating: 5,
            savings: "Zero audit stress"
        }
    ];

    const certifications = [
        { name: "CPA Certified", icon: <Award size={24} /> },
        { name: "Xero Gold Partner", icon: <Award size={24} /> },
        { name: "QuickBooks ProAdvisor", icon: <Award size={24} /> },
        { name: "SOC 2 Compliant", icon: <ShieldCheck size={24} /> }
    ];

    const values = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "We Actually Care",
            desc: "This isn't just a job for us. When you succeed, we celebrate. When you're stressed, we're in the trenches with you. Your wins are our wins.",
            story: "Last month, we helped a client find $18,000 in missed deductions. She cried on our Zoom call. That's why we do this."
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Your Time is Sacred",
            desc: "You didn't start a business to do data entry. We automate the boring stuff so you can focus on what you love—building, creating, growing.",
            story: "Average client saves 12 hours per month. That's 144 hours a year. What would you do with an extra 6 days?"
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "Radical Transparency",
            desc: "No surprise bills. No hidden fees. No confusing jargon. Just honest pricing and straight talk. If we don't know something, we'll tell you.",
            story: "Fixed pricing means you know exactly what you'll pay. Always. We hate surprises as much as you do."
        },
        {
            icon: <Smile className="w-8 h-8" />,
            title: "Human First, Always",
            desc: "You'll never talk to a bot. Your accountant knows your name, your business, and your goals. We're real humans who actually answer Slack messages.",
            story: "Our average response time is 2 hours. Not 2 days. Not 2 weeks. 2 hours."
        }
    ];

    const techStack = [
        { name: "Xero", category: "Accounting", icon: <Database size={20} />, desc: "Real-time books" },
        { name: "QuickBooks", category: "Accounting", icon: <Database size={20} />, desc: "Full integration" },
        { name: "Stripe", category: "Payments", icon: <CreditCard size={20} />, desc: "Auto-sync" },
        { name: "Square", category: "Payments", icon: <CreditCard size={20} />, desc: "POS integration" },
        { name: "Shopify", category: "E-commerce", icon: <ShoppingCart size={20} />, desc: "Sales tracking" },
        { name: "WooCommerce", category: "E-commerce", icon: <ShoppingCart size={20} />, desc: "Order sync" },
        { name: "Zapier", category: "Automation", icon: <Workflow size={20} />, desc: "Custom workflows" },
        { name: "Make", category: "Automation", icon: <Workflow size={20} />, desc: "Advanced automation" },
    ];

    const milestones = [
        {
            year: "2019",
            title: "The Beginning",
            desc: "Started in a Halifax coffee shop with 10 clients and a dream: make accounting not suck. We promised ourselves we'd never become the stuffy firm we used to work for.",
            metric: "10 founding clients"
        },
        {
            year: "2020",
            title: "The Pandemic Pivot",
            desc: "When COVID hit, we were already 100% virtual. While other firms scrambled, we helped 200+ businesses transition to cloud accounting. Our clients didn't skip a beat.",
            metric: "200+ businesses helped"
        },
        {
            year: "2022",
            title: "Tech Integration Breakthrough",
            desc: "Launched our automated Stripe→Xero sync. What used to take clients 3 hours now takes 3 minutes. This is when we knew we were onto something special.",
            metric: "10+ hours saved/month per client"
        },
        {
            year: "2024",
            title: "Serving Canadian Entrepreneurs",
            desc: "From solo freelancers to Series A startups, we're now the financial backbone for 500+ Canadian businesses. Every single one gets the same white-glove service.",
            metric: "500+ active clients, $50M+ in tax savings"
        }
    ];

    const whyDifferent = [
        {
            icon: <Target size={32} />,
            title: "We Specialize in YOU",
            desc: "Tech founders. E-commerce owners. SaaS builders. Freelancers. We're not a generalist firm trying to serve everyone. We know your world because we live in it."
        },
        {
            icon: <Lightbulb size={32} />,
            title: "Proactive, Not Reactive",
            desc: "We don't wait for you to ask. We spot opportunities, flag issues, and suggest optimizations before you even know you need them. That's the difference between a bookkeeper and a partner."
        },
        {
            icon: <Sparkles size={32} />,
            title: "We Speak Human",
            desc: "No accounting jargon. No condescending explanations. We explain things like you're a smart person who just happens to not be an accountant. Because that's exactly what you are."
        }
    ];

    const stats = [
        { value: "500+", label: "Happy Clients", sublabel: "And growing every month" },
        { value: "$50M+", label: "Tax Savings", sublabel: "Secured for our clients" },
        { value: "4.9/5", label: "Client Rating", sublabel: "Based on 200+ reviews" },
        { value: "2 hrs", label: "Avg Response", sublabel: "We actually answer fast" },
        { value: "100%", label: "Virtual", sublabel: "Work from anywhere" },
        { value: "12+", label: "Hours Saved", sublabel: "Per client, per month" }
    ];

    return (
        <main className="min-h-screen pt-32 selection:bg-growth selection:text-white">
            <PageBackground />

            {/* Hero - Mission Statement */}
            <section className="bg-transparent py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 border border-blue-200/50 rounded-full text-growth font-black uppercase tracking-[0.2em] mb-8 text-[10px] shadow-sm">
                            <Heart size={14} className="fill-growth" /> Built by Entrepreneurs, for Entrepreneurs
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-navy-950 tracking-tighter mb-10 leading-[1.05]">
                            We exist to give you <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-growth to-blue-600">your weekends back.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-navy-900/70 leading-relaxed font-medium max-w-3xl mx-auto mb-4">
                            Because you didn't start a business to spend Saturday nights doing data entry.
                        </p>
                        <p className="text-lg text-navy-900/50 leading-relaxed font-medium max-w-2xl mx-auto">
                            Modern tax filing, bookkeeping, and CFO services for Canadian founders who'd rather build their dreams than manage spreadsheets.
                        </p>
                    </motion.div>

                    {/* Certifications Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap justify-center items-center gap-8 mb-16 max-w-4xl mx-auto"
                    >
                        {certifications.map((cert, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-navy-950/10 rounded-full shadow-sm">
                                <div className="text-growth">{cert.icon}</div>
                                <span className="text-sm font-bold text-navy-950">{cert.name}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-navy-950/5 hover:border-growth/30 transition-all">
                                <div className="text-3xl md:text-4xl font-black text-growth mb-1">{stat.value}</div>
                                <div className="text-sm font-bold text-navy-950 mb-1">{stat.label}</div>
                                <div className="text-xs text-navy-900/50 font-medium">{stat.sublabel}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Founder Story */}
            <section className="py-32 bg-gradient-to-br from-navy-950 to-navy-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-growth rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                                The Story Behind TaxBuddy
                            </h2>
                            <p className="text-xl text-white/70 font-medium">
                                Every business has an origin story. Here's ours.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center gap-12">
                            <div className="w-56 h-56 md:w-80 md:h-80 shrink-0 relative rounded-full overflow-hidden border-4 border-growth/30 shadow-2xl">
                                <Image
                                    src="/images/about/founder.png"
                                    alt="Bhupendra Vekariya, Founder & CPA"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="text-growth text-6xl font-serif">"</div>
                                    <p className="text-2xl md:text-3xl font-bold leading-relaxed pt-4">
                                        {founderStory.quote}
                                    </p>
                                </div>
                                <div className="pl-12">
                                    <p className="text-lg text-white/80 leading-relaxed mb-6">
                                        {founderStory.context}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-growth/20 rounded-full flex items-center justify-center">
                                            <Coffee className="text-growth" size={24} />
                                        </div>
                                        <div>
                                            <div className="font-black text-lg">{founderStory.author}</div>
                                            <div className="text-white/60 text-sm">Started in a Halifax coffee shop, 2019</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                                <h3 className="text-2xl font-black mb-4">The Problem We Saw</h3>
                                <ul className="space-y-3 text-white/80">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✗</span>
                                        <span>Entrepreneurs spending weekends on spreadsheets</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✗</span>
                                        <span>Accountants who take weeks to respond</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✗</span>
                                        <span>Surprise bills and hidden fees</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-400 mt-1">✗</span>
                                        <span>Firms that don't understand tech businesses</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                                <h3 className="text-2xl font-black mb-4">Our Solution</h3>
                                <ul className="space-y-3 text-white/80">
                                    <li className="flex items-start gap-3">
                                        <span className="text-growth mt-1">✓</span>
                                        <span>Automated systems that work while you sleep</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-growth mt-1">✓</span>
                                        <span>2-hour average response time (not 2 weeks)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-growth mt-1">✓</span>
                                        <span>Fixed pricing, always transparent</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-growth mt-1">✓</span>
                                        <span>We speak SaaS, e-commerce, and startup</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why We're Different */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                            Why We're Different
                        </h2>
                        <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium">
                            We're not your grandfather's accounting firm. Here's what makes us different.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                        {whyDifferent.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <GlassCard className="p-8 h-full hover:border-growth/30 transition-all group text-center" intensity="light">
                                    <div className="w-20 h-20 bg-growth/10 rounded-2xl flex items-center justify-center mb-6 text-growth group-hover:bg-growth group-hover:text-white transition-all mx-auto">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-navy-950 mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-navy-900/60 leading-relaxed font-medium">{item.desc}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values - Expanded */}
            <section className="py-32 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                            What We Believe
                        </h2>
                        <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium">
                            These aren't just words on a wall. They're promises we make to every client, every day.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <GlassCard className="p-10 h-full hover:border-growth/30 transition-all group" intensity="light">
                                    <div className="flex items-start gap-6 mb-6">
                                        <div className="w-16 h-16 bg-growth/10 rounded-2xl flex items-center justify-center text-growth group-hover:bg-growth group-hover:text-white transition-all flex-shrink-0">
                                            {value.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-navy-950 mb-3 tracking-tight">{value.title}</h3>
                                            <p className="text-navy-900/70 leading-relaxed font-medium mb-4">{value.desc}</p>
                                        </div>
                                    </div>
                                    <div className="bg-growth/5 border-l-4 border-growth rounded-r-xl p-4">
                                        <p className="text-sm text-navy-900/60 italic leading-relaxed">
                                            <strong className="text-navy-950 not-italic">Real story:</strong> {value.story}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Testimonials */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                            Don't Take Our Word For It
                        </h2>
                        <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium">
                            Here's what real clients say about working with us.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <GlassCard className="p-8 h-full hover:border-growth/30 transition-all" intensity="light">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-lg text-navy-900/80 leading-relaxed mb-6 italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="border-t border-navy-950/10 pt-4">
                                        <div className="font-black text-navy-950">{testimonial.author}</div>
                                        <div className="text-sm text-navy-900/60 mb-3">{testimonial.role}</div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-growth/10 text-growth rounded-full text-xs font-bold">
                                            <TrendingUp size={14} />
                                            {testimonial.savings}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-32 bg-navy-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-growth rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-growth font-black uppercase tracking-[0.2em] mb-8 text-[10px]">
                            <Code2 size={14} /> Tech-Driven, Human-Led
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
                            Our Tech Stack
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed">
                            We're not just accountants—we're systems integrators. We connect all your tools so your financial data flows automatically. No more manual data entry. Ever.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-6 max-w-6xl mx-auto mb-12">
                        {/* Featured Image Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-0 overflow-hidden lg:col-span-7 relative min-h-[400px] flex items-center justify-center group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-growth/20 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image
                                src="/images/about/tech-abstract.png"
                                alt="Automated Accounting Workflows"
                                fill
                                className="object-cover md:object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>

                        {/* Tech Grid */}
                        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                            {techStack.map((tech, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-growth/50 transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-growth mb-4 group-hover:scale-110 transition-transform group-hover:bg-growth/20">
                                            {tech.icon}
                                        </div>
                                        <div className="text-sm font-black mb-1">{tech.name}</div>
                                        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">{tech.category}</div>
                                    </div>
                                    <div className="text-xs text-white/60">{tech.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-4">
                            <Lock size={16} className="text-growth" />
                            <span className="text-sm font-medium">256-bit encryption • 2FA • SOC 2 compliant storage</span>
                        </div>
                        <p className="text-white/50 text-sm max-w-2xl mx-auto">
                            Your data is encrypted at rest and in transit. We take security as seriously as you do.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-navy-950 mb-6 tracking-tighter">
                            Our Journey
                        </h2>
                        <p className="text-xl text-navy-900/60 max-w-2xl mx-auto font-medium">
                            From a coffee shop idea to serving 500+ Canadian entrepreneurs. Here's how we got here.
                        </p>
                    </motion.div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block" />
                        <div className="space-y-32 relative z-10">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex-1 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <h4 className="text-5xl font-black text-growth mb-4">{m.year}</h4>
                                        <h5 className="text-3xl font-black text-navy-950 mb-6">{m.title}</h5>
                                        <p className="text-navy-900/70 text-lg font-medium leading-relaxed mb-4">{m.desc}</p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-growth/10 text-growth rounded-full text-sm font-bold">
                                            <CheckCircle2 size={16} />
                                            {m.metric}
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white border-8 border-gray-50 rounded-full flex items-center justify-center shadow-premium relative z-10">
                                            <div className="w-6 h-6 bg-growth rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                                        </div>
                                        <div className="absolute w-32 h-32 bg-growth/5 rounded-full blur-xl animate-pulse" />
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-growth rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center antialiased" style={{ transform: "translateZ(0)", WebkitFontSmoothing: "antialiased", backfaceVisibility: "hidden" }}>
                    <h2 className="text-4xl md:text-6xl font-black text-navy-950 mb-6 tracking-tighter" style={{ transform: "translateZ(0)" }}>
                        Ready to Get Your <br />
                        <span className="text-growth">Weekends Back?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-navy-900/60 mb-4 max-w-2xl mx-auto font-medium leading-relaxed">
                        Book a free 15-minute call. No sales pitch. Just an honest conversation about whether we're a good fit.
                    </p>
                    <p className="text-lg text-navy-900/50 mb-12 max-w-xl mx-auto">
                        We'll show you exactly how much time (and money) you could save. If we're not the right fit, we'll tell you that too.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/contact" className="group relative bg-navy-950 text-white px-12 py-6 rounded-2xl text-xl font-black hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-navy-950/20 overflow-hidden focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                            <motion.div
                                className="absolute inset-0 bg-growth/20 opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="relative z-10">Book Free Consultation</span>
                            <Send size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/pricing" className="bg-white border-2 border-gray-200 text-navy-900 px-12 py-6 rounded-2xl text-xl font-black hover:bg-gray-50 hover:border-growth/30 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2">
                            View Pricing
                        </Link>
                    </div>
                    <p className="text-sm text-navy-900/40 mt-8">
                        <ThumbsUp size={16} className="inline mr-2" />
                        Join 500+ Canadian entrepreneurs who've already made the switch
                    </p>
                </div>
            </section>
        </main>
    );
}
