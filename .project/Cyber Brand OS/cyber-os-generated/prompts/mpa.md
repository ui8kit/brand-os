# Cyber OS Mpa Prompt

Use this kit as the source-of-truth contract for building Cyber OS surfaces with UI8kit primitives plus a brand overlay layer.

## Attach
- `cyber-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- pageHeader: {{pageHeader}}
- contentGrid: {{contentGrid}}
- resourceBand: {{resourceBand}}
- footerLinks: {{footerLinks}}

## Optional Inputs
- mpaAudience: {{mpaAudience}}
- mpaTone: {{mpaTone}}
- mpaConstraints: {{mpaConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Support a multipage marketing and resource site with strong hierarchy and repeatable shell patterns.

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
- page-header
- content-grid
- resource-band
- footer-links

## Surface Overrides
- Use Cyber OS shapes and spacing consistently on mpa.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does mpa keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a mpa surface in the Cyber OS style.

Treat `cyber-os.schema.json` as the source-of-truth brand contract.

Brand summary: Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.
Surface goal: Support a multipage marketing and resource site with strong hierarchy and repeatable shell patterns.

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
- Use Cyber OS shapes and spacing consistently on mpa.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- pageHeader: {{pageHeader}}
- contentGrid: {{contentGrid}}
- resourceBand: {{resourceBand}}
- footerLinks: {{footerLinks}}

Optional inputs:
- mpaAudience: {{mpaAudience}}
- mpaTone: {{mpaTone}}
- mpaConstraints: {{mpaConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- page-header
- content-grid
- resource-band
- footer-links

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Support a multipage marketing and resource site with strong hierarchy and repeatable shell patterns.
Suggested required sections: page-header, content-grid, resource-band, footer-links

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a mpa in Cyber OS.
- Input: {{pageHeader}}
- Input: {{contentGrid}}
- Input: {{resourceBand}}
- Input: {{footerLinks}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does mpa keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
