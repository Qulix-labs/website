import Link from "next/link";

/**
 * QX monogram — the approved Qulixlabs logo.
 * The Q's tail continues as one stroke of the X; the crossing stroke is Quantum Cyan.
 * Keep `public/icon.svg` and `src/app/icon.svg` in sync with these paths.
 */
export function Monogram({ className = "h-8 w-8", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const base = tone === "light" ? "#FFFFFF" : "#0B1528";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="15" cy="16" r="10.5" fill="none" stroke={base} strokeWidth="3" />
      <path d="M19.5 20.5 L35 36" stroke={base} strokeWidth="3" strokeLinecap="square" />
      <path d="M35 21 L20.5 35.5" stroke="#06C7D9" strokeWidth="3" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Qulixlabs home">
      <Monogram tone={tone} />
      <span
        className={`font-display text-[1.15rem] font-semibold tracking-[-0.02em] ${
          tone === "light" ? "text-white" : "text-navy"
        }`}
      >
        Qulixlabs
      </span>
    </Link>
  );
}
