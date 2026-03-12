import { createInterface } from 'node:readline';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { InitCliArgs } from '../cli/parse-args.js';
import { BrandOsSchema } from '../brand-os/types.js';
import { ensureDir, writeTextFile } from '../brand-os/utils.js';

interface InitAnswers {
  name: string;
  slug: string;
  description: string;
  surfaces: string[];
  personality: string[];
  antiPersonality: string[];
  displayFont: string;
  bodyFont: string;
  primaryColor: string;
  accentColor: string;
}

const SURFACE_PRESETS: Record<string, string[]> = {
  restaurant: ['landing', 'menu', 'promotions', 'blog', 'reservations-cms', 'dashboard'],
  saas: ['landing', 'dashboard', 'settings', 'docs', 'blog'],
  ecommerce: ['landing', 'catalog', 'product-detail', 'cart', 'blog'],
  blog: ['landing', 'blog', 'about'],
  portfolio: ['landing', 'projects', 'about', 'contact'],
  admin: ['dashboard', 'settings', 'users', 'content'],
  promo: ['promo-landing'],
};

const PERSONALITY_PRESETS: Record<string, { personality: string[]; antiPersonality: string[] }> = {
  warm: {
    personality: ['warm', 'welcoming', 'approachable', 'inviting', 'friendly'],
    antiPersonality: ['cold-enterprise', 'clinical-minimalist', 'generic-template'],
  },
  bold: {
    personality: ['bold', 'confident', 'striking', 'modern', 'high-contrast'],
    antiPersonality: ['timid', 'generic-template', 'over-decorated', 'cluttered'],
  },
  minimal: {
    personality: ['precise', 'restrained', 'refined', 'clean', 'intentional'],
    antiPersonality: ['cluttered', 'over-decorated', 'generic-template', 'noisy'],
  },
  editorial: {
    personality: ['editorial', 'sophisticated', 'typographic', 'curated', 'distinctive'],
    antiPersonality: ['generic-template', 'corporate-bland', 'cookie-cutter', 'flat'],
  },
  playful: {
    personality: ['playful', 'energetic', 'colorful', 'rounded', 'friendly'],
    antiPersonality: ['corporate-bland', 'clinical-minimalist', 'rigid', 'cold-enterprise'],
  },
  luxury: {
    personality: ['refined', 'elegant', 'premium', 'exclusive', 'polished'],
    antiPersonality: ['cheap', 'generic-template', 'cluttered', 'loud', 'fast-food-generic'],
  },
};

const FONT_SUGGESTIONS: Record<string, { display: string; body: string }> = {
  warm: { display: 'Fraunces, serif', body: 'DM Sans, sans-serif' },
  bold: { display: 'DM Serif Display, serif', body: 'Inter, sans-serif' },
  minimal: { display: 'Geist, sans-serif', body: 'Geist, sans-serif' },
  editorial: { display: 'Playfair Display, serif', body: 'Lora, serif' },
  playful: { display: 'Outfit, sans-serif', body: 'Nunito, sans-serif' },
  luxury: { display: 'Libre Baskerville, serif', body: 'Source Sans 3, sans-serif' },
};

