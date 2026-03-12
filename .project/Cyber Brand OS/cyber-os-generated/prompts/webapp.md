# Cyber OS Webapp Prompt

Use this kit as the source-of-truth contract for building Cyber OS surfaces with UI8kit primitives plus a brand overlay layer.

## Attach
- `cyber-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- workspaceShell: {{workspaceShell}}
- commandBar: {{commandBar}}
- dataTable: {{dataTable}}
- detailPanel: {{detailPanel}}

## Optional Inputs
- webappAudience: {{webappAudience}}
- webappTone: {{webappTone}}
- webappConstraints: {{webappConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Present the main product workspace with command-driven navigation, data tables, and contextual detail panels.

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
- data-table
- detail-panel

## Surface Overrides
- Use Cyber OS shapes and spacing consistently on webapp.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does webapp keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a webapp surface in the Cyber OS style.

Treat `cyber-os.schema.json` as the source-of-truth brand contract.

Brand summary: Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.
Surface goal: Present the main product workspace with command-driven navigation, data tables, and contextual detail panels.

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
- Use Cyber OS shapes and spacing consistently on webapp.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- workspaceShell: {{workspaceShell}}
- commandBar: {{commandBar}}
- dataTable: {{dataTable}}
- detailPanel: {{detailPanel}}

Optional inputs:
- webappAudience: {{webappAudience}}
- webappTone: {{webappTone}}
- webappConstraints: {{webappConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- workspace-shell
- command-bar
- data-table
- detail-panel

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Present the main product workspace with command-driven navigation, data tables, and contextual detail panels.
Suggested required sections: workspace-shell, command-bar, data-table, detail-panel

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a webapp in Cyber OS.
- Input: {{workspaceShell}}
- Input: {{commandBar}}
- Input: {{dataTable}}
- Input: {{detailPanel}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does webapp keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
