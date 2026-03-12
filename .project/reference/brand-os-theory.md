# Brand Operating System Theory

Internal reference for the architecture behind `schema.json`. This document explains why each layer exists and what problem it solves.

## Core Idea

Brand is not color. Brand is the combined effect of strategic intent, emotional promise, typography, spacing, surfaces, shape language, imagery, motion, content voice, component behavior, and composition patterns.

If those rules are not explicit, the brand exists only in the memory of the person who made the first good screen.

Brand becomes scalable when it is stored as strategy + semantics + tokens + grammar + recipes + rules for extension — not as a moodboard, a CSS file, or one successful homepage.

## The 10 Layers

### 1. Brand Thesis → `schema.brandThesis`

Define the brand in human terms before design terms.

- What should the brand feel like?
- What should it never feel like?
- What emotional promise does it make?

### 2. Audience Model → `schema.brandThesis.audienceProfiles`

Different audiences need different visual behavior. Influences density, clarity, proof, and CTA style.

- Primary and secondary audiences
- Trust threshold and device context
- Time-to-value expectation

### 3. Semantic Intent → `schema.semanticRoles`

Translate strategy into design roles before concrete colors.

- `primary`, `secondary`, `accent`, `muted` — emphasis roles
- `success`, `warning`, `destructive` — state roles
- Domain-specific roles (e.g. `promo`, `rating`, `category-*`)

### 4. Token System → `schema.tokens`

Machine-readable layer. Tokens describe meaning or measurable primitives.

Good names: `primary`, `surface-2`, `radius-xl`, `shadow-soft`
Bad names: `homepage-pink`, `pricing-card-special`, `hero-gradient-v3`

At minimum: neutrals, brand hues, semantic colors, spacing scale, radius scale, shadow scale, typography scale, motion durations, easing curves.

### 5. Typography → `schema.tokens.typography`

One of the strongest brand signals.

- Font families: display vs body vs UI vs mono
- Size scale, weight scale, line heights
- Surface overrides (landing uses display font, dashboard uses UI font)
- Anti-rules: avoid decorative type in utility contexts

### 6. Spatial Model → `schema.tokens.spacing`

Where consistency becomes visible.

- Container widths, section rhythm, component spacing
- Density modes per surface type
- If spacing is not systematized, every screen becomes a local opinion

### 7. Shape & Surface Language → `schema.designGrammar`

Defines physical character. Often more important than palette for distinctiveness.

- Radius language, border usage, shadow style
- Surface hierarchy, transparency policy
- Examples: "rounded warm editorial" vs "sharp precise technical" vs "soft elevated premium"

### 8. Composition Recipes → `schema.recipes`

The layer most teams skip. Named layout recipes convert taste into repeatable architecture.

**Page archetypes** — purpose + required sections for each surface type
**Section archetypes** — purpose + required slots + fixed traits for each reusable section

Each recipe defines: purpose, when to use, required content slots, spacing behavior, CTA behavior, what can vary, what must remain fixed.

### 9. Motion → `schema.tokens.motion`

Motion should express personality and improve comprehension.

- Default durations and easing family
- Hover, reveal, and section entrance rules
- Reduced-motion behavior
- Motion should be governed like typography, not sprinkled like glitter

### 10. Governance → `schema.evolutionRules`

How to extend the system without breaking it.

- When to add a token (stable meaning + repeats across surfaces + survives light/dark)
- When to add a variant (stable behavior + repeats across screens)
- When to create a recipe (pattern appears in more than one screen)
- When to keep something as one-off decoration (campaign-only, no stable meaning)

## Three Output Layers

### System outputs (stable, reusable)
Design tokens, component variants, spacing/type scales, motion primitives.

### Pattern outputs (reusable compositions)
Section recipes, hero patterns, card patterns, CTA patterns.

### Campaign outputs (flexible, seasonal)
Promo gradients, launch visuals, event treatments. Must never pollute the core system.

## Quality Checklist

**Strategy:** Audience model explicit? Emotional promise explicit? Anti-adjectives explicit?
**Semantics:** Color roles semantic? CTA hierarchy defined? State roles defined?
**Visual grammar:** Real type scale? Spacing governed? Density intentional? Shape consistent?
**Composition:** Section archetypes named? Page archetypes defined? Recurring blocks wrapped?
**Motion:** Durations standardized? Reduced motion considered? Motion tied to purpose?
**Governance:** Process for extending tokens? Rule for adding variants? Way to reject brand-breaking one-offs?
