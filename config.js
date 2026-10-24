/**
 * STINGER PC — Главный конфигурационный файл магазина и конфигуратора
 */

const CONFIG = {
  // Информация о магазине
  shop: {
    name: "STINGER PC",
    tagline: "Кастомные игровые ПК в Великом Новгороде",
    shortDesc: "Сборка, настройка и продажа игровых компьютеров. Честные цены, стресс-тесты FurMark/OCCT и гарантия.",
    city: "Великий Новгород",
    address: "ул. Псковская, д. 33",
    locationNote: "Самовывоз с проверкой на месте или Авито Доставка / СДЭК",
    logo: "image/logo.jpg",
    customBannerImg: "image/custom_pc_mystery.jpg",
    warrantyMonths: 3,
  },

  // Ссылки на контакты
  contacts: {
    avitoUrl: "https://www.avito.ru", 
    telegramUrl: "https://t.me/stinger_pc", 
    vkUrl: "https://vk.com/stinger_pc",
    phone: "+7 (999) 000-00-00",
    phoneDisplay: "+7 (999) 000-00-00"
  },

  // Примеры сборок для циклически меняющейся плашки
  cycleExamples: [
    {
      gpu: "NVIDIA RTX 4070 Ti Super",
      cpu: "Ryzen 7 7800X3D",
      ram: "32GB DDR5 6000MHz",
      cooling: "Воздушное (Топ)"
    },
    {
      gpu: "NVIDIA RTX 4090 24GB",
      cpu: "Intel Core i9-14900K",
      ram: "64GB DDR5 6400MHz",
      cooling: "Кастомное СЖО"
    },
    {
      gpu: "NVIDIA RTX 4080 Super",
      cpu: "Ryzen 7 9800X3D",
      ram: "32GB DDR5 6000MHz",
      cooling: "СЖО 360mm ARGB"
    },
    {
      gpu: "NVIDIA RTX 4070 Super",
      cpu: "Intel Core i7-14700KF",
      ram: "32GB DDR5 5600MHz",
      cooling: "СЖО DeepCool 240mm"
    },
    {
      gpu: "NVIDIA RTX 3080 10GB",
      cpu: "Ryzen 5 5600X",
      ram: "16GB DDR4 3600MHz",
      cooling: "Башенный кулер 4 трубки"
    }
  ],

  // Шаблон для копирования из каталога готовых сборок
  avitoMessageTemplate: 
`Здравствуйте! Меня заинтересовал ПК «{name}» за {price} ₽.
Характеристики:
• Процессор: {cpu}
• Видеокарта: {gpu}
• Память: {ram}
• Накопитель: {ssd}

Подскажите, актуальна ли сборка и когда можно подъехать на проверку / оформить заказ?`,

  // Шаблон для самоличной сборки в конфигураторе
  configuratorMessageTemplate:
`Здравствуйте! Я подобрал кастомную сборку в конфигураторе STINGER PC:

🎯 Сценарий: {task}
🎮 Видеокарта: {gpu}
⚡ Процессор: {cpu}
🧠 Оперативная память: {ram}
💾 Накопитель: {ssd}
✨ Корпус и стиль: {case}

💰 Расчетный бюджет: ~{estPrice} ₽ {prepaymentNote}
🚀 Индекс мощности: {score}/100 в играх ({res})

Подскажите, пожалуйста, точную стоимость и сроки сборки?`,

  // Шаблон заявки на кастомную сборку (модалка "Сборка на заказ")
  customOrderTemplate:
`Здравствуйте! Хочу оформить индивидуальную сборку в STINGER PC:

💰 Бюджет: {budget}
🎨 Внешний вид: {aesthetic}
⚙️ Пожелания по железу: {hardware}
🚚 Доставка: {delivery}
📡 Wi-Fi и Bluetooth: {wifi}

Подскажите, пожалуйста, варианты сборки и сроки готовности?`,

  // Опции для интерактивного конфигуратора (с ценами для расчета предоплаты)
  configuratorOptions: {
    tasks: [
      { id: "esports", name: "Киберспорт", sub: "CS2, Valorant, Dota 2, Apex", icon: "crosshair", scoreBoost: 10 },
      { id: "aaa", name: "AAA-Гейминг (2K / 4K)", sub: "Cyberpunk, GTA V, RDR 2", icon: "flame", scoreBoost: 20 },
      { id: "content", name: "Стриминг и Монтаж", sub: "OBS, Premiere, Blender 3D", icon: "video", scoreBoost: 25 }
    ],
    gpus: [
      { id: "rtx4090", name: "NVIDIA RTX 4090 24GB", tier: "Флагман 4K Extreme", score: 99, price: 185000, defRes: "4K Extreme Ultra", fpsMap: { cyberpunk: 145, cs2: 440, gta5: 210, dota2: 390, rdr2: 150, rust: 175 } },
      { id: "rtx4080s", name: "NVIDIA RTX 4080 Super 16GB", tier: "Экстрим 4K", score: 92, price: 115000, defRes: "4K / 2K Ultra", fpsMap: { cyberpunk: 120, cs2: 380, gta5: 185, dota2: 350, rdr2: 125, rust: 145 } },
      { id: "rtx4070tis", name: "NVIDIA RTX 4070 Ti Super 16GB", tier: "Ультра 2K 144Hz", score: 85, price: 89000, defRes: "2K Ultra", fpsMap: { cyberpunk: 102, cs2: 330, gta5: 165, dota2: 300, rdr2: 105, rust: 130 } },
      { id: "rtx4070s", name: "NVIDIA RTX 4070 Super 12GB", tier: "Хит 2K Ultra", score: 80, price: 68000, defRes: "2K Ultra", fpsMap: { cyberpunk: 92, cs2: 300, gta5: 150, dota2: 280, rdr2: 95, rust: 118 } },
      { id: "rtx3080", name: "NVIDIA RTX 3080 10GB", tier: "Мощный 2K Баланс", score: 75, price: 42000, defRes: "2K High-Ultra", fpsMap: { cyberpunk: 85, cs2: 280, gta5: 145, dota2: 250, rdr2: 85, rust: 105 } },
      { id: "rtx4060ti", name: "NVIDIA RTX 4060 Ti 16GB", tier: "1080p Ultra / 2K", score: 68, price: 47000, defRes: "1080p Ultra", fpsMap: { cyberpunk: 70, cs2: 230, gta5: 120, dota2: 220, rdr2: 68, rust: 90 } },
      { id: "rx5700xt", name: "MSI Radeon RX 5700 XT 8GB", tier: "Народный 1080p Ultra", score: 60, price: 21000, defRes: "1080p Ultra", fpsMap: { cyberpunk: 52, cs2: 180, gta5: 80, dota2: 170, rdr2: 52, rust: 70 } },
      { id: "rx5700", name: "GIGABYTE Radeon RX 5700 6GB", tier: "Баланс High", score: 55, price: 18000, defRes: "1080p High", fpsMap: { cyberpunk: 46, cs2: 160, gta5: 72, dota2: 150, rdr2: 45, rust: 62 } },
      { id: "rtx3050", name: "MSI GeForce RTX 3050 8GB", tier: "Входной билет", score: 45, price: 17000, defRes: "1080p Medium", fpsMap: { cyberpunk: 35, cs2: 110, gta5: 55, dota2: 110, rdr2: 34, rust: 48 } }
    ],
    cpus: [
      { id: "r7_7800x3d", name: "AMD Ryzen 7 7800X3D (8/16, Топ в мире)", price: 46000, tag: "Игровой №1", score: 35 },
      { id: "i7_14700kf", name: "Intel Core i7-14700KF (20/28 ядер)", price: 41000, tag: "Для монтажа и игр", score: 34 },
      { id: "r7_7700x", name: "AMD Ryzen 7 7700X (8/16 ядер, 5.4 GHz)", price: 32000, tag: "Мощная AM5 база", score: 30 },
      { id: "i5_13400f", name: "Intel Core i5-13400F (10 ядер)", price: 18000, tag: "Современный 10-ядерник", score: 26 },
      { id: "r5_5600x", name: "AMD Ryzen 5 5600X (6/12 ядер, 4.6 GHz)", price: 13500, tag: "Киберспортивный хит", score: 24 },
      { id: "r5_5600", name: "AMD Ryzen 5 5600 (6/12 ядер, 4.4 GHz)", price: 11000, tag: "Народный баланс", score: 22 },
      { id: "i5_11400f", name: "Intel Core i5-11400F (6/12 ядер)", price: 9500, tag: "Надежный Intel", score: 20 },
      { id: "r5_3600", name: "AMD Ryzen 5 3600 (6/12 ядер)", price: 7500, tag: "Бюджетный 6-ядерник", score: 17 },
      { id: "i3_10100f", name: "Intel Core i3-10100F (4/8 ядер)", price: 5500, tag: "Базовый старт", score: 12 }
    ],
    ram: [
      { id: "ram16_d4", name: "16 GB DDR4 Dual 3200MHz", price: 4500, tag: "Игры 1080p" },
      { id: "ram32_d4", name: "32 GB DDR4 Dual 3200MHz", price: 8000, tag: "С запасом для модов" },
      { id: "ram32_d5", name: "32 GB DDR5 Dual 6000MHz", price: 14000, tag: "Скоростная DDR5" },
      { id: "ram64_d5", name: "64 GB DDR5 Dual 6400MHz", price: 26000, tag: "Для 3D, рендера и стримов" }
    ],
    ssd: [
      { id: "ssd512", name: "512 GB M.2 NVMe SSD", price: 4000, tag: "ОС + 3-4 игры" },
      { id: "ssd1000", name: "1024 GB (1 TB) M.2 NVMe SSD", price: 7500, tag: "Оптимальный объем" },
      { id: "ssd2000", name: "2048 GB (2 TB) Samsung NVMe", price: 16000, tag: "Максимальная скорость" }
    ],
    cases: [
      { id: "stinger_black", name: "Stinger Cyber ARGB (Черный со стеклом)", price: 5500, icon: "box" },
      { id: "stinger_white", name: "Snow White Panoramic (Белый аквариум)", price: 9500, icon: "sparkles" },
      { id: "stinger_stealth", name: "Stealth Dark Minimal (Без яркого света)", price: 6500, icon: "eye-off" },
      { id: "stinger_water", name: "Custom Hardline Water Showcase", price: 25000, icon: "droplet" }
    ]
  },

  // Категории для каталога готовых сборок
  categories: [
    { id: "all", name: "Все сборки (10)" },
    { id: "under100", name: "🔥 В наличии до 100 000 ₽" },
    { id: "prepayment", name: "⚡ По предоплате (> 100к)" },
    { id: "start", name: "🎮 До 45 000 ₽" }
  ],

  // Данные для интерактивных графиков сравнения FPS (8 популярных игр)
  benchmarks: {
    games: [
      { id: "cyberpunk", name: "Cyberpunk 2077", badge: "Трассировка лучей / FSR / DLSS", maxFps: 180 },
      { id: "cs2", name: "Counter-Strike 2", badge: "Киберспорт / 144Hz–360Hz", maxFps: 480 },
      { id: "gta5", name: "GTA V", badge: "Максимальные настройки", maxFps: 240 },
      { id: "dota2", name: "Dota 2 / Valorant", badge: "Высокий соревновательный FPS", maxFps: 420 },
      { id: "rdr2", name: "Red Dead Redemption 2", badge: "Ультра графика", maxFps: 170 },
      { id: "rust", name: "Rust", badge: "Высокая детализация", maxFps: 190 },
      { id: "witcher3", name: "Ведьмак 3 Next-Gen", badge: "Ультра + RT", maxFps: 160 },
      { id: "hogwarts", name: "Hogwarts Legacy", badge: "Ультра / DLSS", maxFps: 160 }
    ],
    resolutions: [
      { id: "1080p", name: "Full HD (1080p)" },
      { id: "1440p", name: "2K Quad HD (1440p)" },
      { id: "4k", name: "4K Ultra HD" }
    ],
    // Честные показатели FPS для каждой сборки (включая честные 35 FPS для RTX 3050 в 2K!)
    scores: {
      "pc-10": {
        name: "STINGER Legend (RTX 4090)",
        color: "from-amber-400 via-yellow-400 to-amber-500",
        badge: "👑 Флагман 4K",
        isPrepayment: true,
        "1080p": { cyberpunk: 175, cs2: 480, gta5: 235, dota2: 420, rdr2: 170, rust: 190, witcher3: 160, hogwarts: 155 },
        "1440p": { cyberpunk: 145, cs2: 440, gta5: 210, dota2: 390, rdr2: 150, rust: 175, witcher3: 140, hogwarts: 138 },
        "4k":    { cyberpunk: 105, cs2: 350, gta5: 165, dota2: 320, rdr2: 115, rust: 135, witcher3: 100, hogwarts: 98 }
      },
      "pc-8": {
        name: "STINGER Stealth Pro (RTX 4070 Ti S)",
        color: "from-blue-500 to-cyan-500",
        badge: "⚡ Ультра 2K",
        isPrepayment: true,
        "1080p": { cyberpunk: 130, cs2: 390, gta5: 195, dota2: 340, rdr2: 130, rust: 150, witcher3: 120, hogwarts: 120 },
        "1440p": { cyberpunk: 102, cs2: 330, gta5: 165, dota2: 300, rdr2: 105, rust: 130, witcher3: 98,  hogwarts: 98 },
        "4k":    { cyberpunk: 68,  cs2: 230, gta5: 115, dota2: 220, rdr2: 72,  rust: 88,  witcher3: 62,  hogwarts: 62 }
      },
      "pc-6": {
        name: "STINGER White Aquarium (RTX 4070 S)",
        color: "from-cyan-400 to-teal-400",
        badge: "✨ Белый хит",
        isPrepayment: true,
        "1080p": { cyberpunk: 118, cs2: 360, gta5: 185, dota2: 320, rdr2: 118, rust: 140, witcher3: 110, hogwarts: 110 },
        "1440p": { cyberpunk: 92,  cs2: 300, gta5: 150, dota2: 280, rdr2: 95,  rust: 118, witcher3: 88,  hogwarts: 86 },
        "4k":    { cyberpunk: 58,  cs2: 200, gta5: 98,  dota2: 195, rdr2: 60,  rust: 75,  witcher3: 52,  hogwarts: 50 }
      },
      "pc-7": {
        name: "STINGER Apex Cyber (RTX 4060 Ti)",
        color: "from-fuchsia-500 to-pink-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 95,  cs2: 290, gta5: 155, dota2: 270, rdr2: 92,  rust: 115, witcher3: 86,  hogwarts: 86 },
        "1440p": { cyberpunk: 70,  cs2: 230, gta5: 120, dota2: 220, rdr2: 68,  rust: 90,  witcher3: 65,  hogwarts: 62 },
        "4k":    { cyberpunk: 40,  cs2: 140, gta5: 72,  dota2: 140, rdr2: 42,  rust: 52,  witcher3: 38,  hogwarts: 36 }
      },
      "pc-custom-2": {
        name: "STINGER Pulse White (RTX 4060)",
        color: "from-violet-400 to-purple-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 88,  cs2: 270, gta5: 145, dota2: 250, rdr2: 85,  rust: 105, witcher3: 80,  hogwarts: 80 },
        "1440p": { cyberpunk: 62,  cs2: 210, gta5: 110, dota2: 200, rdr2: 62,  rust: 80,  witcher3: 58,  hogwarts: 55 },
        "4k":    { cyberpunk: 34,  cs2: 120, gta5: 62,  dota2: 120, rdr2: 36,  rust: 45,  witcher3: 30,  hogwarts: 28 }
      },
      "pc-4": {
        name: "STINGER Power (RTX 3080 10GB)",
        color: "from-amber-400 to-orange-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 110, cs2: 340, gta5: 180, dota2: 300, rdr2: 110, rust: 130, witcher3: 102, hogwarts: 100 },
        "1440p": { cyberpunk: 85,  cs2: 280, gta5: 145, dota2: 250, rdr2: 85,  rust: 105, witcher3: 78,  hogwarts: 78 },
        "4k":    { cyberpunk: 52,  cs2: 180, gta5: 90,  dota2: 175, rdr2: 55,  rust: 68,  witcher3: 45,  hogwarts: 45 }
      },
      "pc-custom-1": {
        name: "STINGER Cyber Neo (RTX 3060 12GB)",
        color: "from-teal-400 to-cyan-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 80,  cs2: 250, gta5: 130, dota2: 235, rdr2: 78,  rust: 98,  witcher3: 72,  hogwarts: 72 },
        "1440p": { cyberpunk: 55,  cs2: 190, gta5: 95,  dota2: 185, rdr2: 56,  rust: 72,  witcher3: 50,  hogwarts: 48 },
        "4k":    { cyberpunk: 28,  cs2: 105, gta5: 52,  dota2: 105, rdr2: 30,  rust: 40,  witcher3: 26,  hogwarts: 24 }
      },
      "pc-1": {
        name: "STINGER Balance (RX 5700 XT)",
        color: "from-cyan-400 to-blue-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 75,  cs2: 240, gta5: 110, dota2: 230, rdr2: 75,  rust: 95,  witcher3: 70,  hogwarts: 68 },
        "1440p": { cyberpunk: 52,  cs2: 180, gta5: 80,  dota2: 170, rdr2: 52,  rust: 70,  witcher3: 48,  hogwarts: 45 },
        "4k":    { cyberpunk: 30,  cs2: 110, gta5: 50,  dota2: 110, rdr2: 32,  rust: 42,  witcher3: 28,  hogwarts: 26 }
      },
      "pc-3": {
        name: "STINGER Gamer v2 (RX 5700)",
        color: "from-purple-400 to-indigo-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 68,  cs2: 220, gta5: 100, dota2: 210, rdr2: 68,  rust: 88,  witcher3: 64,  hogwarts: 62 },
        "1440p": { cyberpunk: 46,  cs2: 160, gta5: 72,  dota2: 150, rdr2: 45,  rust: 62,  witcher3: 40,  hogwarts: 38 },
        "4k":    { cyberpunk: 26,  cs2: 95,  gta5: 42,  dota2: 95,  rdr2: 26,  rust: 35,  witcher3: 22,  hogwarts: 22 }
      },
      "pc-2": {
        name: "STINGER Start i5 (RX 6500 XT)",
        color: "from-blue-400 to-cyan-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 60,  cs2: 200, gta5: 90,  dota2: 190, rdr2: 55,  rust: 78,  witcher3: 54,  hogwarts: 52 },
        "1440p": { cyberpunk: 38,  cs2: 130, gta5: 60,  dota2: 120, rdr2: 38,  rust: 52,  witcher3: 32,  hogwarts: 30 },
        "4k":    { cyberpunk: 20,  cs2: 75,  gta5: 32,  dota2: 75,  rdr2: 20,  rust: 28,  witcher3: 18,  hogwarts: 16 }
      },
      "pc-5": {
        name: "STINGER Entry (RTX 3050 8GB)",
        color: "from-slate-400 to-slate-500",
        badge: "В наличии",
        isPrepayment: false,
        "1080p": { cyberpunk: 55,  cs2: 160, gta5: 80,  dota2: 160, rdr2: 50,  rust: 72,  witcher3: 50,  hogwarts: 48 },
        "1440p": { cyberpunk: 35,  cs2: 110, gta5: 55,  dota2: 110, rdr2: 34,  rust: 48,  witcher3: 28,  hogwarts: 26 },
        "4k":    { cyberpunk: 18,  cs2: 65,  gta5: 28,  dota2: 65,  rdr2: 18,  rust: 24,  witcher3: 15,  hogwarts: 14 }
      }
    }
  },

  // Преимущества
  features: [
    {
      icon: "check-circle",
      title: "Реальные фото и честная цена",
      desc: "На фото именно тот ПК, который вы покупаете. Никаких «базовых версий» и скрытых доплат."
    },
    {
      icon: "activity",
      title: "Жесткие стресс-тесты 24ч",
      desc: "Каждый компьютер проверен в FurMark, AIDA64 и OCCT. Температуры и напряжения в полном порядке."
    },
    {
      icon: "shield-check",
      title: "Гарантия 3 месяца",
      desc: "Личная гарантия на проверку и обкатку ПК у вас дома. Всегда остаемся на связи после покупки."
    },
    {
      icon: "clock",
      title: "Тестируйте сколько угодно",
      desc: "Приезжайте к нам (Псковская, 33), запускайте любые игры и бенчмарки. Время проверок не ограничиваем."
    },
    {
      icon: "sparkles",
      title: "Включил и играешь",
      desc: "Установлена чистая Windows 10/11 Pro, свежие драйверы и софт. Идеальный кабель-менеджмент."
    },
    {
      icon: "truck",
      title: "Доставка по городу и РФ",
      desc: "Довезем по Великому Новгороду или отправим Авито Доставкой / СДЭК в бронебойной упаковке."
    }
  ],

  // FAQ
  faq: [
    {
      q: "Какие компьютеры в наличии, а какие под заказ?",
      a: "Все сборки до 100 000 ₽ обычно есть в наличии или собираются день-в-день. Премиальные флагманы от 100 000 ₽ (с картами RTX 4070 Ti / 4080 / 4090) собираются под заказ строго по предоплате с фото/видеоотчетом каждого этапа."
    },
    {
      q: "Как купить через Авито Доставку?",
      a: "Нажмите кнопку «Заказать через Авито» на карточке нужного ПК. В диалоге мы согласуем отправку, снимем подробное видео тестов ПК перед упаковкой и отправим надежной бронебойной коробкой."
    },
    {
      q: "Можно ли проверить компьютер перед покупкой?",
      a: "Да, обязательно! Вы можете приехать к нам на ул. Псковскую 33, лично запустить стресс-тесты (FurMark, OCCT, AIDA64) и любые интересующие вас игры. Мы не торопим и даем спокойно во всём убедиться."
    },
    {
      q: "Можно ли собрать ПК по моим индивидуальным пожеланиям?",
      a: "Конечно! В блоке «Собери свой STINGER» нажмите «Собрать компьютер», укажите бюджет и пожелания по железу. Мы подберем лучшие комплектующие и согласуем сборку на Авито."
    }
  ],

  // 10 ГОТОВЫХ СБОРОК В КАТАЛОГЕ (В основном до 100 000 ₽ + флагманы по предоплате)
  products: [
    {
      id: "pc-5",
      name: "STINGER Entry",
      subtitle: "Intel i3-10100F / RTX 3050 8GB / 16GB",
      category: "start",
      price: 31299,
      badge: "💰 Суперцена",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "Full HD 1080p Entry",
      primaryImage: "sborki/pc5/photo_2026-10-24_18-49-51.jpg",
      gallery: [
        "sborki/pc5/photo_2026-10-24_18-49-51.jpg",
        "sborki/pc5/photo_2026-10-24_18-49-54.jpg",
        "sborki/pc5/photo_2026-10-24_18-49-56.jpg",
        "sborki/pc5/photo_2026-10-24_18-49-59.jpg"
      ],
      specs: {
        cpu: "Intel Core i3-10100F (4 ядра / 8 потоков, до 4.3 GHz)",
        gpu: "MSI GeForce RTX 3050 GAMING 8GB GDDR6",
        ram: "16 GB DDR4 3200MHz",
        ssd: "Быстрый SSD накопитель 512GB",
        motherboard: "ASUS PRIME A520M-A / Совместимая",
        cooling: "Тихий кулер охлаждения",
        power: "Надежный блок питания с защитой",
        case: "Компактный игровой корпус с подсветкой",
        os: "Windows 10/11 Pro + драйверы"
      },
      fps: [
        { game: "CS2 / Dota 2 / GTA V", fps: "120–160+ FPS", quality: "Высокие" },
        { game: "Танки / Valorant", fps: "150+ FPS", quality: "Ультра" },
        { game: "Cyberpunk 2077 (1080p)", fps: "50–55 FPS", quality: "Средние + DLSS" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Самый доступный билет в современный гейминг с честной видеокартой RTX на 8GB памяти."
    },

    {
      id: "pc-2",
      name: "STINGER Start i5",
      subtitle: "Intel i5-11400F / RX 6500 XT / 16GB",
      category: "start",
      price: 41999,
      badge: "🚀 Народный Intel",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "Full HD 1080p High",
      primaryImage: "sborki/pc2/IMG_20260929_132954.jpg",
      gallery: [
        "sborki/pc2/IMG_20260929_132954.jpg",
        "sborki/pc2/IMG_20260929_133018.jpg",
        "sborki/pc2/IMG_20260929_133043.jpg",
        "sborki/pc2/IMG_20260929_133055.jpg",
        "sborki/pc2/IMG_20260929_133149.jpg"
      ],
      specs: {
        cpu: "Intel Core i5-11400F (6 ядер / 12 потоков, до 4.3 GHz)",
        gpu: "MSI / PowerColor Radeon RX 6500 GAMING OC 4GB",
        ram: "16 GB DDR4 (двухканальный режим)",
        ssd: "512 GB SSD Gigabyte",
        motherboard: "Gigabyte B560M H (PCI-e 4.0)",
        cooling: "Башенный кулер с тепловыми трубками",
        power: "COUGAR 650W надежный блок",
        case: "Продуваемый корпус с закаленным стеклом",
        os: "Windows 10/11 Pro + драйверы"
      },
      fps: [
        { game: "CS2 / Dota 2 / Valorant", fps: "180–220+ FPS", quality: "Киберспорт" },
        { game: "GTA V / Witcher 3 / PUBG", fps: "80–100+ FPS", quality: "Высокие" },
        { game: "Cyberpunk 2077 (1080p)", fps: "55–60 FPS", quality: "FSR" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Надежная платформа на Intel Core i5 11-го поколения с быстрым откликом системы."
    },

    {
      id: "pc-3",
      name: "STINGER Gamer v2",
      subtitle: "Ryzen 5 3600 / RX 5700 6GB / 16GB",
      category: "start",
      price: 42500,
      badge: "🎯 Выгодный выбор",
      isPrepayment: false,
      inStock: true,
      condition: "Б/у (идеальное состояние)",
      targetRes: "Full HD 1080p High",
      primaryImage: "sborki/pc3/IMG_20260907_122454.jpg",
      gallery: [
        "sborki/pc3/IMG_20260907_122454.jpg",
        "sborki/pc3/IMG_20260907_122501.jpg",
        "sborki/pc3/IMG_20260907_122525.jpg",
        "sborki/pc3/IMG_20260907_122537.jpg",
        "sborki/pc3/IMG_20260907_122606.jpg"
      ],
      specs: {
        cpu: "AMD Ryzen 5 3600 (6 ядер / 12 потоков, до 4.4 GHz)",
        gpu: "GIGABYTE Radeon RX 5700 GAMING OC 6GB (3 кулера)",
        ram: "16 GB DDR4 (работает в двухканале)",
        ssd: "512 GB быстрый SSD",
        motherboard: "Biostar B450M (надежная база)",
        cooling: "Башенный кулер с тепловыми трубками",
        power: "DEEPCOOL PF550 (550W)",
        case: "Стильный продуваемый корпус со стеклом",
        os: "Windows 10/11 Pro + софт"
      },
      fps: [
        { game: "CS2 / Valorant / Танки", fps: "180–240+ FPS", quality: "Киберспорт" },
        { game: "GTA V / PUBG / Rust", fps: "80–110+ FPS", quality: "Высокие" },
        { game: "Cyberpunk 2077 (1080p)", fps: "65–70 FPS", quality: "Средне-высокие" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Отличный вариант с 3-кулерной картой GIGABYTE Gaming OC, тихий и холодный в играх."
    },

    {
      id: "pc-1",
      name: "STINGER Balance",
      subtitle: "Ryzen 5 5600 / RX 5700 XT 8GB / 1TB SSD",
      category: "under100",
      price: 52500,
      badge: "⚡ Хит продаж",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "Full HD 1080p Ultra",
      primaryImage: "sborki/pc1/IMG_20260922_134447.jpg",
      gallery: [
        "sborki/pc1/IMG_20260922_134447.jpg",
        "sborki/pc1/IMG_20260922_134541.jpg",
        "sborki/pc1/IMG_20260922_134614.jpg",
        "sborki/pc1/IMG_20260922_134803.jpg",
        "sborki/pc1/IMG_20260922_134828.jpg",
        "sborki/pc1/IMG_20260922_134857.jpg"
      ],
      specs: {
        cpu: "AMD Ryzen 5 5600 (6 ядер / 12 потоков, до 4.4 GHz Turbo)",
        gpu: "MSI Radeon RX 5700 XT GAMING OC 8GB (Rev 2.0)",
        ram: "16 GB DDR4 (Dual Channel)",
        ssd: "1024 GB (1 TB) NVMe SSD",
        motherboard: "ASRock B450 Pro4 (PCI-e 4.0, радиаторы питания)",
        cooling: "Башенный кулер с тепловыми медными трубками",
        power: "DEEPCOOL PF650 (650W) честная мощность",
        case: "Продуваемый корпус с закаленным стеклом и кулерами",
        os: "Windows 10/11 Pro + драйверы"
      },
      fps: [
        { game: "CS2 / Dota 2 / Valorant", fps: "180–240+ FPS", quality: "Высокие / Киберспорт" },
        { game: "GTA V / Witcher 3 / Rust", fps: "80–110+ FPS", quality: "Высокие / Ультра" },
        { game: "Cyberpunk 2077 (1080p)", fps: "60–75+ FPS", quality: "Средне-высокие + FSR" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Идеально сбалансированный ПК с терабайтным SSD и мощной видеокартой на 8GB GDDR6."
    },

    {
      id: "pc-custom-1",
      name: "STINGER Cyber Neo",
      subtitle: "i5-12400F / RTX 3060 12GB / 16GB / 1TB SSD",
      category: "under100",
      price: 64900,
      badge: "🎮 12GB Памяти",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "1080p Ultra Gaming",
      primaryImage: "image/pc7.jpg",
      gallery: ["image/pc7.jpg"],
      specs: {
        cpu: "Intel Core i5-12400F (6/12 ядер, до 4.4 GHz)",
        gpu: "NVIDIA GeForce RTX 3060 12GB GDDR6",
        ram: "16 GB DDR4 3200MHz Dual Channel",
        ssd: "1024 GB (1 TB) NVMe M.2 SSD",
        motherboard: "MSI PRO B760M-E DDR4",
        cooling: "Башенный кулер с 4 теплотрубками",
        power: "650W DeepCool 80+ Bronze",
        case: "Игровой корпус со стеклом и ARGB-кулерами",
        os: "Windows 11 Pro"
      },
      fps: [
        { game: "Cyberpunk 2077 (1080p)", fps: "80+ FPS", quality: "Ультра + DLSS" },
        { game: "CS2 / Valorant", fps: "250+ FPS", quality: "Киберспорт" },
        { game: "GTA V / Witcher 3", fps: "130+ FPS", quality: "Ультра" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Народная сборка с огромным запасом видеопамяти 12GB под любые текстуры и моды."
    },

    {
      id: "pc-4",
      name: "STINGER Power",
      subtitle: "Ryzen 5 5600X / RTX 3080 10GB / 16GB",
      category: "under100",
      price: 71725,
      oldPrice: 75500,
      badge: "🔥 Топ до 100к",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "2K / 4K Ultra Gaming",
      primaryImage: "sborki/pc4/IMG_20260806_142923.jpg",
      gallery: [
        "sborki/pc4/IMG_20260806_142923.jpg",
        "sborki/pc4/IMG_20260806_143359.jpg",
        "sborki/pc4/IMG_20260806_143401.jpg",
        "sborki/pc4/IMG_20260806_143406_2.jpg",
        "sborki/pc4/IMG_20260806_143417.jpg"
      ],
      specs: {
        cpu: "AMD Ryzen 5 5600X (6 ядер / 12 потоков, до 4.6 GHz)",
        gpu: "NVIDIA GeForce RTX 3080 10GB Gainward Phoenix",
        ram: "16 GB DDR4 (Dual Channel, высокая частота)",
        ssd: "512 GB NVMe SSD (быстрый запуск системы)",
        motherboard: "ASRock B450 Steel Legend (ARGB, массивные радиаторы)",
        cooling: "Башенный кулер (процессор в тестах до 65°C)",
        power: "850W надежный блок с защитой от перепадов",
        case: "Игровой корпус со стеклом и ARGB-подсветкой",
        os: "Windows 10/11 Pro + драйверы"
      },
      fps: [
        { game: "CS2 / Valorant / Танки", fps: "300+ FPS", quality: "Ультра" },
        { game: "GTA V / Witcher 3 / PUBG", fps: "140–180+ FPS", quality: "2K Ультра" },
        { game: "Cyberpunk 2077 (2K)", fps: "80–110+ FPS", quality: "Ультра + DLSS" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Топовая сборка для бескомпромиссного гейминга в 2K и 4K на ультра-настройках с трассировкой лучей."
    },

    {
      id: "pc-custom-2",
      name: "STINGER Pulse White",
      subtitle: "Ryzen 5 5600X / RTX 4060 8GB White / 32GB RAM",
      category: "under100",
      price: 79900,
      badge: "🤍 Белый стиль",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "1080p Ultra / 2K High",
      primaryImage: "image/pc6.jpg",
      gallery: ["image/pc6.jpg"],
      specs: {
        cpu: "AMD Ryzen 5 5600X (6 ядер / 12 потоков, 4.6 GHz)",
        gpu: "GeForce RTX 4060 8GB White Edition (DLSS 3.5)",
        ram: "32 GB DDR4 3200MHz White RGB",
        ssd: "1024 GB (1 TB) M.2 NVMe SSD",
        motherboard: "GIGABYTE B550 Gaming X V2",
        cooling: "Башенный кулер White ARGB 4 трубки",
        power: "650W 80+ Bronze Certified",
        case: "Белый аквариум с панорамным стеклом",
        os: "Windows 11 Pro"
      },
      fps: [
        { game: "Cyberpunk 2077 (1080p)", fps: "88+ FPS", quality: "Ультра + DLSS 3" },
        { game: "CS2 / Valorant", fps: "270+ FPS", quality: "Киберспорт" },
        { game: "GTA V / RDR 2", fps: "145+ FPS", quality: "Высокие" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Эстетичный белоснежный корпус с панорамным стеклом и видеокартой серии RTX 40 с генерацией кадров."
    },

    {
      id: "pc-7",
      name: "STINGER Apex Cyber",
      subtitle: "Core i5-13400F / RTX 4060 Ti 16GB / 32GB RAM",
      category: "under100",
      price: 89900,
      badge: "⚡ Максимум до 100к",
      isPrepayment: false,
      inStock: true,
      condition: "Новое",
      targetRes: "1080p Ultra / 2K",
      primaryImage: "image/pc7.jpg",
      gallery: ["image/pc7.jpg"],
      specs: {
        cpu: "Intel Core i5-13400F (10 ядер / 16 потоков, до 4.6 GHz)",
        gpu: "ASUS ROG RTX 4060 Ti 16GB GDDR6 (с запасом памяти)",
        ram: "32 GB DDR4 3600MHz Dual Channel",
        ssd: "1024 GB (1 TB) NVMe SSD",
        motherboard: "MSI B760 GAMING PLUS",
        cooling: "СЖО 240mm ARGB с тихой помпой",
        power: "700W 80+ Bronze Certified",
        case: "Montech Sky Two ARGB Glass",
        os: "Windows 11 Pro"
      },
      fps: [
        { game: "Cyberpunk 2077 (1080p)", fps: "95+ FPS", quality: "Ультра" },
        { game: "CS2 / Valorant", fps: "290+ FPS", quality: "Киберспорт" },
        { game: "GTA V / Witcher 3", fps: "135+ FPS", quality: "Высокие" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Сбалансированная сборка с 16GB видеопамяти для современных требовательных новинок и стримов."
    },

    {
      id: "pc-6",
      name: "STINGER White Aquarium",
      subtitle: "Ryzen 7 7800X3D / RTX 4070 Super 12GB / White",
      category: "prepayment",
      price: 119900,
      badge: "⚡ ПО ПРЕДОПЛАТЕ",
      isPrepayment: true,
      inStock: false,
      condition: "Новое (Сборка под заказ)",
      targetRes: "2K Ultra Gaming",
      primaryImage: "image/pc6.jpg",
      gallery: ["image/pc6.jpg"],
      specs: {
        cpu: "AMD Ryzen 7 7800X3D (Топ игровой CPU мира)",
        gpu: "ZOTAC Gaming GeForce RTX 4070 Super White 12GB",
        ram: "32 GB DDR5 6000MHz White RGB",
        ssd: "1024 GB (1 TB) NVMe M.2 SSD",
        motherboard: "ASUS ROG STRIX B650-A GAMING WIFI White",
        cooling: "СЖО 360mm White с дисплеем температуры",
        power: "750W White 80+ Gold Modular",
        case: "HYTE Y60 White Panoramic Glass",
        os: "Windows 11 Pro"
      },
      fps: [
        { game: "Cyberpunk 2077 (2K)", fps: "92+ FPS", quality: "2K Ультра" },
        { game: "CS2 / Valorant", fps: "360+ FPS", quality: "Киберспорт" },
        { game: "GTA V / Rust", fps: "140+ FPS", quality: "2K Ультра" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Сборка премиум-класса свыше 100 000 ₽. Выполняется под заказ по предоплате с фото и видеоотчетом сборки."
    },

    {
      id: "pc-8",
      name: "STINGER Stealth Pro",
      subtitle: "Ryzen 7 7700X / RTX 4070 Ti Super 16GB / Dark",
      category: "prepayment",
      price: 149900,
      badge: "⚡ ПО ПРЕДОПЛАТЕ",
      isPrepayment: true,
      inStock: false,
      condition: "Новое (Сборка под заказ)",
      targetRes: "2K Ultra 144Hz",
      primaryImage: "image/pc8.jpg",
      gallery: ["image/pc8.jpg"],
      specs: {
        cpu: "AMD Ryzen 7 7700X (8 ядер / 16 потоков, до 5.4 GHz)",
        gpu: "NVIDIA GeForce RTX 4070 Ti Super 16GB GDDR6X",
        ram: "32 GB DDR5 6000MHz G.Skill Flare X5",
        ssd: "1024 GB (1 TB) NVMe M.2 PCIe 4.0",
        motherboard: "GIGABYTE B650 AORUS ELITE AX",
        cooling: "Двухсекционный кулер Noctua Chromax Black",
        power: "850W be quiet! Pure Power 12 M Gold",
        case: "Fractal North Dark с элементами орехового дерева",
        os: "Windows 11 Pro"
      },
      fps: [
        { game: "Cyberpunk 2077 (2K)", fps: "102+ FPS", quality: "2K Ультра" },
        { game: "CS2 / Valorant", fps: "390+ FPS", quality: "Киберспорт" },
        { game: "Hogwarts / RDR 2", fps: "115+ FPS", quality: "2K Ультра" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Экстремальный ПК свыше 100 000 ₽. Выполняется по предоплате с максимальной кастомизацией под покупателя."
    }
  ]
};
