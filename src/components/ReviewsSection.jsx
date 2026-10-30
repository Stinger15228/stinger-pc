import React, { useState } from "react";
import {
  Star,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { CLIENT_REVIEWS } from "../data/reviewsData";
import { SHOP_INFO } from "../data/stingerData";
import SpotlightCard from "./ui/SpotlightCard";

// Иконка Авито с фирменными 4 кругами
function AvitoIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="7" r="3.2" fill="#00AAFF" />
      <circle cx="17" cy="7" r="3.2" fill="#00CC76" />
      <circle cx="7" cy="17" r="3.2" fill="#FF4053" />
      <circle cx="17" cy="17" r="3.2" fill="#9B51E0" />
    </svg>
  );
}

// Иконка ВКонтакте
function VkIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.072-3.238.996-3.704 2.308-2.395 1.002 1.002 1.83 2.35 3.328 2.35.459 0 .894-.093 1.25-.298.538-.309.846-.867.755-1.467-.202-1.325-1.579-2.73-2.67-3.837-.872-.884-.783-1.282 0-2.33 1.847-2.474 2.853-4.485 2.502-5.467-.184-.515-.716-.73-1.385-.73h-2.616c-.638 0-1.026.273-1.285.875-1.018 2.368-2.52 4.606-3.642 4.606-.414 0-.61-.19-.61-.75V7.472c0-.773-.223-1.144-.863-1.144h-3.68c-.461 0-.742.247-.742.483 0 .463.684.57.753 1.874v3.197c0 .701-.127.828-.406.828-.744 0-2.553-2.72-3.627-5.834-.207-.604-.593-.876-1.233-.876H2.176c-.663 0-.796.312-.796.657 0 .614.786 3.659 3.656 7.683 1.91 2.68 4.596 4.12 7.034 4.12z" />
    </svg>
  );
}

// Иконка Telegram
function TelegramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
    </svg>
  );
}

