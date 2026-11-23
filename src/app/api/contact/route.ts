import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";
import { deliverEnquiry } from "@/lib/contact-delivery";
import { createRateLimiter } from "@/lib/rate-limit";

const allow = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: NextRequest) {
  // Same-origin check: reject cross-site form posts.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (!allow(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(z.flattenError(parsed.error).fieldErrors).map(([k, v]) => [k, v?.[0]]),
    );
    // Silently accept honeypot hits so bots get no signal.
    if (fieldErrors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const { website: _honeypot, ...enquiry } = parsed.data;
  const delivered = await deliverEnquiry(enquiry);
  if (!delivered) {
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
