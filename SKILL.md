---
name: brand-os
description: >-
  Create and validate distinctive brand contracts with brand-os (init → emit →
  validate → apply). Use when defining a brand system, DESIGN.md, anti-slop
  taste checks, tweaks preview, or agent-ready design tokens — not for generic
  Vite scaffolding alone.
---

# brand-os

Generate a durable brand contract so agents and UI kits do not fall back to AI design defaults.

## Workflow

Follow [AGENTS.md](./AGENTS.md) for the full coordinator workflow. Short path:

1. **Discover** — goal, layout, content, audience; gather constraints and assets.
2. **Init** — `npx brand-os init --name "…" --style … --palette … --surfaces … --json`
3. **Compose** — enrich `brandThesis` (summary, personality, antiPersonality), tokens, marks, illustration.forbidden, recipes.
4. **Emit** — `npx brand-os emit --schema path/to/schema.json --bootstrap`
5. **Validate** — `npx brand-os validate --schema path/to/schema.json` (contrast, anti-slop, optional Google DESIGN.md lint)
6. **Apply** — attach generated `DESIGN.md` + wire `tweaks/*`; implement surfaces under HARD CONSTRAINTS / FORBIDDEN from the schema.

## Anti-slop

- Never default to Inter / Roboto / Arial as brand voice.
- Avoid indigo–violet “AI startup” accents unless the user passes `--allow-slop`.
- Require `brandThesis.antiPersonality` (≥2) and recognisable `brandMarks`.
- Prefer distinctive display + readable body (e.g. Fraunces + DM Sans).

## Commands (primary)

```bash
npx brand-os init --name "Brand" --style editorial --palette amber --surfaces promo --json
npx brand-os emit --schema .project/brand/brand.schema.json --bootstrap
npx brand-os validate --schema .project/brand/brand.schema.json
npx brand-os validate --schema .project/brand/brand.schema.json --allow-slop   # intentional waiver
npx brand-os validate --schema .project/brand/brand.schema.json --skip-google-lint
```

Scaffold (`npx brand-os my-app`) and AST (`--ast-suite` / `--ast-input`) are secondary; see AGENTS.md and README.md.
