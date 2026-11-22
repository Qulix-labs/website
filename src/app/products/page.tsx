import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading, StatusBadge, TextLink } from "@/components/ui/primitives";
import { capabilityHref, contactHref } from "@/content/capabilities";
import { productFocusAreas, products, productStatusLabel } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Products",
  description:
    "Qulixlabs develops proprietary AI products alongside client engineering work. See the product areas we're exploring and building.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI products"
        title="Innovating Beyond Services."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
        description="Qulixlabs is developing its own AI products using the same engineering discipline we bring to client work. Each initiative is labelled with its current status."
      />

      {products.length > 0 && (
        <Section tone="light" aria-labelledby="our-products">
          <SectionHeading id="our-products" eyebrow="Products" title="Our products" />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-line p-7 transition-colors hover:border-cyan-ink/50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow text-cyan-ink">{p.category}</span>
                    <StatusBadge label={productStatusLabel[p.status]} tone={p.status === "available" ? "available" : "neutral"} />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{p.name}</h3>
                  <p className="mt-2 leading-relaxed">{p.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone={products.length > 0 ? "mist" : "light"} aria-labelledby="focus-areas">
        <SectionHeading
          id="focus-areas"
          eyebrow="Focus areas"
          title="What we're exploring"
          description="These are product categories we're actively researching and designing. None has launched. As products reach beta or general availability, they'll get their own pages with demos, documentation and pricing."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productFocusAreas.map((area) => (
            <li key={area.title} className="reveal flex flex-col rounded-2xl border border-dashed border-navy/15 p-7">
              <StatusBadge label="Exploring" />
              <h3 className="mt-6 text-lg font-semibold">{area.title}</h3>
              <p className="mt-2 leading-relaxed">{area.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" aria-labelledby="custom">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            id="custom"
            eyebrow="Building your own product?"
            title="We engineer custom AI products too."
            description="From discovery and prototypes to production launch and maintenance, we build AI products for startups, businesses and enterprises."
          />
          <div className="flex flex-col gap-4 lg:items-end">
            <TextLink href={capabilityHref("ai-product-development")}>AI Product Development</TextLink>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Interested in early access?"
        description="If one of these areas matches a problem you're facing, tell us. Early conversations shape what we build."
        primary={{ label: "Discuss Your Product Idea", href: contactHref("ai-product-development") }}
      />
    </>
  );
}
