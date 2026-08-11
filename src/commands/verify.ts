import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { VerifyCliArgs } from '../cli/parse-args.js';
import { assertBrandOsSchema } from '../brand-os/schema.js';
import { readJsonValue, resolveBrandOsPaths } from '../brand-os/utils.js';
import { verifyBundle } from '../brand-os/verify.js';

export async function runVerify(args: VerifyCliArgs): Promise<number> {
  const schemaPath = resolve(args.schema);
  if (!existsSync(schemaPath)) throw new Error(`Schema not found: ${schemaPath}`);
  const schema = assertBrandOsSchema(readJsonValue(schemaPath));
  const paths = resolveBrandOsPaths(schemaPath, schema, { emitDir: args.emitDir });
  if (!existsSync(paths.emitDir)) throw new Error(`Bundle not found: ${paths.emitDir}`);
  const verification = verifyBundle(schema, paths.emitDir, args.strict);
  const result = { ok: verification.ok, command: 'verify', apiVersion: '1', schemaVersion: schema.schemaVersion, bundle: paths.emitDir, issues: verification.issues };
  if (args.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`brand-os verify: ${verification.ok ? 'OK' : 'FAIL'}`);
    console.log(`  bundle: ${paths.emitDir}`);
    for (const issue of verification.issues) console.log(`  [error] ${issue.code} ${issue.path}: ${issue.message}`);
  }
  return verification.ok ? 0 : 1;
}

export function printVerifyUsage(): string {
  return ['Usage:', '  brand-os verify --schema <contract.json> --bundle <dir> [--strict] [--json]', '', 'Verify bundle provenance, checksums, declared files, and DESIGN.md structure.'].join('\n');
}
