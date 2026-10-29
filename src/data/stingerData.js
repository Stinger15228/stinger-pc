/**
 * STINGER PC — Полная база бизнес-данных и конфигуратора
 * 100% сохранение всех характеристик, реальных цен, адресов и матриц FPS
 */

export const SHOP_INFO = {
  name: "STINGER PC",
  brandSubtitle: "Кастомная лаборатория игровых ПК",
  city: "Великий Новгород",
  address: "ул. Псковская, д. 33",
  locationNote: "Псковский район, вход со стороны улицы (вывеска STINGER)",
  workHours: "Ежедневно с 10:00 до 22:00",
  chatHours: "Сообщения в Авито и TG принимаем 24/7",
  warranty: "3 месяца гарантии с личной проверкой",
  rating: "5.0",
  reviewsCount: "85+",
  avitoUrl: "https://www.avito.ru",
  telegramUrl: "https://t.me/stinger_pc",
  vkUrl: "https://vk.com/stinger_pc",
  phone: "+7 (999) 000-00-00",
  phoneDisplay: "+7 (999) 000-00-00",
  logo: "./image/logo.jpg",
  heroImage: "./image/custom_pc_mystery.jpg",
};

// 10 ГОТОВЫХ СБОРОК В КАТАЛОГЕ
export const READY_BUILDS = [
  {
    id: "pc-5",
    name: "STINGER Entry",
    subtitle: "Intel Core i3-10100F / RTX 3050 8GB / 16GB RAM",
    price: 31299,
    badge: "💰 Суперцена до 35к",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p FHD eSports",
    tierColor: "from-blue-500/20 via-cyan-500/10 to-transparent",
    glowColor: "rgba(6, 182, 212, 0.4)",
    primaryImage: "./sborki/pc5/photo_2026-10-24_18-49-51.jpg",
    gallery: [
      "./sborki/pc5/photo_2026-10-24_18-49-51.jpg",
      "./sborki/pc5/photo_2026-10-24_18-49-54.jpg",
      "./sborki/pc5/photo_2026-10-24_18-49-56.jpg",
      "./sborki/pc5/photo_2026-10-24_18-49-59.jpg",
    ],
    specs: {
      cpu: "Intel Core i3-10100F (4 ядра / 8 потоков, до 4.3 GHz)",
      gpu: "MSI GeForce RTX 3050 GAMING 8GB GDDR6",
      ram: "16 GB DDR4 3200MHz Dual Channel",
      ssd: "512 GB M.2 NVMe SSD (быстрая загрузка)",
      motherboard: "H510M / A520M Ultra Durable",
      cooling: "Башенный кулер с медными трубками (тихий)",
      power: "500W с комплексом защит OVP/SCP",
      case: "Компактный игровой корпус с закаленным стеклом",
      os: "Windows 11 Pro + драйверы + BIOS оптимизация",
    },
    highlights: ["Честные 8GB видеопамяти", "Холодный и тихий", "Идеален для CS2 и танков"],
    avitoUrl: "https://www.avito.ru",
    description: "Самый доступный билет в современный гейминг с полноценной картой RTX на 8GB памяти с поддержкой DLSS.",
  },
  {
    id: "pc-2",
    name: "STINGER Start i5",
    subtitle: "Intel Core i5-11400F / RX 6500 XT / 16GB RAM",
    price: 41999,
    badge: "🚀 Народный 6-ядерник",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p Высокие",
    tierColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
    glowColor: "rgba(14, 165, 233, 0.4)",
    primaryImage: "./sborki/pc2/IMG_20260929_132954.jpg",
    gallery: [
      "./sborki/pc2/IMG_20260929_132954.jpg",
      "./sborki/pc2/IMG_20260929_133018.jpg",
      "./sborki/pc2/IMG_20260929_133043.jpg",
      "./sborki/pc2/IMG_20260929_133055.jpg",
      "./sborki/pc2/IMG_20260929_133149.jpg",
    ],
    specs: {
      cpu: "Intel Core i5-11400F (6 ядер / 12 потоков, до 4.4 GHz)",
      gpu: "AMD Radeon RX 6500 XT 4GB GDDR6",
      ram: "16 GB DDR4 3200MHz Dual Channel",
      ssd: "512 GB M.2 NVMe SSD",
      motherboard: "MSI H510M-A PRO",
      cooling: "DeepCool AG300 3 медные трубки",
      power: "550W 80+ Certified",
      case: "AeroCool Quantum с RGB-подсветкой",
      os: "Windows 11 Pro",
    },
    highlights: ["6 ядер / 12 потоков", "Быстрый SSD NVMe", "Свежая термопаста MX-4"],
    avitoUrl: "https://www.avito.ru",
    description: "Шестиядерный Intel i5 справляется с любыми соревновательными играми, учебой и рабочими задачами.",
  },
  {
    id: "pc-3",
    name: "STINGER Gamer v2",
    subtitle: "AMD Ryzen 5 3600 / RX 5700 8GB / 16GB RAM",
    price: 52999,
    badge: "🔥 Хит до 55 000 ₽",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p Ультра",
    tierColor: "from-purple-500/20 via-indigo-500/10 to-transparent",
    glowColor: "rgba(168, 85, 247, 0.4)",
    primaryImage: "./sborki/pc3/IMG_20260907_122454.jpg",
    gallery: [
      "./sborki/pc3/IMG_20260907_122454.jpg",
      "./sborki/pc3/IMG_20260907_122501.jpg",
      "./sborki/pc3/IMG_20260907_122525.jpg",
      "./sborki/pc3/IMG_20260907_122537.jpg",
      "./sborki/pc3/IMG_20260907_122606.jpg",
    ],
    specs: {
      cpu: "AMD Ryzen 5 3600 (6 ядер / 12 потоков, до 4.2 GHz)",
      gpu: "GIGABYTE Radeon RX 5700 8GB GDDR6 (256-bit)",
      ram: "16 GB DDR4 3200MHz Dual Channel",
      ssd: "512 GB M.2 NVMe SSD",
      motherboard: "GIGABYTE B450M DS3H",
      cooling: "ID-Cooling SE-214-XT ARGB 4 трубки",
      power: "600W 80+ Bronze",
      case: "Powercase Mistral Micro Z3B Mesh",
      os: "Windows 11 Pro",
    },
    highlights: ["Шина 256-бит 8GB", "Отличный обдув Mesh", "Холодная работа в играх"],
    avitoUrl: "https://www.avito.ru",
    description: "Настоящий народный хит: мощная видеокарта с 256-битной шиной тянет современные новинки на высоких настройках.",
  },
  {
    id: "pc-1",
    name: "STINGER Balance",
    subtitle: "AMD Ryzen 5 5500 / RX 5700 XT 8GB / 16GB RAM",
    price: 58999,
    badge: "⚡ Уровень RTX 3060",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p Ultra / 2K High",
    tierColor: "from-purple-500/20 via-pink-500/10 to-transparent",
    glowColor: "rgba(217, 70, 239, 0.4)",
    primaryImage: "./sborki/pc1/IMG_20260922_134447.jpg",
    gallery: [
      "./sborki/pc1/IMG_20260922_134447.jpg",
      "./sborki/pc1/IMG_20260922_134541.jpg",
      "./sborki/pc1/IMG_20260922_134614.jpg",
      "./sborki/pc1/IMG_20260922_134803.jpg",
      "./sborki/pc1/IMG_20260922_134828.jpg",
      "./sborki/pc1/IMG_20260922_134857.jpg",
    ],
    specs: {
      cpu: "AMD Ryzen 5 5500 (6 ядер / 12 потоков Zen 3, до 4.2 GHz)",
      gpu: "MSI Radeon RX 5700 XT GAMING X 8GB GDDR6",
      ram: "16 GB DDR4 3200MHz Dual Channel",
      ssd: "512 GB M.2 NVMe SSD",
      motherboard: "ASUS PRIME A520M-K",
      cooling: "Башенный кулер 4 теплотрубки ARGB",
      power: "600W 80+ Bronze",
      case: "Montech X2 MESH с 3 кулерами",
      os: "Windows 11 Pro",
    },
    highlights: ["Архитектура Zen 3", "Металлическая видеокарта", "Уверенные 60+ FPS в 1080p"],
    avitoUrl: "https://www.avito.ru",
    description: "Связка процессора Zen 3 и мощной RX 5700 XT выдает производительность уровня RTX 3060 за гораздо меньшие деньги.",
  },
  {
    id: "pc-custom-1",
    name: "STINGER Cyber Neo",
    subtitle: "Ryzen 5 5600 / RTX 3060 12GB / 32GB RAM",
    price: 68900,
    badge: "👑 Топ продаж (12GB)",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p Ultra / 2K Mid",
    tierColor: "from-teal-500/20 via-cyan-500/10 to-transparent",
    glowColor: "rgba(20, 184, 166, 0.4)",
    primaryImage: "./sborki/pc4/IMG_20260806_142923.jpg",
    gallery: [
      "./sborki/pc4/IMG_20260806_142923.jpg",
      "./sborki/pc4/IMG_20260806_143359.jpg",
      "./sborki/pc4/IMG_20260806_143401.jpg",
      "./sborki/pc4/IMG_20260806_143406_2.jpg",
      "./sborki/pc4/IMG_20260806_143417.jpg",
    ],
    specs: {
      cpu: "AMD Ryzen 5 5600 (6 ядер / 12 потоков, 32MB L3 Cache, 4.4 GHz)",
      gpu: "GeForce RTX 3060 12GB GDDR6 (огромный запас видеопамяти)",
      ram: "32 GB DDR4 3200MHz Dual Channel (2x16GB)",
      ssd: "1024 GB (1 TB) M.2 NVMe SSD",
      motherboard: "GIGABYTE B550M DS3H",
      cooling: "DeepCool AK400 Digital с дисплеем температуры",
      power: "650W 80+ Bronze",
      case: "DeepCool CC560 V2 с 4 вентиляторами",
      os: "Windows 11 Pro",
    },
    highlights: ["12GB видеопамяти", "32GB оперативки", "1000GB SSD"],
    avitoUrl: "https://www.avito.ru",
    description: "Безусловный фаворит покупателей: 12GB видеопамяти и 32GB оперативки гарантируют запас прочности на годы вперед.",
  },
  {
    id: "pc-4",
    name: "STINGER Power",
    subtitle: "Core i5-12400F / RTX 3080 10GB / 32GB RAM",
    price: 74900,
    badge: "⚡ Мощный 2K Флагман",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "2K Quad HD Ultra",
    tierColor: "from-amber-500/20 via-orange-500/10 to-transparent",
    glowColor: "rgba(245, 158, 11, 0.4)",
    primaryImage: "./image/pc8.jpg",
    gallery: ["./image/pc8.jpg"],
    specs: {
      cpu: "Intel Core i5-12400F (6 ядер / 12 потоков LGA1700, 4.4 GHz)",
      gpu: "GeForce RTX 3080 10GB GDDR6X 320-bit (Топ охлаждение)",
      ram: "32 GB DDR4 3600MHz Dual Channel",
      ssd: "1024 GB (1 TB) NVMe M.2 SSD",
      motherboard: "ASUS PRIME B760M-A WIFI",
      cooling: "Двухсекционный кулер 6 теплотрубок",
      power: "750W 80+ Gold Certified",
      case: "Cougar Duoface Pro RGB",
      os: "Windows 11 Pro",
    },
    highlights: ["Память GDDR6X", "Шина 320 бит", "Высокий FPS в 2K"],
    avitoUrl: "https://www.avito.ru",
    description: "Флагманский уровень графики для тех, кто хочет играть в тяжелые игры в 2K с трассировкой лучей.",
  },
  {
    id: "pc-custom-2",
    name: "STINGER Pulse White",
    subtitle: "Ryzen 5 5600X / RTX 4060 8GB White / 32GB RAM",
    price: 79900,
    badge: "🤍 Белый стиль (DLSS 3)",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p Ultra / 2K High",
    tierColor: "from-violet-500/20 via-purple-500/10 to-transparent",
    glowColor: "rgba(139, 92, 246, 0.4)",
    primaryImage: "./image/pc6.jpg",
    gallery: ["./image/pc6.jpg"],
    specs: {
      cpu: "AMD Ryzen 5 5600X (6 ядер / 12 потоков, 4.6 GHz)",
      gpu: "GeForce RTX 4060 8GB White Edition (генерация кадров DLSS 3.5)",
      ram: "32 GB DDR4 3200MHz White RGB",
      ssd: "1024 GB (1 TB) M.2 NVMe SSD",
      motherboard: "GIGABYTE B550 Gaming X V2 White",
      cooling: "Башенный кулер White ARGB 4 трубки",
      power: "650W 80+ Bronze Certified",
      case: "Белый панорамный аквариум с двойным стеклом",
      os: "Windows 11 Pro",
    },
    highlights: ["Белоснежный аквариум", "DLSS 3 Frame Gen", "ARGB подсветка"],
    avitoUrl: "https://www.avito.ru",
    description: "Эстетичный белый корпус с панорамным обзором комплектующих и видеокартой 40-й серии с генерацией кадров.",
  },
  {
    id: "pc-7",
    name: "STINGER Apex Cyber",
    subtitle: "Core i5-13400F / RTX 4060 Ti 16GB / 32GB RAM",
    price: 89900,
    badge: "⚡ Максимум до 100к",
    isPrepayment: false,
    inStock: true,
    condition: "Новое",
    targetRes: "1080p Ultra / 2K",
    tierColor: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    glowColor: "rgba(217, 70, 239, 0.4)",
    primaryImage: "./image/pc7.jpg",
    gallery: ["./image/pc7.jpg"],
    specs: {
      cpu: "Intel Core i5-13400F (10 ядер / 16 потоков, до 4.6 GHz)",
      gpu: "ASUS Dual RTX 4060 Ti 16GB GDDR6 (удвоенная память)",
      ram: "32 GB DDR4 3600MHz Dual Channel",
      ssd: "1024 GB (1 TB) NVMe SSD",
      motherboard: "MSI B760 GAMING PLUS",
      cooling: "СЖО 240mm ARGB с тихой помпой",
      power: "700W 80+ Bronze Certified",
      case: "Montech Sky Two ARGB Glass",
      os: "Windows 11 Pro",
    },
    highlights: ["16GB видеопамяти", "10 ядер Intel", "Водяное охлаждение"],
    avitoUrl: "https://www.avito.ru",
    description: "Предельная конфигурация до 100 000 ₽ с 16GB видеопамяти — запас под самые прожорливые новинки 2026 года.",
  },
  {
    id: "pc-6",
    name: "STINGER White Aquarium",
    subtitle: "Ryzen 7 7800X3D / RTX 4070 Super 12GB / White СЖО",
    price: 119900,
    badge: "⚡ ПО ПРЕДОПЛАТЕ",
    isPrepayment: true,
    inStock: false,
    condition: "Новое (Сборка под заказ)",
    targetRes: "2K Ultra 144Hz",
    tierColor: "from-cyan-400/20 via-teal-400/10 to-transparent",
    glowColor: "rgba(45, 212, 191, 0.5)",
    primaryImage: "./image/pc6.jpg",
    gallery: ["./image/pc6.jpg"],
    specs: {
      cpu: "AMD Ryzen 7 7800X3D (Лучший игровой процессор мира)",
      gpu: "ZOTAC Gaming GeForce RTX 4070 Super White 12GB",
      ram: "32 GB DDR5 6000MHz White RGB",
      ssd: "1024 GB (1 TB) NVMe M.2 SSD",
      motherboard: "ASUS ROG STRIX B650-A GAMING WIFI White",
      cooling: "СЖО 360mm White с дисплеем температуры",
      power: "750W White 80+ Gold Modular",
      case: "HYTE Y60 White Panoramic Glass",
      os: "Windows 11 Pro",
    },
    highlights: ["Топ 1 игровой CPU мира", "СЖО 360mm с экраном", "Сборка по предоплате"],
    avitoUrl: "https://www.avito.ru",
    description: "Премиальная сборка свыше 100 000 ₽. Выполняется под заказ по предоплате с фото и видеоотчетом каждого шага сборки.",
  },
  {
    id: "pc-10",
    name: "STINGER Legend",
    subtitle: "Core i9-14900KF / RTX 4090 24GB / 64GB DDR5",
    price: 249900,
    badge: "👑 ФЛАГМАН 4K EXTREME",
    isPrepayment: true,
    inStock: false,
    condition: "Новое (Сборка под заказ)",
    targetRes: "4K Extreme Ultra",
    tierColor: "from-amber-400/25 via-yellow-400/10 to-transparent",
    glowColor: "rgba(251, 191, 36, 0.6)",
    primaryImage: "./image/pc10.jpg",
    gallery: ["./image/pc10.jpg"],
    specs: {
      cpu: "Intel Core i9-14900KF (24 ядра / 32 потока, до 6.0 GHz)",
      gpu: "NVIDIA GeForce RTX 4090 24GB GDDR6X Extreme",
      ram: "64 GB DDR5 6400MHz Dual Channel RGB",
      ssd: "2048 GB (2 TB) Samsung 990 PRO NVMe PCIe 4.0",
      motherboard: "ASUS ROG MAXIMUS Z790 HERO",
      cooling: "Кастомная СЖО 420mm с отдельным резервуаром",
      power: "1200W 80+ Platinum ATX 3.0",
      case: "Lian Li O11 Dynamic EVO XL",
      os: "Windows 11 Pro",
    },
    highlights: ["24GB флагман RTX 4090", "64GB DDR5 6400MHz", "Бескомпромиссная мощь"],
    avitoUrl: "https://www.avito.ru",
    description: "Бескомпромиссный флагман свыше 100 000 ₽ для 4K-гейминга, тяжелого 3D-рендера и нейросетей. Только по предоплате.",
  },
];