const COLOR_PRESETS: Record<string, { primary: string; accent: string }> = {
  warm: { primary: 'hsl(24 75% 48%)', accent: 'hsl(38 92% 55%)' },
  cool: { primary: 'hsl(215 85% 54%)', accent: 'hsl(190 80% 45%)' },
  rose: { primary: 'hsl(346 77% 50%)', accent: 'hsl(346 80% 92%)' },
  forest: { primary: 'hsl(155 60% 35%)', accent: 'hsl(45 85% 55%)' },
  slate: { primary: 'hsl(215 20% 35%)', accent: 'hsl(215 85% 54%)' },
  amber: { primary: 'hsl(35 92% 50%)', accent: 'hsl(24 85% 45%)' },
  violet: { primary: 'hsl(270 70% 55%)', accent: 'hsl(280 80% 90%)' },
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildSchema(answers: InitAnswers): BrandOsSchema {
  const pageArchetypes: Record<string, { purpose?: string; requiredSections?: string[] }> = {};
  for (const surface of answers.surfaces) {
    pageArchetypes[surface] = {
      purpose: `Create the ${surface.replace(/-/g, ' ')} surface for ${answers.name}.`,
      requiredSections: ['hero', 'main-content', 'cta'],
    };
  }

  return {
    meta: {
      name: answers.name,
      slug: answers.slug,
      description: answers.description,
    },
    brandThesis: {
      summary: answers.description,
      personality: answers.personality,
      antiPersonality: answers.antiPersonality,
      voice: {
        tone: answers.personality.slice(0, 3),
        avoid: ['corporate jargon', 'generic filler text', 'cheap urgency language'],
      },
    },
    tokens: {
      color: {
        light: {
          background: 'hsl(0 0% 100%)',
          foreground: 'hsl(220 20% 10%)',
          card: 'hsl(0 0% 100%)',
          popover: 'hsl(0 0% 100%)',
          primary: answers.primaryColor,
          primaryForeground: 'hsl(0 0% 100%)',
          secondary: 'hsl(210 40% 96%)',
          secondaryForeground: 'hsl(220 20% 20%)',
          muted: 'hsl(210 40% 96%)',
          mutedForeground: 'hsl(220 20% 40%)',
          accent: answers.accentColor,
          accentForeground: 'hsl(220 20% 15%)',
          destructive: 'hsl(0 84% 60%)',
          destructiveForeground: 'hsl(0 0% 100%)',
          border: 'hsl(214 32% 91%)',
          input: 'hsl(214 32% 91%)',
          ring: answers.primaryColor,
        },
        dark: {},
      },
      typography: {
        families: {
          display: answers.displayFont,
          body: answers.bodyFont,
          ui: answers.bodyFont,
        },
      },
      radius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      shadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 2px 8px rgba(0,0,0,0.10)',
      },
    },
    designGrammar: {
      shapeLanguage: {
        core: `${answers.personality.slice(0, 3).join(', ')} visual language with clear hierarchy.`,
      },
    },
    recipes: {
      pageArchetypes,
      sectionArchetypes: {},
    },
  };
}

function prompt(rl: ReturnType<typeof createInterface>, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function runInteractive(): Promise<InitAnswers> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  try {
    console.log('\n  brand-os init — Create a new brand schema\n');

    const name = await prompt(rl, '  Brand name: ');
    if (!name) {
      throw new Error('Error: Brand name is required.');
    }

    const slug = toSlug(name);

    const description = await prompt(rl, '  Description (one sentence): ');

    console.log('\n  Surface presets: restaurant, saas, ecommerce, blog, portfolio, admin, promo');
    console.log('  Or enter custom surfaces as comma-separated list.\n');
    const surfacesRaw = await prompt(rl, '  Surfaces (preset or list): ');
    const surfaces = SURFACE_PRESETS[surfacesRaw.toLowerCase()]
      ?? surfacesRaw.split(',').map((s) => s.trim()).filter(Boolean);
    if (surfaces.length === 0) {
      surfaces.push('landing');
    }

    console.log('\n  Style direction: warm, bold, minimal, editorial, playful, luxury');
    console.log('  This sets personality, anti-personality, and font suggestions.\n');
    const styleRaw = await prompt(rl, '  Style direction: ');
    const style = styleRaw.toLowerCase();
    const preset = PERSONALITY_PRESETS[style] ?? PERSONALITY_PRESETS['warm'];
    const fonts = FONT_SUGGESTIONS[style] ?? FONT_SUGGESTIONS['warm'];

    console.log(`\n  Suggested fonts: ${fonts.display} + ${fonts.body}`);
    const customDisplay = await prompt(rl, `  Display font (enter to accept): `);
    const customBody = await prompt(rl, `  Body font (enter to accept): `);

    console.log('\n  Color presets: warm, cool, rose, forest, slate, amber, violet');
    const colorPresetRaw = await prompt(rl, '  Color palette: ');
    const colorPreset = COLOR_PRESETS[colorPresetRaw.toLowerCase()] ?? COLOR_PRESETS['warm'];

    return {
      name,
      slug,
      description: description || `Brand operating system for ${name}.`,
      surfaces,
      personality: preset.personality,
      antiPersonality: preset.antiPersonality,
      displayFont: customDisplay || fonts.display,
      bodyFont: customBody || fonts.body,
      primaryColor: colorPreset.primary,
      accentColor: colorPreset.accent,
    };
  } finally {
    rl.close();
  }
}

