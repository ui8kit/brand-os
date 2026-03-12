import { Badge, Block, Button, Card, Container, Group, Stack, Text, Title } from "@/components";
import type { SiteContent } from "../../fixtures/site";

type NewsletterBlockProps = {
  newsletter: SiteContent["newsletter"];
};

export function NewsletterBlock({ newsletter }: NewsletterBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-newsletter-section" id="newsletter">
      <Container max="w-7xl" data-class="site-newsletter-container">
        <Card data-class="site-newsletter-card">
          <Group gap="8" flex="wrap" items="start" justify="between" data-class="site-newsletter-grid">
            <Stack gap="4" flex="1" data-class="site-newsletter-copy">
              <Badge variant="outline" size="sm" data-class="site-newsletter-badge">
                {newsletter.eyebrow}
              </Badge>
              <Stack gap="4" max="w-4xl" data-class="site-newsletter-copy-block">
                <Title order={2} fontSize="3xl" data-class="site-newsletter-title">
                  {newsletter.title}
                </Title>
                <Text
                  textColor="muted-foreground"
                  lineHeight="relaxed"
                  data-class="site-newsletter-summary"
                >
                  {newsletter.summary}
                </Text>
              </Stack>
            </Stack>

            <Stack gap="4" flex="1" data-class="site-newsletter-panel">
              {newsletter.benefits.map((benefit) => (
                <Text
                  key={benefit}
                  textColor="muted-foreground"
                  lineHeight="relaxed"
                  data-class="site-newsletter-benefit"
                >
                  {benefit}
                </Text>
              ))}
              <Group gap="4" flex="wrap" items="center" data-class="site-newsletter-actions">
                <Button href="#" size="lg" data-class="site-newsletter-primary">
                  {newsletter.ctaLabel}
                </Button>
                <Button href="#journal" variant="outline" size="lg" data-class="site-newsletter-secondary">
                  Review sample sections
                </Button>
              </Group>
            </Stack>
          </Group>
        </Card>
      </Container>
    </Block>
  );
}
