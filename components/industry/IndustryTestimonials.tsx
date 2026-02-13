import { Star, Quote } from 'lucide-react';

interface Testimonial {
    name: string;
    quote: string;
    rating: number;
    source: string;
}

interface IndustryTestimonialsProps {
    testimonials: Testimonial[];
}

export function IndustryTestimonials({ testimonials }: IndustryTestimonialsProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((t, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative">
                            <Quote className="absolute top-6 right-6 text-emerald-100 w-12 h-12" />
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-600 mb-6 italic relative z-10">"{t.quote}"</p>
                            <div>
                                <h4 className="font-bold text-slate-900">{t.name}</h4>
                                <p className="text-sm text-slate-500">{t.source}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
