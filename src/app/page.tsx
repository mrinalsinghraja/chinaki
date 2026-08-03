import Link from "next/link";
import type { Metadata } from "next";
import { AcknowledgementSlip, stages } from "@/components/AcknowledgementSlip";
import { categories, totalServices } from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";
import { IconArrow, IconCheck, IconWhatsApp } from "@/components/Icons";
import {
  Filigree,
  GhostMark,
  GuillocheBand,
  Rosette,
} from "@/components/Ornament";
import { ServicePhoto } from "@/components/ServicePhoto";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/* The trust list, written as claims that can be checked rather than
   adjectives. "Best service" is not on this page anywhere. */
const trust = [
  {
    title: "Professional assistance",
    body: "Someone sits with you through the form, not a queue number and a wait.",
  },
  {
    title: "Accurate documentation",
    body: "Every field is checked against your documents before anything is submitted.",
  },
  {
    title: "Fast processing",
    body: "Applications go in the same day your documents are complete.",
  },
  {
    title: "Transparent guidance",
    body: "You are told the real timeline and the real fee before you commit.",
  },
  {
    title: "Friendly support",
    body: "Ask a follow-up question on WhatsApp any time during working hours.",
  },
  {
    title: "Convenient location",
    body: `BM Road, ${site.locality} — near the Government Boys Higher Secondary School.`,
  },
  {
    title: "Reliable digital services",
    body: "Printing, scanning and uploads done to the exact format a portal demands.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ================= HERO =================
          The thesis on the left, the finished object on the right.
          Not a centred headline with two buttons under it. */}
      <section className="hero masthead">
        {/* Bled off two edges so it reads as the sheet's watermark and
            not as a shape someone dropped mid-headline. */}
        <GhostMark
          size={680}
          tone="paper"
          className="orn orn-ghost"
          style={{ bottom: "-24%", left: "-17rem", zIndex: -1 }}
        />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow t-label">
              {site.locality}, {site.region}
            </p>
            <h1 className="t-display hero-title">
              Digital services
              <br />
              made simple.
            </h1>
            <p className="t-lead hero-lead">
              Helping individuals, students, professionals and businesses
              complete important government, business and digital services
              quickly, accurately and securely.
            </p>
            <div className="hero-actions">
              <Link href="/services" className="btn btn-primary">
                Explore our services
                <IconArrow size={17} />
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <IconWhatsApp size={17} />
                Chat on WhatsApp
              </a>
            </div>

            <dl className="hero-facts">
              <div>
                <dt className="t-label">Services</dt>
                <dd className="t-ref">{totalServices} across 6 departments</dd>
              </div>
              <div>
                <dt className="t-label">Open</dt>
                <dd className="t-ref">
                  {site.hours.days}, {site.hours.open}–{site.hours.close}
                </dd>
              </div>
            </dl>
          </div>

          {/* THE SIGNATURE. Engine-turned guilloche — the interlaced
              lathe-work printed on currency and share certificates,
              generated from parametric curves — with the finished
              document lifted off it. The brand's security engraving
              and its proof of work, in one object. */}
          <div className="hero-slip">
            <Rosette
              size={560}
              tone="gold"
              draw
              className="orn orn-rosette"
            />
            <AcknowledgementSlip />
          </div>
        </div>

        <div className="masthead-foot" aria-hidden="true">
          <GuillocheBand tone="gold" height={40} />
        </div>
      </section>

      {/* ================= ABOUT PREVIEW ================= */}
      <section className="band">
        <div className="shell about-grid">
          <div className="reveal">
            <p className="eyebrow t-label">Welcome to Chinaki</p>
            <h2 className="t-h2 about-title">
              A service centre that takes the paperwork off your hands.
            </h2>
          </div>
          <div className="reveal" style={{ ["--reveal-delay" as string]: "90ms" }}>
            <p className="t-body">
              Chinaki is a trusted digital service centre in {site.locality},{" "}
              {site.region}, offering reliable assistance for business
              registrations, tax services, government applications, digital
              documentation, online examinations and various e-Governance
              solutions.
            </p>
            <p className="t-body" style={{ marginTop: "1.5rem" }}>
              Our goal is simple — to save your time while providing accurate,
              transparent and professional service.
            </p>
            <Link href="/about" className="link-tab" style={{ marginTop: "2rem" }}>
              Read our story
              <IconArrow size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SERVICE FAMILIES ================= */}
      <section
        className="band band-watermark"
        style={{ background: "var(--color-sunk)" }}
      >
        {/* Printed into the stock, the way a watermark sits in a sheet
            of security paper rather than on top of it. */}
        <Rosette size={620} tone="navy" className="orn orn-watermark" />
        <div className="shell">
          <header className="band-head reveal">
            <p className="eyebrow t-label">What we handle</p>
            <h2 className="t-h2">Six families of work, one counter.</h2>
            <p className="t-lead band-head-lead">
              Pick the family that matches your need. Each one lists the exact
              documents to bring and how long it usually takes.
            </p>
          </header>

          <div className="grid-3">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="docket docket-photo reveal"
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                <div className="card-photo">
                  <ServicePhoto slug={c.slug} />
                </div>
                <div className="docket-body-wrap">
                  <div className="docket-head">
                    <span className="t-label docket-code">{c.code}</span>
                  </div>
                  <h3 className="t-h3 docket-title">{c.name}</h3>
                  <p className="t-small docket-body">{c.intro}</p>
                  <ul className="docket-tags">
                    {c.services.slice(0, 4).map((s) => (
                      <li key={s.name} className="tag">
                        {s.name}
                      </li>
                    ))}
                    {c.services.length > 4 && (
                      <li className="tag tag-more">
                        +{c.services.length - 4} more
                      </li>
                    )}
                  </ul>
                  <span className="link-tab docket-foot">
                    {c.services.length} services
                    <IconArrow size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS =================
          The four stages from the slip, opened up. Numbering earns
          its place here: this genuinely is a sequence. */}
      <section className="band">
        <div className="shell">
          <header className="band-head reveal">
            <p className="eyebrow t-label">Our process</p>
            <h2 className="t-h2">Four stages. You are told where you are.</h2>
          </header>

          <ol className="rail">
            {stages.map((s, i) => (
              <li
                key={s.step}
                className="rail-item reveal"
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="rail-num t-ref">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4 rail-title">{s.step}</h3>
                <p className="t-small">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="band" style={{ background: "var(--color-sunk)" }}>
        <div className="shell trust-grid">
          <div className="trust-aside reveal">
            <p className="eyebrow t-label">Why customers return</p>
            <h2 className="t-h2">
              We would rather be checkable than call ourselves the best.
            </h2>
            <p className="t-body" style={{ marginTop: "1.5rem" }}>
              Seven things we hold ourselves to. Every one of them is something
              you can verify on your first visit.
            </p>
            <Link href="/why-chinaki" className="link-tab" style={{ marginTop: "2rem" }}>
              Why choose Chinaki
              <IconArrow size={15} />
            </Link>
          </div>

          <ul className="trust-list">
            {trust.map((t, i) => (
              <li
                key={t.title}
                className="trust-item reveal"
                style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}
              >
                <span className="trust-tick" aria-hidden="true">
                  <IconCheck size={13} />
                </span>
                <div>
                  <p className="t-h4">{t.title}</p>
                  <p className="t-small">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= PROMISE + CTA =================
          The one place the promise is made, so it is the one place
          that gets the full engraved treatment: navy plate, double
          rule, four filigree corners. A certificate, not a banner. */}
      <section className="band-tall band">
        <div className="shell">
          <div className="engraved cta-plate reveal">
            <Filigree size={92} className="engraved-corner" data-at="tl" />
            <Filigree size={92} className="engraved-corner" data-at="tr" />
            <Filigree size={92} className="engraved-corner" data-at="bl" />
            <Filigree size={92} className="engraved-corner" data-at="br" />
            <GhostMark
              size={420}
              tone="paper"
              className="orn orn-ghost"
              style={{ top: "-22%", right: "-6rem", zIndex: -1 }}
            />
            <div className="shell-narrow cta-block">
          <p className="eyebrow t-label" style={{ justifyContent: "center" }}>
            Our promise
          </p>
          <p className="t-h1 cta-quote">
            We are committed to delivering reliable digital solutions with
            professionalism, transparency and customer satisfaction.
          </p>
          <p className="t-lead" style={{ marginTop: "2rem" }}>
            Need assistance? Our experts are one WhatsApp message away.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <IconWhatsApp size={17} />
              Chat now
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Visit the counter
              <IconArrow size={17} />
            </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
