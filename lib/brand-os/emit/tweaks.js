import { join } from 'node:path';
import { ensureDir, writeTextFile } from '../utils.js';
function resolveTweaks(schema) {
    if (!schema.tweaks)
        throw new Error('Cannot emit tweaks without /tweaks in the contract.');
    return schema.tweaks;
}
const DATA_ATTRIBUTES = {
    theme: 'data-theme',
    accent: 'data-accent',
    density: 'data-density',
    radius: 'data-radius',
    depth: 'data-depth',
    motion: 'data-motion',
    typeScale: 'data-type-scale',
    surfaceTexture: 'data-surface',
};
function optionSelector(axis, optionName, scope) {
    if (scope && scope !== 'root') {
        return scope;
    }
    return `[${DATA_ATTRIBUTES[axis]}="${optionName}"]`;
}
function renderVars(vars, indent = '  ') {
    return Object.entries(vars).map(([name, value]) => `${indent}${name}: ${value};`);
}
function buildTweaksCss(schema) {
    const tweaks = resolveTweaks(schema);
    const defaults = tweaks.defaults ?? {};
    const rootVars = {};
    for (const [axis, defaultValue] of Object.entries(defaults)) {
        const option = tweaks.axes[axis]?.options?.[defaultValue];
        if (!option) {
            continue;
        }
        for (const [name, value] of Object.entries(option.vars)) {
            rootVars[name] = value;
        }
    }
    const lines = [
        ':root {',
        ...renderVars(rootVars),
        '}',
        '',
    ];
    for (const [axis, axisDef] of Object.entries(tweaks.axes)) {
        for (const [optionName, option] of Object.entries(axisDef.options)) {
            lines.push(`${optionSelector(axis, optionName, option.selectorScope)} {`);
            lines.push(...renderVars(option.vars));
            lines.push('}');
            lines.push('');
        }
    }
    lines.push(':where(main, [data-brand-surface="section"]) {', '  padding-block: var(--density-section-padding, 2rem);', '  gap: var(--density-stack-gap, 1rem);', '}', '', ':where(.card, [data-brand-surface="card"]) {', '  padding: var(--density-card-padding, 1rem);', '  border-radius: var(--radius-lg, var(--radius, 0.75rem));', '  box-shadow: var(--shadow-md, none);', '  background: var(--surface-overlay, none), var(--card, var(--background));', '}', '', ':where(button, .button, [data-brand-control]) {', '  min-height: var(--density-control-height, 2.75rem);', '  border-radius: var(--radius-md, var(--radius, 0.5rem));', '  transition-duration: var(--motion-duration-normal, 180ms);', '}', '', ':where(h1, h2, h3, [data-brand-display]) {', '  font-size: var(--font-display-size, inherit);', '}', '', ':where(h4, h5, h6, [data-brand-heading]) {', '  font-size: var(--font-heading-size, inherit);', '}', '', ':where(body, p, li, [data-brand-body]) {', '  font-size: var(--font-body-size, inherit);', '}', '', ':where(label, small, [data-brand-label]) {', '  font-size: var(--font-label-size, inherit);', '}', '', '[data-motion="none"] *, [data-motion="none"] *::before, [data-motion="none"] *::after {', '  transition-duration: 0ms !important;', '  animation-duration: 0ms !important;', '  animation-iteration-count: 1 !important;', '}', '', '@media (prefers-reduced-motion: reduce) {', '  [data-motion="full"] *, [data-motion="full"] *::before, [data-motion="full"] *::after {', '    transition-duration: 0ms !important;', '    animation-duration: 0ms !important;', '    animation-iteration-count: 1 !important;', '  }', '}', '');
    return `${lines.join('\n')}\n`;
}
function buildTweaksRuntime(schema) {
    const tweaks = resolveTweaks(schema);
    const axes = Object.keys(tweaks.axes);
    return `(() => {
  const STORAGE_KEY = ${JSON.stringify(`brand-os-tweaks:${schema.meta.slug ?? schema.meta.name}:${schema.schemaVersion}`)};
  const attributes = ${JSON.stringify(DATA_ATTRIBUTES, null, 2)};
  const manifest = ${JSON.stringify(tweaks, null, 2)};
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
})();\n`;
}
function buildTweaksReadme(schema) {
    return [
        `# ${schema.meta.name} Tweaks`,
        '',
        'This directory contains a Claude Design-style tweaks layer for live preview switching without regeneration.',
        '',
        '## Files',
        '- `tweaks.css` — CSS variable cascades for all tweak axes',
        '- `tweaks.json` — machine-readable axis manifest',
        '- `tweaks-runtime.js` — small vanilla runtime with localStorage and postMessage support',
        '',
        '## Host wiring',
        '1. Load `tweaks.css` after your token layer.',
        '2. Load `tweaks-runtime.js` once in the host page.',
        '3. Toggle attributes on the root element or call `window.brandTweaks.set(axis, value)`.',
        '',
    ].join('\n');
}
export function emitTweaks(outputDir, schema) {
    const tweaksDir = join(outputDir, 'tweaks');
    const tweaks = resolveTweaks(schema);
    ensureDir(tweaksDir);
    writeTextFile(join(tweaksDir, 'tweaks.css'), buildTweaksCss(schema));
    writeTextFile(join(tweaksDir, 'tweaks.json'), `${JSON.stringify(tweaks, null, 2)}\n`);
    writeTextFile(join(tweaksDir, 'tweaks-runtime.js'), buildTweaksRuntime(schema));
    writeTextFile(join(tweaksDir, 'README.md'), buildTweaksReadme(schema));
    return [
        'tweaks/tweaks.css',
        'tweaks/tweaks.json',
        'tweaks/tweaks-runtime.js',
        'tweaks/README.md',
    ];
}
