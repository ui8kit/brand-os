# MKulgin Brand OS About Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- aboutHero: {{aboutHero}}
- narrativeBio: {{narrativeBio}}
- timeline: {{timeline}}
- principles: {{principles}}
- proofStrip: {{proofStrip}}

## Optional Inputs
- aboutAudience: {{aboutAudience}}
- aboutTone: {{aboutTone}}
- aboutConstraints: {{aboutConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Explain the biography, values, and working philosophy behind the brand without hype or self-mythologizing.

## Brand Summary
MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.

## Style Keywords
- calm
- mature
- editorial
- practical
- skeptical-of-hype
- system-driven
- humanly-warm
- honest

## Negative Style Keywords
- generic-saas-gloss
- neon-cyberpunk
- infobusiness-guru
- startup-hype-machine
- over-polished-luxury
- performative-edginess

## Cross-Surface Rules
- guru language
- visionary cliches
- thought leadership filler
- fake disruption rhetoric
- pretending failure does not exist
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

## Section Expectations
- about-hero
- narrative-bio
- timeline
- principles
- proof-strip

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on about.
- Paper-like backgrounds, steel blue structural accents, restrained copper highlights, calm editorial typography, mono evidence fragments, and low-noise layouts with clear hierarchy.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does about keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a about surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: Explain the biography, values, and working philosophy behind the brand without hype or self-mythologizing.

Style keywords:
- calm
- mature
- editorial
- practical
- skeptical-of-hype
- system-driven
- humanly-warm
- honest

Avoid:
- generic-saas-gloss
- neon-cyberpunk
- infobusiness-guru
- startup-hype-machine
- over-polished-luxury
- performative-edginess

Cross-surface rules:
- guru language
- visionary cliches
- thought leadership filler
- fake disruption rhetoric
- pretending failure does not exist
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

Surface-specific overrides:
- Use MKulgin Brand OS shapes and spacing consistently on about.
- Paper-like backgrounds, steel blue structural accents, restrained copper highlights, calm editorial typography, mono evidence fragments, and low-noise layouts with clear hierarchy.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- aboutHero: {{aboutHero}}
- narrativeBio: {{narrativeBio}}
- timeline: {{timeline}}
- principles: {{principles}}
- proofStrip: {{proofStrip}}

Optional inputs:
- aboutAudience: {{aboutAudience}}
- aboutTone: {{aboutTone}}
- aboutConstraints: {{aboutConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- about-hero
- narrative-bio
- timeline
- principles
- proof-strip

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Explain the biography, values, and working philosophy behind the brand without hype or self-mythologizing.
Suggested required sections: about-hero, narrative-bio, timeline, principles, proof-strip

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a about in MKulgin Brand OS.
- Input: {{aboutHero}}
- Input: {{narrativeBio}}
- Input: {{timeline}}
- Input: {{principles}}
- Input: {{proofStrip}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does about keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
