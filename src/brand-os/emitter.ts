import {
  existsSync,
  mkdtempSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
} from 'node:fs';
import { basename, dirname, join, parse, relative, resolve } from 'node:path';
import { buildDesignMd } from './emit/design-md.js';
import { emitBrandMarks } from './emit/brand-marks.js';
import { emitTweaks } from './emit/tweaks.js';
import { validateThemeContrast } from './validators/contrast.js';
import { BrandOsResolvedPaths, BrandOsSchema, PromptPack } from './types.js';
import {
  copyPath,
  ensureDir,
  fail,
  listFilesRecursive,
  resolveContainedPath,
  sha256File,
  sha256Text,
  writeTextFile,
} from './utils.js';

export interface ManifestFile {
  path: string;
  bytes: number;
  sha256: string;
}

export interface BrandOsManifest {
  manifestVersion: '1.0.0';
  generator: { name: 'brand-os'; version: string };
  schema: { version: string; sha256: string };
  warnings: string[];
  files: ManifestFile[];
}

export interface EmitResult {
  outputDir: string;
  manifest: BrandOsManifest;
  copiedAssetCount: number;
  warnings: string[];
}

function assertSafeOutputDirectory(outputDir: string, schemaPath: string): void {
  const target = resolve(outputDir);
  if (target === parse(target).root || target === resolve(process.cwd()) || target === resolve(dirname(schemaPath))) {
    fail(`Refusing broad output directory: ${target}`);
  }
}

function copyAssets(outputDir: string, schemaPath: string, schema: BrandOsSchema): string[] {
  const copied: string[] = [];
  const sourceRoot = dirname(schemaPath);
  for (const asset of schema.emit?.assets ?? []) {
    const source = resolveContainedPath(sourceRoot, asset.source, 'emit.assets[].source');
    if (!existsSync(source)) fail(`Asset not found: ${asset.source}`);
    const destination = resolveContainedPath(outputDir, asset.output, 'emit.assets[].output');
    copyPath(source, destination);
    copied.push(relative(outputDir, destination).replace(/\\/g, '/'));
  }
  return copied.sort();
}

function buildReadme(schema: BrandOsSchema, files: string[]): string {
  return [
    `# ${schema.meta.name} brand contract`,
    '',
    'Generated deterministically from `contract.json` by brand-os.',
    '',
    '## Files',
    ...files.map((file) => `- \`${file}\``),
    '',
    'Treat `contract.json` as machine source of truth and `DESIGN.md` as the human/agent exchange view.',
    '',
  ].join('\n');
}

function fileRecords(outputDir: string): ManifestFile[] {
  return listFilesRecursive(outputDir)
    .filter((file) => file !== 'manifest.json')
    .map((file) => {
      const absolute = join(outputDir, file);
      return { path: file, bytes: statSync(absolute).size, sha256: sha256File(absolute) };
    });
}

function installStagedDirectory(stageDir: string, outputDir: string, force: boolean): void {
  const targetExists = existsSync(outputDir);
  if (targetExists && readdirSync(outputDir).length > 0 && !force) {
    fail(`Output directory is not empty: ${outputDir}. Pass --force to replace it atomically.`);
  }

  ensureDir(dirname(outputDir));
  if (!targetExists) {
    renameSync(stageDir, outputDir);
    return;
  }

  const backup = `${outputDir}.backup-${process.pid}`;
  if (existsSync(backup)) rmSync(backup, { recursive: true, force: true });
  renameSync(outputDir, backup);
  try {
    renameSync(stageDir, outputDir);
    rmSync(backup, { recursive: true, force: true });
  } catch (error) {
    if (existsSync(outputDir)) rmSync(outputDir, { recursive: true, force: true });
    renameSync(backup, outputDir);
    throw error;
  }
}

export function emitBrandOsArtifacts(
  paths: BrandOsResolvedPaths,
  schema: BrandOsSchema,
  promptPack: PromptPack,
  options: { force: boolean; generatorVersion: string },
): EmitResult {
  assertSafeOutputDirectory(paths.emitDir, paths.schemaPath);
  if (existsSync(paths.emitDir) && readdirSync(paths.emitDir).length > 0 && !options.force) {
    fail(`Output directory is not empty: ${paths.emitDir}. Pass --force to replace it atomically.`);
  }

  ensureDir(dirname(paths.emitDir));
  const stage = mkdtempSync(join(dirname(paths.emitDir), `.${basename(paths.emitDir)}.stage-`));
  try {
    const contract = `${JSON.stringify(schema, null, 2)}\n`;
    writeTextFile(join(stage, 'contract.json'), contract);
    writeTextFile(join(stage, 'DESIGN.md'), buildDesignMd(schema, promptPack));

    const emitted: string[] = ['contract.json', 'DESIGN.md'];
    if (schema.tweaks) emitted.push(...emitTweaks(stage, schema));
    if (schema.brandMarks && Object.keys(schema.brandMarks).length > 0) emitted.push(...emitBrandMarks(stage, schema));
    const copiedAssets = copyAssets(stage, paths.schemaPath, schema);
    emitted.push(...copiedAssets);
    writeTextFile(join(stage, 'README.md'), buildReadme(schema, [...emitted, 'manifest.json'].sort()));

    const warnings = validateThemeContrast(schema);
    const manifest: BrandOsManifest = {
      manifestVersion: '1.0.0',
      generator: { name: 'brand-os', version: options.generatorVersion },
      schema: { version: schema.schemaVersion, sha256: sha256Text(contract) },
      warnings,
      files: fileRecords(stage),
    };
    writeTextFile(join(stage, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
    installStagedDirectory(stage, paths.emitDir, options.force);
    return { outputDir: paths.emitDir, manifest, copiedAssetCount: copiedAssets.length, warnings };
  } catch (error) {
    if (existsSync(stage)) rmSync(stage, { recursive: true, force: true });
    throw error;
  }
}
