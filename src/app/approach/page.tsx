import type { Metadata } from "next";
import { CtaBand, EngagementPath, FeatureGrid, NumberedSteps, PageHero } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { contactHref } from "@/content/capabilities";
import { lifecycle, principles } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Approach",
  description:
    "How Qulixlabs delivers AI: discover, audit, architect, develop, integrate and optimize, starting with an AI assessment and building toward long-term partnership.",
  path: "/approach",
});

const commitments = [
  {
    title: "Evidence before investment",
    body: "We validate opportunities with assessments and proofs of concept before recommending larger builds.",
  },
  {
    title: "The right tool for each step",
    body: "Deterministic automation where rules are clear, AI where it adds measurable value, and people where judgement matters.",
  },
  {
    title: "Extend before replacing",
    body: "We build on the systems you already have unless there's a clear case for change.",
  },
  {
    title: "Production standards from day one",
    body: "Evaluation, security, observability and cost controls are part of the build, not a later phase.",
  },
  {
    title: "Honest measurement",
    body: "We agree success criteria together and report against them plainly. We don't promise outcomes in advance.",
  },
  {
    title: "Knowledge transfer",
    body: "Documentation, runbooks and enablement so your team can own what we build together.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="From AI Potential to Business Impact."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Our Approach", path: "/approach" },
        ]}
        description="A clear lifecycle and a practical engineering mindset turn AI from an experiment into a dependable part of how you work."
      />

      <Section tone="light" aria-labelledby="lifecycle">
        <SectionHeading id="lifecycle" eyebrow="Lifecycle" title="Six phases, each with a purpose" />
        <div className="mt-14">
          <NumberedSteps steps={lifecycle} />
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="engagement">
        <SectionHeading
          id="engagement"
          tone="dark"
          eyebrow="Engagement path"
          title="Start small. Build on what works."
          description="Most organizations begin with an AI audit. It shows where value lies and which processes are worth automating, so each later step builds on proven results."
        />
        <div className="mt-14">
          <EngagementPath tone="dark" />
        </div>
      </Section>

      <Section tone="light" aria-labelledby="commitments">
        <SectionHeading id="commitments" eyebrow="How we work" title="Our engineering commitments" />
        <div className="mt-14">
          <FeatureGrid items={commitments} columns={3} />
        </div>
      </Section>

      <Section tone="mist" aria-labelledby="principles">
        <SectionHeading id="principles" eyebrow="Principles" title="AI that is practical, secure and measurable" />
        <div className="mt-14">
          <FeatureGrid items={principles} columns={3} />
        </div>
      </Section>

      <CtaBand
        title="Begin with clarity."
        description="An AI assessment is the lowest-risk way to learn where AI can help your organization, and what to do first."
        primary={{ label: "Request an AI Assessment", href: contactHref("ai-auditing") }}
        secondary={{ label: "Discuss Your AI Project", href: contactHref() }}
      />
    </>
  );
}
