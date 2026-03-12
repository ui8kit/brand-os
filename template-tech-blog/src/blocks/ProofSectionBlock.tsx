import { Badge, Block, Card, Container, Group, Stack, Text, Title } from "@/components";
import type { SiteContent } from "../../fixtures/site";

type ProofSectionBlockProps = {
  positioning: SiteContent["positioning"];
  proofMetrics: SiteContent["proofMetrics"];
  pillars: SiteContent["pillars"];
};

export function ProofSectionBlock({ positioning, proofMetrics, pillars }: ProofSectionBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-proof-section" id="proof">
      <Container max="w-7xl" data-class="site-proof-container">
        <Stack gap="8" data-class="site-proof-layout">
          <Stack gap="4" max="w-4xl" data-class="site-proof-head">
            <Badge variant="secondary" size="sm" data-class="site-proof-badge">
              Trust layer
            </Badge>
            <Title order={2} fontSize="3xl" data-class="site-proof-title">
              Structure the homepage around proof, not hype.
            </Title>
            <Text
              textColor="muted-foreground"
              lineHeight="relaxed"
              data-class="site-proof-description"
            >
              These sections turn a generic expert website into a reusable technical editorial system:
              positioning, evidence, and clear topical pillars.
            </Text>
          </Stack>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-proof-positioning-row">
            {positioning.map((statement) => (
              <Card key={statement} variant="outlined" flex="1" data-class="site-positioning-card">
                <Text lineHeight="relaxed" data-class="site-positioning-text">
                  {statement}
                </Text>
              </Card>
            ))}
          </Group>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-proof-metrics-row">
            {proofMetrics.map((metric) => (
              <Card key={metric.label} flex="1" data-class="site-proof-metric-card">
                <Stack gap="2" data-class="site-proof-metric-content">
                  <Text fontWeight="bold" fontSize="lg" data-class="site-proof-metric-value">
                    {metric.value}
                  </Text>
                  <Text fontSize="sm" textColor="muted-foreground" data-class="site-proof-metric-label">
                    {metric.label}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Group>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-proof-pillars-row">
            {pillars.map((pillar) => (
              <Card key={pillar.title} flex="1" data-class="site-pillar-card">
                <Stack gap="4" data-class="site-pillar-content">
                  <Text fontWeight="semibold" fontSize="sm" textColor="primary" data-class="site-pillar-label">
                    {pillar.label}
                  </Text>
                  <Title order={3} fontSize="xl" data-class="site-pillar-title">
                    {pillar.title}
                  </Title>
                  <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-pillar-description">
                    {pillar.description}
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
