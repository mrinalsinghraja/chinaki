import Link from "next/link";
import { IconArrow } from "@/components/Icons";
import { site, whatsappUrl } from "@/lib/site";
import { IconWhatsApp } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="band-tall band">
      <div className="shell-narrow cta-block">
        <p className="eyebrow t-label" style={{ justifyContent: "center" }}>
          Reference not found
        </p>
        <h1 className="t-h1" style={{ marginTop: "1.5rem" }}>
          This page is not in the file.
        </h1>
        <p className="t-lead" style={{ marginTop: "1.5rem" }}>
          The link may be old, or the address may have a typo in it. The services
          index has everything {site.name} handles.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <Link href="/services" className="btn btn-primary">
            Browse services
            <IconArrow size={17} />
          </Link>
          <a
            href={whatsappUrl("Hello Chinaki, I could not find what I was looking for on your website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <IconWhatsApp size={17} />
            Ask us directly
          </a>
        </div>
      </div>
    </section>
  );
}
