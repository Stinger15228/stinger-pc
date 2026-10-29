import React, { useRef, useState } from 'react';

/**
 * SpotlightCard — Многослойная геймерская карточка
 * с мягким слежением неонового света за курсором мыши,
 * внутренним стеклянным бликом и внешней ARGB-подсветкой
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 240, 255, 0.15)',
  borderColor = 'rgba(139, 92, 246, 0.45)',
  glowColor,
  onClick,
  ...props
}) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
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
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative rounded-3xl bg-[#090B11]/90 border border-white/[0.08] p-6 transition-all duration-300 hover:border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden group ${className}`}
      {...props}
    >
      {/* Внешний объемный ореол ARGB позади карточки (при наличии glowColor) */}
      {glowColor && (
        <div
          className="absolute -inset-1 rounded-3xl opacity-20 group-hover:opacity-60 blur-xl transition-opacity duration-500 pointer-events-none -z-10"
          style={{ background: glowColor }}
        />
      )}

      {/* Неоновый спотлайт, следующий за курсором */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Подсветка контуров по координатам мыши */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          border: `1px solid ${borderColor}`,
          maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black 30%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black 30%, transparent 70%)`,
        }}
      />

      {/* Контент карточки */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
