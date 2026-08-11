import { createHash } from 'node:crypto';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { BrandOsResolvedPaths, BrandOsSchema } from './types.js';

export function fail(message: string): never {
  throw new Error(`Error: ${message}`);
}

export function readJsonFile<T>(filePath: string): T {
  try {
    return JSON.parse(readFileSync(filePath, 'utf8')) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown JSON read error';
    fail(`Failed to read JSON file "${filePath}": ${message}`);
  }
}

export function readJsonValue(filePath: string): unknown {
  return readJsonFile<unknown>(filePath);
}

export function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

export function writeTextFile(filePath: string, content: string): void {
  ensureDir(dirname(filePath));
  writeFileSync(filePath, content, 'utf8');
}

export function sha256Text(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export function sha256File(filePath: string): string {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

export function resolveContainedPath(rootDir: string, candidate: string, label: string): string {
  if (!candidate.trim() || isAbsolute(candidate)) fail(`${label} must be a non-empty relative path.`);
  const root = resolve(rootDir);
  const target = resolve(root, candidate);
  const rel = relative(root, target);
  if (rel === '..' || rel.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) || isAbsolute(rel)) {
    fail(`${label} escapes its declared root: ${candidate}`);
  }
  return target;
}

export function listFilesRecursive(rootDir: string): string[] {
  const files: string[] = [];
  const visit = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const absolute = join(dir, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(relative(rootDir, absolute).replace(/\\/g, '/'));
    }
  };
  visit(rootDir);
  return files.sort();
}

export function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

export function formatBulletList(items: string[] | undefined): string {
  if (!items || items.length === 0) {
    return '- None specified.';
  }
  return items.map((item) => `- ${item}`).join('\n');
}

export function getSchemaBaseName(schemaPath: string): string {
  return basename(schemaPath).replace(/\.schema\.json$/i, '').replace(/\.json$/i, '');
}

function getSchemaSlug(schema: BrandOsSchema, schemaPath: string): string {
  return schema.meta.slug ?? getSchemaBaseName(schemaPath);
}

export function resolveBrandOsPaths(
  schemaPathArg: string,
  schema: BrandOsSchema,
  provided: { emitDir?: string },
): BrandOsResolvedPaths {
  const schemaPath = resolve(process.cwd(), schemaPathArg);
  const slug = getSchemaSlug(schema, schemaPath);

  const emitDir = provided.emitDir
    ? resolve(process.cwd(), provided.emitDir)
    : join(dirname(schemaPath), `${slug}-generated`);

  return { schemaPath, emitDir };
}

export function copyPath(sourcePath: string, destinationPath: string): void {
  const stats = statSync(sourcePath);

  if (stats.isDirectory()) {
    ensureDir(destinationPath);
    for (const entry of readdirSync(sourcePath)) {
      copyPath(join(sourcePath, entry), join(destinationPath, entry));
    }
    return;
  }

  ensureDir(dirname(destinationPath));
  copyFileSync(sourcePath, destinationPath);
}
