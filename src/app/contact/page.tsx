import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquiryForm } from "@/components/EnquiryForm";
import { site, whatsappUrl } from "@/lib/site";
import {
  IconArrow,
  IconClock,
  IconMail,
  IconPin,
  IconWhatsApp,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit Chinaki on BM Road, near the Government Boys Higher Secondary School, ${site.locality}, ${site.region} – ${site.postalCode}. WhatsApp ${site.phone}. Open ${site.hours.days}, ${site.hours.open} to ${site.hours.close}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        code="VISIT"
        trail={[{ label: "Contact" }]}
        title="Come to the counter, or start on WhatsApp."
        intro="Send your details and we will reply with the documents to bring and what the service involves. No appointment needed."
      />

      <section className="band-tight band">
        <div className="shell contact-grid">
          {/* ---- Form ---- */}
          <div className="reveal">
            <p className="eyebrow t-label">Enquiry</p>
            <h2 className="t-h3 contact-form-title">
              Tell us what you need.
            </h2>
            <EnquiryForm />
          </div>

          {/* ---- Details ---- */}
          <aside className="contact-aside reveal" aria-label="Contact details">
            <div className="well contact-card">
              <p className="t-label cat-card-code">Chinaki</p>

              <div className="foot-detail contact-detail">
                <IconPin size={17} />
                <address style={{ fontStyle: "normal" }}>
                  {site.addressLines.map((l) => (
                    <span key={l} style={{ display: "block" }}>
                      {l}
                    </span>
                  ))}
                </address>
              </div>

              <div className="foot-detail contact-detail">
                <IconWhatsApp size={17} />
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  {site.phone}
                  <span className="contact-detail-sub">
                    WhatsApp, answered in working hours
                  </span>
                </a>
              </div>

              <div className="foot-detail contact-detail">
                <IconMail size={17} />
                <a href={`mailto:${site.email}`} style={{ wordBreak: "break-word" }}>
                  {site.email}
                </a>
              </div>

              <div className="foot-detail contact-detail">
                <IconClock size={17} />
                <span>
                  {site.hours.days}
                  <br />
                  {site.hours.open} – {site.hours.close}
                  <span className="contact-detail-sub">
                    Closed {site.hours.closed}
                  </span>
                </span>
              </div>

              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-tab cat-card-link"
              >
                Open in Google Maps
                <IconArrow size={15} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ---- Map. Loaded lazily so it never blocks the form. ---- */}
      <section className="band-tight band" style={{ background: "var(--color-sunk)" }}>
        <div className="shell">
          <header className="band-head reveal">
            <p className="eyebrow t-label">Finding us</p>
            <h2 className="t-h2">BM Road, {site.locality}.</h2>
            <p className="t-lead band-head-lead">
              Next to the Government Boys Higher Secondary School, a short walk
              from the town centre.
            </p>
          </header>
          <div className="map reveal">
            <iframe
              src={site.mapEmbed}
              title={`Map showing Chinaki on BM Road, ${site.locality}, ${site.region}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
