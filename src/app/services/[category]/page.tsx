import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EnquireBar } from "@/components/EnquireBar";
import {
  categories,
  getCategory,
  serviceAnchor,
} from "@/lib/services";
import { site, whatsappUrl } from "@/lib/site";
import {
  IconArrow,
  IconClock,
  IconPin,
  IconPlus,
  IconWhatsApp,
  categoryIcons,
} from "@/components/Icons";
import { Crest } from "@/components/Ornament";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: c.name,
    description: `${c.name} at Chinaki, ${site.locality}: ${c.services
      .map((s) => s.name)
      .join(", ")}. ${c.intro}`,
    alternates: { canonical: `/services/${c.slug}` },
    openGraph: {
      title: `${c.name} · ${site.name}`,
      description: c.intro,
      url: `${site.url}/services/${c.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const current = getCategory(category);
  if (!current) notFound();

  const Icon = categoryIcons[current.slug];

  /* Service-level structured data — this is what a search engine
     needs to answer "who does GST registration in Nagaon". */
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${current.name} — ${site.name}`,
    description: current.intro,
    itemListElement: current.services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.summary,
        serviceType: current.name,
        provider: { "@id": `${site.url}/#business` },
        areaServed: { "@type": "City", name: site.locality },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        code={current.code}
        trail={[
          { label: "Services", href: "/services" },
          { label: current.name },
        ]}
        title={current.name}
        intro={current.intro}
      >
        <p className="t-small phead-audience">
          <span className="t-label phead-audience-label">For</span>
          {current.audience}
        </p>
      </PageHeader>

      {/* ---- Family switcher. Real links, no JavaScript, and it
              doubles as the breadcrumb's sibling navigation. ---- */}
      <nav className="switcher" aria-label="Service families">
        <div className="shell switcher-scroll">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/services/${c.slug}`}
              className="switcher-tab"
              aria-current={c.slug === current.slug ? "page" : undefined}
            >
              <span className="t-label switcher-code">{c.code}</span>
              {c.name.replace(" Services", "")}
            </Link>
          ))}
        </div>
      </nav>

      <section className="band-tight band">
        <div className="shell cat-grid">
          {/* ---- The services ---- */}
          <div className="cat-main">
            {current.services.map((s, i) => (
              <article
                key={s.name}
                id={serviceAnchor(s.name)}
                className="svc reveal"
                style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
              >
                <div className="svc-head">
                  <h2 className="t-h3">{s.name}</h2>
                  <span className="svc-time">
                    <IconClock size={13} />
                    {s.turnaround}
                  </span>
                </div>

                <p className="t-body svc-summary">{s.summary}</p>

                {/* Progressive disclosure: the document list is the
                    detail most visitors want second, not first. */}
                <details className="disclose">
                  <summary className="disclose-summary">
                    <IconPlus size={15} />
                    <span>What to bring</span>
                  </summary>
                  <ul className="disclose-body">
                    {s.documents.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </details>

                <a
                  href={whatsappUrl(
                    `Hello Chinaki, I would like to enquire about ${s.name}. Please tell me what documents I need to bring.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-tab svc-cta"
                >
                  Enquire about {s.name}
                  <IconArrow size={15} />
                </a>
              </article>
            ))}
          </div>

          {/* ---- Contextual sidebar ---- */}
          <aside className="cat-aside" aria-label="Visit Chinaki">
            <div className="well cat-card">
              <Crest size={52}>
                <Icon size={20} />
              </Crest>
              <p className="t-label cat-card-code">{current.code}</p>
              <p className="t-h4 cat-card-title">
                {current.services.length} services in this family
              </p>
              <p className="t-small">
                Bring your documents to the counter, or send them on WhatsApp
                and we will confirm what is missing before you travel.
              </p>

              <a
                href={whatsappUrl(
                  `Hello Chinaki, I need help with ${current.name.toLowerCase()}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary cat-card-cta"
              >
                <IconWhatsApp size={17} />
                Message us
              </a>

              <hr className="rule cat-card-rule" />

              <div className="foot-detail">
                <IconClock size={16} />
                <span>
                  {site.hours.days}
                  <br />
                  {site.hours.open} – {site.hours.close}
                </span>
              </div>
              <div className="foot-detail">
                <IconPin size={16} />
                <address style={{ fontStyle: "normal" }}>
                  {site.addressLines.map((l) => (
                    <span key={l} style={{ display: "block" }}>
                      {l}
                    </span>
                  ))}
                </address>
              </div>

              <Link href="/contact" className="link-tab cat-card-link">
                Directions and map
                <IconArrow size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <EnquireBar
        heading={`Questions about ${current.name.toLowerCase()}?`}
        message={`Hello Chinaki, I have a question about ${current.name.toLowerCase()}.`}
      />
    </>
  );
}
