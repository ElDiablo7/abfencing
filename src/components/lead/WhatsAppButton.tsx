"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/447539490180?text=${encodeURIComponent(
    "Hi Scott, I found AB Fencing Ltd on your website and would like to ask about a quote."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Scott on WhatsApp"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-sm font-semibold pr-0 group-hover:pr-2">
        Chat on WhatsApp
      </span>
    </a>
  );
}
