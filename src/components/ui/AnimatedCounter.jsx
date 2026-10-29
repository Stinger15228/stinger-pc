import React, { useEffect, useState } from 'react';

/**
 * AnimatedCounter — Плавная анимация прокрутки чисел
 * для счетчиков FPS, цен и частот процессоров
 */
export default function AnimatedCounter({
  value,
  duration = 0.8,
  suffix = '',
  prefix = '',
  className = '',
  formatThousands = true,
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = displayValue;
    const targetValue = typeof value === 'number' ? value : parseInt(value, 10) || 0;

    if (startValue === targetValue) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Плавное замедление к концу (Ease Out Cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  const formattedNumber = formatThousands
    ? displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : displayValue;

  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
