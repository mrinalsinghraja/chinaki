import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquireBar } from "@/components/EnquireBar";
import { site } from "@/lib/site";
import { totalCategoriesWord, totalServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "About us",
  description: `Chinaki is a digital service centre on BM Road, ${site.locality}, ${site.region}. Our story, mission, vision and the values we hold ourselves to.`,
  alternates: { canonical: "/about" },
};

/* Values as behaviours. "Integrity" on its own is a poster; what it
   means in practice is what a visitor can actually hold us to. */
const values = [
  {
    name: "Integrity",
    body: "We tell you what an application really requires, even when that means more work for us and a longer wait for you.",
  },
  {
    name: "Transparency",
    body: "Government fees and our charges are stated separately, before you commit to anything.",
  },
  {
    name: "Accuracy",
    body: "A form is checked against your documents before submission. A rejected application costs you more than the extra ten minutes.",
  },
  {
    name: "Customer first",
    body: "If a service is better done elsewhere, or not needed at all, we say so.",
  },
  {
    name: "Continuous learning",
    body: "Portals and rules change constantly. Keeping up with them is part of the job, not an excuse.",
  },
  {
    name: "Professionalism",
    body: "Your documents are handled carefully, kept confidential, and returned to you.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        code="ABOUT"
        trail={[{ label: "About us" }]}
        title="Our story"
        intro={`Chinaki was established to simplify digital and government services for individuals and businesses in ${site.locality}.`}
      />

      {/* ---- Editorial narrative: a wide measure for the lead, a
              narrow one for reading. ---- */}
      <section className="band">
        <div className="shell story-grid">
          <div className="story-aside reveal">
            <p className="t-label story-aside-label">Where we are</p>
            <p className="t-small">
              {site.addressLines.join(", ")}
            </p>
            <p className="t-label story-aside-label">Open</p>
            <p className="t-small">
              {site.hours.days}
              <br />
              {site.hours.open} – {site.hours.close}
            </p>
            <p className="t-label story-aside-label">Scope</p>
            <p className="t-small">
              {totalServices} services across {totalCategoriesWord} families
            </p>
          </div>

          <div className="prose reveal">
            <p className="t-lead">
              From registrations and documentation to online applications and
              compliance support, we help customers complete essential tasks
              with confidence.
            </p>
            <p>
              Most of what we do looks small from the outside. A form filled
              correctly. A document scanned to the size a portal will accept. A
              query from a department answered the same week it arrives. None of
              it is dramatic — and all of it is the difference between an
              application that succeeds and one that comes back three weeks
              later with a rejection you have to start over from.
            </p>
            <p>
              That is the work. We sit with people while they fill the form, we
              tell them plainly what is missing, and we keep the acknowledgement
              so it can be found again when someone asks for it six months
              later.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Mission and vision, given equal weight and real space ---- */}
      <section className="band" style={{ background: "var(--color-sunk)" }}>
        <div className="shell grid-2">
          <div className="statement reveal">
            <p className="eyebrow t-label">Mission</p>
            <p className="t-h2 statement-text">
              To make digital and government services accessible, reliable and
              hassle-free.
            </p>
          </div>
          <div
            className="statement reveal"
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            <p className="eyebrow t-label">Vision</p>
            <p className="t-h2 statement-text">
              To become one of {site.region}&apos;s most trusted digital service
              centres.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="band">
        <div className="shell">
          <header className="band-head reveal">
            <p className="eyebrow t-label">Core values</p>
            <h2 className="t-h2">Six commitments, written as behaviour.</h2>
            <p className="t-lead band-head-lead">
              A value that cannot be checked is decoration. Each of these
              describes something we do, so you can tell whether we did it.
            </p>
          </header>

          <dl className="values">
            {values.map((v, i) => (
              <div
                key={v.name}
                className="value reveal"
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <dt className="t-h3">{v.name}</dt>
                <dd className="t-small">{v.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <EnquireBar
        heading="Come and see for yourself."
        body={`The counter is on BM Road, near the Government Boys Higher Secondary School. Open ${site.hours.days.toLowerCase()}.`}
        message="Hello Chinaki, I read about you and would like to visit. Are you open today?"
      />
    </>
  );
}
