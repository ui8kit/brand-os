import { BrandOsSchema, BrandTweaks, TweakAxis, TweakAxisDef } from '../types.js';
import { resolveColorModes, resolveThemeColors, resolveThemes } from './themes.js';

// Convert camelCase or PascalCase token keys to kebab-case CSS variable names.
// Industry convention: --primary-foreground (kebab) wins over --primaryForeground.
function toKebabVar(key: string): string {
  if (key.includes('-')) {
    return `--${key}`;
  }
  return `--${key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
}

function mapVars(record: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    out[toKebabVar(key)] = value;
  }
  return out;
}

function mergeAxis(base: TweakAxisDef, override?: TweakAxisDef): TweakAxisDef {
  return {
    label: override?.label ?? base.label,
    options: {
      ...base.options,
      ...(override?.options ?? {}),
    },
  };
}

function resolveSpacing(schema: BrandOsSchema): Record<string, string> {
  return {
    section: schema.tokens.spacing?.sectionRhythm?.default ?? schema.tokens.spacing?.scale?.lg ?? '2rem',
    stack: schema.tokens.spacing?.scale?.md ?? '1rem',
    card: schema.tokens.spacing?.scale?.md ?? '1rem',
    control: schema.tokens.spacing?.scale?.sm ?? '0.75rem',
  };
}

function resolveRadius(schema: BrandOsSchema): Record<string, string> {
  return {
    sm: schema.tokens.radius.sm ?? '0.25rem',
    md: schema.tokens.radius.md ?? schema.tokens.radius.sm ?? '0.5rem',
    lg: schema.tokens.radius.lg ?? schema.tokens.radius.md ?? '0.75rem',
    xl: schema.tokens.radius.xl ?? schema.tokens.radius.lg ?? '1rem',
  };
}

function resolveShadows(schema: BrandOsSchema): Record<string, string> {
  return {
    sm: schema.tokens.shadow.sm ?? '0 1px 2px rgba(0,0,0,0.05)',
    md: schema.tokens.shadow.md ?? schema.tokens.shadow.sm ?? '0 2px 8px rgba(0,0,0,0.08)',
    lg: schema.tokens.shadow.lg ?? schema.tokens.shadow.md ?? '0 10px 28px rgba(0,0,0,0.14)',
  };
}

function resolveTypographyScale(schema: BrandOsSchema): Record<string, string> {
  const sizes = schema.tokens.typography.sizes ?? {};
  return {
    display: sizes['display-lg'] ?? sizes.display ?? '3rem',
    heading: sizes['heading-lg'] ?? sizes.h1 ?? '2rem',
    body: sizes['body-md'] ?? sizes.base ?? '1rem',
    label: sizes['label-md'] ?? sizes.sm ?? '0.875rem',
  };
}

export function buildDefaultTweaks(schema: BrandOsSchema): BrandTweaks {
  const colors = resolveColorModes(schema);
  const spacing = resolveSpacing(schema);
  const radius = resolveRadius(schema);
  const shadows = resolveShadows(schema);
  const typeScale = resolveTypographyScale(schema);
  const themes = resolveThemes(schema);

  const signalColor = schema.tokens.color.categories?.signal?.light
    ?? schema.tokens.color.charts?.signal
    ?? colors.light.destructive;
  const signalForeground = colors.light.destructiveForeground;

  return {
    defaults: {
      theme: 'light',
      accent: 'primary',
      density: 'comfortable',
      radius: 'soft',
      depth: 'subtle',
      motion: 'full',
      typeScale: 'default',
      surfaceTexture: 'clean',
    },
    axes: {
      theme: {
        label: 'Theme',
        options: Object.fromEntries(
          Object.entries(themes).map(([name, definition]) => [
            name,
            {
              label: definition.label ?? name,
              vars: mapVars(resolveThemeColors(schema, name, definition)),
            },
          ]),
        ),
      },
      accent: {
        label: 'Accent',
        options: {
          primary: {
            label: 'Primary',
            vars: {
              '--accent': colors.light.primary,
              '--accent-foreground': colors.light.primaryForeground,
              '--brand-accent-current': 'var(--primary)',
            },
          },
          accent: {
            label: 'Accent',
            vars: {
              '--accent': colors.light.accent,
              '--accent-foreground': colors.light.accentForeground,
              '--brand-accent-current': 'var(--accent)',
            },
          },
          muted: {
            label: 'Muted',
            vars: {
              '--accent': colors.light.muted,
              '--accent-foreground': colors.light.mutedForeground,
              '--brand-accent-current': 'var(--muted)',
            },
          },
          signal: {
            label: 'Signal',
            vars: {
              '--accent': signalColor,
              '--accent-foreground': signalForeground,
              '--brand-accent-current': signalColor,
            },
          },
        },
      },
      density: {
        label: 'Density',
        options: {
          comfortable: {
            label: 'Comfortable',
            vars: {
              '--density-section-padding': spacing.section,
              '--density-stack-gap': spacing.stack,
              '--density-card-padding': spacing.card,
              '--density-control-height': '2.75rem',
            },
          },
          compact: {
            label: 'Compact',
            vars: {
              '--density-section-padding': '1.5rem',
              '--density-stack-gap': '0.75rem',
              '--density-card-padding': '0.75rem',
              '--density-control-height': '2.375rem',
            },
          },
          cozy: {
            label: 'Cozy',
            vars: {
              '--density-section-padding': '2.5rem',
              '--density-stack-gap': '1.25rem',
              '--density-card-padding': '1.25rem',
              '--density-control-height': '3rem',
            },
          },
        },
      },
      radius: {
        label: 'Radius',
        options: {
          sharp: {
            label: 'Sharp',
            vars: {
              '--radius-sm': '0',
              '--radius-md': '0.125rem',
              '--radius-lg': '0.25rem',
              '--radius-xl': '0.5rem',
              '--radius': '0.125rem',
            },
          },
          soft: {
            label: 'Soft',
            vars: {
              '--radius-sm': radius.sm,
              '--radius-md': radius.md,
              '--radius-lg': radius.lg,
              '--radius-xl': radius.xl,
              '--radius': radius.md,
            },
          },
          pill: {
            label: 'Pill',
            vars: {
              '--radius-sm': '9999px',
              '--radius-md': '9999px',
              '--radius-lg': '9999px',
              '--radius-xl': '9999px',
              '--radius': '9999px',
            },
          },
        },
      },
      depth: {
        label: 'Depth',
        options: {
          flat: {
            label: 'Flat',
            vars: {
              '--shadow-sm': 'none',
              '--shadow-md': 'none',
              '--shadow-lg': 'none',
            },
          },
          subtle: {
            label: 'Subtle',
            vars: {
              '--shadow-sm': shadows.sm,
              '--shadow-md': shadows.md,
              '--shadow-lg': shadows.lg,
            },
          },
          lifted: {
            label: 'Lifted',
            vars: {
              '--shadow-sm': shadows.md,
              '--shadow-md': shadows.lg,
              '--shadow-lg': '0 18px 48px rgba(0,0,0,0.18)',
            },
          },
        },
      },
      motion: {
        label: 'Motion',
        options: {
          full: {
            label: 'Full',
            vars: {
              '--motion-duration-fast': schema.tokens.motion?.durations?.fast ?? '120ms',
              '--motion-duration-normal': schema.tokens.motion?.durations?.normal ?? '180ms',
              '--motion-duration-slow': schema.tokens.motion?.durations?.slow ?? '260ms',
            },
          },
          reduced: {
            label: 'Reduced',
            vars: {
              '--motion-duration-fast': '80ms',
              '--motion-duration-normal': '120ms',
              '--motion-duration-slow': '160ms',
            },
          },
          none: {
            label: 'None',
            vars: {
              '--motion-duration-fast': '0ms',
              '--motion-duration-normal': '0ms',
              '--motion-duration-slow': '0ms',
            },
          },
        },
      },
      typeScale: {
        label: 'Type Scale',
        options: {
          compact: {
            label: 'Compact',
            vars: {
              '--type-scale-ratio': '1.125',
              '--font-display-size': '2.5rem',
              '--font-heading-size': '1.75rem',
              '--font-body-size': '0.9375rem',
              '--font-label-size': '0.8125rem',
            },
          },
          default: {
            label: 'Default',
            vars: {
              '--type-scale-ratio': '1.2',
              '--font-display-size': typeScale.display,
              '--font-heading-size': typeScale.heading,
              '--font-body-size': typeScale.body,
              '--font-label-size': typeScale.label,
            },
          },
          editorial: {
            label: 'Editorial',
            vars: {
              '--type-scale-ratio': '1.333',
              '--font-display-size': '4rem',
              '--font-heading-size': '2.5rem',
              '--font-body-size': '1.0625rem',
              '--font-label-size': '0.875rem',
            },
          },
        },
      },
      surfaceTexture: {
        label: 'Surface Texture',
        options: {
          clean: {
            label: 'Clean',
            vars: {
              '--surface-overlay': 'none',
              '--surface-noise-opacity': '0',
              '--surface-tint-opacity': '0',
            },
          },
          tinted: {
            label: 'Tinted',
            vars: {
              '--surface-overlay': 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, transparent), transparent)',
              '--surface-noise-opacity': '0',
              '--surface-tint-opacity': '0.08',
            },
          },
          grain: {
            label: 'Grain',
            vars: {
              '--surface-overlay': 'radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)',
              '--surface-noise-opacity': '0.08',
              '--surface-tint-opacity': '0.04',
            },
          },
        },
      },
    },
  };
}

export function resolveTweaks(schema: BrandOsSchema): BrandTweaks {
  const defaults = buildDefaultTweaks(schema);
  const override = schema.tweaks;
  const axes = {} as Record<TweakAxis, TweakAxisDef>;

  for (const axis of Object.keys(defaults.axes) as TweakAxis[]) {
    axes[axis] = mergeAxis(defaults.axes[axis], override?.axes?.[axis]);
  }

  return {
    defaults: {
      ...defaults.defaults,
      ...(override?.defaults ?? {}),
    },
    axes,
  };
}
