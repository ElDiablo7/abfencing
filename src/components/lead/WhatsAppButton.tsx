"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/447539490180?text=${encodeURIComponent(
    "Hi Scott, I found AB Fencing Ltd on your website and would like to ask about a quote."
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center group">
      {/* Outer Sonar Pulsing Aura */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none" />
      <span className="absolute -inset-2 rounded-full bg-[#25D366]/20 blur-md pointer-events-none" />

      {/* Main 3D Hyper-Real Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Scott on WhatsApp"
        className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-b from-[#34E075] via-[#25D366] to-[#1DA851] text-white shadow-[0_12px_28px_-6px_rgba(37,211,102,0.55),0_6px_12px_-4px_rgba(0,0,0,0.25),inset_0_2px_2px_rgba(255,255,255,0.6),inset_0_-3px_5px_rgba(0,0,0,0.2)] border border-[#45EE86]/50 hover:border-white/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] active:translate-y-0.5 active:scale-95 hover:shadow-[0_18px_36px_-6px_rgba(37,211,102,0.7),0_8px_16px_-4px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-3px_6px_rgba(0,0,0,0.25)]"
      >
        {/* Specular Gloss Overlay Line */}
        <div className="absolute top-0 left-3 right-3 h-[45%] bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />

        {/* 3D Icon Container with Glass Shield */}
        <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.2)] shrink-0">
          <MessageCircle className="w-5 h-5 text-white filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] fill-white/20" />
          
          {/* Online Status Beacon Indicator */}
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 border-2 border-[#25D366] rounded-full animate-pulse shadow-[0_0_8px_#34E075]" />
        </div>

        {/* Text Label */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] leading-none">
            Scott Direct
          </span>
          <span className="text-sm font-extrabold tracking-tight text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.4)] whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </div>
  );
}
