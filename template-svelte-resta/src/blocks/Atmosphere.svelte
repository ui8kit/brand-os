<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Image from "../kit/image/Image.svelte"
  import Stack from "../kit/stack/Stack.svelte"
  import Text from "../kit/text/Text.svelte"
  import Title from "../kit/title/Title.svelte"
  import { atmosphere } from "../lib/content"
</script>

<Block tag="section" id="atmosphere" class="resta-linen-panel resta-section border-y border-border">
  <Box class="mx-auto max-w-6xl px-5 md:px-8">
    <Stack class="mb-12 max-w-2xl gap-4">
      <Title as={2} class="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {atmosphere.title}
      </Title>
      <Text class="text-lg leading-relaxed text-muted-foreground">
        {atmosphere.lead}
      </Text>
    </Stack>

    <Box class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each atmosphere.shots as shot, i}
        <Stack class="gap-3 {i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}">
          <Box class="overflow-hidden {i === 0 ? 'aspect-[16/10]' : 'aspect-[4/5]'}">
            <Image
              src={shot.src}
              alt={shot.alt}
              fit="cover"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
            />
          </Box>
          <Text class="text-sm font-medium uppercase tracking-[0.12em] text-secondary">
            {shot.caption}
          </Text>
        </Stack>
      {/each}
    </Box>
  </Box>
</Block>
