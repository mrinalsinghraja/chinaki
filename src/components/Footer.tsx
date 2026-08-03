import Link from "next/link";
import { Lockup } from "./Logo";
import { GhostMark } from "./Ornament";
import { categories } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";
import {
  IconClock,
  IconMail,
  IconPin,
  IconWhatsApp,
} from "./Icons";

export function Footer() {
  return (
    <footer className="foot">
      {/* The page ends the way it opened: the mark at architectural
          scale, printed into the stock rather than placed on it. */}
      <GhostMark
        size={620}
        tone="paper"
        className="orn orn-ghost"
        style={{ bottom: "-16%", right: "-11rem", zIndex: -1 }}
      />
      <div className="shell">
        <div className="foot-grid">
          <div>
            {/* The footer is where a brand signs off, so it gets the
                client's stacked lockup whole — monogram, wordmark,
                rule and tagline — rather than the horizontal
                arrangement the header has to compose. */}
            <div className="foot-brand">
              <Lockup width={208} tone="gold" />
            </div>
            <p className="t-small" style={{ maxWidth: "24rem" }}>
              A digital service centre in {site.locality}, {site.region},
              handling government, business, tax and student applications
              with care.
            </p>
          </div>

          <div>
            <p className="t-label foot-col-title">Services</p>
            <ul>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`} className="foot-link">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label foot-col-title">Chinaki</p>
            <ul>
              <li>
                <Link href="/about" className="foot-link">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/why-chinaki" className="foot-link">
                  Why Chinaki
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="foot-link">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="foot-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/services" className="foot-link">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="t-label foot-col-title">Visit or message</p>
            <div className="foot-detail">
              <IconPin size={17} />
              <address style={{ fontStyle: "normal" }}>
                {site.addressLines.map((l) => (
                  <span key={l} style={{ display: "block" }}>
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div className="foot-detail">
              <IconWhatsApp size={17} />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                {site.phone}
              </a>
            </div>
            <div className="foot-detail">
              <IconMail size={17} />
              <a href={`mailto:${site.email}`} style={{ wordBreak: "break-all" }}>
                {site.email}
              </a>
            </div>
            <div className="foot-detail">
              <IconClock size={17} />
              <span>
                {site.hours.days}
                <br />
                {site.hours.open} – {site.hours.close}
              </span>
            </div>
          </div>
        </div>

        <div className="foot-base t-label">
          <span>
            © {new Date().getFullYear()} {site.name}. {site.locality},{" "}
            {site.region}.
          </span>
          <div className="foot-base-links">
            <Link href="/privacy-policy" className="foot-link t-label">
              Privacy Policy
            </Link>
            <Link href="/terms" className="foot-link t-label">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
