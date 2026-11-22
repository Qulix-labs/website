/**
 * The six core capabilities. Every capability page, card, nav entry, contact pathway,
 * sitemap entry and Service schema is generated from this file.
 *
 * Content guardrails (from the brand spec):
 *  - no certifications, regulatory audit authority, or compliance accreditation claims
 *  - no guaranteed results or ROI figures
 *  - emerging-technology items carry an explicit maturity label
 */

export type Maturity = "available" | "experimental" | "research";

export type ServiceItem = { name: string; maturity?: Maturity };

export type ServiceGroup = {
  title: string;
  description?: string;
  items: ServiceItem[];
};

export type Capability = {
  slug: CapabilitySlug;
  number: string;
  title: string;
  /** Short label used in navigation and cards */
  shortTitle: string;
  /** One-line descriptor used in the mega-menu */
  navBlurb: string;
  /** Concise business benefit used on capability cards */
  benefit: string;
  valueProp: string;
  intro: string;
  outcomes: { title: string; body: string }[];
  serviceGroups: ServiceGroup[];
  process: { title: string; body: string }[];
  deliverables: string[];
  audiences: { title: string; body: string }[];
  note?: { title: string; body: string };
  related: CapabilitySlug[];
  cta: { label: string; description: string };
  seoDescription: string;
};

export const capabilitySlugs = [
  "ai-auditing",
  "ai-workflow-automation",
  "ai-product-development",
  "enterprise-ai",
  "emerging-technologies",
  "ai-strategy",
] as const;

export type CapabilitySlug = (typeof capabilitySlugs)[number];

