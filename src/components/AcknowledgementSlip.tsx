import { IconCheck } from "./Icons";
import { Stamp } from "./Logo";
import { site } from "@/lib/site";

/**
 * THE SIGNATURE ELEMENT
 *
 * Every job Chinaki does ends the same way: a printed
 * acknowledgement with a reference number on it. So the hero shows
 * that object rather than describing it — a paper slip torn along a
 * perforation, resting on the obsidian desk, with a struck seal and
 * the four stages ticking through in order.
 *
 * It does double duty: it is also the brief's four-step process, so
 * the page makes its promise and explains its method in one object
 * instead of two sections.
 */

export const stages = [
  {
    step: "Choose your service",
    detail: "Tell us what you need. We confirm the documents before you start.",
    stamp: "09:40",
  },
  {
    step: "Submit your documents",
    detail: "Bring originals or send them on WhatsApp. We check every one.",
    stamp: "10:15",
  },
  {
    step: "Application processed",
    detail: "We file it, pay the fee, and answer any department query.",
    stamp: "11:02",
  },
  {
    step: "Successfully completed",
    detail: "You get the certificate, the acknowledgement and a copy for records.",
    stamp: "Issued",
  },
] as const;

export function AcknowledgementSlip({
  reference = "CHK/2026/GST/0418",
  service = "GST Registration",
  animate = true,
}: {
  reference?: string;
  service?: string;
  animate?: boolean;
}) {
  return (
    <figure className="slip-wrap" data-animate={animate ? "true" : "false"}>
      <div className="slip slip-body">
        <div className="slip-head">
          <div>
            <p className="t-label slip-kicker">Acknowledgement</p>
            <p className="slip-org">
              {site.name} · {site.locality}
            </p>
          </div>
          <div className="slip-stamp-mark" aria-hidden="true">
            <Stamp size={66} />
          </div>
        </div>

        <dl className="slip-meta">
          <div>
            <dt className="t-label slip-dt">Reference</dt>
            <dd className="t-ref slip-dd">{reference}</dd>
          </div>
          <div>
            <dt className="t-label slip-dt">Service</dt>
            <dd className="t-ref slip-dd">{service}</dd>
          </div>
        </dl>

        <ol className="slip-stages">
          {stages.map((s, i) => (
            <li
              key={s.step}
              className="slip-stage"
              style={{ ["--i" as string]: i }}
            >
              <span className="slip-tick" aria-hidden="true">
                <IconCheck size={13} />
              </span>
              <span className="slip-step">{s.step}</span>
              <span className="t-ref slip-stamp">{s.stamp}</span>
            </li>
          ))}
        </ol>

        <div className="slip-line slip-foot">
          <span className="t-label slip-dt">Handled at counter</span>
          <span className="t-ref slip-dd">
            {site.hours.open}–{site.hours.close}
          </span>
        </div>
      </div>
      {/* The stub you tear off, at the foot where a receipt tears. */}
      <div className="slip-perf" aria-hidden="true" />
      <figcaption className="slip-caption t-label">
        Every service ends with a reference you can hold
      </figcaption>
    </figure>
  );
}
