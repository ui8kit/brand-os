# Cyber OS — Brand Brief

Dark-first data hub brand system for CRUD admin, docs, dashboards, and launch surfaces built on UI8kit with a Better Stack-inspired cyber utility aesthetic.

## Brand Thesis

Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.

**Promise:** Turn raw JSON data, CRUD flows, and system operations into a branded interface layer that feels premium, fast, and coherent.

**Positioning:** A dark-first interface system for data hubs and internal tools that merges Better Stack-style launch polish with practical UI8kit system components.

**Personality:** bold, confident, high-contrast, data-native, precise, operator-friendly, cinematic-tech

**Anti-personality (NEVER):** generic-saas-template, neon-cyberpunk-cliche, glassmorphism-everywhere, over-decorated, toy-dashboard, soft-lifestyle-brand

**Voice tone:** clear, technical-without-jargon, confident, direct, operator-friendly

**Voice avoid:** corporate jargon, marketing fluff on operational surfaces, cheap urgency language, overhyped AI claims, vague labels that hide the data model

## Design Tokens

### Typography

- Display: `Geist, Inter, system-ui, sans-serif`
- Body: `Inter, system-ui, sans-serif`
- UI: `Inter, system-ui, sans-serif`
- Mono: `"JetBrains Mono", ui-monospace, SFMono-Regular, monospace`

### Type Scale

- 2xs: `12px`
- xs: `13px`
- sm: `14px`
- base: `16px`
- md: `18px`
- lg: `20px`
- hero-sm: `28px`
- hero-md: `40px`
- hero-lg: `53px`

### Line Heights

- flat: `100%`
- tight: `108%`
- snug: `120%`
- normal: `145%`
- relaxed: `160%`

### Tracking

- tight: `-0.02em`
- normal: `-0.01em`
- micro: `-0.16px`

### Typography Surface Overrides

- dashboard: display=`Inter, system-ui, sans-serif`
- docs: display=`Inter, system-ui, sans-serif`, body=`Inter, system-ui, sans-serif`
- tech-blog: display=`Geist, Inter, system-ui, sans-serif`, body=`Inter, system-ui, sans-serif`

### Colors (light)

- primary: `233 88% 67%`
- primaryForeground: `0 0% 100%`
- secondary: `225 29% 95%`
- accent: `231 92% 95%`
- muted: `226 29% 94%`
- background: `220 35% 98%`
- foreground: `226 24% 14%`
- border: `226 22% 88%`
- destructive: `0 84% 60%`

### Colors (dark)

- primary: `233 88% 73%`
- primaryForeground: `0 0% 100%`
- secondary: `230 17% 17%`
- accent: `233 42% 19%`
- muted: `229 14% 18%`
- background: `229 29% 7%`
- foreground: `221 39% 91%`
- border: `227 18% 22%`
- destructive: `0 72% 58%`

### Chart Colors

- 1: `233 88% 73%`
- 2: `206 79% 61%`
- 3: `148 44% 45%`
- 4: `273 68% 66%`
- 5: `40 82% 56%`

### Category Colors

- data: light=`206 74% 71%`, dark=`206 54% 44%`, aliases=json, records
- analytics: light=`152 31% 70%`, dark=`152 30% 38%`, aliases=metrics, charts
- governance: light=`24 40% 66%`, dark=`24 36% 42%`, aliases=roles, permissions
- ai: light=`274 46% 75%`, dark=`274 36% 45%`, aliases=assistant, automation
- design: light=`334 44% 76%`, dark=`334 35% 44%`, aliases=tokens, brand
- security: light=`60 36% 72%`, dark=`60 30% 41%`, aliases=audit, access

### Radius

- xs: `2px`
- sm: `4px`
- md: `6px`
- lg: `8px`
- xl: `12px`
- media: `1rem`
- shell: `1.5rem`
- pill: `9999px`

### Shadow

- none: `none`
- soft: `0 4px 20px -4px hsl(229 29% 4% / 0.10)`
- elevated: `0 20px 40px -10px hsl(229 29% 4% / 0.15)`
- floating: `0 4px 12px -2px hsl(229 29% 4% / 0.15)`

### Spacing

- baseUnit: `4`

### Spacing Scale

