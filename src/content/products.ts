/**
 * Proprietary Qulixlabs products.
 *
 * `products` holds real products only. Add an entry here to create /products/<slug>,
 * a homepage card and a sitemap entry. Never list a product as "available" before it launches.
 *
 * `productFocusAreas` are categories the company is exploring. They are shown with an
 * explicit "Exploring" label and are not presented as products.
 */

export type ProductStatus = "in-development" | "private-beta" | "public-beta" | "available";

export type Product = {
  slug: string;
  name: string;
  status: ProductStatus;
  category: string;
  summary: string;
  description: string;
  features: { title: string; body: string }[];
  /** Optional links, rendered only when present */
  demoUrl?: string;
  docsUrl?: string;
  pricing?: { plan: string; price: string; description: string }[];
};

export const productStatusLabel: Record<ProductStatus, string> = {
  "in-development": "In development",
  "private-beta": "Private beta",
  "public-beta": "Public beta",
  available: "Available",
};

export const products: Product[] = [];

export const productFocusAreas = [
  { title: "AI productivity applications", body: "Tools that help individuals and teams get more done with AI assistance." },
  { title: "Agentic AI platforms", body: "Infrastructure for building, running and supervising AI agents." },
  { title: "Intelligent SaaS applications", body: "Software where AI is central to the product, not added on." },
  { title: "AI content & creative tools", body: "Applications for generating, editing and managing content." },
  { title: "Automation products", body: "Packaged automations for common business workflows." },
  { title: "Enterprise knowledge assistants", body: "Assistants grounded in an organization's own information." },
  { title: "Industry-specific AI applications", body: "Focused products for the workflows of particular sectors." },
] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
