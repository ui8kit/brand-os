import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { ParserContract } from '../ast-parser/types.js';
import { emitBrandMarks } from './emit/brand-marks.js';
import { buildDesignMd } from './emit/design-md.js';
import { emitTweaks } from './emit/tweaks.js';
import { validateThemeContrast } from './validators/contrast.js';
import { BrandOsCopiedAsset, BrandOsResolvedPaths, BrandOsSchema, ParserFixture, ParserFixtureSource, PromptPack } from './types.js';
import { copyPath, ensureDir, fail, formatBulletList, resolveRelativeToSchemaDir, writeTextFile } from './utils.js';

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
    '- `DESIGN.md`: Google DESIGN.md-compatible brand contract',
    '- `tweaks/`: live preview tweak assets with 8 axes',
    '- `brand-marks/`: brand recognisability slots and geometry rules',
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
    '1. Attach `DESIGN.md` as the source-of-truth brand contract.',
    '2. Wire `tweaks/tweaks.css` and `tweaks/tweaks-runtime.js` into your host page for live theme and density switching.',
    '3. Use `parser-contract.json` and `parser-fixtures/` to validate parser-friendly HTML or Tailwind output.',
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

function buildManifest(
  outputDir: string,
  fixtures: ParserFixture[],
  schema: BrandOsSchema,
  copiedAssets: string[],
  warnings: string[],
): string {
  return `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      brandName: schema.meta.name,
      outputDir,
      warnings,
      files: {
        designMd: 'DESIGN.md',
        tweaks: 'tweaks/',
        brandMarks: 'brand-marks/',
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

export function emitBrandOsArtifacts(
  paths: BrandOsResolvedPaths,
  schema: BrandOsSchema,
  promptPack: PromptPack,
  parserContract: ParserContract,
  fixtureSource: ParserFixtureSource,
): {
  fixtureCount: number;
  copiedAssetCount: number;
  warnings: string[];
  renamedBrandBrief: boolean;
} {
  ensureDir(paths.emitDir);
  for (const legacyFile of ['theme.css', 'tailwind.extend.ts']) {
    const legacyPath = join(paths.emitDir, legacyFile);
    if (existsSync(legacyPath)) {
      rmSync(legacyPath, { force: true });
    }
  }

  const legacyBriefPath = join(paths.emitDir, 'brand-brief.md');
  const renamedBrandBrief = existsSync(legacyBriefPath);
  if (renamedBrandBrief) {
    rmSync(legacyBriefPath, { force: true });
  }

  const warnings = validateThemeContrast(schema);
  const copiedAssets = copyAdapterAssets(paths, schema);
  writeTextFile(join(paths.emitDir, 'README.md'), buildBrandReadme(schema, promptPack, copiedAssets));
  writeTextFile(join(paths.emitDir, 'DESIGN.md'), buildDesignMd(schema, promptPack));
  writeTextFile(join(paths.emitDir, 'parser-contract.json'), `${JSON.stringify(parserContract, null, 2)}\n`);
  emitTweaks(paths.emitDir, schema);
  emitBrandMarks(paths.emitDir, schema);
  const emittedFixtures = emitParserFixtures(paths.emitDir, fixtureSource, schema);
  writeTextFile(join(paths.emitDir, 'manifest.json'), buildManifest(paths.emitDir, emittedFixtures, schema, copiedAssets, warnings));

  return {
    fixtureCount: emittedFixtures.length,
    copiedAssetCount: copiedAssets.length,
    warnings,
    renamedBrandBrief,
  };
}
