import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Star,
  MapPin,
  Cpu,
  Layers,
  CheckCircle2,
  Sliders,
  Gauge,
  Thermometer,
  Zap,
} from "lucide-react";
import { SHOP_INFO } from "../data/stingerData";

export default function HeroSection({ onOpenConfigurator, onOpenCatalog }) {
  const marqueeItems = [
    "NVIDIA GEFORCE RTX",
    "AMD RYZEN",
    "INTEL CORE 14-TH GEN",
    "ИДЕАЛЬНЫЙ КАБЕЛЬ-МЕНЕДЖМЕНТ",
    "XMP / EXPO НАСТРОЙКА ПАМЯТИ",
    "СТРЕСС-ТЕСТЫ 24 ЧАСА (FURMARK / OCCT)",
    "ВЕЛИКИЙ НОВГОРОД • ПСКОВСКАЯ 33",
    "ГАРАНТИЯ 3 МЕСЯЦА",
    "РЕЙТИНГ АВИТО 5.0 ★★★★★",
    "ДОСТАВКА ПО РФ В БРОНЕБОЙНОЙ УПАКОВКЕ",
  ];

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* ЛЕВАЯ КОЛОНКА (7 КОЛОНОК) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10">
            
            {/* Верхний статус-бейдж */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-wider shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              <span className="text-slate-300 uppercase font-semibold text-[11px] sm:text-xs">
                Великий Новгород • Лаборатория кастомных ПК
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1 border-l border-white/10 pl-2">
                <Star className="w-3 h-3 fill-amber-400" /> 5.0
              </span>
            </motion.div>

            {/* Главный заголовок с адаптированным размером и безопасным отступом */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-gaming text-3xl sm:text-4xl lg:text-[42px] xl:text-[48px] font-black text-white leading-[1.08] tracking-tight max-w-2xl mx-auto lg:mx-0"
            >
              БЕСКОМПРОМИССНАЯ МОЩЬ <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                В КАЖДОЙ ДЕТАЛИ.
              </span>
            </motion.h1>

            {/* Описание */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Собираем и настраиваем компьютеры под любые игры и рабочий рендер без переплат.
              Перфекционизм в кабель-менеджменте, суточный стресс-тест в FurMark/OCCT и честная гарантия 3 месяца.
            </motion.p>

            {/* Кнопки действия */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1"
            >
              {/* Главная кнопка: Открыть Конфигуратор */}
              <button
                onClick={onOpenConfigurator}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-gaming text-xs sm:text-sm font-bold shadow-[0_0_35px_rgba(99,102,241,0.45),inset_0_1px_0_0_rgba(255,255,255,0.25)] transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-cyan-300" />
                <span>СОБРАТЬ КОМПЬЮТЕР</span>
                <ArrowRight className="w-4 h-4 text-indigo-200" />
              </button>

              {/* Вторая кнопка: Каталог готовых ПК */}
              <button
                onClick={onOpenCatalog}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#080B13]/80 hover:bg-white/[0.06] text-white border border-white/10 hover:border-white/20 font-gaming text-xs sm:text-sm font-bold transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ГОТОВЫЕ ПК В НАЛИЧИИ</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">10 шт</span>
              </button>
            </motion.div>

            {/* Нижние 4 факта (Строгий премиум-стиль: белый металлик, без кислотных цветов) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/[0.08]"
            >
              <div className="text-left p-3.5 rounded-2xl bg-[#090C15]/70 border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Сборки в наличии
                </div>
                <div className="text-base sm:text-lg font-black text-metallic font-gaming mt-1">
                  от 31 299 ₽
                </div>
              </div>

              <div className="text-left p-3.5 rounded-2xl bg-[#090C15]/70 border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Тестирование
                </div>
                <div className="text-base sm:text-lg font-black text-metallic font-gaming mt-1">
                  24ч в OCCT
                </div>
              </div>

              <div className="text-left p-3.5 rounded-2xl bg-[#090C15]/70 border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Гарантия
                </div>
                <div className="text-base sm:text-lg font-black text-metallic font-gaming mt-1">
                  3 Месяца
                </div>
              </div>

              <div className="text-left p-3.5 rounded-2xl bg-[#090C15]/70 border border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                  Адрес мастерской
                </div>
                <div className="text-base sm:text-lg font-black text-metallic font-gaming mt-1">
                  Псковская 33
                </div>
              </div>
            </motion.div>

          </div>

          {/* ПРАВАЯ КОЛОНКА (5 КОЛОНОК): ИНТЕРАКТИВНЫЙ 3D-ПОДИУМ С HUD-ТЕЛЕМЕТРИЕЙ */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Мощный двойной ореол подсветки в тон водянки и ARGB ПК */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-600/35 via-cyan-500/30 to-emerald-400/20 rounded-3xl blur-2xl -z-10 animate-pulse pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/25 to-cyan-500/20 blur-[90px] rounded-full scale-90 pointer-events-none -z-10" />

            {/* Карточка витрины ПК */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[460px] rounded-[2.5rem] bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-transparent p-1 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.25)] border border-white/10 group"
            >
              <div className="relative rounded-[2.3rem] overflow-hidden bg-[#060810] aspect-[4/5] flex items-center justify-center">
                
                {/* Качественное фото флагмана */}
                <img
                  src={SHOP_INFO.heroImage}
                  alt="STINGER Custom Gaming PC"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Затемнение и градиенты глубины */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040508] via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_60%,rgba(4,5,8,0.7)_100%)]" />

                {/* HUD Телеметрия по центру/низу стекла */}
                <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-[#090C15]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/10">
                    <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> STINGER TELEMETRY
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator" />
                      СТРЕСС-ТЕСТ 24Ч OK
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2.5 text-center font-mono">
                    <div className="p-1.5 rounded-lg bg-white/[0.03]">
                      <div className="text-[10px] text-slate-400">GPU Temp</div>
                      <div className="text-xs font-bold text-emerald-400">61°C</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.03]">
                      <div className="text-[10px] text-slate-400">CPU Temp</div>
                      <div className="text-xs font-bold text-cyan-400">58°C</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.03]">
                      <div className="text-[10px] text-slate-400">FAN Speed</div>
                      <div className="text-xs font-bold text-white">1150 RPM</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ПАРЯЩИЙ ВИДЖЕТ 1: ВЕРХНИЙ ЛЕВЫЙ (OCCT STRESS-TEST) */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 sm:-left-6 px-3.5 py-2.5 rounded-2xl bg-[#080B13]/95 border border-indigo-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-2.5 z-20"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">OCCT 24ч • 0 ошибок</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-0.5">VRM & RAM Stable</div>
                </div>
              </motion.div>

              {/* ПАРЯЩИЙ ВИДЖЕТ 2: ВЕРХНИЙ ПРАВЫЙ (CS2 FPS) */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-2.5 rounded-2xl bg-[#080B13]/95 border border-cyan-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-2.5 z-20"
              >
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                  FPS
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white leading-none">320+ FPS CS2</div>
                  <div className="text-[9px] font-mono text-cyan-400 mt-0.5">Ultra 1080p / 2K</div>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>

      {/* Бегущая строка (Marquee Ticker) */}
      <div className="mt-16 sm:mt-20 py-3 bg-[#060810]/60 border-y border-white/[0.08] backdrop-blur-md overflow-hidden flex select-none">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap text-xs font-mono tracking-widest text-slate-400"
        >
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
