import { BrandOsSchema } from '../types.js';

export interface SlopFinding {
  level: 'error' | 'warning';
  code: string;
  message: string;
}

const SLOP_FONT_RE = /\b(inter|roboto|arial|helvetica)\b/i;
const INDIGO_VIOLET_HUE_RE = /hsl\(\s*(2[4-6]\d|270|280|290)\b/i;

function fontStack(value: string | undefined): string {
  return (value ?? '').trim();
}

/**
 * Heuristic anti-slop checks for brand schemas.
 * Aligns with .project/.research/02-ai-design-slop-and-taste.md
 */
export function validateSlopHeuristics(
  schema: BrandOsSchema,
  options: { allowSlop?: boolean } = {},
): SlopFinding[] {
  const findings: SlopFinding[] = [];
  const allowSlop = Boolean(options.allowSlop);
  const families = schema.tokens.typography.families;
  const display = fontStack(families.display);
  const body = fontStack(families.body);
  const ui = fontStack(families.ui);

  const stacks = [display, body, ui].filter(Boolean);
  const slopFonts = stacks.filter((s) => SLOP_FONT_RE.test(s));
  if (slopFonts.length > 0) {
    findings.push({
      level: allowSlop ? 'warning' : 'error',
      code: 'slop-font',
      message: `Generic font stack(s) detected (${slopFonts.join('; ')}). Prefer a distinctive display + readable body pairing.`,
    });
  }

  if (display && body && display.toLowerCase() === body.toLowerCase() && SLOP_FONT_RE.test(display)) {
    findings.push({
      level: allowSlop ? 'warning' : 'error',
      code: 'slop-mono-font',
      message: 'Display and body share the same generic sans. Brands need recognisability beyond a single Inter-like face.',
    });
  }

  const primary = schema.tokens.color.light.primary ?? '';
  const accent = schema.tokens.color.light.accent ?? '';
  if (INDIGO_VIOLET_HUE_RE.test(primary) || INDIGO_VIOLET_HUE_RE.test(accent)) {
    findings.push({
      level: allowSlop ? 'warning' : 'error',
      code: 'slop-violet-indigo',
      message:
        'Primary/accent sits in the indigo–violet band commonly associated with AI design defaults. Pick a brand-led hue or pass --allow-slop.',
    });
  }

  const anti = schema.brandThesis?.antiPersonality ?? [];
  if (anti.length < 2) {
    findings.push({
      level: 'warning',
      code: 'missing-anti-personality',
      message: 'brandThesis.antiPersonality should list ≥2 traits the brand is NOT (kills AI average).',
    });
  }

  const forbidden = schema.illustration?.forbidden ?? [];
  const avoidComponents = schema.componentPolicy?.avoid ?? [];
  if (forbidden.length === 0 && avoidComponents.length === 0) {
    findings.push({
      level: 'warning',
      code: 'missing-forbidden',
      message: 'Add illustration.forbidden and/or componentPolicy.avoid so agents know what not to invent.',
    });
  }

  if (!schema.brandMarks?.primary && !schema.brandMarks?.wordmark) {
    findings.push({
      level: 'warning',
      code: 'missing-brand-marks',
      message: 'Define brandMarks (primary/wordmark). A brand recognisable only by color is incomplete.',
    });
  }

  const summary = schema.brandThesis?.summary ?? '';
  if (!summary || summary.length < 12) {
    findings.push({
      level: 'warning',
      code: 'thin-thesis',
      message: 'brandThesis.summary is thin or missing. Agents need a PURPOSE sentence, not only tokens.',
    });
  }

  return findings;
}

export function formatSlopFindings(findings: SlopFinding[]): string[] {
  return findings.map((f) => `[${f.level}] ${f.code}: ${f.message}`);
}
