function clampByte(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
function normalizeHue(value) {
    const wrapped = value % 360;
    return wrapped < 0 ? wrapped + 360 : wrapped;
}
function hueToRgb(p, q, t) {
    let channel = t;
    if (channel < 0)
        channel += 1;
    if (channel > 1)
        channel -= 1;
    if (channel < 1 / 6)
        return p + (q - p) * 6 * channel;
    if (channel < 1 / 2)
        return q;
    if (channel < 2 / 3)
        return p + (q - p) * (2 / 3 - channel) * 6;
    return p;
}
function hslToRgb(h, s, l) {
    const hue = normalizeHue(h) / 360;
    const saturation = Math.max(0, Math.min(1, s));
    const lightness = Math.max(0, Math.min(1, l));
    if (saturation === 0) {
        const value = clampByte(lightness * 255);
        return { r: value, g: value, b: value };
    }
    const q = lightness < 0.5
        ? lightness * (1 + saturation)
        : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    return {
        r: clampByte(hueToRgb(p, q, hue + 1 / 3) * 255),
        g: clampByte(hueToRgb(p, q, hue) * 255),
        b: clampByte(hueToRgb(p, q, hue - 1 / 3) * 255),
    };
}
function parseHex(value) {
    const raw = value.trim().replace(/^#/, '');
    if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(raw)) {
        return null;
    }
    const normalized = raw.length === 3
        ? raw.split('').map((segment) => `${segment}${segment}`).join('')
        : raw;
    return {
        r: Number.parseInt(normalized.slice(0, 2), 16),
        g: Number.parseInt(normalized.slice(2, 4), 16),
        b: Number.parseInt(normalized.slice(4, 6), 16),
    };
}
function parseRgb(value) {
    const match = value.trim().match(/^rgba?\(\s*([0-9.]+)(?:\s*,\s*|\s+)([0-9.]+)(?:\s*,\s*|\s+)([0-9.]+)/i);
    if (!match) {
        return null;
    }
    return {
        r: clampByte(Number.parseFloat(match[1])),
        g: clampByte(Number.parseFloat(match[2])),
        b: clampByte(Number.parseFloat(match[3])),
    };
}
function parseHsl(value) {
    const compact = value.trim().replace(/\s*\/\s*[^)]+/, '');
    const match = compact.match(/^(?:hsla?\(\s*)?([0-9.+-]+)(?:deg)?(?:\s+|,\s*)([0-9.+-]+)%?(?:\s+|,\s*)([0-9.+-]+)%?\s*\)?$/i);
    if (!match) {
        return null;
    }
    const hue = Number.parseFloat(match[1]);
    const saturation = Number.parseFloat(match[2]) / 100;
    const lightness = Number.parseFloat(match[3]) / 100;
    if (Number.isNaN(hue) || Number.isNaN(saturation) || Number.isNaN(lightness)) {
        return null;
    }
    return hslToRgb(hue, saturation, lightness);
}
function channelToHex(value) {
    return clampByte(value).toString(16).padStart(2, '0');
}
function toLinear(channel) {
    const normalized = channel / 255;
    return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
}
export function parseColor(value) {
    if (!value) {
        return null;
    }
    return parseHex(value) ?? parseHsl(value) ?? parseRgb(value);
}
export function rgbToHex(color) {
    return `#${channelToHex(color.r)}${channelToHex(color.g)}${channelToHex(color.b)}`;
}
export function normalizeHex(value, fallback = '#000000') {
    const parsed = parseColor(value);
    return parsed ? rgbToHex(parsed) : fallback;
}
export function hslToHex(value, fallback = '#000000') {
    return normalizeHex(value, fallback);
}
export function relativeLuminance(value) {
    const parsed = parseColor(value);
    if (!parsed) {
        return null;
    }
    return 0.2126 * toLinear(parsed.r) + 0.7152 * toLinear(parsed.g) + 0.0722 * toLinear(parsed.b);
}
export function contrastRatio(foreground, background) {
    const foregroundY = relativeLuminance(foreground);
    const backgroundY = relativeLuminance(background);
    if (foregroundY === null || backgroundY === null) {
        return null;
    }
    const lighter = Math.max(foregroundY, backgroundY);
    const darker = Math.min(foregroundY, backgroundY);
    return (lighter + 0.05) / (darker + 0.05);
}
export function pickReadableForeground(background, light = '#ffffff', dark = '#111111') {
    const lightContrast = contrastRatio(light, background) ?? 0;
    const darkContrast = contrastRatio(dark, background) ?? 0;
    return lightContrast >= darkContrast ? light : dark;
}
