
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const categories = [
    "All",
    "Accounting",
    "Guides",
    "Small Business",
    "Tax",
    "Corporate",
    "Personal"
];

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'All';

    const handleCategoryChange = (category: string) => {
        if (category === 'All') {
            router.push('/blog');
        } else {
            router.push(`/blog?category=${encodeURIComponent(category)}`);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${currentCategory === category
                            ? 'bg-navy-950 text-white shadow-md'
                            : 'bg-white text-navy-900 border border-gray-200 hover:border-growth hover:text-growth'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
