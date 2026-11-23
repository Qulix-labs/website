import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageHero, defaultCta } from "@/components/sections/blocks";
import { Section, TextLink } from "@/components/ui/primitives";
import { articles } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description: "Perspectives from Qulixlabs on AI engineering, automation, auditing and emerging technology.",
  path: "/insights",
});

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function InsightsPage() {
  const sorted = [...articles].sort((a, b) => b.published.localeCompare(a.published));
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on building practical AI."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
        description="Perspectives on AI engineering, automation, auditing and emerging technology from the Qulixlabs team."
      />
      <Section tone="light" aria-label="Articles">
        {sorted.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-navy/15 p-10 text-center">
            <h2 className="text-2xl font-semibold">First articles coming soon</h2>
            <p className="mt-3 leading-relaxed">
              We&apos;re preparing our first pieces on AI readiness, workflow automation and production AI engineering.
            </p>
            <div className="mt-6">
              <TextLink href="/services/ai-auditing">Start with AI Auditing</TextLink>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {sorted.map((a) => (
              <li key={a.slug}>
                <Link href={`/insights/${a.slug}`} className="group grid gap-3 py-8 md:grid-cols-12 md:gap-8">
                  <div className="text-sm text-muted md:col-span-3">
                    <time dateTime={a.published}>{dateFormat.format(new Date(a.published))}</time>
                    <p className="eyebrow mt-2 text-cyan-ink">{a.topic}</p>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="text-2xl font-semibold group-hover:text-cyan-ink">{a.title}</h2>
                    <p className="mt-2 leading-relaxed">{a.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <CtaBand {...defaultCta} />
    </>
  );
}
