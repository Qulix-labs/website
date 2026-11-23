# Qulixlabs website

The official site for **Qulixlabs**: AI engineering, automation, auditing and emerging technology.
*Beyond Intelligence. Into Autonomy.*

Built with Next.js 16 (App Router, Cache Components), TypeScript and Tailwind CSS v4.
See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for positioning, the sitemap, the page template and the roadmap.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint + tests + production build
```

## Editing content

Pages render from typed content files. You don't need to touch routing to change them:

| File | Controls |
|---|---|
| `src/content/capabilities.ts` | The six capability pages, homepage cards, mega-menu, footer, contact pathways, Service schema |
| `src/content/company.ts` | Lifecycle, engagement path, audiences, technology areas, differentiators, sectors |
| `src/content/products.ts` | Proprietary products (adding one creates `/products/<slug>`) and focus areas |
| `src/content/insights.ts` | Articles (adding one creates `/insights/<slug>`) |
| `src/content/site.ts` | Name, mission, vision, tagline, top navigation |

`tests/content.test.ts` enforces the brand guardrails:
- no ROI percentages or guarantees
- no certification or partnership claims
- maturity labels on emerging technology
- service-specific CTAs

## Configuration

Copy `.env.example` to `.env.local`. Without a delivery channel, the contact form logs enquiries in development and returns an error in production, so leads are never lost silently.

## Deployment (Vercel)

The site is hosted on Vercel. Next.js is detected automatically, so no `vercel.json` is needed.

1. In Vercel, choose **Add New → Project** and import `Qulix-labs/website`. Keep the default build settings.
2. Add the environment variables from `.env.example` under **Settings → Environment Variables**. For Production at least set `NEXT_PUBLIC_SITE_URL=https://qulixlabs.com` and one contact delivery channel.
3. Add `qulixlabs.com` (and `www`) under **Settings → Domains** and point DNS as Vercel instructs.

Every pull request gets a preview URL. Preview deployments send `noindex` and a blocking `robots.txt` so search engines only index production.

The contact rate limiter is in-memory, so on Vercel it applies per function instance. That's adequate at launch. Move it to a shared store (for example Upstash Redis) if spam becomes a problem.

## Brand

- Colours: Midnight Navy `#0B1528`, Quantum Cyan `#06C7D9`, White, Soft Gray `#F4F6F9`, Dark Slate `#334155`. Cyan is used for text only on navy. On light backgrounds the accessible `cyan-ink` (`#0B7A86`) is used instead.
- Fonts: Sora (display), Inter (body) and JetBrains Mono (labels), all self-hosted.
- Logo: the QX monogram in `src/components/brand/logo.tsx` (favicon: `src/app/icon.svg`, `public/icon.svg`). The Q's tail forms one stroke of the X, and the crossing stroke is Quantum Cyan.
