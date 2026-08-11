/** Demo restaurant copy for RestA — fictional brand, taste only. */
export const site = {
  brand: "Очаг",
  product: "RestA",
  tagline: "Русский стол с душой",
  location: "Гостеприимство · кухня · банкеты",
  phone: "+7 (900) 000-00-00",
  email: "host@ochag.example",
} as const;

export const nav = [
  { href: "#welcome", label: "Приветствие" },
  { href: "#atmosphere", label: "Атмосфера" },
  { href: "#cuisine", label: "Кухня" },
  { href: "#banquet", label: "Банкеты" },
  { href: "#visit", label: "Визит" },
] as const;

export const hero = {
  headline: "Тёплый дом для долгих ужинов",
  support:
    "Тяжёлое дерево, белый лён и живой огонь гостеприимства — стол, к которому хочется возвращаться.",
  primaryCta: { href: "#visit", label: "Забронировать стол" },
  secondaryCta: { href: "#cuisine", label: "Смотреть кухню" },
  image: {
    src: "/images/atmosphere-table.jpg",
    alt: "Накрытый стол в зале с тёмным деревом и белым бельём",
  },
} as const;

export const atmosphere = {
  title: "Атмосфера",
  lead: "Зал как ремесло: балки, терракота, кружево и свет, в котором хочется остаться.",
  shots: [
    {
      src: "/images/atmosphere-hall.jpg",
      alt: "Зал с тёмными балками и накрытыми столами",
      caption: "Главный зал",
    },
    {
      src: "/images/atmosphere-banquet.jpg",
      alt: "Банкетный стол на длинной компании",
      caption: "Банкетный свет",
    },
    {
      src: "/images/atmosphere-nook.jpg",
      alt: "Уголок с народным декором и деревом",
      caption: "Уголок дома",
    },
    {
      src: "/images/atmosphere-ceiling.jpg",
      alt: "Деревянные балки и праздничный светильник",
      caption: "Потолок и праздник",
    },
  ],
} as const;

export const cuisine = {
  title: "Кухня",
  lead: "Сытные блюда русской традиции — без спешки, с уважением к продукту и сезону.",
  dishes: [
    {
      name: "Щи на костре",
      note: "Квашеные щи, томлёные часами, с бородинским хлебом",
    },
    {
      name: "Пельмени домашнего замеса",
      note: "Три начинки, сметана и крепкий бульон",
    },
    {
      name: "Жаркое в горшочке",
      note: "Мясо, коренья и дымный аромат печи",
    },
  ],
} as const;

export const banquet = {
  title: "Банкеты",
  lead: "Длинные столы, ленты на балках и место для большой компании — от семейного ужина до торжества.",
  points: [
    "Залы на 20–120 гостей",
    "Праздничный стол и индивидуальное меню",
    "Живая музыка и спокойный сервис",
  ],
  image: {
    src: "/images/atmosphere-banquet.jpg",
    alt: "Длинный банкетный стол под деревянными балками",
  },
  cta: { href: "#visit", label: "Обсудить банкет" },
} as const;

export const visit = {
  title: "Приходите в гости",
  lead: "Забронируйте стол или расскажите о событии — мы подготовим зал и меню.",
  hours: "Ежедневно 12:00–23:00",
  address: "Примерный адрес · ваш город",
} as const;
