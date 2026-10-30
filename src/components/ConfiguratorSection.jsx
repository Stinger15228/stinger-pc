import React from "react";
import { motion } from "framer-motion";
import {
  Sliders,
  Sparkles,
  Zap,
  Crosshair,
  Flame,
  Video,
  Coins,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Gauge,
  CheckCircle2,
} from "lucide-react";
import SpotlightCard from "./ui/SpotlightCard";

export default function ConfiguratorSection({ onOpenStudioModal, onOpenQuizModal }) {
  const budgetPresets = [
    { label: "до 45 000 ₽", desc: "CS2 • Dota 2 • GTA 5", icon: Coins },
    { label: "45 000 – 75 000 ₽", desc: "1080p Ultra Gaming", icon: Crosshair },
    { label: "75 000 – 120 000 ₽", desc: "2K 144Hz AAA-игры", icon: Flame },
    { label: "от 120 000 ₽", desc: "4K Extreme • Рендер 3D", icon: Video },
  ];

  return (
    <section id="configurator" className="relative py-16 sm:py-20 bg-transparent overflow-hidden">
      {/* Мягкие световые пятна фона */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-indigo-600/15 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-8 sm:p-12 rounded-[2.5rem] bg-[#070914]/80 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* ЛЕВАЯ ЧАСТЬ: ИНФОРМАЦИЯ И КНОПКИ (7 КОЛОНОК) */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Лаборатория кастомных сборок STINGER</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-gaming text-white tracking-tight leading-tight">
                СОБЕРИ СВОЙ КАСТОМНЫЙ ИГРОВОЙ ПК{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                  ПОШАГОВО
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Выберите комплектующие из актуального пула наличия в Великом Новгороде.
                В стоимость сборки уже включены: материнская плата, надежный блок питания,
                эффективное башенное охлаждение, чистая Windows 11 Pro и суточный стресс-тест в FurMark/OCCT.
              </p>

              {/* ДВЕ КНОПКИ ДЕЙСТВИЯ */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenStudioModal("pro")}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-gaming text-xs sm:text-sm font-bold shadow-[0_0_30px_rgba(99,102,241,0.45)] transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>Запустить 3D-Конфигуратор (Пошагово)</span>
                  <ArrowRight className="w-4 h-4 text-indigo-200" />
                </button>

                <button
                  onClick={() => onOpenQuizModal ? onOpenQuizModal("quiz") : onOpenStudioModal("quiz")}
                  className="px-6 py-4 rounded-2xl bg-[#090C16] hover:bg-white/[0.06] text-white border border-white/10 hover:border-white/20 font-gaming text-xs sm:text-sm font-bold transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Экспресс-подбор за 5 вопросов</span>
                </button>
              </div>

            </div>

            {/* ПРАВАЯ ЧАСТЬ: ИНТЕРАКТИВНЫЕ КАРТОЧКИ БЮДЖЕТА И ПРЕИМУЩЕСТВ (5 КОЛОНОК) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Быстрый старт по бюджетам:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Железо в наличии
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {budgetPresets.map((preset, idx) => {
                  const Icon = preset.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => onOpenStudioModal("pro")}
                      className="p-3.5 rounded-2xl bg-black/50 hover:bg-black/75 border border-white/[0.08] hover:border-indigo-500/40 text-left transition-all group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                        <Icon className="w-3.5 h-3.5 text-indigo-400 group-hover:text-cyan-400 transition-colors" />
                        <span>{preset.label}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-1 line-clamp-1">
                        {preset.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Честная гарантия 3 месяца
                </span>
                <span className="text-indigo-400 font-bold">Великий Новгород</span>
              </div>
            </div>

          </div>

        </SpotlightCard>
      </div>
    </section>
  );
}
