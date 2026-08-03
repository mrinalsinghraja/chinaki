import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquireBar } from "@/components/EnquireBar";
import { AcknowledgementSlip } from "@/components/AcknowledgementSlip";
import { site } from "@/lib/site";
import {
  IconClock,
  IconPin,
  IconShield,
  IconSpark,
  IconWhatsApp,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Why choose Chinaki",
  description: `Professional guidance, time saved, secure documentation, support throughout the application, and a convenient location in the heart of ${site.locality}.`,
  alternates: { canonical: "/why-chinaki" },
};

const pillars = [
  {
    Icon: IconSpark,
    title: "Professional guidance",
    lead: "We ensure every application is submitted accurately and efficiently.",
    body: "The most expensive mistake in government paperwork is a small one — a mismatched name, a photograph two kilobytes over the limit, a document uploaded in the wrong format. We check for those before the application goes in, because catching them afterwards means starting again.",
  },
  {
    Icon: IconClock,
    title: "Time saving",
    lead: "Avoid unnecessary delays through expert assistance.",
    body: "Knowing which form, which portal and which enclosure is what turns a three-visit process into one. You bring the documents once; we handle the submission, the fee and the follow-up.",
  },
  {
    Icon: IconShield,
    title: "Secure documentation",
    lead: "Your information is handled responsibly and confidentially.",
    body: "Originals are returned to you the same visit. Files are used for the application you asked for and nothing else, and we do not share your documents or details with anyone who is not part of that application.",
  },
  {
    Icon: IconWhatsApp,
    title: "Customer support",
    lead: "We remain available throughout the application process.",
    body: "You get the reference number, and you can ask about it on WhatsApp during working hours. If a department raises a query, we tell you what it says in plain language and what we need from you to answer it.",
  },
  {
    Icon: IconPin,
    title: "Convenient location",
    lead: `Easy accessibility in the heart of ${site.locality}.`,
    body: "BM Road, near the Government Boys Higher Secondary School — walkable from the town centre and straightforward to reach from the surrounding areas.",
  },
];

export default function WhyPage() {
  return (
    <>
      <PageHeader
        code="WHY"
        trail={[{ label: "Why Chinaki" }]}
        title="Why people bring their paperwork here."
        intro="Five reasons, each stated as something you can hold us to on your first visit."
      />

      <section className="band">
        <div className="shell pillars">
          {pillars.map(({ Icon, title, lead, body }, i) => (
            <article
              key={title}
              className="pillar reveal"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <div className="pillar-mark">
                <span className="mega-icon">
                  <Icon size={20} />
                </span>
                <span className="t-label pillar-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h2 className="t-h3 pillar-title">{title}</h2>
                <p className="t-body pillar-lead">{lead}</p>
                <p className="t-small">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The slip returns here as evidence rather than decoration:
          this page argues for a standard, and the slip is the standard. */}
      <section className="band" style={{ background: "var(--color-sunk)" }}>
        <div className="shell proof-grid">
          <div className="reveal">
            <p className="eyebrow t-label">What you leave with</p>
            <h2 className="t-h2 proof-title">
              A reference number, not a promise.
            </h2>
            <p className="t-body" style={{ marginTop: "1.5rem" }}>
              Every job closes the same way: a printed acknowledgement with the
              reference on it, the service named, and the stages that were
              completed. Keep it. It is what lets anyone — you, a bank, a
              department — confirm what was done and when.
            </p>
          </div>
          <div className="proof-slip reveal">
            <AcknowledgementSlip
              animate={false}
              reference="CHK/2026/ITR/1172"
              service="Income Tax Return"
            />
          </div>
        </div>
      </section>

      <EnquireBar
        heading="Bring us the form you have been putting off."
        message="Hello Chinaki, I have an application I need help with."
      />
    </>
  );
}
