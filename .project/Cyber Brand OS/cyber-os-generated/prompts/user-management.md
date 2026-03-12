# Cyber OS User Management Prompt

Use this kit as the source-of-truth contract for building Cyber OS surfaces with UI8kit primitives plus a brand overlay layer.

## Attach
- `cyber-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- userStats: {{userStats}}
- filters: {{filters}}
- userTable: {{userTable}}
- rolePanel: {{rolePanel}}

## Optional Inputs
- user-managementAudience: {{user-managementAudience}}
- user-managementTone: {{user-managementTone}}
- user-managementConstraints: {{user-managementConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Review users, roles, invitations, and account health with table-first clarity.

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
- user-stats
- filters
- user-table
- role-panel

## Surface Overrides
- Use Cyber OS shapes and spacing consistently on user-management.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does user-management keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a user-management surface in the Cyber OS style.

Treat `cyber-os.schema.json` as the source-of-truth brand contract.

Brand summary: Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.
Surface goal: Review users, roles, invitations, and account health with table-first clarity.

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
- Use Cyber OS shapes and spacing consistently on user-management.
- Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- userStats: {{userStats}}
- filters: {{filters}}
- userTable: {{userTable}}
- rolePanel: {{rolePanel}}

Optional inputs:
- user-managementAudience: {{user-managementAudience}}
- user-managementTone: {{user-managementTone}}
- user-managementConstraints: {{user-managementConstraints}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- user-stats
- filters
- user-table
- role-panel

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Review users, roles, invitations, and account health with table-first clarity.
Suggested required sections: user-stats, filters, user-table, role-panel

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a user management in Cyber OS.
- Input: {{userStats}}
- Input: {{filters}}
- Input: {{userTable}}
- Input: {{rolePanel}}
- Return an implementation plan and component mapping.
- Keep semantic layers clear and reusable.

Audit before finishing:
- Does user-management keep the same brand language as other surfaces?
- Are semantic tokens used before decorative utilities?
- Is the surface easy to scan and action-focused?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
