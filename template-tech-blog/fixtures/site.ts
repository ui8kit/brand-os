import { placeholderImages } from "./placeholders";

export const siteContent = {
  meta: {
    lang: "en",
    title: "John Doe | Systems Journal",
    description:
      "A calm technical journal for operators, founders, and infrastructure-minded builders who care about systems, data, and honest execution.",
  },
  brand: {
    name: "John Doe",
    descriptor: "Systems operator, technical writer, and independent founder",
    logo: {
      markSrc: placeholderImages.logo,
      alt: "John Doe logo placeholder",
      wordmark: "John Doe",
      tagline: "Systems Journal",
    },
    keywords: ["Systems", "Data", "Infrastructure", "Operator Notes", "Honest Growth"],
  },
  navigation: {
    primary: [
      { label: "Home", href: "#home" },
      { label: "Journal", href: "#journal" },
      { label: "Books", href: "#books" },
      { label: "Projects", href: "#projects" },
      { label: "Media", href: "#media" },
      { label: "About", href: "#about" },
    ],
    secondary: [
      { label: "Newsletter", href: "#newsletter" },
      { label: "Contact", href: "#footer" },
    ],
  },
  hero: {
    eyebrow: "Universal technical IT blogger template",
    title: "A trusted editorial home for technical expertise, operator notes, and product evidence.",
    summary:
      "This template turns a single expert voice into a complete site: long-form writing, proof metrics, books, project cases, media presence, and a newsletter, all powered by isolated fixtures.",
    primaryAction: {
      label: "Read the journal",
      href: "#journal",
    },
    secondaryAction: {
      label: "Review proof signals",
      href: "#proof",
    },
    image: {
      src: placeholderImages.hero,
      alt: "Hero placeholder for a technical editorial website",
    },
    highlightPoints: [
      "Long-form essays with a real editorial rhythm",
      "Books, projects, and platform presence as trust layers",
      "Fixture-driven content for easy replacement",
    ],
  },
  positioning: [
    "Built for technical operators, founders, consultants, and domain experts",
    "Calm, credible, and reusable across different frameworks",
    "Structured around proof, not personality theater",
  ],
  proofMetrics: [
    { value: "30+", label: "Years around systems and internet products" },
    { value: "3", label: "Books or long-form knowledge assets" },
    { value: "8", label: "Products, services, or case tracks worth documenting" },
    { value: "1", label: "Consistent editorial voice across all surfaces" },
  ],
  pillars: [
    {
      label: "Systems",
      title: "Infrastructure, architecture, and the machine underneath the interface",
      description:
        "Write for people who still care how traffic, monitoring, data movement, and product operations actually work.",
    },
    {
      label: "Data",
      title: "Signals, collections, research, and the business side of information",
      description:
        "Explain how data becomes an operational advantage without turning the site into a startup-sales funnel.",
    },
    {
      label: "Operator",
      title: "Lessons from running products, dealing with failure, and staying practical",
      description:
        "Use the template for measured, experienced writing instead of hype, guru positioning, or generic thought leadership.",
    },
  ],
  featuredArticle: {
    label: "Featured essay",
    title: "Why the best technical writing sounds like field notes, not startup theater",
    excerpt:
      "A long-form opening piece that explains the expert's worldview: write from operating experience, show the evidence, and keep the language understandable for serious readers.",
    href: "#journal",
    image: {
      src: placeholderImages.article,
      alt: "Featured article placeholder image",
    },
    meta: "12 min read • Editorial essay",
  },
  articles: [
    {
      category: "Systems",
      title: "What still matters when you have been in IT for decades",
      excerpt:
        "A practical reflection on engineering memory, operating discipline, and why some fundamentals never stop compounding.",
      href: "#journal",
      meta: "Essay • 9 min read",
      image: placeholderImages.article,
    },
    {
      category: "Data",
      title: "How to explain data products without drowning in abstraction",
      excerpt:
        "A clean article card for a topic that combines infrastructure, parsing, catalog workflows, and business outcomes.",
      href: "#journal",
      meta: "Case note • 7 min read",
      image: placeholderImages.project,
    },
    {
      category: "Operator",
      title: "What honest growth looks like when nothing compounds overnight",
      excerpt:
        "Use this slot for bootstrapping stories, product rebuilds, revenue lessons, and failures that actually taught something.",
      href: "#journal",
      meta: "Operator note • 8 min read",
      image: placeholderImages.media,
    },
    {
      category: "Media",
      title: "Turning interviews, talks, and comment threads into reusable knowledge",
      excerpt:
        "A supporting card for podcast appearances, videos, community sessions, and external media proofs.",
      href: "#media",
      meta: "Interview • 6 min read",
      image: placeholderImages.media,
    },
  ],
  books: [
    {
      badge: "Book",
      title: "Network Systems Field Manual",
      edition: "Third edition placeholder",
      summary:
        "A placeholder for a practical book that proves long-term engineering depth and gives the site an intellectual foundation.",
      image: placeholderImages.book,
      tags: ["Infrastructure", "Networks", "Practice"],
    },
    {
      badge: "Guide",
      title: "Data Collection and Signal Design",
      edition: "Working title placeholder",
      summary:
        "A second book or knowledge asset slot for research pipelines, parsing, catalog logic, or operational metrics.",
      image: placeholderImages.book,
      tags: ["Data", "Research", "Signals"],
    },
    {
      badge: "Notes",
      title: "Operator Journal: Building Products Without Hype",
      edition: "Series placeholder",
      summary:
        "A flexible placeholder for essays, notebooks, or a future publishing series that strengthens trust around the expert voice.",
      image: placeholderImages.book,
      tags: ["Operator", "Writing", "Essays"],
    },
  ],
  projects: [
    {
      name: "Signal Watch",
      category: "Traffic defense",
      summary:
        "A placeholder case for a product that protects paid traffic, surfaces anomalies, and explains hidden losses in plain language.",
      outcome: "Example: reduced unknown waste and improved reporting confidence",
      image: placeholderImages.project,
      linkLabel: "View case",
      href: "#projects",
    },
    {
      name: "Catalog Atlas",
      category: "Data collection",
      summary:
        "A placeholder for a product built around crawling, catalog normalization, search feeds, or market intelligence pipelines.",
      outcome: "Example: turned raw web data into a reusable commercial asset",
      image: placeholderImages.project,
      linkLabel: "View case",
      href: "#projects",
    },
    {
      name: "Operator CRM",
      category: "Internal tools",
      summary:
        "A placeholder for a simple internal product or service layer that reflects the author's systems-first taste in software.",
      outcome: "Example: improved workflow clarity without enterprise bloat",
      image: placeholderImages.project,
      linkLabel: "View case",
      href: "#projects",
    },
  ],
  media: {
    highlights: [
      {
        label: "Video",
        title: "Operator interview: what actually changes when markets get noisy",
        summary:
          "A placeholder for an interview or talk that sounds grounded, technical, and experience-heavy.",
        image: placeholderImages.media,
      },
      {
        label: "Podcast",
        title: "Explaining technical businesses without marketing theater",
        summary:
          "A placeholder media card for podcasts, external channels, or conversations with founders and engineers.",
        image: placeholderImages.media,
      },
    ],
    platforms: [
      { name: "Journal", detail: "Flagship essays and operator notes" },
      { name: "YouTube", detail: "Talks, breakdowns, and commentary" },
      { name: "Telegram", detail: "Short operator notes and community updates" },
      { name: "LinkedIn", detail: "Professional distribution and commentary" },
      { name: "Habr", detail: "Deep technical writing and case studies" },
      { name: "vc.ru", detail: "Founder and business reflections" },
    ],
  },
  about: {
    portrait: {
      src: placeholderImages.portrait,
      alt: "Portrait placeholder for John Doe",
    },
    summary:
      "John Doe is a placeholder identity for a mature technical expert: a systems-minded operator who writes clearly, documents real work, and builds trust through evidence instead of hype.",
    principles: [
      "Explain systems in human language.",
      "Prefer evidence over abstract positioning.",
      "Treat books, essays, and products as one ecosystem.",
      "Keep the design calm enough for long reading.",
    ],
    timeline: [
      {
        period: "1990s",
        title: "Built the engineering foundation",
        detail: "Early years in networks, systems, and the real mechanics of internet infrastructure.",
      },
      {
        period: "2000s",
        title: "Turned expertise into knowledge assets",
        detail: "Books, frameworks, and internal operating notes became part of the public voice.",
      },
      {
        period: "2010s",
        title: "Built products around data and traffic",
        detail: "Hands-on work with data products, monitoring, catalogs, or traffic-defense style systems.",
      },
      {
        period: "Today",
        title: "Publishes operator notes for technical founders",
        detail: "The site becomes a calm journal, library, and trust layer for everything learned along the way.",
      },
    ],
  },
  newsletter: {
    eyebrow: "Stay in the loop",
    title: "A low-noise briefing for technical operators and thoughtful founders.",
    summary:
      "Use this area for a weekly or monthly dispatch: essays, practical notes, new case studies, and selective links worth reading.",
    benefits: [
      "No hype-based funnels",
      "Only useful notes, cases, and links",
      "Easy to replace with a real newsletter stack later",
    ],
    ctaLabel: "Subscribe",
  },
  footer: {
    note:
      "This template is built to stay generic: replace the fixtures, keep the structure, and adapt the brand layer to any serious technical expert.",
    linkGroups: [
      {
        title: "Sections",
        links: [
          { label: "Home", href: "#home" },
          { label: "Journal", href: "#journal" },
          { label: "Books", href: "#books" },
          { label: "Projects", href: "#projects" },
        ],
      },
      {
        title: "Proof",
        links: [
          { label: "Media", href: "#media" },
          { label: "About", href: "#about" },
          { label: "Newsletter", href: "#newsletter" },
          { label: "Contact", href: "#footer" },
        ],
      },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "RSS", href: "#" },
    ],
  },
} as const;

export type SiteContent = typeof siteContent;
