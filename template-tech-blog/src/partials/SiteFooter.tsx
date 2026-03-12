import { Block, Button, Container, Group, Stack, Text, Title } from "@/components";
import type { SiteContent } from "../../fixtures/site";

type SiteFooterProps = {
  brand: SiteContent["brand"];
  footer: SiteContent["footer"];
};

export function SiteFooter({ brand, footer }: SiteFooterProps) {
  return (
    <Block component="footer" border="" py="8" data-class="site-footer-shell" id="footer">
      <Container max="w-7xl" data-class="site-footer">
        <Stack gap="8" data-class="site-footer-layout">
          <Group flex="wrap" gap="8" items="start" justify="between" data-class="site-footer-top">
            <Stack gap="4" max="w-lg" data-class="site-footer-brand">
              <Title order={2} fontSize="xl" data-class="site-footer-brand-title">
                {brand.logo.wordmark}
              </Title>
              <Text textColor="muted-foreground" lineHeight="relaxed" data-class="site-footer-brand-note">
                {footer.note}
              </Text>
            </Stack>

            <Group flex="wrap" gap="8" items="start" data-class="site-footer-groups">
              {footer.linkGroups.map((group) => (
                <Stack key={group.title} gap="4" data-class="site-footer-group">
                  <Text component="span" fontWeight="semibold" data-class="site-footer-group-title">
                    {group.title}
                  </Text>
                  <Stack gap="2" data-class="site-footer-links">
                    {group.links.map((link) => (
                      <Button
                        key={link.label}
                        href={link.href}
                        variant="link"
                        size="xs"
                        data-class="site-footer-link"
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Group>
          </Group>

          <Group flex="wrap" gap="4" justify="between" items="center" data-class="site-footer-bottom">
            <Text fontSize="xs" textColor="muted-foreground" data-class="site-footer-copyright">
              © {new Date().getFullYear()} {brand.logo.wordmark}. Built from isolated fixtures.
            </Text>
            <Group gap="4" flex="wrap" items="center" data-class="site-footer-legal">
              {footer.legal.map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  variant="link"
                  size="xs"
                  data-class="site-footer-legal-link"
                >
                  {item.label}
                </Button>
              ))}
            </Group>
          </Group>
        </Stack>
      </Container>
    </Block>
  );
}