- 0: `0`
- 1: `0.25rem`
- 2: `0.5rem`
- 3: `0.75rem`
- 4: `1rem`
- 5: `1.25rem`
- 6: `1.5rem`
- 8: `2rem`
- 10: `2.5rem`
- 12: `3rem`
- 15: `3.75rem`
- 16: `4rem`
- 24: `6rem`
- 32: `8rem`

### Section Rhythm

- landing: `6rem 0 6rem`
- dashboard: `2rem 0 2rem`
- docs: `2.5rem 0 2.5rem`
- admin: `2rem 0 2rem`
- auth: `4rem 0 4rem`

### Containers

- narrow: `720px`
- content: `950px`
- shell: `1110px`
- wide: `1280px`

### Motion

- durations: fast=`150ms`, normal=`300ms`, slow=`600ms`
- easings: standard=`cubic-bezier(0.4, 0, 0.2, 1)`, decelerate=`cubic-bezier(0, 0, 0.2, 1)`
- presets: cardHover={"duration":"600ms","easing":"cubic-bezier(0.4, 0, 0.2, 1)"}; fadeIn={"duration":"500ms","easing":"ease-out"}
- reducedMotion: disableEntranceAnimations=`true`, disableHoverTransforms=`true`

## Design Grammar

**Style direction:** dark-tech-cinematic

**Shape language:** Dark navy shells, precise indigo accents, restrained glass panels, compact controls, and bottom-anchored feature cards with cinematic image overlays.

**Surface treatment:** Public surfaces can use cinematic gradients and glass panels, while operational surfaces stay flatter, denser, and more system-like.
**Depth rule:** Use blur and elevated shadows mainly for navigation, overlays, and landing highlights; keep admin and data tables flatter.
**Accent rule:** Indigo is the primary action accent, but keep most surfaces neutral so charts, status chips, and CTA gradients stand out.
**Contrast rule:** Maintain strong text contrast on dark shells and reserve pure white for headings, CTAs, and mono highlights.

### Density Modes

- landing: comfortable
- dashboard: compact
- docs: comfortable
- admin: compact
- sms: compact
- user-management: compact
- login-auth: comfortable
- webapp: compact
- spa: compact
- mpa: comfortable
- tech-blog: relaxed

### Image Treatment

- Style: Product screenshots, dashboards, code snippets, and operator workflows with dark gradient fades at the bottom.
- Preferred: full-bleed product imagery, cropped dashboard screenshots, dark screenshots with indigo highlights, subtle grain or blur on backgrounds
- Avoid: bright stock photography, cartoon illustrations, overexposed screenshots, rainbow cyberpunk effects

### Content Voice

- Adjectives: clear, credible, fast, technical, operator-friendly, composed
- Avoid: confusing jargon, buzzword-heavy AI copy, cute microcopy on admin surfaces, marketing slogans in data tables

## Page Archetypes

### Landing

Purpose: Introduce Cyber OS as a central data hub and convert technical visitors into trying the product or exploring docs.

Sections: hero, logo-banner, feature-split, feature-card-grid, testimonials, cta

### Dashboard

Purpose: Give operators an at-a-glance overview of ingest volume, recent activity, health, and shortcuts.

Sections: stats-overview, charts, recent-activity, quick-actions

### Docs

Purpose: Document data flows, component rules, and brand usage with a clear reading structure and fast navigation.

Sections: docs-hero, sidebar-nav, content, toc, prev-next

### Admin

Purpose: Manage collections, records, permissions, and workflows from a stable left-sidebar CRUD shell.

Sections: admin-sidebar, data-table, detail-panel, crud-form, activity-feed

### Sms

Purpose: Operate message-based automations and communication history in a compact, chat-oriented workspace.

Sections: chat-shell, message-stream, composer, contact-sidebar

### User Management

Purpose: Review users, roles, invitations, and account health with table-first clarity.

Sections: user-stats, filters, user-table, role-panel

### Login Auth

Purpose: Authenticate users with a focused, trust-heavy entry point and minimal friction.

Sections: auth-hero, auth-panel, trust-strip

### Webapp

Purpose: Present the main product workspace with command-driven navigation, data tables, and contextual detail panels.

Sections: workspace-shell, command-bar, data-table, detail-panel

### Spa

Purpose: Support fast route changes and stateful workflows inside a single-page application shell.

