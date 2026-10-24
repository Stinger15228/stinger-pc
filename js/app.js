/**
 * STINGER PC — Интерактивный функционал и анимации
 * (Включает: живой график сравнения самоличной сборки, честные бейджи FPS, 
 * учет сборок >100к по предоплате, каскадные анимации)
 */

document.addEventListener("DOMContentLoaded", () => {
  initStoreInfo();
  initMouseGlow();
  initScrollReveal();
  initCycleTicker();
  initCustomConfigurator();
  initCategories();
  renderProducts("all");
  initBenchmarks();
  initCustomOrderModal();
  initProductModal();
  initFAQ();
  lucide.createIcons();
});

// Форматирование цены (71725 -> 71 725 ₽)
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

// Плавный неоновый курсор
function initMouseGlow() {
  const glow = document.querySelector(".mouse-glow");
  if (!glow) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// Каскадная анимация скролла (Stagger Scroll Reveal)
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");

        // Если это контейнер карточек, анимируем карточки с поочередной задержкой
        const children = entry.target.querySelectorAll(".stagger-card");
        children.forEach((child, idx) => {
          setTimeout(() => {
            child.classList.add("revealed");
          }, idx * 120);
        });

        // Анимация чисел
        const counters = entry.target.querySelectorAll("[data-counter]");
        counters.forEach(counter => animateCounter(counter));
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));
}

// Анимация чисел
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = "true";

  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = 0;
  const startTime = performance.now();

  function updateNumber(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(updateNumber);
}

