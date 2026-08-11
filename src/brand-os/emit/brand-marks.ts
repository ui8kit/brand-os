import { join } from 'node:path';
import { BrandOsSchema } from '../types.js';
import { ensureDir, writeTextFile } from '../utils.js';

function buildReadme(schema: BrandOsSchema): string {
  return [
    `# ${schema.meta.name} Brand Marks`,
    '',
    'This directory defines mark slots and geometric rules for brand recognition across web, presentation, print, and social surfaces.',
    '',
    '## How to use',
    '1. Keep `marks.json` as the machine-readable contract for mark roles and constraints.',
    '2. Add SVG or PNG assets into the referenced `assetSlot` paths when the visual assets are ready.',
    '3. Preserve clear space, minimum size, and safe placement rules on every host surface.',
    '',
  ].join('\n');
}

export function emitBrandMarks(outputDir: string, schema: BrandOsSchema): string[] {
  const brandMarksDir = join(outputDir, 'brand-marks');
  const marks = schema.brandMarks ?? {};

  ensureDir(brandMarksDir);
  writeTextFile(join(brandMarksDir, 'marks.json'), `${JSON.stringify(marks, null, 2)}\n`);
  writeTextFile(join(brandMarksDir, 'README.md'), buildReadme(schema));

  return ['brand-marks/marks.json', 'brand-marks/README.md'];
}
