import { existsSync } from 'node:fs';
import { BrandOsCliArgs } from '../cli/parse-args.js';
import { emitBrandOsArtifacts } from '../brand-os/emitter.js';
import { BrandOsSchema, ParserFixtureSource, PromptPack, PromptPackSurface } from '../brand-os/types.js';
import { fail, readJsonFile, resolveBrandOsPaths, writeTextFile } from '../brand-os/utils.js';
import { ParserContract } from '../ast-parser/types.js';

type PageArchetype = NonNullable<NonNullable<BrandOsSchema['recipes']>['pageArchetypes']>[string];

const DEFAULT_FALLBACK_SURFACES = ['landing'];

function normalizeInputName(value: string): string {
  const words = value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(Boolean);

  if (words.length === 0) {
    return 'value';
  }

  return words
    .map((word, index) => (index === 0 ? word : `${word[0].toUpperCase()}${word.slice(1)}`))
    .join('');
}

function normalizeSurfaceName(surface: string): string {
  return surface
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupe(values: string[]): string[] {
  return [...new Set(values.filter((value) => value && value.trim().length > 0))];
}

function formatOptionalInputs(surfaceName: string): string[] {
  return dedupe([
    `${surfaceName}Audience`,
    `${surfaceName}Tone`,
    `${surfaceName}Constraints`,
    `accessibilityRequirements`,
  ]).slice(0, 4);
}

function buildPromptSurfaces(schema: BrandOsSchema): Record<string, PromptPack['surfaces'][string]> {
  const pageArchetypes = schema.recipes?.pageArchetypes ?? {};
  const archetypes = Object.entries(pageArchetypes);

  if (archetypes.length === 0) {
    return {
      landing: {
        goal: `Build a clear landing surface for ${schema.meta.name}.`,
        requiredInputs: ['brandName', 'primaryGoal', 'primaryAction'],
        optionalInputs: formatOptionalInputs('landing'),
        sectionExpectations: ['hero', 'core value', 'trust signals', 'final CTA'],
        surfaceOverrides: [
          'Keep hierarchy explicit and reduce noise in the first screen.',
          'Use one clear conversion direction.',
        ],
        deliverables: ['visual grammar', 'information architecture', 'final implementation'],
        promptTemplate: [
          `Design a landing surface in ${schema.meta.name}.`,
          'Required inputs: {{brandName}}, {{primaryGoal}}, {{primaryAction}}.',
          'Use system components first, then reusable branded wrappers.',
          'Avoid generic template patterns and keep readability first.',
        ],
        auditChecklist: [
          'Does the surface keep a single primary CTA?',
          'Is the content scannable in under 5 seconds?',
          'Is the brand tone coherent with this project?',
        ],
      },
    };
  }

  const parsedSurfaces = archetypes.map(([surfaceName, archetype]) => {
    const surface = archetype as PageArchetype;
    const requiredSections = dedupe(surface.requiredSections ?? []);
    const requiredInputs = dedupe(
      requiredSections.length > 0 ? requiredSections.map(normalizeInputName) : [`${surfaceName}Goal`, `${surfaceName}Audience`],
    );

    return [
      surfaceName,
      {
        goal: surface.purpose ?? `Create a ${normalizeSurfaceName(surfaceName).toLowerCase()} surface for ${schema.meta.name}.`,
        requiredInputs,
        optionalInputs: formatOptionalInputs(surfaceName),
        sectionExpectations: requiredSections.length > 0 ? requiredSections : ['hero', 'core sections', 'CTA'],
        surfaceOverrides: [
          `Use ${schema.meta.name} shapes and spacing consistently on ${surfaceName}.`,
          ...(schema.designGrammar?.shapeLanguage?.core ? [schema.designGrammar.shapeLanguage.core] : []),
        ].filter((item) => Boolean(item)),
        deliverables: ['surface architecture', 'visual grammar', 'implementation-ready output'],
        promptTemplate: [
          `Design a ${normalizeSurfaceName(surfaceName).toLowerCase()} in ${schema.meta.name}.`,
          ...requiredInputs.map((input) => `Input: {{${input}}}`),
          'Return an implementation plan and component mapping.',
          'Keep semantic layers clear and reusable.',
        ],
        auditChecklist: [
          `Does ${surfaceName} keep the same brand language as other surfaces?`,
          'Are semantic tokens used before decorative utilities?',
          'Is the surface easy to scan and action-focused?',
        ],
      },
    ] as [string, PromptPackSurface];
  });

  if (parsedSurfaces.length > 0) {
    return Object.fromEntries(parsedSurfaces);
  }

  return {
    landing: {
      goal: `Build a default landing surface for ${schema.meta.name}.`,
      requiredInputs: ['brandName', 'primaryGoal', 'primaryAction'],
      optionalInputs: formatOptionalInputs('landing'),
      sectionExpectations: ['hero', 'core value', 'cta'],
      surfaceOverrides: ['Keep brand rhythm and spacing predictable.'],
      deliverables: ['visual grammar', 'implementation-ready output'],
      promptTemplate: [
        `Design a default landing surface for ${schema.meta.name}.`,
        'Use system-first components and reuse wrappers where possible.',
      ],
      auditChecklist: ['Is this surface clear and consistent?', 'Is it reusable and parsable?'],
    },
  };
}

function buildPromptPack(schema: BrandOsSchema): PromptPack {
  const personality = dedupe(schema.brandThesis?.personality ?? []);
  const antiPersonality = dedupe(schema.brandThesis?.antiPersonality ?? []);
  const surfaceKeywords = personality.length > 0 ? personality : dedupe([schema.meta.name]);
  const surfaces = buildPromptSurfaces(schema);

  return {
    sharedContext: {
      brandSummary:
        schema.brandThesis?.summary ??
        schema.meta.description ??
        `Brand OS contract for ${schema.meta.name}.`,
      styleKeywords: dedupe([...surfaceKeywords, ...(schema.designGrammar?.contentVoice?.adjectives ?? [])]).slice(0, 8),
      negativeStyleKeywords: antiPersonality.length > 0 ? antiPersonality : ['unclear grammar', 'generic templates'],
      crossSurfaceRules: dedupe([
        ...(schema.designGrammar?.contentVoice?.avoid ?? []),
        'Keep one clear information architecture per surface.',
        'Preserve semantic consistency across public and operational surfaces.',
      ]),
      implementationBias: {
        preferredStack: 'Tailwind CSS + shadcn-compatible system components',
        systemLayer: ['Button', 'Input', 'Textarea', 'Dialog', 'Accordion', 'Tabs', 'Card'],
        brandLayer: ['Hero shells', 'Section wrappers', 'Feature blocks', 'Promo blocks'],
      },
      motionBias: {
        defaultLevel: 'css-only',
        allowedEscalation: ['subtle fade', 'gentle hover emphasis'],
        forbiddenWithoutJustification: ['heavy motion', 'conflicting parallel animations'],
      },
    },
    surfaces,
    auditPromptAddendum: [
      'List what stays system-level and what becomes a custom wrapper.',
      'Check that reusable components are named and repeatable.',
      'Remove redundant motion and decorative noise where possible.',
    ],
  };
}

function buildParserContract(schema: BrandOsSchema): ParserContract {
  const brandId = schema.meta.slug ?? schema.meta.name.toLowerCase().replace(/\s+/g, '-');

  return {
    schemaVersion: '1.0.0',
    id: `${brandId}-parser-contract`,
    brandId,
    description: `Auto-generated minimal parser contract for ${schema.meta.name}.`,
    stateVariantPolicy: {
      breakpointPrefixes: ['sm', 'md', 'lg', 'xl', '2xl'],
      interactionPrefixes: ['hover', 'focus', 'focus-visible', 'active', 'disabled', 'dark'],
      rule: 'Strip state and breakpoint prefixes before base class classification.',
    },
    classes: {
      structural: {
        prefixes: [
          'container',
          'block',
          'inline',
          'flex',
          'grid',
          'gap-',
          'space-',
          'justify-',
          'items-',
          'self-',
          'w-',
          'h-',
          'min-',
          'max-',
          'p-',
          'px-',
          'py-',
          'pt-',
          'pr-',
          'pb-',
          'pl-',
          'm-',
          'mx-',
          'my-',
          'mt-',
          'mr-',
          'mb-',
          'ml-',
          'top-',
          'right-',
          'bottom-',
          'left-',
          'inset-',
          'overflow-',
          'relative',
          'absolute',
          'fixed',
          'sticky',
        ],
        exactUtilities: ['mx-auto', 'w-full', 'h-full', 'min-h-screen'],
        customUtilities: ['container'],
      },
      semantic: {
        prefixes: ['bg-', 'text-', 'rounded-', 'border-', 'shadow-', 'ring-', 'font-', 'tracking-', 'leading-', 'transition'],
        exactUtilities: [
          'bg-background',
          'bg-foreground',
          'text-background',
          'text-foreground',
          'bg-white',
          'text-white',
          'rounded-full',
          'rounded-md',
          'shadow-sm',
          'shadow',
          'font-medium',
          'font-semibold',
          'font-bold',
        ],
        customUtilities: [],
      },
      decorative: {
        prefixes: ['bg-gradient-', 'from-', 'via-', 'to-', 'opacity-', 'blur', 'backdrop-', 'drop-shadow', 'hover:', 'group-hover:'],
        exactUtilities: ['transform', 'backdrop-blur-sm', 'shadow-lg'],
      },
    },
    brandExceptions: {
      structuralCustomUtilities: {},
      semanticCustomUtilities: {},
    },
  };
}

function buildFixtureSource(schema: BrandOsSchema): ParserFixtureSource {
  const brandId = schema.meta.slug ?? schema.meta.name.toLowerCase().replace(/\s+/g, '-');

  return {
    schemaVersion: '1.0.0',
    brandId,
    referenceProjectName: schema.meta.sourceReference?.project ?? `${brandId} reference`,
    fixtures: [],
  };
}

function loadBrandArtifact<T>(
  label: string,
  path: string,
  explicitPath: boolean,
  allowImplicitFallback: boolean,
  shouldBootstrap: boolean,
  bootstrapFactory: () => T,
): T {
  if (existsSync(path)) {
    return readJsonFile<T>(path);
  }

  if (!shouldBootstrap) {
    if (allowImplicitFallback && !explicitPath) {
      return bootstrapFactory();
    }
    fail(`${label} "${path}" was not found. Add --bootstrap to generate a starter file.`);
  }

  const generated = bootstrapFactory();
  writeTextFile(path, `${JSON.stringify(generated, null, 2)}\n`);
  console.log(`Created ${label}: ${path}`);
  return generated;
}

function ensureFixtureSource(
  schema: BrandOsSchema,
  paths: {
    schemaPath: string;
    promptPackPath: string;
    parserContractPath: string;
    fixturesPath: string;
    emitDir: string;
    schemaFileName: string;
  },
  args: BrandOsCliArgs,
): ParserFixtureSource {
  return loadBrandArtifact(
    'Parser fixtures',
    paths.fixturesPath,
    Boolean(args.fixtures),
    true,
    args.bootstrap,
    () => buildFixtureSource(schema),
  );
}

function ensurePromptPack(
  schema: BrandOsSchema,
  paths: {
    schemaPath: string;
    promptPackPath: string;
    parserContractPath: string;
    fixturesPath: string;
    emitDir: string;
    schemaFileName: string;
  },
  args: BrandOsCliArgs,
): PromptPack {
  return loadBrandArtifact(
    'Prompt pack',
    paths.promptPackPath,
    Boolean(args.promptPack),
    false,
    args.bootstrap,
    () => buildPromptPack(schema),
  );
}

function ensureParserContract(
  schema: BrandOsSchema,
  paths: {
    schemaPath: string;
    promptPackPath: string;
    parserContractPath: string;
    fixturesPath: string;
    emitDir: string;
    schemaFileName: string;
  },
  args: BrandOsCliArgs,
): ParserContract {
  return loadBrandArtifact(
    'Parser contract',
    paths.parserContractPath,
    Boolean(args.parserContract),
    false,
    args.bootstrap,
    () => buildParserContract(schema),
  );
}

function ensurePromptPackCompat(
  paths: {
    schemaPath: string;
    promptPackPath: string;
    parserContractPath: string;
    fixturesPath: string;
    emitDir: string;
    schemaFileName: string;
  },
  args: BrandOsCliArgs,
): { promptPack: PromptPack; parserContract: ParserContract; fixtures: ParserFixtureSource } {
  const schema = readJsonFile<BrandOsSchema>(paths.schemaPath);
  return {
    promptPack: ensurePromptPack(schema, paths, args),
    parserContract: ensureParserContract(schema, paths, args),
    fixtures: ensureFixtureSource(schema, paths, args),
  };
}

export async function runBrandOs(args: BrandOsCliArgs): Promise<void> {
  const rawSchemaPath = args.schema;
  if (!existsSync(rawSchemaPath)) {
    fail(`Brand schema "${rawSchemaPath}" was not found.`);
  }

  const schemaPreview = readJsonFile<BrandOsSchema>(rawSchemaPath);
  const paths = resolveBrandOsPaths(rawSchemaPath, schemaPreview, {
    promptPack: args.promptPack,
    parserContract: args.parserContract,
    fixtures: args.fixtures,
    emitDir: args.emitDir,
  });

  if (!existsSync(paths.schemaPath)) {
    fail(`Brand schema "${paths.schemaPath}" was not found.`);
  }

  const schema = readJsonFile<BrandOsSchema>(paths.schemaPath);
  const { promptPack, parserContract, fixtures: fixtureSource } = ensurePromptPackCompat(paths, args);
  const isBootstrapUsed = !existsSync(paths.promptPackPath) || !existsSync(paths.parserContractPath) || !existsSync(paths.fixturesPath);

  const result = emitBrandOsArtifacts(paths, schema, promptPack, parserContract, fixtureSource);

  console.log(`Brand OS emitted to: ${paths.emitDir}`);
  console.log(`- prompts/${result.promptCount} surface prompt(s)`);
  console.log(`- parser-fixtures/${result.fixtureCount} fixture(s)`);
  console.log(`- copied adapter asset(s): ${result.copiedAssetCount}`);
  if (isBootstrapUsed && args.bootstrap) {
    console.log('Bootstrap: generated missing companion artifacts.');
  }
  if (args.verbose) {
    console.log(`Schema: ${paths.schemaPath}`);
    console.log(`Prompt pack: ${paths.promptPackPath}`);
    console.log(`Parser contract: ${paths.parserContractPath}`);
    console.log(`Fixtures: ${paths.fixturesPath}`);
  }
}

export function printBrandOsUsage(): string {
  return [
    'Usage:',
    '  npx brand-os --schema <schema-path> [options]',
    '',
    'Options:',
    '  --schema <path>           brand OS schema path (required)',
    '  --prompt-pack <path>      prompt pack JSON path',
    '  --parser-contract <path>  parser contract JSON path',
    '  --fixtures <path>         parser fixture source JSON path',
    '  --emit-dir <path>         output directory for generated artifacts',
    '  --bootstrap               generate missing companion files from safe defaults',
    '  --verbose                 print resolved input paths',
    '  -h, --help                show help',
    '',
    'Examples:',
    '  npx brand-os --schema .project/brand.schema.json',
    '  npx brand-os --schema .project/brand.schema.json --bootstrap',
    '  npx brand-os --schema .project/brand.schema.json --emit-dir .project/brand-generated --verbose',
  ].join('\n');
}