// ИГРЫ ДЛЯ СИМУЛЯТОРА И БЕНЧМАРКОВ
export const BENCHMARK_GAMES = [
  { id: "cyberpunk", name: "Cyberpunk 2077", badge: "Трассировка лучей / DLSS", maxFps: 180, icon: "flame" },
  { id: "cs2", name: "Counter-Strike 2", badge: "Киберспорт 240Hz+", maxFps: 480, icon: "crosshair" },
  { id: "gta5", name: "GTA V", badge: "Максимальные настройки", maxFps: 240, icon: "car" },
  { id: "dota2", name: "Dota 2 / Valorant", badge: "Высокий соревновательный FPS", maxFps: 420, icon: "swords" },
  { id: "rdr2", name: "Red Dead Redemption 2", badge: "Ультра графика", maxFps: 170, icon: "compass" },
  { id: "rust", name: "Rust", badge: "Высокая детализация", maxFps: 190, icon: "shield" },
  { id: "witcher3", name: "Ведьмак 3 Next-Gen", badge: "Ультра + RT", maxFps: 160, icon: "sparkles" },
  { id: "hogwarts", name: "Hogwarts Legacy", badge: "Ультра / DLSS", maxFps: 160, icon: "wand" },
];

export const BENCHMARK_RESOLUTIONS = [
  { id: "1080p", label: "Full HD (1080p)", sub: "1920×1080 • Высокий FPS" },
  { id: "1440p", label: "2K Quad HD (1440p)", sub: "2560×1440 • Оптимально" },
  { id: "4k", label: "4K Ultra HD (2160p)", sub: "3840×2160 • Премиум" },
];

