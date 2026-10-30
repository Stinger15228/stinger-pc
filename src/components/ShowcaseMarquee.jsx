import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Thermometer,
  MapPin,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  Sliders,
  Send,
  Zap,
  ZoomIn,
} from "lucide-react";
import { SHOP_INFO } from "../data/stingerData";

export const SHOWCASE_BUILDS = [
  {
    id: "sc-1",
    title: "STINGER White Aquarium",
    subtitle: "RTX 4070 Super 12GB • Ryzen 7 7800X3D",
    image: "./image/pc6.jpg",
    temp: "59°C",
    city: "📍 Великий Новгород",
    badge: "Панорамное стекло 270°",
    specs: "AMD Ryzen 7 7800X3D / RTX 4070 Super 12GB / 32GB DDR5 6000MHz / 1TB NVMe Gen4",
    stressTest: "FurMark 24ч: 59°C | VRM: 52°C | 0 ошибок в OCCT",
  },
  {
    id: "sc-2",
    title: "STINGER Cyber Neo",
    subtitle: "RTX 4060 8GB • Ryzen 5 5600",
    image: "./sborki/pc1/IMG_20260922_134447.jpg",
    temp: "61°C",
    city: "📍 Великий Новгород",
    badge: "Кастомный кабель-менеджмент",
    specs: "AMD Ryzen 5 5600 / RTX 4060 8GB GDDR6 / 32GB 3200MHz Dual / 1TB SSD",
    stressTest: "FurMark 24ч: 61°C | Шум: 32 dB (бесшумный)",
  },
  {
    id: "sc-3",
    title: "STINGER Stealth Dark",
    subtitle: "RTX 3060 12GB • i5-12400F",
    image: "./sborki/pc2/IMG_20260929_132954.jpg",
    temp: "63°C",
    city: "📦 Валдай (СДЭК)",
    badge: "Строгий без подсветки",
    specs: "Intel Core i5-12400F / RTX 3060 12GB GDDR6 / 32GB DDR4 / 512GB M.2",
    stressTest: "FurMark 24ч: 63°C | Надежная отправка в жесткой упаковке",
  },
  {
    id: "sc-4",
    title: "STINGER Entry Gaming",
    subtitle: "RTX 3050 8GB • i3-10100F",
    image: "./sborki/pc5/photo_2026-10-24_18-49-51.jpg",
    temp: "58°C",
    city: "📍 Великий Новгород",
    badge: "Хит до 35 000 ₽",
    specs: "Intel Core i3-10100F / MSI RTX 3050 8GB / 16GB Dual / 512GB NVMe",
    stressTest: "FurMark 24ч: 58°C | CS2: 220+ FPS",
  },
  {
    id: "sc-5",
    title: "STINGER Liquid Beast",
    subtitle: "RTX 4080 Super • i7-14700KF",
    image: "./image/pc9.jpg",
    temp: "56°C",
    city: "📦 Авито Доставка -> СПб",
    badge: "Кастом СЖО 360мм",
    specs: "Intel Core i7-14700KF / RTX 4080 Super 16GB / 64GB DDR5 / 2TB Gen4",
    stressTest: "FurMark + Cinebench: 56°C | Максимальный 4K гейминг",
  },
  {
    id: "sc-6",
    title: "STINGER Balance Cyber",
    subtitle: "RX 5700 XT 8GB • Ryzen 5 5500",
    image: "./sborki/pc3/IMG_20260907_122454.jpg",
    temp: "64°C",
    city: "📍 Великий Новгород",
    badge: "1080p Ultra гейминг",
    specs: "AMD Ryzen 5 5500 / Sapphire RX 5700 XT 8GB / 16GB Dual / 512GB SSD",
    stressTest: "FurMark 24ч: 64°C | Танки/GTA V на ультрах",
  },
  {
    id: "sc-7",
    title: "STINGER Flagship 4090",
    subtitle: "RTX 4090 24GB • Ryzen 7 7800X3D",
    image: "./image/pc10.jpg",
    temp: "62°C",
    city: "📍 Великий Новгород",
    badge: "Экстремальная мощь",
    specs: "AMD Ryzen 7 7800X3D / RTX 4090 24GB ROG / 64GB DDR5 / 2TB Gen4",
    stressTest: "Cyberpunk Overdrive 4K: 120+ FPS | Температуры 62°C",
  },
  {
    id: "sc-8",
    title: "STINGER eSports Pure",
    subtitle: "GTX 1660 Super • i5-10400F",
    image: "./sborki/pc4/IMG_20260806_142923.jpg",
    temp: "60°C",
    city: "📦 Доставка в Боровичи",
    badge: "Народный чемпион",
    specs: "Intel Core i5-10400F / GTX 1660 Super 6GB / 16GB RAM / 512GB SSD",
    stressTest: "FurMark 24ч: 60°C | Готов к киберспорту",
  },
];

