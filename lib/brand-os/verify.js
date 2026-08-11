import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { listFilesRecursive, readJsonValue, resolveContainedPath, sha256File, sha256Text } from './utils.js';
const REQUIRED_DESIGN_SECTIONS = ['Overview', 'Colors', 'Typography', 'Layout', 'Elevation & Depth', 'Shapes', 'Components', "Do's and Don'ts"];
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function verifyDesignMd(content) {
    const issues = [];
    if (!content.startsWith('---\n') || content.indexOf('\n---\n', 4) < 0) {
        issues.push({ code: 'missing_frontmatter', path: '/DESIGN.md', message: 'YAML frontmatter is required.' });
    }
    for (const section of REQUIRED_DESIGN_SECTIONS) {
        if (!content.includes(`## ${section}\n`))
            issues.push({ code: 'missing_section', path: '/DESIGN.md', message: `Missing section: ${section}.` });
    }
    return issues;
}
function parseManifest(bundleDir, issues) {
    const path = join(bundleDir, 'manifest.json');
    if (!existsSync(path)) {
        issues.push({ code: 'missing_manifest', path: '/manifest.json', message: 'Bundle manifest is missing.' });
        return undefined;
    }
    const value = readJsonValue(path);
    if (!isRecord(value) || value.manifestVersion !== '1.0.0' || !Array.isArray(value.files) || !isRecord(value.schema)) {
        issues.push({ code: 'invalid_manifest', path: '/manifest.json', message: 'Unsupported or malformed manifest.' });
        return undefined;
    }
    return value;
}
export function verifyBundle(schema, bundleDir, strict = false) {
    const issues = [];
    const manifest = parseManifest(bundleDir, issues);
    if (!manifest)
        return { ok: false, issues };
    const expectedContract = `${JSON.stringify(schema, null, 2)}\n`;
    if (manifest.schema.version !== schema.schemaVersion || manifest.schema.sha256 !== sha256Text(expectedContract)) {
        issues.push({ code: 'schema_mismatch', path: '/manifest.json/schema', message: 'Bundle was emitted from a different contract.' });
    }
    const declared = new Set(['manifest.json']);
    for (const file of manifest.files) {
        if (!file || typeof file.path !== 'string' || typeof file.sha256 !== 'string' || typeof file.bytes !== 'number') {
            issues.push({ code: 'invalid_file_record', path: '/manifest.json/files', message: 'Malformed file record.' });
            continue;
        }
        let absolute;
        try {
            absolute = resolveContainedPath(bundleDir, file.path, 'manifest file path');
        }
        catch (error) {
            issues.push({ code: 'unsafe_manifest_path', path: `/manifest.json/files/${file.path}`, message: error instanceof Error ? error.message : 'Unsafe path.' });
            continue;
        }
        declared.add(file.path.replace(/\\/g, '/'));
        if (!existsSync(absolute)) {
            issues.push({ code: 'missing_file', path: `/${file.path}`, message: 'Declared file is missing.' });
            continue;
        }
        if (statSync(absolute).size !== file.bytes)
            issues.push({ code: 'size_mismatch', path: `/${file.path}`, message: 'File size differs from the manifest.' });
        if (sha256File(absolute) !== file.sha256)
            issues.push({ code: 'checksum_mismatch', path: `/${file.path}`, message: 'File checksum differs from the manifest.' });
    }
    const designPath = join(bundleDir, 'DESIGN.md');
    if (existsSync(designPath))
        issues.push(...verifyDesignMd(readFileSync(designPath, 'utf8')));
    else
        issues.push({ code: 'missing_design_md', path: '/DESIGN.md', message: 'DESIGN.md is missing.' });
    if (strict) {
        for (const file of listFilesRecursive(bundleDir)) {
            if (!declared.has(file))
                issues.push({ code: 'undeclared_file', path: `/${file}`, message: 'File is not declared by the manifest.' });
        }
    }
    return { ok: issues.length === 0, issues, manifest };
}
