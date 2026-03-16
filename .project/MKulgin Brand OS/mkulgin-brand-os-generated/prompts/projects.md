# MKulgin Brand OS Projects Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- projectsHero: {{projectsHero}}
- projectDirectory: {{projectDirectory}}
- caseGrid: {{caseGrid}}
- proofMetrics: {{proofMetrics}}

## Optional Inputs
- projectsAudience: {{projectsAudience}}
- projectsTone: {{projectsTone}}
- projectsConstraints: {{projectsConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Show products, services, and business cases as evidence of operating experience rather than startup theater.

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
- projects-hero
- project-directory
- case-grid
- proof-metrics

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on projects.
- Paper-like backgrounds, steel blue structural accents, restrained copper highlights, calm editorial typography, mono evidence fragments, and low-noise layouts with clear hierarchy.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does projects keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a projects surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: Show products, services, and business cases as evidence of operating experience rather than startup theater.

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
- Use MKulgin Brand OS shapes and spacing consistently on projects.
- Paper-like backgrounds, steel blue structural accents, restrained copper highlights, calm editorial typography, mono evidence fragments, and low-noise layouts with clear hierarchy.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- projectsHero: {{projectsHero}}
- projectDirectory: {{projectDirectory}}
- caseGrid: {{caseGrid}}
- proofMetrics: {{proofMetrics}}

Optional inputs:
- projectsAudience: {{projectsAudience}}
- projectsTone: {{projectsTone}}
- projectsConstraints: {{projectsConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- projects-hero
- project-directory
- case-grid
- proof-metrics

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Show products, services, and business cases as evidence of operating experience rather than startup theater.
Suggested required sections: projects-hero, project-directory, case-grid, proof-metrics

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a projects in MKulgin Brand OS.
- Input: {{projectsHero}}
- Input: {{projectDirectory}}
- Input: {{caseGrid}}
- Input: {{proofMetrics}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does projects keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
