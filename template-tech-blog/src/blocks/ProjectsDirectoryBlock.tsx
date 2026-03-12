import {
  Badge,
  Block,
  Button,
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

type ProjectsDirectoryBlockProps = {
  projects: SiteContent["projects"];
};

export function ProjectsDirectoryBlock({ projects }: ProjectsDirectoryBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-projects-section" id="projects">
      <Container max="w-7xl" data-class="site-projects-container">
        <Stack gap="8" data-class="site-projects-layout">
          <Stack gap="4" max="w-4xl" data-class="site-projects-head">
            <Badge variant="outline" size="sm" data-class="site-projects-badge">
              Product and case directory
            </Badge>
            <Title order={2} fontSize="3xl" data-class="site-projects-title">
              Translate product history into readable proof blocks.
            </Title>
            <Text
              textColor="muted-foreground"
              lineHeight="relaxed"
              data-class="site-projects-description"
            >
              These cards are meant for products, consulting cases, bootstrapped services, research
              pipelines, or internal tools that show how the expert actually works.
            </Text>
          </Stack>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-projects-grid">
            {projects.map((project) => (
              <Card key={project.name} flex="1" data-class="site-project-card">
                <Stack gap="4" data-class="site-project-card-stack">
                  <Image
                    src={project.image}
                    alt={`${project.name} placeholder`}
                    aspect="video"
                    fit="cover"
                    rounded="xl"
                    data-class="site-project-card-image"
                  />
                  <Stack gap="2" data-class="site-project-card-head">
                    <Text fontSize="sm" fontWeight="semibold" textColor="primary" data-class="site-project-card-category">
                      {project.category}
                    </Text>
                    <Title order={3} fontSize="xl" data-class="site-project-card-title">
                      {project.name}
                    </Title>
                  </Stack>
                  <CardContent data-class="site-project-card-content">
                    <Stack gap="4" data-class="site-project-card-body">
                      <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-project-card-summary">
                        {project.summary}
                      </Text>
                      <Text fontSize="sm" lineHeight="relaxed" data-class="site-project-card-outcome">
                        {project.outcome}
                      </Text>
                      <Button href={project.href} variant="outline" size="sm" data-class="site-project-card-action">
                        {project.linkLabel}
                      </Button>
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>
            ))}
          </Group>
        </Stack>
      </Container>
    </Block>
  );
}
