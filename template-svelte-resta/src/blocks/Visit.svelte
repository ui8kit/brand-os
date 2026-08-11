<script lang="ts">
  import Block from "../kit/block/Block.svelte"
  import Box from "../kit/box/Box.svelte"
  import Button from "../kit/button/Button.svelte"
  import Group from "../kit/group/Group.svelte"
  import Stack from "../kit/stack/Stack.svelte"
  import Text from "../kit/text/Text.svelte"
  import Title from "../kit/title/Title.svelte"
  import { site, visit } from "../lib/content"
</script>

<Block tag="section" id="visit" class="resta-linen-panel border-t border-wood/10 py-20 md:py-28">
  <Box class="mx-auto max-w-3xl px-5 text-center md:px-8">
    <Stack class="items-center gap-5">
      <Title as={2} class="font-display text-4xl font-semibold tracking-tight text-walnut md:text-5xl">
        {visit.title}
      </Title>
      <Text class="max-w-xl text-lg leading-relaxed text-muted">
        {visit.lead}
      </Text>
      <Stack class="gap-1 pt-2">
        <Text class="text-base font-medium text-wood">{visit.hours}</Text>
        <Text class="text-base text-muted">{visit.address}</Text>
        <Text class="text-base text-muted">{site.phone}</Text>
      </Stack>
      <Group class="flex-wrap items-center justify-center gap-3 pt-4">
        <Button
          href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
          size="lg"
          class="rounded-md bg-terracotta px-7 text-base font-semibold text-primary-foreground hover:bg-terracotta/90"
        >
          Позвонить
        </Button>
        <Button
          href={`mailto:${site.email}`}
          variant="outline"
          size="lg"
          class="rounded-md border-wood/30 bg-white/70 px-7 text-base text-walnut hover:bg-cream"
        >
          Написать
        </Button>
      </Group>
    </Stack>
  </Box>
</Block>