Sections: workspace-shell, command-bar, route-view, inspector-panel

### Mpa

Purpose: Support a multipage marketing and resource site with strong hierarchy and repeatable shell patterns.

Sections: page-header, content-grid, resource-band, footer-links

### Tech Blog

Purpose: Publish technical stories, release notes, and deep product explainers with editorial rhythm.

Sections: blog-hero, featured-article, article-list, newsletter, footer-links

## Section Archetypes

### Hero

Purpose: Launch-oriented hero with compact CTAs, gradient title treatment, and strong dark shell contrast.
Slots: eyebrow, title, subtitle, primary-cta, secondary-cta, hero-visual
Traits: above-fold, dark-shell, tight-heading, indigo-accent

### Logo Banner

Purpose: Show trust logos in a horizontally scrolling or repeated strip.
Slots: intro, logo-list
Traits: marquee-friendly, muted, separator-fade

### Feature Split

Purpose: Pair a screenshot or visual with supporting text in alternating left-right sections.
Slots: image, title, body, meta-points
Traits: two-column, alternating, landing-only

### Feature Card Grid

Purpose: Display fixed-height feature cards with image overlays and bottom-anchored copy.
Slots: background-image, title, body
Traits: rounded-xl, h-350, bottom-anchored, glass-border

### Testimonials

Purpose: Build credibility using customer quotes, logos, or analyst statements.
Slots: quote, source
Traits: muted, brand-consistent

### Cta

Purpose: Close a public surface with one clear conversion action.
Slots: headline, supporting-copy, button
Traits: single-primary-action, high-contrast, gradient-cta

### Stats Overview

Purpose: Expose key metrics in compact cards with clear trend indicators.
Slots: metric-value, metric-label, trend, status
Traits: compact, card-grid, quick-scan

### Charts

Purpose: Show time-series or categorical data with restrained chart colors and operator clarity.
Slots: chart, legend, range-controls
Traits: dark-surface, muted-frame, chart-palette

### Recent Activity

Purpose: List recent ingests, mutations, errors, and operator actions in chronological order.
Slots: event-list, timestamp, event-meta
Traits: timeline, compact, mono-meta

### Quick Actions

Purpose: Provide high-frequency shortcuts near the top of operational surfaces.
Slots: actions
Traits: compact, button-group, operator-first

### Docs Hero

Purpose: Introduce docs sections and orient the reader before the main content area.
Slots: eyebrow, title, summary
Traits: readable-width, muted-meta, no-heavy-effects

### Sidebar Nav

Purpose: Provide a left navigation rail for docs or app surfaces.
Slots: section-list, active-state
Traits: left-rail, compact, sticky-allowed

### Content

Purpose: Main reading or data presentation column.
Slots: body
Traits: semantic, scannable

### Toc

Purpose: Show headings and anchor links for long-form content.
Slots: anchors
Traits: right-rail, small-type

### Prev Next

Purpose: Link adjacent docs or resource pages.
Slots: previous-link, next-link
Traits: footer-nav, directional

### Admin Sidebar

Purpose: Primary navigation for CRUD, settings, collections, and documentation links.
Slots: logo, primary-nav, secondary-nav
Traits: left-sidebar, compact, surface-subtle

### Data Table

Purpose: Show records with sorting, filtering, row actions, and selection states.
Slots: columns, rows, filters, pagination
Traits: dense, row-actions, sticky-header

### Detail Panel

Purpose: Reveal focused record details or contextual metadata next to a table.
Slots: title, meta, actions
Traits: side-panel, contextual, surface-elevated

### Crud Form

Purpose: Create or edit structured data with clear grouping and validation.
Slots: fields, validation, submit-actions
Traits: stacked, grouped-sections, system-first

### Activity Feed

Purpose: Track changes, audit events, and operational history.
Slots: event-list, user, timestamp
Traits: muted, audit-friendly, compact

### Chat Shell

Purpose: Host message-driven workflows for SMS or assistant operations.
Slots: conversation-list, active-thread
Traits: split-view, compact, operator-first

### Message Stream

Purpose: Render chronological inbound and outbound messages.
Slots: messages, timestamps, delivery-state
Traits: bubble-lite, mono-meta, dense

### Composer

