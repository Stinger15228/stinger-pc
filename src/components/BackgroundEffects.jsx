import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * BackgroundEffects — Многослойная интерактивная атмосфера уровня Awwwards / Linear:
 * - 3 плавающих световых туманности (Ambient Orbs), меняющих цвет и позицию от скролла
 * - Перспективная кибер-сетка с радиальной маской затухания
 * - Декоративные вращающиеся технологические SVG-кольца и прицелы (+)
 * - Полупрозрачные контурные водяные знаки (STINGER LAB, PERFORMANCE)
 */
export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  // Плавные трансформации световых туманностей от прогресса скролла
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const orb1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.25, 0.35, 0.2, 0.15]);
  const orb2Opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.15, 0.28, 0.35, 0.2]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* 1. БАЗОВАЯ КИБЕР-СЕТКА С РАДИАЛЬНОЙ МАСКОЙ ЗАТУХАНИЯ */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-80" 
      />

      {/* 2. ТЕКСТУРА МИКРО-ШУМА */}
      <div className="absolute inset-0 cyber-noise opacity-40 mix-blend-overlay" />

      {/* 3. СВЕТОВАЯ ТУМАННОСТЬ 1: ВЕРХНИЙ ЭКРАН (INDIGO / VIOLET) */}
      <motion.div
        style={{ y: orb1Y, opacity: orb1Opacity }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          x: [0, 40, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-indigo-600/35 via-purple-600/25 to-cyan-500/15 blur-[160px]"
      />

      {/* 4. СВЕТОВАЯ ТУМАННОСТЬ 2: КАТАЛОГ И КОНФИГУРАТОР (ELECTRIC CYAN & PURPLE) */}
      <motion.div
        style={{ y: orb2Y, opacity: orb2Opacity }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-cyan-500/20 via-indigo-600/20 to-purple-800/15 blur-[170px]"
      />

      {/* 5. СВЕТОВАЯ ТУМАННОСТЬ 3: КАЧЕСТВО И ОТЗЫВЫ (DEEP INDIGO & EMERALD) */}
      <motion.div
        style={{ y: orb3Y }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-purple-900/20 via-indigo-700/15 to-emerald-600/10 blur-[180px] opacity-25"
      />

      {/* 6. ДЕКОРАТИВНЫЕ ТЕХНОЛОГИЧЕСКИЕ SVG-КОЛЬЦА И ПРИЦЕЛЫ */}
      <div className="absolute top-36 right-1/4 w-[460px] h-[460px] opacity-[0.035]">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="1" fill="none" strokeDasharray="6 8" />
          <circle cx="200" cy="200" r="130" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="1" fill="none" strokeDasharray="3 6" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="white" strokeWidth="0.75" />
          <line x1="200" y1="20" x2="200" y2="380" stroke="white" strokeWidth="0.75" />
        </svg>
      </div>

      <div className="absolute top-[65%] left-10 w-[380px] h-[380px] opacity-[0.025]">
        <svg viewBox="0 0 300 300" className="w-full h-full animate-[spin_90s_linear_infinite_reverse]">
          <circle cx="150" cy="150" r="140" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 10" />
          <circle cx="150" cy="150" r="95" stroke="white" strokeWidth="1" fill="none" />
          <line x1="150" y1="10" x2="150" y2="290" stroke="white" strokeWidth="0.5" />
          <line x1="10" y1="150" x2="290" y2="150" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* 7. ТОНКИЕ КРЕСТИКИ ПРИЦЕЛОВ НА ПЕРЕСЕЧЕНИЯХ */}
      <div className="absolute top-72 left-20 text-white/[0.07] font-mono text-xs select-none">+</div>
      <div className="absolute top-96 right-32 text-white/[0.07] font-mono text-xs select-none">+</div>
      <div className="absolute top-[45%] left-1/2 text-white/[0.05] font-mono text-xs select-none">+</div>
      <div className="absolute top-[75%] right-24 text-white/[0.06] font-mono text-xs select-none">+</div>

      {/* 8. ОГРОМНЫЕ КОНТУРНЫЕ ВОДЯНЫЕ ЗНАКИ (WATERMARKS) */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 font-gaming font-black text-[120px] sm:text-[180px] tracking-widest text-transparent uppercase whitespace-nowrap select-none opacity-[0.02] [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] pointer-events-none">
        STINGER LAB
      </div>
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 font-gaming font-black text-[100px] sm:text-[160px] tracking-widest text-transparent uppercase whitespace-nowrap select-none opacity-[0.018] [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] pointer-events-none">
        PERFORMANCE
      </div>
      <div className="absolute top-[82%] left-1/2 -translate-x-1/2 font-gaming font-black text-[110px] sm:text-[170px] tracking-widest text-transparent uppercase whitespace-nowrap select-none opacity-[0.018] [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] pointer-events-none">
        CUSTOM PC
      </div>
    </div>
  );
}
