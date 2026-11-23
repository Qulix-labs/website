import type { MetadataRoute } from "next";
import { capabilities } from "@/content/capabilities";
import { articles } from "@/content/insights";
import { products } from "@/content/products";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/services", "/products", "/industries", "/approach", "/insights", "/about", "/contact"];
  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...capabilities.map((c) => ({ url: absoluteUrl(`/services/${c.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: a.published, priority: 0.6 })),
  ];
}
