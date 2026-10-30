import React from "react";
import {
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUp,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { SHOP_INFO } from "../data/stingerData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#05070E]/85 backdrop-blur-2xl text-slate-400 border-t border-white/10 pt-16 pb-24 md:pb-16 overflow-hidden">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/40 p-0.5 bg-slate-900 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <img
                  src={SHOP_INFO.logo}
                  alt={SHOP_INFO.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div>
                <span className="text-xl font-extrabold font-gaming tracking-wider text-white">
                  STINGER <span className="text-cyan-400">PC</span>
                </span>
                <p className="text-[11px] text-slate-400 font-mono">{SHOP_INFO.brandSubtitle}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Лаборатория кастомных игровых ПК в Великом Новгороде. Профессиональная сборка,
              кабель-менеджмент по линейке, 24-часовые стресс-тесты FurMark и честная гарантия 3 месяца.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Гарантия 3 месяца
              </span>
              <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30">
                Рейтинг 5.0 ★
              </span>
            </div>
          </div>

          {/* Workshop Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Мастерская в Великом Новгороде
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{SHOP_INFO.address}</div>
                  <div className="text-[11px] text-slate-400">{SHOP_INFO.city} ({SHOP_INFO.locationNote})</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{SHOP_INFO.workHours}</div>
                  <div className="text-[11px] text-slate-400">{SHOP_INFO.chatHours}</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-slate-400">
                Принимаем старые компьютеры в <strong className="text-slate-300">Trade-In</strong> в зачет стоимости нового.
              </span>
            </div>
          </div>

          {/* Socials & Actions (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Связь и заказ
            </h4>

            <div className="space-y-2">
              <a
                href={SHOP_INFO.avitoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-white flex items-center justify-between transition-all group"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  Профиль на Авито
                </span>
                <span className="text-[10px] font-mono text-amber-400">5.0 ★</span>
              </a>

              <a
                href={SHOP_INFO.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-white flex items-center justify-between transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  Чат в Telegram
                </span>
                <span className="text-[10px] font-mono text-slate-400">онлайн</span>
              </a>

              <a
                href={SHOP_INFO.vkUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-blue-500/40 text-xs font-semibold text-white flex items-center justify-between transition-all group"
              >
                <span className="flex items-center gap-2">
                  <span className="text-blue-400 font-bold text-xs">VK</span>
                  Группа ВКонтакте
                </span>
                <span className="text-[10px] font-mono text-slate-400">отзывы</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} STINGER PC. Кастомные игровые компьютеры в Великом Новгороде.
            Все права защищены.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors text-xs font-mono"
          >
            Наверх <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
