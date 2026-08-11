<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Button from "../kit/button/Button.svelte"
  import Inline from "../kit/inline/Inline.svelte"
  import { nav, site } from "../lib/content"
</script>

<Block
  tag="header"
  class="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md"
>
  <Box class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
    <Button
      href="#welcome"
      variant="link"
      class="font-display h-auto p-0 text-2xl font-semibold tracking-wide text-foreground no-underline hover:no-underline"
    >
      {site.brand}
    </Button>

    <Block
      tag="nav"
      class="hidden items-center gap-1 rounded-[var(--radius-xl)] border border-border bg-card/90 px-2 py-1 shadow-sm md:flex"
      aria-label="Разделы"
    >
      {#each nav as item}
        <Button
          href={item.href}
          variant="ghost"
          size="sm"
          class="rounded-[var(--radius-xl)] px-3 text-sm font-medium text-secondary hover:bg-muted hover:text-foreground"
        >
          {item.label}
        </Button>
      {/each}
    </Block>

    <Inline class="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
      {site.product}
    </Inline>
  </Box>
</Block>
