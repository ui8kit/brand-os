<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Stack from "../kit/stack/Stack.svelte"
  import Text from "../kit/text/Text.svelte"
  import Title from "../kit/title/Title.svelte"
  import { cuisine } from "../lib/content"
</script>

<Block tag="section" id="cuisine" class="py-20 md:py-28">
  <Box class="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:px-8 md:gap-16">
    <Stack class="gap-4 md:sticky md:top-28 md:self-start">
      <Title as={2} class="font-display text-4xl font-semibold tracking-tight text-walnut md:text-5xl">
        {cuisine.title}
      </Title>
      <Text class="text-lg leading-relaxed text-muted">
        {cuisine.lead}
      </Text>
    </Stack>

    <Stack class="gap-0 divide-y divide-wood/15 border-y border-wood/15">
      {#each cuisine.dishes as dish}
        <Stack class="gap-2 py-7">
          <Title as={3} class="font-display text-2xl font-semibold text-walnut">
            {dish.name}
          </Title>
          <Text class="text-base leading-relaxed text-muted">
            {dish.note}
          </Text>
        </Stack>
      {/each}
    </Stack>
  </Box>
</Block>
