import Link from "next/link";
import { site, whatsappUrl } from "@/lib/site";
import { IconArrow, IconWhatsApp } from "./Icons";
import { Filigree, GhostMark } from "./Ornament";

/**
 * The closing band on every sub-page. One question, two ways to act.
 * Written as an invitation, not a sales line.
 */
export function EnquireBar({
  heading = "Not sure which service you need?",
  body = "Describe your situation on WhatsApp and we will tell you exactly what to bring, what it costs and how long it takes.",
  message,
}: {
  heading?: string;
  body?: string;
  /** Prefills the WhatsApp message with the page's context. */
  message?: string;
}) {
  return (
    <section className="band">
      <div className="shell">
        {/* WhatsApp is the business's actual intake channel, so the
            closing band on every sub-page gets the engraved plate
            rather than a quiet well. */}
        <div className="enquire engraved enquire-plate reveal">
          <Filigree size={84} className="engraved-corner" data-at="tl" />
          <Filigree size={84} className="engraved-corner" data-at="br" />
          <GhostMark
            size={340}
            tone="paper"
            className="orn orn-ghost"
            style={{ top: "-30%", right: "-4rem", zIndex: -1 }}
          />
          <div>
            <h2 className="t-h3">{heading}</h2>
            <p className="t-small enquire-body">{body}</p>
          </div>
          <div className="enquire-actions">
            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <IconWhatsApp size={17} />
              Ask on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Contact details
              <IconArrow size={17} />
            </Link>
          </div>
        </div>
        <p className="t-label enquire-hours">
          {site.hours.days} · {site.hours.open} – {site.hours.close} · Closed{" "}
          {site.hours.closed}
        </p>
      </div>
    </section>
  );
}
