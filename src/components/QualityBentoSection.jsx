import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Activity,
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Thermometer,
  Cpu,
  Zap,
  ArrowRight,
} from "lucide-react";
import { QUALITY_BENTO, SHOP_INFO } from "../data/stingerData";
import SpotlightCard from "./ui/SpotlightCard";

export default function QualityBentoSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "layers":
        return <Layers className="w-6 h-6 text-purple-400" />;
      case "activity":
        return <Activity className="w-6 h-6 text-cyan-400" />;
      case "sparkles":
        return <Sparkles className="w-6 h-6 text-emerald-400" />;
      case "map-pin":
        return <MapPin className="w-6 h-6 text-amber-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="quality" className="relative py-28 bg-[#05060A] text-slate-100 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-purple-600/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/[0.04] blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Стандарты кастомной мастерской STINGER
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-gaming tracking-tight text-white mb-4">
            Почему наши компьютеры служат{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              годами
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Мы собираем не на поток, а вручную с вниманием к миллиметрам. Никаких дешевых ненадежных
            компонентов, перегревов или китайских блоков питания сомнительного качества.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Bento Item 1: Cable Management (Large 7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/30">
                    {QUALITY_BENTO[0].badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    {getIcon(QUALITY_BENTO[0].icon)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-gaming text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {QUALITY_BENTO[0].title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {QUALITY_BENTO[0].desc}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Тканевые стяжки Velcro</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Нулевое сопротивление воздуху</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Удобство будущей чистки</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Эстетика через стекло</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-400">
                <span>{QUALITY_BENTO[0].stats}</span>
                <span className="text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                  Фото процесса в Telegram <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </SpotlightCard>
          </div>

          {/* Bento Item 2: Stress-Testing 24h (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="h-full p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                    {QUALITY_BENTO[1].badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    {getIcon(QUALITY_BENTO[1].icon)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-gaming text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {QUALITY_BENTO[1].title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {QUALITY_BENTO[1].desc}
                </p>

                {/* Sensor telemetry simulation */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>FurMark GPU Burner:</span>
                    <span className="text-emerald-400 font-bold">64°C (Норма до 80°C)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>OCCT Memory Test:</span>
                    <span className="text-emerald-400 font-bold">0 ошибок / 24ч</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>AIDA64 CPU FPU:</span>
                    <span className="text-cyan-400 font-bold">Стабильно 100%</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>{QUALITY_BENTO[1].stats}</span>
                <span className="text-slate-400">Гарантия стабильности</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Bento Item 3: Out-of-the-box FPS & Tuned BIOS (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="h-full p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    {QUALITY_BENTO[2].badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    {getIcon(QUALITY_BENTO[2].icon)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-gaming text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {QUALITY_BENTO[2].title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {QUALITY_BENTO[2].desc}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Активированный XMP/EXPO профиль 3200-6000MHz</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Чистая Windows 11 Pro без телеметрии и мусора</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Термопаста Arctic MX-4 тонким слоем</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>{QUALITY_BENTO[2].stats}</span>
                <span className="text-slate-400">Сел и играешь</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Bento Item 4: Local Workshop & Personal Test (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full p-8 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                    {QUALITY_BENTO[3].badge}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    {getIcon(QUALITY_BENTO[3].icon)}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-gaming text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {QUALITY_BENTO[3].title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {QUALITY_BENTO[3].desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-white/5">
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">Адрес мастерской:</div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {SHOP_INFO.address}
                    </div>
                    <div className="text-[10px] text-slate-400">{SHOP_INFO.city} ({SHOP_INFO.locationNote})</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">Время работы:</div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {SHOP_INFO.workHours}
                    </div>
                    <div className="text-[10px] text-slate-400">{SHOP_INFO.chatHours}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-400">
                <span>{QUALITY_BENTO[3].stats}</span>
                <span className="text-slate-400">Trade-In старого ПК</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
