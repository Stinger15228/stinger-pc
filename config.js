/**
 * STINGER PC — Главный конфигурационный файл магазина
 * 
 * В этом файле вы можете легко менять:
 * 1. Контакты и ссылки на соцсети/Авито
 * 2. Цены сборок
 * 3. Характеристики, описания и статус наличия
 * 
 * Все изменения автоматически отобразятся на сайте!
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
    warrantyMonths: 3,
  },

  // Ссылки на контакты (замените на свои реальные адреса)
  contacts: {
    // Основная ссылка на Авито (сообщения или профиль)
    // Например: "https://www.avito.ru/profile/messenger/channel/..." или ссылка на ваш профиль
    avitoUrl: "https://www.avito.ru", 

    // Ссылка на Telegram (канал, группа или лс)
    telegramUrl: "https://t.me/stinger_pc", 

    // Ссылка на группу ВКонтакте
    vkUrl: "https://vk.com/stinger_pc",

    // Контактный телефон для звонков и WhatsApp
    phone: "+7 (999) 000-00-00",
    phoneDisplay: "+7 (999) 000-00-00"
  },

  // Шаблон текста, который копируется в буфер обмена для Авито
  // Переменные: {name}, {price}, {cpu}, {gpu}, {ram}, {ssd}
  avitoMessageTemplate: 
`Здравствуйте! Меня заинтересовал ПК «{name}» за {price} ₽.
Характеристики:
• Процессор: {cpu}
• Видеокарта: {gpu}
• Память: {ram}
• Накопитель: {ssd}

Подскажите, актуальна ли сборка и когда можно подъехать на проверку / оформить заказ?`,

  // Категории для фильтрации
  categories: [
    { id: "all", name: "Все сборки", count: 5 },
    { id: "power", name: "🔥 Power (RTX 3080)" },
    { id: "balance", name: "⚡ Баланс (RX 5700 XT)" },
    { id: "start", name: "🎮 Старт (до 45 000 ₽)" }
  ],

  // Преимущества магазина (показываются в блоке "Почему мы")
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

  // Часто задаваемые вопросы (FAQ)
  faq: [
    {
      q: "Можно ли проверить компьютер перед покупкой?",
      a: "Да, обязательно! Вы можете приехать к нам на ул. Псковскую 33, лично запустить стресс-тесты (FurMark, OCCT, AIDA64) и любые интересующие вас игры. Мы не торопим и даем спокойно во всём убедиться."
    },
    {
      q: "Как купить через Авито Доставку?",
      a: "Нажмите кнопку «Написать на Авито» на карточке нужного ПК или скопируйте спецификацию. В диалоге мы согласуем отправку, снимем подробное видео тестов ПК перед упаковкой и отправим надежной бронебойной коробкой."
    },
    {
      q: "Установлена ли операционная система?",
      a: "Да, на всех компьютерах установлена и оптимизирована Windows 10/11 Pro, установлены последние драйверы видеокарты и чипсета. ПК полностью готов к играм сразу из розетки."
    },
    {
      q: "Можно ли изменить сборку (добавить SSD или RAM)?",
      a: "Конечно! По вашему желанию можем увеличить объем оперативной памяти (до 32GB) или добавить дополнительный быстрый SSD / жесткий диск. Напишите нам в чат Авито."
    }
  ],

  // Каталог сборок ПК
  products: [
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
      avitoUrl: "https://www.avito.ru", // Ссылка на объявление этого ПК
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
