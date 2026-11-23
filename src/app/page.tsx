import type { Metadata } from "next";
import Link from "next/link";
import { LatticeVisual } from "@/components/sections/lattice-visual";
import {
  CapabilityCard,
  CtaBand,
  EngagementPath,
  FeatureGrid,
  GridBackdrop,
  NumberedSteps,
  defaultCta,
} from "@/components/sections/blocks";
import { ButtonLink, Container, Section, SectionHeading, StatusBadge, TextLink } from "@/components/ui/primitives";
import { capabilities, contactHref } from "@/content/capabilities";
import { differentiators, lifecycle, technologyAreas } from "@/content/company";
import { productFocusAreas, products, productStatusLabel } from "@/content/products";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/" });

const audienceStrip = ["Startups", "Small & medium businesses", "Mid-sized companies", "Enterprises", "Public sector & nonprofits"];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-navy">
        <GridBackdrop />
        <Container className="relative grid items-center gap-12 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cyan">{site.tagline}</p>
            <h1 className="mt-6 text-display font-semibold text-white">
              Engineering Intelligence.
              <br />
              <span className="text-muted-dark">Automating the Future.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-dark">
              Qulixlabs helps organizations unlock the power of AI through comprehensive AI auditing, intelligent workflow
              automation, custom AI product development, enterprise modernization, and next-generation technology solutions.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services" variant="accent" arrow>
                Explore Our Capabilities
              </ButtonLink>
              <ButtonLink href={contactHref()} variant="ghost-dark">
                Discuss Your AI Project
              </ButtonLink>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <LatticeVisual className="mx-auto w-full max-w-[460px]" />
          </div>
        </Container>
        <Container className="relative border-t border-white/[0.08] py-6">
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-dark">
            <span className="eyebrow text-white/70">Built for</span>
            {audienceStrip.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </p>
        </Container>
      </section>

      {/* 2 — What We Do */}
      <Section tone="light" aria-labelledby="what-we-do">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="what-we-do"
            eyebrow="What we do"
            title="Six capabilities. One AI lifecycle."
            description={`${site.coreMessage.join(" ")} We cover the full journey, from first assessment to production systems that keep improving.`}
          />
          <div className="shrink-0">
            <TextLink href="/services">View all capabilities</TextLink>
          </div>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <li key={c.slug} className="reveal">
              <CapabilityCard capability={c} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 — Our Approach */}
      <Section tone="mist" aria-labelledby="approach">
        <SectionHeading
          id="approach"
          eyebrow="Our approach"
          title="From AI Potential to Business Impact."
          description="Each engagement follows a clear lifecycle, so decisions rest on evidence and every phase delivers something you can use."
        />
        <div className="mt-14">
          <NumberedSteps steps={lifecycle} />
        </div>
        <div className="mt-8">
          <TextLink href="/approach">How we work</TextLink>
        </div>
      </Section>

      {/* 3b — Entry point: AI Audit */}
      <Section tone="dark" aria-labelledby="start-with-audit">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="start-with-audit"
            tone="dark"
            eyebrow="Where to begin"
            title="Start with an AI Audit."
            description="Most organizations don't yet know which processes are worth automating or which AI investments make sense. An assessment answers that first, and each step after it builds on what you've already proven."
          />
          <div className="shrink-0">
            <ButtonLink href={contactHref("ai-auditing")} variant="accent" arrow>
              Request an AI Assessment
            </ButtonLink>
          </div>
        </div>
        <div className="mt-14">
          <EngagementPath tone="dark" />
        </div>
      </Section>

      {/* 4 — AI Products */}
      <Section tone="light" aria-labelledby="products">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="products"
            eyebrow="AI products"
            title="Innovating Beyond Services."
            description="Alongside client work, Qulixlabs is developing its own AI products. Here's what we're exploring. Nothing below has launched yet."
          />
          <div className="shrink-0">
            <TextLink href="/products">Product initiatives</TextLink>
          </div>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug} className="reveal">
              <Link href={`/products/${p.slug}`} className="flex h-full flex-col rounded-2xl border border-line p-6 hover:border-cyan-ink/50">
                <StatusBadge label={productStatusLabel[p.status]} tone={p.status === "available" ? "available" : "neutral"} />
                <h3 className="mt-5 text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed">{p.summary}</p>
              </Link>
            </li>
          ))}
          {productFocusAreas.slice(0, 4).map((area) => (
            <li key={area.title} className="reveal flex flex-col rounded-2xl border border-dashed border-navy/15 p-6">
              <StatusBadge label="Exploring" />
              <h3 className="mt-5 text-lg font-semibold">{area.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{area.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 5 — Technology Expertise */}
      <Section tone="mist" aria-labelledby="technology">
        <SectionHeading
          id="technology"
          eyebrow="Technology expertise"
          title="Built on Modern Intelligence."
          description="We choose technology to fit the problem, working across these areas without tying you to any one vendor."
        />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {technologyAreas.map((t, i) => (
            <li key={t.title} className="reveal bg-white p-6 sm:p-7">
              <span className="font-mono text-xs text-cyan-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-base font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{t.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6 — Why Qulixlabs */}
      <Section tone="light" aria-labelledby="why">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="why" eyebrow="Why Qulixlabs" title="Engineering Expertise Meets Intelligent Innovation." />
            </div>
          </div>
          <div className="lg:col-span-8">
            <FeatureGrid items={differentiators} columns={2} />
          </div>
        </div>
      </Section>

      {/* 7 — Final CTA */}
      <CtaBand {...defaultCta} secondary={{ label: "Request an AI Assessment", href: contactHref("ai-auditing") }} />
    </>
  );
}