export default function ShowcaseMarquee({ onOpenConfigurator, onShowToast }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Дублируем массив для бесшовного зацикливания 100% без рывка
  const marqueeCards = [...SHOWCASE_BUILDS, ...SHOWCASE_BUILDS];

  const handleOrderSameBuild = (build) => {
    setSelectedPhoto(null);
    const text = `Здравствуйте! Увидел на сайте в фото-ленте сборку: «${build.title}» (${build.subtitle}). Подскажите, есть ли такая в наличии или сколько стоит собрать точно такую же под ключ?`;
    navigator.clipboard.writeText(text);

    if (onShowToast) {
      onShowToast({
        title: "Параметры скопированы!",
        message: `«${build.title}» скопирована. Открываем Авито — просто нажмите 'Вставить' в диалоге.`,
        icon: "copy",
        triggerConfetti: true,
      });
    }

    setTimeout(() => {
      window.open(SHOP_INFO.avitoUrl, "_blank");
    }, 400);
  };

  return (
    <section className="relative py-20 sm:py-24 bg-transparent overflow-hidden">
      
      {/* Верхнее свечение фона */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-indigo-600/[0.08] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          {/* Статус-бейдж */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>📸 Живые фото из мастерской на Псковской, 33</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-gaming text-white tracking-tight">
            СОБРАНО РУКАМИ{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              ПЕРФЕКЦИОНИСТОВ
            </span>
          </h2>
        </div>

        <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-md">
          Никаких рендеров — реальные системные блоки наших клиентов. Идеальный кабель-менеджмент, стресс-тесты 24ч и личная гарантия.
        </p>
      </div>

      {/* =====================================================================
          БЕСКОНЕЧНЫЙ ПАРОВОЗИК ФОТОГРАФИЙ (INFINITE MARQUEE)
          Маска растворения по краям + hover пауза
          ===================================================================== */}
      <div 
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-4 select-none"
      >
        <div className="flex gap-5 w-max animate-marquee-left pause-on-hover">
          {marqueeCards.map((build, idx) => (
            <div
              key={`${build.id}-${idx}`}
              onClick={() => setSelectedPhoto(build)}
              className="w-[310px] sm:w-[380px] h-[250px] sm:h-[270px] rounded-2xl overflow-hidden relative group shrink-0 cursor-pointer border border-white/10 hover:border-cyan-400/50 bg-[#080B13]/90 shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] glare-sweep"
            >
              {/* Фотография сборки */}
              <img
                src={build.image}
                alt={build.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Затемняющий градиент глубины */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Верхние плашки: Температура и Локация */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                  <Thermometer className="w-3 h-3 text-cyan-400" />
                  <span>{build.temp} FurMark</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-black/70 backdrop-blur-md text-slate-300 border border-white/10">
                  <span>{build.city}</span>
                </span>
              </div>

              {/* Нижняя стеклянная плашка */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#080B14]/85 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold font-gaming text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                    {build.title}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 shrink-0">
                    {build.badge}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-slate-400 truncate mt-1">
                  {build.subtitle}
                </div>

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Стресс-тест OK
                  </span>
                  <span className="text-indigo-400 group-hover:text-white flex items-center gap-1 transition-colors font-medium">
                    <ZoomIn className="w-3 h-3" /> Подробнее
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================
          LIGHTBOX MODAL (ПРОСМОТР ФОТОГРАФИИ СБОРКИ С КНОПКОЙ ЗАКАЗА)
          ===================================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            
            {/* Оверлей фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-[#040508]/90 backdrop-blur-2xl"
            />

            {/* Карточка лайтбокса */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-3xl bg-[#080B13]/95 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Шапка модалки */}
              <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between bg-[#06080F]/90">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span className="font-gaming font-bold text-sm text-white">{selectedPhoto.title}</span>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Тело модалки */}
              <div className="p-5 overflow-y-auto space-y-4">
                
                {/* Большое фото */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/10 group">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedPhoto.temp} под нагрузкой FurMark</span>
                  </div>
                </div>

                {/* Характеристики сборки */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Конфигурация:</div>
                  <div className="text-sm font-semibold text-white">{selectedPhoto.specs}</div>
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 pt-1 border-t border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedPhoto.stressTest}</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleOrderSameBuild(selectedPhoto)}
                    className="flex-1 py-3.5 px-5 rounded-xl font-gaming font-extrabold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Хочу такую же сборку (Написать в Авито)</span>
                  </button>

                  {onOpenConfigurator && (
                    <button
                      onClick={() => {
                        setSelectedPhoto(null);
                        onOpenConfigurator();
                      }}
                      className="py-3.5 px-4 rounded-xl font-semibold text-xs bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Открыть в конфигураторе</span>
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
