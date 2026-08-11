<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Button from "../kit/button/Button.svelte"
  import Group from "../kit/group/Group.svelte"
  import Image from "../kit/image/Image.svelte"
  import Stack from "../kit/stack/Stack.svelte"
  import Text from "../kit/text/Text.svelte"
  import Title from "../kit/title/Title.svelte"
  import { hero, site } from "../lib/content"
</script>

<Block tag="section" id="welcome" class="relative min-h-[100svh] overflow-hidden">
  <Box class="absolute inset-0">
    <Image
      src={hero.image.src}
      alt={hero.image.alt}
      fit="cover"
      class="resta-hero-media h-full w-full object-cover"
      loading="eager"
      decoding="async"
    />
    <Box
      class="absolute inset-0 bg-gradient-to-t from-walnut-deep/88 via-walnut/45 to-walnut/25"
      aria-hidden="true"
    />
  </Box>

  <Box class="relative mx-auto flex min-h-[100svh] max-w-6xl items-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
    <Stack class="max-w-2xl gap-5 text-linen">
      <Title
        as={1}
        class="font-display resta-rise text-6xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
      >
        {site.brand}
      </Title>

      <Title
        as={2}
        class="font-display resta-rise-delay text-2xl font-medium leading-snug text-cream md:text-3xl"
      >
        {hero.headline}
      </Title>

      <Text class="resta-fade max-w-xl text-base leading-relaxed text-cream/90 md:text-lg">
        {hero.support}
      </Text>

      <Group class="resta-fade flex-wrap items-center gap-3 pt-2">
        <Button
          href={hero.primaryCta.href}
          size="lg"
          class="resta-btn-primary px-7 text-base font-semibold shadow-none"
        >
          {hero.primaryCta.label}
        </Button>
        <Button
          href={hero.secondaryCta.href}
          variant="outline"
          size="lg"
          class="rounded-[var(--radius-md)] border-cream/50 bg-transparent px-7 text-base text-linen hover:bg-linen/10 hover:text-linen"
        >
          {hero.secondaryCta.label}
        </Button>
      </Group>
    </Stack>
  </Box>
</Block>
