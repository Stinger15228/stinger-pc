import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  HardDrive,
  Layers,
  Box,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  Flame,
  Crosshair,
  Video,
  Coins,
  ShieldAlert,
  Send,
  Zap,
  RotateCcw,
  Gauge,
  Check,
  ChevronRight,
  Radio,
  Sliders,
  HelpCircle,
} from "lucide-react";
import {
  CONFIGURATOR_OPTIONS,
  getDynamicBaseCost,
  getFpsComfortBadge,
  SHOP_INFO,
} from "../data/stingerData";
import AnimatedCounter from "./ui/AnimatedCounter";
import SpotlightCard from "./ui/SpotlightCard";

export default function ConfiguratorSection({ onShowToast, selectedBuildFromCatalog }) {
  // Mode: "pro" (manual custom) or "quiz" (express 1-min)
  const [mode, setMode] = useState("pro");

  // Pro Configurator State
  const [selectedGpuId, setSelectedGpuId] = useState("rtx4060");
  const [selectedCpuId, setSelectedCpuId] = useState("r5_5600");
  const [selectedRamId, setSelectedRamId] = useState("ram16_d4");
  const [selectedSsdId, setSelectedSsdId] = useState("ssd1000");
  const [selectedCaseId, setSelectedCaseId] = useState("case_glass");

  // Sync if selected from Catalog
  useEffect(() => {
    if (selectedBuildFromCatalog) {
      setMode("pro");
      if (selectedBuildFromCatalog.specs?.gpu) {
        const lowerGpu = selectedBuildFromCatalog.specs.gpu.toLowerCase();
        const foundGpu = CONFIGURATOR_OPTIONS.gpus.find(g => 
          lowerGpu.includes(g.id.replace("rtx", "").replace("rx", "").replace("gtx", ""))
        );
        if (foundGpu) setSelectedGpuId(foundGpu.id);
      }
      if (selectedBuildFromCatalog.specs?.cpu) {
        const lowerCpu = selectedBuildFromCatalog.specs.cpu.toLowerCase();
        const foundCpu = CONFIGURATOR_OPTIONS.cpus.find(c => 
          lowerCpu.includes(c.id.replace("r5_", "").replace("r7_", "").replace("i3_", "").replace("i5_", "").replace("i7_", ""))
        );
        if (foundCpu) setSelectedCpuId(foundCpu.id);
      }
    }
  }, [selectedBuildFromCatalog]);
  const [gpuFilter, setGpuFilter] = useState("all"); // 'all', 'nvidia', 'amd', 'flagship'
  const [selectedGamePreview, setSelectedGamePreview] = useState("cyberpunk");

  // Quiz Express State
  const [quizBudget, setQuizBudget] = useState("mid"); // 'budget', 'mid', 'high', 'extreme'
  const [quizStyle, setQuizStyle] = useState("glass");
  const [quizTarget, setQuizTarget] = useState("aaa");
  const [quizDelivery, setQuizDelivery] = useState("pickup");
  const [quizWifi, setQuizWifi] = useState(true);
  const [quizStep, setQuizStep] = useState(1);

  // Active items lookup
  const selectedGpu = useMemo(
    () => CONFIGURATOR_OPTIONS.gpus.find((g) => g.id === selectedGpuId) || CONFIGURATOR_OPTIONS.gpus[2],
    [selectedGpuId]
  );

  const selectedCpu = useMemo(
    () => CONFIGURATOR_OPTIONS.cpus.find((c) => c.id === selectedCpuId) || CONFIGURATOR_OPTIONS.cpus[5],
    [selectedCpuId]
  );

  const selectedRam = useMemo(
    () => CONFIGURATOR_OPTIONS.ram.find((r) => r.id === selectedRamId) || CONFIGURATOR_OPTIONS.ram[0],
    [selectedRamId]
  );

  const selectedSsd = useMemo(
    () => CONFIGURATOR_OPTIONS.ssd.find((s) => s.id === selectedSsdId) || CONFIGURATOR_OPTIONS.ssd[1],
    [selectedSsdId]
  );

  const selectedCase = useMemo(
    () => CONFIGURATOR_OPTIONS.cases.find((c) => c.id === selectedCaseId) || CONFIGURATOR_OPTIONS.cases[1],
    [selectedCaseId]
  );

  // Pricing calculation
  const basePlatformCost = useMemo(
    () => getDynamicBaseCost(selectedGpu.price, selectedCpu.price),
    [selectedGpu.price, selectedCpu.price]
  );

  const totalPrice = useMemo(() => {
    return (
      selectedGpu.price +
      selectedCpu.price +
      selectedRam.price +
      selectedSsd.price +
      selectedCase.price +
      basePlatformCost
    );
  }, [selectedGpu, selectedCpu, selectedRam, selectedSsd, selectedCase, basePlatformCost]);

  const isPrepayment = totalPrice >= 100000;

  // Filtered GPUs
  const filteredGpus = useMemo(() => {
    if (gpuFilter === "nvidia") {
      return CONFIGURATOR_OPTIONS.gpus.filter((g) => g.name.includes("NVIDIA") || g.name.includes("GeForce"));
    }
    if (gpuFilter === "amd") {
      return CONFIGURATOR_OPTIONS.gpus.filter((g) => g.name.includes("Radeon") || g.name.includes("RX"));
    }
    if (gpuFilter === "flagship") {
      return CONFIGURATOR_OPTIONS.gpus.filter((g) => g.price >= 68000);
    }
    return CONFIGURATOR_OPTIONS.gpus;
  }, [gpuFilter]);

  // Apply scenario preset
  const handleApplyPreset = (task) => {
    setSelectedGpuId(task.defaultGpu);
    setSelectedCpuId(task.defaultCpu);
    if (task.id === "budget") {
      setSelectedRamId("ram16_d4");
      setSelectedSsdId("ssd512");
      setSelectedCaseId("case_mesh");
    } else if (task.id === "aaa") {
      setSelectedRamId("ram32_d5");
      setSelectedSsdId("ssd1000");
      setSelectedCaseId("case_white");
    } else if (task.id === "content") {
      setSelectedRamId("ram32_d4");
      setSelectedSsdId("ssd1000");
      setSelectedCaseId("case_glass");
    } else {
      setSelectedRamId("ram16_d4");
      setSelectedSsdId("ssd1000");
      setSelectedCaseId("case_glass");
    }
  };

  // Reset to default
  const handleReset = () => {
    setSelectedGpuId("rtx4060");
    setSelectedCpuId("r5_5600");
    setSelectedRamId("ram16_d4");
    setSelectedSsdId("ssd1000");
    setSelectedCaseId("case_glass");
  };

  // Copy Pro Configuration to Clipboard & open Avito
  const handleCopyAndOrder = (target = "avito") => {
    const text = `Здравствуйте! Хочу заказать индивидуальную сборку в STINGER PC (Великий Новгород):

• Видеокарта: ${selectedGpu.name} (${selectedGpu.price.toLocaleString("ru-RU")} ₽)
• Процессор: ${selectedCpu.name} (${selectedCpu.price.toLocaleString("ru-RU")} ₽)
• Оперативная память: ${selectedRam.name}
• Накопитель: ${selectedSsd.name}
• Корпус: ${selectedCase.name}
• Базовая платформа: Мат. плата + Охлаждение + БП + Windows 11 Pro + 24ч стресс-тесты
• Итоговая ориентировочная стоимость: ~${totalPrice.toLocaleString("ru-RU")} ₽
${isPrepayment ? "• Статус: Сборка от 100 000 ₽ (по предоплате)" : "• Статус: В наличии / Сборка 24 часа"}

Подскажите, можно ли оформить самовывоз на Псковской 33 или доставку?`;

    navigator.clipboard.writeText(text);

    if (onShowToast) {
      onShowToast({
        title: "Конфигурация скопирована в буфер!",
        message: "Текст сборки сохранен. Вставьте его в диалог в Авито или Telegram для быстрого ответа.",
        icon: "copy",
        triggerConfetti: true,
      });
    }

    setTimeout(() => {
      if (target === "avito") {
        window.open(SHOP_INFO.avitoUrl, "_blank");
      } else {
        window.open(SHOP_INFO.telegramUrl, "_blank");
      }
    }, 400);
  };

  // Current GPU estimated FPS
  const currentFps = selectedGpu.fpsMap[selectedGamePreview] || 60;
  const comfortBadge = getFpsComfortBadge(currentFps);

  // Benchmarks comparison values
  const benchmarkBaseline = 45; // baseline entry PC
  const benchmarkFlagship = 150; // RTX 4090 flagship
  const relativePercent = Math.min(100, Math.round((currentFps / benchmarkFlagship) * 100));

  return (
    <section id="configurator" className="relative py-28 bg-[#05060A] text-slate-100 overflow-hidden">
      {/* Background cyber radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-cyan-500/[0.04] via-purple-500/[0.03] to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Sliders className="w-3.5 h-3.5" />
            Кастомный онлайн-конфигуратор STINGER
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-gaming tracking-tight text-white mb-4">
            Собери свой кастомный игровой ПК{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              под ключ
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Честный расчет стоимости компонентов без скрытых наценок. В цену уже включены материнская плата,
            блок питания, эффективное охлаждение, чистая Windows 11 Pro и 24-часовой стресс-тест в мастерской.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => setMode("pro")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === "pro"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_25px_rgba(0,240,255,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4" />
              Профессиональный конфигуратор
            </button>

            <button
              onClick={() => setMode("quiz")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                mode === "quiz"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Экспресс-подбор за 1 минуту
            </button>
          </div>
        </div>

        {/* MODE 1: PRO CONFIGURATOR */}
        {mode === "pro" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Components Chooser (Col 7 / 12) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              {/* Presets in 1 click */}
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    Быстрые пресеты под сценарий
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Сбросить
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CONFIGURATOR_OPTIONS.tasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => handleApplyPreset(task)}
                      className="p-3 rounded-xl text-left bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-cyan-500/40 transition-all duration-200 group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                        {task.id === "esports" && <Crosshair className="w-3.5 h-3.5 text-cyan-400" />}
                        {task.id === "aaa" && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                        {task.id === "content" && <Video className="w-3.5 h-3.5 text-purple-400" />}
                        {task.id === "budget" && <Coins className="w-3.5 h-3.5 text-emerald-400" />}
                        {task.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{task.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. GPU Selection (18 items, broad width & wrapping) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-gaming">
                        1. Видеокарта (Графический чип)
                      </h3>
                      <p className="text-xs text-slate-400">Главный компонент, определяющий FPS в играх</p>
                    </div>
                  </div>

                  {/* GPU Filter Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: "all", label: "Все (18)" },
                      { id: "nvidia", label: "NVIDIA RTX" },
                      { id: "amd", label: "AMD Radeon" },
                      { id: "flagship", label: "⚡ Флагманы" },
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setGpuFilter(filter.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                          gpuFilter === filter.id
                            ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                            : "bg-slate-800/80 text-slate-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {filteredGpus.map((gpu) => {
                    const isSelected = selectedGpuId === gpu.id;
                    const isOver100k = gpu.price >= 68000;

                    return (
                      <button
                        key={gpu.id}
                        onClick={() => setSelectedGpuId(gpu.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-cyan-950/50 via-slate-900 to-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)] ring-1 ring-cyan-400/50"
                            : "bg-slate-900/60 hover:bg-slate-850 border-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500 text-slate-950 flex items-center justify-center rounded-bl-xl shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}

                        <div className="pr-6">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                isOver100k
                                  ? "bg-purple-950/60 text-purple-300 border-purple-500/40"
                                  : "bg-slate-800 text-cyan-300 border-cyan-500/20"
                              }`}
                            >
                              {gpu.tier}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-white break-words leading-snug">
                            {gpu.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">Оптимально для: {gpu.defRes}</div>
                        </div>

                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5">
                          <span className="text-xs font-mono text-slate-400">Cyberpunk: ~{gpu.fpsMap.cyberpunk} FPS</span>
                          <span className="text-sm font-extrabold font-mono text-cyan-400">
                            {gpu.price.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CPU Selection (15 items) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-gaming">
                      2. Процессор (CPU)
                    </h3>
                    <p className="text-xs text-slate-400">Мощность ядер для соревновательных игр, физики и стримов</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {CONFIGURATOR_OPTIONS.cpus.map((cpu) => {
                    const isSelected = selectedCpuId === cpu.id;

                    return (
                      <button
                        key={cpu.id}
                        onClick={() => setSelectedCpuId(cpu.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-900 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.2)] ring-1 ring-purple-400/50"
                            : "bg-slate-900/60 hover:bg-slate-850 border-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-bl-xl shadow-md">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}

                        <div className="pr-6">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-purple-500/20 mb-1 inline-block">
                            {cpu.tag}
                          </span>
                          <div className="text-sm font-bold text-white break-words leading-snug">
                            {cpu.name}
                          </div>
                        </div>

                        <div className="flex items-center justify-end mt-3 pt-2.5 border-t border-white/5">
                          <span className="text-sm font-extrabold font-mono text-purple-300">
                            {cpu.price.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. RAM Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-gaming">
                      3. Оперативная память (RAM)
                    </h3>
                    <p className="text-xs text-slate-400">Двухканальный режим, радиаторы охлаждения и XMP/EXPO профиль</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CONFIGURATOR_OPTIONS.ram.map((ram) => {
                    const isSelected = selectedRamId === ram.id;

                    return (
                      <button
                        key={ram.id}
                        onClick={() => setSelectedRamId(ram.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-slate-900 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] ring-1 ring-emerald-400"
                            : "bg-slate-900/60 border-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-mono text-emerald-400 mb-1">{ram.tag}</div>
                        <div className="text-sm font-bold text-white">{ram.name}</div>
                        <div className="text-sm font-mono font-extrabold text-emerald-300 mt-2">
                          {ram.price.toLocaleString("ru-RU")} ₽
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. SSD Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <HardDrive className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-gaming">
                      4. Накопитель (M.2 NVMe SSD)
                    </h3>
                    <p className="text-xs text-slate-400">Скорости до 3500-7000 МБ/с, мгновенная загрузка ОС за 7 секунд</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CONFIGURATOR_OPTIONS.ssd.map((ssd) => {
                    const isSelected = selectedSsdId === ssd.id;

                    return (
                      <button
                        key={ssd.id}
                        onClick={() => setSelectedSsdId(ssd.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-slate-900 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] ring-1 ring-amber-400"
                            : "bg-slate-900/60 border-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs font-mono text-amber-400 mb-1">{ssd.tag}</div>
                        <div className="text-sm font-bold text-white">{ssd.name}</div>
                        <div className="text-sm font-mono font-extrabold text-amber-300 mt-2">
                          {ssd.price.toLocaleString("ru-RU")} ₽
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Case Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-gaming">
                      5. Игровой корпус и дизайн
                    </h3>
                    <p className="text-xs text-slate-400">Закаленное стекло, ARGB кулеры и оптимизированный продув</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CONFIGURATOR_OPTIONS.cases.map((c) => {
                    const isSelected = selectedCaseId === c.id;

                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCaseId(c.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-slate-900 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] ring-1 ring-blue-400"
                            : "bg-slate-900/60 border-white/[0.07] hover:border-white/20"
                        }`}
                      >
                        <div className="text-sm font-bold text-white">{c.name}</div>
                        <div className="text-sm font-mono font-extrabold text-blue-300 mt-2">
                          {c.price.toLocaleString("ru-RU")} ₽
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Summary Panel (Col 5 / 12) */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden">
                {/* Glow behind summary */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Спецификация кастома
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                    STINGER Custom #2026
                  </span>
                </div>

                {/* Selected components list */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">GPU:</span>
                    <span className="font-semibold text-white text-right break-words">{selectedGpu.name}</span>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">CPU:</span>
                    <span className="font-semibold text-white text-right break-words">{selectedCpu.name}</span>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">RAM:</span>
                    <span className="font-semibold text-white text-right">{selectedRam.name}</span>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">SSD:</span>
                    <span className="font-semibold text-white text-right">{selectedSsd.name}</span>
                  </div>

                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-400">Корпус:</span>
                    <span className="font-semibold text-white text-right">{selectedCase.name}</span>
                  </div>

                  {/* Dynamic Base Platform Info */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1.5 mt-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-400 font-medium">Базовая платформа:</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {basePlatformCost.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Включает материнскую плату (A520/B550/B760), башню кулера с медными трубками, БП 500-750W 80+,
                      профессиональную термопасту MX-4, чистую Windows 11 Pro и 24ч тест FurMark/OCCT.
                    </p>
                  </div>
                </div>

                {/* Prepayment alert for builds >= 100 000 ₽ */}
                {isPrepayment && (
                  <div className="mt-4 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-start gap-2.5 text-xs text-purple-200">
                    <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">⚡ Сборка от 100 000 ₽</span>: флагманские конфигурации
                      собираются под заказ по предоплате с предоставлением фото и видеоотчета стресс-тестов на
                      каждом этапе сборки.
                    </div>
                  </div>
                )}

                {/* FPS Game Simulator in Configurator */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      Производительность в играх
                    </span>
                    <div className="flex gap-1">
                      {["cyberpunk", "cs2", "gta5"].map((gameKey) => (
                        <button
                          key={gameKey}
                          onClick={() => setSelectedGamePreview(gameKey)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                            selectedGamePreview === gameKey
                              ? "bg-cyan-500 text-slate-950 font-bold"
                              : "bg-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {gameKey === "cyberpunk" ? "CP2077" : gameKey.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Benchmark bar */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white font-medium capitalize">
                        {selectedGamePreview === "cyberpunk"
                          ? "Cyberpunk 2077 (1080p Ultra)"
                          : selectedGamePreview === "cs2"
                          ? "Counter-Strike 2 (1080p High)"
                          : "GTA V (1080p Very High)"}
                      </span>
                      <span className="text-base font-extrabold font-mono text-cyan-400">
                        ~{currentFps} FPS
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${relativePercent}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Базовый ПК (~45)</span>
                      <span className="text-cyan-400 font-bold">Выбранная сборка (~{currentFps})</span>
                      <span>RTX 4090 (~150)</span>
                    </div>

                    {/* Comfort Badge */}
                    <div className="pt-1">
                      <span
                        className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border ${comfortBadge.badgeClass}`}
                      >
                        {comfortBadge.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <div className="text-xs font-mono text-slate-400">Итого под ключ:</div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-gaming text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text">
                      <AnimatedCounter value={totalPrice} /> ₽
                    </div>
                  </div>
                  <div className="text-right text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Гарантия 3 месяца
                  </div>
                </div>

                {/* Conversion Buttons */}
                <div className="mt-6 space-y-2.5">
                  <button
                    onClick={() => handleCopyAndOrder("avito")}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_auto] hover:bg-right transition-all duration-300 text-slate-950 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] cursor-pointer"
                  >
                    <Copy className="w-4 h-4 stroke-[2.5]" />
                    Скопировать сборку и открыть Авито
                  </button>

                  <button
                    onClick={() => handleCopyAndOrder("telegram")}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    Написать мастеру в Telegram
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <span className="text-[11px] text-slate-400">
                    📍 Тестирование и самовывоз: <strong className="text-slate-300">Великий Новгород, Псковская 33</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: EXPRESS QUIZ IN 1 MINUTE */}
        {mode === "quiz" && (
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative">
              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
                  ⚡ Экспресс-заявка без технических сложностей
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-gaming text-white mt-3">
                  Подберем идеальную сборку за 5 простых вопросов
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Ответьте на несколько вопросов — мастер рассчитает лучшую конфигурацию по наличию в Великом Новгороде
                </p>
              </div>

              <div className="space-y-6">
                {/* 1. Бюджет */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
                    1. Желаемый бюджет на системный блок:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "budget", label: "до 45 000 ₽", desc: "CS2, Dota 2, GTA 5" },
                      { id: "mid", label: "45 000 – 75 000 ₽", desc: "Хит 1080p Ultra" },
                      { id: "high", label: "75 000 – 120 000 ₽", desc: "2K гейминг 144Hz" },
                      { id: "extreme", label: "от 120 000 ₽", desc: "Флагманы 4K" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setQuizBudget(b.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          quizBudget === b.id
                            ? "bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                            : "bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="text-xs font-bold">{b.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{b.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Стиль и корпус */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                    2. Предпочтительный внешний вид корпуса:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "glass", label: "Cyber Glass ARGB", desc: "Черный со стеклом и подсветкой" },
                      { id: "white", label: "Snow White Аквариум", desc: "Белоснежный стиль с панорамой" },
                      { id: "stealth", label: "Stealth Dark Минимал", desc: "Строгий без лишней подсветки" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setQuizStyle(s.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          quizStyle === s.id
                            ? "bg-purple-950/60 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                            : "bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="text-xs font-bold">{s.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Основные игры и задачи */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                    3. Во что планируете играть или работать?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "esports", label: "Онлайн шутеры", desc: "CS2, Valorant, Apex, PUBG" },
                      { id: "aaa", label: "Тяжелые AAA-игры", desc: "Cyberpunk, GTA V, RDR 2, Ведьмак" },
                      { id: "render", label: "Монтаж и стриминг", desc: "Premiere, Blender, OBS 60FPS" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setQuizTarget(t.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          quizTarget === t.id
                            ? "bg-emerald-950/60 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="text-xs font-bold">{t.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Получение */}
                <div className="space-y-2.5">
                  <label className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                    4. Способ получения:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      {
                        id: "pickup",
                        label: "Самовывоз в Великом Новгороде",
                        desc: "ул. Псковская, д. 33 (личные тесты при вас)",
                      },
                      {
                        id: "delivery",
                        label: "Авито Доставка / СДЭК",
                        desc: "Бронебойная упаковка по всей России",
                      },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setQuizDelivery(d.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          quizDelivery === d.id
                            ? "bg-amber-950/60 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                            : "bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="text-xs font-bold">{d.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{d.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Wi-Fi / Bluetooth */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-white/5">
                  <div>
                    <div className="text-xs font-bold text-white">Добавить быстрый Wi-Fi 6 и Bluetooth адаптер?</div>
                    <div className="text-[11px] text-slate-400">Для беспроводных геймпадов, наушников и интернета</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuizWifi(!quizWifi)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      quizWifi ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        quizWifi ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Quiz Submit Button */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    const budgetNames = {
                      budget: "до 45 000 ₽",
                      mid: "45 000 – 75 000 ₽",
                      high: "75 000 – 120 000 ₽",
                      extreme: "от 120 000 ₽",
                    };
                    const styleNames = {
                      glass: "Cyber Glass ARGB (черный со стеклом)",
                      white: "Snow White Аквариум (белоснежный)",
                      stealth: "Stealth Dark Минимал (тихий без подсветки)",
                    };
                    const targetNames = {
                      esports: "Онлайн шутеры (CS2, Valorant, Apex)",
                      aaa: "Тяжелые AAA-игры (Cyberpunk, GTA V, RDR 2)",
                      render: "Монтаж, стриминг и 3D",
                    };
                    const deliveryNames = {
                      pickup: "Самовывоз в Великом Новгороде (Псковская 33)",
                      delivery: "Авито Доставка / СДЭК",
                    };

                    const text = `Здравствуйте! Подобрал параметры на сайте STINGER PC:

1. Бюджет: ${budgetNames[quizBudget]}
2. Дизайн корпуса: ${styleNames[quizStyle]}
3. Задачи: ${targetNames[quizTarget]}
4. Способ получения: ${deliveryNames[quizDelivery]}
5. Нужен Wi-Fi/Bluetooth: ${quizWifi ? "Да, нужен" : "Нет, по кабелю"}

Подскажите, какие сборки сейчас есть в наличии на Псковской 33 или что можете собрать под ключ?`;

                    navigator.clipboard.writeText(text);

                    if (onShowToast) {
                      onShowToast({
                        title: "Заявка сформирована и скопирована!",
                        message: "Открываем Авито — просто нажмите 'Вставить' в диалоге с мастером.",
                        icon: "copy",
                        triggerConfetti: true,
                      });
                    }

                    setTimeout(() => {
                      window.open(SHOP_INFO.avitoUrl, "_blank");
                    }, 400);
                  }}
                  className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_auto] hover:bg-right transition-all text-white flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  Отправить параметры в Авито и получить варианты
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  Мастер отвечает в течение 5-15 минут в рабочее время. Никакого спама, только честный подбор.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
