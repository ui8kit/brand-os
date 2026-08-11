#!/usr/bin/env node
import { parseArgs } from './cli/parse-args.js';
import { printBrandOsUsage, runBrandOs } from './commands/brand-os.js';
import { printValidateUsage, runValidate } from './commands/validate.js';
import { printVerifyUsage, runVerify } from './commands/verify.js';
import { SchemaValidationError } from './brand-os/schema.js';
import { CLI_VERSION } from './version.js';

function usage(): string {
  return [`brand-os ${CLI_VERSION}`, '', 'Deterministic brand contract compiler and verifier.', '', 'Commands:', '  emit      compile a contract into a checksummed bundle', '  validate  validate the input contract and advisory quality signals', '  verify    verify an emitted bundle against its contract', '', 'Run brand-os <command> --help for command options.'].join('\n');
}

async function main(): Promise<number> {
  const wantsJson = process.argv.includes('--json');
  let args;
  try { args = parseArgs(process.argv.slice(2)); }
  catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid arguments.';
    if (wantsJson) console.log(JSON.stringify({ ok: false, apiVersion: '1', code: 'usage_error', message }, null, 2));
    else console.error(`brand-os: ${message}\n\n${usage()}`);
    return 2;
  }
  if (args.mode === 'help') { console.log(usage()); return 0; }
  if (args.mode === 'version') { console.log(args.json ? JSON.stringify({ ok: true, name: 'brand-os', version: CLI_VERSION }) : CLI_VERSION); return 0; }
  if (args.help) {
    console.log(args.mode === 'brand-os' ? printBrandOsUsage() : args.mode === 'validate' ? printValidateUsage() : printVerifyUsage());
    return 0;
  }
  try {
    if (args.mode === 'brand-os') return await runBrandOs(args);
    if (args.mode === 'validate') return await runValidate(args);
    return await runVerify(args);
  } catch (error) {
    if (error instanceof SchemaValidationError) {
      const body = { ok: false, apiVersion: '1', code: 'invalid_contract', message: error.message, issues: error.issues };
      if (args.json) console.log(JSON.stringify(body, null, 2));
      else { console.error(`brand-os: ${error.message}`); for (const issue of error.issues) console.error(`  [error] ${issue.code} ${issue.path}: ${issue.message}`); }
      return 1;
    }
    const message = error instanceof Error ? error.message : 'Unexpected error.';
    if (args.json) console.log(JSON.stringify({ ok: false, apiVersion: '1', code: 'runtime_error', message }, null, 2));
    else console.error(`brand-os: ${message}`);
    return 3;
  }
}

main().then((code) => { process.exitCode = code; }).catch((error) => { console.error(error instanceof Error ? error.message : 'Unexpected error.'); process.exitCode = 3; });
