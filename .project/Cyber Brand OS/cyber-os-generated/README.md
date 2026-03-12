# Cyber OS Generated Kit

This directory was generated from the machine-readable brand operating system source files.

## Included
- `prompts/`: 11 isolated surface prompt files
- `parser-fixtures/`: parser contract fixtures derived from the reference input set
- `parser-contract.json`: copied parser contract snapshot
- adapter assets copied from the brand package: 3

## Adapter Assets
- `adapters/shared/tokens.css` — Shared Cyber OS semantic tokens and base CSS variables.
- `adapters/tailwind4/shadcn.css` — Tailwind 4 @theme bridge for Cyber OS semantic tokens.
- `adapters/tailwind4/brand-layer.css` — Cyber-specific overlay classes for glass panels, compact nav controls, gradients, and feature cards.

## Brand Summary
Cyber OS should feel sharp, cinematic, dependable, and data-native while remaining legible and operational across landing, admin, docs, and app surfaces.

## Personality
- bold
- confident
- high-contrast
- data-native
- precise
- operator-friendly
- cinematic-tech

## Anti-Personality
- generic-saas-template
- neon-cyberpunk-cliche
- glassmorphism-everywhere
- over-decorated
- toy-dashboard
- soft-lifestyle-brand

## Usage
1. Attach the schema file as the source-of-truth brand contract.
2. Use one file from `prompts/` as the isolated surface prompt.
3. If you need parser-friendly HTML/Tailwind output, validate against the parser contract and the emitted fixture set.
4. Use the copied adapter assets only for the stacks they were authored for. The CLI does not assume Tailwind version or CSS adapter strategy.
