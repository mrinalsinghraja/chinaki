"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { categories } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";
import {
  IconArrow,
  IconClose,
  IconMenu,
  IconWhatsApp,
  categoryIcons,
} from "./Icons";
import { Crest } from "./Ornament";

const links = [
  { href: "/about", label: "About" },
  { href: "/why-chinaki", label: "Why Chinaki" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  /* The nav starts transparent over the hero and earns its rule and
     its glass only once the page has actually moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Route change closes everything. */
  useEffect(() => {
    setMegaOpen(false);
    setSheetOpen(false);
  }, [pathname]);

  /* Lock the page behind the mobile sheet. */
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Small grace period so the pointer can cross the gap between the
     trigger and the panel without the menu snapping shut. */
  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* The bar has exactly two states: over the navy masthead, or glass
     over paper. Everything that opens a panel forces the second. */
  const set = scrolled || megaOpen || sheetOpen;

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <header
        className={set ? "nav is-set" : "nav"}
        data-open={megaOpen ? "true" : undefined}
      >
        <div className="nav-bar shell">
          <Link href="/" aria-label="Chinaki — home" className="nav-logo">
            {/* Both restrikes are rendered and cross-faded rather than
                swapping one src. The lockup is a raster now, and
                switching the source on scroll would blank the mark for
                a frame while the browser fetched the other file. */}
            <span className="nav-logo-swap" data-on={set ? "brand" : "gold"}>
              <span className="nav-logo-face" data-face="gold">
                <Logo size={40} tone="gold" showTagline priority />
              </span>
              <span className="nav-logo-face" data-face="brand">
                <Logo size={40} tone="brand" showTagline priority />
              </span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Main">
            <div
              className="nav-mega-trigger"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <Link
                href="/services"
                className={isActive("/services") ? "nav-link is-active" : "nav-link"}
                aria-expanded={megaOpen}
                onFocus={openMega}
              >
                Services
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  className="nav-caret"
                >
                  <path
                    d="m2 3.75 3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? "nav-link is-active" : "nav-link"}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm nav-cta"
            >
              <IconWhatsApp size={16} />
              WhatsApp
            </a>
            <button
              type="button"
              className="nav-toggle"
              onClick={() => setSheetOpen((v) => !v)}
              aria-label={sheetOpen ? "Close menu" : "Open menu"}
              aria-expanded={sheetOpen}
            >
              {sheetOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>

        {/* ---- Mega-menu: the six service families, as dockets ---- */}
        <div
          className="mega"
          data-open={megaOpen ? "true" : "false"}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
          aria-hidden={!megaOpen}
        >
          <div className="shell mega-inner">
            <div className="mega-grid">
              {categories.map((c) => {
                const Icon = categoryIcons[c.slug];
                return (
                  <Link
                    key={c.slug}
                    href={`/services/${c.slug}`}
                    className="mega-item"
                    tabIndex={megaOpen ? undefined : -1}
                  >
                    <Crest size={46}>
                      <Icon size={19} />
                    </Crest>
                    <span className="mega-text">
                      <span className="mega-code t-label">{c.code}</span>
                      <span className="mega-name t-h4">{c.name}</span>
                      <span className="mega-desc">{c.short}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mega-foot">
              <span className="t-label" style={{ color: "var(--color-ink-faint)" }}>
                {site.hours.days} · {site.hours.open} – {site.hours.close}
              </span>
              <Link
                href="/services"
                className="link-tab"
                tabIndex={megaOpen ? undefined : -1}
              >
                All services
                <IconArrow size={15} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ---- Mobile sheet ------------------------------------- */}
      <div className="sheet" data-open={sheetOpen ? "true" : "false"} aria-hidden={!sheetOpen}>
        <div className="sheet-scroll">
          <p className="t-label sheet-heading">Services</p>
          <ul className="sheet-list">
            {categories.map((c) => {
              const Icon = categoryIcons[c.slug];
              return (
                <li key={c.slug}>
                  <Link
                    href={`/services/${c.slug}`}
                    className="sheet-item"
                    tabIndex={sheetOpen ? undefined : -1}
                  >
                    <Crest size={40}>
                      <Icon size={17} />
                    </Crest>
                    <span>
                      <span className="sheet-item-name">{c.name}</span>
                      <span className="sheet-item-desc">{c.short}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <hr className="rule" style={{ marginBlock: "1.5rem" }} />

          <p className="t-label sheet-heading">Chinaki</p>
          <ul className="sheet-list">
            {[{ href: "/services", label: "All services" }, ...links].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="sheet-plain"
                  tabIndex={sheetOpen ? undefined : -1}
                >
                  {l.label}
                  <IconArrow size={16} />
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary sheet-cta"
            tabIndex={sheetOpen ? undefined : -1}
          >
            <IconWhatsApp size={17} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

    </>
  );
}
