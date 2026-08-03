export type EnglishOffer = {
  slug: string;
  name: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  deliverables: string[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

const offer = (
  slug: string,
  name: string,
  short: string,
  h1: string,
  intro: string,
  deliverables: string[],
  outcomes: string[],
  faq: EnglishOffer["faq"],
): EnglishOffer => ({
  slug,
  name,
  short,
  h1,
  intro,
  deliverables,
  outcomes,
  faq,
  metaTitle: `${h1} | I AM AGENCY`,
  metaDescription: `${short} Strategy, production and transparent delivery from I AM AGENCY. Discuss your project with our team.`,
});

export const EN_SERVICES: EnglishOffer[] = [
  offer(
    "brand-social-strategy",
    "Brand & social strategy",
    "Positioning, identity and a practical social media system built around your business goals.",
    "Brand and Social Media Strategy",
    "We turn scattered ideas into a clear brand and social media system. Research, positioning, tone of voice, visual direction and channel planning are developed together, so the strategy can guide daily decisions instead of living in a presentation.",
    ["Audience and competitor research", "Positioning and value proposition", "Tone of voice and messaging", "Visual direction and brand guidelines", "Channel roles, content pillars and roadmap"],
    ["A consistent brand across touchpoints", "Faster content and campaign decisions", "A roadmap your internal team can actually use"],
    [
      { q: "Can you work with an existing brand?", a: "Yes. We can refine an existing system or build one from the ground up after reviewing your current assets and business goals." },
      { q: "Do we receive editable guidelines?", a: "Yes. Deliverables are structured for day-to-day use by your team, designers and external partners." },
      { q: "Can strategy be followed by ongoing management?", a: "Yes. The strategy can become the foundation for our social media management, production and paid campaign work." },
    ],
  ),
  offer(
    "social-media-management",
    "Social media management",
    "End-to-end planning, creation, publishing, community management and reporting.",
    "Social Media Management Agency",
    "We manage social channels as a connected editorial and commercial system. Our team plans the calendar, develops platform-native ideas, coordinates production, publishes consistently and turns performance data into the next round of decisions.",
    ["Channel and content strategy", "Editorial calendar and copywriting", "Design, short-form video and stories", "Publishing and community workflows", "Monthly reporting and recommendations"],
    ["A recognisable and consistent presence", "Less operational load for your team", "Content decisions tied to measurable goals"],
    [
      { q: "Which platforms do you manage?", a: "We build the mix around the audience and market. Typical scopes include Instagram, Telegram, VK, YouTube and other relevant channels." },
      { q: "Can you create the content too?", a: "Yes. Design, mobile production, photography, video and editing can be included in one scope." },
      { q: "How do approvals work?", a: "We agree roles, deadlines and an approval rhythm before launch, then keep one transparent calendar for the whole team." },
    ],
  ),
  offer(
    "social-media-marketing",
    "Social media marketing",
    "Organic content, paid distribution and creator partnerships working as one growth programme.",
    "Social Media Marketing Services",
    "We connect organic social, paid campaigns, creator collaborations and audience development around one commercial objective. Creative and media are reviewed together, allowing the team to scale what resonates and stop spending on what does not.",
    ["Growth strategy and campaign planning", "Paid social creative and media management", "Influencer and UGC programmes", "Audience development and seeding", "Performance analysis and iteration"],
    ["A joined-up acquisition system", "Stronger creative feedback loops", "Clearer visibility into spend and response"],
    [
      { q: "Can you manage both organic and paid social?", a: "Yes. Combining both usually produces better creative learning and a more consistent customer journey." },
      { q: "Do you work with creators?", a: "Yes. We can handle discovery, outreach, briefs, approvals, usage rights and reporting." },
      { q: "What do you report on?", a: "We agree useful metrics before launch, from reach and qualified traffic to enquiries, sales signals and cost efficiency." },
    ],
  ),
  offer(
    "content-production",
    "Content production",
    "Mobile content, photography and video production designed for fast-moving social channels.",
    "Social Media Content Production",
    "We produce content that fits the platform, the brand and the pace of the publishing calendar. The scope can range from an efficient mobile shoot to a full campaign production with concept, crew, casting, location and post-production.",
    ["Creative concept and references", "Scripts, shot lists and production plan", "Mobile, photo or video shoot", "Editing, motion and retouching", "Platform-ready exports and asset library"],
    ["A reusable bank of on-brand assets", "More consistent publishing", "Creative built for real channel formats"],
    [
      { q: "Can you organise the full shoot?", a: "Yes. We can manage concept, team, location, schedule and post-production as one project." },
      { q: "Do you offer mobile-first production?", a: "Yes. It is often the right format for frequent, natural social content and can be combined with higher-production campaign assets." },
      { q: "Who owns the final files?", a: "The agreed final assets are delivered to the client. Usage terms for talent, music and third-party materials are confirmed in the production scope." },
    ],
  ),
];

export const EN_PACKAGES: EnglishOffer[] = [
  offer(
    "momentum",
    "Momentum",
    "A focused monthly package for brands that need a reliable social media foundation.",
    "Momentum Social Media Package",
    "Momentum creates the operating rhythm a growing brand needs: a clear monthly direction, regular content and a reliable publishing process. We tailor the final channel mix and volume after a short discovery call.",
    ["Monthly content direction", "Editorial calendar", "Copy, design and publishing", "Core community workflow", "Monthly performance review"],
    ["Consistent brand activity", "A clear monthly workflow", "A foundation ready to scale"],
    [
      { q: "Is the package fixed?", a: "It provides a clear starting framework. The final deliverables reflect your channels, production needs and approval process." },
      { q: "Can paid campaigns be added?", a: "Yes. Paid social and additional production can be added when the organic foundation is ready." },
      { q: "How quickly can we start?", a: "Timing depends on discovery and asset readiness. We confirm a realistic onboarding and first-publication schedule in the proposal." },
    ],
  ),
  offer(
    "breakthrough",
    "Breakthrough",
    "An integrated package combining ongoing content with active audience growth.",
    "Breakthrough Social Media Growth Package",
    "Breakthrough is built for brands ready to combine consistent channel management with campaigns, creative testing and audience development. One team connects the organic calendar, paid distribution and reporting.",
    ["Ongoing channel management", "Expanded content production", "Paid social planning and optimisation", "Creative testing programme", "Integrated monthly reporting"],
    ["Faster learning across organic and paid", "More qualified reach", "A scalable content and acquisition rhythm"],
    [
      { q: "Who is this package for?", a: "It suits brands with a validated offer that need stronger distribution and a more active testing cadence." },
      { q: "Is media spend included?", a: "Media spend is normally agreed and paid separately, so you retain full visibility and control." },
      { q: "Can creators be included?", a: "Yes. Creator partnerships and UGC can be added to the campaign plan." },
    ],
  ),
  offer(
    "triumph",
    "Triumph",
    "A senior, full-service programme for brands with ambitious multi-channel goals.",
    "Triumph Full-Service Social Media Package",
    "Triumph brings strategy, ongoing management, production, paid campaigns and creator work into one senior programme. It is designed for complex launches, several audiences or a brand that needs an embedded external social team.",
    ["Senior strategic leadership", "Multi-channel editorial management", "Regular production and campaign assets", "Paid media and creator programmes", "Executive-level reporting and planning"],
    ["One accountable team across workstreams", "Consistent brand quality at scale", "A clearer link between social activity and business priorities"],
    [
      { q: "Can you work with our in-house team?", a: "Yes. We define ownership clearly and can operate as a lead partner, specialist pod or extension of your existing team." },
      { q: "Do you support launches?", a: "Yes. The programme can include launch strategy, production, paid distribution, creator activation and live optimisation." },
      { q: "How is the scope priced?", a: "After discovery we provide a transparent scope covering team, deliverables, cadence, media responsibilities and optional production." },
    ],
  ),
];

export const EN_CASES: EnglishOffer[] = [
  ["beauty", "Beauty", "Social media work for salons, clinics and beauty brands.", "Social Media Case Studies for Beauty Brands", "In beauty, visual quality creates the first impression while proof, expertise and a simple booking path build trust. Our category work connects brand direction, repeatable production and conversion-focused content.", ["Visual systems designed for frequent publishing", "Expert-led education and trust content", "Campaigns built around bookings or product discovery"], ["A more distinctive category presence", "A clearer path from content to enquiry", "Reusable creative formats for the team"]],
  ["fashion", "Fashion", "Social media work for clothing, accessories and lifestyle labels.", "Social Media Case Studies for Fashion Brands", "Fashion social must function as both culture and storefront. We build a recognisable visual language, plan content around collections and connect storytelling with the path to purchase.", ["Campaign and collection narratives", "Lookbook, product and creator content", "Organic and paid launch support"], ["A consistent visual world", "Stronger product discovery", "Content that can travel across channels"]],
  ["sports-education", "Sport & education", "Growth-focused social programmes for studios, schools and learning products.", "Social Media Case Studies for Sport and Education", "Sport and education brands sell progress. We make that progress visible through student stories, expert content, useful formats and campaigns that guide people towards a trial, consultation or enrolment.", ["Proof-led content and participant stories", "Expert formats and practical education", "Campaign journeys for trials and enrolment"], ["Clearer reasons to join", "More useful audience conversations", "A repeatable enrolment content system"]],
  ["personal-brands", "Personal brands", "Positioning and content systems for experts, founders and specialists.", "Personal Brand Social Media Case Studies", "A credible personal brand is built from a clear point of view and consistent evidence. We translate expertise into positioning, recurring formats and an editorial system that feels human without becoming improvised.", ["Positioning and message architecture", "Founder-led video and editorial formats", "Content journeys for services, products or speaking"], ["A more recognisable expert voice", "Greater trust before the first conversation", "A sustainable creation workflow"]],
  ["real-estate", "Real estate", "Social media programmes for developers, agencies and property projects.", "Real Estate Social Media Case Studies", "Real estate has a long decision cycle and a high need for trust. We combine location and property storytelling with useful decision content, lead pathways and campaign creative for distinct buyer segments.", ["Property and location storytelling", "Buyer education and objection handling", "Lead campaigns and enquiry journeys"], ["Better-qualified attention", "More consistent project presentation", "A clearer route to viewing or consultation"]],
  ["travel-hospitality", "Travel & hospitality", "Content and campaigns for destinations, hotels and travel services.", "Travel and Hospitality Social Media Case Studies", "Travel content must create desire and remove uncertainty at the same time. We balance atmospheric storytelling with practical detail, guest experience and clear booking routes.", ["Destination and experience narratives", "Guest, creator and property content", "Seasonal campaign planning"], ["A stronger sense of place", "Content that supports consideration", "More reusable seasonal assets"]],
  ["automotive", "Automotive", "Social media work for automotive services, products and communities.", "Automotive Social Media Case Studies", "Automotive audiences care about detail, credibility and identity. We develop content systems that show the product clearly, respect category knowledge and give campaigns enough creative variety to perform.", ["Product and service explainers", "Detail-led photo and video", "Community and campaign formats"], ["More credible category communication", "Stronger product understanding", "A deeper bank of performance creative"]],
  ["horeca", "Hospitality & restaurants", "Social media work for restaurants, cafés and hospitality concepts.", "Restaurant and Hospitality Social Media Case Studies", "For restaurants and cafés, social is often the first visit. We make the concept, food, atmosphere and reason to book immediately understandable, then build an efficient production and publishing rhythm.", ["Concept and menu storytelling", "Food, team and atmosphere production", "Local campaigns and booking prompts"], ["A clearer venue identity", "More reasons to visit now", "Consistent content without disrupting operations"]],
  ["ecommerce", "Ecommerce", "Content and acquisition programmes for product-led businesses.", "Ecommerce Social Media Case Studies", "Ecommerce social has to earn attention and make products easy to understand. We combine product demonstration, customer proof, creator assets and paid testing around the commercial journey.", ["Product education and demonstration", "UGC and creator workflows", "Paid creative testing and iteration"], ["More useful product content", "A broader creative testing pipeline", "A smoother path from discovery to purchase"]],
  ["events", "Events", "Launch and live social support for events, conferences and experiences.", "Event Social Media Case Studies", "Events need momentum before, during and after the date. We build a campaign narrative, capture useful live material and turn the event into a bank of proof and content for the next cycle.", ["Announcement and speaker storytelling", "Registration-focused campaign content", "Live capture and post-event repurposing"], ["A stronger registration narrative", "Real-time audience participation", "Longer value from every event"]],
].map(([slug, name, short, h1, intro, deliverables, outcomes]) =>
  offer(
    slug as string,
    name as string,
    short as string,
    h1 as string,
    intro as string,
    deliverables as string[],
    outcomes as string[],
    [
      { q: "Can you share relevant project examples?", a: "Yes. Tell us your category and goal, and we will select the closest work we are permitted to discuss." },
      { q: "Do you work with brands outside Russia?", a: "Yes. Social delivery can be organised remotely, while production requirements are planned around location, language and local partners." },
      { q: "Can we start with a focused project?", a: "Yes. A strategy, campaign or production sprint can be a practical first step before ongoing work." },
    ],
  ),
);

export const EN_MARKETING: EnglishOffer[] = [
  ["paid-search", "Paid search", "Search campaigns built around qualified demand, conversion tracking and efficient optimisation.", "Paid Search Management", "We structure search campaigns around real intent, clean measurement and commercial priorities. Search terms, ads, landing pages and bidding are reviewed as one system rather than separate tasks.", ["Demand and keyword mapping", "Campaign and ad development", "Conversion tracking and reporting", "Bid, query and landing-page optimisation"], ["Greater control of qualified demand", "Clearer cost and conversion visibility", "A repeatable optimisation process"]],
  ["seo-services", "SEO", "Technical, content and authority work designed to grow durable organic visibility.", "International SEO Services", "We build organic growth from technical accessibility, search intent, useful content and internal authority. Priorities are tied to the pages and topics most likely to support the business.", ["Technical and indexation audit", "Keyword and intent architecture", "On-page content and internal linking", "Measurement and authority roadmap"], ["More relevant organic visibility", "A clearer search-led site structure", "Compounding content value over time"]],
  ["paid-social", "Paid social", "Creative-led paid campaigns for awareness, demand and measurable action.", "Paid Social Media Advertising", "Paid social works when audience, offer and creative learning move together. We plan the testing system, produce variants and optimise towards the agreed business signal.", ["Audience and offer strategy", "Campaign setup and governance", "Creative concepts and variants", "Testing, optimisation and reporting"], ["Faster creative learning", "More disciplined media decisions", "A scalable paid social system"]],
  ["telegram-advertising", "Telegram advertising", "Channel placements and Telegram Ads planned around audience fit and accountable delivery.", "Telegram Advertising Services", "We use Telegram as a media environment, not a list of channels. Audience overlap, placement quality, message fit and post-click experience are considered before spend is committed.", ["Audience and channel research", "Placement plan and negotiation", "Creative and message adaptation", "Tracking and post-campaign review"], ["Better placement relevance", "Lower risk of low-quality inventory", "Clear learning for the next campaign"]],
  ["cpa-marketing", "CPA marketing", "Partner acquisition programmes governed by quality, attribution and unit economics.", "CPA and Performance Partnership Marketing", "We help structure performance partnerships around approved actions, transparent attribution and lead quality. The goal is controlled incremental acquisition, not inexpensive but unusable volume.", ["Offer and payout design", "Partner and network selection", "Tracking and validation rules", "Quality monitoring and optimisation"], ["More accountable partner growth", "Better protection against poor-quality leads", "Clearer unit economics"]],
  ["marketing-analytics", "Marketing analytics", "A connected measurement layer for channels, customer journeys and commercial decisions.", "Marketing Analytics and Attribution", "We turn fragmented channel data into a decision system. The setup focuses on the questions the team needs to answer, the events required to answer them and a reporting rhythm people will actually use.", ["Measurement and KPI framework", "Event and conversion specification", "Dashboard and source integration", "Attribution review and insight cadence"], ["One shared view of performance", "Faster diagnosis of growth problems", "More confident budget decisions"]],
  ["influencer-marketing", "Influencer marketing", "Creator discovery, campaign production, rights and measurement handled end to end.", "Influencer Marketing Agency", "We select creators for audience and creative fit, then manage the operational detail that determines campaign quality: outreach, briefs, contracts, approvals, usage rights, publication and reporting.", ["Creator and audience research", "Outreach, negotiation and contracting", "Briefs and content approvals", "Usage rights and performance reporting"], ["More relevant creator partnerships", "Stronger and safer campaign execution", "Reusable creator content where agreed"]],
  ["online-reputation-management", "Online reputation management", "Monitoring and response systems that protect trust across search, reviews and social channels.", "Online Reputation Management Services", "Reputation work starts with listening and operational truth. We map visible issues, establish response standards and help the team create credible proof rather than trying to bury criticism.", ["Search, review and social audit", "Response playbook and escalation rules", "Review-generation workflow", "Ongoing monitoring and reporting"], ["Faster, more consistent responses", "Better visibility into recurring issues", "A stronger body of credible proof"]],
  ["pr-services", "PR", "Editorial narratives and outreach designed to build credible visibility over time.", "Digital PR Services", "We help brands define newsworthy angles, prepare evidence and approach relevant publications, communities and opinion leaders. PR is connected to the wider message system so coverage reinforces what customers see elsewhere.", ["Narrative and message development", "Media and community mapping", "Pitch materials and outreach", "Coverage tracking and amplification"], ["More credible third-party visibility", "A clearer public narrative", "PR assets that support other channels"]],
  ["programmatic-advertising", "Programmatic advertising", "Data-led media buying with clear inventory, brand-safety and measurement controls.", "Programmatic Advertising Services", "We plan programmatic activity around audience, context, inventory quality and measurable outcomes. Governance and reporting are defined before launch so reach does not come at the expense of transparency.", ["Audience and inventory strategy", "Platform and partner selection", "Creative specifications and trafficking", "Brand-safety, frequency and outcome reporting"], ["More controlled scaled reach", "Clearer inventory visibility", "Stronger cross-channel media planning"]],
  ["app-marketing", "App marketing", "Acquisition and creative systems for installs, activation and retained user value.", "Mobile App Marketing Services", "App growth needs more than low-cost installs. We connect store presentation, campaign creative, attribution and activation signals to focus acquisition on users with a reason to stay.", ["Acquisition and measurement plan", "Store and conversion review", "Campaign creative testing", "Activation and cohort reporting"], ["Better-quality user acquisition", "Faster creative learning", "Clearer visibility beyond the install"]],
  ["youtube-marketing", "YouTube marketing", "Channel strategy, formats and distribution built for discovery and sustained attention.", "YouTube Marketing Services", "We define the role YouTube should play, then build repeatable formats around audience demand, production reality and discovery. Packaging, retention and distribution are reviewed together.", ["Audience and topic research", "Channel and format strategy", "Scripts, production and packaging", "Publishing, distribution and retention analysis"], ["A more coherent channel proposition", "Repeatable production formats", "Better learning from viewer behaviour"]],
  ["creative-campaigns", "Creative campaigns", "Distinctive digital ideas designed to earn participation, conversation and useful reach.", "Creative Digital Campaigns", "We develop special projects around a clear audience behaviour and a distribution plan. The idea, mechanics, production and amplification are designed together so the campaign can travel beyond one launch post.", ["Strategic and creative concept", "Campaign mechanics and journey", "Production and partner coordination", "Launch, amplification and reporting"], ["A more memorable brand moment", "Participation with a clear purpose", "Campaign assets with a longer life"]],
  ["marketing-technology", "Marketing technology", "Practical tools and automations that improve customer journeys and team execution.", "Marketing Technology Consulting", "We design lightweight marketing systems around a real workflow: lead capture, content operations, personalisation, reporting or customer communication. Technology choices follow the process and ownership model.", ["Workflow and requirements mapping", "Tool and architecture recommendation", "Prototype or implementation support", "Documentation, governance and handover"], ["Less repetitive manual work", "Cleaner data between teams", "A system people understand and maintain"]],
  ["experiential-marketing", "Experiential marketing", "Physical experiences connected to digital content, participation and measurable follow-up.", "Experiential Marketing Services", "We connect the live moment with the digital journey before and after it. The concept, guest flow, capture plan and follow-up are designed as one experience.", ["Experience concept and guest journey", "Partner and production coordination", "Content and live capture plan", "Digital amplification and follow-up"], ["A more coherent guest experience", "More content value from the activation", "A clearer route from attendance to relationship"]],
  ["web-development", "Web development", "Conversion-focused websites and landing pages aligned with brand, content and acquisition.", "Marketing Website Development", "We design and build marketing sites around clarity, speed and the customer journey. Structure, copy, visual system, measurement and technical SEO are considered before the interface is polished.", ["Discovery, audience and requirements", "Information architecture and copy", "Responsive design and development", "Analytics, technical SEO and launch QA"], ["A clearer digital proposition", "A faster path to meaningful action", "A maintainable foundation for growth"]],
].map(([slug, name, short, h1, intro, deliverables, outcomes]) =>
  offer(
    slug as string,
    name as string,
    short as string,
    h1 as string,
    intro as string,
    deliverables as string[],
    outcomes as string[],
    [
      { q: "Can this be a standalone project?", a: "Yes. We can deliver a focused audit, strategy or campaign, or include the work in an integrated programme." },
      { q: "How do you define success?", a: "We agree the decision metrics before work begins and make sure the required tracking and responsibilities are explicit." },
      { q: "Do you work with an existing team or agency?", a: "Yes. We can own the workstream or collaborate with internal specialists and other partners through clear roles and shared reporting." },
    ],
  ),
);

export const findEnglishOffer = (items: EnglishOffer[], slug: string) => items.find((item) => item.slug === slug);
