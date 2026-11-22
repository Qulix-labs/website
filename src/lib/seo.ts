import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Capability } from "@/content/capabilities";

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | AI Engineering, Automation & Innovation`;
  const desc = description ?? site.description;
  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: absoluteUrl(path),
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
  };
}

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  description: site.description,
  ...(site.contactEmail ? { email: site.contactEmail } : {}),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` },
});

export const serviceSchema = (c: Capability) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: c.title,
  serviceType: c.title,
  description: c.seoDescription,
  url: absoluteUrl(`/services/${c.slug}`),
  provider: { "@id": `${site.url}/#organization` },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: c.title,
    itemListElement: c.serviceGroups.flatMap((g) =>
      g.items.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.name } })),
    ),
  },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
