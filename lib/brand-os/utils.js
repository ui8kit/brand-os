import { createHash } from 'node:crypto';
import { basename, dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
export function fail(message) {
    throw new Error(`Error: ${message}`);
}
export function readJsonFile(filePath) {
    try {
        return JSON.parse(readFileSync(filePath, 'utf8'));
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown JSON read error';
        fail(`Failed to read JSON file "${filePath}": ${message}`);
    }
}
export function readJsonValue(filePath) {
    return readJsonFile(filePath);
}
export function ensureDir(dir) {
    mkdirSync(dir, { recursive: true });
}
export function writeTextFile(filePath, content) {
    ensureDir(dirname(filePath));
    writeFileSync(filePath, content, 'utf8');
}
export function sha256Text(content) {
    return createHash('sha256').update(content).digest('hex');
}
export function sha256File(filePath) {
    return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}
export function resolveContainedPath(rootDir, candidate, label) {
    if (!candidate.trim() || isAbsolute(candidate))
        fail(`${label} must be a non-empty relative path.`);
    const root = resolve(rootDir);
    const target = resolve(root, candidate);
    const rel = relative(root, target);
    if (rel === '..' || rel.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) || isAbsolute(rel)) {
        fail(`${label} escapes its declared root: ${candidate}`);
    }
    return target;
}
export function listFilesRecursive(rootDir) {
    const files = [];
    const visit = (dir) => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const absolute = join(dir, entry.name);
            if (entry.isDirectory())
                visit(absolute);
            else if (entry.isFile())
                files.push(relative(rootDir, absolute).replace(/\\/g, '/'));
        }
    };
    visit(rootDir);
    return files.sort();
}
export function toTitleCase(value) {
    return value
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ');
}
export function formatBulletList(items) {
    if (!items || items.length === 0) {
        return '- None specified.';
    }
    return items.map((item) => `- ${item}`).join('\n');
}
export function getSchemaBaseName(schemaPath) {
    return basename(schemaPath).replace(/\.schema\.json$/i, '').replace(/\.json$/i, '');
}
function getSchemaSlug(schema, schemaPath) {
    return schema.meta.slug ?? getSchemaBaseName(schemaPath);
}
export function resolveBrandOsPaths(schemaPathArg, schema, provided) {
    const schemaPath = resolve(process.cwd(), schemaPathArg);
    const slug = getSchemaSlug(schema, schemaPath);
    const emitDir = provided.emitDir
        ? resolve(process.cwd(), provided.emitDir)
        : join(dirname(schemaPath), `${slug}-generated`);
    return { schemaPath, emitDir };
}
export function copyPath(sourcePath, destinationPath) {
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