// МАТРИЦА FPS ДЛЯ ВСЕХ 10 СБОРОК (ВКЛЮЧАЯ ЧЕСТНЫЕ 35 FPS ДЛЯ RTX 3050 В 2K)
export const HONEST_FPS_SCORES = {
  "pc-10": {
    "1080p": { cyberpunk: 175, cs2: 480, gta5: 235, dota2: 420, rdr2: 170, rust: 190, witcher3: 160, hogwarts: 155 },
    "1440p": { cyberpunk: 145, cs2: 440, gta5: 210, dota2: 390, rdr2: 150, rust: 175, witcher3: 140, hogwarts: 138 },
    "4k":    { cyberpunk: 105, cs2: 350, gta5: 165, dota2: 320, rdr2: 115, rust: 135, witcher3: 100, hogwarts: 98 },
  },
  "pc-6": {
    "1080p": { cyberpunk: 118, cs2: 360, gta5: 185, dota2: 320, rdr2: 118, rust: 140, witcher3: 110, hogwarts: 110 },
    "1440p": { cyberpunk: 92,  cs2: 300, gta5: 150, dota2: 280, rdr2: 95,  rust: 118, witcher3: 88,  hogwarts: 86 },
    "4k":    { cyberpunk: 58,  cs2: 200, gta5: 98,  dota2: 195, rdr2: 60,  rust: 75,  witcher3: 52,  hogwarts: 50 },
  },
  "pc-7": {
    "1080p": { cyberpunk: 95,  cs2: 290, gta5: 155, dota2: 270, rdr2: 92,  rust: 115, witcher3: 86,  hogwarts: 86 },
    "1440p": { cyberpunk: 70,  cs2: 230, gta5: 120, dota2: 220, rdr2: 68,  rust: 90,  witcher3: 65,  hogwarts: 62 },
    "4k":    { cyberpunk: 40,  cs2: 140, gta5: 72,  dota2: 140, rdr2: 42,  rust: 52,  witcher3: 38,  hogwarts: 36 },
  },
  "pc-custom-2": {
    "1080p": { cyberpunk: 88,  cs2: 270, gta5: 145, dota2: 250, rdr2: 85,  rust: 105, witcher3: 80,  hogwarts: 80 },
    "1440p": { cyberpunk: 62,  cs2: 210, gta5: 110, dota2: 200, rdr2: 62,  rust: 80,  witcher3: 58,  hogwarts: 55 },
    "4k":    { cyberpunk: 34,  cs2: 120, gta5: 62,  dota2: 120, rdr2: 36,  rust: 45,  witcher3: 30,  hogwarts: 28 },
  },
  "pc-4": {
    "1080p": { cyberpunk: 110, cs2: 340, gta5: 180, dota2: 300, rdr2: 110, rust: 130, witcher3: 102, hogwarts: 100 },
    "1440p": { cyberpunk: 85,  cs2: 280, gta5: 145, dota2: 250, rdr2: 85,  rust: 105, witcher3: 78,  hogwarts: 78 },
    "4k":    { cyberpunk: 52,  cs2: 180, gta5: 90,  dota2: 175, rdr2: 55,  rust: 68,  witcher3: 45,  hogwarts: 45 },
  },
  "pc-custom-1": {
    "1080p": { cyberpunk: 80,  cs2: 250, gta5: 130, dota2: 235, rdr2: 78,  rust: 98,  witcher3: 72,  hogwarts: 72 },
    "1440p": { cyberpunk: 55,  cs2: 190, gta5: 95,  dota2: 185, rdr2: 56,  rust: 72,  witcher3: 50,  hogwarts: 48 },
    "4k":    { cyberpunk: 28,  cs2: 105, gta5: 52,  dota2: 105, rdr2: 30,  rust: 40,  witcher3: 26,  hogwarts: 24 },
  },
  "pc-1": {
    "1080p": { cyberpunk: 75,  cs2: 240, gta5: 110, dota2: 230, rdr2: 75,  rust: 95,  witcher3: 70,  hogwarts: 68 },
    "1440p": { cyberpunk: 52,  cs2: 180, gta5: 80,  dota2: 170, rdr2: 52,  rust: 70,  witcher3: 48,  hogwarts: 45 },
    "4k":    { cyberpunk: 30,  cs2: 110, gta5: 50,  dota2: 110, rdr2: 32,  rust: 42,  witcher3: 28,  hogwarts: 26 },
  },
  "pc-3": {
    "1080p": { cyberpunk: 68,  cs2: 220, gta5: 100, dota2: 210, rdr2: 68,  rust: 88,  witcher3: 64,  hogwarts: 62 },
    "1440p": { cyberpunk: 46,  cs2: 160, gta5: 72,  dota2: 150, rdr2: 45,  rust: 62,  witcher3: 40,  hogwarts: 38 },
    "4k":    { cyberpunk: 26,  cs2: 95,  gta5: 42,  dota2: 95,  rdr2: 26,  rust: 35,  witcher3: 22,  hogwarts: 22 },
  },
  "pc-2": {
    "1080p": { cyberpunk: 60,  cs2: 200, gta5: 90,  dota2: 190, rdr2: 55,  rust: 78,  witcher3: 54,  hogwarts: 52 },
    "1440p": { cyberpunk: 38,  cs2: 130, gta5: 60,  dota2: 120, rdr2: 38,  rust: 52,  witcher3: 32,  hogwarts: 30 },
    "4k":    { cyberpunk: 20,  cs2: 75,  gta5: 32,  dota2: 75,  rdr2: 20,  rust: 28,  witcher3: 18,  hogwarts: 16 },
  },
  "pc-5": {
    "1080p": { cyberpunk: 55,  cs2: 160, gta5: 80,  dota2: 160, rdr2: 50,  rust: 72,  witcher3: 50,  hogwarts: 48 },
    "1440p": { cyberpunk: 35,  cs2: 110, gta5: 55,  dota2: 110, rdr2: 34,  rust: 48,  witcher3: 28,  hogwarts: 26 },
    "4k":    { cyberpunk: 18,  cs2: 65,  gta5: 28,  dota2: 65,  rdr2: 18,  rust: 24,  witcher3: 15,  hogwarts: 14 },
  },
};