export const capabilities: Capability[] = [
  {
    slug: "ai-auditing",
    number: "01",
    title: "AI Auditing & Readiness Assessment",
    shortTitle: "AI Auditing",
    navBlurb: "Assess systems, risks & opportunities",
    benefit: "Find out where AI will create value, and where it won't, before you commit budget.",
    valueProp: "Know Where AI Can Create Value — Before You Invest.",
    intro:
      "We assess your current systems, workflows and AI initiatives to show where AI can help, where the risks are, and what to do first. You get specific, prioritized recommendations rather than a generic report.",
    outcomes: [
      {
        title: "Clarity on opportunity",
        body: "See which processes, products and decisions could benefit from AI, ranked by likely value and effort.",
      },
      {
        title: "Visibility into risk",
        body: "Understand security, privacy, reliability and governance gaps in the systems you already run or plan to build.",
      },
      {
        title: "A plan you can act on",
        body: "Leave with a sequenced roadmap and clear next steps, whether you work with us afterwards or not.",
      },
    ],
    serviceGroups: [
      {
        title: "Readiness & maturity",
        items: [
          { name: "AI readiness assessments" },
          { name: "AI maturity evaluations" },
          { name: "AI adoption roadmaps and ROI opportunity analysis" },
        ],
      },
      {
        title: "Systems & architecture",
        items: [
          { name: "Existing application and workflow audits" },
          { name: "AI architecture and integration reviews" },
          { name: "AI cost and infrastructure optimization assessments" },
          { name: "AI-enabled software and agentic workflow evaluations" },
        ],
      },
      {
        title: "Quality, risk & governance",
        items: [
          { name: "AI security, privacy, and governance assessments" },
          { name: "Model performance, reliability, and quality evaluations" },
          { name: "LLM output quality and hallucination risk assessments" },
        ],
      },
    ],
    process: [
      {
        title: "Scope",
        body: "Agree on the systems, teams and questions in scope, and on what a useful outcome looks like for you.",
      },
      {
        title: "Discover",
        body: "Run stakeholder interviews and review architecture, workflows, data flows, costs and any existing AI usage.",
      },
      {
        title: "Evaluate",
        body: "Test models, prompts and workflows where relevant, and assess risk, quality and operational readiness.",
      },
      {
        title: "Recommend",
        body: "Present prioritized findings, a phased roadmap and concrete implementation options.",
      },
    ],
    deliverables: [
      "Current-state assessment of systems, workflows and AI usage",
      "Prioritized opportunity map with effort and impact considerations",
      "Risk register covering security, privacy, quality and governance",
      "Recommended architecture and technology direction",
      "Phased adoption roadmap with clear next steps",
      "Executive briefing and working session with your team",
    ],
    audiences: [
      {
        title: "Exploring AI for the first time",
        body: "Get a grounded starting point before committing to tools, vendors or hires.",
      },
      {
        title: "Already running AI in production",
        body: "Check quality, cost, security and reliability, and find what to fix or scale next.",
      },
      {
        title: "Preparing a larger investment",
        body: "Validate assumptions and reduce risk before a major build or transformation programme.",
      },
    ],
    note: {
      title: "What our assessments are, and aren't",
      body: "Our audits are independent engineering and advisory assessments. They are not certifications, formal regulatory audits or compliance accreditations. Where you need those, we can help you prepare and work alongside your accredited auditors.",
    },
    related: ["ai-strategy", "ai-workflow-automation", "enterprise-ai"],
    cta: {
      label: "Request an AI Assessment",
      description:
        "Tell us about your systems and goals. We'll propose a scoped assessment that fits the size of your organization.",
    },
    seoDescription:
      "AI readiness, maturity, architecture, security and LLM quality assessments that produce clear, prioritized recommendations before you invest.",
  },
  {
    slug: "ai-workflow-automation",
    number: "02",
    title: "AI Workflow Development & Intelligent Automation",
    shortTitle: "AI Workflows",
    navBlurb: "Automate business processes",
    benefit: "Hand repetitive, multi-step work to reliable workflows, with people kept in the loop where judgement matters.",
    valueProp: "From Repetitive Tasks to Intelligent Execution.",
    intro:
      "We design, build and run workflows that cut manual effort across operations, sales, finance and service. We use deterministic automation where rules are clear and AI where it adds measurable value, with monitoring and human approval built in.",
    outcomes: [
      {
        title: "Less manual effort",
        body: "Remove copy-paste, re-keying and hand-offs so your team can focus on work that needs judgement.",
      },
      {
        title: "Consistent execution",
        body: "Run processes the same way every time, with clear audit trails and exception handling.",
      },
      {
        title: "Control by design",
        body: "Human-in-the-loop approvals, guardrails and monitoring keep automated decisions visible and reversible.",
      },
    ],
    serviceGroups: [
      {
        title: "Workflow engineering",
        items: [
          { name: "Custom AI workflow development" },
          { name: "Multistep business process automation" },
          { name: "AI agent development and orchestration" },
          { name: "Human-in-the-loop approval workflows" },
        ],
      },
      {
        title: "Functional automation",
        items: [
          { name: "Document processing and intelligent data extraction" },
          { name: "Customer service and business operations automation" },
          { name: "AI-powered sales and CRM workflows" },
          { name: "Finance and administrative process automation" },
        ],
      },
      {
        title: "Integration & operations",
        items: [
          { name: "Integration across APIs, SaaS tools, and enterprise applications" },
          { name: "Workflow monitoring, exception handling, and optimization" },
        ],
      },
    ],
    process: [
      {
        title: "Map",
        body: "Document the current process, its systems, volumes, failure points and where decisions are made.",
      },
      {
        title: "Design",
        body: "Decide what should be rule-based, what benefits from AI and where people must approve, then define success measures.",
      },
      {
        title: "Build",
        body: "Engineer the workflow and integrations iteratively, testing against real examples from your operation.",
      },
      {
        title: "Run & improve",
        body: "Deploy with monitoring and exception handling, then tune based on how the workflow actually performs.",
      },
    ],
    deliverables: [
      "Process map and automation design",
      "Production workflow with integrations to your existing tools",
      "Human-review and exception-handling paths",
      "Monitoring, logging and alerting",
      "Runbook and handover documentation",
      "Optional ongoing optimization and support",
    ],
    audiences: [
      {
        title: "Lean teams",
        body: "Startups and small businesses that need to scale operations without scaling headcount at the same rate.",
      },
      {
        title: "Operations leaders",
        body: "Mid-sized companies with high-volume processes spread across several tools.",
      },
      {
        title: "Enterprise functions",
        body: "Departments that need automation to meet security, approval and audit requirements.",
      },
    ],
    related: ["ai-auditing", "enterprise-ai", "ai-product-development"],
    cta: {
      label: "Automate a Workflow",
      description:
        "Describe a process that slows your team down. We'll show you how it could be automated, and where it shouldn't be.",
    },
    seoDescription:
      "Custom AI workflows, agent orchestration, document processing and business process automation with human-in-the-loop controls and monitoring.",
  },
  {
    slug: "ai-product-development",
    number: "03",
    title: "AI Product Development",
    shortTitle: "AI Products",
    navBlurb: "Build intelligent software",
    benefit: "Take an AI product from idea to a reliable production release, and keep improving it after launch.",
    valueProp: "From AI Idea to Production-Ready Product.",
    intro:
      "We design, build, launch and maintain AI-powered software. That includes custom products for startups, businesses and enterprises, and our own proprietary products, built with the same engineering discipline.",
    outcomes: [
      {
        title: "Validated direction",
        body: "Test the riskiest assumptions early with discovery, proofs of concept and prototypes.",
      },
      {
        title: "Production quality",
        body: "Ship software with evaluation, observability, security and cost controls in place, not just a demo.",
      },
      {
        title: "A product that keeps improving",
        body: "Deployment, monitoring and maintenance keep quality high as models, data and users change.",
      },
    ],
    serviceGroups: [
      {
        title: "Custom AI product engineering",
        description: "For startups, businesses and enterprises building their own AI products.",
        items: [
          { name: "AI product discovery and architecture" },
          { name: "Proof-of-concept development" },
          { name: "Rapid prototyping and MVP engineering" },
          { name: "LLM application development" },
          { name: "Custom AI agents and copilots" },
          { name: "Retrieval-augmented generation systems" },
          { name: "Multimodal AI applications" },
          { name: "SaaS platform engineering" },
          { name: "API development and third-party integrations" },
          { name: "Model evaluation and optimization" },
          { name: "Product deployment, monitoring, and maintenance" },
        ],
      },
      {
        title: "Proprietary Qulixlabs products",
        description:
          "Products created and owned by Qulixlabs. These are areas we are actively exploring; none has launched yet.",
        items: [
          { name: "AI productivity applications" },
          { name: "Agentic AI platforms" },
          { name: "Intelligent SaaS applications" },
          { name: "AI-powered content and creative tools" },
          { name: "Automation products" },
          { name: "Enterprise knowledge assistants" },
          { name: "Industry-specific AI applications" },
        ],
      },
    ],
    process: [
      {
        title: "Discover",
        body: "Clarify users, problems, data and constraints, then decide what the first release must prove.",
      },
      {
        title: "Prototype",
        body: "Build a focused proof of concept or prototype to test feasibility, quality and user value.",
      },
      {
        title: "Engineer",
        body: "Develop the MVP or production product with evaluation suites, security and scalable architecture.",
      },
      {
        title: "Launch & evolve",
        body: "Deploy, monitor real-world behaviour and iterate on quality, cost and features.",
      },
    ],
    deliverables: [
      "Product and technical architecture",
      "Working prototype or proof of concept",
      "Production application and APIs",
      "Evaluation suite for model and output quality",
      "Deployment pipeline, monitoring and cost tracking",
      "Documentation and handover, or an ongoing engineering partnership",
    ],
    audiences: [
      {
        title: "Founders & startups",
        body: "Move from idea to a credible MVP without building a full AI team first.",
      },
      {
        title: "Product companies",
        body: "Add copilots, agents, search or multimodal features to an existing product.",
      },
      {
        title: "Enterprises",
        body: "Build internal or customer-facing AI applications to production standards.",
      },
    ],
    related: ["ai-auditing", "emerging-technologies", "ai-strategy"],
    cta: {
      label: "Discuss Your Product Idea",
      description:
        "Share what you want to build, from an early idea to an existing product, and we'll suggest a practical path to production.",
    },
    seoDescription:
      "AI product discovery, prototyping, MVP engineering, LLM and RAG applications, custom agents and copilots, deployed and maintained to production standards.",
  },
  {
    slug: "enterprise-ai",
    number: "04",
    title: "Enterprise AI Transformation",
    shortTitle: "Enterprise AI",
    navBlurb: "Modernize existing systems",
    benefit: "Bring AI into the systems you already run. Extend your existing investments instead of replacing them.",
    valueProp: "Your Existing Technology. Reimagined With AI.",
    intro:
      "We help organizations modernize applications, data and operations with AI. We start from the platforms you already rely on and only recommend replacing something when the case is clear.",
    outcomes: [
      {
        title: "Value from current investments",
        body: "Connect AI capabilities to existing applications, data and workflows instead of starting over.",
      },
      {
        title: "Knowledge that's findable",
        body: "Make institutional knowledge searchable and usable across teams and systems.",
      },
      {
        title: "Secure, governed operation",
        body: "Deploy AI services with observability, access controls and governance built in.",
      },
    ],
    serviceGroups: [
      {
        title: "Integration & modernization",
        items: [
          { name: "AI integration with existing enterprise systems" },
          { name: "Legacy application modernization" },
          { name: "AI-enabled cloud and application architecture" },
          { name: "API modernization and integration" },
        ],
      },
      {
        title: "Knowledge & data",
        items: [
          { name: "Intelligent enterprise search" },
          { name: "Enterprise knowledge management" },
          { name: "Enterprise data integration" },
          { name: "Business process intelligence" },
        ],
      },
      {
        title: "Engineering & operations",
        items: [
          { name: "AI-powered engineering and DevOps workflows" },
          { name: "Secure deployment of AI services" },
          { name: "AI observability, governance, and operational support" },
        ],
      },
    ],
    process: [
      {
        title: "Assess",
        body: "Review your application estate, integration points, data landscape and constraints.",
      },
      {
        title: "Architect",
        body: "Design a target architecture that extends current platforms and sets clear security boundaries.",
      },
      {
        title: "Modernize in increments",
        body: "Deliver in phases that each produce working value, reducing risk and disruption.",
      },
      {
        title: "Operate",
        body: "Put observability, governance and support in place so AI services stay reliable over time.",
      },
    ],
    deliverables: [
      "Current-state and target-state architecture",
      "Integration and modernization roadmap",
      "Production AI services connected to existing systems",
      "Enterprise search or knowledge solutions",
      "Security, access and governance controls",
      "Observability dashboards and operational runbooks",
    ],
    audiences: [
      {
        title: "Large enterprises",
        body: "Complex application estates that need AI without disruptive platform replacement.",
      },
      {
        title: "Growing mid-sized companies",
        body: "Teams whose systems have outgrown their original design and need to modernize with AI.",
      },
      {
        title: "Public sector & regulated teams",
        body: "Organizations that need careful security, governance and phased change.",
      },
    ],
    related: ["ai-auditing", "ai-workflow-automation", "ai-strategy"],
    cta: {
      label: "Plan Your AI Transformation",
      description:
        "Tell us about your current systems and priorities. We'll outline a phased modernization approach.",
    },
    seoDescription:
      "Enterprise AI integration, legacy modernization, intelligent search, knowledge management and secure, observable AI services that extend existing technology.",
  },
  {
    slug: "emerging-technologies",
    number: "05",
    title: "Emerging & Cutting-Edge Technology Solutions",
    shortTitle: "Emerging Tech",
    navBlurb: "Explore next-generation innovation",
    benefit: "Separate what's practical today from what's still experimental, and put the practical parts to work.",
    valueProp: "Turning Emerging Technology Into Practical Advantage.",
    intro:
      "We keep evaluating new AI techniques, frameworks and computing approaches, and apply them when they solve a real problem. Every focus area below is labelled by maturity, so you can see what we offer today, what we're experimenting with, and what we're researching.",
    outcomes: [
      {
        title: "Informed decisions",
        body: "Understand which emerging technologies matter for your organization, and when.",
      },
      {
        title: "Low-risk experimentation",
        body: "Run focused proofs of concept before committing to new platforms or architectures.",
      },
      {
        title: "Early, practical advantage",
        body: "Adopt proven new techniques sooner, with sound engineering behind them.",
      },
    ],
    serviceGroups: [
      {
        title: "Available today",
        description: "Delivered in client engagements now.",
        items: [
          { name: "Agentic AI and autonomous systems", maturity: "available" },
          { name: "Generative AI", maturity: "available" },
          { name: "Multimodal AI", maturity: "available" },
          { name: "Advanced AI reasoning and orchestration", maturity: "available" },
          { name: "AI-native application architecture", maturity: "available" },
          { name: "Knowledge graphs and advanced retrieval", maturity: "available" },
          { name: "New AI development frameworks and integration technologies", maturity: "available" },
        ],
      },
      {
        title: "Experimental",
        description: "Available as scoped proofs of concept and pilots.",
        items: [
          { name: "Small language models and private AI deployment", maturity: "experimental" },
          { name: "Edge AI and intelligent devices", maturity: "experimental" },
          { name: "Intelligent observability", maturity: "experimental" },
          { name: "Quantum-inspired optimization", maturity: "experimental" },
        ],
      },
      {
        title: "Research",
        description: "Areas we study and track. Not offered as production services.",
        items: [{ name: "Quantum computing research and future applications", maturity: "research" }],
      },
    ],
    process: [
      {
        title: "Frame",
        body: "Start from a business or technical problem, not from the technology.",
      },
      {
        title: "Evaluate",
        body: "Compare emerging approaches with established ones on fit, maturity, cost and risk.",
      },
      {
        title: "Prove",
        body: "Build a time-boxed proof of concept with explicit success criteria.",
      },
      {
        title: "Decide",
        body: "Recommend whether to scale, iterate or wait, with the evidence behind that recommendation.",
      },
    ],
    deliverables: [
      "Technology landscape briefing for your context",
      "Feasibility analysis and comparison with established approaches",
      "Time-boxed proof of concept",
      "Evaluation results against agreed success criteria",
      "Scale, iterate or wait recommendation",
    ],
    audiences: [
      {
        title: "Innovation & R&D teams",
        body: "Teams tasked with finding what's next and proving it works.",
      },
      {
        title: "Technology-driven companies",
        body: "Organizations that compete on adopting new capabilities early and well.",
      },
      {
        title: "Leaders separating signal from hype",
        body: "Decision-makers who need a grounded view of emerging technology.",
      },
    ],
    note: {
      title: "How we describe emerging technology",
      body: "Qulixlabs does not claim access to quantum hardware or proprietary foundation models. Quantum work is limited to research and quantum-inspired classical methods. Maturity labels on this page show what we deliver today and what is still experimental or research.",
    },
    related: ["ai-product-development", "ai-strategy", "enterprise-ai"],
    cta: {
      label: "Explore an Innovation Project",
      description:
        "Have a problem that might suit a newer approach? Let's assess whether it's ready for your use case.",
    },
    seoDescription:
      "Agentic, generative and multimodal AI, advanced retrieval, private and edge AI, and quantum-inspired optimization, each labelled by maturity.",
  },
  {
    slug: "ai-strategy",
    number: "06",
    title: "AI Strategy, Consulting & Continuous Optimization",
    shortTitle: "AI Strategy",
    navBlurb: "Plan, deploy & optimize",
    benefit: "Connect AI investment to business priorities, then keep systems performing and cost-efficient over time.",
    valueProp: "From AI Strategy to Measurable Business Outcomes.",
    intro:
      "We support organizations through the whole AI adoption journey: setting direction, choosing technology, preparing teams and governance, and continuously improving what's in production.",
    outcomes: [
      {
        title: "Aligned priorities",
        body: "Tie AI initiatives to business goals, with clear owners and success measures.",
      },
      {
        title: "Better technology decisions",
        body: "Make build-versus-buy and platform choices based on evidence, not hype.",
      },
      {
        title: "Sustained performance",
        body: "Regular reviews keep quality, cost and reliability on track as your AI estate grows.",
      },
    ],
    serviceGroups: [
      {
        title: "Strategy & planning",
        items: [
          { name: "Executive AI strategy workshops" },
          { name: "AI opportunity discovery" },
          { name: "AI roadmap development" },
        ],
      },
      {
        title: "Advisory",
        items: [
          { name: "Technology selection and evaluation" },
          { name: "Build-versus-buy analysis" },
          { name: "Architecture advisory" },
          { name: "AI governance planning" },
          { name: "Responsible AI implementation guidance" },
        ],
      },
      {
        title: "Enablement & optimization",
        items: [
          { name: "AI workforce enablement" },
          { name: "AI system performance reviews" },
          { name: "Cost optimization" },
          { name: "Long-term AI engineering partnerships" },
        ],
      },
    ],
    process: [
      {
        title: "Align",
        body: "Work with leadership to define goals, constraints and appetite for change.",
      },
      {
        title: "Prioritize",
        body: "Identify and rank opportunities, then make technology and sourcing decisions.",
      },
      {
        title: "Enable",
        body: "Put governance, skills and delivery structures in place.",
      },
      {
        title: "Optimize",
        body: "Review performance and cost regularly, and adjust the roadmap as you learn.",
      },
    ],
    deliverables: [
      "AI strategy and prioritized roadmap",
      "Technology selection and build-versus-buy recommendations",
      "Governance and responsible AI framework",
      "Team enablement sessions",
      "Recurring performance and cost reviews",
    ],
    audiences: [
      {
        title: "Executives & boards",
        body: "Leaders setting AI direction and investment priorities.",
      },
      {
        title: "Technology leaders",
        body: "CTOs and engineering leads making architecture and platform decisions.",
      },
      {
        title: "Organizations already using AI",
        body: "Teams that want ongoing optimization and a long-term engineering partner.",
      },
    ],
    related: ["ai-auditing", "enterprise-ai", "ai-product-development"],
    cta: {
      label: "Plan Your AI Strategy",
      description:
        "Whether you're setting direction or optimizing what's already live, we'll help you decide where to focus next.",
    },
    seoDescription:
      "Executive AI strategy, roadmaps, technology selection, build-versus-buy analysis, governance planning, team enablement and continuous AI performance and cost optimization.",
  },
];

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}

export const capabilityHref = (slug: CapabilitySlug) => `/services/${slug}`;
export const contactHref = (interest?: CapabilitySlug | "general") =>
  interest ? `/contact?interest=${interest}` : "/contact";

export const maturityLabel: Record<Maturity, string> = {
  available: "Available",
  experimental: "Experimental",
  research: "Research",
};
