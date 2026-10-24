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

  // Примеры сборок для циклически меняющейся плашки (как на iden-pc)
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

  // Шаблон заявки на кастомную сборку (модалка "Сборка на заказ")
  customOrderTemplate:
`Здравствуйте! Хочу оформить индивидуальную сборку в STINGER PC:

💰 Бюджет: {budget}
🎨 Внешний вид: {aesthetic}
⚙️ Пожелания по железу: {hardware}
🚚 Доставка: {delivery}
📡 Wi-Fi и Bluetooth: {wifi}

Подскажите, пожалуйста, варианты сборки и сроки готовности?`,

  // Категории для каталога сборок
  categories: [
    { id: "all", name: "Все сборки (10)" },
    { id: "flagship", name: "👑 Флагманы (RTX 4080 / 4090)" },
    { id: "power", name: "🔥 Power & 2K (RTX 4070 / 3080)" },
    { id: "balance", name: "⚡ Баланс (RX 5700 XT / 4060 Ti)" },
    { id: "start", name: "🎮 Старт (до 45 000 ₽)" }
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
    // FPS показатели для графиков
    scores: {
      "pc-10": {
        name: "STINGER Legend (RTX 4090)",
        color: "from-amber-400 via-yellow-400 to-amber-500",
        badge: "👑 Абсолютный топ",
        "1080p": { cyberpunk: 175, cs2: 480, gta5: 235, dota2: 420, rdr2: 170, rust: 190, witcher3: 160, hogwarts: 155 },
        "1440p": { cyberpunk: 145, cs2: 440, gta5: 210, dota2: 390, rdr2: 150, rust: 175, witcher3: 140, hogwarts: 138 },
        "4k":    { cyberpunk: 105, cs2: 350, gta5: 165, dota2: 320, rdr2: 115, rust: 135, witcher3: 100, hogwarts: 98 }
      },
      "pc-9": {
        name: "STINGER Prime i7 (RTX 4080 Super)",
        color: "from-purple-500 to-indigo-500",
        badge: "🔥 Экстрим 4K",
        "1080p": { cyberpunk: 150, cs2: 430, gta5: 215, dota2: 380, rdr2: 145, rust: 165, witcher3: 135, hogwarts: 135 },
        "1440p": { cyberpunk: 120, cs2: 380, gta5: 185, dota2: 350, rdr2: 125, rust: 145, witcher3: 115, hogwarts: 115 },
        "4k":    { cyberpunk: 82,  cs2: 280, gta5: 135, dota2: 270, rdr2: 90,  rust: 110, witcher3: 78,  hogwarts: 78 }
      },
      "pc-8": {
        name: "STINGER Stealth Pro (RTX 4070 Ti Super)",
        color: "from-blue-500 to-cyan-500",
        badge: "⚡ Ультра 2K",
        "1080p": { cyberpunk: 130, cs2: 390, gta5: 195, dota2: 340, rdr2: 130, rust: 150, witcher3: 120, hogwarts: 120 },
        "1440p": { cyberpunk: 102, cs2: 330, gta5: 165, dota2: 300, rdr2: 105, rust: 130, witcher3: 98,  hogwarts: 98 },
        "4k":    { cyberpunk: 68,  cs2: 230, gta5: 115, dota2: 220, rdr2: 72,  rust: 88,  witcher3: 62,  hogwarts: 62 }
      },
      "pc-6": {
        name: "STINGER White Aquarium (RTX 4070 Super)",
        color: "from-cyan-400 to-teal-400",
        badge: "✨ Белый хит",
        "1080p": { cyberpunk: 118, cs2: 360, gta5: 185, dota2: 320, rdr2: 118, rust: 140, witcher3: 110, hogwarts: 110 },
        "1440p": { cyberpunk: 92,  cs2: 300, gta5: 150, dota2: 280, rdr2: 95,  rust: 118, witcher3: 88,  hogwarts: 86 },
        "4k":    { cyberpunk: 58,  cs2: 200, gta5: 98,  dota2: 195, rdr2: 60,  rust: 75,  witcher3: 52,  hogwarts: 50 }
      },
      "pc-4": {
        name: "STINGER Power (RTX 3080 10GB)",
        color: "from-amber-400 to-orange-500",
        badge: "Хит 2K",
        "1080p": { cyberpunk: 110, cs2: 340, gta5: 180, dota2: 300, rdr2: 110, rust: 130, witcher3: 102, hogwarts: 100 },
        "1440p": { cyberpunk: 85,  cs2: 280, gta5: 145, dota2: 250, rdr2: 85,  rust: 105, witcher3: 78,  hogwarts: 78 },
        "4k":    { cyberpunk: 52,  cs2: 180, gta5: 90,  dota2: 175, rdr2: 55,  rust: 68,  witcher3: 45,  hogwarts: 45 }
      },
      "pc-7": {
        name: "STINGER Apex Cyber (RTX 4060 Ti)",
        color: "from-fuchsia-500 to-pink-500",
        badge: "Киберспорт",
        "1080p": { cyberpunk: 95,  cs2: 290, gta5: 155, dota2: 270, rdr2: 92,  rust: 115, witcher3: 86,  hogwarts: 86 },
        "1440p": { cyberpunk: 70,  cs2: 230, gta5: 120, dota2: 220, rdr2: 68,  rust: 90,  witcher3: 65,  hogwarts: 62 },
        "4k":    { cyberpunk: 40,  cs2: 140, gta5: 72,  dota2: 140, rdr2: 42,  rust: 52,  witcher3: 38,  hogwarts: 36 }
      },
      "pc-1": {
        name: "STINGER Balance (RX 5700 XT)",
        color: "from-cyan-400 to-blue-500",
        badge: "Баланс",
        "1080p": { cyberpunk: 75,  cs2: 240, gta5: 110, dota2: 230, rdr2: 75,  rust: 95,  witcher3: 70,  hogwarts: 68 },
        "1440p": { cyberpunk: 52,  cs2: 180, gta5: 80,  dota2: 170, rdr2: 52,  rust: 70,  witcher3: 48,  hogwarts: 45 },
        "4k":    { cyberpunk: 30,  cs2: 110, gta5: 50,  dota2: 110, rdr2: 32,  rust: 42,  witcher3: 28,  hogwarts: 26 }
      },
      "pc-3": {
        name: "STINGER Gamer v2 (RX 5700)",
        color: "from-purple-400 to-indigo-500",
        badge: "Оптимум",
        "1080p": { cyberpunk: 68,  cs2: 220, gta5: 100, dota2: 210, rdr2: 68,  rust: 88,  witcher3: 64,  hogwarts: 62 },
        "1440p": { cyberpunk: 46,  cs2: 160, gta5: 72,  dota2: 150, rdr2: 45,  rust: 62,  witcher3: 40,  hogwarts: 38 },
        "4k":    { cyberpunk: 26,  cs2: 95,  gta5: 42,  dota2: 95,  rdr2: 26,  rust: 35,  witcher3: 22,  hogwarts: 22 }
      },
      "pc-2": {
        name: "STINGER Start i5 (RX 6500 XT)",
        color: "from-blue-400 to-cyan-500",
        badge: "Старт",
        "1080p": { cyberpunk: 60,  cs2: 200, gta5: 90,  dota2: 190, rdr2: 55,  rust: 78,  witcher3: 54,  hogwarts: 52 },
        "1440p": { cyberpunk: 38,  cs2: 130, gta5: 60,  dota2: 120, rdr2: 38,  rust: 52,  witcher3: 32,  hogwarts: 30 },
        "4k":    { cyberpunk: 20,  cs2: 75,  gta5: 32,  dota2: 75,  rdr2: 20,  rust: 28,  witcher3: 18,  hogwarts: 16 }
      },
      "pc-5": {
        name: "STINGER Entry (RTX 3050)",
        color: "from-slate-400 to-slate-500",
        badge: "Базовый",
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
      q: "Можно ли проверить компьютер перед покупкой?",
      a: "Да, обязательно! Вы можете приехать к нам на ул. Псковскую 33, лично запустить стресс-тесты (FurMark, OCCT, AIDA64) и любые интересующие вас игры. Мы не торопим и даем спокойно во всём убедиться."
    },
    {
      q: "Как купить через Авито Доставку?",
      a: "Нажмите кнопку «Заказать через Авито» на карточке нужного ПК. В диалоге мы согласуем отправку, снимем подробное видео тестов ПК перед упаковкой и отправим надежной бронебойной коробкой."
    },
    {
      q: "Установлена ли операционная система?",
      a: "Да, на всех компьютерах установлена и оптимизирована Windows 10/11 Pro, установлены последние драйверы видеокарты и чипсета. ПК полностью готов к играм сразу из розетки."
    },
    {
      q: "Можно ли собрать ПК по моим индивидуальным пожеланиям?",
      a: "Конечно! В блоке «Собери свой STINGER» нажмите «Собрать компьютер», укажите бюджет и пожелания по железу. Мы подберем лучшие комплектующие и согласуем сборку на Авито."
    }
  ],

  // Каталог: 10 ГОТОВЫХ СБОРОК ПК
  products: [
    {
      id: "pc-10",
      name: "STINGER Legend 4090",
      subtitle: "Ryzen 7 9800X3D / RTX 4090 24GB / 64GB DDR5",
      category: "flagship",
      price: 289900,
      oldPrice: 310000,
      badge: "👑 Ультимативный Флагман",
      inStock: true,
      condition: "Новое",
      targetRes: "4K Extreme Ray Tracing",
      primaryImage: "image/pc10.jpg",
      gallery: ["image/pc10.jpg"],
      specs: {
        cpu: "AMD Ryzen 7 9800X3D (8/16 до 5.2 GHz, 3D V-Cache)",
        gpu: "NVIDIA GeForce RTX 4090 24GB Founders Edition",
        ram: "64 GB DDR5 6400MHz Kingston Fury Beast",
        ssd: "2048 GB (2 TB) Samsung 990 PRO NVMe (7450 MB/s)",
        motherboard: "ASUS ROG STRIX X670E-E Gaming WiFi",
        cooling: "Кастомная система водяного охлаждения Hardline",
        power: "1200W Seasonic 80+ Platinum ATX 3.0",
        case: "Lian Li O11 Dynamic EVO XL + ARGB Infinity Fans",
        os: "Windows 11 Pro лицензия"
      },
      fps: [
        { game: "Cyberpunk 2077 (4K RT)", fps: "105+ FPS", quality: "4K Ультра" },
        { game: "CS2 / Valorant", fps: "480+ FPS", quality: "Киберспорт" },
        { game: "GTA V / RDR 2 (4K)", fps: "165+ FPS", quality: "4K Ультра" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Бескомпромиссный монстр для игр в честном 4K на максималках, рендера 8K видео и тяжелых нейросетей."
    },

    {
      id: "pc-9",
      name: "STINGER Prime i7",
      subtitle: "Core i7-14700KF / RTX 4080 Super 16GB / СЖО",
      category: "flagship",
      price: 194900,
      oldPrice: 209000,
      badge: "🔥 Экстрим 4K Гейминг",
      inStock: true,
      condition: "Новое",
      targetRes: "4K / 2K Ultra High FPS",
      primaryImage: "image/pc9.jpg",
      gallery: ["image/pc9.jpg"],
      specs: {
        cpu: "Intel Core i7-14700KF (20 ядер / 28 потоков, до 5.6 GHz)",
        gpu: "ASUS ROG Strix GeForce RTX 4080 Super 16GB",
        ram: "32 GB DDR5 6000MHz Corsair Vengeance RGB",
        ssd: "2048 GB (2 TB) Kingston KC3000 M.2 PCIe 4.0",
        motherboard: "MSI MAG Z790 TOMAHAWK WIFI",
        cooling: "СЖО ROG Ryujin 360mm с LCD-дисплеем",
        power: "1000W DeepCool PX1000G 80+ Gold",
        case: "Fractal Design Meshify 2 Dark TG",
        os: "Windows 11 Pro"
      },
      fps: [
        { game: "Cyberpunk 2077 (2K RT)", fps: "120+ FPS", quality: "2K Ультра" },
        { game: "CS2 / Valorant", fps: "430+ FPS", quality: "Киберспорт" },
        { game: "Witcher 3 / RDR 2", fps: "145+ FPS", quality: "2K Ультра" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Топовая сборка на Intel 14-го поколения с СЖО 360мм и монструозной картой RTX 4080 Super."
    },

    {
      id: "pc-8",
      name: "STINGER Stealth Pro",
      subtitle: "Ryzen 7 7700X / RTX 4070 Ti Super 16GB / Dark",
      category: "power",
      price: 159900,
      badge: "🖤 Строгий Stealth",
      inStock: true,
      condition: "Новое",
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
      description: "Идеально тихий и брутальный системный блок без раздражающей подсветки. Чистая мощь и эстетика."
    },

    {
      id: "pc-6",
      name: "STINGER White Aquarium",
      subtitle: "Ryzen 7 7800X3D / RTX 4070 Super 12GB / White",
      category: "power",
      price: 129900,
      badge: "🤍 Белоснежный Аквариум",
      inStock: true,
      condition: "Новое",
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
      description: "Белоснежный шоу-стоппер в панорамном стеклянном корпусе с лучшим игровым процессором на планете."
    },

    {
      id: "pc-7",
      name: "STINGER Apex Cyber",
      subtitle: "Core i5-13400F / RTX 4060 Ti 16GB / 32GB DDR5",
      category: "balance",
      price: 89900,
      badge: "⚡ Оптимум 2026",
      inStock: true,
      condition: "Новое",
      targetRes: "1080p Ultra / 2K",
      primaryImage: "image/pc7.jpg",
      gallery: ["image/pc7.jpg"],
      specs: {
        cpu: "Intel Core i5-13400F (10 ядер / 16 потоков, до 4.6 GHz)",
        gpu: "ASUS ROG RTX 4060 Ti 16GB GDDR6 (с запасом памяти)",
        ram: "32 GB DDR5 5600MHz Dual Channel",
        ssd: "1024 GB (1 TB) NVMe SSD",
        motherboard: "MSI B760 GAMING PLUS WIFI",
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
      id: "pc-4",
      name: "STINGER Power",
      subtitle: "Ryzen 5 5600X / RTX 3080 10GB / 16GB",
      category: "power",
      price: 71725,
      oldPrice: 75500,
      badge: "🔥 Топ • Скидка –5%",
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
        { game: "Cyberpunk 2077 / RDR 2", fps: "80–110+ FPS", quality: "Ультра + DLSS" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Топовая сборка для бескомпромиссного гейминга в 2K и 4K на ультра-настройках с трассировкой лучей."
    },

    {
      id: "pc-1",
      name: "STINGER Balance",
      subtitle: "Ryzen 5 5600 / RX 5700 XT 8GB / 1TB SSD",
      category: "balance",
      price: 52500,
      badge: "⚡ Хит продаж",
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
        { game: "Cyberpunk 2077 / RDR 2", fps: "60–75+ FPS", quality: "Средне-высокие + FSR" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Идеально сбалансированный ПК с терабайтным SSD и мощной видеокартой на 8GB GDDR6."
    },

    {
      id: "pc-3",
      name: "STINGER Gamer v2",
      subtitle: "Ryzen 5 3600 / RX 5700 6GB / 16GB",
      category: "start",
      price: 42500,
      badge: "🎯 Выгодный выбор",
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
        { game: "Cyberpunk 2077 / RDR 2", fps: "60–75+ FPS", quality: "Средне-высокие" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Отличный вариант с 3-кулерной картой GIGABYTE Gaming OC, тихий и холодный в играх."
    },

    {
      id: "pc-2",
      name: "STINGER Start i5",
      subtitle: "Intel i5-11400F / RX 6500 XT / 16GB",
      category: "start",
      price: 41999,
      badge: "🚀 Народный Intel",
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
        { game: "Cyberpunk 2077 / RDR 2", fps: "60–70+ FPS", quality: "FSR" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Надежная платформа на Intel Core i5 11-го поколения с быстрым откликом системы."
    },

    {
      id: "pc-5",
      name: "STINGER Entry",
      subtitle: "Intel i3-10100F / RTX 3050 8GB / 16GB",
      category: "start",
      price: 31299,
      badge: "💰 Суперцена",
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
        ssd: "Быстрый SSD накопитель",
        motherboard: "ASUS PRIME A520M-A / Совместимая",
        cooling: "Тихий кулер охлаждения",
        power: "Надежный блок питания с защитой",
        case: "Компактный игровой корпус с подсветкой",
        os: "Windows 10/11 Pro + драйверы"
      },
      fps: [
        { game: "CS2 / Dota 2 / GTA V", fps: "120–160+ FPS", quality: "Высокие" },
        { game: "Танки / Valorant", fps: "150+ FPS", quality: "Ультра" },
        { game: "Cyberpunk 2077", fps: "50–60 FPS", quality: "Средние + DLSS" }
      ],
      avitoUrl: "https://www.avito.ru",
      description: "Самый доступный билет в современный гейминг с честной видеокартой RTX на 8GB памяти."
    }
  ]
};
