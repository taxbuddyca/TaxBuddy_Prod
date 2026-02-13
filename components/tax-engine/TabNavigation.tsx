"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Tab {
    id: string;
    label: string;
    icon: React.ReactElement<LucideIcon>;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
    return (
        <div className="border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
            <div className="flex gap-1 min-w-max">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                relative px-6 py-3 font-bold text-sm uppercase tracking-wider
                                transition-all duration-200
                                ${isActive
                                    ? 'text-navy-950'
                                    : 'text-navy-900/40 hover:text-navy-900/60'
                                }
                            `}
                        >
                            <div className="flex items-center gap-2">
                                {React.cloneElement(tab.icon, {
                                    size: 18,
                                    className: isActive ? 'text-emerald-600' : 'text-navy-900/40'
                                })}
                                <span>{tab.label}</span>
                            </div>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
