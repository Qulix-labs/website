export const site = {
  name: "Qulixlabs",
  legalName: "Qulixlabs",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qulixlabs.com").replace(/\/$/, ""),
  tagline: "Beyond Intelligence. Into Autonomy.",
  coreMessage: ["We Audit.", "We Engineer.", "We Automate.", "We Innovate."],
  description:
    "Qulixlabs is an AI engineering and innovation company. We audit AI readiness, automate workflows, build custom AI products, modernize enterprise systems and apply emerging technology for organizations of every size.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  mission:
    "To empower businesses, startups, and organizations of every size to harness artificial intelligence through intelligent automation, AI auditing, custom product engineering, enterprise modernization, and access to emerging technologies.",
  missionDetail:
    "We help organizations evaluate their existing systems, identify opportunities for AI adoption, design intelligent workflows, develop scalable AI products, and integrate next-generation technologies into their operations.",
  objective: "Our objective is to make AI practical, secure, accessible, measurable, and commercially valuable.",
  vision:
    "To become a trusted global AI engineering and innovation partner, transforming how organizations build products, automate operations, and adopt intelligent technologies.",
} as const;

export type NavLink = { label: string; href: string };

/** Top-level navigation. "Services" is rendered as a mega-menu from the capabilities content. */
export const primaryNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/approach" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];
