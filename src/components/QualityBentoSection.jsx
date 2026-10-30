import React, { useState, useEffect } from "react";
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
  Wind,
  Check,
} from "lucide-react";
import { QUALITY_BENTO, SHOP_INFO } from "../data/stingerData";
import SpotlightCard from "./ui/SpotlightCard";

export default function QualityBentoSection() {
  // Живые колебания параметров для WOW-симулятора стресс-теста
  const [liveTemp, setLiveTemp] = useState(63.9);
  const [liveFps, setLiveFps] = useState(185);
  const [liveVrm, setLiveVrm] = useState(54.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTemp((prev) => {
        const delta = (Math.random() * 0.4 - 0.2);
        return +(Math.max(63.7, Math.min(64.2, prev + delta))).toFixed(1);
      });
      setLiveFps((prev) => {
        const delta = Math.floor(Math.random() * 5 - 2);
        return Math.max(183, Math.min(188, prev + delta));
      });
      setLiveVrm((prev) => {
        const delta = (Math.random() * 0.2 - 0.1);
        return +(Math.max(54.0, Math.min(54.5, prev + delta))).toFixed(1);
      });
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="quality" className="relative py-24 sm:py-28 bg-transparent text-slate-100 overflow-hidden">
      {/* Мягкие ореолы подсветки */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-indigo-600/[0.08] blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/[0.08] blur-[150px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Стандарты кастомной мастерской STINGER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-gaming tracking-tight text-white mb-4">
            ПОЧЕМУ НАШИ ПК СЛУЖАТ{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              ГОДАМИ
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Мы собираем не на поток, а вручную с вниманием к миллиметрам. Никаких дешевых ненадежных
            компонентов, перегревов или китайских блоков питания сомнительного качества.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Cable Management (Large 7 cols) with Airflow Schematic */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full p-7 sm:p-8 rounded-3xl bg-[#080B13]/85 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                    Эстетика и продув
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-gaming text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    Кастомный кабель-менеджмент
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Каждый кабель уложен по линейке, закреплен тканевыми стяжками и спрятан за задней стенкой. Никаких «бород» из проводов — идеальный воздушный поток.
                  </p>
                </div>

                {/* SVG-виджет схемы воздушного потока (Airflow Simulation) */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <Wind className="w-3.5 h-3.5" /> Схема сквозного продува:
                    </span>
                    <span className="text-emerald-400 font-bold">100% Чистый поток</span>
                  </div>

                  <div className="relative h-12 bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-between px-4">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">Фронтальный забор</span>
                    
                    {/* Анимированные стрелки потока */}
                    <div className="flex items-center gap-1.5 opacity-80">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ x: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 border-t-2 border-r-2 border-cyan-400 rotate-45"
                        />
                      ))}
                    </div>

                    <span className="text-[10px] font-mono text-indigo-400 uppercase">Выдув назад/вверх</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Тканевые стяжки Velcro</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Нулевое сопротивление</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Удобство чистки от пыли</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Эстетика через стекло</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-indigo-400">
                <span>100% чистый продув корпуса</span>
                <span className="text-slate-400">Фото в Telegram</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Bento Item 2: Stress-Testing 24h (5 cols) with FurMark Wave Graph */}
          <div className="lg:col-span-5">
            <SpotlightCard className="h-full p-7 sm:p-8 rounded-3xl bg-[#080B13]/85 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                    Надежность 24 часа
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-gaming text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    Жесткий стресс-тест в 3 бенчмарках
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Каждый компьютер проходит суточный прогон в FurMark, OCCT и AIDA64 Extreme. Проверяем температуры VRM и 0 ошибок по памяти.
                  </p>
                </div>

                {/* ЖИВОЙ СИМУЛЯТОР СТРЕСС-ТЕСТА (WOW-EFFECT: LIVE TELEMETRY) */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-semibold flex items-center gap-1.5 text-cyan-400">
                      <Activity className="w-3.5 h-3.5" /> FurMark & OCCT Monitor:
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE TELEMETRY
                    </span>
                  </div>

                  {/* Живая SVG кривая температуры и фреймтайма */}
                  <div className="relative h-14 w-full bg-black/50 rounded-xl border border-white/5 p-1 flex items-end overflow-hidden">
                    {/* Сетка графика */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    
                    <svg viewBox="0 0 200 40" className="w-full h-full preserve-3d relative z-10">
                      <defs>
                        <linearGradient id="liveTempGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 35 Q 25 20, 50 15 T 100 13 T 150 12 T 200 12 L 200 40 L 0 40 Z"
                        fill="url(#liveTempGrad)"
                      />
                      <path
                        d="M 0 35 Q 25 20, 50 15 T 100 13 T 150 12 T 200 12"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.2"
                      />
                      {/* Пульсирующая точка активного сканирования на конце графика */}
                      <circle cx="196" cy="12" r="3.5" fill="#34D399" className="animate-ping" />
                      <circle cx="196" cy="12" r="2.5" fill="#10B981" />
                    </svg>
                    <span className="absolute top-1.5 right-2 text-[10px] text-emerald-400 font-bold z-20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Стабильная полка 24ч
                    </span>
                  </div>

                  {/* 3 Живых телеметрических датчика */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1">
                    <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-slate-400">GPU Temp</div>
                      <div className="text-xs font-bold text-emerald-400 transition-all duration-300">
                        {liveTemp}°C
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-slate-400">Burner FPS</div>
                      <div className="text-xs font-bold text-cyan-400 transition-all duration-300">
                        {liveFps} FPS
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-slate-400">VRM Temp</div>
                      <div className="text-xs font-bold text-indigo-400 transition-all duration-300">
                        {liveVrm}°C
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-0.5 border-t border-white/5">
                    <span>OCCT Memory Test: <strong className="text-emerald-400 font-bold">0 ошибок</strong></span>
                    <span>AIDA64 Stress: <strong className="text-cyan-400 font-bold">PASS</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>24 часа под нагрузкой</span>
                <span className="text-slate-400">Гарантия стабильности</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Bento Item 3: Out-of-the-box FPS & Tuned BIOS (5 cols) */}
          <div className="lg:col-span-5">
            <SpotlightCard className="h-full p-7 sm:p-8 rounded-3xl bg-[#080B13]/85 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    Включил и играешь
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-gaming text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    Максимальный FPS из коробки
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Установлена чистая Windows 11 Pro без мусорного софта. Настроены тайминги XMP/EXPO, обновлен BIOS и накатаны актуальные драйверы.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Активированный XMP/EXPO профиль памяти</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Чистая Windows 11 Pro без телеметрии</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Термопаста Arctic MX-4 тонким слоем</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>+10-15% к плавности</span>
                <span className="text-slate-400">Сел и играешь</span>
              </div>
            </SpotlightCard>
          </div>

          {/* Bento Item 4: Local Workshop & Personal Test (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard className="h-full p-7 sm:p-8 rounded-3xl bg-[#080B13]/85 border border-white/10 flex flex-col justify-between group overflow-hidden">
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                    Великий Новгород
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-gaming text-white mb-2 group-hover:text-amber-300 transition-colors">
                    Личная проверка на Псковской, 33
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Приезжайте в мастерскую, запускайте FurMark, Киберпанк или CS2 — время проверок не ограничиваем! Даем личную гарантию 3 месяца и принимаем ПК в Trade-In.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-black/60 border border-white/5">
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

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-400">
                <span>Гарантия 3 месяца</span>
                <span className="text-slate-400">Trade-In старого железа</span>
              </div>
            </SpotlightCard>
          </div>

        </div>

      </div>
    </section>
  );
}
