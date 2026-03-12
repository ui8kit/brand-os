import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { BrandOsCopiedAsset, BrandOsResolvedPaths, BrandOsSchema, ParserFixture, ParserFixtureSource, PromptPack, PromptPackSurface } from './types.js';
import { ParserContract } from '../ast-parser/types.js';
import { copyPath, ensureDir, fail, formatBulletList, resolveRelativeToSchemaDir, toTitleCase, writeTextFile } from './utils.js';

function buildPromptMarkdown(
  surfaceName: string,
  surface: PromptPackSurface,
  promptPack: PromptPack,
  schema: BrandOsSchema,
  schemaFileName: string,
): string {
  const docsConfig = schema.emit?.docs;
  const brandLabel = docsConfig?.promptTitlePrefix ?? schema.meta.name;
  const promptIntro = docsConfig?.promptIntro ?? `Use this file as the isolated surface prompt when you want to start building directly with the ${brandLabel}.`;
  const attachFiles = docsConfig?.promptAttachFiles ?? [schemaFileName];
  const brandSummary = promptPack.sharedContext.brandSummary;
  const styleKeywords = formatBulletList(promptPack.sharedContext.styleKeywords);
  const negativeKeywords = formatBulletList(promptPack.sharedContext.negativeStyleKeywords);
  const crossRules = formatBulletList(promptPack.sharedContext.crossSurfaceRules);
  const implementationTarget = promptPack.sharedContext.implementationBias?.preferredStack ?? 'the target implementation stack';
  const requiredInputs = formatBulletList(surface.requiredInputs.map((item) => `${item}: {{${item}}}`));
  const optionalInputs = formatBulletList((surface.optionalInputs ?? []).map((item) => `${item}: {{${item}}}`));
  const sectionExpectations = formatBulletList(surface.sectionExpectations);
  const surfaceOverrides = formatBulletList(surface.surfaceOverrides);
  const deliverables = formatBulletList(surface.deliverables);
  const auditChecklist = formatBulletList([...(surface.auditChecklist ?? []), ...(promptPack.auditPromptAddendum ?? [])]);
  const pageRecipe = schema.recipes?.pageArchetypes?.[surfaceName];
  const pageRecipeLines = pageRecipe
    ? [
        `Suggested page purpose: ${pageRecipe.purpose ?? surface.goal}`,
        `Suggested required sections: ${(pageRecipe.requiredSections ?? []).join(', ') || 'Use surface expectations.'}`,
      ]
    : [];

  const promptBodyLines = [
    `Design a ${surfaceName} surface in the ${brandLabel} style.`,
    '',
    `Treat \`${schemaFileName}\` as the source-of-truth brand contract.`,
    '',
    `Brand summary: ${brandSummary}`,
    `Surface goal: ${surface.goal}`,
    '',
    'Style keywords:',
    ...(promptPack.sharedContext.styleKeywords ?? []).map((item) => `- ${item}`),
    '',
    'Avoid:',
    ...(promptPack.sharedContext.negativeStyleKeywords ?? []).map((item) => `- ${item}`),
    '',
    'Cross-surface rules:',
    ...(promptPack.sharedContext.crossSurfaceRules ?? []).map((item) => `- ${item}`),
    '',
    'Surface-specific overrides:',
    ...(surface.surfaceOverrides ?? []).map((item) => `- ${item}`),
    '',
    'Implementation target:',
    `- ${implementationTarget}`,
    '',
    'Required inputs:',
    ...surface.requiredInputs.map((item) => `- ${item}: {{${item}}}`),
    '',
    'Optional inputs:',
    ...((surface.optionalInputs ?? []).length > 0
      ? (surface.optionalInputs ?? []).map((item) => `- ${item}: {{${item}}}`)
      : ['- None.']),
    '',
    'Expected sections:',
    ...((surface.sectionExpectations ?? []).length > 0
      ? (surface.sectionExpectations ?? []).map((item) => `- ${item}`)
      : ['- None specified.']),
    '',
    'Deliverables:',
    ...((surface.deliverables ?? []).length > 0
      ? (surface.deliverables ?? []).map((item) => `- ${item}`)
      : ['- Final implementation.']),
    '',
    ...pageRecipeLines,
    ...(pageRecipeLines.length > 0 ? [''] : []),
    'Now follow this working sequence:',
    '1. Read the audience and product goal.',
    '2. Define the information architecture and section order.',
    '3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.',
    '4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.',
    '5. Generate the requested implementation in a coherent brand system style.',
    '',
    'Reference prompt instructions:',
    ...surface.promptTemplate.map((line) => `- ${line}`),
    '',
    'Audit before finishing:',
    ...[...(surface.auditChecklist ?? []), ...(promptPack.auditPromptAddendum ?? [])].map((item) => `- ${item}`),
  ];

  return [
    `# ${brandLabel} ${toTitleCase(surfaceName)} Prompt`,
    '',
    promptIntro,
    '',
    '## Attach',
    ...attachFiles.map((fileName) => `- \`${fileName}\``),
    '- Optionally attach any copied adapter assets from this generated kit that match the target stack.',
    '',
    '## Required Inputs',
    requiredInputs,
    '',
    '## Optional Inputs',
    optionalInputs,
    '',
    '## Surface Goal',
    surface.goal,
    '',
    '## Brand Summary',
    brandSummary,
    '',
    '## Style Keywords',
    styleKeywords,
    '',
    '## Negative Style Keywords',
    negativeKeywords,
    '',
    '## Cross-Surface Rules',
    crossRules,
    '',
    '## Section Expectations',
    sectionExpectations,
    '',
    '## Surface Overrides',
    surfaceOverrides,
    '',
    '## Deliverables',
    deliverables,
    '',
    '## Audit Checklist',
    auditChecklist,
    '',
    '## Copy-Ready Prompt',
    '```text',
    ...promptBodyLines,
    '```',
    '',
  ].join('\n');
}

