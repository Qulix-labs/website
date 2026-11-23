import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, FeatureGrid, PageHero } from "@/components/sections/blocks";
import { ButtonLink, Section, SectionHeading, StatusBadge } from "@/components/ui/primitives";
import { contactHref } from "@/content/capabilities";
import { getProduct, products, productStatusLabel } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

/**
 * Product detail template. Pages are generated from `src/content/products.ts`.
 * A placeholder param keeps the route prerenderable while the product list is empty; it 404s.
 */
export function generateStaticParams() {
  return products.length > 0 ? products.map((p) => ({ slug: p.slug })) : [{ slug: "_placeholder" }];
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({ title: p.name, description: p.summary, path: `/products/${p.slug}` });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero
        eyebrow={p.category}
        title={p.name}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: p.name, path: `/products/${p.slug}` },
        ]}
        description={
          <>
            <StatusBadge label={productStatusLabel[p.status]} tone={p.status === "available" ? "available" : "neutral"} />
            <p className="mt-5">{p.description}</p>
          </>
        }
      >
        {(p.demoUrl || p.docsUrl) && (
          <div className="flex flex-col gap-3 sm:flex-row">
            {p.demoUrl && (
              <ButtonLink href={p.demoUrl} variant="accent" arrow>
                View demo
              </ButtonLink>
            )}
            {p.docsUrl && (
              <ButtonLink href={p.docsUrl} variant="ghost-dark">
                Documentation
              </ButtonLink>
            )}
          </div>
        )}
      </PageHero>

      <Section tone="light" aria-labelledby="features">
        <SectionHeading id="features" eyebrow="Features" title="What it does" />
        <div className="mt-14">
          <FeatureGrid items={p.features} columns={3} />
        </div>
      </Section>

      {p.pricing && p.pricing.length > 0 && (
        <Section tone="mist" aria-labelledby="pricing">
          <SectionHeading id="pricing" eyebrow="Pricing" title="Plans" />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {p.pricing.map((plan) => (
              <li key={plan.plan} className="rounded-2xl border border-line bg-white p-7">
                <h3 className="text-lg font-semibold">{plan.plan}</h3>
                <p className="mt-3 font-display text-3xl font-semibold text-navy">{plan.price}</p>
                <p className="mt-3 text-sm leading-relaxed">{plan.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBand
        title={`Interested in ${p.name}?`}
        description="Tell us about your use case and we'll be in touch about access."
        primary={{ label: "Get in touch", href: contactHref("ai-product-development") }}
      />
    </>
  );
}
