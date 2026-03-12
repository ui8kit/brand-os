# Tech Blog Template

`template-tech-blog` is a premium starter for technical founders, operators, and specialist teams who need a calm editorial site with room for articles, videos, books, proof blocks, and a trusted service directory.

The template is intentionally generic. It ships with a fixture-driven `John Doe` sample so the same structure can later be adapted to any serious technical personal brand.

## What this template is

This is not just a landing page mock. It is a full technical expert website starter with:

- A complete single-page editorial experience
- A generic `John Doe` content model
- Isolated fixtures for navigation, language, logo, sections, and placeholders
- A reusable styling system that separates tokens, theme mapping, and brand-specific overrides
- A scaffold path through `npx brand-os my-app --template tech-blog`

## Template focus

- **Editorial posture** — Strong hierarchy for essays, briefings, archive pages, and video companions
- **Community blocks** — Reusable areas for discussions, digests, and topic-led member activity
- **Directory pattern** — A built-in foundation for listing people, products, or niche B2B services
- **UI8Kit core** — Built from existing primitives and composites without introducing ad-hoc styling rules

## Tech stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Class Variance Authority (CVA)

## Architecture

The template is organized into clear layers:

- **Content layer** — `fixtures/`
  - `fixtures/site.ts` stores the full `John Doe` sample content
  - `fixtures/placeholders.ts` generates dark-mode-friendly base64 SVG placeholders
- **Structure layer** — `src/blocks/`, `src/layouts/`, `src/partials/`
  - page sections live in `src/blocks/`
  - shared shells live in `src/layouts/`
  - header, footer, and theme toggle live in `src/partials/`
- **UI layer** — `src/components/`, `src/variants/`, `src/lib/`
  - built from UI8kit primitives and composites
- **Brand layer** — `src/assets/css/`
  - `shared/tokens.css` defines semantic design tokens
  - `shadcn.css` maps tokens into Tailwind 4 `@theme inline`
  - `brand-layer.css` adds site-specific styling through `data-class` selectors

## Styling model

The page templates are intentionally built with **UI8kit props first**, not hand-written Tailwind utility strings inside every section.

In practice this means:

- layout and spacing come from UI8kit props such as `py="16"`, `gap="8"`, `max="w-7xl"`
- buttons, cards, badges, titles, and text use UI8kit component variants
- section-specific styling is attached through `data-class` hooks
- the visual identity is mostly controlled from CSS rather than from inline `className` usage in page blocks

This makes the template easier to rebrand and easier to regenerate from a Brand OS contract.

## Where the brand lives

The brand is mainly expressed in CSS:

- `src/assets/css/shared/tokens.css`
  - colors
  - typography families
  - radii
  - shadows
  - light and dark mode variables
- `src/assets/css/shadcn.css`
  - token-to-theme bridge for Tailwind 4
  - connects semantic variables like `--primary` and `--background` to utility classes
- `src/assets/css/brand-layer.css`
  - site-level appearance rules
  - header shell
  - proof cards
  - editorial emphasis
  - footer treatment
  - placeholder framing

Because of this setup, many visual changes can be made without rewriting the page structure.

## Rebranding workflow

Use this rule of thumb:

- **Soft rebrand** — change `shared/tokens.css`
  - best for color, typography, radius, and shadow changes
- **Brand skin rebrand** — change `brand-layer.css`
  - best for header treatment, card feel, proof styling, and section mood
- **Structural rebrand** — change `fixtures/site.ts` and `src/blocks/`
  - best for changing the narrative, section order, and content model

If you only need a different expert identity, start with the fixtures.
If you need a different visual system, start with the CSS layer.
If you need a different type of site, change the blocks.

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run typecheck` | Run TypeScript type check |
| `npm run lint` | Run ESLint |

## Current scope

- Full single-page editorial site for a technical expert profile
- Reusable sections for journal, books, projects, media, about, and newsletter use cases
- All content isolated in `fixtures/`, including navigation, language, logo, and image placeholders
- Dark-mode-friendly base64 SVG placeholders that can later be replaced with real assets

## Next steps

- Replace `fixtures/site.ts` with a real expert profile and update the placeholders with production assets
- Generate a brand-specific token layer from a Brand OS contract when a stronger visual identity is ready
- Expand the article system into dedicated pages or a router-backed journal experience if needed