// ЧЕСТНЫЙ БЕЙДЖ СТАТУСА FPS
export function getFpsComfortBadge(fps) {
  if (fps < 45) {
    return {
      text: `${fps} FPS • Тяжелый режим`,
      badgeClass: "bg-rose-950/60 text-rose-400 border-rose-500/40",
      indicatorColor: "#F43F5E",
      recommendation: "Рекомендуем снизить разрешение или включить FSR/DLSS",
    };
  } else if (fps < 60) {
    return {
      text: `${fps} FPS • Базовый гейминг`,
      badgeClass: "bg-amber-950/60 text-amber-400 border-amber-500/40",
      indicatorColor: "#F59E0B",
      recommendation: "Играбельно для сюжетных игр",
    };
  } else if (fps < 120) {
    return {
      text: `${fps} FPS • 60+ Комфортно`,
      badgeClass: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
      indicatorColor: "#10B981",
      recommendation: "Идеально плавная картинка",
    };
  } else if (fps < 240) {
    return {
      text: `${fps} FPS • 144Hz Ультра-плавно`,
      badgeClass: "bg-cyan-950/60 text-cyan-400 border-cyan-500/40",
      indicatorColor: "#00F0FF",
      recommendation: "Раскрывает мониторы 144Hz–165Hz",
    };
  } else {
    return {
      text: `${fps} FPS • 240Hz+ Киберспорт Топ`,
      badgeClass: "bg-purple-950/60 text-purple-300 border-purple-500/40",
      indicatorColor: "#8B5CF6",
      recommendation: "Максимальный соревновательный отклик",
    };
  }
}

