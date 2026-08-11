(() => {
  const STORAGE_KEY = 'brand-os-tweaks';
  const attributes = {
  "theme": "data-theme",
  "accent": "data-accent",
  "density": "data-density",
  "radius": "data-radius",
  "depth": "data-depth",
  "motion": "data-motion",
  "typeScale": "data-type-scale",
  "surfaceTexture": "data-surface"
};
  const manifest = {
  "defaults": {
    "theme": "paper",
    "accent": "primary",
    "density": "cozy",
    "radius": "soft",
    "depth": "subtle",
    "motion": "full",
    "typeScale": "editorial",
    "surfaceTexture": "tinted"
  },
  "axes": {
    "theme": {
      "label": "Theme",
      "options": {
        "light": {
          "label": "Light",
          "vars": {
            "--background": "hsl(36 100% 97%)",
            "--foreground": "hsl(20 30% 8%)",
            "--card": "hsl(36 60% 98%)",
            "--popover": "hsl(36 60% 98%)",
            "--primary": "hsl(12 60% 45%)",
            "--primary-foreground": "hsl(24 100% 98%)",
            "--secondary": "hsl(22 48% 20%)",
            "--secondary-foreground": "hsl(36 100% 97%)",
            "--muted": "hsl(37 52% 89%)",
            "--muted-foreground": "hsl(23 22% 34%)",
            "--accent": "hsl(42 47% 56%)",
            "--accent-foreground": "hsl(22 44% 13%)",
            "--destructive": "hsl(0 70% 36%)",
            "--destructive-foreground": "hsl(0 100% 97%)",
            "--border": "hsl(22 28% 78%)",
            "--input": "hsl(22 28% 78%)",
            "--ring": "hsl(42 47% 56%)"
          }
        },
        "dark": {
          "label": "Dark",
          "vars": {
            "--background": "hsl(22 44% 9%)",
            "--foreground": "hsl(36 45% 92%)",
            "--card": "hsl(22 40% 12%)",
            "--popover": "hsl(22 40% 12%)",
            "--primary": "hsl(12 58% 52%)",
            "--primary-foreground": "hsl(24 100% 98%)",
            "--secondary": "hsl(22 35% 18%)",
            "--secondary-foreground": "hsl(36 45% 92%)",
            "--muted": "hsl(22 28% 16%)",
            "--muted-foreground": "hsl(33 20% 68%)",
            "--accent": "hsl(42 42% 52%)",
            "--accent-foreground": "hsl(36 45% 94%)",
            "--destructive": "hsl(0 62% 48%)",
            "--destructive-foreground": "hsl(0 0% 100%)",
            "--border": "hsl(22 22% 24%)",
            "--input": "hsl(22 22% 24%)",
            "--ring": "hsl(42 42% 52%)"
          }
        },
        "paper": {
          "label": "Linen",
          "vars": {
            "--background": "hsl(36 100% 97%)",
            "--foreground": "hsl(20 30% 8%)",
            "--card": "hsl(37 52% 94%)",
            "--popover": "hsl(36 60% 98%)",
            "--primary": "hsl(12 60% 45%)",
            "--primary-foreground": "hsl(24 100% 98%)",
            "--secondary": "hsl(22 48% 20%)",
            "--secondary-foreground": "hsl(36 100% 97%)",
            "--muted": "hsl(37 52% 89%)",
            "--muted-foreground": "hsl(23 22% 34%)",
            "--accent": "hsl(42 47% 56%)",
            "--accent-foreground": "hsl(22 44% 13%)",
            "--destructive": "hsl(0 70% 36%)",
            "--destructive-foreground": "hsl(0 100% 97%)",
            "--border": "hsl(22 28% 78%)",
            "--input": "hsl(22 28% 78%)",
            "--ring": "hsl(42 47% 56%)"
          }
        },
        "dusk": {
          "label": "Walnut dusk",
          "vars": {
            "--background": "hsl(22 44% 11%)",
            "--foreground": "hsl(36 45% 92%)",
            "--card": "hsl(22 40% 14%)",
            "--popover": "hsl(22 40% 14%)",
            "--primary": "hsl(12 58% 52%)",
            "--primary-foreground": "hsl(24 100% 98%)",
            "--secondary": "hsl(22 35% 18%)",
            "--secondary-foreground": "hsl(36 45% 92%)",
            "--muted": "hsl(22 28% 16%)",
            "--muted-foreground": "hsl(33 20% 68%)",
            "--accent": "hsl(42 42% 52%)",
            "--accent-foreground": "hsl(36 45% 94%)",
            "--destructive": "hsl(0 62% 48%)",
            "--destructive-foreground": "hsl(0 0% 100%)",
            "--border": "hsl(22 22% 24%)",
            "--input": "hsl(22 22% 24%)",
            "--ring": "hsl(42 42% 52%)"
          }
        },
        "midnight": {
          "label": "Midnight",
          "vars": {
            "--background": "hsl(222 47% 8%)",
            "--foreground": "hsl(210 40% 98%)",
            "--card": "hsl(222 40% 12%)",
            "--popover": "hsl(222 40% 12%)",
            "--primary": "hsl(12 58% 52%)",
            "--primary-foreground": "hsl(24 100% 98%)",
            "--secondary": "hsl(22 35% 18%)",
            "--secondary-foreground": "hsl(36 45% 92%)",
            "--muted": "hsl(22 28% 16%)",
            "--muted-foreground": "hsl(215 20% 72%)",
            "--accent": "hsl(42 42% 52%)",
            "--accent-foreground": "hsl(36 45% 94%)",
            "--destructive": "hsl(0 62% 48%)",
            "--destructive-foreground": "hsl(0 0% 100%)",
            "--border": "hsl(217 33% 20%)",
            "--input": "hsl(217 33% 20%)",
            "--ring": "hsl(42 42% 52%)"
          }
        },
        "high-contrast": {
          "label": "High Contrast",
          "vars": {
            "--background": "hsl(0 0% 0%)",
            "--foreground": "hsl(0 0% 100%)",
            "--card": "hsl(0 0% 6%)",
            "--popover": "hsl(0 0% 6%)",
            "--primary": "hsl(12 58% 52%)",
            "--primary-foreground": "#ffffff",
            "--secondary": "hsl(22 35% 18%)",
            "--secondary-foreground": "hsl(36 45% 92%)",
            "--muted": "hsl(0 0% 8%)",
            "--muted-foreground": "hsl(0 0% 88%)",
            "--accent": "hsl(42 42% 52%)",
            "--accent-foreground": "#ffffff",
            "--destructive": "hsl(0 62% 48%)",
            "--destructive-foreground": "#ffffff",
            "--border": "hsl(0 0% 60%)",
            "--input": "hsl(0 0% 60%)",
            "--ring": "hsl(42 42% 52%)"
          }
        }
      }
    },
    "accent": {
      "label": "Accent",
      "options": {
        "primary": {
          "label": "Primary",
          "vars": {
            "--accent": "hsl(12 60% 45%)",
            "--accent-foreground": "hsl(24 100% 98%)",
            "--brand-accent-current": "var(--primary)"
          }
        },
        "accent": {
          "label": "Accent",
          "vars": {
            "--accent": "hsl(42 47% 56%)",
            "--accent-foreground": "hsl(22 44% 13%)",
            "--brand-accent-current": "var(--accent)"
          }
        },
        "muted": {
          "label": "Muted",
          "vars": {
            "--accent": "hsl(37 52% 89%)",
            "--accent-foreground": "hsl(23 22% 34%)",
            "--brand-accent-current": "var(--muted)"
          }
        },
        "signal": {
          "label": "Signal",
          "vars": {
            "--accent": "hsl(350 74% 44%)",
            "--accent-foreground": "hsl(0 100% 97%)",
            "--brand-accent-current": "hsl(350 74% 44%)"
          }
        }
      }
    },
    "density": {
      "label": "Density",
      "options": {
        "comfortable": {
          "label": "Comfortable",
          "vars": {
            "--density-section-padding": "2.5rem",
            "--density-stack-gap": "1rem",
            "--density-card-padding": "1rem",
            "--density-control-height": "2.75rem"
          }
        },
        "compact": {
          "label": "Compact",
          "vars": {
            "--density-section-padding": "1.5rem",
            "--density-stack-gap": "0.75rem",
            "--density-card-padding": "0.75rem",
            "--density-control-height": "2.375rem"
          }
        },
        "cozy": {
          "label": "Cozy",
          "vars": {
            "--density-section-padding": "2.5rem",
            "--density-stack-gap": "1.25rem",
            "--density-card-padding": "1.25rem",
            "--density-control-height": "3rem"
          }
        }
      }
    },
    "radius": {
      "label": "Radius",
      "options": {
        "sharp": {
          "label": "Sharp",
          "vars": {
            "--radius-sm": "0",
            "--radius-md": "0.125rem",
            "--radius-lg": "0.25rem",
            "--radius-xl": "0.5rem",
            "--radius": "0.125rem"
          }
        },
        "soft": {
          "label": "Soft",
          "vars": {
            "--radius-sm": "0.25rem",
            "--radius-md": "0.375rem",
            "--radius-lg": "0.5rem",
            "--radius-xl": "0.75rem",
            "--radius": "0.375rem"
          }
        },
        "pill": {
          "label": "Pill",
          "vars": {
            "--radius-sm": "9999px",
            "--radius-md": "9999px",
            "--radius-lg": "9999px",
            "--radius-xl": "9999px",
            "--radius": "9999px"
          }
        }
      }
    },
    "depth": {
      "label": "Depth",
      "options": {
        "flat": {
          "label": "Flat",
          "vars": {
            "--shadow-sm": "none",
            "--shadow-md": "none",
            "--shadow-lg": "none"
          }
        },
        "subtle": {
          "label": "Subtle",
          "vars": {
            "--shadow-sm": "0 1px 3px rgba(0,0,0,0.06)",
            "--shadow-md": "0 4px 12px rgba(0,0,0,0.08)",
            "--shadow-lg": "0 4px 12px rgba(0,0,0,0.08)"
          }
        },
        "lifted": {
          "label": "Lifted",
          "vars": {
            "--shadow-sm": "0 4px 12px rgba(0,0,0,0.08)",
            "--shadow-md": "0 4px 12px rgba(0,0,0,0.08)",
            "--shadow-lg": "0 18px 48px rgba(0,0,0,0.18)"
          }
        }
      }
    },
    "motion": {
      "label": "Motion",
      "options": {
        "full": {
          "label": "Full",
          "vars": {
            "--motion-duration-fast": "140ms",
            "--motion-duration-normal": "220ms",
            "--motion-duration-slow": "900ms"
          }
        },
        "reduced": {
          "label": "Reduced",
          "vars": {
            "--motion-duration-fast": "80ms",
            "--motion-duration-normal": "120ms",
            "--motion-duration-slow": "160ms"
          }
        },
        "none": {
          "label": "None",
          "vars": {
            "--motion-duration-fast": "0ms",
            "--motion-duration-normal": "0ms",
            "--motion-duration-slow": "0ms"
          }
        }
      }
    },
    "typeScale": {
      "label": "Type Scale",
      "options": {
        "compact": {
          "label": "Compact",
          "vars": {
            "--type-scale-ratio": "1.125",
            "--font-display-size": "2.5rem",
            "--font-heading-size": "1.75rem",
            "--font-body-size": "0.9375rem",
            "--font-label-size": "0.8125rem"
          }
        },
        "default": {
          "label": "Default",
          "vars": {
            "--type-scale-ratio": "1.2",
            "--font-display-size": "4.5rem",
            "--font-heading-size": "2.25rem",
            "--font-body-size": "1rem",
            "--font-label-size": "0.875rem"
          }
        },
        "editorial": {
          "label": "Editorial",
          "vars": {
            "--type-scale-ratio": "1.333",
            "--font-display-size": "4rem",
            "--font-heading-size": "2.5rem",
            "--font-body-size": "1.0625rem",
            "--font-label-size": "0.875rem"
          }
        }
      }
    },
    "surfaceTexture": {
      "label": "Surface Texture",
      "options": {
        "clean": {
          "label": "Clean",
          "vars": {
            "--surface-overlay": "none",
            "--surface-noise-opacity": "0",
            "--surface-tint-opacity": "0"
          }
        },
        "tinted": {
          "label": "Tinted",
          "vars": {
            "--surface-overlay": "linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, transparent), transparent)",
            "--surface-noise-opacity": "0",
            "--surface-tint-opacity": "0.08"
          }
        },
        "grain": {
          "label": "Grain",
          "vars": {
            "--surface-overlay": "radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)",
            "--surface-noise-opacity": "0.08",
            "--surface-tint-opacity": "0.04"
          }
        }
      }
    }
  }
};
  const root = document.documentElement;

  function loadStored() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function getInitialState() {
    const stored = loadStored();
    const state = { ...(manifest.defaults || {}), ...stored };
    // System preference only wins when the schema does NOT pin a default theme.
    const themeIsExplicit = Boolean(manifest.defaults && manifest.defaults.theme);
    if (!stored.theme && !themeIsExplicit && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && manifest.axes.theme?.options.dark) {
      state.theme = 'dark';
    }
    if (!stored.motion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches && manifest.axes.motion?.options.reduced) {
      state.motion = 'reduced';
    }
    return state;
  }

  let state = getInitialState();

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function apply() {
    Object.entries(attributes).forEach(([axis, attribute]) => {
      const value = state[axis];
      if (!value) {
        root.removeAttribute(attribute);
        return;
      }
      root.setAttribute(attribute, value);
    });
  }

  function notify(axis, value) {
    window.postMessage({ type: 'brand-os-tweak', axis, value, state: { ...state } }, '*');
  }

  const api = {
    getState() {
      return { ...state };
    },
    set(axis, value) {
      if (!manifest.axes[axis] || !manifest.axes[axis].options[value]) {
        return { ...state };
      }
      state = { ...state, [axis]: value };
      apply();
      persist();
      notify(axis, value);
      return { ...state };
    },
    cycle(axis) {
      const values = Object.keys(manifest.axes[axis]?.options || {});
      if (values.length === 0) {
        return { ...state };
      }
      const current = state[axis];
      const nextIndex = current ? (values.indexOf(current) + 1) % values.length : 0;
      return api.set(axis, values[nextIndex]);
    },
    reset() {
      state = getInitialState();
      apply();
      persist();
      return { ...state };
    }
  };

  window.brandTweaks = api;
  // Expose manifest pieces for higher-level UIs (e.g. floating tweaks dock).
  window.__brandTweaksManifest = manifest;
  window.__brandTweaksAxes = manifest.axes;
  apply();
})();