function buildPromptIndex(promptPack: PromptPack, schema: BrandOsSchema): string {
  const surfaceNames = Object.keys(promptPack.surfaces);
  return [
    `# ${schema.meta.name} Prompt Index`,
    '',
    'These files are isolated prompts for starting surface-specific application work with the brand schema attached as the source-of-truth contract.',
    '',
    ...surfaceNames.map((surface) => `- \`${surface}.md\` — ${promptPack.surfaces[surface].goal}`),
    '',
  ].join('\n');
}

function copyAdapterAssets(paths: BrandOsResolvedPaths, schema: BrandOsSchema): string[] {
  const assets = schema.emit?.assets ?? [];
  const copiedOutputs: string[] = [];

  for (const asset of assets) {
    const sourcePath = resolveRelativeToSchemaDir(paths.schemaPath, asset.source);
    if (!existsSync(sourcePath)) {
      fail(`Adapter asset "${asset.source}" was not found relative to the schema.`);
    }

    const destinationPath = join(paths.emitDir, asset.output);
    copyPath(sourcePath, destinationPath);
    copiedOutputs.push(asset.output.replace(/\\/g, '/'));
  }

  return copiedOutputs;
}

function buildAssetList(assets: BrandOsCopiedAsset[] | undefined): string {
  if (!assets || assets.length === 0) {
    return '- None.';
  }

  return assets
    .map((asset) => `- \`${asset.output}\`${asset.description ? ` — ${asset.description}` : ''}`)
    .join('\n');
}

function buildBrandReadme(schema: BrandOsSchema, promptPack: PromptPack, copiedAssets: string[]): string {
  const docsConfig = schema.emit?.docs;
  const thesis = schema.brandThesis;
  const generatedKitTitle = docsConfig?.generatedKitTitle ?? `${schema.meta.name} Generated Kit`;

  return [
    `# ${generatedKitTitle}`,
    '',
    'This directory was generated from the machine-readable brand operating system source files.',
    '',
    '## Included',
    `- \`prompts/\`: ${Object.keys(promptPack.surfaces).length} isolated surface prompt files`,
    '- `parser-fixtures/`: parser contract fixtures derived from the reference input set',
    '- `parser-contract.json`: copied parser contract snapshot',
    copiedAssets.length > 0 ? `- adapter assets copied from the brand package: ${copiedAssets.length}` : '- no adapter assets were configured for copying',
    '',
    '## Adapter Assets',
    buildAssetList(schema.emit?.assets),
    '',
    '## Brand Summary',
    thesis?.summary ?? promptPack.sharedContext.brandSummary,
    '',
    '## Personality',
    formatBulletList(thesis?.personality),
    '',
    '## Anti-Personality',
    formatBulletList(thesis?.antiPersonality),
    '',
    '## Usage',
    '1. Attach the schema file as the source-of-truth brand contract.',
    '2. Use one file from `prompts/` as the isolated surface prompt.',
    '3. If you need parser-friendly HTML/Tailwind output, validate against the parser contract and the emitted fixture set.',
    '4. Use the copied adapter assets only for the stacks they were authored for. The CLI does not assume Tailwind version or CSS adapter strategy.',
    '',
  ].join('\n');
}

