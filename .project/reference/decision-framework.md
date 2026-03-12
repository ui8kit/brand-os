# Design Decision Framework

How to make design decisions in the right order, for any interface type.

## The Decision Stack

Decisions should happen in this order. Skipping ahead produces generic or chaotic results.

### 1. Product and audience
- What is the product? Who is the user?
- What does the user care about? What do they fear?
- How much trust is needed before conversion?

### 2. Landing/surface objective
- Pick ONE primary job: explain, convert, onboard, manage, inform, entertain
- If there are three primary goals, there are zero primary goals

### 3. Information architecture
- Section sequence before styling
- Each section must answer a user question or remove a conversion objection
- Do not add sections because competitors have them

### 4. Design grammar
- Spacing rhythm, density, radius language, shadow policy
- Typography pair, image treatment, CTA hierarchy, motion personality
- Without this layer, the result becomes a pile of nice components with no shared voice

### 5. System mapping
- What stays as standard UI primitives
- What gets branded wrappers
- What becomes custom sections
- What stays as one-off decoration

### 6. Motion threshold
- Is motion improving the message or only decorating it?
- Motion ladder: CSS-only → subtle entrance → narrative transitions → interactive brand motion

### 7. Implementation detail
- Only after the previous decisions should you care about exact class strings or component names

## Three-Layer Model

Use on every surface to separate concerns.

### Layer 1: System layer
Stable UI infrastructure: button behavior, form states, dialog mechanics, accordion, tabs.
Keep standard. Theme, extend variants, wrap — but do not reinvent for novelty.

### Layer 2: Brand layer
Visual language that makes the surface recognizable: typography, surfaces, radius, image framing, depth, accent strategy, section rhythm.
This is where identity lives.

### Layer 3: Campaign/decor layer
Flexible parts that should not pollute the core system: gradients, glows, background ornaments, promo ribbons, seasonal treatments.

## Where Uniqueness Comes From

If a surface feels generic, the problem is usually not the component library. Uniqueness comes from:

1. **Typography** — pairing, scale, contrast, voice
2. **Composition** — section ordering, content width, density
3. **Surface language** — cards vs panels vs open sections, background blocks, border/shadow personality
4. **Image strategy** — product-first, editorial, illustrative, abstract
5. **CTA ritual** — one clear primary action, how secondary actions are framed
6. **Motion** — reveal, hover, emphasis, narrative transitions

## When to Wrap Early

Create branded wrappers when a pattern appears more than once or is central to identity: `SectionHeader`, `HeroShell`, `FeatureCard`, `ProofStrip`, `MetricCard`.

If you can point to it and say "that is our [name] shell", it deserves a component name.

## When to Extend Variants

Add new variants only when the meaning is stable and reusable.

Good: `Button variant="promo"`, `Badge variant="success"`, `Card variant="feature"`
Bad: `Button variant="launch-gradient-v2"`, `Card variant="homepage-special-shadow"`

Rule: tokens encode meaning, variants encode component behavior, one-off art direction stays outside the core system.

## Motion Decision Ladder

| Level | When to use | Tools |
|---|---|---|
| 0: No motion | Static pages, strong narrative, performance priority | CSS transitions only |
| 1: Subtle | Perceived polish, card/CTA emphasis, restrained scroll reveal | CSS transitions + animations |
| 2: Narrative | Product storytelling depends on sequence, state transforms, comparison patterns | Animation library |
| 3: Interactive | Brand identity genuinely depends on motion, accessible, degrades gracefully | Full motion system |

Motion is a mistake when: layout is weak and motion is camouflage, everything animates equally, delays slow comprehension, hero motion competes with CTA, reduced motion is ignored.

## Build Order

### Phase 1: Strategy — audience, value prop, primary CTA, section sequence, trust needs
### Phase 2: Grammar — type pair, scale, spacing, radius, surfaces, accent, image, motion
### Phase 3: Mapping — standard primitives vs wrappers vs custom sections vs decoration
### Phase 4: Static layout — build without motion first
### Phase 5: Polish — variants, states, hover, responsive, accessibility
### Phase 6: Motion — only where it improves comprehension or brand character

## Red Flags

- Every section is a boxed card
- Every button has custom overrides
- Hero copy is generic and interchangeable
- Gradients used to fake distinctiveness
- No hierarchy between primary and secondary CTA
- Too many arbitrary values
- Motion appears before composition is stable
- Same visual pattern copied manually instead of wrapped

## Quality Checks Before Building

1. What should the user understand in 5 seconds?
2. What is the one action the page wants?
3. What is the brand mood?
4. What gives this page identity besides color?
5. Which sections are necessary vs inherited from cliches?
6. Which primitives should stay standard?
7. Which patterns deserve named wrappers?
8. Would the layout still work if all animations disappeared?
