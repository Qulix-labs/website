import { getCapability } from "@/content/capabilities";
import type { ContactInput } from "@/lib/contact-schema";

/**
 * Delivers a validated enquiry. Configure at least one channel in production:
 *  - CONTACT_WEBHOOK_URL  → JSON POST (Slack/CRM/Zapier/n8n, etc.)
 *  - RESEND_API_KEY + CONTACT_TO_EMAIL (+ optional CONTACT_FROM_EMAIL) → email via Resend
 * Returns false when no channel is configured or every configured channel failed.
 */
export async function deliverEnquiry(input: Omit<ContactInput, "website">): Promise<boolean> {
  const interestLabel = getCapability(input.interest)?.title ?? "General enquiry";
  const summary = [
    `New enquiry: ${interestLabel}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Organization: ${input.company}` : null,
    input.role ? `Role: ${input.role}` : null,
    `Organization type: ${input.orgSize}`,
    "",
    input.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const tasks: Promise<boolean>[] = [];

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary, enquiry: { ...input, interestLabel } }),
        signal: AbortSignal.timeout(8000),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "Qulixlabs Website <onboarding@resend.dev>",
          to: [to],
          reply_to: input.email,
          subject: `Website enquiry: ${interestLabel} (${input.name})`,
          text: summary,
        }),
        signal: AbortSignal.timeout(8000),
      })
        .then((r) => r.ok)
        .catch(() => false),
    );
  }

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No delivery channel configured; enquiry logged in development only:\n" + summary);
      return true;
    }
    console.error("[contact] No delivery channel configured (set CONTACT_WEBHOOK_URL or RESEND_API_KEY + CONTACT_TO_EMAIL).");
    return false;
  }

  const results = await Promise.all(tasks);
  return results.some(Boolean);
}