function buildFixtureReadme(fixtures: ParserFixture[], fixtureSource: ParserFixtureSource, schema: BrandOsSchema): string {
  const docsConfig = schema.emit?.docs;
  const title = docsConfig?.parserFixtureTitle ?? `${schema.meta.name} Parser Fixtures`;
  const referenceName = docsConfig?.parserFixtureReference ?? fixtureSource.referenceProjectName ?? 'the reference input set';

  return [
    `# ${title}`,
    '',
    `These fixtures are derived from ${referenceName} and are intended to validate how a parser splits classes into structural, semantic, decorative, and unknown buckets.`,
    '',
    '## How To Use',
    '1. Read a fixture file from this directory.',
    '2. Classify each class according to the parser contract.',
    '3. Compare the parser result to the `expected` buckets.',
    '4. Emit warnings for any mismatches or unknown classes.',
    '',
    '## Fixture Count',
    `- ${fixtures.length} fixture(s)`,
    '',
  ].join('\n');
}

function buildManifest(outputDir: string, promptPack: PromptPack, fixtures: ParserFixture[], schema: BrandOsSchema, copiedAssets: string[]): string {
  return `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      brandName: schema.meta.name,
      outputDir,
      files: {
        promptCount: Object.keys(promptPack.surfaces).length,
        prompts: Object.keys(promptPack.surfaces).map((surface) => `prompts/${surface}.md`),
        fixtureCount: fixtures.length,
        fixtureIndex: 'parser-fixtures/index.json',
        copiedAssets,
      },
    },
    null,
    2,
  )}\n`;
}

function emitParserFixtures(outputDir: string, source: ParserFixtureSource, schema: BrandOsSchema): ParserFixture[] {
  const fixturesDir = join(outputDir, 'parser-fixtures');
  ensureDir(fixturesDir);

  writeTextFile(join(fixturesDir, 'index.json'), `${JSON.stringify(source, null, 2)}\n`);
  for (const fixture of source.fixtures) {
    writeTextFile(join(fixturesDir, `${fixture.id}.json`), `${JSON.stringify(fixture, null, 2)}\n`);
  }
  writeTextFile(join(fixturesDir, 'README.md'), buildFixtureReadme(source.fixtures, source, schema));
  return source.fixtures;
}

function emitPrompts(outputDir: string, promptPack: PromptPack, schema: BrandOsSchema, schemaFileName: string): void {
  const promptsDir = join(outputDir, 'prompts');
  ensureDir(promptsDir);

  for (const [surfaceName, surface] of Object.entries(promptPack.surfaces)) {
    writeTextFile(join(promptsDir, `${surfaceName}.md`), buildPromptMarkdown(surfaceName, surface, promptPack, schema, schemaFileName));
  }

  writeTextFile(join(promptsDir, 'README.md'), buildPromptIndex(promptPack, schema));
}

