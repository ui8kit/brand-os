import { resolveBrandMarks, resolveIllustration } from '../defaults/schema.js';
import { resolveColorModes, resolveThemes, DEFAULT_CONTRAST_BUDGET } from '../defaults/themes.js';
import { BrandOsSchema, PromptPack } from '../types.js';
import { hslToHex } from '../utils/color.js';
import { toTitleCase } from '../utils.js';

type YamlScalar = string | number | boolean;

interface YamlMap {
  [key: string]: YamlNode;
}

type YamlNode = YamlScalar | YamlMap;

function yamlScalar(value: YamlScalar | undefined | null): string {
  if (value === undefined || value === null) {
    return '""';
  }
  return typeof value === 'string' ? JSON.stringify(value) : String(value);
}

function renderYaml(value: YamlNode | undefined | null, indent = 0): string[] {
  if (value === undefined || value === null) {
    return [`${' '.repeat(indent)}""`];
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return [`${' '.repeat(indent)}${yamlScalar(value)}`];
  }

  const lines: string[] = [];
  for (const [key, nestedValue] of Object.entries(value)) {
    if (typeof nestedValue === 'string' || typeof nestedValue === 'number' || typeof nestedValue === 'boolean') {
      lines.push(`${' '.repeat(indent)}${key}: ${yamlScalar(nestedValue)}`);
      continue;
    }

    lines.push(`${' '.repeat(indent)}${key}:`);
    lines.push(...renderYaml(nestedValue, indent + 2));
  }

  return lines;
}

function nonEmpty(items: Array<string | undefined | false | null>): string[] {
  return items.filter((item): item is string => Boolean(item && item.trim().length > 0));
}

function getTypographyFrontmatter(schema: BrandOsSchema): Record<string, YamlNode> {
  const families = schema.tokens.typography.families;
  const sizes = schema.tokens.typography.sizes ?? {};
  const weights = schema.tokens.typography.weights ?? {};
  const lineHeights = schema.tokens.typography.lineHeights ?? {};

  return {
    'display-lg': {
      fontFamily: families.display ?? families.body,
      fontSize: sizes['display-lg'] ?? '3rem',
      fontWeight: weights.display ?? 700,
      lineHeight: String(lineHeights['display-lg'] ?? 1.1),
    },
    'display-md': {
      fontFamily: families.display ?? families.body,
      fontSize: sizes['display-md'] ?? '2.5rem',
      fontWeight: weights.display ?? 700,
      lineHeight: String(lineHeights['display-md'] ?? 1.1),
    },
    'body-lg': {
      fontFamily: families.body,
      fontSize: sizes['body-lg'] ?? sizes['body-md'] ?? '1.125rem',
      fontWeight: weights.body ?? 400,
      lineHeight: String(lineHeights['body-lg'] ?? 1.6),
    },
    'body-md': {
      fontFamily: families.body,
      fontSize: sizes['body-md'] ?? '1rem',
      fontWeight: weights.body ?? 400,
      lineHeight: String(lineHeights['body-md'] ?? 1.55),
    },
    'body-sm': {
      fontFamily: families.body,
      fontSize: sizes['body-sm'] ?? '0.875rem',
      fontWeight: weights.body ?? 400,
      lineHeight: String(lineHeights['body-sm'] ?? 1.5),
    },
    'label-md': {
      fontFamily: families.ui ?? families.body,
      fontSize: sizes['label-md'] ?? '0.875rem',
      fontWeight: weights.label ?? weights.ui ?? 600,
      lineHeight: String(lineHeights['label-md'] ?? 1.3),
    },
    'label-sm': {
      fontFamily: families.ui ?? families.body,
      fontSize: sizes['label-sm'] ?? '0.75rem',
      fontWeight: weights.label ?? weights.ui ?? 600,
      lineHeight: String(lineHeights['label-sm'] ?? 1.2),
    },
  };
}

