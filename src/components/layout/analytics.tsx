import Script from "next/script";

/**
 * Privacy-friendly analytics. Enabled only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * Swap for another provider here without touching pages.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
