import {
  Badge,
  Block,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@/components";
import type { SiteContent } from "../../fixtures/site";

type ArticleShowcaseBlockProps = {
  featuredArticle: SiteContent["featuredArticle"];
  articles: SiteContent["articles"];
};

export function ArticleShowcaseBlock({ featuredArticle, articles }: ArticleShowcaseBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-journal-section" id="journal">
      <Container max="w-7xl" data-class="site-journal-container">
        <Stack gap="8" data-class="site-journal-layout">
          <Stack gap="4" max="w-4xl" data-class="site-journal-head">
            <Badge variant="outline" size="sm" data-class="site-journal-badge">
              Journal
            </Badge>
            <Title order={2} fontSize="3xl" data-class="site-journal-title">
              A full publishing surface for essays, case studies, and operator notes.
            </Title>
            <Text
              textColor="muted-foreground"
              lineHeight="relaxed"
              data-class="site-journal-description"
            >
              The template ships with a featured story and a reusable article card grid, so the future
              content model only needs fixture replacement.
            </Text>
          </Stack>

          <Card data-class="site-featured-article-card">
            <Group flex="wrap" gap="6" items="stretch" data-class="site-featured-article-grid">
              <Block flex="1" data-class="site-featured-article-media">
                <Image
                  src={featuredArticle.image.src}
                  alt={featuredArticle.image.alt}
                  aspect="video"
                  fit="cover"
                  rounded="xl"
                  data-class="site-featured-article-image"
                />
              </Block>
              <Stack gap="4" flex="1" data-class="site-featured-article-copy">
                <Badge variant="secondary" size="sm" data-class="site-featured-article-badge">
                  {featuredArticle.label}
                </Badge>
                <Stack gap="4" data-class="site-featured-article-text">
                  <Title order={3} fontSize="3xl" data-class="site-featured-article-title">
                    {featuredArticle.title}
                  </Title>
                  <Text
                    textColor="muted-foreground"
                    lineHeight="relaxed"
                    data-class="site-featured-article-excerpt"
                  >
                    {featuredArticle.excerpt}
                  </Text>
                </Stack>
                <Group gap="4" flex="wrap" items="center" data-class="site-featured-article-meta">
                  <Text component="span" fontSize="sm" textColor="muted-foreground" data-class="site-featured-article-meta-text">
                    {featuredArticle.meta}
                  </Text>
                  <Button href={featuredArticle.href} size="sm" data-class="site-featured-article-action">
                    Open article layout
                  </Button>
                </Group>
              </Stack>
            </Group>
          </Card>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-article-grid">
            {articles.map((article) => (
              <Card key={article.title} flex="1" data-class="site-article-card">
                <Image
                  src={article.image}
                  alt={`${article.title} placeholder`}
                  aspect="video"
                  fit="cover"
                  rounded="xl"
                  data-class="site-article-card-image"
                />
                <CardHeader data-class="site-article-card-header">
                  <Text fontSize="sm" fontWeight="semibold" textColor="primary" data-class="site-article-card-category">
                    {article.category}
                  </Text>
                  <CardTitle order={3} data-class="site-article-card-title">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent data-class="site-article-card-content">
                  <Stack gap="4" data-class="site-article-card-stack">
                    <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-article-card-excerpt">
                      {article.excerpt}
                    </Text>
                    <Group gap="4" justify="between" items="center" data-class="site-article-card-meta">
                      <Text fontSize="sm" textColor="muted-foreground" data-class="site-article-card-meta-text">
                        {article.meta}
                      </Text>
                      <Button href={article.href} variant="outline" size="xs" data-class="site-article-card-link">
                        Read more
                      </Button>
                    </Group>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Group>
        </Stack>
      </Container>
    </Block>
  );
}
