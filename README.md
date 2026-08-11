# Brand OS

`npx brand-os` turns a brand brief into a durable **brand contract** — schema → `DESIGN.md`, tweaks, brand marks, and parser fixtures — so agents and UI kits cannot fall back to AI design defaults.

Scaffolding Vite apps and AST parsing are secondary tools. Taste is mandatory.

## Install

No global install needed:

```bash
npx brand-os init --name "Taste Demo" --style editorial --palette amber --surfaces promo --json
```

## Core workflow

```text
init → emit → validate → apply
```

### 1) Init — create the schema

```bash
npx brand-os init
npx brand-os init --name "Grill House" --style warm --palette amber --surfaces restaurant --json
npx brand-os init --name "Taste Demo" --style editorial --palette amber --surfaces promo --json
```

Useful flags:

- `--style` — warm, bold, minimal, editorial, playful, luxury (fonts pair for you)
- `--palette` — warm, cool, rose, forest, slate, amber (`violet` requires `--allow-slop`)
- `--surfaces` — preset (`promo`, `saas`, …) or comma-separated list
- `--allow-slop` — permit known AI-default accents (violet) when intentional
- `--out`, `--json`

Starter fonts are distinctive (e.g. **Fraunces + DM Sans** for warm). Never Inter/Roboto/Arial as brand voice.

### 2) Emit — generate the contract bundle

```bash
npx brand-os emit --schema ".project/my-brand/my-brand.schema.json" --bootstrap
# backward compatible:
npx brand-os --schema ".project/my-brand/my-brand.schema.json" --bootstrap
```

Output typically includes:

- `DESIGN.md` — Google DESIGN.md–shaped exchange format
- `tweaks/` — live preview axes (no build step)
- `brand-marks/`
- `parser-contract.json`, `parser-fixtures/`, `manifest.json`

Emit also prints anti-slop heuristics. Errors warn strongly; fix the schema or pass `--allow-slop` if intentional. Prefer `validate` for a hard gate.

### 3) Validate — contrast, anti-slop, DESIGN.md lint

```bash
npx brand-os validate --schema ".project/my-brand/my-brand.schema.json"
npx brand-os validate --schema ".project/my-brand/my-brand.schema.json" --strict
npx brand-os validate --schema ".project/my-brand/my-brand.schema.json" --skip-google-lint
npx brand-os validate --schema ".project/my-brand/my-brand.schema.json" --allow-slop
```

Checks:

- theme contrast budgets
- anti-slop heuristics (generic fonts, indigo/violet accents, thin thesis, missing antiPersonality / forbidden / marks)
- optional `npx @google/design.md` lint on emitted `DESIGN.md`

### 4) Apply

Attach `*-generated/DESIGN.md` (and tweaks) to implementation chats. Wire `tweaks/tweaks.css` + `tweaks-runtime.js` for live preview. Keep HARD CONSTRAINTS and FORBIDDEN from the schema.

## Anti-slop

Do not ship brands that look like every other AI page:

- no Inter / Roboto / Arial as the primary voice
- no default indigo–violet startup accents (use `--allow-slop` only when deliberate)
- require `brandThesis.antiPersonality` (≥2 traits the brand is **not**)
- define `brandMarks` and `illustration.forbidden` / `componentPolicy.avoid`

Agents: see [AGENTS.md](./AGENTS.md) and [SKILL.md](./SKILL.md).

## Copy-paste starter schema

Use Fraunces + DM Sans (not Inter). Include thesis + antiPersonality:

```json
{
  "meta": {
    "name": "My Brand OS",
    "slug": "my-brand",
    "description": "A distinctive brand language for web and product surfaces."
  },
  "brandThesis": {
    "summary": "Purpose-led surfaces with clear hierarchy and calm conversion.",
    "personality": ["clear", "confident", "warm"],
    "antiPersonality": ["generic SaaS purple", "template feature-card stacks", "Inter-only UI"]
  },
  "brandMarks": {
    "wordmark": "Wordmark locks to display type; keep generous tracking on large sizes."
  },
  "illustration": {
    "forbidden": ["generic 3D AI people", "purple glow orbs", "emoji as primary icons"]
  },
  "componentPolicy": {
    "avoid": ["triple identical feature cards as the hero story"]
  },
  "emit": {
    "assets": []
  },
  "tokens": {
    "color": {
      "light": {
        "background": "hsl(40 33% 98%)",
        "foreground": "hsl(220 20% 12%)",
        "card": "hsl(0 0% 100%)",
        "popover": "hsl(0 0% 100%)",
        "primary": "hsl(35 92% 45%)",
        "primaryForeground": "hsl(40 33% 98%)",
        "secondary": "hsl(40 20% 94%)",
        "secondaryForeground": "hsl(220 20% 20%)",
        "muted": "hsl(40 20% 94%)",
        "mutedForeground": "hsl(220 12% 40%)",
        "accent": "hsl(24 85% 45%)",
        "accentForeground": "hsl(40 33% 98%)",
        "destructive": "hsl(0 84% 60%)",
        "destructiveForeground": "hsl(0 0% 100%)",
        "border": "hsl(40 16% 88%)",
        "input": "hsl(40 16% 88%)",
        "ring": "hsl(35 92% 45%)"
      },
      "dark": {},
      "categories": {}
    },
    "typography": {
      "families": {
        "display": "Fraunces, serif",
        "body": "DM Sans, sans-serif",
        "ui": "DM Sans, sans-serif"
      }
    },
    "radius": {
      "sm": "0.25rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "xl": "0.75rem"
    },
    "shadow": {
      "sm": "0 1px 2px rgba(15, 23, 42, 0.05)",
      "md": "0 2px 8px rgba(15, 23, 42, 0.10)"
    }
  },
  "designGrammar": {
    "shapeLanguage": {
      "core": "Editorial hierarchy, generous whitespace, restrained elevation."
    }
  },
  "recipes": {
    "pageArchetypes": {},
    "sectionArchetypes": {}
  }
}
```

Companion files (auto-discovered from `meta.slug`):

- `my-brand-parser-contract.json`
- `my-brand-parser-fixtures.source.json`
- emit dir: `my-brand-generated`

Use `--bootstrap` on first emit to generate missing companions from safe defaults.

## Secondary: scaffold

```bash
npx brand-os my-app
npx brand-os my-app --template react-resta --immediate
```

Templates: `react`, `react-resta`, `tech-blog`, **`resta`** / `svelte-resta` (canonical Svelte restaurant starter). Prefer defining the brand contract before scaffolding UI.

## Secondary: AST parser

```bash
npx brand-os --ast-suite ".project/my-brand/my-brand.schema.json"
npx brand-os --ast-input page.html --ast-suite ".project/my-brand/my-brand.schema.json" --ast-output analysis.json
```

## Development

```bash
npm run typecheck
npm run build
```

Published binary: `dist/index.js` → `bin.brand-os`.

## Publish

```bash
npm publish --access=public
```

## License

MIT