// КОМПЛЕКТУЮЩИЕ ДЛЯ ОНЛАЙН-КОНФИГУРАТОРА
export const CONFIGURATOR_OPTIONS = {
  tasks: [
    { id: "esports", name: "Киберспорт", sub: "CS2, Valorant, Dota 2, Apex", icon: "crosshair", defaultGpu: "rtx3060", defaultCpu: "r5_5600" },
    { id: "aaa", name: "AAA-Гейминг (2K / 4K)", sub: "Cyberpunk, GTA V, RDR 2", icon: "flame", defaultGpu: "rtx4070s", defaultCpu: "r5_7500f" },
    { id: "content", name: "Стриминг и Монтаж", sub: "OBS, Premiere, Blender 3D", icon: "video", defaultGpu: "rtx4060ti", defaultCpu: "i5_13400f" },
    { id: "budget", name: "Народный бюджет", sub: "Максимум FPS на каждый рубль", icon: "coins", defaultGpu: "rx6600", defaultCpu: "r5_3600" },
  ],

  gpus: [
    // Бюджетные хиты и новинки
    { id: "rtx5060", name: "NVIDIA GeForce RTX 5060 12GB (Next-Gen)", tier: "Next-Gen Баланс (DLSS 4)", score: 76, price: 39000, defRes: "1080p / 2K Ultra", fpsMap: { cyberpunk: 92, cs2: 310, gta5: 160, dota2: 290, rdr2: 92, rust: 120 } },
    { id: "rtx5050", name: "NVIDIA GeForce RTX 5050 8GB (Next-Gen)", tier: "Next-Gen Старт 1080p", score: 66, price: 29000, defRes: "1080p Ultra", fpsMap: { cyberpunk: 70, cs2: 245, gta5: 130, dota2: 240, rdr2: 70, rust: 90 } },
    { id: "rtx4060", name: "NVIDIA GeForce RTX 4060 8GB", tier: "Хит продаж (DLSS 3)", score: 70, price: 34000, defRes: "1080p Ultra / 2K", fpsMap: { cyberpunk: 78, cs2: 265, gta5: 138, dota2: 255, rdr2: 78, rust: 100 } },
    { id: "rtx4060ti", name: "NVIDIA GeForce RTX 4060 Ti 16GB", tier: "Запас памяти 16GB", score: 73, price: 47000, defRes: "1080p Ultra / 2K", fpsMap: { cyberpunk: 85, cs2: 290, gta5: 155, dota2: 270, rdr2: 85, rust: 110 } },
    { id: "rtx3060", name: "NVIDIA GeForce RTX 3060 12GB", tier: "Народная 12GB памяти", score: 64, price: 27500, defRes: "1080p Ultra / 2K Mid", fpsMap: { cyberpunk: 65, cs2: 235, gta5: 125, dota2: 230, rdr2: 66, rust: 88 } },
    { id: "rtx3050", name: "MSI GeForce RTX 3050 8GB", tier: "Входной RTX (35 FPS в 2K)", score: 46, price: 17000, defRes: "1080p Medium-High", fpsMap: { cyberpunk: 35, cs2: 130, gta5: 70, dota2: 135, rdr2: 40, rust: 55 } },
    { id: "gtx1660s", name: "GeForce GTX 1660 Super 6GB", tier: "Бюджетный хит CS2/Танки", score: 42, price: 14500, defRes: "1080p High", fpsMap: { cyberpunk: 32, cs2: 145, gta5: 80, dota2: 145, rdr2: 38, rust: 52 } },

    // AMD аналоги
    { id: "rx7600", name: "AMD Radeon RX 7600 8GB", tier: "RDNA 3 / Аналог 4060", score: 68, price: 28500, defRes: "1080p Ultra", fpsMap: { cyberpunk: 72, cs2: 255, gta5: 132, dota2: 250, rdr2: 74, rust: 94 } },
    { id: "rx6650xt", name: "AMD Radeon RX 6650 XT 8GB", tier: "Быстрый 1080p Ультра", score: 66, price: 26000, defRes: "1080p Ultra", fpsMap: { cyberpunk: 70, cs2: 245, gta5: 128, dota2: 240, rdr2: 72, rust: 90 } },
    { id: "rx6600", name: "AMD Radeon RX 6600 8GB", tier: "Топ цена/качество до 25к", score: 62, price: 23500, defRes: "1080p Ultra", fpsMap: { cyberpunk: 62, cs2: 225, gta5: 118, dota2: 220, rdr2: 64, rust: 84 } },
    { id: "rx5700xt", name: "MSI Radeon RX 5700 XT 8GB", tier: "Уровень RTX 3060", score: 60, price: 21000, defRes: "1080p Ultra / 2K High", fpsMap: { cyberpunk: 55, cs2: 205, gta5: 110, dota2: 205, rdr2: 58, rust: 76 } },
    { id: "rx5700", name: "GIGABYTE Radeon RX 5700 8GB", tier: "Баланс High 1080p", score: 55, price: 18000, defRes: "1080p High", fpsMap: { cyberpunk: 48, cs2: 180, gta5: 95, dota2: 185, rdr2: 50, rust: 68 } },
    { id: "rx5500xt", name: "AMD Radeon RX 5500 XT 8GB", tier: "Доступный 8GB старт", score: 38, price: 12500, defRes: "1080p Medium", fpsMap: { cyberpunk: 30, cs2: 135, gta5: 75, dota2: 135, rdr2: 34, rust: 48 } },
    { id: "rx580", name: "AMD Radeon RX 580 8GB", tier: "Ультрабюджет 8GB", score: 34, price: 9500, defRes: "1080p Low-Mid", fpsMap: { cyberpunk: 28, cs2: 120, gta5: 70, dota2: 125, rdr2: 32, rust: 42 } },

    // Флагманы от 100к (по предоплате)
    { id: "rtx4070s", name: "NVIDIA GeForce RTX 4070 Super 12GB", tier: "Хит 2K Ultra", score: 80, price: 68000, defRes: "2K Ultra", fpsMap: { cyberpunk: 92, cs2: 300, gta5: 150, dota2: 280, rdr2: 95, rust: 118 } },
    { id: "rtx4070tis", name: "NVIDIA GeForce RTX 4070 Ti Super 16GB", tier: "⚡ По предоплате (>100к)", score: 85, price: 89000, defRes: "2K Ultra 144Hz", fpsMap: { cyberpunk: 102, cs2: 330, gta5: 165, dota2: 300, rdr2: 105, rust: 130 } },
    { id: "rtx4080s", name: "NVIDIA GeForce RTX 4080 Super 16GB", tier: "⚡ По предоплате (>100к)", score: 92, price: 115000, defRes: "4K / 2K Ultra", fpsMap: { cyberpunk: 120, cs2: 380, gta5: 185, dota2: 350, rdr2: 125, rust: 145 } },
    { id: "rtx4090", name: "NVIDIA GeForce RTX 4090 24GB", tier: "⚡ По предоплате (Флагман 4K)", score: 99, price: 185000, defRes: "4K Extreme Ultra", fpsMap: { cyberpunk: 145, cs2: 440, gta5: 210, dota2: 390, rdr2: 150, rust: 175 } },
  ],

  cpus: [
    // Бюджетные и народные
    { id: "i3_10100f", name: "Intel Core i3-10100F (4/8 ядер, 4.3 GHz)", price: 5500, tag: "Базовый старт 4 ядра", score: 12 },
    { id: "r5_3600", name: "AMD Ryzen 5 3600 (6/12 ядер, 4.2 GHz)", price: 7500, tag: "Бюджетный хит 6 ядер", score: 17 },
    { id: "i3_12100f", name: "Intel Core i3-12100F (4/8 ядер, LGA1700)", price: 7500, tag: "Быстрый 4 ядра LGA1700", score: 18 },
    { id: "r5_5500", name: "AMD Ryzen 5 5500 (6/12 ядер, 4.2 GHz)", price: 8500, tag: "Народный 6-ядерник AM4", score: 19 },
    { id: "i5_10400f", name: "Intel Core i5-10400F (6/12 ядер, 4.3 GHz)", price: 8900, tag: "Надежный 6 ядер Intel", score: 19 },
    { id: "i5_11400f", name: "Intel Core i5-11400F (6/12 ядер, 4.4 GHz)", price: 9500, tag: "Хит Intel LGA1200", score: 20 },
    { id: "r5_5600", name: "AMD Ryzen 5 5600 (6/12 ядер, 32MB кэш)", price: 11000, tag: "Главный хит продаж AM4", score: 22 },
    { id: "i5_12400f", name: "Intel Core i5-12400F (6/12 ядер, LGA1700)", price: 12500, tag: "Топ выбор LGA1700", score: 23 },
    { id: "r5_5600x", name: "AMD Ryzen 5 5600X (6/12 ядер, 4.6 GHz)", price: 13500, tag: "Для киберспорта 144Hz+", score: 24 },
    { id: "r7_5700x", name: "AMD Ryzen 7 5700X (8/16 ядер, 4.6 GHz)", price: 15500, tag: "8 ядер для стримов", score: 26 },
    { id: "r5_7500f", name: "AMD Ryzen 5 7500F (6/12 ядер, AM5 DDR5)", price: 16000, tag: "Вход в новую платформу AM5", score: 27 },
    { id: "i5_13400f", name: "Intel Core i5-13400F (10/16 ядер, 4.6 GHz)", price: 18000, tag: "10 ядер для работы и игр", score: 28 },
    // Топовые процессоры
    { id: "r7_7700x", name: "AMD Ryzen 7 7700X (8/16 ядер, 5.4 GHz)", price: 32000, tag: "Мощная AM5 база", score: 32 },
    { id: "i7_14700kf", name: "Intel Core i7-14700KF (20/28 ядер)", price: 41000, tag: "Для монтажа, 3D и игр", score: 34 },
    { id: "r7_7800x3d", name: "AMD Ryzen 7 7800X3D (8/16, 3D V-Cache)", price: 46000, tag: "Топ 1 игровой CPU мира", score: 36 },
  ],

  ram: [
    { id: "ram16_d4", name: "16 GB DDR4 Dual Channel 3200MHz", price: 3500, tag: "Базовый игровой стандарт" },
    { id: "ram32_d4", name: "32 GB DDR4 Dual Channel 3200MHz", price: 6500, tag: "Оптимально под любые игры" },
    { id: "ram32_d5", name: "32 GB DDR5 Dual Channel 6000MHz", price: 12500, tag: "Скоростная память AM5/LGA1700" },
    { id: "ram64_d5", name: "64 GB DDR5 Dual Channel 6400MHz", price: 24000, tag: "Для 3D, рендера и стримов" },
  ],

  ssd: [
    { id: "ssd512", name: "512 GB M.2 NVMe SSD", price: 3500, tag: "Быстрая загрузка ОС + 3-4 игры" },
    { id: "ssd1000", name: "1024 GB (1 TB) M.2 NVMe SSD", price: 6500, tag: "Хит по объему (рекомендуем)" },
    { id: "ssd2000", name: "2048 GB (2 TB) M.2 NVMe SSD", price: 13500, tag: "Для большой библиотеки игр" },
  ],

  cases: [
    { id: "case_mesh", name: "Stinger Airflow Mesh (Черный с продувом)", price: 3800, icon: "wind" },
    { id: "case_glass", name: "Cyber Glass ARGB (Закаленное стекло)", price: 5200, icon: "box" },
    { id: "case_white", name: "Snow White Panoramic (Белый аквариум)", price: 7900, icon: "sparkles" },
    { id: "case_stealth", name: "Stealth Dark Minimal (Строгий тихий корпус)", price: 5900, icon: "eye-off" },
  ],
};

