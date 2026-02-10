"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
    return (
        <a
            href="https://wa.me/13068804017"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} fill="white" className="text-white" />
            <span className="absolute right-full mr-4 bg-white text-navy-950 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Chat with us
            </span>
        </a>
    );
}
