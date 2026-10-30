import React from "react";

/**
 * LaserDivider — Светящийся неоновый разделитель секций
 * Тонкий лазерный луч с центральным бликом и неоновым ромбом
 */
export default function LaserDivider({ className = "" }) {
  return (
    <div className={`relative w-full h-[1px] my-4 flex items-center justify-center overflow-visible pointer-events-none ${className}`}>
      {/* Лазерный луч */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      
      {/* Центральное неоновое свечение */}
      <div className="absolute w-36 sm:w-64 h-3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
      
      {/* Центральный светящийся ромб */}
      <div className="absolute w-2 h-2 rotate-45 bg-indigo-400 shadow-[0_0_12px_#818cf8] border border-cyan-300/80" />
    </div>
  );
}