Purpose: Compose outbound messages or automation commands.
Slots: input, attachments, send-action
Traits: sticky-bottom, compact, clear-primary-action

### Contact Sidebar

Purpose: Show contact metadata, tags, and message history shortcuts.
Slots: contact-meta, tags, actions
Traits: side-panel, compact

### User Stats

Purpose: Summarize account counts, role health, and invitation status.
Slots: metric-cards
Traits: compact, row-friendly

### Filters

Purpose: Filter and segment datasets without hiding the query state.
Slots: search, selects, chips
Traits: toolbar, compact, clear-active-state

### User Table

Purpose: List users, roles, access status, and quick actions.
Slots: rows, role-badge, status, actions
Traits: data-table-derived, badge-heavy, compact

### Role Panel

Purpose: Explain and edit role scopes, permissions, and inheritance.
Slots: role-summary, permissions, save-action
Traits: surface-elevated, detail-panel

### Auth Hero

Purpose: Establish trust and product context on login or signup screens.
Slots: title, summary, supporting-proof
Traits: minimal, trust-focused, dark-shell

### Auth Panel

Purpose: Hold the actual authentication form in a focused card.
Slots: fields, submit, secondary-links
Traits: centered, card, simple

### Trust Strip

Purpose: Reinforce trust with security, compliance, or customer proof near auth forms.
Slots: items
Traits: small-type, muted, horizontal

### Workspace Shell

Purpose: Establish the primary app shell for webapp and SPA surfaces.
Slots: topbar, sidebar, content
Traits: application-shell, persistent-nav

### Command Bar

Purpose: Expose fast actions, search, and stateful filters at the top of app surfaces.
Slots: search, actions, context-meta
Traits: compact, operator-first, sticky-optional

### Route View

Purpose: Render the current SPA route inside the workspace shell.
Slots: view-content
Traits: stateful, app-surface

### Inspector Panel

Purpose: Show route-specific details, logs, or JSON next to the main view.
Slots: summary, details, actions
Traits: side-panel, mono-friendly

### Page Header

Purpose: Introduce an MPA page with breadcrumbs, title, and short context.
Slots: breadcrumbs, title, summary
Traits: clear-hierarchy, moderate-density

### Content Grid

Purpose: Lay out cards, resources, or grouped content on multipage surfaces.
Slots: items
Traits: grid, responsive, repeatable

### Resource Band

Purpose: Highlight related resources, links, or documentation handoffs.
Slots: resource-list
Traits: muted-surface, scannable

### Footer Links

Purpose: Group support, product, and legal links in the lower page shell.
Slots: link-groups, legal-links
Traits: footer, micro-text, border-top

### Blog Hero

Purpose: Introduce a blog or changelog section with editorial rhythm.
Slots: eyebrow, title, summary
Traits: editorial, readable-width

### Featured Article

Purpose: Feature one top article or release note with more emphasis than the rest of the feed.
Slots: image, title, excerpt, meta
Traits: card, elevated, editorial

### Article List

Purpose: List multiple posts with tags, excerpts, and publication metadata.
Slots: items, meta, tags
Traits: scan-friendly, editorial, muted-dividers

### Newsletter

Purpose: Capture subscribers for release notes or technical updates.
Slots: headline, email-input, submit-button
Traits: compact, single-action, muted-surface

## Cross-Surface Rules

- confusing jargon
- buzzword-heavy AI copy
- cute microcopy on admin surfaces
- marketing slogans in data tables
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

## Component Policy

**Keep standard:** Accordion, Badge, Field, Grid, Icon, Image, Stack, Text, Title

**Wrap early:** Button, Card, Container, Group, Sheet

**Custom blocks:** CyberHeader, CyberFooter, CyberSidebar, HeroBlock, FeatureSplitBlock, FeatureCardGridBlock, DataTableBlock, JsonEditorBlock, TokenShowcaseBlock, ComponentGalleryBlock

**Raw HTML allowed for:** embedded charts, syntax-highlighted code, third-party status widgets

**Avoid:** oversized rounded pills on enterprise surfaces, default card styling without Cyber overlay on landing pages, heavy gradients on CRUD and docs surfaces, using decorative glass effects on dense tables, mixing too many accent colors in a single screen

---

Generated by brand-os on 2026-03-12.
Source: cyber-os.schema.json
