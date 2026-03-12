# Cyber OS Docs Prompt

Use this kit as the source-of-truth contract for building Cyber OS surfaces with UI8kit primitives plus a brand overlay layer.

## Attach
- `cyber-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- docsHero: {{docsHero}}
- sidebarNav: {{sidebarNav}}
- content: {{content}}
- toc: {{toc}}
- prevNext: {{prevNext}}

## Optional Inputs
- docsAudience: {{docsAudience}}
- docsTone: {{docsTone}}
- docsConstraints: {{docsConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Document data flows, component rules, and brand usage with a clear reading structure and fast navigation.

## Brand Summary
Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.

## Style Keywords
- bold
- confident
- high-contrast
- data-native
- precise
- operator-friendly
- cinematic-tech
- clear

## Negative Style Keywords
- generic-saas-template
- neon-cyberpunk-cliche
- glassmorphism-everywhere
- over-decorated
- toy-dashboard
- soft-lifestyle-brand

## Cross-Surface Rules
- confusing jargon
- buzzword-heavy AI copy
- cute microcopy on admin surfaces
- marketing slogans in data tables
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

## Section Expectations
- docs-hero
- sidebar-nav
- content
- toc
- prev-next

## Surface Overrides
- Use Cyber OS shapes and spacing consistently on docs.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does docs keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a docs surface in the Cyber OS style.

Treat `cyber-os.schema.json` as the source-of-truth brand contract.

Brand summary: Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.
Surface goal: Document data flows, component rules, and brand usage with a clear reading structure and fast navigation.

Style keywords:
- bold
- confident
- high-contrast
- data-native
- precise
- operator-friendly
- cinematic-tech
- clear

Avoid:
- generic-saas-template
- neon-cyberpunk-cliche
- glassmorphism-everywhere
- over-decorated
- toy-dashboard
- soft-lifestyle-brand

Cross-surface rules:
- confusing jargon
- buzzword-heavy AI copy
- cute microcopy on admin surfaces
- marketing slogans in data tables
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

Surface-specific overrides:
- Use Cyber OS shapes and spacing consistently on docs.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- docsHero: {{docsHero}}
- sidebarNav: {{sidebarNav}}
- content: {{content}}
- toc: {{toc}}
- prevNext: {{prevNext}}

Optional inputs:
- docsAudience: {{docsAudience}}
- docsTone: {{docsTone}}
- docsConstraints: {{docsConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- docs-hero
- sidebar-nav
- content
- toc
- prev-next

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Document data flows, component rules, and brand usage with a clear reading structure and fast navigation.
Suggested required sections: docs-hero, sidebar-nav, content, toc, prev-next

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a docs in Cyber OS.
- Input: {{docsHero}}
- Input: {{sidebarNav}}
- Input: {{content}}
- Input: {{toc}}
- Input: {{prevNext}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does docs keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
