import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { emitBrandOsArtifacts } from '../brand-os/emitter.js';
import { assertBrandOsSchema } from '../brand-os/schema.js';
import { readJsonValue, resolveBrandOsPaths } from '../brand-os/utils.js';
import { validateThemeContrast } from '../brand-os/validators/contrast.js';
import { validateSlopHeuristics } from '../brand-os/validators/slop.js';
import { CLI_VERSION } from '../version.js';
function normalizeInputName(value) {
    const parts = value.replace(/[^a-zA-Z0-9]+/g, ' ').trim().toLowerCase().split(' ').filter(Boolean);
    return parts.map((part, index) => index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`).join('') || 'value';
}
function buildPromptPack(schema) {
    const surfaces = {};
    for (const [name, recipe] of Object.entries(schema.recipes?.pageArchetypes ?? {})) {
        const requiredSections = recipe.requiredSections ?? [];
        surfaces[name] = {
            goal: recipe.purpose ?? `Apply the declared contract to the ${name} surface.`,
            requiredInputs: requiredSections.map(normalizeInputName),
            sectionExpectations: requiredSections,
            promptTemplate: [
                `Apply contract.json to the ${name} surface.`,
                'Do not invent facts or constraints that are absent from the input contract.',
            ],
        };
    }
    return {
        sharedContext: {
            brandSummary: schema.brandThesis?.summary ?? schema.meta.description ?? schema.meta.name,
            styleKeywords: schema.brandThesis?.personality ?? [],
            negativeStyleKeywords: schema.brandThesis?.antiPersonality ?? [],
            crossSurfaceRules: [
                schema.designGrammar?.surfaceLanguage?.base,
                schema.designGrammar?.surfaceLanguage?.accentRule,
                schema.designGrammar?.surfaceLanguage?.contrastRule,
            ].filter((value) => Boolean(value)),
        },
        surfaces,
    };
}
export async function runBrandOs(args) {
    const schemaPath = resolve(args.schema);
    if (!existsSync(schemaPath))
        throw new Error(`Schema not found: ${schemaPath}`);
    const schema = assertBrandOsSchema(readJsonValue(schemaPath));
    const paths = resolveBrandOsPaths(schemaPath, schema, { emitDir: args.emitDir });
    const contrastWarnings = validateThemeContrast(schema);
    const qualitySignals = validateSlopHeuristics(schema);
    if (args.strict && (contrastWarnings.length > 0 || qualitySignals.length > 0)) {
        const result = {
            ok: false,
            command: 'emit',
            apiVersion: '1',
            code: 'strict_validation_failed',
            schema: schemaPath,
            contrastWarnings,
            qualitySignals,
        };
        if (args.json)
            console.log(JSON.stringify(result, null, 2));
        else {
            console.error('Emit blocked by --strict. Run validate for detailed diagnostics.');
            for (const warning of contrastWarnings)
                console.error(`  [warning] ${warning}`);
            for (const finding of qualitySignals)
                console.error(`  [warning] ${finding.code} ${finding.path}: ${finding.message}`);
        }
        return 1;
    }
    const emitted = emitBrandOsArtifacts(paths, schema, buildPromptPack(schema), {
        force: args.force,
        generatorVersion: CLI_VERSION,
    });
    const result = {
        ok: true,
        command: 'emit',
        apiVersion: '1',
        schemaVersion: schema.schemaVersion,
        outputDir: emitted.outputDir,
        manifest: emitted.manifest,
        qualitySignals,
    };
    if (args.json)
        console.log(JSON.stringify(result, null, 2));
    else {
        console.log(`brand-os emit: ${emitted.outputDir}`);
        console.log(`  files: ${emitted.manifest.files.length + 1}`);
        console.log(`  schema: ${schema.schemaVersion}`);
        console.log(`  warnings: ${emitted.warnings.length + qualitySignals.length}`);
    }
    return 0;
}
export function printBrandOsUsage() {
    return [
        'Usage:',
        '  brand-os emit --schema <contract.json> [--output <dir>] [--force] [--strict] [--json]',
        '',
        'Compile a validated brand contract into a deterministic, checksummed bundle.',
        '',
        'Options:',
        '  --schema, --input <path>  input contract (required)',
        '  --output, --emit-dir <dir> output bundle directory',
        '  --force                   atomically replace a non-empty output directory',
        '  --strict                  block emit on any advisory quality or contrast warning',
        '  --json                    emit one machine-readable JSON response',
        '  -h, --help                show this help',
    ].join('\n');
}
