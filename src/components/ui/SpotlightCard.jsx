import React, { useRef, useState } from 'react';

/**
 * SpotlightCard — Премиальная Dark Luxury карточка в стиле Linear.app / Awwwards:
 * - Внутренний зеркальный верхний блик (Linear specular highlight)
 * - Мягкое слежение неонового ореола за курсором мыши (Cyber Indigo & Cyan)
 * - Контурное свечение краев карточки
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.12)',
  borderColor = 'rgba(99, 102, 241, 0.35)',
  glowColor,
  onClick,
  ...props
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl bg-[#090C15]/75 border border-white/[0.08] p-6 transition-all duration-300 hover:border-white/[0.18] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] backdrop-blur-xl overflow-hidden group ${className}`}
      {...props}
    >
      {/* Мягкий внешний ореол ARGB позади карточки (при наличии glowColor) */}
      {glowColor && (
        <div
          className="absolute -inset-1 rounded-3xl opacity-15 group-hover:opacity-40 blur-2xl transition-opacity duration-500 pointer-events-none -z-10"
          style={{ background: glowColor }}
        />
      )}

      {/* Мягкое радиальное свечение за курсором */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />

      {/* Контурная подсветка ребер */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          border: `1px solid ${borderColor}`,
          maskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black 30%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black 30%, transparent 70%)`,
        }}
      />

      {/* Контент */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
