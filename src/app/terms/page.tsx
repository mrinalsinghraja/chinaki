import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms on which Chinaki provides digital, business, tax and e-Governance assistance in ${site.locality}, ${site.region}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        code="LEGAL"
        trail={[{ label: "Terms & Conditions" }]}
        title="Terms & Conditions"
        intro="What we are responsible for, and what remains with the issuing department."
      />

      <section className="band">
        <div className="shell">
          <div className="legal">
            <h2>Who we are</h2>
            <p>
              {site.name} is a digital service centre at {site.street},{" "}
              {site.locality}, {site.region} – {site.postalCode}. We assist
              individuals, students and businesses in preparing and submitting
              applications to government departments, portals, examination
              bodies and authorities.
            </p>

            <h2>What we provide</h2>
            <p>
              We provide assistance: preparing an application, checking it
              against your documents, submitting it, paying the prescribed fee
              where applicable, and following up on its status. We are an
              independent service centre. We are not a government department,
              and we do not represent or act on behalf of one.
            </p>

            <h2>What we do not control</h2>
            <p>
              The outcome of an application, and how long it takes, is decided
              by the issuing department or authority. Timelines quoted on this
              website and at the counter are honest estimates based on
              experience — they are not guarantees. We cannot promise that an
              application will be approved, and no fee paid to us should be
              understood as buying an outcome.
            </p>

            <h2>Your responsibilities</h2>
            <ul>
              <li>
                Provide accurate, genuine and complete information and documents.
              </li>
              <li>
                Check the details in an application before it is submitted. We
                will show them to you.
              </li>
              <li>
                Tell us promptly if anything changes — an address, a phone
                number or a correction on a certificate.
              </li>
              <li>
                Keep the acknowledgement and reference number we give you.
              </li>
            </ul>
            <p>
              An application prepared from incorrect information supplied to us
              may be rejected by the department, and we cannot be responsible
              for that outcome.
            </p>

            <h2>Fees</h2>
            <p>
              Government fees and our service charge are stated separately
              before you commit. Government fees are set by the department and
              are payable to it. Our service charge covers the work of
              preparing and submitting the application, and is not refundable
              once that work has been carried out — including where the
              department declines the application.
            </p>

            <h2>Documents</h2>
            <p>
              Original documents are returned to you, normally during the same
              visit. Please collect them. We handle your documents carefully and
              confidentially, as described in our Privacy Policy.
            </p>

            <h2>Limits of liability</h2>
            <p>
              Our responsibility is limited to carrying out the service you
              engaged us for with due care. We are not liable for delays,
              rejections or decisions of a department, for changes in law or
              portal procedure, or for consequences arising from information
              that was supplied to us incorrectly.
            </p>

            <h2>This website</h2>
            <p>
              The information on this website is provided for general guidance.
              Document requirements and timelines change, sometimes without
              notice. Confirm the current requirement with us before you rely on
              it.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of India, and any dispute
              will be subject to the jurisdiction of the courts at{" "}
              {site.locality}, {site.region}.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms: WhatsApp {site.phone} or email{" "}
              {site.email}.
            </p>

            <p className="t-label legal-updated">
              Last updated: July 2026 · {site.name}, {site.locality},{" "}
              {site.region}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
