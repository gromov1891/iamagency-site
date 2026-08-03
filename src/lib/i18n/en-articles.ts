export type EnglishArticle = {
  slug: string;
  ruSlug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags: string[];
  sections: { heading?: string; paragraphs?: string[]; bullets?: string[] }[];
};

export const EN_ARTICLES: EnglishArticle[] = [
  {
    slug: "claude-for-business-explained",
    ruSlug: "claude-dlya-biznesa-prostym-yazykom",
    title: "Claude for Business, Explained Simply",
    excerpt: "AI is moving beyond one-off chat prompts and becoming a practical operating layer for recurring business work.",
    image: "/blk/blog/96fe8ff810d3.webp",
    imageAlt: "A guide to using Claude in business workflows",
    tags: ["AI", "Business", "Operations"],
    sections: [
      { paragraphs: ["AI is no longer useful only as a place to ask occasional questions. Used well, tools such as Claude can support repeatable workflows, help teams work through large amounts of information and reduce the effort spent switching between systems.", "The useful question is not whether a model can produce text. It is where a controlled AI workflow can remove friction without hiding ownership or judgement."] },
      { heading: "Chat for fast, bounded tasks", paragraphs: ["Chat is the simplest layer: draft an email, challenge an idea, summarise a document or generate alternatives. It works best when the task has a clear input, a visible output and a person who remains responsible for the decision."] },
      { heading: "Projects for recurring work", paragraphs: ["When the same context and standards are needed repeatedly, a project can hold reference material, examples and instructions. This is useful for editorial planning, sales enablement, reporting structures and customer-service guidance."], bullets: ["Keep source material current", "Define what the assistant may and may not assume", "Review outputs against a consistent checklist"] },
      { heading: "Files, tools and connected workflows", paragraphs: ["The larger shift happens when AI works with documents, structured data and connected services. A useful workflow can collect information, transform it and prepare a decision-ready result — while preserving checkpoints for sensitive actions."] },
      { heading: "Where to start", paragraphs: ["Choose one frequent, low-risk process with a measurable cost in time. Document the current steps, test the AI-assisted version and compare quality as well as speed."], bullets: ["Marketing operations", "Sales preparation", "Internal reporting", "Knowledge retrieval", "Customer-support drafts"] },
      { paragraphs: ["AI becomes valuable when it is part of a well-designed process, not when it is treated as a substitute for one. Start narrow, make responsibilities explicit and expand only after the team can see where the gains come from."] },
    ],
  },
  {
    slug: "what-drives-sales-in-2026",
    ruSlug: "chto-vliyaet-na-prodazhi-v-2026",
    title: "What Really Drives Sales in 2026",
    excerpt: "Sales rarely move because of one channel. Product clarity, trust and a coherent customer journey do the heavy lifting together.",
    image: "/blk/blog/0b713db08b53.webp",
    imageAlt: "A guide to the factors that influence sales in 2026",
    tags: ["Marketing", "Sales", "Strategy"],
    sections: [
      { paragraphs: ["A single post or media campaign rarely creates durable sales growth. Results usually improve when the offer, evidence, content and next step form one understandable journey.", "That is why adding another channel is often less important than removing confusion from the path customers already take."] },
      { heading: "A proposition people can repeat", paragraphs: ["A customer should quickly understand who the product is for, what problem it solves and why this option deserves attention. Clear language is a commercial advantage, particularly when competing offers look similar."] },
      { heading: "Evidence before promises", paragraphs: ["Case studies, customer stories, team expertise, process visibility and honest limitations create stronger trust than superlatives. Content should demonstrate how the company thinks and works."] },
      { heading: "One message across the journey", paragraphs: ["Social, the website, advertising and sales conversations should reinforce the same core idea. When each channel presents a different proposition, the buyer has to do the integration work themselves."] },
      { heading: "What to review first", bullets: ["Can a new visitor understand the offer in seconds?", "Is there specific evidence for the main claims?", "Does content answer real buying questions?", "Is the mobile enquiry path simple?", "Do channel metrics connect to a useful commercial signal?"] },
      { paragraphs: ["The practical goal is not perfect attribution. It is a coherent system in which every channel has a role and the team can see where customers lose confidence or momentum."] },
    ],
  },
  {
    slug: "instagram-growth-rules-have-changed",
    ruSlug: "instagram-po-starim-pravilam",
    title: "Instagram Growth Rules Have Changed",
    excerpt: "Sustainable growth now depends on original material, a clear account proposition and genuine audience response.",
    image: "/blk/blog/e7fa50c7bae4.webp",
    imageAlt: "An article about changing Instagram and social media growth rules",
    tags: ["Social media", "Instagram", "Content"],
    sections: [
      { paragraphs: ["Repeating yesterday's growth tactics no longer produces a predictable result. Audiences recognise generic formats quickly, while platforms have more signals about whether people genuinely choose to watch, save, share or continue exploring.", "The answer is not to publish more at any cost. It is to give the right audience a clear reason to return."] },
      { heading: "Define the role of the account", paragraphs: ["Decide what following should consistently provide: practical analysis, inspiration, category news, access to an expert or a useful view behind the product. Without that promise, every post has to win attention from zero."] },
      { heading: "Original material creates memory", paragraphs: ["Customer questions, team observations, real projects, tests and production footage are harder to replace than a copied template. The execution can be simple when the point of view is specific."] },
      { heading: "Design repeatable formats", paragraphs: ["Recurring formats help the audience recognise value and help the team produce consistently. A format should be flexible enough to evolve but precise enough that everyone understands why it exists."] },
      { heading: "Measure beyond reach", bullets: ["Saves and meaningful shares", "Profile and website journeys", "Replies and qualified comments", "Repeat views and returning visitors", "Enquiries and conversations influenced by content"] },
      { paragraphs: ["Growth begins with positioning: who the account speaks to, what it provides and why its material cannot be replaced by the next account in the feed."] },
    ],
  },
  {
    slug: "tools-for-social-media-visuals",
    ruSlug: "servisy-dlya-sozdaniya-vizuala",
    title: "Four Tools for Better Social Media Visuals",
    excerpt: "Good visual content does not need unnecessary complexity. Choose each tool for a clear job and protect the brand system around it.",
    image: "/blk/blog/f41a088987f8.webp",
    imageAlt: "A guide to tools for creating social media visuals",
    tags: ["Design", "Content", "Tools"],
    sections: [
      { paragraphs: ["A tool does not create a visual identity by itself. It accelerates execution once the team understands the brand character, typography, composition and image rules it needs to preserve.", "These four tool categories cover different stages of a practical social content workflow."] },
      { heading: "Figma for systems and collaboration", paragraphs: ["Figma is useful for templates, carousels, presentations and shared component libraries. A well-structured file reduces repeated decisions and makes consistency easier across a team."] },
      { heading: "Canva for controlled everyday production", paragraphs: ["Canva can help non-designers create routine materials quickly. The important step is to lock in approved templates, type styles and asset libraries before production is distributed."] },
      { heading: "CapCut for fast platform-native video", paragraphs: ["CapCut supports efficient short-form editing, subtitles and simple motion. Use effects selectively: rhythm, clarity and a strong opening usually matter more than visible editing tricks."] },
      { heading: "AI image tools for exploration", paragraphs: ["Generative image tools are useful for references, visual exploration and some campaign assets. Review rights, disclosure needs and brand realism before generated material is published."] },
      { heading: "A simple selection rule", bullets: ["Use Figma to define the system", "Use Canva to scale controlled variations", "Use CapCut for regular short-form editing", "Use AI tools to explore, not to replace art direction"] },
      { paragraphs: ["The strongest setup is rarely one application. It is a small workflow in which each tool has a job and every output is checked against the same brand rules."] },
    ],
  },
];

export const getEnglishArticle = (slug: string) => EN_ARTICLES.find((article) => article.slug === slug);
