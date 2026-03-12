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

type BooksShelfBlockProps = {
  books: SiteContent["books"];
};

export function BooksShelfBlock({ books }: BooksShelfBlockProps) {
  return (
    <Block component="section" py="16" data-class="site-books-section" id="books">
      <Container max="w-7xl" data-class="site-books-container">
        <Stack gap="8" data-class="site-books-layout">
          <Stack gap="4" max="w-4xl" data-class="site-books-head">
            <Badge variant="secondary" size="sm" data-class="site-books-badge">
              Books and library
            </Badge>
            <Title order={2} fontSize="3xl" data-class="site-books-title">
              Use books and long-form knowledge assets as part of the trust layer.
            </Title>
            <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-books-description">
              A technical expert template benefits from shelf-like cards for books, guides, notebooks,
              or other intellectual assets that prove depth beyond a feed of posts.
            </Text>
          </Stack>

          <Group gap="4" flex="wrap" items="stretch" data-class="site-books-grid">
            {books.map((book) => (
              <Card key={book.title} flex="1" data-class="site-book-card">
                <Stack gap="4" data-class="site-book-card-stack">
                  <Image
                    src={book.image}
                    alt={`${book.title} placeholder`}
                    aspect="video"
                    fit="cover"
                    rounded="xl"
                    data-class="site-book-card-image"
                  />
                  <Stack gap="2" data-class="site-book-card-head">
                    <Badge variant="outline" size="sm" data-class="site-book-card-badge">
                      {book.badge}
                    </Badge>
                    <Title order={3} fontSize="xl" data-class="site-book-card-title">
                      {book.title}
                    </Title>
                    <Text fontSize="sm" textColor="muted-foreground" data-class="site-book-card-edition">
                      {book.edition}
                    </Text>
                  </Stack>
                  <CardContent data-class="site-book-card-content">
                    <Stack gap="4" data-class="site-book-card-body">
                      <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-book-card-summary">
                        {book.summary}
                      </Text>
                      <Group gap="2" flex="wrap" items="center" data-class="site-book-card-tags">
                        {book.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" size="sm" data-class="site-book-card-tag">
                            {tag}
                          </Badge>
                        ))}
                      </Group>
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
