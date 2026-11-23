import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/primitives";
import { capabilities, capabilityHref } from "@/content/capabilities";
import { site } from "@/content/site";

const companyLinks = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/approach" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-muted-dark">
      <Container className="border-t border-white/[0.08] py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 font-display text-xl font-semibold tracking-tight text-white">{site.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">{site.coreMessage.join(" ")}</p>
          </div>
          <nav aria-label="Services" className="md:col-span-4">
            <h2 className="eyebrow text-cyan">Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link href={capabilityHref(c.slug)} className="hover:text-white">
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company" className="md:col-span-3">
            <h2 className="eyebrow text-cyan">Company</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.08] pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.legalName}. All rights reserved.
          </p>
          {site.contactEmail && (
            <a href={`mailto:${site.contactEmail}`} className="hover:text-white">
              {site.contactEmail}
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}
