/**
 * STINGER PC — Основная логика интерфейса
 */

document.addEventListener("DOMContentLoaded", () => {
  // Инициализация
  initStoreInfo();
  initCategories();
  renderProducts("all");
  initFAQ();
  initModal();
  lucide.createIcons();
});

// Форматирование цены (71725 -> 71 725 ₽)
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

// Заполнение контактов и общей информации о магазине
function initStoreInfo() {
  document.querySelectorAll("[data-store-name]").forEach(el => el.textContent = CONFIG.shop.name);
  document.querySelectorAll("[data-store-tagline]").forEach(el => el.textContent = CONFIG.shop.tagline);
  document.querySelectorAll("[data-store-address]").forEach(el => el.textContent = `${CONFIG.shop.city}, ${CONFIG.shop.address}`);
  
  // Установка ссылок на контакты
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
      <div class="glass-card p-6 rounded-2xl flex flex-col justify-between">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
          <i data-lucide="${f.icon}" class="w-6 h-6"></i>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-2 font-tech text-xl">${f.title}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">${f.desc}</p>
        </div>
      </div>
    `).join("");
  }
}

// Рендер категорий / табов
function initCategories() {
  const container = document.getElementById("categories-tabs");
  if (!container) return;

  container.innerHTML = CONFIG.categories.map((cat, idx) => {
    const isActive = idx === 0;
    return `
      <button 
        onclick="filterCategory('${cat.id}', this)"
        class="category-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
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

// Фильтрация товаров
window.filterCategory = function(catId, btnElement) {
  // Подсветка активной кнопки
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.className = "category-btn px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700";
  });
  btnElement.className = "category-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20";

  renderProducts(catId);
  lucide.createIcons();
};

