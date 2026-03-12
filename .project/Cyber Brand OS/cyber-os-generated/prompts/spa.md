# Cyber OS Spa Prompt

Use this kit as the source-of-truth contract for building Cyber OS surfaces with UI8kit primitives plus a brand overlay layer.

## Attach
- `cyber-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- workspaceShell: {{workspaceShell}}
- commandBar: {{commandBar}}
- routeView: {{routeView}}
- inspectorPanel: {{inspectorPanel}}

## Optional Inputs
- spaAudience: {{spaAudience}}
- spaTone: {{spaTone}}
- spaConstraints: {{spaConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Support fast route changes and stateful workflows inside a single-page application shell.

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
- workspace-shell
- command-bar
- route-view
- inspector-panel

## Surface Overrides
- Use Cyber OS shapes and spacing consistently on spa.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does spa keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a spa surface in the Cyber OS style.

Treat `cyber-os.schema.json` as the source-of-truth brand contract.

Brand summary: Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.
Surface goal: Support fast route changes and stateful workflows inside a single-page application shell.

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
- Use Cyber OS shapes and spacing consistently on spa.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- workspaceShell: {{workspaceShell}}
- commandBar: {{commandBar}}
- routeView: {{routeView}}
- inspectorPanel: {{inspectorPanel}}

Optional inputs:
- spaAudience: {{spaAudience}}
- spaTone: {{spaTone}}
- spaConstraints: {{spaConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- workspace-shell
- command-bar
- route-view
- inspector-panel

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Support fast route changes and stateful workflows inside a single-page application shell.
Suggested required sections: workspace-shell, command-bar, route-view, inspector-panel

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a spa in Cyber OS.
- Input: {{workspaceShell}}
- Input: {{commandBar}}
- Input: {{routeView}}
- Input: {{inspectorPanel}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does spa keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
