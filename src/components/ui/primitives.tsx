import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

type Tone = "light" | "mist" | "dark";

const toneClasses: Record<Tone, string> = {
  light: "bg-white",
  mist: "bg-mist",
  dark: "bg-navy text-muted-dark",
};

export function Section({
  tone = "light",
  className = "",
  children,
  ...rest
}: { tone?: Tone; className?: string; children: ReactNode } & Omit<ComponentProps<"section">, "className">) {
  return (
    <section className={`py-20 sm:py-28 ${toneClasses[tone]} ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  id,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-5 ${dark ? "text-cyan" : "text-cyan-ink"}`}>{eyebrow}</p>}
      <As id={id} className={`text-headline font-semibold ${dark ? "text-white" : "text-navy"}`}>
        {title}
      </As>
      {description && (
        <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-muted-dark" : "text-slate"}`}>{description}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost-dark";

const buttonClasses: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-navy-700",
  secondary: "border border-navy/15 text-navy hover:border-navy/40 bg-white",
  accent: "bg-cyan text-navy hover:bg-white",
  "ghost-dark": "border border-white/20 text-white hover:border-white/60",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  arrow = false,
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-200 ${buttonClasses[variant]} ${className}`}
    >
      {children}
      {arrow && <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} aria-hidden="true" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TextLink({ href, children, tone = "light" }: { href: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-sm font-medium ${
        tone === "dark" ? "text-cyan hover:text-white" : "text-cyan-ink hover:text-navy"
      }`}
    >
      {children}
      <Arrow className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

const badgeTone = {
  available: "bg-cyan-soft text-cyan-ink ring-cyan-ink/20",
  experimental: "bg-amber-50 text-amber-800 ring-amber-800/20",
  research: "bg-violet-50 text-violet-800 ring-violet-800/20",
  neutral: "bg-mist text-slate ring-navy/10",
} as const;

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: keyof typeof badgeTone }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center self-start rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] font-medium tracking-wider uppercase ring-1 ring-inset ${badgeTone[tone]}`}
    >
      {label}
    </span>
  );
}
