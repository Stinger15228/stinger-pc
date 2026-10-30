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
  ChevronLeft,
  X,
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

const STEPS = [
  { id: 1, key: "gpu", label: "1. Видеокарта", icon: Zap, sub: "FPS и графика" },
  { id: 2, key: "cpu", label: "2. Процессор", icon: Cpu, sub: "Ядра и физика" },
  { id: 3, key: "ram", label: "3. Память RAM", icon: Layers, sub: "Двухканал XMP" },
  { id: 4, key: "ssd", label: "4. Накопитель", icon: HardDrive, sub: "M.2 NVMe SSD" },
  { id: 5, key: "case", label: "5. Корпус", icon: Box, sub: "Дизайн и продув" },
];

export default function ConfiguratorModal({
  isOpen,
  onClose,
  initialMode = "pro",
  selectedBuildFromCatalog = null,
  onShowToast,
}) {
  // Mode: "pro" (manual custom) or "quiz" (express 1-min)
  const [mode, setMode] = useState(initialMode);
  const [activeStep, setActiveStep] = useState(1);

  // Pro Configurator State
  const [selectedGpuId, setSelectedGpuId] = useState("rtx4060");
  const [selectedCpuId, setSelectedCpuId] = useState("r5_5600");
  const [selectedRamId, setSelectedRamId] = useState("ram16_d4");
  const [selectedSsdId, setSelectedSsdId] = useState("ssd1000");
  const [selectedCaseId, setSelectedCaseId] = useState("case_glass");
  const [gpuFilter, setGpuFilter] = useState("all");
  const [selectedGamePreview, setSelectedGamePreview] = useState("cyberpunk");

  // Quiz Express State
  const [quizBudget, setQuizBudget] = useState("mid");
  const [quizStyle, setQuizStyle] = useState("glass");
  const [quizTarget, setQuizTarget] = useState("aaa");
  const [quizDelivery, setQuizDelivery] = useState("pickup");
  const [quizWifi, setQuizWifi] = useState(true);

  // Sync mode and catalog build when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (initialMode) setMode(initialMode);

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
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, selectedBuildFromCatalog, initialMode]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
    setActiveStep(1);
  };

  // Copy Configuration to Clipboard & open Avito
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
  const benchmarkFlagship = 150;
  const relativePercent = Math.min(100, Math.round((currentFps / benchmarkFlagship) * 100));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040508]/90 backdrop-blur-2xl"
        />

        {/* Modal Window Container — динамически адаптирует размер: компактный для квиза, широкий студийный для про-режима */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`relative w-full mx-auto sm:my-auto rounded-none sm:rounded-3xl bg-[#080B13]/95 border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col overflow-hidden z-10 transition-all duration-300 ${
            mode === "quiz"
              ? "max-w-3xl max-h-[90vh] h-auto my-auto"
              : "max-w-[1400px] max-h-[94vh] h-full"
          }`}
        >
          {/* ========================================================
              ШАПКА МОДАЛЬНОГО ОКНА (HEADER)
          ======================================================== */}
          <div className="px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/10 bg-[#06080F]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Бренд и заголовок */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-gaming font-black text-sm sm:text-base text-white leading-none">
                  STINGER CUSTOM STUDIO
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Пошаговый конфигуратор • Гарантия 3 месяца
                </span>
              </div>
            </div>

            {/* Переключатель режимов */}
            <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10">
              <button
                onClick={() => setMode("pro")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === "pro"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Пошаговый подбор</span>
              </button>

              <button
                onClick={() => setMode("quiz")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mode === "quiz"
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Экспресс-квиз за 1 мин</span>
              </button>
            </div>

            {/* Быстрые пресеты и кнопка закрытия */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-colors"
                title="Сбросить конфигурацию"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сбросить</span>
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                aria-label="Закрыть (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ========================================================
              ТЕЛО МОДАЛЬНОГО ОКНА (BODY)
          ======================================================== */}
          <div className={`flex-1 overflow-y-auto ${mode === "quiz" ? "p-4 sm:p-6" : "p-4 sm:p-6 lg:p-8"}`}>
            
            {/* РЕЖИМ 1: ПРОФЕССИОНАЛЬНЫЙ ПОШАГОВЫЙ КОНФИГУРАТОР */}
            {mode === "pro" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* ЛЕВАЯ КОЛОНКА (7 КОЛОНОК): ГОРИЗОНТАЛЬНЫЙ СТЕППЕР + ТЕКУЩИЙ ШАГ */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  
                  {/* ГОРИЗОНТАЛЬНЫЙ СТЕППЕР (5 ВЫБОРОВ) */}
                  <div className="p-2 rounded-2xl bg-black/60 border border-white/10 overflow-x-auto flex items-center gap-1.5">
                    {STEPS.map((step) => {
                      const isActive = activeStep === step.id;
                      const Icon = step.icon;

                      // Выбранное имя для шага
                      let selectedLabel = "";
                      if (step.key === "gpu") selectedLabel = selectedGpu.name.split(" ")[2] || selectedGpu.name;
                      if (step.key === "cpu") selectedLabel = selectedCpu.name.split(" ")[2] || selectedCpu.name;
                      if (step.key === "ram") selectedLabel = selectedRam.name.split(" ")[0] + " " + selectedRam.name.split(" ")[1];
                      if (step.key === "ssd") selectedLabel = selectedSsd.name.split(" ")[0];
                      if (step.key === "case") selectedLabel = selectedCase.name.split(" ")[0] + " " + selectedCase.name.split(" ")[1];

                      return (
                        <button
                          key={step.id}
                          onClick={() => setActiveStep(step.id)}
                          className={`flex-1 min-w-[130px] p-2.5 rounded-xl text-left transition-all relative ${
                            isActive
                              ? "bg-indigo-600/30 border border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.3)] text-white"
                              : "bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-xs font-bold leading-tight">
                            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                            <span className="truncate">{step.label}</span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 truncate mt-1">
                            {selectedLabel}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* БЫСТРЫЕ ПРЕСЕТЫ В 1 КЛИК */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">Готовые пресеты:</span>
                    {CONFIGURATOR_OPTIONS.tasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => handleApplyPreset(task)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 font-medium"
                      >
                        {task.id === "esports" && <Crosshair className="w-3 h-3 text-cyan-400" />}
                        {task.id === "aaa" && <Flame className="w-3 h-3 text-amber-400" />}
                        {task.id === "content" && <Video className="w-3 h-3 text-purple-400" />}
                        {task.id === "budget" && <Coins className="w-3 h-3 text-emerald-400" />}
                        <span>{task.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* ========================================================
                      КОНТЕНТ АКТИВНОГО ШАГА (БЕЗ ДЛИННОЙ ПРОСТЫНИ!)
                  ======================================================== */}
                  <div className="space-y-4">
                    
                    {/* ШАГ 1: ВИДЕОКАРТЫ */}
                    {activeStep === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div>
                            <h4 className="font-gaming font-bold text-white text-base">
                              1. Выберите видеокарту (GPU)
                            </h4>
                            <p className="text-xs text-slate-400">Графический чип, определяющий FPS в играх</p>
                          </div>

                          {/* Фильтр чипов */}
                          <div className="flex gap-1">
                            {[
                              { id: "all", label: "Все" },
                              { id: "nvidia", label: "NVIDIA RTX" },
                              { id: "amd", label: "AMD Radeon" },
                              { id: "flagship", label: "⚡ Флагманы" },
                            ].map((f) => (
                              <button
                                key={f.id}
                                onClick={() => setGpuFilter(f.id)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                                  gpuFilter === f.id
                                    ? "bg-indigo-600 text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                                    : "bg-black/60 text-slate-400 hover:text-white border border-white/5"
                                }`}
                              >
                                {f.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                          {filteredGpus.map((gpu) => {
                            const isSelected = selectedGpuId === gpu.id;
                            const isOver100k = gpu.price >= 68000;

                            return (
                              <button
                                key={gpu.id}
                                onClick={() => setSelectedGpuId(gpu.id)}
                                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative flex flex-col justify-between ${
                                  isSelected
                                    ? "bg-indigo-600/15 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500"
                                    : "bg-black/40 hover:bg-black/60 border-white/[0.08] hover:border-white/20"
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-0 right-0 w-7 h-7 bg-indigo-600 text-white flex items-center justify-center rounded-bl-xl shadow-md">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                )}

                                <div className="pr-5">
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border mb-1 inline-block ${
                                    isOver100k ? "bg-amber-950/60 text-amber-300 border-amber-500/30" : "bg-white/[0.04] text-slate-300 border-white/10"
                                  }`}>
                                    {gpu.tier}
                                  </span>
                                  <div className="text-sm font-bold text-white break-words leading-snug">
                                    {gpu.name}
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1">
                                    Оптимально для: {gpu.defRes}
                                  </div>
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
                    )}

                    {/* ШАГ 2: ПРОЦЕССОРЫ */}
                    {activeStep === 2 && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-white/10">
                          <h4 className="font-gaming font-bold text-white text-base">
                            2. Выберите процессор (CPU)
                          </h4>
                          <p className="text-xs text-slate-400">Вычислительная мощность ядер под игры, физику и стримы</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                          {CONFIGURATOR_OPTIONS.cpus.map((cpu) => {
                            const isSelected = selectedCpuId === cpu.id;

                            return (
                              <button
                                key={cpu.id}
                                onClick={() => setSelectedCpuId(cpu.id)}
                                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative flex flex-col justify-between ${
                                  isSelected
                                    ? "bg-indigo-600/15 border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500"
                                    : "bg-black/40 hover:bg-black/60 border-white/[0.08] hover:border-white/20"
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-0 right-0 w-7 h-7 bg-indigo-600 text-white flex items-center justify-center rounded-bl-xl shadow-md">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                )}

                                <div className="pr-5">
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/10 mb-1 inline-block">
                                    {cpu.tag}
                                  </span>
                                  <div className="text-sm font-bold text-white break-words leading-snug">
                                    {cpu.name}
                                  </div>
                                </div>

                                <div className="flex items-center justify-end mt-3 pt-2.5 border-t border-white/5">
                                  <span className="text-sm font-extrabold font-mono text-cyan-400">
                                    {cpu.price.toLocaleString("ru-RU")} ₽
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ШАГ 3: ОПЕРАТИВНАЯ ПАМЯТЬ */}
                    {activeStep === 3 && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-white/10">
                          <h4 className="font-gaming font-bold text-white text-base">
                            3. Выберите оперативную память (RAM)
                          </h4>
                          <p className="text-xs text-slate-400">Двухканальный режим, радиаторы охлаждения и профили XMP/EXPO</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CONFIGURATOR_OPTIONS.ram.map((ram) => {
                            const isSelected = selectedRamId === ram.id;

                            return (
                              <button
                                key={ram.id}
                                onClick={() => setSelectedRamId(ram.id)}
                                className={`p-4 rounded-xl border text-left transition-all ${
                                  isSelected
                                    ? "bg-indigo-600/15 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500"
                                    : "bg-black/40 border-white/[0.08] hover:border-white/20"
                                }`}
                              >
                                <div className="text-xs font-mono text-cyan-400 mb-1">{ram.tag}</div>
                                <div className="text-sm font-bold text-white">{ram.name}</div>
                                <div className="text-sm font-mono font-extrabold text-cyan-400 mt-2">
                                  {ram.price.toLocaleString("ru-RU")} ₽
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ШАГ 4: НАКОПИТЕЛЬ SSD */}
                    {activeStep === 4 && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-white/10">
                          <h4 className="font-gaming font-bold text-white text-base">
                            4. Выберите накопитель (M.2 NVMe SSD)
                          </h4>
                          <p className="text-xs text-slate-400">Мгновенный старт Windows за 7 секунд и сверхбыстрая загрузка уровней</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {CONFIGURATOR_OPTIONS.ssd.map((ssd) => {
                            const isSelected = selectedSsdId === ssd.id;

                            return (
                              <button
                                key={ssd.id}
                                onClick={() => setSelectedSsdId(ssd.id)}
                                className={`p-4 rounded-xl border text-left transition-all ${
                                  isSelected
                                    ? "bg-indigo-600/15 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500"
                                    : "bg-black/40 border-white/[0.08] hover:border-white/20"
                                }`}
                              >
                                <div className="text-xs font-mono text-cyan-400 mb-1">{ssd.tag}</div>
                                <div className="text-sm font-bold text-white">{ssd.name}</div>
                                <div className="text-sm font-mono font-extrabold text-cyan-400 mt-2">
                                  {ssd.price.toLocaleString("ru-RU")} ₽
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ШАГ 5: ИГРОВОЙ КОРПУС */}
                    {activeStep === 5 && (
                      <div className="space-y-4">
                        <div className="pb-2 border-b border-white/10">
                          <h4 className="font-gaming font-bold text-white text-base">
                            5. Выберите корпус и стиль
                          </h4>
                          <p className="text-xs text-slate-400">Закаленное стекло, регулируемая ARGB-подсветка и чистый продув</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CONFIGURATOR_OPTIONS.cases.map((c) => {
                            const isSelected = selectedCaseId === c.id;

                            return (
                              <button
                                key={c.id}
                                onClick={() => setSelectedCaseId(c.id)}
                                className={`p-4 rounded-xl border text-left transition-all ${
                                  isSelected
                                    ? "bg-indigo-600/15 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-indigo-500"
                                    : "bg-black/40 border-white/[0.08] hover:border-white/20"
                                }`}
                              >
                                <div className="text-sm font-bold text-white">{c.name}</div>
                                <div className="text-sm font-mono font-extrabold text-cyan-400 mt-2">
                                  {c.price.toLocaleString("ru-RU")} ₽
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* НАВИГАЦИЯ ПО ШАГАМ (ВНИЗУ) */}
                    <div className="pt-4 flex items-center justify-between border-t border-white/10">
                      {activeStep > 1 ? (
                        <button
                          onClick={() => setActiveStep(prev => prev - 1)}
                          className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Назад</span>
                        </button>
                      ) : <div />}

                      {activeStep < 5 ? (
                        <button
                          onClick={() => setActiveStep(prev => prev + 1)}
                          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
                        >
                          <span>Далее: {STEPS[activeStep].label.split(" ")[1]}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCopyAndOrder("avito")}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-xs font-black text-slate-950 flex items-center gap-1.5 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Конфигурация готова к заказу</span>
                        </button>
                      )}
                    </div>

                  </div>

                </div>

                {/* ПРАВАЯ КОЛОНКА (5 КОЛОНОК): ФИКСИРОВАННЫЙ ДАШБОРД СМЕТЫ */}
                <div className="lg:col-span-5 xl:col-span-4 rounded-2xl bg-black/60 border border-white/10 p-5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Спецификация кастома
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
                      STINGER Custom 2026
                    </span>
                  </div>

                  {/* Список компонентов с возможностью клика для перехода к шагу */}
                  <div className="space-y-2.5 text-xs">
                    <button
                      onClick={() => setActiveStep(1)}
                      className="w-full text-left flex justify-between items-start gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-slate-400 shrink-0">GPU:</span>
                      <span className="font-semibold text-white text-right break-words">{selectedGpu.name}</span>
                    </button>

                    <button
                      onClick={() => setActiveStep(2)}
                      className="w-full text-left flex justify-between items-start gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-slate-400 shrink-0">CPU:</span>
                      <span className="font-semibold text-white text-right break-words">{selectedCpu.name}</span>
                    </button>

                    <button
                      onClick={() => setActiveStep(3)}
                      className="w-full text-left flex justify-between items-start gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-slate-400 shrink-0">RAM:</span>
                      <span className="font-semibold text-white text-right">{selectedRam.name}</span>
                    </button>

                    <button
                      onClick={() => setActiveStep(4)}
                      className="w-full text-left flex justify-between items-start gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-slate-400 shrink-0">SSD:</span>
                      <span className="font-semibold text-white text-right">{selectedSsd.name}</span>
                    </button>

                    <button
                      onClick={() => setActiveStep(5)}
                      className="w-full text-left flex justify-between items-start gap-2 p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="text-slate-400 shrink-0">Кейс:</span>
                      <span className="font-semibold text-white text-right">{selectedCase.name}</span>
                    </button>

                    {/* Базовая платформа */}
                    <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-cyan-400 font-medium">Базовая платформа:</span>
                        <span className="font-mono text-cyan-300 font-bold">
                          {basePlatformCost.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Плата + Кулер 4-6 трубок + БП 500-750W + паста MX-4 + Windows 11 Pro + 24ч тест
                      </p>
                    </div>
                  </div>

                  {/* Предупреждение о предоплате от 100 000 ₽ */}
                  {isPrepayment && (
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Сборка от 100к (по предоплате):</strong> фото/видео отчет стресс-тестов перед выдачей.
                      </div>
                    </div>
                  )}

                  {/* Оценка FPS */}
                  <div className="p-3 rounded-xl bg-black/80 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-mono flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                        CP2077 (1080p Ultra):
                      </span>
                      <span className="font-extrabold font-mono text-cyan-400 text-sm">
                        ~{currentFps} FPS
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                        animate={{ width: `${relativePercent}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Базовый ПК (~45)</span>
                      <span className="text-cyan-400 font-bold">Сборка (~{currentFps})</span>
                      <span>RTX 4090 (~150)</span>
                    </div>
                  </div>

                  {/* ИТОГОВАЯ ЦЕНА */}
                  <div className="pt-3 border-t border-white/10 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">Итого под ключ:</div>
                      <div className="text-2xl font-black font-gaming text-metallic">
                        <AnimatedCounter value={totalPrice} /> ₽
                      </div>
                    </div>
                    <div className="text-right text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Гарантия 3 мес.
                    </div>
                  </div>

                  {/* КНОПКИ ЗАКАЗА */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => handleCopyAndOrder("avito")}
                      className="w-full py-3.5 px-4 rounded-xl font-gaming font-bold text-xs bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] cursor-pointer"
                    >
                      <Copy className="w-4 h-4 stroke-[2.5]" />
                      <span>Скопировать и открыть Авито</span>
                    </button>

                    <button
                      onClick={() => handleCopyAndOrder("telegram")}
                      className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Написать мастеру в Telegram</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* РЕЖИМ 2: ЭКСПРЕСС-КВИЗ ЗА 1 МИНУТУ (АВТОМАТИЧЕСКИЙ РАЗМЕР БЕЗ ПУСТЫХ ПОЛОС) */}
            {mode === "quiz" && (
              <div className="w-full space-y-6 py-2">
                <div className="text-center mb-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30">
                    ⚡ Экспресс-заявка за 5 простых вопросов
                  </span>
                  <h3 className="text-2xl font-bold font-gaming text-white mt-2">
                    Подберем идеальную сборку под ваши задачи
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* 1. Бюджет */}
                  <div className="space-y-2">
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
                              ? "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                              : "bg-black/40 border-white/5 text-slate-300 hover:bg-black/60"
                          }`}
                        >
                          <div className="text-xs font-bold">{b.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{b.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Стиль корпуса */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-purple-400 uppercase tracking-wider block">
                      2. Внешний вид и стиль корпуса:
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
                              ? "bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                              : "bg-black/40 border-white/5 text-slate-300 hover:bg-black/60"
                          }`}
                        >
                          <div className="text-xs font-bold">{s.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{s.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Задачи */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
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
                              ? "bg-cyan-600/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                              : "bg-black/40 border-white/5 text-slate-300 hover:bg-black/60"
                          }`}
                        >
                          <div className="text-xs font-bold">{t.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. Получение */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-indigo-400 uppercase tracking-wider block">
                      4. Способ получения:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        { id: "pickup", label: "Самовывоз в Великом Новгороде", desc: "ул. Псковская, 33 (личные тесты при вас)" },
                        { id: "delivery", label: "Авито Доставка / СДЭК", desc: "Бронебойная упаковка по всей РФ" },
                      ].map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setQuizDelivery(d.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            quizDelivery === d.id
                              ? "bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                              : "bg-black/40 border-white/5 text-slate-300 hover:bg-black/60"
                          }`}
                        >
                          <div className="text-xs font-bold">{d.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{d.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. Wi-Fi / Bluetooth */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <div>
                      <div className="text-xs font-bold text-white">Добавить быстрый Wi-Fi 6 и Bluetooth адаптер?</div>
                      <div className="text-[11px] text-slate-400">Для беспроводных геймпадов, наушников и интернета</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuizWifi(!quizWifi)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${
                        quizWifi ? "bg-indigo-600" : "bg-slate-700"
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

                {/* Отправить опрос */}
                <div className="pt-4 border-t border-white/10">
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
                    className="w-full py-4 px-6 rounded-2xl font-gaming font-extrabold text-sm sm:text-base bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(99,102,241,0.4)] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Отправить параметры в Авито и получить варианты</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
