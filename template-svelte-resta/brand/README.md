# RestA brand contract (applied)

This folder holds the **applied** brand-os contract for `template-svelte-resta`.

| File | Role |
| --- | --- |
| `DESIGN.md` | Agent/exchange contract (from emit) |
| `tweaks.css` | Snapshot of live CSS vars (also served from `public/brand/tweaks/`) |

Source of truth in BrandOSS:

```text
.project/resta-brand/resta-brand.schema.json
.project/resta-brand/resta-brand-generated/
```

Re-sync after schema changes:

```bash
# from BrandOSS root
node dist/index.js emit --schema ".project/resta-brand/resta-brand.schema.json" --bootstrap
cp .project/resta-brand/resta-brand-generated/DESIGN.md template-svelte-resta/brand/DESIGN.md
cp .project/resta-brand/resta-brand-generated/tweaks/tweaks.css template-svelte-resta/public/brand/tweaks/
cp .project/resta-brand/resta-brand-generated/tweaks/tweaks.json template-svelte-resta/public/brand/tweaks/
cp .project/resta-brand/resta-brand-generated/tweaks/tweaks-runtime.js template-svelte-resta/public/brand/tweaks/
cp .project/resta-brand/resta-brand-generated/tweaks/tweaks.css template-svelte-resta/brand/tweaks.css
```

Runtime wiring: `index.html` loads `/brand/tweaks/tweaks.css` + `tweaks-runtime.js`. App tokens in `src/app.css` map Tailwind `@theme` roles to those CSS variables.