function buildBrandBrief(schema: BrandOsSchema, promptPack: PromptPack): string {
  const thesis = schema.brandThesis;
  const tokens = schema.tokens;
  const grammar = schema.designGrammar;
  const recipes = schema.recipes;

  const sections: string[] = [
    `# ${schema.meta.name} — Brand Brief`,
    '',
    schema.meta.description ?? thesis?.summary ?? '',
    '',
  ];

  if (thesis) {
    sections.push('## Brand Thesis', '');
    if (thesis.summary) sections.push(thesis.summary, '');
    if (thesis.promise) sections.push(`**Promise:** ${thesis.promise}`, '');
    if (thesis.positioning) sections.push(`**Positioning:** ${thesis.positioning}`, '');
    if (thesis.personality?.length) {
      sections.push('**Personality:** ' + thesis.personality.join(', '), '');
    }
    if (thesis.antiPersonality?.length) {
      sections.push('**Anti-personality (NEVER):** ' + thesis.antiPersonality.join(', '), '');
    }
    if (thesis.voice) {
      if (thesis.voice.tone?.length) {
        sections.push('**Voice tone:** ' + thesis.voice.tone.join(', '), '');
      }
      if (thesis.voice.avoid?.length) {
        sections.push('**Voice avoid:** ' + thesis.voice.avoid.join(', '), '');
      }
    }
  }

  sections.push('## Design Tokens', '');

  if (tokens?.typography?.families) {
    const f = tokens.typography.families;
    sections.push('### Typography', '');
    if (f.display) sections.push(`- Display: \`${f.display}\``);
    if (f.body) sections.push(`- Body: \`${f.body}\``);
    if (f.ui) sections.push(`- UI: \`${f.ui}\``);
    if (f.mono) sections.push(`- Mono: \`${f.mono}\``);
    sections.push('');
  }

  if (tokens?.typography?.sizes && Object.keys(tokens.typography.sizes).length > 0) {
    sections.push('### Type Scale', '');
    for (const [k, v] of Object.entries(tokens.typography.sizes)) {
      sections.push(`- ${k}: \`${v}\``);
    }
    sections.push('');
  }

  if (tokens?.typography?.lineHeights && Object.keys(tokens.typography.lineHeights).length > 0) {
    sections.push('### Line Heights', '');
    for (const [k, v] of Object.entries(tokens.typography.lineHeights)) {
      sections.push(`- ${k}: \`${v}\``);
    }
    sections.push('');
  }

  if (tokens?.typography?.tracking && Object.keys(tokens.typography.tracking).length > 0) {
    sections.push('### Tracking', '');
    for (const [k, v] of Object.entries(tokens.typography.tracking)) {
      sections.push(`- ${k}: \`${v}\``);
    }
    sections.push('');
  }

  if (tokens?.typography?.surfaceOverrides && Object.keys(tokens.typography.surfaceOverrides).length > 0) {
    sections.push('### Typography Surface Overrides', '');
    for (const [surface, override] of Object.entries(tokens.typography.surfaceOverrides)) {
      sections.push(`- ${surface}: ${Object.entries(override).map(([k, v]) => `${k}=\`${v}\``).join(', ')}`);
    }
    sections.push('');
  }

  if (tokens?.color?.light) {
    const c = tokens.color.light;
    sections.push('### Colors (light)', '');
    const colorKeys = ['primary', 'primaryForeground', 'secondary', 'accent', 'muted', 'background', 'foreground', 'border', 'destructive'] as const;
    for (const key of colorKeys) {
      if (c[key]) sections.push(`- ${key}: \`${c[key]}\``);
    }
    sections.push('');
  }

  if (tokens?.color?.dark && Object.keys(tokens.color.dark).length > 0) {
    const c = tokens.color.dark;
    sections.push('### Colors (dark)', '');
    const colorKeys = ['primary', 'primaryForeground', 'secondary', 'accent', 'muted', 'background', 'foreground', 'border', 'destructive'] as const;
    for (const key of colorKeys) {
      if (c[key]) sections.push(`- ${key}: \`${c[key]}\``);
    }
    sections.push('');
  }

  if (tokens?.color?.charts && Object.keys(tokens.color.charts).length > 0) {
    sections.push('### Chart Colors', '');
    for (const [k, v] of Object.entries(tokens.color.charts)) {
      sections.push(`- ${k}: \`${v}\``);
    }
    sections.push('');
  }

  if (tokens?.color?.categories && Object.keys(tokens.color.categories).length > 0) {
    sections.push('### Category Colors', '');
    for (const [k, v] of Object.entries(tokens.color.categories)) {
      sections.push(`- ${k}: light=\`${v.light}\`, dark=\`${v.dark}\`${v.aliases?.length ? `, aliases=${v.aliases.join(', ')}` : ''}`);
    }
    sections.push('');
  }

  if (tokens?.radius) {
    sections.push('### Radius', '');
    for (const [k, v] of Object.entries(tokens.radius)) {
      sections.push(`- ${k}: \`${v}\``);
    }
    sections.push('');
  }

  if (tokens?.shadow) {
    sections.push('### Shadow', '');
    for (const [k, v] of Object.entries(tokens.shadow)) {
      sections.push(`- ${k}: \`${v}\``);
    }
    sections.push('');
  }

  if (tokens?.spacing) {
    if (tokens.spacing.baseUnit) {
      sections.push(`### Spacing`, '', `- baseUnit: \`${tokens.spacing.baseUnit}\``, '');
    }
    if (tokens.spacing.scale && Object.keys(tokens.spacing.scale).length > 0) {
      sections.push('### Spacing Scale', '');
      for (const [k, v] of Object.entries(tokens.spacing.scale)) {
        sections.push(`- ${k}: \`${v}\``);
      }
      sections.push('');
    }
    if (tokens.spacing.sectionRhythm && Object.keys(tokens.spacing.sectionRhythm).length > 0) {
      sections.push('### Section Rhythm', '');
      for (const [k, v] of Object.entries(tokens.spacing.sectionRhythm)) {
        sections.push(`- ${k}: \`${v}\``);
      }
      sections.push('');
    }
    if (tokens.spacing.container && Object.keys(tokens.spacing.container).length > 0) {
      sections.push('### Containers', '');
      for (const [k, v] of Object.entries(tokens.spacing.container)) {
        sections.push(`- ${k}: \`${v}\``);
      }
      sections.push('');
    }
  }

  if (tokens?.motion) {
    sections.push('### Motion', '');
    if (tokens.motion.durations && Object.keys(tokens.motion.durations).length > 0) {
      sections.push(`- durations: ${Object.entries(tokens.motion.durations).map(([k, v]) => `${k}=\`${v}\``).join(', ')}`);
    }
    if (tokens.motion.easings && Object.keys(tokens.motion.easings).length > 0) {
      sections.push(`- easings: ${Object.entries(tokens.motion.easings).map(([k, v]) => `${k}=\`${v}\``).join(', ')}`);
    }
    if (tokens.motion.presets && Object.keys(tokens.motion.presets).length > 0) {
      sections.push(`- presets: ${Object.entries(tokens.motion.presets).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join('; ')}`);
    }
    if (tokens.motion.reducedMotion && Object.keys(tokens.motion.reducedMotion).length > 0) {
      sections.push(`- reducedMotion: ${Object.entries(tokens.motion.reducedMotion).map(([k, v]) => `${k}=\`${String(v)}\``).join(', ')}`);
    }
    sections.push('');
  }

  if (grammar) {
    sections.push('## Design Grammar', '');
    if (grammar.styleDirection) {
      sections.push(`**Style direction:** ${grammar.styleDirection}`, '');
    }
    if (grammar.shapeLanguage?.core) {
      sections.push(`**Shape language:** ${grammar.shapeLanguage.core}`, '');
    }
    if (grammar.surfaceLanguage) {
      if (grammar.surfaceLanguage.base) sections.push(`**Surface treatment:** ${grammar.surfaceLanguage.base}`);
      if (grammar.surfaceLanguage.depthRule) sections.push(`**Depth rule:** ${grammar.surfaceLanguage.depthRule}`);
      if (grammar.surfaceLanguage.accentRule) sections.push(`**Accent rule:** ${grammar.surfaceLanguage.accentRule}`);
      if (grammar.surfaceLanguage.contrastRule) sections.push(`**Contrast rule:** ${grammar.surfaceLanguage.contrastRule}`);
      sections.push('');
    }
    if (grammar.densityModes && Object.keys(grammar.densityModes).length > 0) {
      sections.push('### Density Modes', '');
      for (const [k, v] of Object.entries(grammar.densityModes)) {
        sections.push(`- ${k}: ${v}`);
      }
      sections.push('');
    }
    if (grammar.imageTreatment) {
      sections.push('### Image Treatment', '');
      if (grammar.imageTreatment.style) sections.push(`- Style: ${grammar.imageTreatment.style}`);
      if (grammar.imageTreatment.preferred?.length) sections.push(`- Preferred: ${grammar.imageTreatment.preferred.join(', ')}`);
      if (grammar.imageTreatment.avoid?.length) sections.push(`- Avoid: ${grammar.imageTreatment.avoid.join(', ')}`);
      sections.push('');
    }
    if (grammar.contentVoice) {
      sections.push('### Content Voice', '');
      if (grammar.contentVoice.adjectives?.length) sections.push(`- Adjectives: ${grammar.contentVoice.adjectives.join(', ')}`);
      if (grammar.contentVoice.avoid?.length) sections.push(`- Avoid: ${grammar.contentVoice.avoid.join(', ')}`);
      sections.push('');
    }
  }

  if (recipes?.pageArchetypes && Object.keys(recipes.pageArchetypes).length > 0) {
    sections.push('## Page Archetypes', '');
    for (const [name, archetype] of Object.entries(recipes.pageArchetypes)) {
      sections.push(`### ${toTitleCase(name)}`, '');
      if (archetype.purpose) sections.push(`Purpose: ${archetype.purpose}`, '');
      if (archetype.requiredSections?.length) {
        sections.push(`Sections: ${archetype.requiredSections.join(', ')}`, '');
      }
    }
  }

  if (recipes?.sectionArchetypes && Object.keys(recipes.sectionArchetypes).length > 0) {
    sections.push('## Section Archetypes', '');
    for (const [name, archetype] of Object.entries(recipes.sectionArchetypes)) {
      sections.push(`### ${toTitleCase(name)}`, '');
      if (archetype.purpose) sections.push(`Purpose: ${archetype.purpose}`);
      if (archetype.requiredSlots?.length) sections.push(`Slots: ${archetype.requiredSlots.join(', ')}`);
      if (archetype.fixedTraits?.length) sections.push(`Traits: ${archetype.fixedTraits.join(', ')}`);
      sections.push('');
    }
  }

  if (promptPack.sharedContext.crossSurfaceRules?.length) {
    sections.push('## Cross-Surface Rules', '');
    for (const rule of promptPack.sharedContext.crossSurfaceRules) {
      sections.push(`- ${rule}`);
    }
    sections.push('');
  }

  const schema_componentPolicy = schema.componentPolicy;
  if (schema_componentPolicy) {
    sections.push('## Component Policy', '');
    if (schema_componentPolicy.keepStandard?.length) {
      sections.push('**Keep standard:** ' + schema_componentPolicy.keepStandard.join(', '), '');
    }
    if (schema_componentPolicy.wrapEarly?.length) {
      sections.push('**Wrap early:** ' + schema_componentPolicy.wrapEarly.join(', '), '');
    }
    if (schema_componentPolicy.customBlocks?.length) {
      sections.push('**Custom blocks:** ' + schema_componentPolicy.customBlocks.join(', '), '');
    }
    if (schema_componentPolicy.rawHtmlAllowedFor?.length) {
      sections.push('**Raw HTML allowed for:** ' + schema_componentPolicy.rawHtmlAllowedFor.join(', '), '');
    }
    if (schema_componentPolicy.avoid?.length) {
      sections.push('**Avoid:** ' + schema_componentPolicy.avoid.join(', '), '');
    }
  }

  sections.push(
    '---',
    '',
    `Generated by brand-os on ${new Date().toISOString().split('T')[0]}.`,
    `Source: ${schema.meta.slug}.schema.json`,
    '',
  );

  return sections.join('\n');
}

