# AST Parser Plan

Roadmap for the HTML → classified AST → UI mapping pipeline.

## Goal

Parse HTML + Tailwind prototypes into structured, system-safe output. Long-term target:

```
HTML/Tailwind prototype
→ DOM AST
→ class classification
→ normalized semantic AST
→ UI component mapping
→ output + audit report
```

## Phases

### Phase 1: HTML AST Ingestion
Parse source HTML into consistent intermediate representation. Preserve tag names, attributes, `class`, child order, text nodes, inline semantic hints (`data-kind`, `data-slot`, `data-layer`).

### Phase 2: Class Classification
Run every class token through the parser contract. Buckets: `structural`, `semantic`, `decorative`, `unknown`. Classification is per class, not per element. Unknown classes must never be silently dropped. Arbitrary values only pass when explicitly approved by the contract.

**Status: Implemented** — `src/ast-parser/classifier.ts`

### Phase 3: Semantic Normalization
Convert raw DOM into meaningful internal model. Infer section boundaries, wrapper components, content roles. Examples: repeated card-like structures → `CardPattern`, hero shell + copy + actions → `HeroPattern`.

Signals: tag names, `data-kind`, repeated class signatures, named utilities.

### Phase 4: UI Component Mapping
Map normalized nodes into component primitives and props.

Mapping policy:
- `structural` classes → utility props (spacing, layout, sizing)
- `semantic` classes → tokens, variants, or named wrappers
- `decorative` classes → stay outside core system layer
- `unknown` classes → produce migration warning

### Phase 5: Brand Layer Preservation
Not everything should convert to component props. Preserve a separate brand layer for gradients, overlays, blur, one-off transforms, campaign visuals, non-whitelisted decorative effects.

Output: `systemLayer` + `brandLayer` + `unsupportedDecorativeLayer`

### Phase 6: Audit and Backlog
Every parse generates a report: mapped nodes, wrapper candidates, unsupported classes, unknown arbitrary values, token candidates, variant candidates, recipe candidates, nodes requiring manual review.

Turns parser work into framework roadmap input.

## Mapping Rules

| Bucket | Maps to | Examples |
|---|---|---|
| Structural | Direct utility props | spacing, layout, width/height, container, flex/grid, position |
| Semantic | Tokens or variants | `bg-card`, `text-muted-foreground`, named utilities |
| Decorative | Stays outside core layer | gradient overlays, backdrop blur, hover zooms, atmospheric treatments |
| Unknown | Must be reported | unsupported arbitrary values, raw custom classes, ambiguous patterns |

## Implementation Order

1. HTML parser wrapper
2. Class classifier using parser contract
3. Fixture runner against parser-fixtures
4. Normalized AST pass
5. Simple primitive mapping for layout + typography
6. Wrapper inference for repeated patterns
7. Audit report emitter
8. Code generator

Steps 1-3 are implemented. Steps 4+ are future work.

## Success Criteria

- Reference fixtures classify correctly
- Mixed nodes split cleanly across structural/semantic/decorative
- Hero/card/container patterns normalize reliably
- Structural utilities convert into safe props
- Decorative layers remain separable
- Unknowns are visible and actionable

## Non-Goals (First Version)

- Perfect visual equivalence
- Full arbitrary Tailwind support
- Automatic conversion of every custom animation
- Guessing business semantics with no structural signal

First version optimizes for safety, explainability, deterministic conversion, and backlog generation.
