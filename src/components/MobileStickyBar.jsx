import React from "react";
import { Sliders, MessageSquare, Send } from "lucide-react";
import { SHOP_INFO } from "../data/stingerData";

export default function MobileStickyBar({ onOpenConfigurator }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-[#060810]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.85)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Кнопка запуска пошагового конфигуратора */}
        <button
          onClick={onOpenConfigurator}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-gaming font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95 transition-transform cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-300 stroke-[2.5]" />
          <span>Конфигуратор</span>
        </button>

        {/* Кнопка Авито */}
        <a
          href={SHOP_INFO.avitoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <span className="flex items-center -space-x-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#96CE00]" />
            <span className="w-2 h-2 rounded-full bg-[#00AAFF]" />
            <span className="w-2 h-2 rounded-full bg-[#A800FF]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4433]" />
          </span>
          <span className="text-[11px] font-bold">Авито 5.0</span>
        </a>

        {/* Telegram */}
        <a
          href={SHOP_INFO.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-[#29b6f6] flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Telegram"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.941z" />
          </svg>
        </a>

        {/* VK */}
        <a
          href={SHOP_INFO.vkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 text-[#4c97ff] flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="ВКонтакте"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M15.684 0H8.316C2.692 0 0 2.692 0 8.316v7.368C0 21.308 2.692 24 8.316 24h7.368C21.308 24 24 21.308 24 15.684V8.316C24 2.692 21.308 0 15.684 0zm3.602 17.158h-1.895c-.716 0-.934-.57-2.221-1.859-1.121-1.096-1.62-1.236-1.895-1.236-.388 0-.5.11-.5.64v1.75c0 .463-.148.705-1.37.705-2.023 0-4.267-1.228-5.854-3.522C3.89 11.233 2.63 7.84 2.63 7.332c0-.285.11-.55.64-.55h1.895c.478 0 .66.22.845.733.924 2.692 2.47 5.053 3.109 5.053.24 0 .35-.11.35-.713V9.213c-.073-1.29-.757-1.398-.757-1.858 0-.22.184-.44.478-.44h2.978c.404 0 .55.207.55.68v3.68c0 .397.176.54.294.54.24 0 .44-.143.882-.588 1.359-1.528 2.33-3.887 2.33-3.887.126-.277.346-.487.823-.487h1.895c.573 0 .698.294.573.698-.243.955-2.234 3.829-2.344 4.013-.264.44-.367.64 0 1.124.257.345 1.102 1.072 1.668 1.727 1.036 1.176 1.837 2.16 2.057 2.844.22.68-.11.97-.573.97z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