// Заполнение контактов и адресов
function initStoreInfo() {
  document.querySelectorAll("[data-store-name]").forEach(el => el.textContent = CONFIG.shop.name);
  document.querySelectorAll("[data-store-tagline]").forEach(el => el.textContent = CONFIG.shop.tagline);
  document.querySelectorAll("[data-store-address]").forEach(el => el.textContent = `${CONFIG.shop.city}, ${CONFIG.shop.address}`);

  document.querySelectorAll(".link-avito").forEach(el => {
    el.href = CONFIG.contacts.avitoUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".link-tg").forEach(el => {
    el.href = CONFIG.contacts.telegramUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  document.querySelectorAll(".link-vk").forEach(el => {
    el.href = CONFIG.contacts.vkUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  const featuresContainer = document.getElementById("features-grid");
  if (featuresContainer && CONFIG.features) {
    featuresContainer.innerHTML = CONFIG.features.map((f, i) => `
      <div class="glass-panel p-6 rounded-3xl flex flex-col justify-between reveal-on-scroll stagger-card shine-card">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
          <i data-lucide="${f.icon}" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="text-base sm:text-lg font-bold text-white mb-2 font-tech tracking-wide">${f.title}</h3>
          <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${f.desc}</p>
        </div>
      </div>
    `).join("");
  }
}

/* ========================================================
   ТИКЕР СПЕЦИФИКАЦИЙ В БАННЕРЕ
======================================================== */

let tickerIndex = 0;

function initCycleTicker() {
  const examples = CONFIG.cycleExamples;
  if (!examples || !examples.length) return;

  const gpuEl = document.getElementById("ticker-gpu");
  const cpuEl = document.getElementById("ticker-cpu");
  const ramEl = document.getElementById("ticker-ram");
  const coolEl = document.getElementById("ticker-cooling");

  if (!gpuEl || !cpuEl) return;

  function updateTicker() {
    const item = examples[tickerIndex];
    tickerIndex = (tickerIndex + 1) % examples.length;

    typeText(gpuEl, item.gpu);
    typeText(cpuEl, item.cpu);
    typeText(ramEl, item.ram);
    typeText(coolEl, item.cooling);
  }

  updateTicker();
  setInterval(updateTicker, 3800);
}

function typeText(element, text) {
  element.style.opacity = "0.3";
  setTimeout(() => {
    element.innerHTML = `${text}<span class="typing-cursor"></span>`;
    element.style.opacity = "1";
  }, 200);
}

/* ========================================================
   САМОЛИЧНАЯ СБОРКА: ИНТЕРАКТИВНЫЙ КОНФИГУРАТОР
   С ЖИВЫМ ГРАФИКОМ СРАВНЕНИЯ И ПРЕДОПЛАТОЙ > 100K
======================================================== */

const userBuildState = {
  task: "aaa",
  gpu: "rtx3080",
  cpu: "r5_5600x",
  ram: "ram16_d4",
  ssd: "ssd1000",
  case: "stinger_black",
  compareGame: "cyberpunk"
};

function initCustomConfigurator() {
  renderConfiguratorControls();
  updateLiveCustomComparison();
}

function renderConfiguratorControls() {
  const opt = CONFIG.configuratorOptions;
  if (!opt) return;

  // 1. Задачи
  const taskEl = document.getElementById("cfg-input-tasks");
  if (taskEl) {
    taskEl.innerHTML = opt.tasks.map(t => `
      <div 
        onclick="setUserBuildOption('task', '${t.id}', this)"
        class="cfg-option-item p-3.5 rounded-2xl flex items-center justify-between gap-3 ${userBuildState.task === t.id ? 'active' : ''}"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <i data-lucide="${t.icon}" class="w-4 h-4"></i>
          </div>
          <div class="truncate">
            <div class="text-xs sm:text-sm font-bold text-white truncate">${t.name}</div>
            <div class="text-[11px] text-slate-400 truncate">${t.sub}</div>
          </div>
        </div>
        <span class="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0 ${userBuildState.task === t.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'} transition-all"></span>
      </div>
    `).join("");
  }

  // 2. Видеокарты (GPU)
  const gpuEl = document.getElementById("cfg-input-gpus");
  if (gpuEl) {
    gpuEl.innerHTML = opt.gpus.map(g => `
      <div 
        onclick="setUserBuildOption('gpu', '${g.id}', this)"
        class="cfg-option-item p-3 rounded-2xl flex items-center justify-between gap-2.5 ${userBuildState.gpu === g.id ? 'active' : ''}"
      >
        <div class="min-w-0 truncate">
          <div class="text-xs sm:text-sm font-bold text-white truncate">${g.name}</div>
          <div class="text-[11px] text-purple-400 font-semibold">${g.tier}</div>
        </div>
        <div class="text-right shrink-0">
          <span class="text-xs font-bold text-slate-300 block font-tech">~${formatPrice(g.price)}</span>
          <span class="w-2 h-2 rounded-full bg-purple-400 inline-block ${userBuildState.gpu === g.id ? 'opacity-100' : 'opacity-0'}"></span>
        </div>
      </div>
    `).join("");
  }

  // 3. Процессоры (CPU)
  const cpuEl = document.getElementById("cfg-input-cpus");
  if (cpuEl) {
    cpuEl.innerHTML = opt.cpus.map(c => `
      <div 
        onclick="setUserBuildOption('cpu', '${c.id}', this)"
        class="cfg-option-item p-2.5 px-3.5 rounded-2xl flex items-center justify-between gap-2 ${userBuildState.cpu === c.id ? 'active' : ''}"
      >
        <div class="min-w-0 truncate">
          <div class="text-xs sm:text-sm font-bold text-white truncate">${c.name}</div>
          <div class="text-[10px] text-slate-400">${c.tag}</div>
        </div>
        <span class="text-xs font-bold text-slate-300 shrink-0 font-tech">~${formatPrice(c.price)}</span>
      </div>
    `).join("");
  }

  // 4. Память RAM
  const ramEl = document.getElementById("cfg-input-ram");
  if (ramEl) {
    ramEl.innerHTML = opt.ram.map(r => `
      <div 
        onclick="setUserBuildOption('ram', '${r.id}', this)"
        class="cfg-option-item p-3 rounded-2xl flex items-center justify-between gap-2 ${userBuildState.ram === r.id ? 'active' : ''}"
      >
        <div class="min-w-0 truncate">
          <div class="text-xs font-bold text-white truncate">${r.name}</div>
        </div>
        <span class="text-xs font-bold text-slate-400 shrink-0 font-tech">~${formatPrice(r.price)}</span>
      </div>
    `).join("");
  }

  // 5. SSD
  const ssdEl = document.getElementById("cfg-input-ssd");
  if (ssdEl) {
    ssdEl.innerHTML = opt.ssd.map(s => `
      <div 
        onclick="setUserBuildOption('ssd', '${s.id}', this)"
        class="cfg-option-item p-3 rounded-2xl flex items-center justify-between gap-2 ${userBuildState.ssd === s.id ? 'active' : ''}"
      >
        <div class="min-w-0 truncate">
          <div class="text-xs font-bold text-white truncate">${s.name}</div>
        </div>
        <span class="text-xs font-bold text-slate-400 shrink-0 font-tech">~${formatPrice(s.price)}</span>
      </div>
    `).join("");
  }

  // 6. Корпус
  const casesEl = document.getElementById("cfg-input-cases");
  if (casesEl) {
    casesEl.innerHTML = opt.cases.map(cs => `
      <div 
        onclick="setUserBuildOption('case', '${cs.id}', this)"
        class="cfg-option-item p-3 rounded-2xl flex items-center justify-between gap-2 ${userBuildState.case === cs.id ? 'active' : ''}"
      >
        <div class="flex items-center gap-2 min-w-0 truncate">
          <i data-lucide="${cs.icon}" class="w-4 h-4 text-purple-400 shrink-0"></i>
          <span class="text-xs font-bold text-white truncate">${cs.name}</span>
        </div>
        <span class="text-xs font-bold text-slate-400 shrink-0 font-tech">~${formatPrice(cs.price)}</span>
      </div>
    `).join("");
  }

  lucide.createIcons();
}

window.setUserBuildOption = function(group, id) {
  userBuildState[group] = id;
  renderConfiguratorControls();
  updateLiveCustomComparison();
};

window.setCompareGame = function(gameId, btn) {
  userBuildState.compareGame = gameId;
  document.querySelectorAll(".cfg-game-tab").forEach(b => {
    b.className = "cfg-game-tab px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-slate-900 border border-white/10 text-slate-400 hover:text-white";
  });
  btn.className = "cfg-game-tab px-3 py-1.5 rounded-xl text-xs font-bold transition-all bg-purple-600 text-white shadow-lg shadow-purple-500/25";
  updateLiveCustomComparison();
};

function updateLiveCustomComparison() {
  const opt = CONFIG.configuratorOptions;
  const currentGpu = opt.gpus.find(g => g.id === userBuildState.gpu) || opt.gpus[0];
  const currentCpu = opt.cpus.find(c => c.id === userBuildState.cpu) || opt.cpus[0];
  const currentRam = opt.ram.find(r => r.id === userBuildState.ram) || opt.ram[0];
  const currentSsd = opt.ssd.find(s => s.id === userBuildState.ssd) || opt.ssd[0];
  const currentCase = opt.cases.find(c => c.id === userBuildState.case) || opt.cases[0];

  // 1. Расчет бюджета сборки
  const baseComponentsCost = 25000; // Материнка, БП, кулер, сборка и стресс-тесты
  const totalCost = currentGpu.price + currentCpu.price + currentRam.price + currentSsd.price + currentCase.price + baseComponentsCost;
  const isPrepayment = totalCost >= 100000;

  // Обновляем плашку цены и предоплаты
  const priceEl = document.getElementById("cfg-total-price");
  const prepaymentAlert = document.getElementById("cfg-prepayment-alert");
  if (priceEl) priceEl.textContent = `~ ${formatPrice(totalCost)}`;

  if (prepaymentAlert) {
    if (isPrepayment) {
      prepaymentAlert.classList.remove("hidden");
    } else {
      prepaymentAlert.classList.add("hidden");
    }
  }

  // 2. Расчет FPS для самоличной сборки
  const game = userBuildState.compareGame;
  const gpuBaseFps = (currentGpu.fpsMap && currentGpu.fpsMap[game]) || 60;
  const cpuFactor = (currentCpu.score / 35) * 1.05;
  const userBuildFps = Math.round(gpuBaseFps * (0.85 + cpuFactor * 0.15));

  // 3. Данные сравнения: Базовый ПК vs ВАША СБОРКА vs Флагман 4090
  const baselineFpsMap = { cyberpunk: 28, cs2: 95, gta5: 50, dota2: 95, rdr2: 26, rust: 35 };
  const flagshipFpsMap = { cyberpunk: 145, cs2: 440, gta5: 210, dota2: 390, rdr2: 150, rust: 175 };

  const baselineFps = baselineFpsMap[game] || 30;
  const flagshipFps = flagshipFpsMap[game] || 150;
  const maxChartFps = Math.max(flagshipFps + 20, userBuildFps + 20);

  const baselinePct = Math.round((baselineFps / maxChartFps) * 100);
  const userPct = Math.min(100, Math.round((userBuildFps / maxChartFps) * 100));
  const flagshipPct = Math.round((flagshipFps / maxChartFps) * 100);

  // Обновляем бары сравнения
  const baseBar = document.getElementById("cfg-bar-baseline");
  const baseFpsEl = document.getElementById("cfg-fps-baseline");
  if (baseBar) baseBar.style.width = baselinePct + "%";
  if (baseFpsEl) baseFpsEl.textContent = `${baselineFps} FPS`;

  const userBar = document.getElementById("cfg-bar-user");
  const userFpsEl = document.getElementById("cfg-fps-user");
  const userBuildName = document.getElementById("cfg-compare-build-name");
  if (userBar) userBar.style.width = userPct + "%";
  if (userFpsEl) userFpsEl.textContent = `${userBuildFps} FPS`;
  if (userBuildName) userBuildName.textContent = `ВАША СБОРКА (${currentGpu.name.replace('NVIDIA ', '').replace('GeForce ', '')} + ${currentCpu.name.split(' (')[0]})`;

  const flagBar = document.getElementById("cfg-bar-flagship");
  const flagFpsEl = document.getElementById("cfg-fps-flagship");
  if (flagBar) flagBar.style.width = flagshipPct + "%";
  if (flagFpsEl) flagFpsEl.textContent = `${flagshipFps} FPS`;

  // Оценка комфорта для вашей сборки (Честный бейдж!)
  const userComfortBadge = document.getElementById("cfg-user-comfort-badge");
  if (userComfortBadge) {
    const badge = getComfortBadge(userBuildFps);
    userComfortBadge.textContent = badge.text;
    userComfortBadge.className = `text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${badge.className}`;
  }

  // Обновляем список выбранных комплектующих
  const summaryEl = document.getElementById("cfg-selected-specs-summary");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="flex items-center gap-2"><i data-lucide="layers" class="w-3.5 h-3.5 text-purple-400 shrink-0"></i> <span class="text-white font-medium truncate">${currentGpu.name}</span></div>
      <div class="flex items-center gap-2"><i data-lucide="cpu" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i> <span class="text-white font-medium truncate">${currentCpu.name}</span></div>
      <div class="flex items-center gap-2"><i data-lucide="hard-drive" class="w-3.5 h-3.5 text-amber-400 shrink-0"></i> <span class="text-white font-medium truncate">${currentRam.name} • ${currentSsd.name}</span></div>
      <div class="flex items-center gap-2"><i data-lucide="box" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i> <span class="text-slate-300 truncate">${currentCase.name}</span></div>
    `;
    lucide.createIcons();
  }
}

// Скопировать кастомную сборку и открыть Авито
window.copyCustomBuildAndGoToAvito = function() {
  const opt = CONFIG.configuratorOptions;
  const currentTask = opt.tasks.find(t => t.id === userBuildState.task);
  const currentGpu = opt.gpus.find(g => g.id === userBuildState.gpu);
  const currentCpu = opt.cpus.find(c => c.id === userBuildState.cpu);
  const currentRam = opt.ram.find(r => r.id === userBuildState.ram);
  const currentSsd = opt.ssd.find(s => s.id === userBuildState.ssd);
  const currentCase = opt.cases.find(c => c.id === userBuildState.case);

  const baseComponentsCost = 25000;
  const totalCost = currentGpu.price + currentCpu.price + currentRam.price + currentSsd.price + currentCase.price + baseComponentsCost;
  const isPrepayment = totalCost >= 100000;

  const score = Math.min(100, Math.round(currentGpu.score * 0.75 + currentCpu.score * 0.8));
  const prepaymentNote = isPrepayment ? "(Сборка по предоплате)" : "(В наличии / Быстрая сборка)";

  const message = CONFIG.configuratorMessageTemplate
    .replace("{task}", currentTask.name)
    .replace("{gpu}", currentGpu.name)
    .replace("{cpu}", currentCpu.name)
    .replace("{ram}", currentRam.name)
    .replace("{ssd}", currentSsd.name)
    .replace("{case}", currentCase.name)
    .replace("{estPrice}", formatPrice(totalCost))
    .replace("{prepaymentNote}", prepaymentNote)
    .replace("{score}", score)
    .replace("{res}", currentGpu.defRes || "1080p / 2K");

  navigator.clipboard.writeText(message).then(() => {
    showToast("✓ Конфигурация скопирована! Перенаправляем на Авито...");
    setTimeout(() => {
      window.open(CONFIG.contacts.avitoUrl, "_blank");
    }, 500);
  }).catch(() => {
    window.open(CONFIG.contacts.avitoUrl, "_blank");
  });
};

/* ========================================================
   ЧЕСТНАЯ ОЦЕНКА КОМФОРТА FPS (ИСПРАВЛЕНА ОШИБКА 35 FPS)
======================================================== */

function getComfortBadge(fps) {
  if (fps < 45) {
    return {
      text: "30–45 FPS Тяжелый режим",
      className: "text-rose-400 border-rose-500/30 bg-rose-950/40"
    };
  } else if (fps < 60) {
    return {
      text: "45–60 FPS Базовый гейминг",
      className: "text-amber-400 border-amber-500/30 bg-amber-950/40"
    };
  } else if (fps < 120) {
    return {
      text: "60+ FPS Комфортно / Плавно",
      className: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40"
    };
  } else if (fps < 240) {
    return {
      text: "144Hz Ультра-плавно",
      className: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40"
    };
  } else {
    return {
      text: "240Hz+ Киберспорт Топ",
      className: "text-yellow-400 border-yellow-500/30 bg-yellow-950/40"
    };
  }
}

/* ========================================================
   МОДАЛКА «СБОРКА НА ЗАКАЗ»
======================================================== */

const customOrderState = {
  delivery: "Самовывоз",
  wifi: "Нужен"
};

function initCustomOrderModal() {
  const modal = document.getElementById("custom-order-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeCustomOrderModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeCustomOrderModal();
    }
  });
}

window.openCustomOrderModal = function() {
  const modal = document.getElementById("custom-order-modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  }
};

window.closeCustomOrderModal = function() {
  const modal = document.getElementById("custom-order-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

window.setDeliveryOption = function(val, btn) {
  customOrderState.delivery = val;
  document.querySelectorAll(".delivery-toggle-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
};

window.setWifiOption = function(val, btn) {
  customOrderState.wifi = val;
  document.querySelectorAll(".wifi-toggle-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
};

function buildCustomOrderText() {
  const budgetInput = document.getElementById("order-budget");
  const aestheticInput = document.getElementById("order-aesthetic");
  const hardwareInput = document.getElementById("order-hardware");

  const budget = (budgetInput && budgetInput.value.trim()) || "По рекомендации мастера";
  const aesthetic = (aestheticInput && aestheticInput.value.trim()) || "На усмотрение мастера";
  const hardware = (hardwareInput && hardwareInput.value.trim()) || "Максимальная производительность на мой бюджет";

  return CONFIG.customOrderTemplate
    .replace("{budget}", budget)
    .replace("{aesthetic}", aesthetic)
    .replace("{hardware}", hardware)
    .replace("{delivery}", customOrderState.delivery)
    .replace("{wifi}", customOrderState.wifi);
}

window.copyCustomOrder = function() {
  const text = buildCustomOrderText();
  navigator.clipboard.writeText(text).then(() => {
    showToast("✓ Заявка на сборку скопирована! Отправьте её нам в чат.");
  });
};

window.sendCustomOrderTo = function(channel) {
  const text = buildCustomOrderText();
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Заявка скопирована! Переходим в ${channel}...`);
    setTimeout(() => {
      if (channel === 'avito') window.open(CONFIG.contacts.avitoUrl, "_blank");
      if (channel === 'vk') window.open(CONFIG.contacts.vkUrl, "_blank");
      if (channel === 'tg') window.open(CONFIG.contacts.telegramUrl, "_blank");
    }, 400);
  }).catch(() => {
    if (channel === 'avito') window.open(CONFIG.contacts.avitoUrl, "_blank");
    if (channel === 'vk') window.open(CONFIG.contacts.vkUrl, "_blank");
    if (channel === 'tg') window.open(CONFIG.contacts.telegramUrl, "_blank");
  });
};

/* ========================================================
   ГРАФИКИ СРАВНЕНИЯ FPS (8 ИГР, 3 РАЗРЕШЕНИЯ)
======================================================== */

let benchmarkState = {
  game: "cyberpunk",
  res: "1080p"
};

function initBenchmarks() {
  renderBenchmarkTabs();
  renderBenchmarkChart();
}

function renderBenchmarkTabs() {
  const bm = CONFIG.benchmarks;
  if (!bm) return;

  const resContainer = document.getElementById("bm-res-tabs");
  if (resContainer) {
    resContainer.innerHTML = bm.resolutions.map(r => `
      <button 
        onclick="setBenchmarkRes('${r.id}', this)"
        class="bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
          benchmarkState.res === r.id 
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
            : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
        }"
      >
        ${r.name}
      </button>
    `).join("");
  }

  const gamesContainer = document.getElementById("bm-games-tabs");
  if (gamesContainer) {
    gamesContainer.innerHTML = bm.games.map(g => `
      <button 
        onclick="setBenchmarkGame('${g.id}', this)"
        class="bm-game-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          benchmarkState.game === g.id 
            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 font-black' 
            : 'bg-slate-900/90 border border-white/10 text-slate-400 hover:text-white hover:border-slate-700'
        }"
      >
        <span>${g.name}</span>
      </button>
    `).join("");
  }
}

window.setBenchmarkRes = function(resId, btn) {
  benchmarkState.res = resId;
  document.querySelectorAll(".bm-res-btn").forEach(b => {
    b.className = "bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900 border border-white/10 text-slate-400 hover:text-white";
  });
  btn.className = "bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-purple-600 text-white shadow-lg shadow-purple-600/30";
  renderBenchmarkChart();
};

window.setBenchmarkGame = function(gameId, btn) {
  benchmarkState.game = gameId;
  document.querySelectorAll(".bm-game-btn").forEach(b => {
    b.className = "bm-game-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-900/90 border border-white/10 text-slate-400 hover:text-white hover:border-slate-700";
  });
  btn.className = "bm-game-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 font-black";
  renderBenchmarkChart();
};

function renderBenchmarkChart() {
  const container = document.getElementById("bm-chart-bars");
  if (!container) return;

  const bm = CONFIG.benchmarks;
  const currentGame = bm.games.find(g => g.id === benchmarkState.game) || bm.games[0];
  const maxFps = currentGame.maxFps || 200;

  const gameBadge = document.getElementById("bm-game-badge");
  if (gameBadge) {
    gameBadge.textContent = `${currentGame.name} (${currentGame.badge}) • Разрешение: ${benchmarkState.res.toUpperCase()}`;
  }

  const builds = Object.entries(bm.scores);

  container.innerHTML = builds.map(([id, b]) => {
    const fpsVal = (b[benchmarkState.res] && b[benchmarkState.res][benchmarkState.game]) || 60;
    const pct = Math.min(100, Math.round((fpsVal / maxFps) * 100));

    // Честный бейдж комфорта
    const badge = getComfortBadge(fpsVal);

    return `
      <div class="space-y-2 p-3 sm:p-4 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-purple-500/30 transition-all shine-card">
        <div class="flex items-center justify-between text-xs sm:text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="font-bold text-white font-tech text-base sm:text-lg tracking-wide truncate">${b.name}</span>
            
            ${b.isPrepayment ? `
              <span class="badge-prepayment text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0">
                ⚡ По предоплате
              </span>
            ` : ''}

            <span class="text-[10px] px-2 py-0.5 rounded-full border ${badge.className} font-semibold shrink-0 hidden sm:inline-block">
              ${badge.text}
            </span>
          </div>
          <div class="text-right shrink-0">
            <span class="font-black text-cyan-400 font-tech text-xl sm:text-2xl">${fpsVal}</span>
            <span class="text-xs text-slate-500 font-medium">FPS</span>
          </div>
        </div>

        <div class="w-full h-3.5 sm:h-4 bg-black/80 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div 
            class="h-full rounded-full bg-gradient-to-r ${b.color} fps-bar-fill transition-all duration-700 ease-out"
            style="width: ${pct}%;"
          ></div>
        </div>
      </div>
    `;
  }).join("");
}

/* ========================================================
   ГОТОВЫЕ СБОРКИ В КАТАЛОГЕ (10 ПК)
======================================================== */

function initCategories() {
  const container = document.getElementById("categories-tabs");
  if (!container) return;

  container.innerHTML = CONFIG.categories.map((cat, idx) => {
    const isActive = idx === 0;
    return `
      <button 
        onclick="filterCategory('${cat.id}', this)"
        class="category-btn px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
          isActive 
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30' 
            : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
        }"
      >
        <span>${cat.name}</span>
      </button>
    `;
  }).join("");
}

window.filterCategory = function(catId, btnElement) {
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.className = "category-btn px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20";
  });
  btnElement.className = "category-btn px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30";

  renderProducts(catId);
  lucide.createIcons();
};

