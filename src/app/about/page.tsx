import type { Metadata } from "next";
import { CtaBand, FeatureGrid, PageHero, defaultCta } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { differentiators, principles } from "@/content/company";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `${site.name} is an AI engineering and innovation company. ${site.mission}`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Qulixlabs"
        title={site.tagline}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        description={site.coreMessage.join(" ")}
      />

      <Section tone="light" aria-labelledby="mission">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-cyan-ink">Mission</p>
          </div>
          <div className="lg:col-span-8">
            <h2 id="mission" className="text-headline font-semibold">
              {site.mission}
            </h2>
            <p className="mt-8 text-lg leading-relaxed">{site.missionDetail}</p>
            <p className="mt-4 text-lg leading-relaxed">{site.objective}</p>
          </div>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="vision">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-cyan">Vision</p>
          </div>
          <div className="lg:col-span-8">
            <h2 id="vision" className="text-headline font-semibold text-white">
              {site.vision}
            </h2>
          </div>
        </div>
      </Section>

      <Section tone="light" aria-labelledby="principles">
        <SectionHeading id="principles" eyebrow="Principles" title="What we believe AI should be" />
        <div className="mt-14">
          <FeatureGrid items={principles} columns={3} />
        </div>
      </Section>

      <Section tone="mist" aria-labelledby="different">
        <SectionHeading id="different" eyebrow="Why Qulixlabs" title="Engineering Expertise Meets Intelligent Innovation." />
        <div className="mt-14">
          <FeatureGrid items={differentiators} columns={3} />
        </div>
      </Section>

      <CtaBand {...defaultCta} />
    </>
  );
}
