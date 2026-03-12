function toBase64SvgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function createFrameSvg(options: {
  width: number;
  height: number;
  background: string;
  surface: string;
  accent: string;
  title: string;
  subtitle: string;
  badge: string;
}): string {
  const {
    width,
    height,
    background,
    surface,
    accent,
    title,
    subtitle,
    badge,
  } = options;

  return toBase64SvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <rect width="${width}" height="${height}" rx="28" fill="${background}"/>
      <rect x="28" y="28" width="${width - 56}" height="${height - 56}" rx="22" fill="${surface}" stroke="${accent}" stroke-opacity="0.22"/>
      <rect x="52" y="52" width="118" height="26" rx="13" fill="${accent}" fill-opacity="0.14"/>
      <text x="68" y="69" fill="${accent}" font-size="13" font-family="Arial, Helvetica, sans-serif">${badge}</text>
      <line x1="52" y1="${height - 118}" x2="${width - 52}" y2="${height - 118}" stroke="${accent}" stroke-opacity="0.16"/>
      <text x="52" y="${height - 152}" fill="#F4F1EB" font-size="30" font-family="Arial, Helvetica, sans-serif">${title}</text>
      <text x="52" y="${height - 116}" fill="#C7CED6" font-size="16" font-family="Arial, Helvetica, sans-serif">${subtitle}</text>
      <circle cx="${width - 116}" cy="96" r="22" fill="${accent}" fill-opacity="0.18"/>
      <circle cx="${width - 78}" cy="96" r="9" fill="${accent}"/>
      <path d="M52 ${height - 88}H${width - 52}" stroke="#C7CED6" stroke-opacity="0.14" stroke-dasharray="6 10"/>
    </svg>`,
  );
}

function createPortraitSvg(options: {
  width: number;
  height: number;
  background: string;
  accent: string;
  initials: string;
  caption: string;
}): string {
  const { width, height, background, accent, initials, caption } = options;

  return toBase64SvgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
      <rect width="${width}" height="${height}" rx="28" fill="${background}"/>
      <rect x="36" y="36" width="${width - 72}" height="${height - 72}" rx="24" fill="#20262D"/>
      <circle cx="${width / 2}" cy="${height / 2 - 56}" r="118" fill="${accent}" fill-opacity="0.12"/>
      <circle cx="${width / 2}" cy="${height / 2 - 64}" r="72" fill="#E9E4D9"/>
      <path d="M${width / 2 - 92} ${height / 2 + 112}C${width / 2 - 62} ${height / 2 + 22}, ${width / 2 + 62} ${height / 2 + 22}, ${width / 2 + 92} ${height / 2 + 112}V${height - 132}H${width / 2 - 92}Z" fill="#D6DDE3"/>
      <text x="${width / 2}" y="${height - 78}" fill="#F4F1EB" font-size="64" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">${initials}</text>
      <text x="${width / 2}" y="${height - 42}" fill="#C7CED6" font-size="18" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">${caption}</text>
    </svg>`,
  );
}

const palette = {
  paper: "#F7F4EF",
  dark: "#1E252C",
  surface: "#252E36",
  accent: "#B56C49",
  blue: "#4E687D",
};

export const placeholderImages = {
  logo: createFrameSvg({
    width: 160,
    height: 48,
    background: palette.paper,
    surface: palette.surface,
    accent: palette.accent,
    badge: "LOGO",
    title: "JD",
    subtitle: "John Doe",
  }),
  hero: createFrameSvg({
    width: 1600,
    height: 960,
    background: palette.dark,
    surface: palette.surface,
    accent: palette.accent,
    badge: "HERO",
    title: "Systems journal",
    subtitle: "Calm editorial placeholder for the main hero visual",
  }),
  portrait: createPortraitSvg({
    width: 900,
    height: 1200,
    background: palette.paper,
    accent: palette.accent,
    initials: "JD",
    caption: "Editorial portrait placeholder",
  }),
  article: createFrameSvg({
    width: 1280,
    height: 760,
    background: palette.dark,
    surface: palette.surface,
    accent: palette.blue,
    badge: "ARTICLE",
    title: "Operator note",
    subtitle: "Replace with article cover or annotated screenshot",
  }),
  book: createFrameSvg({
    width: 820,
    height: 1120,
    background: palette.paper,
    surface: "#EAE4D8",
    accent: palette.accent,
    badge: "BOOK",
    title: "Field manual",
    subtitle: "Replace with real cover art",
  }),
  project: createFrameSvg({
    width: 1280,
    height: 760,
    background: "#232A31",
    surface: "#2B343D",
    accent: palette.blue,
    badge: "PROJECT",
    title: "Product evidence",
    subtitle: "Replace with dashboard, chart, or interface screenshot",
  }),
  media: createFrameSvg({
    width: 1280,
    height: 760,
    background: palette.dark,
    surface: "#29323A",
    accent: palette.accent,
    badge: "MEDIA",
    title: "Interview still",
    subtitle: "Replace with podcast, talk, or platform artwork",
  }),
};
