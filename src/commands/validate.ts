import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ValidateCliArgs } from '../cli/parse-args.js';
import { assertBrandOsSchema } from '../brand-os/schema.js';
import { readJsonValue, resolveBrandOsPaths } from '../brand-os/utils.js';
import { validateThemeContrast } from '../brand-os/validators/contrast.js';
import { validateSlopHeuristics } from '../brand-os/validators/slop.js';
import { verifyDesignMd } from '../brand-os/verify.js';

export async function runValidate(args: ValidateCliArgs): Promise<number> {
  const schemaPath = resolve(args.schema);
  if (!existsSync(schemaPath)) throw new Error(`Schema not found: ${schemaPath}`);
  const schema = assertBrandOsSchema(readJsonValue(schemaPath));
  const contrastWarnings = validateThemeContrast(schema);
  const qualitySignals = validateSlopHeuristics(schema);
  const paths = resolveBrandOsPaths(schemaPath, schema, { emitDir: args.emitDir });
  const designMdPath = args.designMd ? resolve(args.designMd) : join(paths.emitDir, 'DESIGN.md');
  const designIssues = existsSync(designMdPath) ? verifyDesignMd(readFileSync(designMdPath, 'utf8')) : [];
  const hasWarnings = contrastWarnings.length > 0 || qualitySignals.length > 0 || designIssues.length > 0;
  const ok = !args.strict || !hasWarnings;
  const result = { ok, command: 'validate', apiVersion: '1', schemaVersion: schema.schemaVersion, schema: schemaPath, contrastWarnings, qualitySignals, designIssues };
  if (args.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`brand-os validate: ${ok ? 'OK' : 'FAIL'}`);
    console.log(`  schema: ${schemaPath}`);
    console.log(`  hard errors: 0`);
    console.log(`  warnings: ${contrastWarnings.length + qualitySignals.length + designIssues.length}`);
    for (const warning of contrastWarnings) console.log(`  [warning] contrast: ${warning}`);
    for (const finding of qualitySignals) console.log(`  [warning] ${finding.code} ${finding.path}: ${finding.message}`);
    for (const issue of designIssues) console.log(`  [warning] ${issue.code} ${issue.path}: ${issue.message}`);
  }
  return ok ? 0 : 1;
}

export function printValidateUsage(): string {
  return ['Usage:', '  brand-os validate --schema <contract.json> [--strict] [--json]', '', 'Validate the input contract. Taste signals are advisory and contain no font/color blacklist.'].join('\n');
}
