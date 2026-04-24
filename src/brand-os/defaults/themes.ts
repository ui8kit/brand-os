import { BrandContrastBudget, BrandOsSchema, BrandTheme, StringMap } from '../types.js';
import { pickReadableForeground } from '../utils/color.js';

const DEFAULT_LIGHT_BACKGROUND = 'hsl(0 0% 100%)';
const DEFAULT_LIGHT_FOREGROUND = 'hsl(222 47% 11%)';
const DEFAULT_DARK_BACKGROUND = 'hsl(222 47% 11%)';
const DEFAULT_DARK_FOREGROUND = 'hsl(210 40% 98%)';

export const DEFAULT_CONTRAST_BUDGET: Required<BrandContrastBudget> = {
  minBodyAA: 4.5,
  minLargeAA: 3,
  minHeadingOnDark: 7,
};

function withFallback(map: Partial<StringMap> | undefined, key: string, fallback: string): string {
  return map?.[key] ?? fallback;
}

function pickToken(map: Partial<StringMap> | undefined, keys: string[], fallback: string): string {
  for (const key of keys) {
    const value = map?.[key];
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  }

  return fallback;
}

export function resolveColorModes(schema: BrandOsSchema): { light: StringMap; dark: StringMap } {
  const light = {
    background: DEFAULT_LIGHT_BACKGROUND,
    foreground: DEFAULT_LIGHT_FOREGROUND,
    card: pickToken(schema.tokens.color.light, ['card'], DEFAULT_LIGHT_BACKGROUND),
    popover: pickToken(schema.tokens.color.light, ['popover'], DEFAULT_LIGHT_BACKGROUND),
    primary: pickToken(schema.tokens.color.light, ['primary'], 'hsl(222 47% 11%)'),
    primaryForeground: pickToken(schema.tokens.color.light, ['primaryForeground', 'primary-foreground'], '#ffffff'),
    secondary: pickToken(schema.tokens.color.light, ['secondary'], 'hsl(210 40% 96%)'),
    secondaryForeground: pickToken(schema.tokens.color.light, ['secondaryForeground', 'secondary-foreground'], 'hsl(222 47% 16%)'),
    muted: pickToken(schema.tokens.color.light, ['muted'], 'hsl(210 40% 96%)'),
    mutedForeground: pickToken(schema.tokens.color.light, ['mutedForeground', 'muted-foreground'], 'hsl(215 16% 40%)'),
    accent: pickToken(schema.tokens.color.light, ['accent'], pickToken(schema.tokens.color.light, ['primary'], 'hsl(222 47% 11%)')),
    accentForeground: pickToken(schema.tokens.color.light, ['accentForeground', 'accent-foreground'], 'hsl(222 47% 11%)'),
    destructive: pickToken(schema.tokens.color.light, ['destructive'], 'hsl(0 84% 60%)'),
    destructiveForeground: pickToken(schema.tokens.color.light, ['destructiveForeground', 'destructive-foreground'], '#ffffff'),
    border: pickToken(schema.tokens.color.light, ['border'], 'hsl(214 32% 91%)'),
    input: pickToken(schema.tokens.color.light, ['input'], 'hsl(214 32% 91%)'),
    ring: pickToken(schema.tokens.color.light, ['ring'], pickToken(schema.tokens.color.light, ['primary'], 'hsl(222 47% 11%)')),
    ...schema.tokens.color.light,
  };

  const darkPrimary = pickToken(schema.tokens.color.dark, ['primary'], light.primary);
  const darkAccent = pickToken(schema.tokens.color.dark, ['accent'], light.accent);
  const darkDestructive = pickToken(schema.tokens.color.dark, ['destructive'], light.destructive);
  const dark = {
    background: DEFAULT_DARK_BACKGROUND,
    foreground: DEFAULT_DARK_FOREGROUND,
    card: 'hsl(222 42% 14%)',
    popover: 'hsl(222 42% 14%)',
    primary: darkPrimary,
    primaryForeground: pickToken(schema.tokens.color.dark, ['primaryForeground', 'primary-foreground'], pickReadableForeground(darkPrimary)),
    secondary: 'hsl(217 33% 18%)',
    secondaryForeground: DEFAULT_DARK_FOREGROUND,
    muted: 'hsl(217 33% 18%)',
    mutedForeground: 'hsl(215 20% 68%)',
    accent: darkAccent,
    accentForeground: pickToken(schema.tokens.color.dark, ['accentForeground', 'accent-foreground'], pickReadableForeground(darkAccent)),
    destructive: darkDestructive,
    destructiveForeground: pickToken(schema.tokens.color.dark, ['destructiveForeground', 'destructive-foreground'], pickReadableForeground(darkDestructive)),
    border: 'hsl(217 33% 24%)',
    input: 'hsl(217 33% 24%)',
    ring: pickToken(schema.tokens.color.dark, ['ring'], darkPrimary),
    ...schema.tokens.color.dark,
  };

  return { light, dark };
}