// Рендер карточек товаров
function renderProducts(catId = "all") {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const filtered = catId === "all" 
    ? CONFIG.products 
    : CONFIG.products.filter(p => p.category === catId);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <i data-lucide="package-search" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
        <p class="text-lg">В этой категории пока нет сборок</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(product => {
    // Формируем FPS бейджи
    const fpsHtml = (product.fps || []).slice(0, 3).map(f => `
      <div class="bg-slate-900/60 border border-slate-800/80 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-xs">
        <span class="text-slate-400 truncate pr-2">${f.game}</span>
        <span class="text-cyan-400 font-bold font-tech text-sm tracking-wide shrink-0">${f.fps}</span>
      </div>
    `).join("");

    return `
      <div class="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-800/90 hover:border-cyan-500/40">
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

          <!-- Бейджи статуса -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            ${product.badge ? `
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                ${product.badge}
              </span>
            ` : ''}
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-indicator"></span>
              В наличии
            </span>
          </div>

          <!-- Кнопка галереи -->
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
            <!-- Заголовок и подзаголовок -->
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
              <div class="spec-row p-2 rounded-lg flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="cpu" class="w-4 h-4 text-cyan-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">CPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.cpu}</span>
              </div>
              <div class="spec-row p-2 rounded-lg flex items-center gap-2.5 bg-slate-900/40">
                <i data-lucide="layers" class="w-4 h-4 text-amber-400 shrink-0"></i>
                <span class="text-slate-400 shrink-0">GPU:</span>
                <span class="text-slate-200 font-medium truncate">${product.specs.gpu}</span>
              </div>
              <div class="spec-row p-2 rounded-lg flex items-center gap-2.5 bg-slate-900/40">
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
                  <span class="text-2xl sm:text-3xl font-extrabold text-white font-tech tracking-tight text-glow-cyan">
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

            <!-- Главные CTA кнопки -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <!-- Кнопка 1: Скопировать спецификацию для Авито -->
              <button 
                id="btn-copy-${product.id}"
                onclick="copyProductSpec('${product.id}', this)"
                class="btn-spec py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all"
                title="Скопировать вежливый запрос со всеми характеристиками для сообщения продавцу"
              >
                <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                <span>Скопировать спеки</span>
              </button>

              <!-- Кнопка 2: Написать на Авито -->
              <a 
                href="${product.avitoUrl || CONFIG.contacts.avitoUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-avito py-2.5 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5"
              >
                <i data-lucide="message-square" class="w-3.5 h-3.5"></i>
                <span>Написать на Авито</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  lucide.createIcons();
}

// Копирование спецификации в буфер обмена
window.copyProductSpec = function(productId, btnElement) {
  const product = CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  // Формируем текст по шаблону
  const text = CONFIG.avitoMessageTemplate
    .replace("{name}", product.name)
    .replace("{price}", formatPrice(product.price))
    .replace("{cpu}", product.specs.cpu)
    .replace("{gpu}", product.specs.gpu)
    .replace("{ram}", product.specs.ram)
    .replace("{ssd}", product.specs.ssd);

  // Копируем в буфер
  navigator.clipboard.writeText(text).then(() => {
    // Всплывающий Toast
    showToast(`✓ Спецификация «${product.name}» скопирована! Вставьте её в чат на Авито.`);

    // Визуальный отклик на кнопке
    if (btnElement) {
      const originalHtml = btnElement.innerHTML;
      btnElement.classList.add("bg-emerald-500/20", "text-emerald-400", "border-emerald-500/50");
      btnElement.innerHTML = `
        <i data-lucide="check" class="w-3.5 h-3.5"></i>
        <span>Скопировано!</span>
      `;
      lucide.createIcons();

      setTimeout(() => {
        btnElement.classList.remove("bg-emerald-500/20", "text-emerald-400", "border-emerald-500/50");
        btnElement.innerHTML = originalHtml;
        lucide.createIcons();
      }, 2500);
    }
  }).catch(err => {
    console.error("Ошибка копирования: ", err);
    showToast("Не удалось скопировать автоматически, попробуйте еще раз.");
  });
};

// Всплывающее уведомление (Toast)
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

// Модальное окно с деталями и фотогалереей
let currentModalGallery = [];
let currentGalleryIdx = 0;

function initModal() {
  const overlay = document.getElementById("product-modal");
  if (!overlay) return;

  // Закрытие по клику на фон
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeProductModal();
    }
  });

  // Закрытие по ESC
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

  // Заполняем данные
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

  // Обновляем главную картинку
  updateModalImage();

  // Рендерим миниатюры
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

  // Полный список характеристик
  const specsContainer = document.getElementById("modal-specs-list");
  specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => {
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
    return `
      <div class="flex items-start justify-between py-2 border-b border-slate-800 text-sm">
        <span class="text-slate-400 font-medium shrink-0 mr-4">${labels[key] || key}:</span>
        <span class="text-white text-right font-medium">${val}</span>
      </div>
    `;
  }).join("");

  // FPS в модалке
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

  // Описание
  document.getElementById("modal-description").textContent = product.description || "";

  // Настройка кнопок модалки
  const copyBtn = document.getElementById("modal-copy-btn");
  copyBtn.onclick = (e) => copyProductSpec(product.id, copyBtn);

  const avitoBtn = document.getElementById("modal-avito-btn");
  avitoBtn.href = product.avitoUrl || CONFIG.contacts.avitoUrl;

  // Открытие
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

  // Подсветка активной миниатюры
  currentModalGallery.forEach((_, i) => {
    const thumb = document.getElementById(`thumb-${i}`);
    if (thumb) {
      if (i === index) {
        thumb.className = "w-16 h-16 rounded-lg overflow-hidden border-2 border-cyan-400 scale-95 transition-all shrink-0";
      } else {
        thumb.className = "w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-800 opacity-60 hover:opacity-100 transition-all shrink-0";
      }
    }
  });
};

function updateModalImage() {
  const imgEl = document.getElementById("modal-main-image");
  if (imgEl && currentModalGallery[currentGalleryIdx]) {
    imgEl.src = currentModalGallery[currentGalleryIdx];
  }
}

// Аккордеон для FAQ
function initFAQ() {
  const container = document.getElementById("faq-accordion");
  if (!container || !CONFIG.faq) return;

  container.innerHTML = CONFIG.faq.map((item, idx) => `
    <div class="glass-card rounded-xl border border-slate-800/80 overflow-hidden">
      <button 
        onclick="toggleFAQ(${idx})"
        class="w-full p-5 text-left flex items-center justify-between font-tech font-bold text-lg text-white hover:text-cyan-400 transition-colors"
      >
        <span>${item.q}</span>
        <i id="faq-icon-${idx}" data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-content-${idx}" class="hidden px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-3">
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
