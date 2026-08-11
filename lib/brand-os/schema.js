import { isAbsolute, normalize } from 'node:path';
export const BRAND_OS_SCHEMA_VERSION = '1.0.0';
export class SchemaValidationError extends Error {
    issues;
    constructor(issues) {
        super(`Brand contract is invalid (${issues.length} issue${issues.length === 1 ? '' : 's'}).`);
        this.name = 'SchemaValidationError';
        this.issues = issues;
    }
}
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function child(value, key) {
    return isRecord(value) ? value[key] : undefined;
}
function addRequiredString(issues, value, path) {
    if (typeof value !== 'string' || value.trim().length === 0) {
        issues.push({ code: 'required_string', path, message: 'Expected a non-empty string.' });
    }
}
function addStringMap(issues, value, path, requiredKeys = []) {
    if (!isRecord(value)) {
        issues.push({ code: 'required_object', path, message: 'Expected an object.' });
        return;
    }
    for (const key of requiredKeys) {
        addRequiredString(issues, value[key], `${path}/${key}`);
    }
    for (const [key, entry] of Object.entries(value)) {
        if (typeof entry !== 'string' || entry.trim().length === 0) {
            issues.push({ code: 'invalid_map_value', path: `${path}/${key}`, message: 'Expected a non-empty string.' });
        }
    }
}
function isSafeRelativePath(value) {
    if (isAbsolute(value))
        return false;
    const normalized = normalize(value).replace(/\\/g, '/');
    return normalized !== '..' && !normalized.startsWith('../') && !normalized.includes('/../');
}
function validateAssets(issues, value) {
    if (value === undefined)
        return;
    if (!Array.isArray(value)) {
        issues.push({ code: 'invalid_assets', path: '/emit/assets', message: 'Expected an array.' });
        return;
    }
    value.forEach((asset, index) => {
        const path = `/emit/assets/${index}`;
        if (!isRecord(asset)) {
            issues.push({ code: 'invalid_asset', path, message: 'Expected an object.' });
            return;
        }
        addRequiredString(issues, asset.source, `${path}/source`);
        addRequiredString(issues, asset.output, `${path}/output`);
        for (const key of ['source', 'output']) {
            const entry = asset[key];
            if (typeof entry === 'string' && entry.trim() && !isSafeRelativePath(entry)) {
                issues.push({ code: 'unsafe_path', path: `${path}/${key}`, message: 'Path must be relative and stay inside its declared root.' });
            }
        }
    });
}
function validateTweaks(issues, value) {
    if (value === undefined)
        return;
    if (!isRecord(value) || !isRecord(value.axes) || Object.keys(value.axes).length === 0) {
        issues.push({ code: 'incomplete_tweaks', path: '/tweaks/axes', message: 'Tweaks must declare their complete axes; the CLI does not synthesize presets.' });
        return;
    }
    if (value.defaults !== undefined && !isRecord(value.defaults)) {
        issues.push({ code: 'invalid_tweak_defaults', path: '/tweaks/defaults', message: 'Expected an object.' });
    }
}
export function validateBrandOsSchema(value) {
    const issues = [];
    if (!isRecord(value)) {
        return [{ code: 'invalid_root', path: '/', message: 'Expected a JSON object.' }];
    }
    addRequiredString(issues, value.schemaVersion, '/schemaVersion');
    if (typeof value.schemaVersion === 'string' && !/^1\./.test(value.schemaVersion)) {
        issues.push({
            code: 'unsupported_schema_version',
            path: '/schemaVersion',
            message: `Supported schema major is 1 (current ${BRAND_OS_SCHEMA_VERSION}).`,
        });
    }
    const meta = value.meta;
    if (!isRecord(meta)) {
        issues.push({ code: 'required_object', path: '/meta', message: 'Expected an object.' });
    }
    else {
        addRequiredString(issues, meta.name, '/meta/name');
        if (meta.slug !== undefined && (typeof meta.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug))) {
            issues.push({ code: 'invalid_slug', path: '/meta/slug', message: 'Use lowercase letters, digits, and single hyphens.' });
        }
    }
    const tokens = value.tokens;
    if (!isRecord(tokens)) {
        issues.push({ code: 'required_object', path: '/tokens', message: 'Expected an object.' });
        return issues;
    }
    const color = tokens.color;
    if (!isRecord(color)) {
        issues.push({ code: 'required_object', path: '/tokens/color', message: 'Expected an object.' });
    }
    else {
        addStringMap(issues, color.light, '/tokens/color/light', [
            'background',
            'foreground',
            'card',
            'primary',
            'primaryForeground',
            'accent',
            'border',
            'destructive',
        ]);
        if (color.dark !== undefined) {
            const darkKeys = isRecord(color.dark) ? Object.keys(color.dark) : [];
            addStringMap(issues, color.dark, '/tokens/color/dark', darkKeys.length > 0
                ? ['background', 'foreground', 'card', 'primary', 'primaryForeground', 'accent', 'border', 'destructive']
                : []);
        }
    }
    const typography = tokens.typography;
    if (!isRecord(typography)) {
        issues.push({ code: 'required_object', path: '/tokens/typography', message: 'Expected an object.' });
    }
    else {
        addStringMap(issues, typography.families, '/tokens/typography/families', ['display', 'body']);
    }
    addStringMap(issues, tokens.radius, '/tokens/radius', ['sm', 'md', 'lg']);
    addStringMap(issues, tokens.shadow, '/tokens/shadow', ['sm', 'md']);
    validateAssets(issues, child(value.emit, 'assets'));
    validateTweaks(issues, value.tweaks);
    return issues;
}
export function assertBrandOsSchema(value) {
    const issues = validateBrandOsSchema(value);
    if (issues.length > 0)
        throw new SchemaValidationError(issues);
    return value;
}
