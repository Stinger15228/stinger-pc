import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { CLIENT_REVIEWS, SHOP_INFO } from "../data/stingerData";
import SpotlightCard from "./ui/SpotlightCard";

export default function ReviewsSection() {
  const [filterCity, setFilterCity] = useState("all");

  const filteredReviews = filterCity === "all"
    ? CLIENT_REVIEWS
    : filterCity === "local"
    ? CLIENT_REVIEWS.filter((r) => r.city.includes("Новгород"))
    : CLIENT_REVIEWS.filter((r) => !r.city.includes("Новгород"));

  return (
    <section id="reviews" className="relative py-24 sm:py-28 bg-[#040508] text-slate-100 overflow-hidden border-t border-white/[0.08]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[160px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Честная репутация на Авито</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-gaming tracking-tight text-white mb-4">
            РЕЙТИНГ 5.0 НА ОСНОВЕ{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              {SHOP_INFO.reviewsCount} ОТЗЫВОВ
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Реальные отзывы наших покупателей из Великого Новгорода и других городов России,
            заказавших компьютеры через Авито Доставку и СДЭК.
          </p>

          {/* Avito Verified Banner */}
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
              <span>Читать все отзывы в профиле Авито</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* City filter tabs */}
          <div className="flex justify-center gap-2 mt-8">
            {[
              { id: "all", label: `Все отзывы (${CLIENT_REVIEWS.length})` },
              { id: "local", label: "Великий Новгород (Самовывоз)" },
              { id: "delivery", label: "Доставка по РФ" },
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

        {/* Reviews Grid (Symmetrical 3x2 Matrix on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredReviews.map((review) => (
            <SpotlightCard
              key={review.id}
              className="p-6 rounded-2xl bg-[#080B13]/85 border border-white/10 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div>
                    <div className="font-bold text-white text-base flex items-center gap-2">
                      {review.author}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {review.city} • {review.date}
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Build badge */}
                <div className="mb-3.5">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-indigo-300 border border-indigo-500/20 inline-block font-medium">
                    {review.build}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed relative font-normal">
                  <Quote className="w-6 h-6 text-white/5 absolute -top-2 -left-2 -z-10" />
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3 h-3" /> Сделка подтверждена
                </span>
                <span>Авито</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
