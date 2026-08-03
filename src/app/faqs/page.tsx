import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquireBar } from "@/components/EnquireBar";
import { site } from "@/lib/site";
import { IconArrow, IconPlus } from "@/components/Icons";

export const metadata: Metadata = {
  title: "FAQs",
  description: `Common questions about Chinaki in ${site.locality} — GST registration timelines, documents required, government applications, appointments, WhatsApp contact and accepted payment methods.`,
  alternates: { canonical: "/faqs" },
};

/* Answers are written as answers: the number first, the caveat second.
   Nothing here promises a timeline a department controls. */
const faqs = [
  {
    q: "How long does GST registration take?",
    a: "Usually seven to ten working days from the day your documents are complete. The department can raise a clarification during that period, which adds a few days — we answer those queries on your behalf and tell you if anything is needed from you. Registrations submitted with incomplete address proof are the most common cause of delay, so we check that before filing.",
  },
  {
    q: "What documents are required?",
    a: "It depends on the service, and every service page on this site lists its own document set under “What to bring”. As a general rule you will need Aadhaar, PAN, a recent photograph, and proof of address — for business services, proof of the business premises as well. If you are unsure, send a message on WhatsApp describing what you need and we will reply with the exact list before you travel.",
  },
  {
    q: "Can you help with government applications?",
    a: "Yes. Certificates, scheme and subsidy applications, e-Governance portal submissions, CSC transactions and departmental forms are a large part of what we do. We prepare the application, submit it, pay the fee, and follow up on the status until the outcome is issued. What we cannot do is change how long an issuing office takes to decide.",
  },
  {
    q: "Do I need an appointment?",
    a: `No. Walk in any time we are open — ${site.hours.days}, ${site.hours.open} to ${site.hours.close}. For entrance and admission forms with a closing date, it is worth messaging first so we can tell you the quietest time and confirm you have everything with you.`,
  },
  {
    q: "Can I contact you through WhatsApp?",
    a: `Yes, and it is the fastest way to reach us. Message ${site.phone} with your question or send photographs of your documents, and we will tell you what is missing and what the service will involve. WhatsApp is answered during working hours.`,
  },
  {
    q: "What payment methods are accepted?",
    a: "Cash and UPI at the counter. Government fees and our service charge are always stated separately, so you can see exactly what goes to the department and what is ours, before anything is paid.",
  },
];

export default function FaqsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        code="FAQ"
        trail={[{ label: "FAQs" }]}
        title="Questions customers usually ask."
        intro="The six that come up most, answered properly. If yours is not here, message us and we will answer it directly."
      />

      <section className="band">
        <div className="shell faq-grid">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="faq reveal"
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
                /* The first answer is open, so the pattern is obvious
                   without the visitor having to discover it. */
                open={i === 0}
              >
                <summary className="faq-summary">
                  <span className="t-h4 faq-q">{f.q}</span>
                  <IconPlus size={17} />
                </summary>
                <p className="t-body faq-a">{f.a}</p>
              </details>
            ))}
          </div>

          <aside className="faq-aside" aria-label="Still unsure">
            <div className="well cat-card">
              <p className="t-label cat-card-code">Still unsure</p>
              <p className="t-h4 cat-card-title">
                Describe your situation instead.
              </p>
              <p className="t-small">
                Most questions are really about one specific document. Send it
                on WhatsApp and we will tell you where you stand.
              </p>
              <a
                href={`https://wa.me/91${site.phone}?text=${encodeURIComponent(
                  "Hello Chinaki, I have a question that is not answered on your FAQs page.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary cat-card-cta"
              >
                Ask a question
              </a>
              <hr className="rule cat-card-rule" />
              <Link href="/services" className="link-tab">
                Browse all services
                <IconArrow size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <EnquireBar message="Hello Chinaki, I have a question about your services." />
    </>
  );
}
