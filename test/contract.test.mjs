import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateBrandOsSchema } from '../lib/brand-os/schema.js';

function contract() {
  return {
    schemaVersion: '1.0.0', meta: { name: 'Fixture', slug: 'fixture' },
    tokens: {
      color: { light: { background: '#fff', foreground: '#111', card: '#fff', primary: '#222', primaryForeground: '#fff', accent: '#444', border: '#ddd', destructive: '#a00' }, dark: {} },
      typography: { families: { display: 'Fixture Display', body: 'Fixture Body' } },
      radius: { sm: '2px', md: '4px', lg: '8px' }, shadow: { sm: 'none', md: 'none' },
    },
  };
}

test('accepts the versioned minimal contract', () => assert.deepEqual(validateBrandOsSchema(contract()), []));
test('rejects a missing schema version with a JSON pointer', () => {
  const value = contract(); delete value.schemaVersion;
  assert.equal(validateBrandOsSchema(value)[0].path, '/schemaVersion');
});
test('rejects asset path traversal', () => {
  const value = contract(); value.emit = { assets: [{ source: 'asset.svg', output: '../escape.svg' }] };
  assert.ok(validateBrandOsSchema(value).some((issue) => issue.code === 'unsafe_path'));
});
