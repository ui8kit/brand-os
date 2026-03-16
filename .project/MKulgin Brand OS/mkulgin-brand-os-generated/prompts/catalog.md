# MKulgin Brand OS Catalog Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- catalogHero: {{catalogHero}}
- participantFilters: {{participantFilters}}
- participantGrid: {{participantGrid}}
- submitCta: {{submitCta}}

## Optional Inputs
- catalogAudience: {{catalogAudience}}
- catalogTone: {{catalogTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Curated B2B catalog of community participants: services, products, teams, studios, experts, founders. A trusted professional network showcase.

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
- catalog-hero
- participant-filters
- participant-grid
- submit-cta

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on catalog.
- Participant cards: name, what they do, product, who it helps, category, city, contacts, status.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does catalog keep the same brand language as other surfaces?
- Are participant cards structured and evidence-heavy?
- Is the submit CTA clear but restrained?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a catalog surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: Curated B2B catalog of community participants: services, products, teams, studios, experts, founders. A trusted professional network showcase.

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
- Use MKulgin Brand OS shapes and spacing consistently on catalog.
- Participant cards: name, what they do, product, who it helps, category, city, contacts, status.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- catalogHero: {{catalogHero}}
- participantFilters: {{participantFilters}}
- participantGrid: {{participantGrid}}
- submitCta: {{submitCta}}

Optional inputs:
- catalogAudience: {{catalogAudience}}
- catalogTone: {{catalogTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- catalog-hero
- participant-filters
- participant-grid
- submit-cta

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Curated B2B catalog of community participants: services, products, teams, studios, experts, founders. A trusted professional network showcase.
Suggested required sections: catalog-hero, participant-filters, participant-grid, submit-cta

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a catalog page in MKulgin Brand OS.
- Input: {{catalogHero}}
- Input: {{participantFilters}}
- Input: {{participantGrid}}
- Input: {{submitCta}}
- Return an implementation plan and component mapping.

Audit before finishing:
- Does catalog keep the same brand language as other surfaces?
- Are participant cards structured and evidence-heavy?
- Is the submit CTA clear but restrained?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
