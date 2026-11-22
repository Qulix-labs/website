import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilityCard, CtaBand, FeatureGrid, NumberedSteps, PageHero } from "@/components/sections/blocks";
import { ButtonLink, Container, Section, SectionHeading, StatusBadge } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/json-ld";
import {
  capabilities,
  contactHref,
  getCapability,
  maturityLabel,
  type ServiceGroup,
} from "@/content/capabilities";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.seoDescription, path: `/services/${c.slug}` });
}

export default async function CapabilityPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const c = getCapability(slug);
  if (!c) notFound();

  const related = c.related.map((s) => getCapability(s)).filter((x) => x !== undefined);
  const hasMaturity = c.serviceGroups.some((g) => g.items.some((i) => i.maturity));

  return (
    <>
      <PageHero
        eyebrow={`${c.number} — ${c.shortTitle}`}
        title={c.valueProp}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: c.shortTitle, path: `/services/${c.slug}` },
        ]}
        description={
          <>
            <p className="font-display text-xl font-medium text-white">{c.title}</p>
            <p className="mt-4">{c.intro}</p>
          </>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contactHref(c.slug)} variant="accent" arrow>
            {c.cta.label}
          </ButtonLink>
          <ButtonLink href="#services" variant="ghost-dark">
            What&apos;s included
          </ButtonLink>
        </div>
      </PageHero>

      {/* Outcomes */}
      <Section tone="light" aria-labelledby="outcomes">
        <SectionHeading id="outcomes" eyebrow="What changes" title="The outcomes we work toward" />
        <div className="mt-14">
          <FeatureGrid items={c.outcomes} columns={3} />
        </div>
      </Section>

      {/* Services */}
      <Section tone="mist" id="services" aria-labelledby="services-heading" className="scroll-mt-20">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="What's included"
          description={
            hasMaturity
              ? "Each area is labelled by maturity: Available (delivered today), Experimental (scoped pilots) or Research (studied, not offered as a production service)."
              : undefined
          }
        />
        <div className={`mt-14 grid gap-5 ${c.serviceGroups.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
          {c.serviceGroups.map((g) => (
            <ServiceGroupCard key={g.title} group={g} />
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="light" aria-labelledby="process">
        <SectionHeading id="process" eyebrow="How it works" title="How an engagement runs" />
        <div className="mt-14">
          <NumberedSteps steps={c.process} />
        </div>
      </Section>

      {/* Deliverables + audiences */}
      <Section tone="dark" aria-labelledby="deliverables">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading id="deliverables" tone="dark" eyebrow="Deliverables" title="What you receive" />
            <ul className="mt-10 space-y-4">
              {c.deliverables.map((d) => (
                <li key={d} className="flex gap-4 border-t border-line-dark pt-4 text-white/90">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading tone="dark" eyebrow="Who it's for" title="Built for your stage" />
            <div className="mt-10">
              <FeatureGrid items={c.audiences} columns={2} tone="dark" />
            </div>
          </div>
        </div>
      </Section>

      {c.note && (
        <section className="bg-white pt-20 sm:pt-24">
          <Container>
            <aside className="rounded-2xl border border-line bg-mist p-7 sm:p-9" aria-labelledby="capability-note">
              <h2 id="capability-note" className="text-lg font-semibold">
                {c.note.title}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed">{c.note.body}</p>
            </aside>
          </Container>
        </section>
      )}

      {/* Related */}
      <Section tone="light" aria-labelledby="related">
        <SectionHeading id="related" eyebrow="Related capabilities" title="Often combined with" />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <CapabilityCard capability={r} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={c.cta.label}
        description={c.cta.description}
        primary={{ label: c.cta.label, href: contactHref(c.slug) }}
        secondary={c.slug === "ai-auditing" ? undefined : { label: "Start with an AI Assessment", href: contactHref("ai-auditing") }}
      />

      <JsonLd data={serviceSchema(c)} />
    </>
  );
}

function ServiceGroupCard({ group }: { group: ServiceGroup }) {
  return (
    <div className="reveal flex flex-col rounded-2xl border border-line bg-white p-7 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
      {group.description && <p className="mt-2 text-sm leading-relaxed">{group.description}</p>}
      <ul className="mt-6 divide-y divide-line border-t border-line">
        {group.items.map((item) => (
          <li key={item.name} className="flex items-start justify-between gap-4 py-3.5 text-[0.95rem] text-navy">
            <span>{item.name}</span>
            {item.maturity && (
              <StatusBadge label={maturityLabel[item.maturity]} tone={item.maturity} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
