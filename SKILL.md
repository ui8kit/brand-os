---
name: brand-os
description: Validate, compile, and verify an explicit machine-readable brand contract. Does not create brands or infer taste.
---

# BrandOSS CLI

Use BrandOSS only after a brand contract exists.

```bash
npx brand-os validate --schema ./brand.contract.json --json
npx brand-os emit --schema ./brand.contract.json --output ./brand.generated --json
npx brand-os verify --schema ./brand.contract.json --bundle ./brand.generated --strict --json
```

Read the JSON response and respect exit codes. Do not pass raw user requests to the CLI. Intent parsing, research, source grounding, creative direction, implementation, and approval stay in the calling product or agent workflow.