function getSpacingFrontmatter(schema: BrandOsSchema): Record<string, YamlNode> {
  const scale = schema.tokens.spacing?.scale ?? {};
  return {
    xs: scale.xs ?? '4px',
    sm: scale.sm ?? '8px',
    md: scale.md ?? '16px',
    lg: scale.lg ?? '24px',
    xl: scale.xl ?? '48px',
  };
}

function getRoundedFrontmatter(schema: BrandOsSchema): Record<string, YamlNode> {
  return {
    none: 0,
    sm: schema.tokens.radius.sm ?? '0.25rem',
    md: schema.tokens.radius.md ?? schema.tokens.radius.sm ?? '0.5rem',
    lg: schema.tokens.radius.lg ?? schema.tokens.radius.md ?? '0.75rem',
    xl: schema.tokens.radius.xl ?? schema.tokens.radius.lg ?? '1rem',
    full: '9999px',
  };
}

function getFrontmatter(schema: BrandOsSchema): string {
  const colors = resolveColorModes(schema);
  const colorFrontmatter: Record<string, YamlNode> = {
    primary: hslToHex(colors.light.primary),
    'on-primary': hslToHex(colors.light.primaryForeground),
    surface: hslToHex(colors.light.card),
    'on-surface': hslToHex(colors.light.foreground),
    background: hslToHex(colors.light.background),
    border: hslToHex(colors.light.border),
    accent: hslToHex(colors.light.accent),
    error: hslToHex(colors.light.destructive),
  };

  for (const [name, color] of Object.entries(schema.tokens.color.charts ?? {})) {
    colorFrontmatter[`chart-${name}`] = hslToHex(color);
  }

  for (const [name, token] of Object.entries(schema.tokens.color.categories ?? {})) {
    colorFrontmatter[`category-${name}`] = hslToHex(token.light);
  }

  const frontmatter = {
    version: 'alpha',
    name: schema.meta.name,
    description: schema.meta.description ?? schema.brandThesis?.summary ?? `Design system for ${schema.meta.name}.`,
    colors: colorFrontmatter,
    typography: getTypographyFrontmatter(schema),
    rounded: getRoundedFrontmatter(schema),
    spacing: getSpacingFrontmatter(schema),
    components: {
      'button-primary': {
        backgroundColor: '{colors.primary}',
        textColor: '{colors.on-primary}',
        rounded: '{rounded.md}',
        typography: '{typography.label-md}',
        padding: '{spacing.md}',
      },
      'button-primary-hover': {
        backgroundColor: '{colors.accent}',
        textColor: '{colors.on-primary}',
      },
      card: {
        backgroundColor: '{colors.surface}',
        textColor: '{colors.on-surface}',
        rounded: '{rounded.lg}',
        padding: '{spacing.lg}',
      },
    },
  };

  return ['---', ...renderYaml(frontmatter), '---', ''].join('\n');
}

function section(title: string, lines: string[]): string[] {
  return [`## ${title}`, '', ...lines, ''];
}

function renderOverview(schema: BrandOsSchema, promptPack: PromptPack): string[] {
  const thesis = schema.brandThesis;
  const illustration = resolveIllustration(schema);

  return nonEmpty([
    thesis?.summary ?? schema.meta.description ?? promptPack.sharedContext.brandSummary,
    thesis?.promise ? `Promise: ${thesis.promise}` : undefined,
    thesis?.positioning ? `Positioning: ${thesis.positioning}` : undefined,
    thesis?.personality?.length ? `Personality: ${thesis.personality.join(', ')}` : undefined,
    thesis?.antiPersonality?.length ? `Anti-personality: ${thesis.antiPersonality.join(', ')}` : undefined,
    thesis?.voice?.tone?.length ? `Voice tone: ${thesis.voice.tone.join(', ')}` : undefined,
    `Illustration style: ${illustration.style}.`,
  ]);
}

