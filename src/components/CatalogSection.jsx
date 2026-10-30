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
  ChevronRight,
  Cpu,
  HardDrive,
  Zap,
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
    <section id="catalog" className="py-20 sm:py-28 relative bg-transparent">
      
      {/* Декоративные световые пятна фона */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-indigo-600/15 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/15 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ЗАГОЛОВОК КАТАЛОГА */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Витрина готовых ПК в наличии и под заказ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-gaming tracking-tight">
              КАТАЛОГ СБОРОК <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">STINGER</span>
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Основная линейка — ПК до 100 000 ₽ <strong className="text-emerald-400 font-semibold">в наличии на ул. Псковская, 33</strong>.
            Флагманы от 100 000 ₽ выполняются под заказ строго с плашкой <strong className="text-amber-400 font-semibold">«⚡ По предоплате»</strong>.
          </div>
        </div>

        {/* ========================================================
            ЖИВОЙ ЦЕНТР СИМУЛЯЦИИ FPS И ТАБЫ ФИЛЬТРОВ
        ======================================================== */}
        <div className="p-6 sm:p-8 rounded-[2rem] bg-[#080B13]/85 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.12)] backdrop-blur-xl space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Интерактивный симулятор производительности</span>
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-gaming mt-1">
                Выберите игру и целевое разрешение
              </h3>
            </div>

            {/* ПЕРЕКЛЮЧАТЕЛЬ РАЗРЕШЕНИЯ ЭКРАНА */}
            <div className="flex items-center p-1 rounded-2xl bg-black/70 border border-white/10 self-start md:self-auto shadow-inner">
              {BENCHMARK_RESOLUTIONS.map(res => (
                <button
                  key={res.id}
                  onClick={() => setSelectedRes(res.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedRes === res.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.45)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {res.label.split(' ')[0]} {res.label.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* 8 ТАБОВ ИГР */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {BENCHMARK_GAMES.map(game => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  selectedGame === game.id
                    ? 'bg-white text-slate-950 border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]'
                    : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                <span>{game.name}</span>
                {selectedGame === game.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* КАТЕГОРИИ КАТАЛОГА */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
            <span className="text-xs font-mono text-slate-400 mr-2 uppercase tracking-wider">Категория:</span>
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "all" ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
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
            СЕТКА 10 КАРТОЧЕК ГОТОВЫХ ПК (ВЫРАВНИВАНИЕ ПО СТРУНКЕ)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="h-full flex flex-col"
                >
                  <SpotlightCard
                    glowColor={build.glowColor}
                    className="h-full flex flex-col p-5 sm:p-6"
                  >
                    {/* ВЕРХНЯЯ ЧАСТЬ КАРТОЧКИ (FLEX-1 ДЛЯ ИДЕАЛЬНОЙ РОВНОСТИ) */}
                    <div className="flex-1 flex flex-col">
                      
                      {/* СТАТУС НАЛИЧИЯ И БЕЙДЖ */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full font-bold border flex items-center gap-1.5 ${
                          build.isPrepayment 
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${build.isPrepayment ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                          <span>{build.isPrepayment ? 'Сборка под заказ' : 'В наличии • Новгород'}</span>
                        </span>

                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                          {build.badge}
                        </span>
                      </div>

                      {/* ВИЗУАЛЬНЫЙ БЛОК: ФОТО С ГАЛЕРЕЕЙ */}
                      <div className="relative rounded-2xl overflow-hidden bg-black/70 aspect-[4/3] border border-white/[0.08] mb-4 group/img">
                        <img
                          src={currentImg}
                          alt={build.name}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />

                        {/* Разрешение бейдж */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-white">
                          {build.targetRes}
                        </div>

                        {/* Мини-превью галереи */}
                        {build.gallery && build.gallery.length > 1 && (
                          <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 p-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 overflow-x-auto">
                            {build.gallery.map((thumb, tIdx) => (
                              <button
                                key={tIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectThumbnail(build.id, thumb);
                                }}
                                className={`w-8 h-8 rounded-lg overflow-hidden shrink-0 border transition-all ${
                                  currentImg === thumb ? 'border-cyan-400 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'
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
                        <h4 className="font-gaming text-xl sm:text-2xl font-black text-white tracking-tight">
                          {build.name}
                        </h4>
                        <div className="text-xs text-indigo-300 font-medium break-words">
                          {build.subtitle}
                        </div>
                        <div className="pt-2 flex items-baseline gap-2">
                          <span className="font-gaming text-2xl sm:text-3xl font-black text-metallic">
                            {build.price.toLocaleString('ru-RU')} ₽
                          </span>
                          {build.isPrepayment && (
                            <span className="text-[10px] font-mono font-bold text-amber-400">
                              (по предоплате)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ЖИВОЙ HUD-ИНДИКАТОР FPS */}
                      <div className="p-3.5 rounded-2xl bg-black/80 border border-white/[0.08] space-y-2 mb-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono text-[11px] truncate max-w-[170px]">
                            {currentGameData.name} ({selectedRes}):
                          </span>
                          <span className="font-mono font-bold text-base text-white flex items-center gap-1">
                            <AnimatedCounter value={fpsValue} className="text-cyan-400 font-black" />
                            <span className="text-slate-400 text-xs">FPS</span>
                          </span>
                        </div>

                        {/* Анимированный прогресс-бар фреймрейта */}
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barPercentage}%` }}
                            transition={{ duration: 0.6 }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
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

                      {/* ХАРАКТЕРИСТИКИ (ЧИСТЫЙ СТИЛЬ С ИКОНКАМИ) */}
                      <div className="space-y-2.5 text-xs border-t border-white/[0.06] pt-4 mb-4">
                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400">
                            <Cpu className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Процессор</span>
                            <span className="font-medium text-white break-words text-xs leading-snug">{build.specs.cpu}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
                            <Zap className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Видеокарта</span>
                            <span className="font-medium text-indigo-300 break-words text-xs leading-snug">{build.specs.gpu}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-md bg-white/[0.04] border border-white/5 flex items-center justify-center shrink-0 mt-0.5 text-slate-400">
                            <Layers className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Память & SSD</span>
                            <span className="font-medium text-slate-200 break-words text-xs leading-snug">{build.specs.ram} • {build.specs.ssd}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* ========================================================
                        НИЖНЯЯ ЧАСТЬ КАРТОЧКИ: КНОПКИ ДЕЙСТВИЯ (ВЫРАВНЕНЫ ПО ЛИНЕЙКЕ ЧЕРЕЗ MT-AUTO)
                    ======================================================== */}
                    <div className="mt-auto pt-4 border-t border-white/[0.08] space-y-2">
                      <button
                        onClick={() => handleCopyAndGoToAvito(build)}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-gaming text-xs font-bold transition-all shadow-[0_4px_20px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 group/btn cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-indigo-200 group-hover/btn:scale-110 transition-transform" />
                        <span>ЗАКАЗАТЬ В АВИТО</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </button>

                      <button
                        onClick={() => onSelectBuildForConfigurator(build)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sliders className="w-3.5 h-3.5 text-cyan-400" />
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
