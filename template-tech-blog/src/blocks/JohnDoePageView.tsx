import { Block } from "@/components";
import type { SiteContent } from "../../fixtures/site";
import { AboutNarrativeBlock } from "./AboutNarrativeBlock";
import { ArticleShowcaseBlock } from "./ArticleShowcaseBlock";
import { BooksShelfBlock } from "./BooksShelfBlock";
import { HeroBlock } from "./HeroBlock";
import { MediaPresenceBlock } from "./MediaPresenceBlock";
import { NewsletterBlock } from "./NewsletterBlock";
import { ProjectsDirectoryBlock } from "./ProjectsDirectoryBlock";
import { ProofSectionBlock } from "./ProofSectionBlock";

type JohnDoePageViewProps = {
  content: SiteContent;
};

export function JohnDoePageView({ content }: JohnDoePageViewProps) {
  return (
    <Block component="main" min="h-screen" bg="background" data-class="site-main">
      <HeroBlock brand={content.brand} hero={content.hero} />
      <ProofSectionBlock
        positioning={content.positioning}
        proofMetrics={content.proofMetrics}
        pillars={content.pillars}
      />
      <ArticleShowcaseBlock
        featuredArticle={content.featuredArticle}
        articles={content.articles}
      />
      <BooksShelfBlock books={content.books} />
      <ProjectsDirectoryBlock projects={content.projects} />
      <MediaPresenceBlock media={content.media} />
      <AboutNarrativeBlock about={content.about} />
      <NewsletterBlock newsletter={content.newsletter} />
    </Block>
  );
}