// ДИНАМИЧЕСКИЙ РАСЧЕТ БАЗОВОЙ ПЛАТФОРМЫ
export function getDynamicBaseCost(gpuPrice, cpuPrice) {
  if (gpuPrice < 30000 && cpuPrice < 15000) {
    return 14000; // Доступная основа: A520M/H510M + кулер + БП 500-600W + стресс-тесты
  } else if (gpuPrice < 70000 && cpuPrice < 30000) {
    return 18500; // Средняя основа: B550/B760 + кулер 4-6 трубок + БП 650-700W Bronze + стресс-тесты
  } else {
    return 26000; // Топовая основа: B650/Z790 + БП 850W Gold + СЖО/топ кулер + стресс-тесты
  }
}

// BENTO-СЕТКА: ПОЧЕМУ STINGER PC — ЭТО УРОВЕНЬ СТУДИИ
export const QUALITY_BENTO = [
  {
    id: "cable-management",
    badge: "Эстетика и продув",
    title: "Кастомный кабель-менеджмент",
    desc: "Каждый кабель уложен по линейке, закреплен тканевыми стяжками и спрятан за задней стенкой. Никаких «бород» из проводов — идеальный воздушный поток.",
    icon: "layers",
    accent: "from-purple-500/20 to-indigo-500/10",
    stats: "100% чистый продув",
  },
  {
    id: "stress-test",
    badge: "Надежность 24ч",
    title: "Жесткий стресс-тест в 3 бенчмарках",
    desc: "Каждый компьютер проходит суточный прогон в FurMark, OCCT и AIDA64 Extreme. Проверяем температуры VRM, стабильность напряжений блока питания и 0 ошибок по памяти.",
    icon: "activity",
    accent: "from-cyan-500/20 to-blue-500/10",
    stats: "24ч под нагрузкой",
  },
  {
    id: "ready-to-play",
    badge: "Включил и играешь",
    title: "Максимальный FPS из коробки",
    desc: "Установлена чистая Windows 11 Pro без мусорного софта. Настроены XMP/EXPO тайминги памяти, обновлен BIOS материнской платы и накатаны свежие драйверы.",
    icon: "sparkles",
    accent: "from-emerald-500/20 to-teal-500/10",
    stats: "+10-15% к плавности",
  },
  {
    id: "local-workshop",
    badge: "Великий Новгород",
    title: "Личная проверка на Псковской, 33",
    desc: "Приезжайте в мастерскую, запускайте FurMark, Киберпанк или CS2 — время проверок не ограничиваем! Даем личную гарантию 3 месяца и фотоотчет сборки.",
    icon: "map-pin",
    accent: "from-amber-500/20 to-orange-500/10",
    stats: "Гарантия 3 месяца",
  },
];

