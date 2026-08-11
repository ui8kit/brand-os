<script lang="ts">
  /** Landing composition under brand/DESIGN.md (resta-brand). Tweaks load from index.html. */
  import Atmosphere from "./blocks/Atmosphere.svelte"
  import Banquet from "./blocks/Banquet.svelte"
  import Cuisine from "./blocks/Cuisine.svelte"
  import Hero from "./blocks/Hero.svelte"
  import SiteFooter from "./blocks/SiteFooter.svelte"
  import SiteHeader from "./blocks/SiteHeader.svelte"
  import Visit from "./blocks/Visit.svelte"
  import Box from "./kit/box/Box.svelte"
  import { site } from "./lib/content"
</script>

<svelte:head>
  <title>{site.brand} · {site.product}</title>
  <meta name="description" content={`${site.brand} — ${site.tagline}. Эталонный шаблон ${site.product}.`} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Source+Sans+3:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Box class="min-h-screen">
  <SiteHeader />
  <Box class="resta-ornament-band" aria-hidden="true" />
  <Hero />
  <Atmosphere />
  <Cuisine />
  <Banquet />
  <Visit />
  <SiteFooter />
</Box>
