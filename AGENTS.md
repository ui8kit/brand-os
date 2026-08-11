# BrandOSS agent instructions

BrandOSS is a deterministic, brand-neutral CLI. Treat it as a compiler and verifier, not as a brand studio or taste generator.

## Public contract

The supported workflow is:

```text
versioned input contract -> validate -> emit -> downstream implementation -> verify
```

Public commands are `validate`, `emit`, and `verify`. Keep `--json` output to one JSON object and preserve exit codes `0/1/2/3` documented in README.

## Boundaries

Do not add:

- LLM or provider calls;
- chat, intent parsing, clarification, or Context Runtime orchestration;
- industry, brand, restaurant, SaaS, style, palette, typography, or layout presets;
- automatic creative territories or copy generation;
- claims that token heuristics can certify taste;
- hidden network calls or unpinned `npx` validators;
- scaffold templates to the core package surface.

Product-specific adapters belong outside this package. Input contracts may contain any brand decisions, but the CLI must not invent them.

## Engineering rules

- Validate unknown JSON at runtime before typed use.
- Preserve `schemaVersion`; incompatible major versions fail explicitly.
- Reject absolute and traversal paths in contract-controlled outputs.
- Never overwrite a non-empty output directory without `--force`.
- Emit through a staging directory and atomic rename.
- Keep generated artifacts reproducible: no timestamps or host-specific absolute paths in the bundle.
- Record SHA-256 and byte size for every declared output.
- Keep validators deterministic and offline by default.
- Separate hard failures from advisory quality signals.
- Add tests for every public behavior and security boundary.

## Anti-slop position

AI-slop is not a banned-font or banned-color list. BrandOSS may check whether a contract declares thesis, positioning, negative constraints, recognisable geometry, image grammar, marks, and proof surfaces. It must not label a visual decision tasteful or generic without rendered evidence and a downstream human gate.

## Release gate

Before npm publication run:

```bash
npm run typecheck
npm test
npm pack --dry-run
```

The package tarball must contain only the public runtime, README, and license. Do not include local project research, generated examples, or brand-specific templates.