function renderColors(schema: BrandOsSchema): string[] {
  const colors = resolveColorModes(schema);
  const themes = resolveThemes(schema);
  const lines = [
    `Use semantic color roles first: background ${hslToHex(colors.light.background)}, foreground ${hslToHex(colors.light.foreground)}, primary ${hslToHex(colors.light.primary)}, accent ${hslToHex(colors.light.accent)}.`,
    schema.designGrammar?.surfaceLanguage?.accentRule ?? 'Accent color should stay scarce and intentional.',
    schema.designGrammar?.surfaceLanguage?.contrastRule ?? 'Contrast should clear accessibility budgets before decorative styling.',
    themes && Object.keys(themes).length > 0 ? `Supported themes: ${Object.keys(themes).join(', ')}.` : '',
  ].filter(Boolean);

  if (schema.tokens.color.categories && Object.keys(schema.tokens.color.categories).length > 0) {
    lines.push(`Category colors: ${Object.keys(schema.tokens.color.categories).join(', ')}.`);
  }
  if (schema.tokens.color.charts && Object.keys(schema.tokens.color.charts).length > 0) {
    lines.push(`Chart colors: ${Object.keys(schema.tokens.color.charts).join(', ')}.`);
  }

  return lines;
}

function renderTypography(schema: BrandOsSchema): string[] {
  const typography = schema.tokens.typography;
  const familyLines = Object.entries(typography.families).map(([name, value]) => `- ${toTitleCase(name)}: \`${value}\``);
  const sizeLines = Object.entries(typography.sizes ?? {}).map(([name, value]) => `- ${name}: \`${value}\``);
  const weightLines = Object.entries(typography.weights ?? {}).map(([name, value]) => `- ${name}: \`${value}\``);

  return [
    'Font families:',
    ...familyLines,
    '',
    sizeLines.length > 0 ? 'Type scale:' : '',
    ...sizeLines,
    sizeLines.length > 0 ? '' : '',
    weightLines.length > 0 ? 'Weights:' : '',
    ...weightLines,
    typography.surfaceOverrides && Object.keys(typography.surfaceOverrides).length > 0
      ? `Surface overrides: ${Object.keys(typography.surfaceOverrides).join(', ')}.`
      : '',
  ].filter(Boolean);
}

function renderLayout(schema: BrandOsSchema): string[] {
  const spacing = schema.tokens.spacing;
  const lines = [
    spacing?.baseUnit ? `Base spacing unit: ${spacing.baseUnit}px.` : 'Base spacing unit: 4px.',
    spacing?.sectionRhythm && Object.keys(spacing.sectionRhythm).length > 0
      ? `Section rhythm: ${Object.entries(spacing.sectionRhythm).map(([name, value]) => `${name}=${value}`).join(', ')}.`
      : '',
    spacing?.container && Object.keys(spacing.container).length > 0
      ? `Container widths: ${Object.entries(spacing.container).map(([name, value]) => `${name}=${value}`).join(', ')}.`
      : '',
    schema.designGrammar?.densityModes && Object.keys(schema.designGrammar.densityModes).length > 0
      ? `Density modes: ${Object.entries(schema.designGrammar.densityModes).map(([name, value]) => `${name}=${value}`).join('; ')}`
      : '',
  ].filter(Boolean);

  return lines;
}

function renderDepth(schema: BrandOsSchema): string[] {
  const shadowLines = Object.entries(schema.tokens.shadow).map(([name, value]) => `- ${name}: \`${value}\``);
  const motion = schema.tokens.motion;

  return [
    schema.designGrammar?.surfaceLanguage?.depthRule ?? 'Use elevation sparingly and only to clarify hierarchy.',
    '',
    'Shadow scale:',
    ...shadowLines,
    '',
    motion?.durations ? `Motion durations: ${Object.entries(motion.durations).map(([name, value]) => `${name}=${value}`).join(', ')}.` : '',
  ].filter(Boolean);
}

function renderShapes(schema: BrandOsSchema): string[] {
  const radiusLines = Object.entries(schema.tokens.radius).map(([name, value]) => `- ${name}: \`${value}\``);
  const brandMarks = resolveBrandMarks(schema).primary;

  return [
    schema.designGrammar?.shapeLanguage?.core ?? 'Shapes should reinforce recognisable brand geometry.',
    '',
    'Radius scale:',
    ...radiusLines,
    '',
    brandMarks ? `Primary brand mark clear space: ${brandMarks.geometry.clearSpace}.` : '',
  ].filter(Boolean);
}