function renderProducts(catId = "all") {
  const container = document.getElementById("products-grid");
  if (!container) return;

  let filtered = CONFIG.products;
  if (catId === "under100") {
    filtered = CONFIG.products.filter(p => p.price < 100000);
  } else if (catId === "prepayment") {
    filtered = CONFIG.products.filter(p => p.isPrepayment || p.price >= 100000);
  } else if (catId === "start") {
    filtered = CONFIG.products.filter(p => p.price <= 45000);
  }

  container.innerHTML = filtered.map((product, idx) => {
    const fpsHtml = (product.fps || []).slice(0, 3).map(f => `
      <div class="bg-black/50 border border-white/5 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs">
        <span class="text-slate-400 truncate pr-2">${f.game}</span>
        <span class="text-cyan-400 font-bold font-tech text-sm tracking-wide shrink-0">${f.fps}</span>
      </div>
    `).join("");

    const isPrepay = product.isPrepayment || product.price >= 100000;

    return `
      <div class="glow-card-black rounded-3xl overflow-hidden flex flex-col group border border-white/10 hover:border-purple-500/40 shine-card reveal-on-scroll stagger-card" style="transition-delay: ${idx * 60}ms;">
        <!-- Фото -->
        <div class="relative h-64 sm:h-72 overflow-hidden bg-black cursor-pointer" onclick="openProductModal('${product.id}')">
          <img 
            src="${product.primaryImage}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onerror="this.src='image/logo.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-90"></div>

          <!-- Бейджи -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            ${isPrepay ? `
              <span class="badge-prepayment px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1">
                <span>⚡</span> ПО ПРЕДОПЛАТЕ
              </span>
            ` : `
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></span>
                В наличии
              </span>
            `}

            ${product.badge && !isPrepay ? `
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                ${product.badge}
              </span>
            ` : ''}
          </div>

          <div class="absolute bottom-3 right-3">
            <span class="px-2.5 py-1 rounded-lg text-xs bg-black/70 border border-white/10 text-slate-300 backdrop-blur-md flex items-center gap-1">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>Спеки</span>
            </span>
          </div>
        </div>

        <!-- Контент -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="mb-3">
              <div class="flex items-center justify-between gap-2 mb-1">
                <h3 class="text-xl font-bold text-white font-tech tracking-wide group-hover:text-purple-400 transition-colors">
                  ${product.name}
                </h3>
                <span class="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                  ${product.condition || 'Новое'}
                </span>
              </div>
              <p class="text-xs text-slate-400">${product.subtitle || ''}</p>
            </div>

            <!-- Главные спеки -->
            <div class="space-y-2 mb-4 text-xs sm:text-sm">
              <div class="p-2 rounded-xl flex items-center gap-2.5 bg-white/5 border border-white/5">
                <i data-lucide="cpu" class="w-4 h-4 text-cyan-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">CPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.cpu}</span>
              </div>
              <div class="p-2 rounded-xl flex items-center gap-2.5 bg-white/5 border border-white/5">
                <i data-lucide="layers" class="w-4 h-4 text-amber-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">GPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.gpu}</span>
              </div>
              <div class="p-2 rounded-xl flex items-center gap-2.5 bg-white/5 border border-white/5">
                <i data-lucide="hard-drive" class="w-4 h-4 text-purple-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">RAM/SSD:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.ram} • ${product.specs.ssd}</span>
              </div>
            </div>

            <!-- FPS блок -->
            <div class="mb-5">
              <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <i data-lucide="gamepad-2" class="w-3.5 h-3.5 text-purple-400"></i>
                <span>Тесты производительности:</span>
              </div>
              <div class="grid grid-cols-1 gap-1.5">
                ${fpsHtml}
              </div>
            </div>
          </div>

          <!-- Нижняя панель: Цена + Кнопки -->
          <div class="pt-4 border-t border-white/10">
            <div class="flex items-baseline justify-between mb-4">
              <div>
                <span class="text-[11px] text-slate-500 block uppercase font-bold tracking-wider">
                  ${isPrepay ? 'Стоимость сборки (Предоплата)' : 'Стоимость сборки'}
                </span>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl sm:text-3xl font-black text-white font-tech tracking-tight">
                    ${formatPrice(product.price)}
                  </span>
                  ${product.oldPrice ? `
                    <span class="text-xs sm:text-sm text-slate-500 line-through">
                      ${formatPrice(product.oldPrice)}
                    </span>
                  ` : ''}
                </div>
              </div>

              <button 
                onclick="openProductModal('${product.id}')"
                class="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4 flex items-center gap-1 font-semibold"
              >
                Все спеки
                <i data-lucide="chevron-right" class="w-3 h-3"></i>
              </button>
            </div>

            <!-- Кнопка заказа -->
            <button 
              onclick="copyProductAndGoToAvito('${product.id}')"
              class="w-full ${isPrepay ? 'btn-purple-glow' : 'btn-blue-rounded'} py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 mb-2 shadow-lg"
            >
              <i data-lucide="message-square" class="w-4 h-4"></i>
              <span>${isPrepay ? 'Заказать по предоплате' : 'Заказать через Авито'}</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5 opacity-80"></i>
            </button>

            <!-- Кнопка копирования -->
            <button 
              onclick="copyProductSpecOnly('${product.id}', this)"
              class="w-full py-2 px-3 rounded-xl text-[11px] font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1.5 transition-all"
            >
              <i data-lucide="copy" class="w-3 h-3"></i>
              <span>Скопировать спецификацию в буфер</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

window.copyProductAndGoToAvito = function(productId) {
  const product = CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  const isPrepay = product.isPrepayment || product.price >= 100000;
  const prepayNote = isPrepay ? "\n(Сборка по предоплате)" : "";

  const text = CONFIG.avitoMessageTemplate
    .replace("{name}", product.name + prepayNote)
    .replace("{price}", formatPrice(product.price))
    .replace("{cpu}", product.specs.cpu)
    .replace("{gpu}", product.specs.gpu)
    .replace("{ram}", product.specs.ram)
    .replace("{ssd}", product.specs.ssd);

  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Спецификация «${product.name}» скопирована! Переходим на Авито...`);
    setTimeout(() => {
      window.open(product.avitoUrl || CONFIG.contacts.avitoUrl, "_blank");
    }, 500);
  }).catch(() => {
    window.open(product.avitoUrl || CONFIG.contacts.avitoUrl, "_blank");
  });
};

