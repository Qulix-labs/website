import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { capabilities, capabilitySlugs } from "@/content/capabilities";
import * as company from "@/content/company";
import { products } from "@/content/products";
import { primaryNav } from "@/content/site";

const appDir = join(__dirname, "..", "src", "app");
const routeExists = (path: string) => existsSync(join(appDir, path === "/" ? "" : path, "page.tsx"));

describe("capabilities", () => {
  it("defines exactly the six core capabilities in order", () => {
    expect(capabilities.map((c) => c.slug)).toEqual([...capabilitySlugs]);
    expect(capabilities.map((c) => c.number)).toEqual(["01", "02", "03", "04", "05", "06"]);
  });

  it("has unique slugs and unique service-specific CTA labels", () => {
    expect(new Set(capabilities.map((c) => c.slug)).size).toBe(capabilities.length);
    expect(new Set(capabilities.map((c) => c.cta.label)).size).toBe(capabilities.length);
  });

  it("uses the lead-generation pathways from the brief", () => {
    const cta = Object.fromEntries(capabilities.map((c) => [c.slug, c.cta.label]));
    expect(cta["ai-auditing"]).toBe("Request an AI Assessment");
    expect(cta["ai-workflow-automation"]).toBe("Automate a Workflow");
    expect(cta["ai-product-development"]).toBe("Discuss Your Product Idea");
    expect(cta["enterprise-ai"]).toBe("Plan Your AI Transformation");
    expect(cta["emerging-technologies"]).toBe("Explore an Innovation Project");
  });

  it("only relates to existing capabilities, never itself", () => {
    for (const c of capabilities) {
      expect(c.related.length).toBeGreaterThan(0);
      for (const r of c.related) {
        expect(capabilitySlugs).toContain(r);
        expect(r).not.toBe(c.slug);
      }
    }
  });

  it("has every template block populated", () => {
    for (const c of capabilities) {
      expect(c.outcomes.length, c.slug).toBeGreaterThanOrEqual(3);
      expect(c.serviceGroups.flatMap((g) => g.items).length, c.slug).toBeGreaterThanOrEqual(8);
      expect(c.process.length, c.slug).toBe(4);
      expect(c.deliverables.length, c.slug).toBeGreaterThanOrEqual(4);
      expect(c.audiences.length, c.slug).toBe(3);
      expect(c.seoDescription.length, c.slug).toBeLessThanOrEqual(200);
    }
  });

  it("labels every emerging-technology item with a maturity level", () => {
    const emerging = capabilities.find((c) => c.slug === "emerging-technologies")!;
    for (const item of emerging.serviceGroups.flatMap((g) => g.items)) {
      expect(item.maturity, item.name).toBeDefined();
    }
    const quantum = emerging.serviceGroups.flatMap((g) => g.items).find((i) => /quantum computing/i.test(i.name));
    expect(quantum?.maturity).toBe("research");
  });
});

describe("content guardrails", () => {
  const allText = JSON.stringify({ capabilities, company, products });

  it("makes no guaranteed-result or unsupported ROI claims", () => {
    expect(allText).not.toMatch(/guarantee/i);
    expect(allText).not.toMatch(/\d+\s?%/);
    expect(allText).not.toMatch(/\d+x (faster|roi|return)/i);
  });

  it("does not claim certification or vendor partnerships", () => {
    // "certif" may appear only in the auditing disclaimer that says assessments are NOT certifications.
    const certMentions = allText.match(/[^.]*certif[^.]*/gi) ?? [];
    for (const m of certMentions) expect(m).toMatch(/not certifications/i);
    expect(allText).not.toMatch(/(official|certified|premier) partner/i);
  });

  it("does not present unlaunched products as available", () => {
    for (const p of products) {
      if (p.status === "available") expect(p.pricing ?? p.demoUrl ?? p.docsUrl, p.slug).toBeDefined();
    }
  });
});

describe("routing", () => {
  it("has a page for every primary navigation link", () => {
    for (const link of primaryNav) expect(routeExists(link.href), link.href).toBe(true);
  });

  it("has the service template and supporting pages", () => {
    for (const path of ["/", "/services", "/services/[slug]", "/contact", "/products/[slug]", "/insights/[slug]"]) {
      expect(routeExists(path), path).toBe(true);
    }
  });
});
