import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../lib/index.js', import.meta.url));
function contract() {
  return {
    schemaVersion: '1.0.0', meta: { name: 'Fixture', slug: 'fixture', description: 'A deterministic test contract.' },
    brandThesis: { summary: 'A deterministic test contract.', positioning: 'Test fixture.', antiPersonality: ['undefined'] },
    tokens: {
      color: { light: { background: '#fff', foreground: '#111', card: '#fff', primary: '#222', primaryForeground: '#fff', accent: '#444', border: '#ddd', destructive: '#a00' }, dark: {} },
      typography: { families: { display: 'Fixture Display', body: 'Fixture Body' } },
      radius: { sm: '2px', md: '4px', lg: '8px' }, shadow: { sm: 'none', md: 'none' },
    },
    designGrammar: { shapeLanguage: { core: 'Declared geometry.' }, imageTreatment: { avoid: ['undefined imagery'] } },
    componentPolicy: { avoid: ['undefined composition'] },
    brandMarks: { primary: { intent: 'fixture', geometry: { minSize: 16, clearSpace: '1x', safePlacements: ['on-light'] } } },
    recipes: { pageArchetypes: { proof: { purpose: 'Proof surface.', requiredSections: ['content'] } } },
  };
}
function run(cwd, ...args) { return spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' }); }

test('validate → emit → verify is machine-readable and tamper-evident', () => {
  const root = mkdtempSync(join(tmpdir(), 'brand-os-test-'));
  try {
    const schema = join(root, 'contract.json'); const bundle = join(root, 'bundle');
    writeFileSync(schema, `${JSON.stringify(contract(), null, 2)}\n`);
    const validation = run(root, 'validate', '--schema', schema, '--json');
    assert.equal(validation.status, 0, validation.stderr); assert.equal(JSON.parse(validation.stdout).ok, true);
    const emitted = run(root, 'emit', '--schema', schema, '--output', bundle, '--json');
    assert.equal(emitted.status, 0, emitted.stderr); assert.equal(JSON.parse(emitted.stdout).manifest.manifestVersion, '1.0.0');
    const overwrite = run(root, 'emit', '--schema', schema, '--output', bundle, '--json');
    assert.equal(overwrite.status, 3); assert.equal(JSON.parse(overwrite.stdout).code, 'runtime_error');
    const verified = run(root, 'verify', '--schema', schema, '--bundle', bundle, '--strict', '--json');
    assert.equal(verified.status, 0, verified.stderr);
    const designPath = join(bundle, 'DESIGN.md'); writeFileSync(designPath, `${readFileSync(designPath, 'utf8')}tampered\n`);
    const tampered = run(root, 'verify', '--schema', schema, '--bundle', bundle, '--json');
    assert.equal(tampered.status, 1); assert.ok(JSON.parse(tampered.stdout).issues.some((issue) => issue.code === 'checksum_mismatch'));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('invalid contracts use exit 1 and a stable JSON error envelope', () => {
  const root = mkdtempSync(join(tmpdir(), 'brand-os-invalid-'));
  try {
    const schema = join(root, 'invalid.json'); writeFileSync(schema, '{}\n');
    const result = run(root, 'validate', '--schema', schema, '--json');
    assert.equal(result.status, 1); assert.equal(JSON.parse(result.stdout).code, 'invalid_contract');
  } finally { rmSync(root, { recursive: true, force: true }); }
});
