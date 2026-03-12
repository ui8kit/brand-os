import { useEffect } from "react";
import { JohnDoePageView } from "@/blocks";
import { MainLayout } from "@/layouts/MainLayout";
import { siteContent } from "@/data/site-content";

export default function App() {
  useEffect(() => {
    document.title = siteContent.meta.title;
    document.documentElement.lang = siteContent.meta.lang;
  }, []);

  return (
    <MainLayout
      brand={siteContent.brand}
      navigation={siteContent.navigation}
      footer={siteContent.footer}
    >
      <JohnDoePageView content={siteContent} />
    </MainLayout>
  );
}

