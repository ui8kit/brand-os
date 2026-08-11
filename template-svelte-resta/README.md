# RestA (`template-svelte-resta`)

Canonical **BrandOSS** restaurant starter: Svelte 5 + Vite + Tailwind 4 + ui8kit kit.

Taste reference is warm Slavic hospitality — dark wood, linen, terracotta, brass, festive folk accents. Demo brand is fictional **«Очаг»**; do not copy client names or marks.

## Run

```bash
bun install
bun run dev
```

## Scaffold

```bash
npx brand-os my-restaurant --template resta
# aliases: svelte-resta
```

## Layout

```text
src/kit/        # ui8kit primitives (codegen)
src/utils/      # cn, expr, tags, …
src/blocks/     # landing sections (Zone C — kit only)
src/lib/        # demo content fixtures
src/App.svelte  # compose blocks + document chrome
public/images/  # atmosphere photos (neutral filenames)
```

## Composition

See `rules/ui-registry.mdc` and `rules/ui-composition.mdc`.

- New atoms → kit / codegen, not hand-grown trees
- Blocks use `Block` / `Box` / `Stack` / `Title` / `Text` / `Button` / `Image`
- Brand tokens live in `src/app.css` (`@theme`)

## Notes

- Replace `src/lib/content.ts` and `public/images/*` for a real venue
- Keep folk ornament abstract — color rhythm only, no cloned logos
