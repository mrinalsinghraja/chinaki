import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How Chinaki handles the documents and personal information you share with us, at our counter in ${site.locality}, ${site.region} and through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        code="LEGAL"
        trail={[{ label: "Privacy Policy" }]}
        title="Privacy Policy"
        intro="What we do with your documents and details, in plain terms."
      />

      <section className="band">
        <div className="shell">
          <div className="legal">
            <h2>What this covers</h2>
            <p>
              This policy describes how {site.name}, a digital service centre at{" "}
              {site.street}, {site.locality}, {site.region} – {site.postalCode},
              handles personal information. It covers both the work we do at the
              counter and anything you send us through this website or WhatsApp.
            </p>

            <h2>Information we handle</h2>
            <p>
              To complete a government, tax, business or examination
              application on your behalf, we necessarily handle the documents
              that application requires. Depending on the service, that can
              include:
            </p>
            <ul>
              <li>Your name, address, date of birth and contact details</li>
              <li>
                Identity documents such as Aadhaar, PAN, passport or voter ID
              </li>
              <li>Photographs and specimen signatures</li>
              <li>
                Educational certificates, marksheets and examination details
              </li>
              <li>
                Bank account details, where a service requires them — for
                example a refund, scholarship disbursal or provident fund claim
              </li>
              <li>
                Business documents such as registration certificates, premises
                proof and wage records
              </li>
            </ul>

            <h2>Why we handle it</h2>
            <p>
              For one reason only: to complete the specific service you asked
              us to complete. We do not use your documents for any other
              purpose, and we do not use them to market anything to you.
            </p>

            <h2>Who we share it with</h2>
            <p>
              Your information is submitted to the government department,
              portal, examination body or authority that the application is
              addressed to. That is the point of the service. Beyond that, we do
              not sell, rent or disclose your information to anyone, except
              where we are legally required to do so.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Original documents are returned to you at the counter, normally
              during the same visit. We retain the acknowledgement, reference
              number and a record of the service performed, so that the
              application can be traced or followed up later. Where copies are
              no longer needed for an ongoing application or a legal
              requirement, they are destroyed.
            </p>

            <h2>This website</h2>
            <p>
              This website does not store your enquiry. The enquiry form on the{" "}
              contact page composes a WhatsApp message from what you type and
              hands it to WhatsApp — nothing is written to a database here, and
              we do not set advertising or tracking cookies.
            </p>
            <p>
              The map on the contact page is embedded from Google Maps. When it
              loads, Google may receive your IP address and set its own cookies
              under Google&apos;s privacy policy, which we do not control.
            </p>
            <p>
              Messages you send us on WhatsApp are carried by WhatsApp and are
              subject to its own terms and privacy policy.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us what information we hold about a service we carried
              out for you, ask us to correct it, or ask us to destroy copies we
              no longer need. Contact us on WhatsApp at {site.phone} or by email
              at {site.email}.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes, the updated version will be published on
              this page.
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
