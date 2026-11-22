import { describe, expect, it } from "vitest";
import { contactSchema, isInterest } from "@/lib/contact-schema";
import { createRateLimiter } from "@/lib/rate-limit";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  role: "CTO",
  orgSize: "mid",
  interest: "ai-auditing",
  message: "We want to understand where AI could help our operations team.",
  website: "",
};

describe("contact schema", () => {
  it("accepts a valid enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional fields being absent", () => {
    const { company: _c, role: _r, website: _w, ...minimal } = valid;
    expect(contactSchema.safeParse(minimal).success).toBe(true);
  });

  it("rejects a filled honeypot", () => {
    const r = contactSchema.safeParse({ ...valid, website: "http://spam.example" });
    expect(r.success).toBe(false);
  });

  it("rejects invalid email, unknown interest and short messages", () => {
    expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, interest: "crypto" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(false);
  });

  it("recognises valid interest pathways only", () => {
    expect(isInterest("emerging-technologies")).toBe(true);
    expect(isInterest("general")).toBe(true);
    expect(isInterest("<script>")).toBe(false);
    expect(isInterest(null)).toBe(false);
  });
});

describe("rate limiter", () => {
  it("allows up to the limit per window, then blocks, then resets", () => {
    const allow = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(allow("ip", 0)).toBe(true);
    expect(allow("ip", 10)).toBe(true);
    expect(allow("ip", 20)).toBe(false);
    expect(allow("other", 20)).toBe(true);
    expect(allow("ip", 1001)).toBe(true);
  });
});
