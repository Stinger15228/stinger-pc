/**
 * STINGER PC — Интерактивный функционал и анимации
 * (В стиле iden-pc.ru: циклические спеки, модалка сборки на заказ, графики 8 игр, скролл-ревил)
 */

document.addEventListener("DOMContentLoaded", () => {
  initStoreInfo();
  initMouseGlow();
  initScrollReveal();
  initCycleTicker();
  initCategories();
  renderProducts("all");
  initBenchmarks();
  initCustomOrderModal();
  initProductModal();
  initFAQ();
  lucide.createIcons();
});

// Форматирование цены (289900 -> 289 900 ₽)
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

// Анимация появления элементов при скролле (Scroll Reveal)
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
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

  // Заполнение карточек преимуществ
  const featuresContainer = document.getElementById("features-grid");
  if (featuresContainer && CONFIG.features) {
    featuresContainer.innerHTML = CONFIG.features.map((f, i) => `
      <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between reveal-on-scroll delay-${(i % 3) + 1}">
        <div class="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
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
   ЦИКЛИЧЕСКИЙ ТИКЕР СПЕЦИФИКАЦИЙ (КАК НА IDEN-PC)
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

    // Плавная смена с мигающим курсором
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
   МОДАЛКА «СБОРКА НА ЗАКАЗ» (СКРИНШОТ 3)
======================================================== */

const customOrderState = {
  budget: "",
  aesthetic: "",
  hardware: "",
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

// Формирование текста заявки
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
   ИНТЕРАКТИВНЫЕ ГРАФИКИ СРАВНЕНИЯ FPS (8 ИГР)
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
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
        }"
      >
        ${r.name}
      </button>
    `).join("");
  }

  // Игры (8 игр)
  const gamesContainer = document.getElementById("bm-games-tabs");
  if (gamesContainer) {
    gamesContainer.innerHTML = bm.games.map(g => `
      <button 
        onclick="setBenchmarkGame('${g.id}', this)"
        class="bm-game-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
          benchmarkState.game === g.id 
            ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25 font-black' 
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
  btn.className = "bm-res-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-purple-600 text-white shadow-lg shadow-purple-600/30";
  renderBenchmarkChart();
};

window.setBenchmarkGame = function(gameId, btn) {
  benchmarkState.game = gameId;
  document.querySelectorAll(".bm-game-btn").forEach(b => {
    b.className = "bm-game-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700";
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

    let comfortBadge = "60+ FPS Комфортно";
    let badgeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-950/40";
    if (fpsVal >= 240) {
      comfortBadge = "240Hz+ Киберспорт Топ";
      badgeColor = "text-amber-400 border-amber-500/30 bg-amber-950/40";
    } else if (fpsVal >= 144) {
      comfortBadge = "144Hz Ультра-плавно";
      badgeColor = "text-cyan-400 border-cyan-500/30 bg-cyan-950/40";
    }

    return `
      <div class="space-y-2 p-3 sm:p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
        <div class="flex items-center justify-between text-xs sm:text-sm">
          <div class="flex items-center gap-2 min-w-0">
            <span class="font-bold text-white font-tech text-base sm:text-lg tracking-wide truncate">${b.name}</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeColor} font-semibold shrink-0 hidden sm:inline-block">
              ${comfortBadge}
            </span>
          </div>
          <div class="text-right shrink-0">
            <span class="font-black text-cyan-400 font-tech text-xl sm:text-2xl">${fpsVal}</span>
            <span class="text-xs text-slate-500 font-medium">FPS</span>
          </div>
        </div>

        <!-- Анимированная полоса FPS -->
        <div class="w-full h-3.5 sm:h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/90">
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
    btn.className = "category-btn px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700";
  });
  btnElement.className = "category-btn px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30";

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
      <div class="glow-card-black rounded-3xl overflow-hidden flex flex-col group border border-slate-800/80 hover:border-purple-500/40">
        <!-- Фото -->
        <div class="relative h-64 sm:h-72 overflow-hidden bg-slate-950 cursor-pointer" onclick="openProductModal('${product.id}')">
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
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
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
                <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  ${product.condition || 'Новое'}
                </span>
              </div>
              <p class="text-xs text-slate-400">${product.subtitle || ''}</p>
            </div>

            <!-- Главные спеки -->
            <div class="space-y-2 mb-4 text-xs sm:text-sm">
              <div class="p-2 rounded-xl flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="cpu" class="w-4 h-4 text-cyan-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">CPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.cpu}</span>
              </div>
              <div class="p-2 rounded-xl flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="layers" class="w-4 h-4 text-amber-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">GPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.gpu}</span>
              </div>
              <div class="p-2 rounded-xl flex items-center gap-2.5 bg-slate-900/40">
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
          <div class="pt-4 border-t border-slate-800/80">
            <div class="flex items-baseline justify-between mb-4">
              <div>
                <span class="text-xs text-slate-500 block">Стоимость сборки</span>
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

            <!-- Кнопка заказа через Авито -->
            <button 
              onclick="copyProductAndGoToAvito('${product.id}')"
              class="w-full btn-blue-rounded py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 mb-2"
            >
              <i data-lucide="message-square" class="w-4 h-4"></i>
              <span>Заказать через Авито</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5 opacity-80"></i>
            </button>

            <!-- Кнопка только копирования -->
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
        i === 0 ? 'border-purple-400 scale-95' : 'border-slate-800 opacity-60 hover:opacity-100'
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
        ? "w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-400 scale-95 transition-all shrink-0" 
        : "w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-800 opacity-60 hover:opacity-100 transition-all shrink-0";
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
    <div class="glass-panel rounded-2xl border border-slate-800/80 overflow-hidden reveal-on-scroll">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-5 text-left flex items-center justify-between font-tech font-bold text-base sm:text-lg text-white hover:text-purple-400 transition-colors"
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
