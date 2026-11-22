import type { Metadata } from "next";
import { CapabilityCard, CtaBand, EngagementPath, PageHero, defaultCta } from "@/components/sections/blocks";
import { ButtonLink, Section, SectionHeading } from "@/components/ui/primitives";
import { capabilities, contactHref } from "@/content/capabilities";
import { fullLifecycle } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Services & Capabilities",
  description:
    "AI auditing, workflow automation, AI product development, enterprise AI transformation, emerging technology and AI strategy, covering the full AI lifecycle.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every stage of AI, engineered end to end."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        description="Six interconnected capabilities take you from first assessment to production systems that keep improving. Start wherever you are."
      >
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted-dark" aria-label="AI lifecycle">
          {fullLifecycle.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className={i === 0 ? "text-cyan" : "text-white/80"}>{step}</span>
              {i < fullLifecycle.length - 1 && <span aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      </PageHero>

      <Section tone="light" aria-labelledby="capabilities">
        <SectionHeading id="capabilities" eyebrow="Capabilities" title="Six ways we help" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c.slug} className="reveal">
              <CapabilityCard capability={c} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" aria-labelledby="path">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="path"
            eyebrow="Where to begin"
            title="A natural progression"
            description="Many clients start with an assessment, prove value with a focused automation, then build on that foundation."
          />
          <div className="shrink-0">
            <ButtonLink href={contactHref("ai-auditing")} arrow>
              Request an AI Assessment
            </ButtonLink>
          </div>
        </div>
        <div className="mt-14">
          <EngagementPath />
        </div>
      </Section>

      <CtaBand {...defaultCta} />
    </>
  );
}
