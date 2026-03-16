# MKulgin Brand OS Generated Kit

This directory was generated from the machine-readable brand operating system source files.

## Included
- `prompts/`: 13 isolated surface prompt files
- `parser-fixtures/`: parser contract fixtures derived from the reference input set
- `parser-contract.json`: copied parser contract snapshot
- adapter assets copied from the brand package: 3

## Adapter Assets
- `adapters/shared/tokens.css` — Shared editorial tokens for MKulgin Brand OS.
- `adapters/tailwind4/shadcn.css` — Tailwind 4 @theme bridge for MKulgin Brand OS.
- `adapters/tailwind4/brand-layer.css` — Editorial overlay classes for prose, quotes, evidence blocks, and restrained warm accents.

## Brand Summary
MKulgin Brand OS should feel calm, mature, practical, and editorial while communicating deep engineering credibility, honest business experience, and skepticism toward hype. Cold tech base with warm human accent.

## Personality
- calm
- mature
- editorial
- practical
- skeptical-of-hype
- system-driven
- humanly-warm

## Anti-Personality
- generic-saas-gloss
- neon-cyberpunk
- infobusiness-guru
- startup-hype-machine
- over-polished-luxury
- performative-edginess

## Usage
1. Attach the schema file as the source-of-truth brand contract.
2. Use one file from `prompts/` as the isolated surface prompt.
3. If you need parser-friendly HTML/Tailwind output, validate against the parser contract and the emitted fixture set.
4. Use the copied adapter assets only for the stacks they were authored for. The CLI does not assume Tailwind version or CSS adapter strategy.