function renderComponents(schema: BrandOsSchema, promptPack: PromptPack): string[] {
  const componentPolicy = schema.componentPolicy;
  const pageArchetypes = schema.recipes?.pageArchetypes ?? {};
  const sectionArchetypes = schema.recipes?.sectionArchetypes ?? {};
  const lines: string[] = [];

  if (componentPolicy?.keepStandard?.length) {
    lines.push(`Keep standard: ${componentPolicy.keepStandard.join(', ')}.`);
  }
  if (componentPolicy?.wrapEarly?.length) {
    lines.push(`Wrap early: ${componentPolicy.wrapEarly.join(', ')}.`);
  }
  if (componentPolicy?.customBlocks?.length) {
    lines.push(`Custom blocks: ${componentPolicy.customBlocks.join(', ')}.`);
  }
  if (Object.keys(pageArchetypes).length > 0) {
    lines.push('');
    lines.push('Page archetypes:');
    for (const [name, archetype] of Object.entries(pageArchetypes)) {
      lines.push(`- ${name}: ${(archetype.purpose ?? '').trim() || 'Surface recipe.'}${archetype.requiredSections?.length ? ` Sections: ${archetype.requiredSections.join(', ')}.` : ''}`);
    }
  }
  if (Object.keys(sectionArchetypes).length > 0) {
    lines.push('');
    lines.push('Section archetypes:');
    for (const [name, archetype] of Object.entries(sectionArchetypes)) {
      lines.push(`- ${name}: ${(archetype.purpose ?? '').trim() || 'Section recipe.'}${archetype.requiredSlots?.length ? ` Slots: ${archetype.requiredSlots.join(', ')}.` : ''}`);
    }
  }
  if (promptPack.sharedContext.crossSurfaceRules?.length) {
    lines.push('');
    lines.push('Cross-surface rules:');
    lines.push(...promptPack.sharedContext.crossSurfaceRules.map((rule) => `- ${rule}`));
  }

  return lines.length > 0 ? lines : ['Keep system components consistent and layer brand wrappers only when they add recognisable value.'];
}

function renderDosAndDonts(schema: BrandOsSchema): string[] {
  const thesis = schema.brandThesis;
  const illustration = resolveIllustration(schema);
  const doLines = nonEmpty([
    'Do preserve AA contrast in every emitted theme before polishing visual effects.',
    'Do make the brand recognisable through marks, shape language, and illustration motifs, not color alone.',
    schema.designGrammar?.surfaceLanguage?.accentRule,
  ]).map((line) => `- ${line}`);
  const dontLines = [
    ...(thesis?.antiPersonality ?? []).map((item) => `- ${item}`),
    ...(schema.designGrammar?.contentVoice?.avoid ?? []).map((item) => `- ${item}`),
    ...(schema.componentPolicy?.avoid ?? []).map((item) => `- ${item}`),
    ...(illustration.forbidden ?? []).map((item) => `- ${item}`),
    `- Body text on dark must clear ${DEFAULT_CONTRAST_BUDGET.minBodyAA}:1 and headings on dark must clear ${DEFAULT_CONTRAST_BUDGET.minHeadingOnDark}:1.`,
  ];

  return [
    'Do:',
    ...doLines,
    '',
    "Don't:",
    ...dontLines,
  ];
}

export function buildDesignMd(schema: BrandOsSchema, promptPack: PromptPack): string {
  const lines = [
    getFrontmatter(schema),
    ...section('Overview', renderOverview(schema, promptPack)),
    ...section('Colors', renderColors(schema)),
    ...section('Typography', renderTypography(schema)),
    ...section('Layout', renderLayout(schema)),
    ...section('Elevation & Depth', renderDepth(schema)),
    ...section('Shapes', renderShapes(schema)),
    ...section('Components', renderComponents(schema, promptPack)),
    ...section("Do's and Don'ts", renderDosAndDonts(schema)),
  ];

  return `${lines.join('\n').trim()}\n`;
}
