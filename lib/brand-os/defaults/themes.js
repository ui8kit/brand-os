export const DEFAULT_CONTRAST_BUDGET = {
    minBodyAA: 4.5,
    minLargeAA: 3,
    minHeadingOnDark: 7,
};
function normalizeSemanticAliases(input) {
    const output = { ...input };
    const aliases = {
        'primary-foreground': 'primaryForeground',
        'secondary-foreground': 'secondaryForeground',
        'muted-foreground': 'mutedForeground',
        'accent-foreground': 'accentForeground',
        'destructive-foreground': 'destructiveForeground',
    };
    for (const [alias, canonical] of Object.entries(aliases)) {
        if (!output[canonical] && output[alias])
            output[canonical] = output[alias];
    }
    return output;
}
/** Return explicit contract colors without inventing a palette. */
export function resolveColorModes(schema) {
    return {
        light: normalizeSemanticAliases(schema.tokens.color.light),
        dark: normalizeSemanticAliases(schema.tokens.color.dark ?? {}),
    };
}
function baseTheme(base) {
    return {
        base,
        label: base === 'light' ? 'Light' : 'Dark',
        contrastBudget: { ...DEFAULT_CONTRAST_BUDGET },
    };
}
/** Retained for source compatibility with the retired interactive initializer. */
export function buildDefaultThemes(schema) {
    return resolveThemes(schema);
}
/** Themes are structural wrappers around palettes supplied by the caller. */
export function resolveThemes(schema) {
    const themes = { light: baseTheme('light') };
    if (Object.keys(schema.tokens.color.dark ?? {}).length > 0)
        themes.dark = baseTheme('dark');
    return { ...themes, ...(schema.themes ?? {}) };
}
export function resolveThemeColors(schema, themeName, themeDef) {
    const colors = resolveColorModes(schema);
    const theme = themeDef ?? resolveThemes(schema)[themeName] ?? baseTheme('light');
    const result = { ...(theme.base === 'dark' ? colors.dark : colors.light) };
    for (const [name, value] of Object.entries(theme.overrides ?? {})) {
        if (typeof value === 'string')
            result[name] = value;
    }
    return result;
}
