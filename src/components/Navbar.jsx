import React, { useState, useEffect } from "react";
import {
  MapPin,
  Sliders,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink,
} from "lucide-react";
import { SHOP_INFO } from "../data/stingerData";

export default function Navbar({ onOpenConfigurator }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Glass Island / Dock */}
        <div
          className={`relative rounded-2xl sm:rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#06080F]/90 border border-white/15 shadow-[0_15px_45px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.18)] backdrop-blur-2xl py-2 sm:py-2.5 px-3 sm:px-5"
              : "bg-[#070912]/80 border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl py-2.5 sm:py-3 px-3.5 sm:px-6"
          } flex items-center justify-between gap-3`}
        >
          {/* 1. БРЕНД И ЛОГОТИП */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="relative">
                <img
                  src={SHOP_INFO.logo}
                  alt={SHOP_INFO.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-white/15 group-hover:border-cyan-400/60 transition-colors shadow-md"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05060A]" />
              </div>

              <div>
                <span className="font-gaming text-sm sm:text-base font-extrabold tracking-tight text-white block group-hover:text-cyan-400 transition-colors leading-none">
                  STINGER <span className="text-cyan-400">PC</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider text-slate-400 hidden sm:block mt-0.5">
                  В. Новгород • 5.0 ★
                </span>
              </div>
            </a>
          </div>

          {/* 2. ЛАКОНИЧНАЯ НАВИГАЦИЯ (ДЕСКТОП) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollToSection("catalog")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              Готовые ПК
            </button>
            <button
              onClick={() => {
                if (onOpenConfigurator) onOpenConfigurator();
                else scrollToSection("configurator");
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-cyan-400 hover:text-white hover:bg-cyan-500/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span>Конфигуратор</span>
            </button>
            <button
              onClick={() => scrollToSection("quality")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3 h-3 text-purple-400" />
              <span>Качество</span>
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Отзывы</span>
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              FAQ
            </button>
          </nav>

          {/* 3. КЛАСТЕР СОЦСЕТЕЙ (АВИТО, TELEGRAM, VK) И CTA КНОПКА */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Кнопка АВИТО */}
            <a
              href={SHOP_INFO.avitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/50 text-white transition-all shadow-sm flex items-center gap-1.5 group"
              title="Открыть наш профиль и объявления на Авито (5.0 ★)"
            >
              {/* Фирменные 4 точки Авито */}
              <span className="flex items-center -space-x-0.5">
                <span className="w-2 h-2 rounded-full bg-[#96CE00]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00AAFF]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#A800FF]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4433]" />
              </span>
              <span className="font-extrabold text-[11px] sm:text-xs tracking-tight group-hover:text-emerald-300 transition-colors">
                Авито
              </span>
            </a>

            {/* Иконка TELEGRAM */}
            <a
              href={SHOP_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-[#0088cc]/20 text-[#29b6f6] hover:text-[#00c0ff] border border-white/10 hover:border-[#0088cc]/50 flex items-center justify-center transition-all shadow-sm group"
              title="Написать нам в Telegram"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.941z" />
              </svg>
            </a>

            {/* Иконка VK */}
            <a
              href={SHOP_INFO.vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900/90 hover:bg-[#0077ff]/20 text-[#4c97ff] hover:text-[#70adff] border border-white/10 hover:border-[#0077ff]/50 flex items-center justify-center transition-all shadow-sm group"
              title="Наша группа ВКонтакте"
            >
              <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M15.684 0H8.316C2.692 0 0 2.692 0 8.316v7.368C0 21.308 2.692 24 8.316 24h7.368C21.308 24 24 21.308 24 15.684V8.316C24 2.692 21.308 0 15.684 0zm3.602 17.158h-1.895c-.716 0-.934-.57-2.221-1.859-1.121-1.096-1.62-1.236-1.895-1.236-.388 0-.5.11-.5.64v1.75c0 .463-.148.705-1.37.705-2.023 0-4.267-1.228-5.854-3.522C3.89 11.233 2.63 7.84 2.63 7.332c0-.285.11-.55.64-.55h1.895c.478 0 .66.22.845.733.924 2.692 2.47 5.053 3.109 5.053.24 0 .35-.11.35-.713V9.213c-.073-1.29-.757-1.398-.757-1.858 0-.22.184-.44.478-.44h2.978c.404 0 .55.207.55.68v3.68c0 .397.176.54.294.54.24 0 .44-.143.882-.588 1.359-1.528 2.33-3.887 2.33-3.887.126-.277.346-.487.823-.487h1.895c.573 0 .698.294.573.698-.243.955-2.234 3.829-2.344 4.013-.264.44-.367.64 0 1.124.257.345 1.102 1.072 1.668 1.727 1.036 1.176 1.837 2.16 2.057 2.844.22.68-.11.97-.573.97z" />
              </svg>
            </a>

            {/* Акцентная кнопка «Собрать ПК» */}
            <button
              onClick={() => {
                if (onOpenConfigurator) onOpenConfigurator();
              }}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-gaming font-bold text-xs shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95 cursor-pointer ml-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Собрать ПК</span>
            </button>

            {/* Бургер-кнопка для мобильных */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors ml-1"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 4. ВЫПАДАЮЩАЯ ПАНЕЛЬ ДЛЯ МОБИЛЬНЫХ */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 rounded-2xl bg-[#070914]/95 border border-white/15 backdrop-blur-2xl p-4 space-y-3.5 shadow-2xl animate-in slide-in-from-top-3 duration-200">
            {/* Локация */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{SHOP_INFO.city}, {SHOP_INFO.address}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Открыто
              </span>
            </div>

            {/* Навигация */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => scrollToSection("catalog")}
                className="p-2.5 rounded-xl bg-white/[0.04] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
              >
                🛒 Готовые ПК
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenConfigurator) onOpenConfigurator();
                  else scrollToSection("configurator");
                }}
                className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 text-left text-indigo-300 font-bold transition-colors cursor-pointer"
              >
                🛠 Конфигуратор
              </button>
              <button
                onClick={() => scrollToSection("quality")}
                className="p-2.5 rounded-xl bg-white/[0.04] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
              >
                🛡 Качество
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="p-2.5 rounded-xl bg-white/[0.04] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
              >
                ⭐ Отзывы 5.0
              </button>
            </div>

            {/* Соцсети в мобильном меню */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Связаться с мастером:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={SHOP_INFO.avitoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center gap-1 text-white hover:border-emerald-500/40 transition-colors"
                >
                  <span className="flex items-center -space-x-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#96CE00]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00AAFF]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A800FF]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4433]" />
                  </span>
                  <span className="text-[11px] font-bold">Авито</span>
                </a>

                <a
                  href={SHOP_INFO.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center gap-1 text-[#29b6f6] hover:border-[#0088cc]/40 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.941z" />
                  </svg>
                  <span className="text-[11px] font-bold">Telegram</span>
                </a>

                <a
                  href={SHOP_INFO.vkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 flex flex-col items-center justify-center gap-1 text-[#4c97ff] hover:border-[#0077ff]/40 transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M15.684 0H8.316C2.692 0 0 2.692 0 8.316v7.368C0 21.308 2.692 24 8.316 24h7.368C21.308 24 24 21.308 24 15.684V8.316C24 2.692 21.308 0 15.684 0zm3.602 17.158h-1.895c-.716 0-.934-.57-2.221-1.859-1.121-1.096-1.62-1.236-1.895-1.236-.388 0-.5.11-.5.64v1.75c0 .463-.148.705-1.37.705-2.023 0-4.267-1.228-5.854-3.522C3.89 11.233 2.63 7.84 2.63 7.332c0-.285.11-.55.64-.55h1.895c.478 0 .66.22.845.733.924 2.692 2.47 5.053 3.109 5.053.24 0 .35-.11.35-.713V9.213c-.073-1.29-.757-1.398-.757-1.858 0-.22.184-.44.478-.44h2.978c.404 0 .55.207.55.68v3.68c0 .397.176.54.294.54.24 0 .44-.143.882-.588 1.359-1.528 2.33-3.887 2.33-3.887.126-.277.346-.487.823-.487h1.895c.573 0 .698.294.573.698-.243.955-2.234 3.829-2.344 4.013-.264.44-.367.64 0 1.124.257.345 1.102 1.072 1.668 1.727 1.036 1.176 1.837 2.16 2.057 2.844.22.68-.11.97-.573.97z" />
                  </svg>
                  <span className="text-[11px] font-bold">VK</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
