import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow, ButtonLink, Container, StatusBadge } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/json-ld";
import { type Capability, capabilityHref, contactHref } from "@/content/capabilities";
import { engagementPath } from "@/content/company";
import { breadcrumbSchema } from "@/lib/seo";

/** Dark page hero used by every interior page */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-14 pb-20 sm:pt-20 sm:pb-28">
      <GridBackdrop />
      <Container className="relative">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow mb-6 text-cyan">{eyebrow}</p>}
        <h1 className="max-w-4xl text-display font-semibold text-white">{title}</h1>
        {description && <div className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-dark">{description}</div>}
        {children && <div className="mt-10">{children}</div>}
      </Container>
    </section>
  );
}

export function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_65%)]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(169,182,200,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(169,182,200,0.08) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-10">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-dark">
          {items.map((item, i) => (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === items.length - 1 ? (
                <span aria-current="page" className="text-white">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-white">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}

export function CapabilityCard({ capability, tone = "light" }: { capability: Capability; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link
      href={capabilityHref(capability.slug)}
      className={`group relative flex h-full flex-col rounded-2xl border p-7 transition-colors duration-300 sm:p-8 ${
        dark
          ? "border-line-dark bg-navy-800 hover:border-cyan/60"
          : "border-line bg-white hover:border-cyan-ink/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-mono text-sm ${dark ? "text-cyan" : "text-cyan-ink"}`}>{capability.number}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-0.5 ${
            dark ? "border-line-dark text-white group-hover:border-cyan group-hover:text-cyan" : "border-line text-navy group-hover:border-cyan-ink group-hover:text-cyan-ink"
          }`}
        >
          <Arrow />
        </span>
      </div>
      <h3 className={`mt-10 text-xl font-semibold tracking-tight sm:text-2xl ${dark ? "text-white" : "text-navy"}`}>
        {capability.shortTitle}
      </h3>
      <p className={`mt-3 leading-relaxed ${dark ? "text-muted-dark" : "text-slate"}`}>{capability.benefit}</p>
      <p className={`mt-auto pt-8 text-sm font-medium ${dark ? "text-white/80" : "text-navy/80"}`}>
        <span className="sr-only">Learn about </span>
        {capability.valueProp}
      </p>
    </Link>
  );
}

export function NumberedSteps({
  steps,
  tone = "light",
}: {
  steps: readonly { title: string; body: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const lgCols = steps.length >= 6 ? "lg:grid-cols-6" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol
      className={`grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 ${lgCols} ${
        dark ? "border-line-dark bg-line-dark" : "border-line bg-line"
      }`}
    >
      {steps.map((step, i) => (
        <li key={step.title} className={`reveal flex flex-col p-6 sm:p-7 ${dark ? "bg-navy" : "bg-white"}`}>
          <span className={`font-mono text-xs ${dark ? "text-cyan" : "text-cyan-ink"}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={`mt-6 text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}>{step.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-muted-dark" : "text-slate"}`}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function EngagementPath({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {engagementPath.map((s, i) => (
        <li key={s.step} className="reveal relative">
          <Link
            href={capabilityHref(s.capability)}
            className={`group flex h-full flex-col rounded-2xl border p-6 transition-colors ${
              dark ? "border-line-dark bg-navy-800 hover:border-cyan/60" : "border-line bg-white hover:border-cyan-ink/50"
            } ${i === 0 ? (dark ? "ring-1 ring-cyan/40" : "ring-1 ring-cyan-ink/30") : ""}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className={`font-mono text-xs ${dark ? "text-cyan" : "text-cyan-ink"}`}>{s.step}</span>
              {i === 0 && <StatusBadge label="Start here" tone="available" />}
            </div>
            <h3 className={`mt-6 text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}>{s.title}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-muted-dark" : "text-slate"}`}>{s.body}</p>
          </Link>
          {i < engagementPath.length - 1 && (
            <span
              aria-hidden="true"
              className={`absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border md:flex ${
                dark ? "border-line-dark bg-navy text-cyan" : "border-line bg-white text-cyan-ink"
              }`}
            >
              <Arrow className="h-3 w-3" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Conversion band. Service pages pass their own CTA label and pathway. */
export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <GridBackdrop />
      <Container className="relative">
        <div className="max-w-3xl">
          <h2 className="text-headline font-semibold text-white">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-dark">{description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primary.href} variant="accent" arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="ghost-dark">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export const defaultCta = {
  title: "Ready to Make Your Business Intelligent?",
  description:
    "Whether you're exploring AI for the first time, auditing an existing system, automating operations, or building the next AI-powered product, Qulixlabs can help you move from possibility to implementation.",
  primary: { label: "Let's Build Something Intelligent", href: contactHref() },
};

export function FeatureGrid({
  items,
  columns = 3,
  tone = "light",
}: {
  items: readonly { title: string; body: string }[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark" | "mist";
}) {
  const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const dark = tone === "dark";
  return (
    <ul className={`grid gap-x-10 gap-y-10 ${colClass}`}>
      {items.map((item) => (
        <li key={item.title} className={`reveal border-t pt-6 ${dark ? "border-line-dark" : "border-navy/10"}`}>
          <h3 className={`text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}>{item.title}</h3>
          <p className={`mt-2 leading-relaxed ${dark ? "text-muted-dark" : "text-slate"}`}>{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
