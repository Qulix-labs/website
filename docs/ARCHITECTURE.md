# Qulixlabs Website — Architecture & Plan (Master Prompt V2)

Status: implemented on branch `feat/v2-six-capabilities`.
Inspection note: both `Qulix-labs/website` and `Qulix-labs/qulixlabs-website` were empty when work began
(one README commit / no commits). There was no previous implementation to preserve, so the V2 spec's
preferred stack (Next.js + TypeScript + Tailwind) is used. The original QX logo file was not in either repo;
`src/components/brand/logo.tsx` holds a minimalist QX monogram stand-in to replace with the approved artwork.

---

## 1. Positioning

Qulixlabs is a full-spectrum AI engineering and innovation company. It audits, architects, builds, automates,
integrates and continuously improves intelligent technology for organizations of every size.

- **Tagline:** Beyond Intelligence. Into Autonomy.
- **Core message:** We Audit. We Engineer. We Automate. We Innovate.
- **Lifecycle:** Assess → Strategize → Design → Build → Automate → Integrate → Optimize
- **Audience:** startups, SMBs, mid-sized companies, large enterprises, product companies, public sector,
  nonprofits and professional-services firms. The site is not enterprise-only, but it keeps enterprise-grade technical credibility.
- **Entry point:** AI Auditing is positioned as the natural first engagement.
  Engagement path: AI Audit → Automation Project → Custom AI Solution → Long-Term Engineering Partnership.

Guardrails written into the content: no fictional customers, case studies, certifications, partnerships, vendor
endorsements, launched products, quantum-hardware access or ROI figures. Products and emerging-technology items carry
explicit maturity labels.

## 2. Sitemap

```
/                                   Home
/services                           Capabilities overview
  /services/ai-auditing             01 AI Auditing & Readiness Assessment
  /services/ai-workflow-automation  02 AI Workflow Development & Intelligent Automation
  /services/ai-product-development  03 AI Product Development
  /services/enterprise-ai           04 Enterprise AI Transformation
  /services/emerging-technologies   05 Emerging & Cutting-Edge Technology
  /services/ai-strategy             06 AI Strategy, Consulting & Continuous Optimization
/products                           Proprietary product initiatives (focus areas, status-labelled)
  /products/[slug]                  Product detail template (renders once a product is added to content)
/industries                         Organization types + sectors
/approach                           Lifecycle, engagement path, principles
/insights                           Articles index (empty state until content exists)
  /insights/[slug]                  Article template
/about                              Mission, vision, values
/contact                            Lead form; ?interest=<capability> preselects a pathway
/api/contact                        Validated, rate-limited form endpoint
/sitemap.xml, /robots.txt           Generated from content
```

## 3. Homepage hierarchy

1. **Hero:** "Engineering Intelligence. Automating the Future." + description; CTAs: Explore Our Capabilities / Discuss Your AI Project. Audience strip: Startups · SMBs · Enterprises · Public sector & nonprofits.
2. **What We Do:** six capability cards (number, name, one-line benefit, link).
3. **Our Approach:** "From AI Potential to Business Impact." Discover → Audit → Architect → Develop → Integrate → Optimize.
4. **Start with an AI Audit:** entry-point band showing the engagement path.
5. **AI Products:** "Innovating Beyond Services." Product focus areas, each labelled *In development* / *Exploring*.
6. **Technology Expertise:** "Built on Modern Intelligence." Eight categories, no vendor logos.
7. **Why Qulixlabs:** "Engineering Expertise Meets Intelligent Innovation." Seven differentiators.
8. **Final CTA:** "Ready to Make Your Business Intelligent?" → "Let's Build Something Intelligent."

## 4. Capability page template (`/services/[slug]`)

All six pages are rendered from one typed record in `src/content/capabilities.ts`:

| Block | Field |
|---|---|
| Hero: index, title, value proposition, intro, service-specific CTA | `number`, `title`, `valueProp`, `intro`, `cta` |
| Outcomes ("What changes") | `outcomes[]` |
| Service list, grouped | `serviceGroups[]` (items may carry `maturity`) |
| How an engagement runs | `process[]` |
| What you receive | `deliverables[]` |
| Who it's for | `audiences[]` |
| Notes and guardrails (e.g. no certification claims) | `note?` |
| Related capabilities | `related[]` |
| Service CTA band → `/contact?interest=<slug>` | `cta` |

Capability-specific variations are expressed as data, not branches. Product Development has two
`serviceGroups` (Proprietary / Custom engineering). Emerging Technologies tags each item
`available` / `experimental` / `research`.

## 5. Shared components

- **Layout:** `SiteHeader` (desktop mega-menu, mobile disclosure menu, skip link), `SiteFooter`, `Container`, `Section`, `SectionHeading`
- **Brand:** `Logo` (QX monogram + wordmark), `LatticeVisual` (abstract hero graphic, no robots/glow)
- **Content:** `CapabilityCard`, `LifecycleSteps`, `EngagementPath`, `StatusBadge`, `ProductCard`, `CtaBand`, `Breadcrumbs`
- **Forms:** `ContactForm` (client; reads `?interest=` inside Suspense) → `/api/contact` (zod validation, honeypot, rate limit, webhook/Resend delivery)
- **SEO:** `JsonLd`, `buildMetadata()`, Organization/WebSite/Service/Breadcrumb schemas, `sitemap.ts`, `robots.ts`
- **Analytics:** `Analytics` (optional Plausible via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)

Adding a product, industry, article or case study is a content edit in `src/content/*` and needs no routing changes.

## 6. Phases

1. **Foundation (done):** Next.js 16 / TS / Tailwind v4, brand tokens, self-hosted fonts, layout, navigation.
2. **Core pages (done):** Home, six capability pages, services overview, approach, about, industries, products, insights, contact.
3. **Conversion (done):** service-specific CTAs, preselected contact pathways, secure form endpoint.
4. **SEO & quality (done):** metadata, JSON-LD, sitemap, robots, content-integrity tests, accessibility pass.
5. **Next (needs input):**
   - approved logo file
   - real contact email and form delivery (webhook or Resend key)
   - analytics choice
   - legal pages (privacy and terms)
   - first products and articles
   - CMS selection (the content layer is shaped to map onto Sanity, Contentful or MDX)
   - hosting and deployment

## Configuration

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (default `https://qulixlabs.com`) |
| `CONTACT_WEBHOOK_URL` | POST target for leads (Slack, CRM, Zapier, etc.) |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Email delivery via Resend |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional public email shown on the contact page |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables Plausible analytics |
