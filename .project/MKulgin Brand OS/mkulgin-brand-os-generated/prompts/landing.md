# MKulgin Brand OS Landing Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- editorialHero: {{editorialHero}}
- pathTimeline: {{pathTimeline}}
- positioningStrip: {{positioningStrip}}
- usefulnessBlock: {{usefulnessBlock}}
- latestMaterials: {{latestMaterials}}
- latestVideo: {{latestVideo}}
- contentPillars: {{contentPillars}}
- communityPreview: {{communityPreview}}
- catalogPreview: {{catalogPreview}}
- projectDirectory: {{projectDirectory}}
- grantsPreview: {{grantsPreview}}
- mediaMentions: {{mediaMentions}}
- newsletterPanel: {{newsletterPanel}}
- finalCtaBlock: {{finalCtaBlock}}

## Optional Inputs
- landingAudience: {{landingAudience}}
- landingTone: {{landingTone}}
- landingConstraints: {{landingConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Introduce Maksim Kulgin as the central node of a tech-media hub: journal, community club, catalog, and ecosystem. Hero with portrait and thesis, path timeline, proof, and clear CTAs.

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
- editorial-hero
- path-timeline
- positioning-strip
- usefulness-block
- latest-materials
- latest-video
- content-pillars
- community-preview
- catalog-preview
- project-directory
- grants-preview
- media-mentions
- newsletter-panel
- final-cta-block

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on landing.
- Paper-like backgrounds, steel blue structural accents, restrained copper highlights (strokes only, never large planes), calm editorial typography, mono evidence fragments, network routes and index markers.
- Path timeline: sysadmin -> e-commerce -> startups -> data/antibot/community.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does landing keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a landing surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: Introduce Maksim Kulgin as the central node of a tech-media hub: journal, community club, catalog, and ecosystem. Hero with portrait and thesis, path timeline, proof, and clear CTAs.

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
- Use MKulgin Brand OS shapes and spacing consistently on landing.
- Paper-like backgrounds, steel blue structural accents, restrained copper highlights (strokes only, never large planes), calm editorial typography, mono evidence fragments, network routes and index markers.
- Path timeline: sysadmin -> e-commerce -> startups -> data/antibot/community.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- editorialHero: {{editorialHero}}
- pathTimeline: {{pathTimeline}}
- positioningStrip: {{positioningStrip}}
- usefulnessBlock: {{usefulnessBlock}}
- latestMaterials: {{latestMaterials}}
- latestVideo: {{latestVideo}}
- contentPillars: {{contentPillars}}
- communityPreview: {{communityPreview}}
- catalogPreview: {{catalogPreview}}
- projectDirectory: {{projectDirectory}}
- grantsPreview: {{grantsPreview}}
- mediaMentions: {{mediaMentions}}
- newsletterPanel: {{newsletterPanel}}
- finalCtaBlock: {{finalCtaBlock}}

Optional inputs:
- landingAudience: {{landingAudience}}
- landingTone: {{landingTone}}
- landingConstraints: {{landingConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- editorial-hero
- path-timeline
- positioning-strip
- usefulness-block
- latest-materials
- latest-video
- content-pillars
- community-preview
- catalog-preview
- project-directory
- grants-preview
- media-mentions
- newsletter-panel
- final-cta-block

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Introduce Maksim Kulgin as the central node of a tech-media hub: journal, community club, catalog, and ecosystem. Hero with portrait and thesis, path timeline, proof, and clear CTAs.
Suggested required sections: editorial-hero, path-timeline, positioning-strip, usefulness-block, latest-materials, latest-video, content-pillars, community-preview, catalog-preview, project-directory, grants-preview, media-mentions, newsletter-panel, final-cta-block

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a landing in MKulgin Brand OS.
- Input: {{editorialHero}}
- Input: {{pathTimeline}}
- Input: {{positioningStrip}}
- Input: {{usefulnessBlock}}
- Input: {{latestMaterials}}
- Input: {{latestVideo}}
- Input: {{contentPillars}}
- Input: {{communityPreview}}
- Input: {{catalogPreview}}
- Input: {{projectDirectory}}
- Input: {{grantsPreview}}
- Input: {{mediaMentions}}
- Input: {{newsletterPanel}}
- Input: {{finalCtaBlock}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does landing keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
