import { Badge, Block, Button, Container, Group, Image, Stack, Text } from "@/components";
import type { SiteContent } from "../../fixtures/site";
import { ThemeToggle } from "./ThemeToggle";

type SiteHeaderProps = {
  brand: SiteContent["brand"];
  navigation: SiteContent["navigation"];
};

export function SiteHeader({ brand, navigation }: SiteHeaderProps) {
  return (
    <Block component="header" sticky="" top="0" z="30" data-class="site-header-shell">
      <Container
        component="nav"
        max="w-7xl"
        py="4"
        flex=""
        justify="between"
        items="center"
        gap="6"
        data-class="site-header"
      >
        <Group gap="4" items="center" data-class="site-brand">
          <Image
            src={brand.logo.markSrc}
            alt={brand.logo.alt}
            width={40}
            height={40}
            rounded="md"
            data-class="site-brand-mark"
          />
          <Stack gap="1" data-class="site-brand-copy">
            <Text component="span" fontWeight="semibold" data-class="site-brand-wordmark">
              {brand.logo.wordmark}
            </Text>
            <Text
              component="span"
              fontSize="xs"
              textColor="muted-foreground"
              data-class="site-brand-tagline"
            >
              {brand.logo.tagline}
            </Text>
          </Stack>
        </Group>

        <Group gap="2" flex="wrap" justify="end" items="center" data-class="site-header-actions">
          {navigation.primary.map((item) => (
            <Button
              key={item.label}
              variant="link"
              size="xs"
              href={item.href}
              data-class="site-header-link"
            >
              {item.label}
            </Button>
          ))}
          <ThemeToggle />
          <Button href={navigation.secondary[0]?.href ?? "#newsletter"} size="xs" data-class="site-header-cta">
            {navigation.secondary[0]?.label ?? "Newsletter"}
          </Button>
        </Group>
      </Container>

      <Container max="w-7xl" pb="4" data-class="site-header-keywords">
        <Group gap="2" flex="wrap" items="center" data-class="site-header-keywords-row">
          {brand.keywords.map((keyword) => (
            <Badge key={keyword} variant="outline" size="sm" data-class="site-header-keyword">
              {keyword}
            </Badge>
          ))}
        </Group>
      </Container>
    </Block>
  );
}
