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

<Block tag="section" id="cta" class="resta-linen-panel resta-section border-t border-border">
  <Box class="mx-auto max-w-3xl px-5 text-center md:px-8">
    <Stack class="items-center gap-5">
      <Title as={2} class="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
        {visit.title}
      </Title>
      <Text class="max-w-xl text-lg leading-relaxed text-muted-foreground">
        {visit.lead}
      </Text>
      <Stack class="gap-1 pt-2">
        <Text class="text-base font-medium text-secondary">{visit.hours}</Text>
        <Text class="text-base text-muted-foreground">{visit.address}</Text>
        <Text class="text-base text-muted-foreground">{site.phone}</Text>
      </Stack>
      <Group class="flex-wrap items-center justify-center gap-3 pt-4">
        <Button
          href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
          size="lg"
          class="resta-btn-primary px-7 text-base font-semibold"
        >
          Позвонить
        </Button>
        <Button
          href={`mailto:${site.email}`}
          variant="outline"
          size="lg"
          class="rounded-[var(--radius-md)] border-border bg-card/80 px-7 text-base text-foreground hover:bg-muted"
        >
          Написать
        </Button>
      </Group>
    </Stack>
  </Box>
</Block>
