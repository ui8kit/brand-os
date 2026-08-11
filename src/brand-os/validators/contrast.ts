import { BrandOsSchema } from '../types.js';
import { resolveThemeColors, resolveThemes, DEFAULT_CONTRAST_BUDGET } from '../defaults/themes.js';
import { contrastRatio } from '../utils/color.js';

function formatRatio(value: number | null): string {
  return value === null ? 'n/a' : `${value.toFixed(2)}:1`;
}

export function validateThemeContrast(schema: BrandOsSchema): string[] {
  const warnings: string[] = [];
  const themes = resolveThemes(schema);

  for (const [themeName, theme] of Object.entries(themes)) {
    const palette = resolveThemeColors(schema, themeName, theme);
    const budget = {
      ...DEFAULT_CONTRAST_BUDGET,
      ...(theme.contrastBudget ?? {}),
    };

    const bodyRatio = contrastRatio(palette.foreground, palette.background);
    if (bodyRatio === null) {
      warnings.push(`Theme "${themeName}" has unparsable body contrast colors.`);
    } else if (bodyRatio < budget.minBodyAA) {
      warnings.push(
        `Theme "${themeName}" body text contrast ${formatRatio(bodyRatio)} is below WCAG 2.2 threshold ${budget.minBodyAA}:1.`,
      );
    }

    const largeRatio = contrastRatio(palette.primaryForeground, palette.primary);
    if (largeRatio === null) {
      warnings.push(`Theme "${themeName}" has unparsable primary contrast colors.`);
    } else if (largeRatio < budget.minLargeAA) {
      warnings.push(
        `Theme "${themeName}" primary-on-primary contrast ${formatRatio(largeRatio)} is below WCAG 2.2 threshold ${budget.minLargeAA}:1.`,
      );
    }

    if (theme.base === 'dark') {
      const headingColor = palette.mutedForeground ?? palette.foreground;
      const headingRatio = contrastRatio(headingColor, palette.background);
      if (headingRatio === null) {
        warnings.push(`Theme "${themeName}" has unparsable dark heading contrast colors.`);
      } else if (headingRatio < budget.minHeadingOnDark) {
        warnings.push(
          `Theme "${themeName}" dark heading contrast ${formatRatio(headingRatio)} is below configured threshold ${budget.minHeadingOnDark}:1.`,
        );
      }
    }
  }

  return warnings;
}
