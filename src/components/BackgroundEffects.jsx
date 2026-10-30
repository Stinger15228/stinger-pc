import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

/**
 * BackgroundEffects — Многослойный высококонтрастный кибер-фон
 * (Референс: NVIDIA RTX / ASUS ROG / Linear.app)
 * 
 * 5 СЛОЕВ:
 * 1. Верхний купольный прожектор (Top Studio Spotlight)
 * 2. Яркие плавающие неоновые туманности (Ambient Orbs, opacity 35-45%)
 * 3. Четкая инженерная кибер-сетка 64px + 16px + HUD маркеры и неоновые точки
 * 4. Крупные геометрические 3D-орбиты (750px) + наклонные световые лучи
 * 5. Интерактивный прожектор, плавно следующий за курсором мыши
 */
export default function BackgroundEffects() {
  const { scrollYProgress } = useScroll();

  // Трансформации туманностей при скролле страницы
  const orbLeftY = useTransform(scrollYProgress, [0, 1], [0, 450]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const orbCenterY = useTransform(scrollYProgress, [0, 1], [0, 250]);

  // Слой 5: Плавное слежение за курсором мыши (Framer Motion Spring)
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 400);

  const springConfig = { damping: 28, stiffness: 140, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* ===================================================================
          СЛОЙ 1: ВЕРХНИЙ КУПОЛЬНЫЙ ПРОЖЕКТОР (TOP STUDIO SPOTLIGHT)
          Убирает «черную дыру» вверху экрана, дает благородное сине-фиолетовое свечение
          =================================================================== */}
      <div 
        className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[1200px] h-[550px] rounded-full bg-gradient-to-b from-indigo-600/35 via-purple-600/20 to-transparent blur-[120px] pointer-events-none"
      />

      {/* ===================================================================
          СЛОЙ 2: ПЛАВАЮЩИЕ НЕОНОВЫЕ ТУМАННОСТИ (AMBIENT ORBS С ВЫСОКОЙ ЯРКОСТЬЮ)
          =================================================================== */}
      
      {/* Левое пятно (позади текста Hero и каталога) */}
      <motion.div
        style={{ y: orbLeftY }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
          x: [0, 35, -25, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-24 left-[-100px] w-[650px] h-[650px] rounded-full bg-indigo-600/30 blur-[140px] pointer-events-none"
      />

      {/* Правое пятно (позади фото ПК с бирюзовой водянкой — сочный циан) */}
      <motion.div
        style={{ y: orbRightY }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-48 right-[-80px] w-[600px] h-[600px] rounded-full bg-cyan-500/25 blur-[130px] pointer-events-none"
      />

      {/* Нижнее центральное пятно (позади конфигуратора и бенто) */}
      <motion.div
        style={{ y: orbCenterY }}
        animate={{
          scale: [0.95, 1.1, 0.95],
          x: [0, 25, -25, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/20 blur-[150px] pointer-events-none"
      />

      {/* ===================================================================
          СЛОЙ 3: ЧЕТКАЯ ИНЖЕНЕРНАЯ КИБЕР-СЕТКА + HUD-МАРКЕРЫ
          =================================================================== */}
      
      {/* Основная сетка 64px x 64px (яркость rgba(99,102,241,0.12)) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.12)_1px,transparent_1px)] bg-[size:64px_64px]"
        style={{
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 35%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 35%, #000 50%, transparent 100%)",
        }}
      />

      {/* Дополнительная тонкая микро-сетка 16px x 16px (rgba(255,255,255,0.03)) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"
        style={{
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 35%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 35%, #000 40%, transparent 100%)",
        }}
      />

      {/* Текстура легкого микро-шума для кинематографичной глубины */}
      <div className="absolute inset-0 cyber-noise opacity-30 mix-blend-overlay" />

      {/* Декоративные технические маркеры, плюсики (+) и координаты */}
      <div className="absolute inset-0 overflow-hidden font-mono text-[11px] text-indigo-300/40 select-none">
        
        {/* Плюсики перекрестий */}
        <span className="absolute top-[128px] left-[128px] text-indigo-400/60 font-bold text-sm">+</span>
        <span className="absolute top-[128px] right-[192px] text-cyan-400/60 font-bold text-sm">+</span>
        <span className="absolute top-[384px] left-[64px] text-indigo-400/50">+</span>
        <span className="absolute top-[512px] right-[128px] text-indigo-400/50">+</span>
        <span className="absolute top-[768px] left-[320px] text-cyan-400/50">+</span>
        <span className="absolute top-[1024px] right-[256px] text-indigo-400/50">+</span>
        <span className="absolute top-[1400px] left-[192px] text-indigo-400/50">+</span>
        <span className="absolute top-[1800px] right-[192px] text-cyan-400/50">+</span>
        
        {/* Угловые скобки [ ] */}
        <span className="absolute top-[256px] left-[256px] text-indigo-400/40 font-mono tracking-widest">[ 01 ]</span>
        <span className="absolute top-[448px] right-[320px] text-cyan-400/40 font-mono tracking-widest">[ HUD.SYS ]</span>
        <span className="absolute top-[896px] left-[128px] text-purple-400/40 font-mono tracking-widest">[ RTX.READY ]</span>

        {/* Координаты и метки лаборатории */}
        <span className="absolute top-[192px] left-[50%] -translate-x-1/2 text-indigo-300/30 text-[10px] tracking-wider uppercase">
          SYS.01 // VN-33 // VELIKIY NOVGOROD
        </span>
        <span className="absolute top-[640px] left-[80px] text-cyan-300/30 text-[10px] tracking-widest uppercase">
          OCCT.STABLE // 24H 0-ERRORS
        </span>
        <span className="absolute top-[1200px] right-[100px] text-indigo-300/30 text-[10px] tracking-widest uppercase">
          AIRFLOW // POSITIVE PRESSURE
        </span>

        {/* Мерцающие неоновые точки */}
        <span className="absolute top-[190px] right-[384px] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-pulse" />
        <span className="absolute top-[450px] left-[384px] w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_12px_#818cf8] animate-pulse" />
        <span className="absolute top-[830px] right-[200px] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] animate-pulse" />
        <span className="absolute top-[1350px] left-[240px] w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_12px_#34d399] animate-pulse" />
      </div>

      {/* ===================================================================
          СЛОЙ 4: КРУПНЫЕ ГЕОМЕТРИЧЕСКИЕ 3D-КОЛЬЦА И ДИАГОНАЛЬНЫЕ ЛУЧИ (HUD GEOMETRY)
          =================================================================== */}
      
      {/* Правая орбита (750px x 750px) с вращением по часовой */}
      <div className="absolute -top-10 -right-48 w-[750px] h-[750px] pointer-events-none opacity-80">
        <svg viewBox="0 0 700 700" className="w-full h-full animate-[spin_100s_linear_infinite]">
          <circle cx="350" cy="350" r="320" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1.5" fill="none" strokeDasharray="12 16" />
          <circle cx="350" cy="350" r="260" stroke="rgba(139, 92, 246, 0.18)" strokeWidth="1" fill="none" />
          <circle cx="350" cy="350" r="180" stroke="rgba(6, 182, 212, 0.14)" strokeWidth="1.5" fill="none" strokeDasharray="6 12" />
          <circle cx="350" cy="350" r="110" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1" fill="none" />
          <line x1="30" y1="350" x2="670" y2="350" stroke="rgba(139, 92, 246, 0.12)" strokeWidth="1" />
          <line x1="350" y1="30" x2="350" y2="670" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="1" />
        </svg>
      </div>

      {/* Левая орбита (750px x 750px) с вращением против часовой */}
      <div className="absolute top-[45%] -left-64 w-[750px] h-[750px] pointer-events-none opacity-70">
        <svg viewBox="0 0 700 700" className="w-full h-full animate-[spin_120s_linear_infinite_reverse]">
          <circle cx="350" cy="350" r="330" stroke="rgba(139, 92, 246, 0.18)" strokeWidth="1.5" fill="none" strokeDasharray="10 14" />
          <circle cx="350" cy="350" r="240" stroke="rgba(6, 182, 212, 0.14)" strokeWidth="1" fill="none" />
          <circle cx="350" cy="350" r="150" stroke="rgba(139, 92, 246, 0.16)" strokeWidth="1.5" fill="none" strokeDasharray="4 8" />
          <line x1="350" y1="20" x2="350" y2="680" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="1" />
          <line x1="20" y1="350" x2="680" y2="350" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* 2 Наклонных диагональных луча света */}
      <div className="absolute top-1/4 -left-20 w-[140vw] h-[2px] rotate-[-35deg] bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent pointer-events-none" />
      <div className="absolute top-2/3 -left-20 w-[140vw] h-[2px] rotate-[-35deg] bg-gradient-to-r from-transparent via-cyan-500/12 to-transparent pointer-events-none" />

      {/* ===================================================================
          СЛОЙ 5: ИНТЕРАКТИВНЫЙ ПРОЖЕКТОР ЗА КУРСОРОМ МЫШИ (INTERACTIVE CURSOR GLOW)
          =================================================================== */}
      <motion.div
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(99,102,241,0.14)_0%,rgba(6,182,212,0.06)_40%,transparent_80%)] -z-10"
      />

      {/* Полупрозрачные контурные надписи-водяные знаки для глубины */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 font-gaming font-black text-[120px] sm:text-[180px] tracking-widest text-transparent uppercase whitespace-nowrap select-none opacity-[0.035] [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] pointer-events-none">
        STINGER LAB
      </div>
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 font-gaming font-black text-[100px] sm:text-[160px] tracking-widest text-transparent uppercase whitespace-nowrap select-none opacity-[0.03] [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] pointer-events-none">
        PERFORMANCE
      </div>
    </div>
  );
}
