# BrandOSS CLI

`brand-os` is a deterministic, brand-neutral compiler and verifier for machine-readable brand contracts.

It does not create a brand, interpret a customer request, crawl websites, call an LLM, choose a style, or decide what looks good. Those responsibilities belong to a studio, agent, or human art director. The CLI accepts an explicit contract and produces verifiable output.

## Install

```bash
npm install --save-dev brand-os
npx brand-os --version
```

Node.js 22 or newer is required.

## Contract

Every input is versioned. The current contract major is `1`.

```json
{
  "schemaVersion": "1.0.0",
  "meta": {
    "name": "Example",
    "slug": "example"
  },
  "tokens": {
    "color": {
      "light": {
        "background": "#ffffff",
        "foreground": "#111111",
        "card": "#ffffff",
        "primary": "#222222",
        "primaryForeground": "#ffffff",
        "accent": "#444444",
        "border": "#dddddd",
        "destructive": "#aa0000"
      },
      "dark": {}
    },
    "typography": {
      "families": {
        "display": "Declared Display Family",
        "body": "Declared Body Family"
      }
    },
    "radius": { "sm": "2px", "md": "4px", "lg": "8px" },
    "shadow": { "sm": "none", "md": "none" }
  }
}
```

The CLI never silently replaces missing brand decisions with an industry, palette, font pairing, composition, or tone-of-voice preset.

## Commands

### Validate input

```bash
npx brand-os validate --schema ./brand.contract.json
npx brand-os validate --schema ./brand.contract.json --strict --json
```

Hard validation covers the versioned input shape and safe asset paths. Advisory quality signals report whether the contract declares enough information for downstream proof: thesis, positioning, negative constraints, shape/image grammar, marks, and target surfaces.

There is no font, color, industry, or visual-technique blacklist. `--strict` promotes advisory warnings to a failing exit code; it does not turn them into claims about taste.

### Emit a bundle

```bash
npx brand-os emit \
  --schema ./brand.contract.json \
  --output ./brand.generated \
  --json
```

The bundle contains:

- `contract.json` - machine source of truth;
- `DESIGN.md` - human/agent exchange view;
- `manifest.json` - schema identity and SHA-256 file records;
- `README.md`;
- `tweaks/`, `brand-marks/`, and declared assets only when present in the input.

Output is staged and installed atomically. A non-empty target is rejected unless `--force` is explicit.

```bash
npx brand-os emit --schema ./brand.contract.json --output ./brand.generated --force
```

### Verify a bundle

```bash
npx brand-os verify \
  --schema ./brand.contract.json \
  --bundle ./brand.generated \
  --strict \
  --json
```

Verification checks:

- input contract identity and schema version;
- manifest shape;
- file containment, size, and SHA-256;
- required `DESIGN.md` structure;
- undeclared files in strict mode.

## Machine interface

With `--json`, stdout contains one JSON object and no progress prose.

Stable exit codes:

- `0` - success;
- `1` - invalid contract or failed verification;
- `2` - command/argument error;
- `3` - filesystem or unexpected runtime error.

This makes the CLI suitable for CI, local tools, MCP adapters, and a future Brand Studio orchestrator.

## System boundary

For a noisy request such as "new-year grill promotion, urgent", an external Studio/LLM must resolve intent, uncertainty, commercial facts, sources, cultural context, and human approval. It then passes an explicit contract to BrandOSS.

```text
Studio / Context Runtime
  -> versioned BrandContract
  -> brand-os validate
  -> brand-os emit
  -> BuildY applies the contract
  -> brand-os verify
  -> human approval
```

The noisy phrase itself is never a BrandOSS CLI input and no restaurant behavior is hardcoded.

## Publish check

```bash
npm run typecheck
npm test
npm pack --dry-run
```

License: MIT.
