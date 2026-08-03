import Link from "next/link";
import { GhostMark, GuillocheBand } from "./Ornament";

/**
 * THE UNIVERSAL SUB-PAGE HEADER
 *
 * Every page that is not the homepage opens with this band. It is
 * built like the header block of a file: a mono trail showing where
 * you are, a code in the margin, the title, and one line of intent.
 *
 * Keeping the header in one component is what makes thirteen pages
 * feel like one site — nothing drifts, because there is only one
 * place the title size and spacing are set.
 *
 * It is a navy masthead, which is also what lets the nav stop
 * guessing: unscrolled the bar is always over navy, scrolled it is
 * always over paper. No per-route logic anywhere.
 */
export function PageHeader({
  code,
  trail,
  title,
  intro,
  children,
}: {
  /** Mono file code shown in the margin, e.g. "BUS" or "ABOUT". */
  code: string;
  /** Breadcrumb. The last entry is the current page and is not a link. */
  trail: { label: string; href?: string }[];
  title: string;
  intro?: string;
  /** Optional actions or meta placed under the intro. */
  children?: React.ReactNode;
}) {
  return (
    <header className="phead masthead">
      {/* The brand at architectural scale, bled off the right edge. */}
      <GhostMark
        size={520}
        tone="paper"
        className="orn orn-ghost"
        style={{ top: "-14%", right: "-9rem", zIndex: -1 }}
      />
      <div className="shell">
        <nav aria-label="Breadcrumb" className="phead-trail t-label">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            {trail.map((t) => (
              <li key={t.label}>
                <span aria-hidden="true" className="phead-sep">
                  /
                </span>
                {t.href ? (
                  <Link href={t.href}>{t.label}</Link>
                ) : (
                  <span aria-current="page">{t.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="phead-body">
          <p className="t-label phead-code">{code}</p>
          <div>
            <h1 className="t-h1">{title}</h1>
            {intro && (
              <p className="t-lead phead-intro">{intro}</p>
            )}
            {children}
          </div>
        </div>
      </div>

      {/* The engraved ribbon on the navy-to-paper seam. */}
      <div className="masthead-foot" aria-hidden="true">
        <GuillocheBand tone="gold" height={34} />
      </div>
    </header>
  );
}
