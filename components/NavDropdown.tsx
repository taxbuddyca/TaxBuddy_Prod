import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface NavItem {
    title: string;
    href: string;
    description?: string;
    icon?: React.ElementType;
}

interface NavGroup {
    category: string;
    items: NavItem[];
}

interface NavDropdownProps {
    title: string;
    items?: NavItem[];
    groups?: NavGroup[];
}

export default function NavDropdown({ title, items, groups }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasGroups = groups && groups.length > 0;

    // Width adjustment for grouped content
    const dropdownWidth = hasGroups ? 'w-[600px]' : 'w-72';

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition py-2 ${isOpen ? 'text-growth' : 'text-navy-900/60 hover:text-growth'}`}>
                {title}
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`} />
            </button>

            <div className={`absolute top-full -left-6 pt-4 ${dropdownWidth} transition-all duration-300 origin-top-left ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible z-50' : 'opacity-0 scale-95 -translate-y-2 invisible -z-10'}`}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-y-auto max-h-[80vh] p-2">
                    {hasGroups ? (
                        <div className="grid grid-cols-2 gap-6">
                            {groups.map((group, gIndex) => (
                                <div key={gIndex} className="space-y-3">
                                    <div className="text-xs font-black text-navy-900/40 uppercase tracking-widest px-2 border-b border-gray-100 pb-2 mb-2">
                                        {group.category}
                                    </div>
                                    <div className="space-y-1">
                                        {group.items.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.href}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group/item"
                                            >
                                                {item.icon && (
                                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-growth flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                                        <item.icon size={14} />
                                                    </div>
                                                )}
                                                <div className="text-sm font-bold text-navy-950 group-hover/item:text-growth transition-colors">
                                                    {item.title}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                title={item.description}
                                className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition group/item"
                            >
                                {item.icon && (
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-growth flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                        <item.icon size={16} />
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-bold text-navy-950 group-hover/item:text-growth transition-colors">{item.title}</div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
