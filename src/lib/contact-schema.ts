import { z } from "zod";
import { capabilitySlugs } from "@/content/capabilities";

export const interestOptions = [...capabilitySlugs, "general"] as const;
export type Interest = (typeof interestOptions)[number];

export const orgSizeOptions = [
  { value: "startup", label: "Startup" },
  { value: "small", label: "Small business (1–50)" },
  { value: "mid", label: "Mid-sized (51–1,000)" },
  { value: "enterprise", label: "Enterprise (1,000+)" },
  { value: "public-nonprofit", label: "Public sector / nonprofit" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address.").trim().max(200),
  company: z.string().trim().max(160).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  orgSize: z.enum(orgSizeOptions.map((o) => o.value) as [string, ...string[]], {
    error: "Please choose an organization type.",
  }),
  interest: z.enum(interestOptions, { error: "Please choose what you'd like to discuss." }),
  message: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters).")
    .max(5000, "Please keep your message under 5,000 characters."),
  /** Honeypot. Must stay empty. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function isInterest(value: string | null | undefined): value is Interest {
  return !!value && (interestOptions as readonly string[]).includes(value);
}
