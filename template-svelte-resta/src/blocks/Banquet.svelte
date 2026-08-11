<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Button from "../kit/button/Button.svelte"
  import Image from "../kit/image/Image.svelte"
  import Stack from "../kit/stack/Stack.svelte"
  import Text from "../kit/text/Text.svelte"
  import Title from "../kit/title/Title.svelte"
  import { banquet } from "../lib/content"
</script>

<Block tag="section" id="banquet" class="resta-wood-panel py-20 md:py-28">
  <Box class="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-14 md:px-8">
    <Box class="overflow-hidden">
      <Image
        src={banquet.image.src}
        alt={banquet.image.alt}
        fit="cover"
        class="aspect-[5/4] h-full w-full object-cover"
        loading="lazy"
      />
    </Box>

    <Stack class="gap-6">
      <Title as={2} class="font-display text-4xl font-semibold tracking-tight text-linen md:text-5xl">
        {banquet.title}
      </Title>
      <Text class="text-lg leading-relaxed text-cream/90">
        {banquet.lead}
      </Text>
      <Stack class="gap-3">
        {#each banquet.points as point}
          <Text class="border-l-2 border-brass pl-4 text-base leading-relaxed text-cream/85">
            {point}
          </Text>
        {/each}
      </Stack>
      <Box>
        <Button
          href={banquet.cta.href}
          size="lg"
          class="rounded-md bg-brass px-7 text-base font-semibold text-walnut hover:bg-brass/90"
        >
          {banquet.cta.label}
        </Button>
      </Box>
    </Stack>
  </Box>
</Block>
