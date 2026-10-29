import React from 'react';
import { motion } from 'framer-motion';
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
  Sliders
} from 'lucide-react';
import { SHOP_INFO } from '../data/stingerData';

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
    <section className="relative pt-28 sm:pt-36 pb-16 md:pb-24 overflow-hidden cyber-grid-pattern">
      
      {/* МНОГОСЛОЙНЫЕ СВЕТОВЫЕ ОРЕОЛЫ (NEON AURAS) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-purple-600/25 via-indigo-600/20 to-cyan-400/15 blur-[120px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/15 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ЛЕВАЯ КОЛОНКА: ЗАГОЛОВОК, УТП И КНОПКИ ДЕЙСТВИЯ */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Верхний бейдж студии */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-wider shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-xl"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-indicator" />
              <span className="text-slate-300 uppercase font-bold text-[11px] sm:text-xs">
                Великий Новгород • Лаборатория кастомных ПК
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1 border-l border-white/10 pl-2">
                <Star className="w-3 h-3 fill-amber-400" /> 5.0
              </span>
            </motion.div>

            {/* Главный заголовок с неоновым градиентом */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-brand text-3xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.12] tracking-tight"
            >
              БЕСКОМПРОМИССНАЯ МОЩЬ <br />
              <span className="text-gradient-purple">В КАЖДОЙ ДЕТАЛИ.</span>
            </motion.h1>

            {/* Описание */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base xl:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              Собираем и настраиваем компьютеры под любые игры и рабочий рендер без переплат.
              Перфекционизм в кабель-менеджменте, суточный стресс-тест в FurMark/OCCT и честная гарантия 3 месяца.
            </motion.p>

            {/* Кнопки действия */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              {/* Главная кнопка: Конфигуратор */}
              <button
                onClick={onOpenConfigurator}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-brand text-sm font-bold shadow-[0_0_35px_rgba(139,92,246,0.5),inset_0_1px_0_0_rgba(255,255,255,0.3)] transition-all hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2.5"
              >
                <Sliders className="w-4 h-4 text-cyan-300" />
                <span>СОБРАТЬ КОМПЬЮТЕР</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </button>

              {/* Вторая кнопка: Каталог готовых ПК */}
              <button
                onClick={onOpenCatalog}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#090B11] hover:bg-white/[0.06] text-white border border-white/10 hover:border-white/20 font-brand text-xs sm:text-sm font-bold transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
              >
                <span>ГОТОВЫЕ ПК В НАЛИЧИИ</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">10 шт</span>
              </button>
            </motion.div>

            {/* Быстрые факты внизу первого экрана */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08]"
            >
              <div className="text-left p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Сборки в наличии</div>
                <div className="text-base sm:text-lg font-black text-white font-brand mt-0.5">от 31 299 ₽</div>
              </div>
              <div className="text-left p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Тестирование</div>
                <div className="text-base sm:text-lg font-black text-cyber-cyan font-brand mt-0.5">24ч в OCCT</div>
              </div>
              <div className="text-left p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Гарантия</div>
                <div className="text-base sm:text-lg font-black text-purple-400 font-brand mt-0.5">3 Месяца</div>
              </div>
              <div className="text-left p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Адрес в Новгороде</div>
                <div className="text-base sm:text-lg font-black text-amber-400 font-brand mt-0.5">Псковская 33</div>
              </div>
            </motion.div>

          </div>

          {/* ПРАВАЯ КОЛОНКА: ИНТЕРАКТИВНЫЙ ПОДИУМ ПК С ПАРЯЩИМИ HUD-ВИДЖЕТАМИ */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Объемный ореол свечения позади корпуса */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-cyan-400/30 blur-3xl rounded-full scale-90 pointer-events-none -z-10 animate-pulse-slow" />

            {/* Контейнер ПК с подиумом */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[480px] rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-transparent p-1 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.25)] border border-white/10 group"
            >
              <div className="relative rounded-[2.3rem] overflow-hidden bg-[#07090F] aspect-[4/5] flex items-center justify-center">
                
                {/* Фото флагмана */}
                <img
                  src={SHOP_INFO.heroImage}
                  alt="STINGER Custom Gaming PC"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Кибер-сетка и градиент затемнения снизу */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-transparent to-transparent opacity-80" />

                {/* Шильдик внизу фото */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#090B11]/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyber-cyan block font-bold">
                        Лабораторный стандарт сборки
                      </span>
                      <span className="text-sm font-bold text-white font-brand">
                        STINGER Custom Lab
                      </span>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      0 ошибок
                    </span>
                  </div>
                </div>

              </div>

              {/* ПАРЯЩИЙ HUD-ВИДЖЕТ 1: СТРЕСС-ТЕСТ (ВВЕРХУ СПРАВА) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-3 sm:-right-6 p-3.5 rounded-2xl bg-[#0A0D15]/95 border border-cyan-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-xl flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Стресс-тест 24ч</div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                    <span className="text-cyan-400">FurMark / OCCT</span>
                    <span className="text-emerald-400">✓ Пройден</span>
                  </div>
                </div>
              </motion.div>

              {/* ПАРЯЩИЙ HUD-ВИДЖЕТ 2: ЧЕСТНЫЙ FPS (СНИЗУ СЛЕВА) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-3 sm:-left-6 p-3.5 rounded-2xl bg-[#0A0D15]/95 border border-purple-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-xl flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Честные кадры</div>
                  <div className="text-xs font-bold text-white flex items-center gap-2 font-mono">
                    <span>CS2: <strong className="text-cyan-400">300+ FPS</strong></span>
                    <span className="text-slate-500">•</span>
                    <span>2K: <strong className="text-purple-400">100+ FPS</strong></span>
                  </div>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>

      {/* БЕГУЩАЯ СТРОКА (MARQUEE TICKER) ВНИЗУ HERO */}
      <div className="mt-14 sm:mt-20 border-y border-white/[0.08] bg-[#07090F]/70 backdrop-blur-xl py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-4 text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple/60" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
