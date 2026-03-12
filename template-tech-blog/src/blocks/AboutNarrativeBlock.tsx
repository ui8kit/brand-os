import {
  Badge,
  Block,
  Card,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@/components";
import type { SiteContent } from "../../fixtures/site";

type AboutNarrativeBlockProps = {
  about: SiteContent["about"];
};

export function AboutNarrativeBlock({ about }: AboutNarrativeBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-about-section" id="about">
      <Container max="w-7xl" data-class="site-about-container">
        <Stack gap="8" data-class="site-about-layout">
          <Stack gap="4" max="w-4xl" data-class="site-about-head">
            <Badge variant="outline" size="sm" data-class="site-about-badge">
              About the expert
            </Badge>
            <Title order={2} fontSize="3xl" data-class="site-about-title">
              A calm narrative block for biography, values, and hard-earned perspective.
            </Title>
            <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-about-description">
              This section is intentionally generic. Replace the fixtures and the same structure becomes
              a serious profile page for any experienced technical author or operator.
            </Text>
          </Stack>

          <Group gap="8" flex="wrap" items="start" data-class="site-about-grid">
            <Card flex="1" data-class="site-about-portrait-card">
              <Stack gap="4" data-class="site-about-portrait-stack">
                <Image
                  src={about.portrait.src}
                  alt={about.portrait.alt}
                  fit="cover"
                  rounded="xl"
                  data-class="site-about-portrait-image"
                />
                <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-about-summary">
                  {about.summary}
                </Text>
              </Stack>
            </Card>

            <Stack gap="6" flex="1" data-class="site-about-side">
              <Card data-class="site-about-principles-card">
                <Stack gap="4" data-class="site-about-principles-content">
                  <Title order={3} fontSize="xl" data-class="site-about-principles-title">
                    Working principles
                  </Title>
                  {about.principles.map((principle) => (
                    <Text
                      key={principle}
                      textColor="muted-foreground"
                      lineHeight="relaxed"
                      data-class="site-about-principle"
                    >
                      {principle}
                    </Text>
                  ))}
                </Stack>
              </Card>

              <Card data-class="site-about-timeline-card">
                <Stack gap="4" data-class="site-about-timeline-content">
                  <Title order={3} fontSize="xl" data-class="site-about-timeline-title">
                    Timeline placeholders
                  </Title>
                  {about.timeline.map((item) => (
                    <Group key={item.period} gap="4" items="start" data-class="site-about-timeline-item">
                      <Badge variant="secondary" size="sm" data-class="site-about-timeline-period">
                        {item.period}
                      </Badge>
                      <Stack gap="2" data-class="site-about-timeline-copy">
                        <Text component="span" fontWeight="semibold" data-class="site-about-timeline-item-title">
                          {item.title}
                        </Text>
                        <Text
                          component="span"
                          textColor="muted-foreground"
                          lineHeight="relaxed"
                          data-class="site-about-timeline-item-detail"
                        >
                          {item.detail}
                        </Text>
                      </Stack>
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Group>
        </Stack>
      </Container>
    </Block>
  );
}
