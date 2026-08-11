# RestA (`template-svelte-resta`)

Canonical **BrandOSS** restaurant starter: Svelte 5 + Vite + Tailwind 4 + ui8kit, driven by the **resta-brand** contract.

Demo venue is fictional **«Очаг»**. Taste only — do not copy client names or marks.

## Run

```bash
bun install
bun run dev
```

## Brand contract

Applied emit from `.project/resta-brand/`:

| Path | Role |
| --- | --- |
| `brand/DESIGN.md` | Agent contract |
| `public/brand/tweaks/*` | Live CSS vars + runtime (`theme`, `density`, …) |
| `src/app.css` | Maps semantic roles → Tailwind `@theme` |

`index.html` loads tweaks CSS/JS and sets resta-brand defaults (`paper`, `cozy`, `editorial`, …).

Re-sync steps: see `brand/README.md`.

## Scaffold

```bash
npx brand-os my-restaurant --template resta
# alias: svelte-resta
```

## Layout

```text
brand/DESIGN.md          # resta-brand contract
public/brand/tweaks/     # tweaks.css + runtime
src/kit/                 # ui8kit primitives
src/blocks/              # landing: hero → atmosphere → cuisine → banquet → cta
src/lib/content.ts       # demo copy
src/app.css              # token bridge
```

## Composition

See `rules/ui-registry.mdc` and `rules/ui-composition.mdc`.

- Semantic colors: `bg-primary`, `text-muted-foreground`, `border-border`, …
- Primary CTAs: `.resta-btn-primary` (hover → accent per DESIGN.md)
- Brass emphasis: `.resta-btn-brass` (scarce, banquet only)