// ОТЗЫВЫ КЛИЕНТОВ (РЕАЛЬНЫЙ РЕЙТИНГ АВИТО 5.0)
export const CLIENT_REVIEWS = [
  {
    id: 1,
    author: "Артём В.",
    city: "Великий Новгород",
    date: "18 октября 2026",
    rating: 5,
    build: "STINGER Pulse White (Ryzen 5 5600X + RTX 4060)",
    text: "Покупал компьютер сыну на день рождения. Приехали на Псковскую, мастер показал все тесты, температуры в FurMark не выше 62 градусов. Корпус выглядит просто космос, сын в восторге от CS2 на 250+ кадров. Рекомендую однозначно!",
  },
  {
    id: 2,
    author: "Михаил Д.",
    city: "Валдай (доставка СДЭК)",
    date: "12 октября 2026",
    rating: 5,
    build: "STINGER Cyber Neo (RTX 3060 12GB + 32GB RAM)",
    text: "Отправили в Валдай Авито Доставкой. Упаковка бронебойная — коробка в пупырке, внутри корпуса специальный надувной пакет, видеокарта не шелохнулась. Включил в розетку — винда уже настроена, всё летает.",
  },
  {
    id: 3,
    author: "Сергей П.",
    city: "Великий Новгород",
    date: "28 сентября 2026",
    rating: 5,
    build: "STINGER Entry (i3-10100F + RTX 3050 8GB)",
    text: "Искал максимально бюджетный игровой комп до 35 тысяч рублей. Собрали день в день! Играю в танки на ультрах и в GTA 5. Никаких переплат, мастер всё честно объяснил.",
  },
  {
    id: 4,
    author: "Дмитрий К.",
    city: "Санкт-Петербург",
    date: "15 сентября 2026",
    rating: 5,
    build: "STINGER Apex Cyber (i5-13400F + RTX 4060 Ti 16GB)",
    text: "Заказывал сборку под монтаж видео в Premiere и стримы. 16GB видеопамяти полностью оправдали себя при рендере в 4K. Кабель-менеджмент идеальный, даже придраться не к чему.",
  },
  {
    id: 5,
    author: "Евгений С.",
    city: "Великий Новгород",
    date: "04 сентября 2026",
    rating: 5,
    build: "STINGER Balance (Ryzen 5 5500 + RX 5700 XT)",
    text: "Отличный сервис на Псковской 33. Дали спокойно погонять тесты минут 40, ответили на все глупые вопросы. Компьютер бесшумный даже в тяжелых играх.",
  },
];

