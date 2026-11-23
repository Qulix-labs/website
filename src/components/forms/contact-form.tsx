"use client";

import { useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { capabilities } from "@/content/capabilities";
import { type Interest, isInterest, orgSizeOptions } from "@/lib/contact-schema";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success" } | { state: "error"; message: string };
type FieldErrors = Partial<Record<string, string>>;

const interestChoices: { value: Interest; label: string }[] = [
  ...capabilities.map((c) => ({ value: c.slug, label: c.cta.label })),
  { value: "general", label: "Something else / not sure yet" },
];

/** Reads ?interest= to preselect a service pathway. Must be rendered inside <Suspense>. */
export function ContactFormFromParams() {
  const params = useSearchParams();
  const interest = params.get("interest");
  return <ContactForm key={interest ?? "none"} initialInterest={isInterest(interest) ? interest : undefined} />;
}

export function ContactForm({ initialInterest }: { initialInterest?: Interest }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "submitting" });
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: FieldErrors };
      if (res.ok) {
        setStatus({ state: "success" });
        return;
      }
      if (json.fieldErrors) setErrors(json.fieldErrors);
      setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 sm:p-10">
        <p className="eyebrow text-cyan-ink">Message received</p>
        <h2 className="mt-4 text-2xl font-semibold">Thank you. We&apos;ll be in touch.</h2>
        <p className="mt-3 leading-relaxed">
          A member of the Qulixlabs team will review your note and reply to the email you provided.
        </p>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required error={errors.name} />
        <Field label="Work email" name="email" type="email" autoComplete="email" required error={errors.email} />
        <Field label="Organization" name="company" autoComplete="organization" error={errors.company} />
        <Field label="Role" name="role" autoComplete="organization-title" error={errors.role} />

        <SelectField label="Organization type" name="orgSize" required error={errors.orgSize} defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {orgSizeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectField>

        <SelectField
          label="What would you like to do?"
          name="interest"
          required
          error={errors.interest}
          defaultValue={initialInterest ?? ""}
        >
          <option value="" disabled>
            Select…
          </option>
          {interestChoices.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </SelectField>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-navy">
            Tell us about your goals <span aria-hidden="true" className="text-cyan-ink">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={5000}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            className={inputClass(!!errors.message)}
          />
          {errors.message ? (
            <p id="message-error" className="mt-2 text-sm text-red-700">
              {errors.message}
            </p>
          ) : (
            <p id="message-hint" className="mt-2 text-sm text-muted">
              The systems, processes or product idea involved, and what success would look like.
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          We use these details only to respond to your enquiry.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-navy px-7 font-medium text-white transition-colors hover:bg-navy-700 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send message"}
        </button>
      </div>

      <div aria-live="polite" className="mt-4">
        {status.state === "error" && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

const inputClass = (invalid: boolean) =>
  `mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-navy outline-none transition-colors focus:border-cyan-ink focus:ring-2 focus:ring-cyan/30 ${
    invalid ? "border-red-600" : "border-line"
  }`;

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-navy">
        {label} {required && <span aria-hidden="true" className="text-cyan-ink">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={200}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(!!error)}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  error,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-navy">
        {label} {required && <span aria-hidden="true" className="text-cyan-ink">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass(!!error)}
      >
        {children}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