export function emitBrandOsArtifacts(
  paths: BrandOsResolvedPaths,
  schema: BrandOsSchema,
  promptPack: PromptPack,
  parserContract: ParserContract,
  fixtureSource: ParserFixtureSource,
): { promptCount: number; fixtureCount: number; copiedAssetCount: number } {
  ensureDir(paths.emitDir);
  for (const legacyFile of ['theme.css', 'tailwind.extend.ts']) {
    const legacyPath = join(paths.emitDir, legacyFile);
    if (existsSync(legacyPath)) {
      rmSync(legacyPath, { force: true });
    }
  }
  const copiedAssets = copyAdapterAssets(paths, schema);
  writeTextFile(join(paths.emitDir, 'README.md'), buildBrandReadme(schema, promptPack, copiedAssets));
  writeTextFile(join(paths.emitDir, 'brand-brief.md'), buildBrandBrief(schema, promptPack));
  writeTextFile(join(paths.emitDir, 'parser-contract.json'), `${JSON.stringify(parserContract, null, 2)}\n`);
  emitPrompts(paths.emitDir, promptPack, schema, paths.schemaFileName);
  const emittedFixtures = emitParserFixtures(paths.emitDir, fixtureSource, schema);
  writeTextFile(join(paths.emitDir, 'manifest.json'), buildManifest(paths.emitDir, promptPack, emittedFixtures, schema, copiedAssets));

  return {
    promptCount: Object.keys(promptPack.surfaces).length,
    fixtureCount: emittedFixtures.length,
    copiedAssetCount: copiedAssets.length,
  };
}
