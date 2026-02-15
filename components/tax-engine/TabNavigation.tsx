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

import { ChevronDown, Menu } from 'lucide-react';

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const activeTabData = tabs.find(t => t.id === activeTab) || tabs[0];

    return (
        <div className="border-b border-gray-200 mb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
            {/* Desktop Tabs */}
            <div className="hidden sm:flex gap-1 min-w-max">
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
                                {React.cloneElement(tab.icon as any, {
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

            {/* Mobile Dropdown */}
            <div className="sm:hidden relative py-2">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm font-bold text-navy-950"
                >
                    <div className="flex items-center gap-3">
                        {React.cloneElement(activeTabData.icon as any, {
                            size: 20,
                            className: 'text-emerald-600'
                        })}
                        <span className="uppercase tracking-wider text-sm">{activeTabData.label}</span>
                    </div>
                    <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-2 overflow-hidden"
                        >
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            onTabChange(tab.id);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-navy-900/60'}`}
                                    >
                                        {React.cloneElement(tab.icon as any, {
                                            size: 18,
                                            className: isActive ? 'text-emerald-600' : 'text-navy-900/40'
                                        })}
                                        <span className="font-bold uppercase tracking-wider text-xs">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
}
