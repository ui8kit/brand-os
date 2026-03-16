# MKulgin Brand OS Events Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- eventsHero: {{eventsHero}}
- upcomingList: {{upcomingList}}
- archiveList: {{archiveList}}
- newsletterPanel: {{newsletterPanel}}

## Optional Inputs
- eventsAudience: {{eventsAudience}}
- eventsTone: {{eventsTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Announcements, AMA, online/offline meetings, community gatherings.

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
- events-hero
- upcoming-list
- archive-list
- newsletter-panel

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on events.
- Chronological, clean, archivable.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does events keep the same brand language as other surfaces?
- Are upcoming and archive lists clear?
- Is the layout chronological?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a events surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: Announcements, AMA, online/offline meetings, community gatherings.

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
- Use MKulgin Brand OS shapes and spacing consistently on events.
- Chronological, clean, archivable.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- eventsHero: {{eventsHero}}
- upcomingList: {{upcomingList}}
- archiveList: {{archiveList}}
- newsletterPanel: {{newsletterPanel}}

Optional inputs:
- eventsAudience: {{eventsAudience}}
- eventsTone: {{eventsTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- events-hero
- upcoming-list
- archive-list
- newsletter-panel

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Announcements, AMA, online/offline meetings, community gatherings.
Suggested required sections: events-hero, upcoming-list, archive-list, newsletter-panel

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design an events page in MKulgin Brand OS.
- Input: {{eventsHero}}
- Input: {{upcomingList}}
- Input: {{archiveList}}
- Input: {{newsletterPanel}}
- Return an implementation plan and component mapping.

Audit before finishing:
- Does events keep the same brand language as other surfaces?
- Are upcoming and archive lists clear?
- Is the layout chronological?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
