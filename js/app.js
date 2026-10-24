/**
 * STINGER PC — Высокотехнологичная интерактивная логика
 * (Конфигуратор, Графики сравнения, Анимации, Авито-интеграция)
 */

document.addEventListener("DOMContentLoaded", () => {
  initStoreInfo();
  initMouseGlow();
  initCategories();
  renderProducts("all");
  initConfigurator();
  initBenchmarks();
  initFAQ();
  initModal();
  lucide.createIcons();
});

// Форматирование цены (71725 -> 71 725 ₽)
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

// Плавный световой курсор
function initMouseGlow() {
  const glow = document.querySelector(".mouse-glow");
  if (!glow) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// Заполнение контактов и общей информации о магазине
function initStoreInfo() {
  document.querySelectorAll("[data-store-name]").forEach(el => el.textContent = CONFIG.shop.name);
  document.querySelectorAll("[data-store-tagline]").forEach(el => el.textContent = CONFIG.shop.tagline);
  document.querySelectorAll("[data-store-address]").forEach(el => el.textContent = `${CONFIG.shop.city}, ${CONFIG.shop.address}`);
  
  const avitoLinks = document.querySelectorAll(".link-avito");
  avitoLinks.forEach(el => {
    el.href = CONFIG.contacts.avitoUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  const tgLinks = document.querySelectorAll(".link-tg");
  tgLinks.forEach(el => {
    el.href = CONFIG.contacts.telegramUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  const vkLinks = document.querySelectorAll(".link-vk");
  vkLinks.forEach(el => {
    el.href = CONFIG.contacts.vkUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  // Заполнение фич
  const featuresContainer = document.getElementById("features-grid");
  if (featuresContainer && CONFIG.features) {
    featuresContainer.innerHTML = CONFIG.features.map(f => `
      <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
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
   ИНТЕРАКТИВНЫЙ КОНФИГУРАТОР ПК (CUSTOM BUILDER)
======================================================== */

const configuratorState = {
  task: "esports",
  gpu: "rtx3080",
  cpu: "r5_5600x",
  ram: "ram16",
  ssd: "ssd1000",
  case: "stinger_black"
};

function initConfigurator() {
  renderConfigOptions();
  updateConfiguratorPreview();
}

function renderConfigOptions() {
  const opt = CONFIG.configuratorOptions;
  if (!opt) return;

  // 1. Задачи
  const tasksContainer = document.getElementById("config-tasks");
  if (tasksContainer) {
    tasksContainer.innerHTML = opt.tasks.map(t => `
      <div 
        onclick="selectConfigOption('task', '${t.id}', this)"
        class="config-option p-4 rounded-xl flex items-start gap-3 ${configuratorState.task === t.id ? 'active' : ''}"
      >
        <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
          <i data-lucide="${t.icon}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-bold text-white text-sm flex items-center justify-between">
            <span>${t.name}</span>
            <span class="w-2 h-2 rounded-full bg-cyan-400 check-indicator transition-all ${configuratorState.task === t.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"></span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">${t.sub}</p>
        </div>
      </div>
    `).join("");
  }

  // 2. Видеокарты (GPU)
  const gpusContainer = document.getElementById("config-gpus");
  if (gpusContainer) {
    gpusContainer.innerHTML = opt.gpus.map(g => `
      <div 
        onclick="selectConfigOption('gpu', '${g.id}', this)"
        class="config-option p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 ${configuratorState.gpu === g.id ? 'active' : ''}"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <i data-lucide="layers" class="w-4 h-4"></i>
          </div>
          <div class="truncate">
            <div class="font-bold text-white text-xs sm:text-sm truncate">${g.name}</div>
            <div class="text-[11px] text-cyan-400">${g.tier}</div>
          </div>
        </div>
        <span class="w-2 h-2 rounded-full bg-cyan-400 check-indicator shrink-0 transition-all ${configuratorState.gpu === g.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"></span>
      </div>
    `).join("");
  }

  // 3. Процессоры (CPU)
  const cpusContainer = document.getElementById("config-cpus");
  if (cpusContainer) {
    cpusContainer.innerHTML = opt.cpus.map(c => `
      <div 
        onclick="selectConfigOption('cpu', '${c.id}', this)"
        class="config-option p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 ${configuratorState.cpu === c.id ? 'active' : ''}"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <i data-lucide="cpu" class="w-4 h-4"></i>
          </div>
          <div class="truncate">
            <div class="font-bold text-white text-xs sm:text-sm truncate">${c.name}</div>
            <div class="text-[11px] text-slate-400">${c.tag}</div>
          </div>
        </div>
        <span class="w-2 h-2 rounded-full bg-cyan-400 check-indicator shrink-0 transition-all ${configuratorState.cpu === c.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"></span>
      </div>
    `).join("");
  }

  // 4. Память RAM
  const ramContainer = document.getElementById("config-ram");
  if (ramContainer) {
    ramContainer.innerHTML = opt.ram.map(r => `
      <div 
        onclick="selectConfigOption('ram', '${r.id}', this)"
        class="config-option p-3.5 rounded-xl flex items-center justify-between ${configuratorState.ram === r.id ? 'active' : ''}"
      >
        <div class="min-w-0">
          <div class="font-bold text-white text-xs sm:text-sm truncate">${r.name}</div>
          <div class="text-[11px] text-slate-400">${r.tag}</div>
        </div>
        <span class="w-2 h-2 rounded-full bg-cyan-400 check-indicator shrink-0 transition-all ${configuratorState.ram === r.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"></span>
      </div>
    `).join("");
  }

  // 5. Накопитель SSD
  const ssdContainer = document.getElementById("config-ssd");
  if (ssdContainer) {
    ssdContainer.innerHTML = opt.ssd.map(s => `
      <div 
        onclick="selectConfigOption('ssd', '${s.id}', this)"
        class="config-option p-3.5 rounded-xl flex items-center justify-between ${configuratorState.ssd === s.id ? 'active' : ''}"
      >
        <div class="min-w-0">
          <div class="font-bold text-white text-xs sm:text-sm truncate">${s.name}</div>
          <div class="text-[11px] text-slate-400">${s.tag}</div>
        </div>
        <span class="w-2 h-2 rounded-full bg-cyan-400 check-indicator shrink-0 transition-all ${configuratorState.ssd === s.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"></span>
      </div>
    `).join("");
  }

  // 6. Корпус
  const casesContainer = document.getElementById("config-cases");
  if (casesContainer) {
    casesContainer.innerHTML = opt.cases.map(cs => `
      <div 
        onclick="selectConfigOption('case', '${cs.id}', this)"
        class="config-option p-3.5 rounded-xl flex items-center justify-between ${configuratorState.case === cs.id ? 'active' : ''}"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <i data-lucide="${cs.icon}" class="w-4 h-4 text-purple-400 shrink-0"></i>
          <span class="font-semibold text-white text-xs sm:text-sm truncate">${cs.name}</span>
        </div>
        <span class="w-2 h-2 rounded-full bg-cyan-400 check-indicator shrink-0 transition-all ${configuratorState.case === cs.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}"></span>
      </div>
    `).join("");
  }

  lucide.createIcons();
}

window.selectConfigOption = function(group, id, element) {
  configuratorState[group] = id;

  // Если выбрали мощный GPU, подставим подходящий CPU по умолчанию при необходимости
  if (group === "gpu") {
    const gpuObj = CONFIG.configuratorOptions.gpus.find(g => g.id === id);
    if (gpuObj && gpuObj.defCpu) {
      configuratorState.cpu = gpuObj.defCpu;
    }
  }

  renderConfigOptions();
  updateConfiguratorPreview();
};

function updateConfiguratorPreview() {
  const opt = CONFIG.configuratorOptions;
  const currentTask = opt.tasks.find(t => t.id === configuratorState.task);
  const currentGpu = opt.gpus.find(g => g.id === configuratorState.gpu);
  const currentCpu = opt.cpus.find(c => c.id === configuratorState.cpu);
  const currentRam = opt.ram.find(r => r.id === configuratorState.ram);
  const currentSsd = opt.ssd.find(s => s.id === configuratorState.ssd);
  const currentCase = opt.cases.find(c => c.id === configuratorState.case);

  // Расчет индекса производительности (0-100)
  let score = Math.min(100, Math.round((currentGpu.score * 0.7) + (currentCpu.score * 1.0) + (configuratorState.ram === 'ram32' ? 5 : 0)));
  
  // Обновляем шкалу мощности
  const scoreEl = document.getElementById("cfg-score-value");
  const scoreBarEl = document.getElementById("cfg-score-bar");
  const scoreLevelEl = document.getElementById("cfg-score-level");
  
  if (scoreEl) scoreEl.textContent = score;
  if (scoreBarEl) scoreBarEl.style.width = score + "%";
  if (scoreLevelEl) {
    if (score >= 90) {
      scoreLevelEl.textContent = "Ультимативный 2K/4K";
      scoreLevelEl.className = "text-amber-400 font-bold";
    } else if (score >= 70) {
      scoreLevelEl.textContent = "Высокий Full HD / 2K";
      scoreLevelEl.className = "text-cyan-400 font-bold";
    } else {
      scoreLevelEl.textContent = "Комфортный Full HD";
      scoreLevelEl.className = "text-emerald-400 font-bold";
    }
  }

  // Обновляем расчетный FPS
  // Базис из видеокарты
  const baseFps = {
    cs2: Math.round(currentGpu.score * 3.4),
    cyberpunk: Math.round(currentGpu.score * 1.05),
    gta5: Math.round(currentGpu.score * 1.7),
    dota2: Math.round(currentGpu.score * 2.8)
  };

  const updateBar = (id, val, max) => {
    const bar = document.getElementById(`cfg-fps-bar-${id}`);
    const text = document.getElementById(`cfg-fps-val-${id}`);
    if (text) text.textContent = `${val} FPS`;
    if (bar) {
      const pct = Math.min(100, Math.round((val / max) * 100));
      bar.style.width = pct + "%";
    }
  };

  updateBar("cs2", baseFps.cs2, 360);
  updateBar("cyberpunk", baseFps.cyberpunk, 120);
  updateBar("gta5", baseFps.gta5, 200);
  updateBar("dota2", baseFps.dota2, 320);

  // Текстовая сводка
  const summaryEl = document.getElementById("cfg-summary-specs");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="flex items-center gap-2"><i data-lucide="layers" class="w-3.5 h-3.5 text-amber-400 shrink-0"></i> <span class="text-white font-medium truncate">${currentGpu.name}</span></div>
      <div class="flex items-center gap-2"><i data-lucide="cpu" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i> <span class="text-white font-medium truncate">${currentCpu.name}</span></div>
      <div class="flex items-center gap-2"><i data-lucide="hard-drive" class="w-3.5 h-3.5 text-purple-400 shrink-0"></i> <span class="text-white font-medium truncate">${currentRam.name} • ${currentSsd.name}</span></div>
      <div class="flex items-center gap-2"><i data-lucide="box" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i> <span class="text-slate-300 truncate">${currentCase.name}</span></div>
    `;
    lucide.createIcons();
  }
}

// Главная фича: Скопировать сборку из конфигуратора И СРАЗУ открыть Авито
window.copyConfigAndGoToAvito = function() {
  const opt = CONFIG.configuratorOptions;
  const currentTask = opt.tasks.find(t => t.id === configuratorState.task);
  const currentGpu = opt.gpus.find(g => g.id === configuratorState.gpu);
  const currentCpu = opt.cpus.find(c => c.id === configuratorState.cpu);
  const currentRam = opt.ram.find(r => r.id === configuratorState.ram);
  const currentSsd = opt.ssd.find(s => s.id === configuratorState.ssd);
  const currentCase = opt.cases.find(c => c.id === configuratorState.case);

  const score = document.getElementById("cfg-score-value").textContent || "90";
  const res = currentGpu.defRes || "1080p / 2K";

  const message = CONFIG.configuratorMessageTemplate
    .replace("{task}", currentTask.name)
    .replace("{gpu}", currentGpu.name)
    .replace("{cpu}", currentCpu.name)
    .replace("{ram}", currentRam.name)
    .replace("{ssd}", currentSsd.name)
    .replace("{case}", currentCase.name)
    .replace("{score}", score)
    .replace("{res}", res);

  // 1. Копируем в буфер обмена
  navigator.clipboard.writeText(message).then(() => {
    showToast("✓ Конфигурация скопирована! Перенаправляем в диалог на Авито...");

    // 2. Открываем Авито в новой вкладке
    setTimeout(() => {
      window.open(CONFIG.contacts.avitoUrl, "_blank");
    }, 600);
  }).catch(() => {
    window.open(CONFIG.contacts.avitoUrl, "_blank");
  });
};

/* ========================================================
   ИНТЕРАКТИВНЫЕ ГРАФИКИ СРАВНЕНИЯ (BENCHMARKS)
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

  // Разрешения
  const resContainer = document.getElementById("bm-res-tabs");
  if (resContainer) {
    resContainer.innerHTML = bm.resolutions.map(r => `
      <button 
        onclick="setBenchmarkRes('${r.id}', this)"
        class="bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all ${
          benchmarkState.res === r.id 
            ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' 
            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
        }"
      >
        ${r.name}
      </button>
    `).join("");
  }

  // Игры
  const gamesContainer = document.getElementById("bm-games-tabs");
  if (gamesContainer) {
    gamesContainer.innerHTML = bm.games.map(g => `
      <button 
        onclick="setBenchmarkGame('${g.id}', this)"
        class="bm-game-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
          benchmarkState.game === g.id 
            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
            : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
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
    b.className = "bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-900 border border-slate-800 text-slate-400 hover:text-white";
  });
  btn.className = "bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25";
  renderBenchmarkChart();
};

window.setBenchmarkGame = function(gameId, btn) {
  benchmarkState.game = gameId;
  document.querySelectorAll(".bm-game-btn").forEach(b => {
    b.className = "bm-game-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700";
  });
  btn.className = "bm-game-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20";
  renderBenchmarkChart();
};

function renderBenchmarkChart() {
  const container = document.getElementById("bm-chart-bars");
  if (!container) return;

  const bm = CONFIG.benchmarks;
  const currentGame = bm.games.find(g => g.id === benchmarkState.game) || bm.games[0];
  const maxFps = currentGame.maxFps || 200;

  // Описание игры
  const gameBadge = document.getElementById("bm-game-badge");
  if (gameBadge) gameBadge.textContent = `${currentGame.name} (${currentGame.badge}) • Разрешение: ${benchmarkState.res.toUpperCase()}`;

  // Рендерим полосы сравнения всех сборок
  const builds = Object.entries(bm.scores);

  container.innerHTML = builds.map(([id, b]) => {
    const fpsVal = b[benchmarkState.res][benchmarkState.game] || 60;
    const pct = Math.min(100, Math.round((fpsVal / maxFps) * 100));

    // Оценка комфорта
    let comfortBadge = "60+ FPS Плавно";
    let badgeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/40";
    if (fpsVal >= 240) {
      comfortBadge = "240Hz Киберспорт";
      badgeColor = "text-amber-400 border-amber-500/30 bg-amber-950/40";
    } else if (fpsVal >= 144) {
      comfortBadge = "144Hz Ультра-плавно";
      badgeColor = "text-cyan-400 border-cyan-500/30 bg-cyan-950/40";
    }

    return `
      <div class="space-y-2 p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
        <div class="flex items-center justify-between text-xs sm:text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="font-bold text-white font-tech text-base tracking-wide truncate">${b.name}</span>
            <span class="text-[11px] px-2 py-0.5 rounded-full border ${badgeColor} font-semibold shrink-0 hidden sm:inline-block">
              ${comfortBadge}
            </span>
          </div>
          <div class="text-right shrink-0">
            <span class="font-extrabold text-cyan-400 font-tech text-xl sm:text-2xl">${fpsVal}</span>
            <span class="text-xs text-slate-500">FPS</span>
          </div>
        </div>

        <!-- Анимированная полоса графика -->
        <div class="w-full h-3.5 sm:h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
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
   ГОТОВЫЕ СБОРКИ В КАТАЛОГЕ
======================================================== */

function initCategories() {
  const container = document.getElementById("categories-tabs");
  if (!container) return;

  container.innerHTML = CONFIG.categories.map((cat, idx) => {
    const isActive = idx === 0;
    return `
      <button 
        onclick="filterCategory('${cat.id}', this)"
        class="category-btn px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 font-semibold' 
            : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
        }"
      >
        <span>${cat.name}</span>
      </button>
    `;
  }).join("");
}

window.filterCategory = function(catId, btnElement) {
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.className = "category-btn px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700";
  });
  btnElement.className = "category-btn px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20";

  renderProducts(catId);
  lucide.createIcons();
};

function renderProducts(catId = "all") {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const filtered = catId === "all" 
    ? CONFIG.products 
    : CONFIG.products.filter(p => p.category === catId);

  container.innerHTML = filtered.map(product => {
    const fpsHtml = (product.fps || []).slice(0, 3).map(f => `
      <div class="bg-slate-900/60 border border-slate-800/80 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
        <span class="text-slate-400 truncate pr-2">${f.game}</span>
        <span class="text-cyan-400 font-bold font-tech text-sm tracking-wide shrink-0">${f.fps}</span>
      </div>
    `).join("");

    return `
      <div class="glow-border-card rounded-2xl overflow-hidden flex flex-col group border border-slate-800/80 hover:border-cyan-500/40">
        <!-- Фото с плашками -->
        <div class="relative h-64 overflow-hidden bg-slate-950 cursor-pointer" onclick="openProductModal('${product.id}')">
          <img 
            src="${product.primaryImage}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onerror="this.src='image/logo.jpg'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>

          <!-- Бейджи -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            ${product.badge ? `
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                ${product.badge}
              </span>
            ` : ''}
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></span>
              В наличии
            </span>
          </div>

          <div class="absolute bottom-3 right-3">
            <span class="px-2.5 py-1 rounded-lg text-xs bg-slate-900/80 border border-slate-700/60 text-slate-300 backdrop-blur-md flex items-center gap-1">
              <i data-lucide="camera" class="w-3.5 h-3.5"></i>
              <span>${product.gallery.length} фото</span>
            </span>
          </div>
        </div>

        <!-- Контентная часть -->
        <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="mb-3">
              <div class="flex items-center justify-between gap-2 mb-1">
                <h3 class="text-xl font-bold text-white font-tech tracking-wide group-hover:text-cyan-400 transition-colors">
                  ${product.name}
                </h3>
                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  ${product.condition || 'Новое'}
                </span>
              </div>
              <p class="text-xs text-slate-400">${product.subtitle || ''}</p>
            </div>

            <!-- Главные характеристики -->
            <div class="space-y-2 mb-4 text-xs sm:text-sm">
              <div class="p-2 rounded-lg flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="cpu" class="w-4 h-4 text-cyan-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">CPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.cpu}</span>
              </div>
              <div class="p-2 rounded-lg flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="layers" class="w-4 h-4 text-amber-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">GPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.gpu}</span>
              </div>
              <div class="p-2 rounded-lg flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="hard-drive" class="w-4 h-4 text-purple-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">RAM/SSD:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.ram} • ${product.specs.ssd}</span>
              </div>
            </div>

            <!-- FPS блок -->
            <div class="mb-5">
              <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <i data-lucide="gamepad-2" class="w-3.5 h-3.5 text-cyan-400"></i>
                <span>Тесты производительности:</span>
              </div>
              <div class="grid grid-cols-1 gap-1.5">
                ${fpsHtml}
              </div>
            </div>
          </div>

          <!-- Нижняя панель: Цена + Кнопки -->
          <div class="pt-4 border-t border-slate-800/80">
            <div class="flex items-baseline justify-between mb-4">
              <div>
                <span class="text-xs text-slate-500 block">Стоимость сборки</span>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl sm:text-3xl font-extrabold text-white font-tech tracking-tight">
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
                class="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1"
              >
                Все спеки
                <i data-lucide="chevron-right" class="w-3 h-3"></i>
              </button>
            </div>

            <!-- Главное действие: Скопировать и сразу перейти на Авито -->
            <button 
              onclick="copyProductAndGoToAvito('${product.id}')"
              class="w-full btn-avito-direct py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 mb-2"
              title="Скопировать параметры сборки и сразу перейти в сообщения продавцу на Авито"
            >
              <i data-lucide="message-square" class="w-4 h-4"></i>
              <span>Заказать через Авито</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5 opacity-70"></i>
            </button>

            <!-- Доп. кнопка быстрого копирования текста -->
            <button 
              onclick="copyProductSpecOnly('${product.id}', this)"
              class="w-full py-2 px-3 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-1.5 transition-all"
            >
              <i data-lucide="copy" class="w-3 h-3"></i>
              <span>Только скопировать текст</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// Скопировать спецификацию товара И сразу открыть Авито
window.copyProductAndGoToAvito = function(productId) {
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
    showToast(`✓ Спецификация «${product.name}» скопирована! Переходим на Авито...`);
    setTimeout(() => {
      window.open(product.avitoUrl || CONFIG.contacts.avitoUrl, "_blank");
    }, 500);
  }).catch(() => {
    window.open(product.avitoUrl || CONFIG.contacts.avitoUrl, "_blank");
  });
};

// Только копирование
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
      btnElement.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i><span class="text-emerald-400">Скопировано!</span>`;
      lucide.createIcons();
      setTimeout(() => {
        btnElement.innerHTML = orig;
        lucide.createIcons();
      }, 2000);
    }
  });
};

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

// Модальное окно
let currentModalGallery = [];
let currentGalleryIdx = 0;

function initModal() {
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
      class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
        i === 0 ? 'border-cyan-400 scale-95' : 'border-slate-800 opacity-60 hover:opacity-100'
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
    <div class="flex items-start justify-between py-2 border-b border-slate-800 text-sm">
      <span class="text-slate-400 font-medium shrink-0 mr-4">${labels[key] || key}:</span>
      <span class="text-white text-right font-medium">${val}</span>
    </div>
  `).join("");

  const modalFpsContainer = document.getElementById("modal-fps-list");
  if (modalFpsContainer && product.fps) {
    modalFpsContainer.innerHTML = product.fps.map(f => `
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
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
        ? "w-16 h-16 rounded-lg overflow-hidden border-2 border-cyan-400 scale-95 transition-all shrink-0" 
        : "w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-800 opacity-60 hover:opacity-100 transition-all shrink-0";
    }
  });
};

function updateModalImage() {
  const imgEl = document.getElementById("modal-main-image");
  if (imgEl && currentModalGallery[currentGalleryIdx]) {
    imgEl.src = currentModalGallery[currentGalleryIdx];
  }
}

// FAQ
function initFAQ() {
  const container = document.getElementById("faq-accordion");
  if (!container || !CONFIG.faq) return;

  container.innerHTML = CONFIG.faq.map((item, idx) => `
    <div class="glass-panel rounded-xl border border-slate-800/80 overflow-hidden">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-5 text-left flex items-center justify-between font-tech font-bold text-base sm:text-lg text-white hover:text-cyan-400 transition-colors"
      >
        <span>${item.q}</span>
        <i id="faq-icon-${idx}" data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-content-${idx}" class="hidden px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3">
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
