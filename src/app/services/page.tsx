import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquireBar } from "@/components/EnquireBar";
import {
  categories,
  serviceAnchor,
  totalCategoriesWord,
  totalServices,
} from "@/lib/services";
import { site } from "@/lib/site";
import { IconArrow } from "@/components/Icons";
import { ServicePhoto } from "@/components/ServicePhoto";

export const metadata: Metadata = {
  title: "Services",
  description: `All ${totalServices} services Chinaki handles in ${site.locality}, ${site.region} — business registration, GST, income tax, government certificates, EPF and ESIC, student entrance forms and documentation.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        code="SRV"
        trail={[{ label: "Services" }]}
        title="Everything we handle, grouped so you can find it."
        intro={`${totalServices} services across ${totalCategoriesWord} families. Open the one that matches your need — each page lists the documents to bring and the timeline you can expect.`}
      />

      <section className="band-tight band">
        <div className="shell">
          <div className="grid-3">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/services/${c.slug}`}
                className="docket docket-photo reveal"
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
              >
                {/* The photograph leads. Someone recognises a counter
                    and a person before they read a word, and the two
                    families at the top of the grid are the ones most
                    people arrive looking for. */}
                <div className="card-photo">
                  <ServicePhoto slug={c.slug} priority={i < 2} />
                </div>
                <div className="docket-body-wrap">
                  <div className="docket-head">
                    <span className="t-label docket-code">{c.code}</span>
                  </div>
                  <h2 className="t-h3 docket-title">{c.name}</h2>
                  <p className="t-small docket-body">{c.intro}</p>
                  <p className="t-label docket-audience">For</p>
                  <p className="t-small docket-body">{c.audience}</p>
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

      {/* The full index, for anyone who would rather scan one list. */}
      <section className="band" style={{ background: "var(--color-sunk)" }}>
        <div className="shell">
          <header className="band-head reveal">
            <p className="eyebrow t-label">Full index</p>
            <h2 className="t-h2">Every service, A to Z by family.</h2>
          </header>

          <div className="index-grid">
            {categories.map((c) => (
              <div key={c.slug} className="index-col reveal">
                <p className="t-label index-head">
                  {c.code} · {c.name}
                </p>
                <ul>
                  {c.services.map((s) => (
                    <li key={s.name}>
                      <Link
                        href={`/services/${c.slug}#${serviceAnchor(s.name)}`}
                        className="index-link"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquireBar message="Hello Chinaki, I looked at your services page and I need help choosing the right service." />
    </>
  );
}
