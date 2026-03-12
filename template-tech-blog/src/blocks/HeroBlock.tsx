import { Badge, Block, Button, Card, Container, Group, Image, Stack, Text, Title } from "@/components";
import type { SiteContent } from "../../fixtures/site";

type HeroBlockProps = {
  brand: SiteContent["brand"];
  hero: SiteContent["hero"];
};

export function HeroBlock({ brand, hero }: HeroBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-hero-section" id="home">
      <Container max="w-7xl" data-class="site-hero-container">
        <Group flex="wrap" gap="8" items="stretch" data-class="site-hero-grid">
          <Stack gap="6" flex="1" data-class="site-hero-copy">
            <Badge variant="outline" size="sm" data-class="site-hero-eyebrow">
              {hero.eyebrow}
            </Badge>

            <Stack gap="4" max="w-4xl" data-class="site-hero-copy-block">
              <Title order={1} fontSize="5xl" lineHeight="tight" data-class="site-hero-title">
                {hero.title}
              </Title>
              <Text
                fontSize="lg"
                textColor="muted-foreground"
                lineHeight="relaxed"
                data-class="site-hero-summary"
              >
                {hero.summary}
              </Text>
            </Stack>

            <Group gap="4" flex="wrap" items="center" data-class="site-hero-actions">
              <Button href={hero.primaryAction.href} size="lg" data-class="site-hero-primary">
                {hero.primaryAction.label}
              </Button>
              <Button
                href={hero.secondaryAction.href}
                variant="outline"
                size="lg"
                data-class="site-hero-secondary"
              >
                {hero.secondaryAction.label}
              </Button>
            </Group>

            <Group gap="4" flex="wrap" items="stretch" data-class="site-hero-highlights">
              {hero.highlightPoints.map((point) => (
                <Card key={point} variant="outlined" flex="1" data-class="site-hero-highlight-card">
                  <Text lineHeight="relaxed" textColor="muted-foreground" data-class="site-hero-highlight-text">
                    {point}
                  </Text>
                </Card>
              ))}
            </Group>
          </Stack>

          <Card flex="1" variant="outlined" data-class="site-hero-visual-card">
            <Stack gap="4" data-class="site-hero-visual-content">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                aspect="video"
                fit="cover"
                rounded="xl"
                data-class="site-hero-image"
              />
              <Stack gap="2" data-class="site-hero-visual-caption">
                <Text component="span" fontWeight="semibold" data-class="site-hero-visual-title">
                  {brand.descriptor}
                </Text>
                <Text
                  component="span"
                  fontSize="sm"
                  textColor="muted-foreground"
                  data-class="site-hero-visual-note"
                >
                  Dark-mode-friendly base64 SVG placeholder. Replace it later with a portrait,
                  dashboard shot, annotated chart, or editorial collage.
                </Text>
              </Stack>
            </Stack>
          </Card>
        </Group>
      </Container>
    </Block>
  );
}