export default function ReviewsSection() {
  const [filterCity, setFilterCity] = useState("all");

  const filteredReviews = filterCity === "all"
    ? CLIENT_REVIEWS
    : filterCity === "local"
    ? CLIENT_REVIEWS.filter((r) => r.city.includes("Новгород"))
    : CLIENT_REVIEWS.filter((r) => !r.city.includes("Новгород"));

  // Разделяем отзывы на 2 ряда для двухрядного бесконечного паровозика
  const midIndex = Math.ceil(filteredReviews.length / 2);
  const row1Base = filteredReviews.slice(0, midIndex);
  const row2Base = filteredReviews.slice(midIndex);

  // Дублируем массивы для бесшовной прокрутки 100% без задержек
  const row1 = [...row1Base, ...row1Base, ...row1Base];
  const row2 = [...row2Base, ...row2Base, ...row2Base];

  // Вспомогательная функция для рендера бейджа платформы в правом верхнем углу
  const renderPlatformBadge = (review) => {
    const platform = review.platform?.toLowerCase();
    const badgeLabel = review.badgeText || (
      platform === "avito" ? "Отзыв с Авито" :
      platform === "vk" ? "Отзыв ВКонтакте" :
      platform === "telegram" ? "Отзыв в Telegram" :
      "Отзыв покупателя"
    );

    if (platform === "avito") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#00AAFF]/10 text-cyan-300 border border-[#00AAFF]/30 shadow-[0_0_12px_rgba(0,170,255,0.15)]">
          <AvitoIcon className="w-3 h-3" />
          <span>{badgeLabel}</span>
        </span>
      );
    }

    if (platform === "vk") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#2787F5]/10 text-blue-300 border border-[#2787F5]/30 shadow-[0_0_12px_rgba(39,135,245,0.15)]">
          <VkIcon className="w-3 h-3 text-[#2787F5]" />
          <span>{badgeLabel}</span>
        </span>
      );
    }

    if (platform === "telegram") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#229ED9]/10 text-sky-300 border border-[#229ED9]/30 shadow-[0_0_12px_rgba(34,158,217,0.15)]">
          <TelegramIcon className="w-3 h-3 text-[#229ED9]" />
          <span>{badgeLabel}</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/5 text-slate-300 border border-white/10">
        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
        <span>{badgeLabel}</span>
      </span>
    );
  };

  // Компонент карточки отзыва
  const ReviewCard = ({ review, idx }) => (
    <div
      key={`${review.id}-${idx}`}
      className="w-[330px] sm:w-[410px] shrink-0 p-5 sm:p-6 rounded-2xl bg-[#080B13]/90 border border-white/10 hover:border-amber-500/30 flex flex-col justify-between transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group/card select-none"
    >
      <div>
        {/* Верхняя строка: Автор + Бейдж площадки в правом углу */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="font-bold text-white text-base flex items-center gap-2">
              {review.author}
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {review.city} • {review.date}
            </div>
          </div>

          <div className="shrink-0">
            {renderPlatformBadge(review)}
          </div>
        </div>

        {/* 5 звезд + Название купленного ПК */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex text-amber-400">
            {[...Array(review.rating || 5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>

          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.04] text-indigo-300 border border-indigo-500/20 inline-block font-medium truncate max-w-[210px]">
            {review.build}
          </span>
        </div>

        {/* Текст отзыва */}
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed relative font-normal line-clamp-4">
          <Quote className="w-5 h-5 text-white/5 absolute -top-2 -left-2 -z-10" />
          "{review.text}"
        </p>
      </div>

      {/* Нижняя панель: Статус сделки + Кнопка «Проверить отзыв» */}
      <div className="mt-4 pt-3.5 border-t border-white/5 flex items-center justify-between gap-3">
        <span className="text-emerald-400 flex items-center gap-1.5 font-semibold text-[11px] font-mono">
          <CheckCircle className="w-3 h-3 shrink-0" />
          <span>Сделка подтверждена</span>
        </span>

        <a
          href={review.sourceUrl || SHOP_INFO.avitoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.05] hover:bg-indigo-600/20 text-cyan-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-all shadow-[0_0_12px_rgba(6,182,212,0.08)] group/btn shrink-0"
          title="Открыть оригинальный отзыв на платформе"
        >
          <span>Проверить отзыв</span>
          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="relative py-24 sm:py-28 bg-transparent text-slate-100 overflow-hidden">
      {/* Фоновый янтарный эмбиент */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.06] blur-[160px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Заголовок секции */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Честная репутация и отзывы</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-gaming tracking-tight text-white mb-4">
            РЕЙТИНГ 5.0 НА ОСНОВЕ{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              {SHOP_INFO.reviewsCount} ОТЗЫВОВ
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Реальные отзывы наших покупателей из Великого Новгорода и других городов России,
            заказавших компьютеры лично в мастерской или с доставкой через Авито и СДЭК.
          </p>

          {/* Плашка проверки профиля */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-[#080B13]/90 border border-white/10 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-lg font-bold font-gaming text-white">5.0</span>
            </div>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Проверенный профиль мастера</span>
            </div>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <a
              href={SHOP_INFO.avitoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Смотреть все отзывы на Авито</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Вкладки фильтрации */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: "all", label: `Все отзывы (${CLIENT_REVIEWS.length})` },
              { id: "local", label: "Великий Новгород (Самовывоз)" },
              { id: "delivery", label: "Доставка по РФ (СДЭК/Авито)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCity(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  filterCity === tab.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "bg-black/40 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* =====================================================================
          ДВУХРЯДНЫЙ БЕСКОНЕЧНЫЙ ПАРОВОЗИК ОТЗЫВОВ (2-ROW INFINITE MARQUEE)
          Верхний ряд: едет ВЛЕВО (~42s)
          Нижний ряд: едет ВПРАВО (~48s)
          При наведении курсора: плавная пауза (pause-on-hover)
          Маска растворения по краям экрана
          ===================================================================== */}
      <div 
        className="relative w-full space-y-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-2 select-none"
      >
        {/* РЯД 1: Движется ВЛЕВО */}
        <div className="flex gap-6 w-max animate-marquee-left pause-on-hover">
          {row1.map((review, idx) => (
            <ReviewCard key={`r1-${review.id}-${idx}`} review={review} idx={idx} />
          ))}
        </div>

        {/* РЯД 2: Движется ВПРАВО */}
        <div className="flex gap-6 w-max animate-marquee-right pause-on-hover">
          {row2.map((review, idx) => (
            <ReviewCard key={`r2-${review.id}-${idx}`} review={review} idx={idx} />
          ))}
        </div>
      </div>

    </section>
  );
}
