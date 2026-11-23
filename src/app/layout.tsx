import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter, jetbrains, sora } from "./fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Analytics } from "@/components/layout/analytics";
import { JsonLd } from "@/components/ui/json-ld";
import { site } from "@/content/site";
import { isProductionSite } from "@/lib/deployment";
import { buildMetadata, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata({ path: "/" }),
  applicationName: site.name,
  // Vercel preview deployments must not be indexed.
  ...(isProductionSite ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#0B1528",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