// ЧАСТЫЕ ВОПРОСЫ (FAQ)
export const FAQ_ITEMS = [
  {
    q: "Какие компьютеры есть в наличии, а какие под заказ?",
    a: "Все сборки до 100 000 ₽ обычно есть в наличии на ул. Псковской 33 либо собираются в течение 24 часов. Дорогие флагманы от 100 000 ₽ (с картами RTX 4070 Super / 4080 / 4090) собираются строго под заказ по предоплате с фото и видеоотчетом каждого этапа.",
  },
  {
    q: "Как оформить заказ через Авито Доставку в другой город?",
    a: "Нажмите кнопку «Заказать через Авито» на любой карточке или в конфигураторе — текст конфигурации скопируется, и откроется чат. Мы согласуем отправку, снимем подробное видео стресс-тестов перед отправкой и упакуем системный блок в бронебойный защитный бокс.",
  },
  {
    q: "Можно ли лично приехать и протестировать ПК перед покупкой?",
    a: "Да, обязательно! Мы находимся в Великом Новгороде на ул. Псковская, д. 33. Вы можете запустить любые бенчмарки (FurMark, OCCT, AIDA64, 3DMark) и ваши любимые игры. Мы не торопим и даем спокойно всё проверить.",
  },
  {
    q: "Какая гарантия предоставляется на компьютер?",
    a: "На все компьютеры действует гарантия 3 месяца с личной технической поддержкой мастера. Если возникнут вопросы по софту, драйверам или апгрейду — мы всегда на связи и оперативно помогаем.",
  },
  {
    q: "Можно ли сдать свой старый компьютер в зачет (Trade-In)?",
    a: "Да, мы принимаем старые системные блоки и отдельные видеокарты/процессоры в Trade-In. Оцениваем честно и вычитаем эту сумму из стоимости нового компьютера.",
  },
];
