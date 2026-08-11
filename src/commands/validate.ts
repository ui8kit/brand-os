import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ValidateCliArgs } from '../cli/parse-args.js';
import { BrandOsSchema } from '../brand-os/types.js';
import { readJsonFile, resolveBrandOsPaths } from '../brand-os/utils.js';
import { validateThemeContrast } from '../brand-os/validators/contrast.js';
import { formatSlopFindings, validateSlopHeuristics } from '../brand-os/validators/slop.js';

function runGoogleDesignMdLint(designMdPath: string): { ok: boolean; output: string } {
  const result = spawnSync(
    'npx',
    ['-y', '-p', '@google/design.md', 'designmd', 'lint', designMdPath],
    {
      encoding: 'utf8',
      shell: true,
      timeout: 120_000,
    },
  );

  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`.trim();
  return {
    ok: result.status === 0,
    output: output || `(exit ${result.status ?? 'unknown'})`,
  };
}

export async function runValidate(args: ValidateCliArgs): Promise<number> {
  const schemaPath = resolve(args.schema);
  if (!existsSync(schemaPath)) {
    throw new Error(`Schema not found: ${schemaPath}`);
  }

  const schema = readJsonFile<BrandOsSchema>(schemaPath);
  const contrastWarnings = validateThemeContrast(schema);
  const slopFindings = validateSlopHeuristics(schema, { allowSlop: args.allowSlop });

  let designMdPath = args.designMd ? resolve(args.designMd) : undefined;
  if (!designMdPath) {
    const paths = resolveBrandOsPaths(schemaPath, schema, { emitDir: args.emitDir });
    const candidate = join(paths.emitDir, 'DESIGN.md');
    if (existsSync(candidate)) {
      designMdPath = candidate;
    }
  }

  console.log(`\nbrand-os validate`);
  console.log(`  schema: ${schemaPath}`);
  if (designMdPath) {
    console.log(`  DESIGN.md: ${designMdPath}`);
  } else {
    console.log(`  DESIGN.md: (not found — emit first, or pass --design-md)`);
  }

  console.log('\nContrast');
  if (contrastWarnings.length === 0) {
    console.log('  ok');
  } else {
    for (const w of contrastWarnings) {
      console.log(`  [warning] ${w}`);
    }
  }

  console.log('\nAnti-slop heuristics');
  if (slopFindings.length === 0) {
    console.log('  ok');
  } else {
    for (const line of formatSlopFindings(slopFindings)) {
      console.log(`  ${line}`);
    }
  }

  let googleOk = true;
  if (!args.skipGoogleLint && designMdPath) {
    console.log('\nGoogle DESIGN.md lint');
    const lint = runGoogleDesignMdLint(designMdPath);
    googleOk = lint.ok;
    console.log(lint.ok ? '  ok' : `  failed\n${lint.output.split('\n').map((l) => `  ${l}`).join('\n')}`);
  } else if (args.skipGoogleLint) {
    console.log('\nGoogle DESIGN.md lint: skipped (--skip-google-lint)');
  } else {
    console.log('\nGoogle DESIGN.md lint: skipped (no DESIGN.md)');
  }

  const hasSlopError = slopFindings.some((f) => f.level === 'error');
  const hasWarning =
    contrastWarnings.length > 0 || slopFindings.some((f) => f.level === 'warning') || !googleOk;

  if (hasSlopError) {
    console.log('\nResult: FAIL (slop errors). Use --allow-slop only if intentional.\n');
    return 1;
  }

  if (args.strict && hasWarning) {
    console.log('\nResult: FAIL (--strict with warnings).\n');
    return 1;
  }

  if (!googleOk && args.strict) {
    console.log('\nResult: FAIL (DESIGN.md lint).\n');
    return 1;
  }

  console.log(hasWarning ? '\nResult: OK with warnings\n' : '\nResult: OK\n');
  return hasWarning && args.strict ? 1 : 0;
}

export function printValidateUsage(): string {
  return [
    'Usage:',
    '  npx brand-os validate --schema <schema-path> [options]',
    '',
    'Validate brand taste + contrast, and optionally lint DESIGN.md with @google/design.md.',
    '',
    'Options:',
    '  --schema <path>         brand OS schema (required)',
    '  --design-md <path>      DESIGN.md to lint (default: <emit-dir>/DESIGN.md if present)',
    '  --emit-dir <path>       emit directory used to resolve DESIGN.md',
    '  --strict                exit 1 on any warning or lint failure',
    '  --allow-slop            downgrade indigo/violet + generic-font findings to warnings',
    '  --skip-google-lint      skip npx @google/design.md lint',
    '  -h, --help              show help',
    '',
    'Examples:',
    '  npx brand-os validate --schema .project/my-brand/my-brand.schema.json',
    '  npx brand-os validate --schema .project/my-brand/my-brand.schema.json --strict',
    '  npx brand-os emit --schema .project/my-brand/my-brand.schema.json --bootstrap',
    '  npx brand-os validate --schema .project/my-brand/my-brand.schema.json --design-md .project/my-brand/my-brand-generated/DESIGN.md',
  ].join('\n');
}
