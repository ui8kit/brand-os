import { BrandIllustration, BrandMark, BrandOsSchema } from '../types.js';

function buildPrimaryMark(schema: BrandOsSchema): BrandMark {
  return {
    intent: `Primary lockup for ${schema.meta.name} across hero, navigation, and export surfaces.`,
    geometry: {
      minSize: 24,
      clearSpace: '0.5x mark height',
      safePlacements: ['on-light', 'on-dark', 'on-accent'],
    },
    tokens: {
      fill: 'primary',
      stroke: 'border',
    },
    assetSlot: 'brand-marks/primary.svg',
  };
}

export function buildDefaultBrandMarks(schema: BrandOsSchema): NonNullable<BrandOsSchema['brandMarks']> {
  const primary = schema.brandMarks?.primary ?? buildPrimaryMark(schema);

  return {
    primary,
    monochrome: schema.brandMarks?.monochrome ?? {
      ...primary,
      intent: `Single-color mark for monochrome surfaces in ${schema.meta.name}.`,
      tokens: {
        fill: 'foreground',
      },
      assetSlot: 'brand-marks/monochrome.svg',
    },
    emblem: schema.brandMarks?.emblem ?? {
      ...primary,
      intent: `Compact emblem for badges, favicons, and social avatars in ${schema.meta.name}.`,
      geometry: {
        ...primary.geometry,
        minSize: 16,
      },
      assetSlot: 'brand-marks/emblem.svg',
    },
    wordmark: schema.brandMarks?.wordmark ?? {
      ...primary,
      intent: `Wordmark lockup for editorial and presentation surfaces in ${schema.meta.name}.`,
      assetSlot: 'brand-marks/wordmark.svg',
    },
    favicon: schema.brandMarks?.favicon ?? {
      ...primary,
      intent: `Micro-mark for browser tabs and app launchers in ${schema.meta.name}.`,
      geometry: {
        ...primary.geometry,
        minSize: 16,
        clearSpace: '0.25x mark height',
        safePlacements: ['on-light', 'on-dark'],
      },
      assetSlot: 'brand-marks/favicon.svg',
    },
  };
}

export function resolveBrandMarks(schema: BrandOsSchema): NonNullable<BrandOsSchema['brandMarks']> {
  return {
    ...buildDefaultBrandMarks(schema),
    ...(schema.brandMarks ?? {}),
  };
}

export function buildDefaultIllustration(schema: BrandOsSchema): BrandIllustration {
  return {
    style: schema.designGrammar?.imageTreatment?.style ?? schema.designGrammar?.styleDirection ?? 'editorial',
    motifs: schema.designGrammar?.imageTreatment?.preferred?.slice(0, 3) ?? ['brand silhouette', 'signature framing'],
    palette: ['primary', 'accent', 'muted'],
    forbidden: schema.designGrammar?.imageTreatment?.avoid ?? ['generic stock gradients', 'AI-slop people'],
    surfaces: ['hero', 'social-poster', 'presentation'],
  };
}

export function resolveIllustration(schema: BrandOsSchema): BrandIllustration {
  return {
    ...buildDefaultIllustration(schema),
    ...(schema.illustration ?? {}),
  };
}
