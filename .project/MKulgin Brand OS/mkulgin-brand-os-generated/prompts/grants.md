# MKulgin Brand OS Grants Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- grantsHero: {{grantsHero}}
- contentPillars: {{contentPillars}}
- articleList: {{articleList}}
- quoteCallout: {{quoteCallout}}
- newsletterPanel: {{newsletterPanel}}

## Optional Inputs
- grantsAudience: {{grantsAudience}}
- grantsTone: {{grantsTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
How to prepare applications, real mistakes, win/loss stories, fund breakdowns, materials for founders, templates and checklists.

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
- grants-hero
- content-pillars
- article-list
- quote-callout
- newsletter-panel

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on grants.
- Amber accent for grants highlights, badges, practical emphasis.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does grants keep the same brand language as other surfaces?
- Is amber accent used for grants highlights?
- Is content practical and evidence-based?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a grants surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: How to prepare applications, real mistakes, win/loss stories, fund breakdowns, materials for founders, templates and checklists.

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
- Use MKulgin Brand OS shapes and spacing consistently on grants.
- Amber accent for grants highlights, badges, practical emphasis.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- grantsHero: {{grantsHero}}
- contentPillars: {{contentPillars}}
- articleList: {{articleList}}
- quoteCallout: {{quoteCallout}}
- newsletterPanel: {{newsletterPanel}}

Optional inputs:
- grantsAudience: {{grantsAudience}}
- grantsTone: {{grantsTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- grants-hero
- content-pillars
- article-list
- quote-callout
- newsletter-panel

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: How to prepare applications, real mistakes, win/loss stories, fund breakdowns, materials for founders, templates and checklists.
Suggested required sections: grants-hero, content-pillars, article-list, quote-callout, newsletter-panel

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a grants page in MKulgin Brand OS.
- Input: {{grantsHero}}
- Input: {{contentPillars}}
- Input: {{articleList}}
- Input: {{quoteCallout}}
- Input: {{newsletterPanel}}
- Return an implementation plan and component mapping.

Audit before finishing:
- Does grants keep the same brand language as other surfaces?
- Is amber accent used for grants highlights?
- Is content practical and evidence-based?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
