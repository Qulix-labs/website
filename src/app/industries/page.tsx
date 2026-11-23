import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, FeatureGrid, PageHero, defaultCta } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { capabilityHref, getCapability } from "@/content/capabilities";
import { audiences, sectors } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries & Organizations",
  description:
    "AI engineering for startups, SMBs, mid-sized companies, enterprises, public sector, nonprofits and professional services, across sectors from finance to SaaS.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Serious AI engineering, sized to your organization."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
        description="We work with organizations of every size and adapt scope, pace and architecture to each one's constraints. The engineering standards stay the same."
      />

      <Section tone="light" aria-labelledby="organizations">
        <SectionHeading id="organizations" eyebrow="Who we work with" title="Organizations of every size" />
        <div className="mt-14">
          <FeatureGrid items={audiences} columns={4} />
        </div>
      </Section>

      <Section tone="mist" aria-labelledby="sectors">
        <SectionHeading
          id="sectors"
          eyebrow="Sectors"
          title="Where our capabilities apply"
          description="These are typical ways each capability applies by sector. Every engagement starts from your specific situation."
        />
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {sectors.map((s) => (
            <li key={s.title} className="reveal flex flex-col rounded-2xl border border-line bg-white p-7 sm:p-8">
              <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed">{s.body}</p>
              <ul className="mt-6 space-y-2 text-sm text-navy">
                {s.examples.map((e) => (
                  <li key={e} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-ink" />
                    {e}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-7">
                {s.capabilities.map((slug) => {
                  const c = getCapability(slug)!;
                  return (
                    <Link
                      key={slug}
                      href={capabilityHref(slug)}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-slate hover:border-cyan-ink hover:text-cyan-ink"
                    >
                      {c.shortTitle}
                    </Link>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand {...defaultCta} />
    </>
  );
}
