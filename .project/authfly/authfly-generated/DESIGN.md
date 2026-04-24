---
version: "alpha"
name: "Authfly"
description: "Открытый конструктор аутентификации: self-hosted SAML 2.0 + OIDC IdP, hosted-UI на UI8Kit и адаптивные SDK."
colors:
  primary: "#ff385c"
  on-primary: "#ffffff"
  surface: "#ffffff"
  on-surface: "#222222"
  background: "#ffffff"
  border: "#dddddd"
  accent: "#ff385c"
  error: "#c13515"
  category-plus: "#92174d"
  category-luxe: "#460479"
  category-info: "#428bff"
typography:
  display-lg:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "4rem"
    fontWeight: 700
    lineHeight: "1.1"
  display-md:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: "1.15"
  body-lg:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.5"
  body-md:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5"
  body-sm:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.43"
  label-md:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: "1.25"
  label-sm:
    fontFamily: "\"Authfly Cereal\", \"Inter\", sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: "1.29"
rounded:
  none: 0
  sm: "0.5rem"
  md: "0.875rem"
  lg: "1.25rem"
  xl: "2rem"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
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

Auth Fly — открытая аутентификация. На вашей стороне. Сквозная линия — скучная надёжность, безопасность как несущий хребет и контракты раньше кода.
Promise: IdP работает на вашем origin и только на нём. Безопасность ведётся публично.
Personality: confident, reliable, precise, transparent, bold
Anti-personality: cluttered, generic-template, opaque, corporate-bland, cheap
Voice tone: clear, confident, direct, transparent
Illustration style: bold.

## Colors

Use semantic color roles first: background #ffffff, foreground #222222, primary #ff385c, accent #ff385c.
Accent color should stay scarce and intentional.
Contrast should clear accessibility budgets before decorative styling.
Supported themes: light, dark, paper, dusk, midnight, high-contrast.
Category colors: plus, luxe, info.

## Typography

Font families:
- Display: `"Authfly Cereal", "Inter", sans-serif`
- Body: `"Authfly Cereal", "Inter", sans-serif`
- Ui: `"Authfly Cereal", "Inter", sans-serif`
Type scale:
- display-lg: `4rem`
- display-md: `2.5rem`
- heading-lg: `1.75rem`
- heading-md: `1.375rem`
- body-lg: `1.125rem`
- body-md: `1rem`
- body-sm: `0.875rem`
- label-md: `0.875rem`
- label-sm: `0.75rem`
- micro: `0.5rem`
Weights:
- regular: `500`
- medium: `600`
- bold: `700`

## Layout

Base spacing unit: 8px.
Section rhythm: default=56px.
Container widths: max=1280px.

## Elevation & Depth

Use 3-layer stacked shadow only for critical floating panels (like booking or auth modals).
Shadow scale:
- sm: `0 4px 12px rgba(0,0,0,0.08)`
- md: `rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.1) 0 4px 8px 0`
- lg: `rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.06) 0 8px 16px 0, rgba(0,0,0,0.12) 0 12px 24px 0`

## Shapes

Confident layout with circular highlights and highly disciplined grayscale.
Radius scale:
- xs: `0.25rem`
- sm: `0.5rem`
- md: `0.875rem`
- lg: `1.25rem`
- xl: `2rem`
- full: `50%`
Primary brand mark clear space: 0.5x mark height.

## Components


Page archetypes:
- sso-auth: Secure, transparent authentication flow. Sections: auth-card, sso-options, footer-links.
- landing: Communicate open-source values and security. Sections: hero, values-grid, timeline, technical-books, cta.

Section archetypes:
- auth-card: Hosted-UI box containing the main login/signup functionality. Slots: logo, form-fields, submit-button.
- technical-books: Showcase documentation and spec guides. Slots: book-cover, title, description, read-cta.

Cross-surface rules:
- Keep one clear information architecture per surface.
- Preserve semantic consistency across public and operational surfaces.

## Do's and Don'ts

Do:
- Do preserve AA contrast in every emitted theme before polishing visual effects.
- Do make the brand recognisable through marks, shape language, and illustration motifs, not color alone.

Don't:
- cluttered
- generic-template
- opaque
- corporate-bland
- cheap
- generic stock gradients
- AI-slop people
- Body text on dark must clear 4.5:1 and headings on dark must clear 7:1.