window.copyProductSpecOnly = function(productId, btnElement) {
  const product = CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  const text = CONFIG.avitoMessageTemplate
    .replace("{name}", product.name)
    .replace("{price}", formatPrice(product.price))
    .replace("{cpu}", product.specs.cpu)
    .replace("{gpu}", product.specs.gpu)
    .replace("{ram}", product.specs.ram)
    .replace("{ssd}", product.specs.ssd);

  navigator.clipboard.writeText(text).then(() => {
    showToast(`✓ Спецификация скопирована в буфер обмена!`);
    if (btnElement) {
      const orig = btnElement.innerHTML;
      btnElement.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i><span class="text-emerald-400 font-bold">Скопировано!</span>`;
      lucide.createIcons();
      setTimeout(() => {
        btnElement.innerHTML = orig;
        lucide.createIcons();
      }, 2000);
    }
  });
};

/* ========================================================
   МОДАЛКА ТОВАРА
======================================================== */

let currentModalGallery = [];
let currentGalleryIdx = 0;

function initProductModal() {
  const overlay = document.getElementById("product-modal");
  if (!overlay) return;

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProductModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeProductModal();
    }
  });
}

window.openProductModal = function(productId) {
  const product = CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("product-modal");
  if (!modal) return;

  currentModalGallery = product.gallery || [product.primaryImage];
  currentGalleryIdx = 0;

  document.getElementById("modal-title").textContent = product.name;
  document.getElementById("modal-subtitle").textContent = product.subtitle || "";
  document.getElementById("modal-price").textContent = formatPrice(product.price);
  
  const modalOldPrice = document.getElementById("modal-old-price");
  if (product.oldPrice) {
    modalOldPrice.textContent = formatPrice(product.oldPrice);
    modalOldPrice.classList.remove("hidden");
  } else {
    modalOldPrice.classList.add("hidden");
  }

  updateModalImage();

  const thumbsContainer = document.getElementById("modal-thumbnails");
  thumbsContainer.innerHTML = currentModalGallery.map((img, i) => `
    <button 
      onclick="setModalImageIndex(${i})"
      class="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
        i === 0 ? 'border-purple-400 scale-95' : 'border-white/10 opacity-60 hover:opacity-100'
      }"
      id="thumb-${i}"
    >
      <img src="${img}" class="w-full h-full object-cover" alt="Миниатюра ${i+1}"/>
    </button>
  `).join("");

  const specsContainer = document.getElementById("modal-specs-list");
  const labels = {
    cpu: "Процессор",
    gpu: "Видеокарта",
    ram: "Оперативная память",
    ssd: "Накопитель SSD",
    motherboard: "Материнская плата",
    cooling: "Охлаждение",
    power: "Блок питания",
    case: "Корпус",
    os: "Операционная система"
  };
  specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => `
    <div class="flex items-start justify-between py-2 border-b border-white/5 text-sm">
      <span class="text-slate-400 font-medium shrink-0 mr-4">${labels[key] || key}:</span>
      <span class="text-white text-right font-medium">${val}</span>
    </div>
  `).join("");

  const modalFpsContainer = document.getElementById("modal-fps-list");
  if (modalFpsContainer && product.fps) {
    modalFpsContainer.innerHTML = product.fps.map(f => `
      <div class="bg-black/60 border border-white/10 rounded-2xl p-3 flex items-center justify-between">
        <div>
          <div class="font-medium text-white text-sm">${f.game}</div>
          <div class="text-xs text-slate-500">${f.quality || 'Ультра'}</div>
        </div>
        <div class="text-cyan-400 font-tech font-bold text-lg">${f.fps}</div>
      </div>
    `).join("");
  }

  document.getElementById("modal-description").textContent = product.description || "";

  const copyBtn = document.getElementById("modal-copy-btn");
  copyBtn.onclick = () => copyProductSpecOnly(product.id, copyBtn);

  const avitoBtn = document.getElementById("modal-avito-btn");
  avitoBtn.onclick = () => copyProductAndGoToAvito(product.id);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
};

window.closeProductModal = function() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

window.setModalImageIndex = function(index) {
  currentGalleryIdx = index;
  updateModalImage();

  currentModalGallery.forEach((_, i) => {
    const thumb = document.getElementById(`thumb-${i}`);
    if (thumb) {
      thumb.className = i === index 
        ? "w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-400 scale-95 transition-all shrink-0" 
        : "w-16 h-16 rounded-xl overflow-hidden border-2 border-white/10 opacity-60 hover:opacity-100 transition-all shrink-0";
    }
  });
};

function updateModalImage() {
  const imgEl = document.getElementById("modal-main-image");
  if (imgEl && currentModalGallery[currentGalleryIdx]) {
    imgEl.src = currentModalGallery[currentGalleryIdx];
  }
}

// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("show");

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// FAQ
function initFAQ() {
  const container = document.getElementById("faq-accordion");
  if (!container || !CONFIG.faq) return;

  container.innerHTML = CONFIG.faq.map((item, idx) => `
    <div class="glow-card-black rounded-2xl border border-white/10 overflow-hidden reveal-on-scroll">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-5 text-left flex items-center justify-between font-tech font-bold text-base sm:text-lg text-white hover:text-purple-400 transition-colors"
      >
        <span>${item.q}</span>
        <i id="faq-icon-${idx}" data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-content-${idx}" class="hidden px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
        ${item.a}
      </div>
    </div>
  `).join("");
}

window.toggleFAQ = function(idx) {
  const content = document.getElementById(`faq-content-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (!content) return;

  const isHidden = content.classList.contains("hidden");
  content.classList.toggle("hidden", !isHidden);
  if (icon) {
    icon.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
  }
};
