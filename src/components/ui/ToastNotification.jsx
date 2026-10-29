import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Sparkles, X } from 'lucide-react';

/**
 * ToastNotification — Геймерское HUD-уведомление
 * со взрывом неонового конфетти при копировании сборки/заявки
 */
export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast && toast.triggerConfetti) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.85, x: 0.5 },
        colors: ['#00F0FF', '#8B5CF6', '#F59E0B', '#10B981'],
        disableForReducedMotion: true,
      });
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="relative rounded-2xl bg-[#090B11]/95 border border-cyber-purple/50 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-xl flex items-start gap-3.5">
        
        {/* Неоновый индикатор */}
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-purple-glow">
          {toast.icon === 'copy' ? <Copy className="w-5 h-5 text-cyber-cyan" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        </div>

        {/* Текст уведомления */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="text-xs uppercase font-bold tracking-wider text-cyber-cyan flex items-center gap-1.5 font-brand">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{toast.title || "STINGER PC"}</span>
          </div>
          <p className="text-sm font-semibold text-white mt-0.5 leading-snug break-words">
            {toast.message}
          </p>
          {toast.sub && (
            <p className="text-xs text-slate-400 mt-1">
              {toast.sub}
            </p>
          )}
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Прогресс-бар таймаута */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden rounded-b-2xl">
          <div className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-amber animate-[shrink_4s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
}
