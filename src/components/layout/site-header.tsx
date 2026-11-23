"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo, Monogram } from "@/components/brand/logo";
import { Arrow, Container } from "@/components/ui/primitives";
import { capabilities, capabilityHref, contactHref } from "@/content/capabilities";
import { primaryNav, site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus whenever the route changes (adjusting state during render, per React guidance).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-navy">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <Container className="flex h-[4.5rem] items-center justify-between gap-6">
        <Logo tone="light" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <ServicesMenu open={megaOpen} setOpen={setMegaOpen} active={isActive("/services")} />
            </li>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "text-white" : "text-muted-dark hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden min-h-10 items-center rounded-full bg-cyan px-5 text-sm font-medium text-navy transition-colors hover:bg-white sm:inline-flex"
          >
            Contact
          </Link>
          <MobileMenuButton open={mobileOpen} onToggle={() => setMobileOpen((o) => !o)} />
        </div>
      </Container>

      {mobileOpen && <MobileMenu isActive={isActive} />}
    </header>
  );
}

function ServicesMenu({
  open,
  setOpen,
  active,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: boolean;
}) {
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  const close = useCallback(
    (returnFocus: boolean) => {
      setOpen(false);
      if (returnFocus) buttonRef.current?.focus();
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <div
      ref={wrapperRef}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors ${
          active || open ? "text-white" : "text-muted-dark hover:text-white"
        }`}
      >
        Services
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-white/[0.08] bg-navy shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
      >
        <Container className="grid grid-cols-12 gap-10 py-10">
          <div className="col-span-4 flex flex-col justify-between border-r border-white/[0.08] pr-10">
            <div>
              <Monogram className="h-9 w-9" />
              <p className="mt-6 font-display text-2xl font-semibold tracking-tight text-white">{site.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                Six connected capabilities across the full AI lifecycle, from first assessment to continuous optimization.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/services" className="group inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-cyan">
                All capabilities <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={contactHref("ai-auditing")}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-white"
              >
                Start with an AI Assessment <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <ul className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-2 xl:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={capabilityHref(c.slug)}
                  className="group block rounded-xl p-4 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04]"
                >
                  <span className="font-mono text-xs text-cyan">{c.number}</span>
                  <span className="mt-2 block font-display text-[1.05rem] font-semibold text-white">{c.shortTitle}</span>
                  <span className="mt-1 block text-sm text-muted-dark">{c.navBlurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}

function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
        {open ? (
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        ) : (
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
}

function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const [servicesOpen, setServicesOpen] = useState(true);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile"
      className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-white/[0.08] bg-navy lg:hidden"
    >
      <Container className="py-6">
        <ul className="divide-y divide-white/[0.08]">
          <li className="py-2">
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="mobile-services"
              onClick={() => setServicesOpen((o) => !o)}
              className="flex w-full items-center justify-between py-3 font-display text-lg text-white"
            >
              Services
              <svg viewBox="0 0 12 12" className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <ul id="mobile-services" hidden={!servicesOpen} className="pb-3">
              <li>
                <Link href="/services" className="block py-2.5 pl-1 text-muted-dark hover:text-white">
                  All capabilities
                </Link>
              </li>
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={capabilityHref(c.slug)}
                    aria-current={isActive(capabilityHref(c.slug)) ? "page" : undefined}
                    className="flex items-baseline gap-3 py-2.5 pl-1 text-muted-dark hover:text-white aria-[current=page]:text-white"
                  >
                    <span className="font-mono text-xs text-cyan">{c.number}</span>
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="block py-4 font-display text-lg text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-8 flex min-h-12 items-center justify-center rounded-full bg-cyan font-medium text-navy"
        >
          Discuss Your AI Project
        </Link>
      </Container>
    </nav>
  );
}
