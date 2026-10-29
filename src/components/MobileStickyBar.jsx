import React from "react";
import { Sliders, MessageSquare, Send, Sparkles } from "lucide-react";
import { SHOP_INFO } from "../data/stingerData";

export default function MobileStickyBar() {
  const scrollToConfigurator = () => {
    const el = document.getElementById("configurator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-[#05060A]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={scrollToConfigurator}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-transform"
        >
          <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
          Конфигуратор
        </button>

        <a
          href={SHOP_INFO.avitoUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
          Авито (5.0 ★)
        </a>

        <a
          href={SHOP_INFO.telegramUrl}
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Telegram"
        >
          <Send className="w-4 h-4 text-cyan-400" />
        </a>
      </div>
    </div>
  );
}
