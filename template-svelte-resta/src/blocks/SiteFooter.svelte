<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Group from "../kit/group/Group.svelte"
  import Text from "../kit/text/Text.svelte"
  import Title from "../kit/title/Title.svelte"
  import { site } from "../lib/content"
</script>

<Block tag="footer" class="bg-walnut-deep text-cream">
  <Box class="resta-ornament-band" aria-hidden="true" />
  <Box
    class="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8"
  >
    <Group class="flex-col items-start gap-1">
      <Title as={3} class="font-display text-3xl font-semibold text-linen">
        {site.brand}
      </Title>
      <Text class="text-sm text-cream/70">{site.tagline}</Text>
    </Group>
    <Text class="text-xs uppercase tracking-[0.16em] text-cream/55">
      {site.product} · {site.location}
    </Text>
  </Box>
</Block>