function theme(
  base: 'light' | 'dark',
  label: string,
  intent: BrandTheme['intent'],
  overrides: Partial<StringMap>,
  contrastBudget?: BrandContrastBudget,
): BrandTheme {
  return {
    base,
    label,
    intent,
    overrides,
    contrastBudget: {
      ...DEFAULT_CONTRAST_BUDGET,
      ...contrastBudget,
    },
  };
}

export function buildDefaultThemes(schema: BrandOsSchema): Record<string, BrandTheme> {
  const colors = resolveColorModes(schema);

  return {
    light: theme('light', 'Light', 'paper', {}, DEFAULT_CONTRAST_BUDGET),
    dark: theme('dark', 'Dark', 'midnight', {}, DEFAULT_CONTRAST_BUDGET),
    paper: theme('light', 'Paper', 'paper', {
      background: 'hsl(42 30% 97%)',
      card: 'hsl(42 25% 99%)',
      popover: 'hsl(42 25% 99%)',
      border: 'hsl(35 22% 85%)',
      input: 'hsl(35 22% 85%)',
      muted: 'hsl(42 18% 92%)',
      mutedForeground: 'hsl(28 14% 34%)',
    }),
    dusk: theme('dark', 'Dusk', 'dusk', {
      background: 'hsl(232 26% 15%)',
      foreground: 'hsl(40 30% 94%)',
      card: 'hsl(232 22% 19%)',
      popover: 'hsl(232 22% 19%)',
      border: 'hsl(232 14% 29%)',
      input: 'hsl(232 14% 29%)',
      primary: colors.dark.primary,
      accent: colors.dark.accent,
      ring: colors.dark.primary,
    }),
    midnight: theme('dark', 'Midnight', 'midnight', {
      background: 'hsl(222 47% 8%)',
      foreground: 'hsl(210 40% 98%)',
      card: 'hsl(222 40% 12%)',
      popover: 'hsl(222 40% 12%)',
      border: 'hsl(217 33% 20%)',
      input: 'hsl(217 33% 20%)',
      mutedForeground: 'hsl(215 20% 72%)',
    }),
    'high-contrast': theme('dark', 'High Contrast', 'high-contrast', {
      background: 'hsl(0 0% 0%)',
      foreground: 'hsl(0 0% 100%)',
      card: 'hsl(0 0% 6%)',
      popover: 'hsl(0 0% 6%)',
      border: 'hsl(0 0% 60%)',
      input: 'hsl(0 0% 60%)',
      muted: 'hsl(0 0% 8%)',
      mutedForeground: 'hsl(0 0% 88%)',
      primaryForeground: '#ffffff',
      accentForeground: '#ffffff',
      destructiveForeground: '#ffffff',
    }, {
      minBodyAA: 7,
      minLargeAA: 4.5,
      minHeadingOnDark: 7,
    }),
  };
}

export function resolveThemes(schema: BrandOsSchema): Record<string, BrandTheme> {
  return {
    ...buildDefaultThemes(schema),
    ...(schema.themes ?? {}),
  };
}

export function resolveThemeColors(schema: BrandOsSchema, themeName: string, themeDef?: BrandTheme): StringMap {
  const colors = resolveColorModes(schema);
  const theme = themeDef ?? resolveThemes(schema)[themeName];
  const base = theme?.base === 'dark' ? colors.dark : colors.light;
  const merged: StringMap = { ...base };

  for (const [key, value] of Object.entries(theme?.overrides ?? {})) {
    if (typeof value === 'string') {
      merged[key] = value;
    }
  }

  return merged;
}
