import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Layers, 
  ExternalLink, 
  Sliders, 
  Copy, 
  CheckCircle2, 
  Flame, 
  Star, 
  ShieldCheck, 
  Eye, 
  ChevronRight,
  Info
} from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import AnimatedCounter from './ui/AnimatedCounter';
import { 
  READY_BUILDS, 
  BENCHMARK_GAMES, 
  BENCHMARK_RESOLUTIONS, 
  HONEST_FPS_SCORES, 
  getFpsComfortBadge,
  SHOP_INFO
} from '../data/stingerData';

export default function CatalogSection({ onSelectBuildForConfigurator, onShowToast }) {
  const [selectedGame, setSelectedGame] = useState("cyberpunk");
  const [selectedRes, setSelectedRes] = useState("1080p");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeImageIndex, setActiveImageIndex] = useState({});

  // Фильтрация сборок
  const filteredBuilds = READY_BUILDS.filter(build => {
    if (activeCategory === "under100") return !build.isPrepayment;
    if (activeCategory === "prepayment") return build.isPrepayment;
    if (activeCategory === "start") return build.price <= 45000;
    return true;
  });

  const currentGameData = BENCHMARK_GAMES.find(g => g.id === selectedGame) || BENCHMARK_GAMES[0];

  const handleCopyAndGoToAvito = (build) => {
    const message = `Здравствуйте! Меня заинтересовал компьютер «${build.name}» (${build.subtitle}) за ${build.price.toLocaleString('ru-RU')} ₽ на ул. Псковской, 33.
Подскажите, актуальна ли сборка и когда можно подъехать на проверку / оформить заказ?`;

    navigator.clipboard.writeText(message).then(() => {
      onShowToast({
        title: "Сборка скопирована!",
        message: `Заявка на «${build.name}» скопирована в буфер обмена. Переходим в Авито...`,
        icon: "copy",
        triggerConfetti: true,
      });
      setTimeout(() => {
        window.open(SHOP_INFO.avitoUrl, "_blank");
      }, 700);
    }).catch(() => {
      window.open(SHOP_INFO.avitoUrl, "_blank");
    });
  };

  const handleSelectThumbnail = (buildId, img) => {
    setActiveImageIndex(prev => ({ ...prev, [buildId]: img }));
  };

  return (
    <section id="catalog" className="py-20 sm:py-28 relative bg-[#07090F] border-t border-white/[0.08]">
      
      {/* Декоративные световые пятна фона */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ЗАГОЛОВОК КАТАЛОГА */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-cyber-purple text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Витрина готовых ПК в наличии и под заказ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-brand tracking-tight">
              КАТАЛОГ СБОРОК <span className="text-gradient-purple">STINGER</span>
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-400 max-w-md">
            Основная линейка — ПК до 100 000 ₽ <strong className="text-emerald-400">в наличии на ул. Псковская, 33</strong>.
            Флагманы от 100 000 ₽ выполняются под заказ строго с плашкой <strong className="text-amber-400">«⚡ По предоплате»</strong>.
          </div>
        </div>

        {/* ========================================================
            ЖИВОЙ ЦЕНТР СИМУЛЯЦИИ FPS И ТАБЫ ФИЛЬТРОВ
        ======================================================== */}
        <div className="p-6 sm:p-8 rounded-[2rem] bg-[#090B11]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.15)] space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-cyber-cyan tracking-wider flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4" />
                <span>Интерактивный симулятор производительности</span>
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-brand mt-0.5">
                Выберите игру и разрешение экрана
              </h3>
            </div>

            {/* ПЕРЕКЛЮЧАТЕЛЬ РАЗРЕШЕНИЯ ЭКРАНА */}
            <div className="flex items-center p-1.5 rounded-2xl bg-black/60 border border-white/10 self-start md:self-auto">
              {BENCHMARK_RESOLUTIONS.map(res => (
                <button
                  key={res.id}
                  onClick={() => setSelectedRes(res.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedRes === res.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {res.label.split(' ')[0]} {res.label.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* 8 ТАБОВ ИГР */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {BENCHMARK_GAMES.map(game => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  selectedGame === game.id
                    ? 'bg-white text-slate-950 border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span>{game.name}</span>
                {selectedGame === game.id && (
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* КАТЕГОРИИ КАТАЛОГА */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
            <span className="text-xs font-mono text-slate-500 mr-2 uppercase tracking-wider">Категория:</span>
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "all" ? 'bg-purple-600/25 text-purple-300 border border-purple-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              Все компьютеры ({READY_BUILDS.length})
            </button>
            <button
              onClick={() => setActiveCategory("under100")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "under100" ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              🟢 В наличии до 100 000 ₽ (8)
            </button>
            <button
              onClick={() => setActiveCategory("prepayment")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "prepayment" ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ По предоплате от 100к (2)
            </button>
            <button
              onClick={() => setActiveCategory("start")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "start" ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 До 45 000 ₽
            </button>
          </div>

        </div>

        {/* ========================================================
            СЕТКА 10 КАРТОЧЕК ГОТОВЫХ ПК
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredBuilds.map((build, idx) => {
              const currentFpsMap = HONEST_FPS_SCORES[build.id] && HONEST_FPS_SCORES[build.id][selectedRes];
              const fpsValue = currentFpsMap ? currentFpsMap[selectedGame] : 60;
              const comfort = getFpsComfortBadge(fpsValue);
              const maxGameFps = currentGameData.maxFps || 200;
              const barPercentage = Math.min(100, Math.round((fpsValue / maxGameFps) * 100));

              const currentImg = activeImageIndex[build.id] || build.primaryImage;

              return (
                <motion.div
                  key={build.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <SpotlightCard
                    glowColor={build.glowColor}
                    className="h-full flex flex-col justify-between p-5 sm:p-6"
                  >
                    <div>
                      
                      {/* ШАПКА КАРТОЧКИ: СТАТУС НАЛИЧИЯ И БЕЙДЖ */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
                          build.isPrepayment 
                            ? 'bg-amber-950/50 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${build.isPrepayment ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                          <span>{build.isPrepayment ? 'Под заказ (Предоплата)' : 'В наличии • Псковская 33'}</span>
                        </span>

                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                          {build.badge}
                        </span>
                      </div>

                      {/* ВИЗУАЛЬНЫЙ БЛОК: ФОТО С ГАЛЕРЕЕЙ */}
                      <div className="relative rounded-2xl overflow-hidden bg-black/60 aspect-[4/3] border border-white/[0.08] mb-4 group/img">
                        <img
                          src={currentImg}
                          alt={build.name}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />

                        {/* Разрешение бейдж */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white">
                          {build.targetRes}
                        </div>

                        {/* Мини-превью галереи (если больше 1 фото) */}
                        {build.gallery && build.gallery.length > 1 && (
                          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 opacity-90 overflow-x-auto">
                            {build.gallery.map((thumb, tIdx) => (
                              <button
                                key={tIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectThumbnail(build.id, thumb);
                                }}
                                className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border transition-all ${
                                  currentImg === thumb ? 'border-cyber-cyan scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={thumb} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* НАЗВАНИЕ И ЦЕНА */}
                      <div className="space-y-1 mb-4">
                        <h4 className="font-brand text-xl sm:text-2xl font-black text-white tracking-tight">
                          {build.name}
                        </h4>
                        <div className="text-xs text-purple-300 font-semibold break-words">
                          {build.subtitle}
                        </div>
                        <div className="pt-2 flex items-baseline gap-2">
                          <span className="font-brand text-2xl sm:text-3xl font-black text-white">
                            {build.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {build.isPrepayment && (
                            <span className="text-[10px] font-mono font-bold text-amber-400">
                              (по предоплате)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ========================================================
                          ЖИВОЙ HUD-ИНДИКАТОР FPS ДЛЯ ВЫБРАННОЙ ИГРЫ
                      ======================================================== */}
                      <div className="p-3.5 rounded-2xl bg-black/80 border border-white/[0.08] space-y-2 mb-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono text-[11px] truncate max-w-[160px]">
                            {currentGameData.name} ({selectedRes}):
                          </span>
                          <span className="font-mono font-bold text-base text-white flex items-center gap-1">
                            <AnimatedCounter value={fpsValue} className="text-cyber-cyan font-black" />
                            <span className="text-slate-400 text-xs">FPS</span>
                          </span>
                        </div>

                        {/* Анимированный прогресс-бар фреймрейта */}
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barPercentage}%` }}
                            transition={{ duration: 0.6 }}
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.5)]"
                          />
                        </div>

                        {/* Честный бейдж оценки */}
                        <div className="flex items-center justify-between pt-0.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${comfort.badgeClass}`}>
                            {comfort.text}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Тест STINGER
                          </span>
                        </div>
                      </div>

                      {/* ХАРАКТЕРИСТИКИ (БЕЗ ОБРЕЗАНИЯ СЛОВ) */}
                      <div className="space-y-2 text-xs text-slate-300 border-t border-white/[0.06] pt-4 mb-6">
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 font-mono text-[11px]">CPU:</span>
                          <span className="font-medium text-white break-words">{build.specs.cpu}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 font-mono text-[11px]">GPU:</span>
                          <span className="font-medium text-purple-300 break-words">{build.specs.gpu}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 font-mono text-[11px]">RAM:</span>
                          <span className="font-medium text-slate-200 break-words">{build.specs.ram}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0 font-mono text-[11px]">SSD:</span>
                          <span className="font-medium text-slate-200 break-words">{build.specs.ssd}</span>
                        </div>
                      </div>

                    </div>

                    {/* КНОПКИ ДЕЙСТВИЯ */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <button
                        onClick={() => handleCopyAndGoToAvito(build)}
                        className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-brand text-xs font-bold transition-all shadow-[0_4px_20px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2 group/btn"
                      >
                        <Copy className="w-4 h-4 text-blue-200 group-hover/btn:scale-110 transition-transform" />
                        <span>ЗАКАЗАТЬ В АВИТО</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </button>

                      <button
                        onClick={() => onSelectBuildForConfigurator(build)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sliders className="w-3.5 h-3.5 text-cyber-cyan" />
                        <span>Изменить в конфигураторе</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    </div>

                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
