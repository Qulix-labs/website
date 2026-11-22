import type { CapabilitySlug } from "./capabilities";

/** Homepage lifecycle (spec section 4.3) */
export const lifecycle = [
  { title: "Discover", body: "Understand goals, constraints and where AI could help." },
  { title: "Audit", body: "Assess systems, data, risk and readiness." },
  { title: "Architect", body: "Design secure, scalable solutions that fit what you have." },
  { title: "Develop", body: "Engineer workflows, products and integrations." },
  { title: "Integrate", body: "Connect to existing systems and put them into production." },
  { title: "Optimize", body: "Measure, tune and improve continuously." },
] as const;

/** Full AI lifecycle (spec section 3) */
export const fullLifecycle = ["Assess", "Strategize", "Design", "Build", "Automate", "Integrate", "Optimize"] as const;

/** Recommended engagement progression, with AI Auditing as the entry point */
export const engagementPath: { step: string; title: string; body: string; capability: CapabilitySlug }[] = [
  {
    step: "01",
    title: "AI Audit",
    body: "Identify where AI creates value, what's at risk and which processes are worth automating.",
    capability: "ai-auditing",
  },
  {
    step: "02",
    title: "Automation Project",
    body: "Deliver a focused workflow that proves value quickly in your own operation.",
    capability: "ai-workflow-automation",
  },
  {
    step: "03",
    title: "Custom AI Solution",
    body: "Build products, copilots or integrations on the foundation you've validated.",
    capability: "ai-product-development",
  },
  {
    step: "04",
    title: "Engineering Partnership",
    body: "Keep improving, optimizing and extending your AI systems over the long term.",
    capability: "ai-strategy",
  },
];

/** Organization types we serve (spec section 3) */
export const audiences = [
  { title: "Startups", body: "Move from idea to MVP with senior AI engineering, without building a full team first." },
  { title: "Small & medium businesses", body: "Practical automation and AI tools sized to your budget and operations." },
  { title: "Mid-sized companies", body: "Connect growing tool stacks and scale operations with intelligent workflows." },
  { title: "Large enterprises", body: "Modernize complex estates with security, governance and phased delivery." },
  { title: "Technology & product companies", body: "Add AI features, agents and copilots to the products you already ship." },
  { title: "Public sector", body: "Careful, well-governed adoption that respects procurement and accountability needs." },
  { title: "Nonprofits", body: "Stretch limited resources further with focused, cost-conscious AI." },
  { title: "Professional services firms", body: "Automate document-heavy work and put institutional knowledge to use." },
] as const;

/** Technology categories (spec section 4.5) — categories only, no vendor partnerships implied */
export const technologyAreas = [
  { title: "LLMs & Generative AI", body: "Language and generative models applied to reasoning, content and decision support." },
  { title: "Agentic Frameworks", body: "Orchestrated agents that plan, use tools and work with people in the loop." },
  { title: "Cloud & AI Infrastructure", body: "Scalable, secure and cost-aware infrastructure for AI workloads." },
  { title: "Machine Learning", body: "Classical and modern ML for prediction, classification and optimization." },
  { title: "API & Enterprise Integration", body: "Reliable connections between AI services and the systems you run." },
  { title: "Workflow Orchestration", body: "Durable, observable pipelines for multistep automated processes." },
  { title: "Data & Knowledge Engineering", body: "Retrieval, knowledge graphs and data pipelines that ground AI in your information." },
  { title: "Emerging Computing", body: "Edge AI, private models and quantum-inspired methods, evaluated with care." },
] as const;

/** Differentiators (spec section 4.6) */
export const differentiators = [
  { title: "End-to-end AI engineering", body: "One team from assessment and architecture to build, integration and optimization." },
  { title: "Practical automation", body: "Deterministic where it should be, AI where it adds measurable value." },
  { title: "Existing-system integration", body: "We extend the technology you already have rather than replacing it by default." },
  { title: "Product-oriented innovation", body: "We build our own products too, so we bring product discipline to yours." },
  { title: "Security-conscious architecture", body: "Access control, data protection and governance designed in from the start." },
  { title: "Measurable business outcomes", body: "Success criteria are agreed up front and tracked after launch." },
  { title: "Continuous technology exploration", body: "We evaluate new techniques constantly and adopt them when they're ready." },
] as const;

/** Principles shown on the About and Approach pages */
export const principles = [
  { title: "Practical", body: "AI should solve a real problem and earn its place in your operation." },
  { title: "Secure", body: "Security, privacy and governance are designed in, not added at the end." },
  { title: "Accessible", body: "Organizations of every size deserve serious AI engineering." },
  { title: "Measurable", body: "We agree what success looks like and track it honestly." },
  { title: "Commercially valuable", body: "Technology choices are judged by the business value they create." },
] as const;

/** Sectors (Industries page). Describes how capabilities apply; no client claims. */
export const sectors: { title: string; body: string; examples: string[]; capabilities: CapabilitySlug[] }[] = [
  {
    title: "Financial services",
    body: "Document-heavy, rules-driven processes where accuracy, auditability and control are essential.",
    examples: ["Document and data extraction", "Back-office automation", "Knowledge assistants for internal teams"],
    capabilities: ["ai-auditing", "ai-workflow-automation", "enterprise-ai"],
  },
  {
    title: "Healthcare & life sciences",
    body: "Administrative and knowledge workflows that need privacy-conscious architecture and human oversight.",
    examples: ["Administrative workflow automation", "Research and knowledge retrieval", "AI readiness and governance assessments"],
    capabilities: ["ai-auditing", "ai-workflow-automation", "ai-strategy"],
  },
  {
    title: "Retail & e-commerce",
    body: "Customer-facing experiences and operations that benefit from personalization and automation.",
    examples: ["Customer service automation", "Product content generation", "Sales and CRM workflows"],
    capabilities: ["ai-workflow-automation", "ai-product-development"],
  },
  {
    title: "Manufacturing & logistics",
    body: "Operational data, documentation and planning problems suited to intelligent systems.",
    examples: ["Operational knowledge search", "Exception handling workflows", "Optimization proofs of concept"],
    capabilities: ["enterprise-ai", "emerging-technologies", "ai-workflow-automation"],
  },
  {
    title: "Technology & SaaS",
    body: "Product teams adding AI-native features, agents and copilots to software they already ship.",
    examples: ["Copilots and in-product agents", "RAG-powered search", "Model evaluation and cost optimization"],
    capabilities: ["ai-product-development", "emerging-technologies", "ai-auditing"],
  },
  {
    title: "Professional services",
    body: "Firms whose value lives in documents, expertise and client communication.",
    examples: ["Document review assistance", "Knowledge management", "Proposal and reporting workflows"],
    capabilities: ["ai-workflow-automation", "enterprise-ai", "ai-strategy"],
  },
  {
    title: "Public sector & nonprofits",
    body: "Mission-driven organizations that need accountable, cost-conscious and well-governed AI.",
    examples: ["Service request automation", "Knowledge access for staff", "Responsible AI planning"],
    capabilities: ["ai-strategy", "ai-auditing", "ai-workflow-automation"],
  },
];