function buildFromArgs(args: InitCliArgs): InitAnswers {
  const name = args.name ?? 'My Brand';
  const slug = toSlug(name);

  const surfaces = args.surfaces ?? ['landing'];

  const preset = PERSONALITY_PRESETS['warm'];
  const fonts = FONT_SUGGESTIONS['warm'];
  const colors = COLOR_PRESETS['warm'];

  return {
    name,
    slug,
    description: args.description ?? `Brand operating system for ${name}.`,
    surfaces,
    personality: preset.personality,
    antiPersonality: preset.antiPersonality,
    displayFont: fonts.display,
    bodyFont: fonts.body,
    primaryColor: colors.primary,
    accentColor: colors.accent,
  };
}

function resolveOutputPath(args: InitCliArgs, slug: string): string {
  if (args.out) {
    return resolve(process.cwd(), args.out);
  }
  return resolve(process.cwd(), `.project/${slug}/${slug}.schema.json`);
}

export async function runInit(args: InitCliArgs): Promise<void> {
  const answers = args.json || args.name
    ? buildFromArgs(args)
    : await runInteractive();

  const schema = buildSchema(answers);
  const outputPath = resolveOutputPath(args, answers.slug);

  if (existsSync(outputPath) && !args.json) {
    console.log(`\n  Schema already exists: ${outputPath}`);
    console.log('  Remove it first or use --out to write elsewhere.\n');
    return;
  }

  ensureDir(dirname(outputPath));
  writeTextFile(outputPath, `${JSON.stringify(schema, null, 2)}\n`);

  if (args.json) {
    const result = {
      status: 'created',
      schemaPath: outputPath,
      slug: answers.slug,
      surfaces: answers.surfaces,
      personality: answers.personality,
    };
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`\n  Created: ${outputPath}`);
  console.log(`\n  Brand: ${answers.name}`);
  console.log(`  Surfaces: ${answers.surfaces.join(', ')}`);
  console.log(`  Personality: ${answers.personality.join(', ')}`);
  console.log(`  Fonts: ${answers.displayFont} + ${answers.bodyFont}`);
  console.log(`\n  Next steps:`);
  console.log(`  1. Review and refine the schema`);
  console.log(`  2. npx brand-os --schema "${outputPath}" --bootstrap`);
  console.log(`  3. Use generated prompts from *-generated/prompts/\n`);
}

export function printInitUsage(): string {
  return [
    'Usage:',
    '  npx brand-os init [options]',
    '',
    'Create a new brand schema interactively or programmatically.',
    '',
    'Options:',
    '  --name <name>           brand name',
    '  --description <text>    brand description (one sentence)',
    '  --surfaces <list>       comma-separated surfaces (landing,menu,blog)',
    '  --out <path>            output schema path (default: .project/<slug>/<slug>.schema.json)',
    '  --json                  machine-readable JSON output (skip interactive prompts)',
    '  -h, --help              show help',
    '',
    'Interactive:',
    '  npx brand-os init',
    '',
    'Programmatic (LLM):',
    '  npx brand-os init --name "Grill House" --description "Charcoal grill restaurant" --surfaces promo-landing --json',
    '  npx brand-os init --name "My SaaS" --surfaces landing,dashboard,docs --out ./brand.schema.json --json',
    '',
    'Surface presets:',
    '  restaurant — landing, menu, promotions, blog, reservations-cms, dashboard',
    '  saas       — landing, dashboard, settings, docs, blog',
    '  ecommerce  — landing, catalog, product-detail, cart, blog',
    '  blog       — landing, blog, about',
    '  portfolio  — landing, projects, about, contact',
    '  admin      — dashboard, settings, users, content',
    '  promo      — promo-landing',
    '',
    'Style directions (interactive mode):',
    '  warm, bold, minimal, editorial, playful, luxury',
  ].join('\n');
}
