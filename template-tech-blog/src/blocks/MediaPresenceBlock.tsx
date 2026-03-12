import {
  Badge,
  Block,
  Card,
  CardContent,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@/components";
import type { SiteContent } from "../../fixtures/site";

type MediaPresenceBlockProps = {
  media: SiteContent["media"];
};

export function MediaPresenceBlock({ media }: MediaPresenceBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-media-section" id="media">
      <Container max="w-7xl" data-class="site-media-container">
        <Stack gap="8" data-class="site-media-layout">
          <Stack gap="4" max="w-4xl" data-class="site-media-head">
            <Badge variant="secondary" size="sm" data-class="site-media-badge">
              Media and platforms
            </Badge>
            <Title order={2} fontSize="3xl" data-class="site-media-title">
              Treat platform presence as reusable evidence, not vanity.
            </Title>
            <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-media-description">
              The template includes a media layer for talks, interviews, external channels, and platform
              presence. It works for videos, podcasts, articles, and community activity.
            </Text>
          </Stack>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-media-highlights">
            {media.highlights.map((item) => (
              <Card key={item.title} flex="1" data-class="site-media-highlight-card">
                <Stack gap="4" data-class="site-media-highlight-stack">
                  <Image
                    src={item.image}
                    alt={`${item.title} placeholder`}
                    aspect="video"
                    fit="cover"
                    rounded="xl"
                    data-class="site-media-highlight-image"
                  />
                  <CardContent data-class="site-media-highlight-content">
                    <Stack gap="4" data-class="site-media-highlight-copy">
                      <Text fontSize="sm" fontWeight="semibold" textColor="primary" data-class="site-media-highlight-label">
                        {item.label}
                      </Text>
                      <Title order={3} fontSize="xl" data-class="site-media-highlight-title">
                        {item.title}
                      </Title>
                      <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-media-highlight-summary">
                        {item.summary}
                      </Text>
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
            ))}
          </Group>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-platform-grid">
            {media.platforms.map((platform) => (
              <Card key={platform.name} variant="outlined" flex="1" data-class="site-platform-card">
                <Stack gap="2" data-class="site-platform-card-content">
                  <Text fontWeight="semibold" data-class="site-platform-name">
                    {platform.name}
                  </Text>
                  <Text fontSize="sm" textColor="muted-foreground" lineHeight="relaxed" data-class="site-platform-detail">
                    {platform.detail}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Group>
        </Stack>
      </Container>
    </Block>
  );
}
