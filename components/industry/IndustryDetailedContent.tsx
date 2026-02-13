interface DetailedContent {
    title: string;
    content: string;
}

interface IndustryDetailedContentProps {
    content: DetailedContent[];
}

export function IndustryDetailedContent({ content }: IndustryDetailedContentProps) {
    if (!content || content.length === 0) return null;

    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-4xl">
                {content.map((block, index) => (
                    <div key={index} className="mb-12 last:mb-0">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{block.title}</h3>
                        <div
                            className="prose prose-slate max-w-none prose-emerald"
                            dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
