import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  MessageSquare, 
  Send, 
  Share2, 
  Sliders, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';
import { SHOP_INFO } from '../data/stingerData';

export default function Navbar({ onOpenConfigurator }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05060A]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent border-b border-white/[0.04] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* ЛОГОТИП И ИНДИКАТОР МАСТЕРСКОЙ */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={SHOP_INFO.logo}
                  alt={SHOP_INFO.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border border-white/10 group-hover:border-cyber-purple/60 transition-colors shadow-lg"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#05060A] pulse-indicator" />
              </div>
              <div>
                <span className="font-brand text-base sm:text-lg font-black tracking-tight text-white block group-hover:text-cyber-cyan transition-colors">
                  {SHOP_INFO.name}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase hidden sm:block">
                  Custom Gaming PC • 5.0 ★
                </span>
              </div>
            </a>

            {/* ИНТЕРАКТИВНЫЙ ПИЛЛ ЛОКАЦИИ */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 hover:border-cyber-cyan/40 hover:bg-white/[0.06] transition-all">
              <MapPin className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
              <span className="font-medium">{SHOP_INFO.city}, {SHOP_INFO.address}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-mono font-medium">Открыто</span>
            </div>
          </div>

          {/* НАВИГАЦИОННОЕ МЕНЮ (ДЕСКТОП) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => scrollToSection('catalog')}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              Готовые ПК
            </button>
            <button
              onClick={() => scrollToSection('benchmarks')}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              FPS Тесты
            </button>
            <button
              onClick={() => scrollToSection('configurator')}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-cyber-cyan hover:text-white hover:bg-cyber-cyan/10 transition-all flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>Конфигуратор</span>
            </button>
            <button
              onClick={() => scrollToSection('quality')}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Качество</span>
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Отзывы 5.0</span>
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
            >
              FAQ
            </button>
          </nav>

          {/* ПРАВЫЙ БЛОК: СОЦСЕТИ И ГЛАВНАЯ КНОПКА СБОРКИ */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Кнопка Авито */}
            <a
              href={SHOP_INFO.avitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 hover:border-blue-500 text-xs font-bold transition-all shadow-[0_2px_12px_rgba(37,99,235,0.2)]"
              title="Написать нам на Авито"
            >
              <span className="font-brand text-[11px] font-black uppercase tracking-wider">Avito</span>
            </a>

            {/* Telegram */}
            <a
              href={SHOP_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyber-cyan border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-center transition-all"
              title="Telegram канал и чат"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* VK */}
            <a
              href={SHOP_INFO.vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-white/[0.08] hover:border-blue-500/40 flex items-center justify-center transition-all hidden sm:flex"
              title="Группа ВКонтакте"
            >
              <span className="font-bold text-xs">VK</span>
            </a>

            {/* Кнопка быстрого вызова конфигуратора */}
            <button
              onClick={() => {
                if (onOpenConfigurator) onOpenConfigurator();
                scrollToSection('configurator');
              }}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(139,92,246,0.45),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="font-brand tracking-tight">Собрать ПК</span>
            </button>

            {/* Бургер для мобильных */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* ВЫПАДАЮЩЕЕ МОБИЛЬНОЕ МЕНЮ */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#07090F]/95 backdrop-blur-2xl p-4 sm:p-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
            <MapPin className="w-5 h-5 text-cyber-cyan shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">{SHOP_INFO.city}, {SHOP_INFO.address}</span>
              <span className="text-slate-400">Псковский район • Тесты на месте</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
            <button
              onClick={() => scrollToSection('catalog')}
              className="p-3 rounded-xl bg-white/[0.03] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
            >
              🛒 Готовые ПК
            </button>
            <button
              onClick={() => scrollToSection('benchmarks')}
              className="p-3 rounded-xl bg-white/[0.03] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
            >
              📊 FPS Тесты
            </button>
            <button
              onClick={() => scrollToSection('configurator')}
              className="p-3 rounded-xl bg-cyber-purple/15 text-left text-cyber-cyan font-bold border border-cyber-purple/30"
            >
              🛠 Конфигуратор
            </button>
            <button
              onClick={() => scrollToSection('quality')}
              className="p-3 rounded-xl bg-white/[0.03] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
            >
              🛡 Качество
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="p-3 rounded-xl bg-white/[0.03] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
            >
              ⭐ Отзывы 5.0
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="p-3 rounded-xl bg-white/[0.03] text-left text-slate-200 hover:bg-white/[0.08] transition-colors"
            >
              ❓ Вопросы
            </button>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={SHOP_INFO.avitoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-brand text-xs font-bold text-center shadow-lg"
            >
              НАПИСАТЬ НА АВИТО
            </a>
            <a
              href={SHOP_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>TG</span>
            </a>
          </div>

        </div>
      )}
    </header>
  );
}
