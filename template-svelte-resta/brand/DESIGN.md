---
version: "alpha"
name: "RestA Brand"
description: "Warm Slavic hospitality restaurant brand: walnut wood, linen, terracotta, brass, and sparse folk color rhythm. Canonical RestA template taste — not a copied venue name."
colors:
  primary: "#b8492e"
  on-primary: "#fff9f5"
  surface: "#fdfbf7"
  on-surface: "#1b120e"
  background: "#fff9f0"
  border: "#d7c3b7"
  accent: "#c4a45a"
  error: "#9c1c1c"
  chart-terracotta: "#b8492e"
  chart-brass: "#c4a45a"
  chart-walnut: "#301d13"
  chart-folkRed: "#c31d39"
  chart-folkGreen: "#2e5c3d"
  category-signal: "#c31d39"
  category-craft: "#c4a45a"
typography:
  display-lg:
    fontFamily: "Cormorant Garamond, Times New Roman, serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: "1.1"
  display-md:
    fontFamily: "Cormorant Garamond, Times New Roman, serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: "1.1"
  body-lg:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  body-md:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.55"
  body-sm:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.5"
  label-md:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: "1.3"
  label-sm:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: "1.2"
rounded:
  none: 0
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    typography: "{typography.label-md}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
---

## Overview

Hospitality brand for a Russian-table restaurant: heavy walnut wood against crisp linen, terracotta CTAs, brass highlights, and sparse festive folk color — grounded, ceremonial, never generic SaaS.
Personality: hospitable, heritage-craft, warm-rustic, ceremonial, grounded
Anti-personality: purple-gradient-startup, inter-only-saas, clinical-minimalist, fast-food-generic, glassmorphism-default, AI cream-terracotta brochure cliche without craft, copied client venue naming
Voice tone: welcoming, measured, heritage, table-first
Illustration style: photographic-heritage.

## Colors

Use semantic color roles first: background #fff9f0, foreground #1b120e, primary #b8492e, accent #c4a45a.
Terracotta owns primary CTAs; brass is scarce emphasis; folk red/green only as ribbon ornament rhythm.
Preserve AA contrast on linen and walnut surfaces before decorative folk accents.
Supported themes: light, dark, paper, dusk, midnight, high-contrast.
Category colors: signal, craft.
Chart colors: terracotta, brass, walnut, folkRed, folkGreen.

## Typography

Font families:
- Display: `Cormorant Garamond, Times New Roman, serif`
- Body: `Source Sans 3, Segoe UI, sans-serif`
- Ui: `Source Sans 3, Segoe UI, sans-serif`
Type scale:
- display-lg: `4.5rem`
- display-md: `3.25rem`
- heading-lg: `2.25rem`
- body-md: `1rem`
- body-sm: `0.875rem`
- label-md: `0.875rem`
- label-sm: `0.75rem`

## Layout

Base spacing unit: 4px.
Section rhythm: compact=1.5rem, default=2.5rem, spacious=4rem.
Container widths: reading=42rem, content=64rem, wide=80rem.
Density modes: comfortable=Default hospitality reading density with generous section rhythm.; compact=Higher density for reservations CMS and dashboard.; cozy=Relaxed banquet / editorial spacing — prefer for public landing.

## Elevation & Depth

Depth comes from material photography and wood panels more than layered shadows.
Shadow scale:
- sm: `0 1px 3px rgba(0,0,0,0.06)`
- md: `0 4px 12px rgba(0,0,0,0.08)`
Motion durations: fast=140ms, normal=220ms, slow=900ms.

## Shapes

Grounded rustic geometry: modest radii, weight from wood/linen contrast, not pill stacks.
Radius scale:
- sm: `0.25rem`
- md: `0.375rem`
- lg: `0.5rem`
- xl: `0.75rem`
Primary brand mark clear space: 0.5x mark height.

## Components

Keep standard: Button, Input, Textarea, Dialog.
Wrap early: Hero, Atmosphere gallery, Banquet panel, Section shell.
Custom blocks: full-bleed hospitality hero, folk ornament ribbon band, walnut banquet panel, cuisine list with linen rhythm.

Page archetypes:
- landing: Canonical RestA restaurant landing — brand-first hospitality entry. Sections: hero, atmosphere, cuisine, banquet, cta.
- menu: menu surface for RestA Brand. Sections: hero, category-nav, menu-grid, cta.
- promotions: promotions surface for RestA Brand. Sections: hero, promo-grid, featured-promo, cta.
- blog: blog surface for RestA Brand. Sections: hero, post-grid, categories, newsletter.
- reservations-cms: reservations cms surface for RestA Brand. Sections: reservations-table, calendar-view, settings.
- dashboard: dashboard surface for RestA Brand. Sections: stats-overview, charts, recent-activity, quick-actions.

Section archetypes:
- hero: Full-bleed atmosphere entry: brand name hero-level, one headline, one support line, one CTA group. Slots: brand, headline, support, primary-cta.
- features: Showcase key capabilities or offerings in a scannable grid. Slots: icon, title, description.
- social-proof: Build trust through testimonials, logos, or stats. Slots: quote, attribution.
- cta: Visit / reserve — focused hospitality conversion. Slots: headline, hours, button.
- newsletter: Capture email subscriptions. Slots: headline, email-input, submit-button.
- stats-overview: Display key metrics at a glance. Slots: metric-value, metric-label, trend-indicator.
- atmosphere: Interior gallery proving material taste — wood, linen, terracotta, craft. Slots: title, lead, photo-grid.
- cuisine: Menu teaser as a calm linear list, not a feature-card stack. Slots: title, lead, dish-list.
- banquet: Celebration / long-table offer on a walnut panel with brass CTA. Slots: title, lead, points, cta, image.

Cross-surface rules:
- generic filler text
- corporate jargon
- empty urgency
- we are a platform headlines
- client brand names
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

## Do's and Don'ts

Do:
- Do preserve AA contrast in every emitted theme before polishing visual effects.
- Do make the brand recognisable through marks, shape language, and illustration motifs, not color alone.
- Terracotta owns primary CTAs; brass is scarce emphasis; folk red/green only as ribbon ornament rhythm.

Don't:
- purple-gradient-startup
- inter-only-saas
- clinical-minimalist
- fast-food-generic
- glassmorphism-default
- AI cream-terracotta brochure cliche without craft
- copied client venue naming
- generic filler text
- corporate jargon
- empty urgency
- we are a platform headlines
- client brand names
- centered three identical feature cards
- purple-on-white startup gradients
- glassmorphism without brand intent
- Inter/Roboto/Arial as brand voice
- hero overlay badges and promo stickers
- cards in the hero
- copied client names or logo art as brand mark
- generic stock dining poses
- purple AI gradients
- AI 3D people
- copied venue logos
- cloned folk logo art as product mark
- floating promo stickers on hero media
- Body text on dark must clear 4.5:1 and headings on dark must clear 7:1.
