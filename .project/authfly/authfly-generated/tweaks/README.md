# Authfly Tweaks

This directory contains a Claude Design-style tweaks layer for live preview switching without regeneration.

## Files
- `tweaks.css` — CSS variable cascades for all tweak axes
- `tweaks.json` — machine-readable axis manifest
- `tweaks-runtime.js` — small vanilla runtime with localStorage and postMessage support

## Host wiring
1. Load `tweaks.css` after your token layer.
2. Load `tweaks-runtime.js` once in the host page.
3. Toggle attributes on the root element or call `window.brandTweaks.set(axis, value)`.
