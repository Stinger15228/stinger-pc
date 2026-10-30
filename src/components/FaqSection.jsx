import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare, Send, ShieldCheck, MapPin } from "lucide-react";
import { FAQ_ITEMS, SHOP_INFO } from "../data/stingerData";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-28 bg-[#040508] text-slate-100 overflow-hidden border-t border-white/[0.08]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-indigo-600/[0.03] blur-[150px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ЛЕВАЯ КОЛОНКА (5 КОЛОНОК): ЗАГОЛОВОК И КАРТОЧКА СВЯЗИ */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>База знаний покупателя</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-gaming tracking-tight text-white leading-tight">
                ЧАСТО ЗАДАВАЕМЫЕ{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                  ВОПРОСЫ
                </span>
              </h2>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Честно отвечаем о наличии, стресс-тестах, гарантии 3 месяца, предоплате на флагманские сборки свыше 100 000 ₽ и доставке по РФ.
              </p>
            </div>

            {/* Карточка прямой связи с мастером */}
            <div className="p-6 rounded-3xl bg-[#080B13]/90 border border-white/10 backdrop-blur-xl space-y-4 shadow-xl">
              <div>
                <div className="font-bold text-white text-base font-gaming">
                  Остался вопрос по сборке или апгрейду?
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Мастер бесплатно проконсультирует в чате Авито или Telegram
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={SHOP_INFO.avitoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-gaming text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Написать в Авито (5.0 ★)</span>
                </a>

                <a
                  href={SHOP_INFO.telegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Чат в Telegram</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {SHOP_INFO.address}
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Гарантия 3 мес.
                </span>
              </div>
            </div>
          </div>

          {/* ПРАВАЯ КОЛОНКА (7 КОЛОНОК): ИНТЕРАКТИВНЫЙ АККОРДЕОН */}
          <div className="lg:col-span-7 space-y-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#080B13]/80 backdrop-blur-xl overflow-hidden transition-all duration-200 hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="font-bold text-white text-sm sm:text-base font-gaming leading-snug">
                      {item.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-indigo-600/30 border-indigo-500/50 text-cyan-400" : "text-slate-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-6 sm:px-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 font-normal">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
