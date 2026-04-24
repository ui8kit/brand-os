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
    "theme": "dark",
    "accent": "primary",
    "density": "comfortable",
    "radius": "soft",
    "depth": "subtle",
    "motion": "full",
    "typeScale": "default",
    "surfaceTexture": "clean"
  },
  "axes": {
    "theme": {
      "label": "Theme",
      "options": {
        "light": {
          "label": "Light",
          "vars": {
            "--background": "#ffffff",
            "--foreground": "#222222",
            "--card": "#ffffff",
            "--popover": "#ffffff",
            "--primary": "#ff385c",
            "--primary-foreground": "#ffffff",
            "--secondary": "#f7f7f7",
            "--secondary-foreground": "#222222",
            "--muted": "#f2f2f2",
            "--muted-foreground": "#6a6a6a",
            "--accent": "#ff385c",
            "--accent-foreground": "#ffffff",
            "--destructive": "#c13515",
            "--destructive-foreground": "#ffffff",
            "--border": "#dddddd",
            "--input": "#dddddd",
            "--ring": "#222222"
          }
        },
        "dark": {
          "label": "Dark",
          "vars": {
            "--background": "#222222",
            "--foreground": "#f7f7f7",
            "--card": "#3f3f3f",
            "--popover": "hsl(222 42% 14%)",
            "--primary": "#ff385c",
            "--primary-foreground": "#ffffff",
            "--secondary": "#3f3f3f",
            "--secondary-foreground": "hsl(210 40% 98%)",
            "--muted": "#3f3f3f",
            "--muted-foreground": "#c1c1c1",
            "--accent": "#ff385c",
            "--accent-foreground": "#111111",
            "--destructive": "#c13515",
            "--destructive-foreground": "#ffffff",
            "--border": "#6a6a6a",
            "--input": "#6a6a6a",
            "--ring": "#ff385c"
          }
        },
        "paper": {
          "label": "Paper",
          "vars": {
            "--background": "hsl(42 30% 97%)",
            "--foreground": "#222222",
            "--card": "hsl(42 25% 99%)",
            "--popover": "hsl(42 25% 99%)",
            "--primary": "#ff385c",
            "--primary-foreground": "#ffffff",
            "--secondary": "#f7f7f7",
            "--secondary-foreground": "#222222",
            "--muted": "hsl(42 18% 92%)",
            "--muted-foreground": "hsl(28 14% 34%)",
            "--accent": "#ff385c",
            "--accent-foreground": "#ffffff",
            "--destructive": "#c13515",
            "--destructive-foreground": "#ffffff",
            "--border": "hsl(35 22% 85%)",
            "--input": "hsl(35 22% 85%)",
            "--ring": "#222222"
          }
        },
        "dusk": {
          "label": "Dusk",
          "vars": {
            "--background": "hsl(232 26% 15%)",
            "--foreground": "hsl(40 30% 94%)",
            "--card": "hsl(232 22% 19%)",
            "--popover": "hsl(232 22% 19%)",
            "--primary": "#ff385c",
            "--primary-foreground": "#ffffff",
            "--secondary": "#3f3f3f",
            "--secondary-foreground": "hsl(210 40% 98%)",
            "--muted": "#3f3f3f",
            "--muted-foreground": "#c1c1c1",
            "--accent": "#ff385c",
            "--accent-foreground": "#111111",
            "--destructive": "#c13515",
            "--destructive-foreground": "#ffffff",
            "--border": "hsl(232 14% 29%)",
            "--input": "hsl(232 14% 29%)",
            "--ring": "#ff385c"
          }
        },
        "midnight": {
          "label": "Midnight",
          "vars": {
            "--background": "hsl(222 47% 8%)",
            "--foreground": "hsl(210 40% 98%)",
            "--card": "hsl(222 40% 12%)",
            "--popover": "hsl(222 40% 12%)",
            "--primary": "#ff385c",
            "--primary-foreground": "#ffffff",
            "--secondary": "#3f3f3f",
            "--secondary-foreground": "hsl(210 40% 98%)",
            "--muted": "#3f3f3f",
            "--muted-foreground": "hsl(215 20% 72%)",
            "--accent": "#ff385c",
            "--accent-foreground": "#111111",
            "--destructive": "#c13515",
            "--destructive-foreground": "#ffffff",
            "--border": "hsl(217 33% 20%)",
            "--input": "hsl(217 33% 20%)",
            "--ring": "#ff385c"
          }
        },
        "high-contrast": {
          "label": "High Contrast",
          "vars": {
            "--background": "hsl(0 0% 0%)",
            "--foreground": "hsl(0 0% 100%)",
            "--card": "hsl(0 0% 6%)",
            "--popover": "hsl(0 0% 6%)",
            "--primary": "#ff385c",
            "--primary-foreground": "#ffffff",
            "--secondary": "#3f3f3f",
            "--secondary-foreground": "hsl(210 40% 98%)",
            "--muted": "hsl(0 0% 8%)",
            "--muted-foreground": "hsl(0 0% 88%)",
            "--accent": "#ff385c",
            "--accent-foreground": "#ffffff",
            "--destructive": "#c13515",
            "--destructive-foreground": "#ffffff",
            "--border": "hsl(0 0% 60%)",
            "--input": "hsl(0 0% 60%)",
            "--ring": "#ff385c"
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
            "--accent": "#ff385c",
            "--accent-foreground": "#ffffff",
            "--brand-accent-current": "var(--primary)"
          }
        },
        "accent": {
          "label": "Accent",
          "vars": {
            "--accent": "#ff385c",
            "--accent-foreground": "#ffffff",
            "--brand-accent-current": "var(--accent)"
          }
        },
        "muted": {
          "label": "Muted",
          "vars": {
            "--accent": "#f2f2f2",
            "--accent-foreground": "#6a6a6a",
            "--brand-accent-current": "var(--muted)"
          }
        },
        "signal": {
          "label": "Signal",
          "vars": {
            "--accent": "#c13515",
            "--accent-foreground": "#ffffff",
            "--brand-accent-current": "#c13515"
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
            "--density-section-padding": "56px",
            "--density-stack-gap": "16px",
            "--density-card-padding": "16px",
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
            "--radius-sm": "0.5rem",
            "--radius-md": "0.875rem",
            "--radius-lg": "1.25rem",
            "--radius-xl": "2rem",
            "--radius": "0.875rem"
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
            "--shadow-sm": "0 4px 12px rgba(0,0,0,0.08)",
            "--shadow-md": "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.1) 0 4px 8px 0",
            "--shadow-lg": "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.06) 0 8px 16px 0, rgba(0,0,0,0.12) 0 12px 24px 0"
          }
        },
        "lifted": {
          "label": "Lifted",
          "vars": {
            "--shadow-sm": "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.1) 0 4px 8px 0",
            "--shadow-md": "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.06) 0 8px 16px 0, rgba(0,0,0,0.12) 0 12px 24px 0",
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
            "--motion-duration-fast": "120ms",
            "--motion-duration-normal": "180ms",
            "--motion-duration-slow": "260ms"
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
            "--font-display-size": "4rem",
            "--font-heading-size": "1.75rem",
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
