import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/blocks";
import { ContactForm, ContactFormFromParams } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/primitives";
import { capabilities, contactHref } from "@/content/capabilities";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Discuss your AI project with Qulixlabs: request an AI assessment, automate a workflow, build an AI product or plan an AI transformation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Something Intelligent."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        description="Tell us where you are and what you're trying to achieve. Whether you're exploring AI for the first time or scaling systems already in production, we'll suggest a sensible next step."
      />
      <section className="bg-mist py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="text-xl font-semibold">Choose a starting point</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Not sure where to begin? Most engagements start with an AI assessment.
            </p>
            <ul className="mt-6 space-y-1">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={contactHref(c.slug)}
                    scroll={false}
                    className="group flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-sm text-navy hover:bg-white"
                  >
                    <span className="font-mono text-xs text-cyan-ink">{c.number}</span>
                    <span className="group-hover:text-cyan-ink">{c.cta.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {site.contactEmail && (
              <p className="mt-10 text-sm">
                Prefer email?{" "}
                <a href={`mailto:${site.contactEmail}`} className="font-medium text-cyan-ink hover:text-navy">
                  {site.contactEmail}
                </a>
              </p>
            )}
          </aside>
          <div className="lg:col-span-8">
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromParams />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
