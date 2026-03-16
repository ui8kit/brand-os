# MKulgin Brand OS Community Prompt

Use this kit as the source-of-truth contract for building Maksim Kulgin's tech-media hub: journal, community club, participant catalog, and ecosystem. Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent.

## Attach
- `mkulgin-brand-os.schema.json`
- Optionally attach any copied adapter assets from this generated kit that match the target stack.

## Required Inputs
- communityHero: {{communityHero}}
- channelList: {{channelList}}
- pinnedThreads: {{pinnedThreads}}
- topicRooms: {{topicRooms}}
- digestPreview: {{digestPreview}}
- newsletterPanel: {{newsletterPanel}}

## Optional Inputs
- communityAudience: {{communityAudience}}
- communityTone: {{communityTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

## Surface Goal
Club space for systematic people: topic channels, weekly digest, pinned threads, archivable discussions. Not a chat clone — a smart club space where discussions can be read and found.

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
- community-hero
- channel-list
- pinned-threads
- topic-rooms
- digest-preview
- newsletter-panel

## Surface Overrides
- Use MKulgin Brand OS shapes and spacing consistently on community.
- Club tone: structured, archivable, topic-aware. No Telegram UI clone.

## Deliverables
- surface architecture
- visual grammar
- implementation-ready output

## Audit Checklist
- Does community keep the same brand language as other surfaces?
- Is it a club space, not a chat clone?
- Are discussions archivable and findable?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.

## Copy-Ready Prompt
```text
Design a community surface in the MKulgin Brand OS style.

Treat `mkulgin-brand-os.schema.json` as the source-of-truth brand contract.

Brand summary: MKulgin Brand OS: tech-media hub (journal + community club + catalog + ecosystem). Baltic Tech Editorial + Network Operator Journal + Amber accent. Cold tech base with warm human accent. System Operator + Founder Publisher archetype.
Surface goal: Club space for systematic people: topic channels, weekly digest, pinned threads, archivable discussions. Not a chat clone — a smart club space where discussions can be read and found.

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
- Use MKulgin Brand OS shapes and spacing consistently on community.
- Club tone: structured, archivable, topic-aware. No Telegram UI clone.

Implementation target:
- Tailwind CSS + shadcn-compatible system components

Required inputs:
- communityHero: {{communityHero}}
- channelList: {{channelList}}
- pinnedThreads: {{pinnedThreads}}
- topicRooms: {{topicRooms}}
- digestPreview: {{digestPreview}}
- newsletterPanel: {{newsletterPanel}}

Optional inputs:
- communityAudience: {{communityAudience}}
- communityTone: {{communityTone}}
- accessibilityRequirements: {{accessibilityRequirements}}

Expected sections:
- community-hero
- channel-list
- pinned-threads
- topic-rooms
- digest-preview
- newsletter-panel

Deliverables:
- surface architecture
- visual grammar
- implementation-ready output

Suggested page purpose: Club space for systematic people: topic channels, weekly digest, pinned threads, archivable discussions. Not a chat clone — a smart club space where discussions can be read and found.
Suggested required sections: community-hero, channel-list, pinned-threads, topic-rooms, digest-preview, newsletter-panel

Now follow this working sequence:
1. Read the audience and product goal.
2. Define the information architecture and section order.
3. Define the visual grammar: typography, spacing, surfaces, shape language, and motion stance.
4. Decide what stays standard in the system layer, what should be wrapped, and what should become a custom block.
5. Generate the requested implementation in a coherent brand system style.

Reference prompt instructions:
- Design a community page in MKulgin Brand OS.
- Input: {{communityHero}}
- Input: {{channelList}}
- Input: {{pinnedThreads}}
- Input: {{topicRooms}}
- Input: {{digestPreview}}
- Input: {{newsletterPanel}}
- Return an implementation plan and component mapping.

Audit before finishing:
- Does community keep the same brand language as other surfaces?
- Is it a club space, not a chat clone?
- Are discussions archivable and findable?
- List what stays system-level and what becomes a custom wrapper.
- Check that reusable components are named and repeatable.
- Remove redundant motion and decorative noise where possible.
```
