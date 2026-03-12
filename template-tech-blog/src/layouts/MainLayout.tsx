import type { ReactNode } from "react";
import type { SiteContent } from "../../fixtures/site";
import { SiteFooter } from "../partials/SiteFooter";
import { SiteHeader } from "../partials/SiteHeader";

type MainLayoutProps = {
  brand: SiteContent["brand"];
  navigation: SiteContent["navigation"];
  footer: SiteContent["footer"];
  children: ReactNode;
};

export function MainLayout({ brand, navigation, footer, children }: MainLayoutProps) {
  return (
    <>
      <SiteHeader brand={brand} navigation={navigation} />
      {children}
      <SiteFooter brand={brand} footer={footer} />
    </>
  );
}
