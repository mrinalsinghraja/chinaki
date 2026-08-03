/**
 * ORNAMENT — the site's graphic language.
 *
 * Chinaki's product is an official document, so the decoration is the
 * decoration official documents actually use: guilloche. The interlaced
 * lathe-work printed on currency, share certificates, diplomas and
 * passport pages, made expensive on purpose so it cannot be faked.
 *
 * Everything here is generated from parametric curves into SVG paths.
 * That buys unlimited ornament at near-zero page weight (path data is
 * long but numerically repetitive, so it gzips to a few kB), keeps every
 * graphic in one visual family, and means there is no raster asset to
 * re-cut when a colour changes.
 *
 * All maths is deterministic — no Math.random anywhere — so these render
 * identically on the server and the client and never trip hydration.
 *
 * The one exception is GhostMark, which is the client's actual logo and
 * therefore has to be their file, not our curves.
 */

import Image from "next/image";

const TAU = Math.PI * 2;

/**
 * Spirograph rosette: a circle of radius R with a second circle of
 * radius r rolling on it k times. Phase-shifting copies of the same
 * curve is what produces the woven, moire-like interlace.
 */
function rosette(
  R: number,
  r: number,
  k: number,
  phase: number,
  steps: number,
  cx: number,
  cy: number,
) {
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * TAU;
    const x = cx + R * Math.cos(t) + r * Math.cos(k * t + phase);
    const y = cy + R * Math.sin(t) + r * Math.sin(k * t + phase);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
}

/** A ring whose radius is modulated by a cosine — the scalloped rule. */
function scallopRing(
  R: number,
  amp: number,
  k: number,
  phase: number,
  steps: number,
  cx: number,
  cy: number,
) {
  let d = "";
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * TAU;
    const rad = R + amp * Math.cos(k * t + phase);
    const x = cx + rad * Math.cos(t);
    const y = cy + rad * Math.sin(t);
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
}

/**
 * THE SIGNATURE.
 *
 * An engine-turned medallion: two interlaced rosette families inside a
 * scalloped rule. On the homepage it carries the monogram at its centre,
 * so the brand mark and the security engraving are one object rather
 * than two things sharing a screen.
 *
 * `draw` sets the plotter animation going — the curves ink themselves in
 * on load the way a lathe would cut them. Off by default; the hero is
 * the only place that earns it.
 */
export function Rosette({
  size = 420,
  tone = "navy",
  draw = false,
  className,
}: {
  size?: number;
  tone?: "navy" | "gold" | "paper";
  draw?: boolean;
  className?: string;
}) {
  const stroke =
    tone === "gold" ? "#C89B4A" : tone === "paper" ? "#F0E9D6" : "#16295C";
  const C = 120;
  const outer = [0, 1, 2, 3, 4].map((i) =>
    rosette(74, 26, 7, (i * TAU) / 24, 300, C, C),
  );
  const inner = [0, 1, 2, 3].map((i) =>
    rosette(44, 20, 5, (i * TAU) / 16 + 0.4, 240, C, C),
  );

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
      data-draw={draw ? "true" : undefined}
    >
      {/* Milled containing rule — the reeded edge of a struck coin.
          Amplitude past ~2 stops reading as milling and starts
          reading as gear teeth. */}
      <path
        d={scallopRing(108, 2, 60, 0, 540, C, C)}
        stroke={stroke}
        strokeWidth="1"
        opacity="0.7"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={C}
        cy={C}
        r="99"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />

      {outer.map((d, i) => (
        <path
          key={`o${i}`}
          d={d}
          stroke={stroke}
          strokeWidth="1"
          opacity="0.85"
          className="guil"
          pathLength={1}
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      {inner.map((d, i) => (
        <path
          key={`i${i}`}
          d={d}
          stroke={stroke}
          strokeWidth="0.9"
          opacity="0.7"
          className="guil"
          pathLength={1}
          style={{ animationDelay: `${420 + i * 90}ms` }}
        />
      ))}

      <circle cx={C} cy={C} r="27" stroke={stroke} strokeWidth="0.6" opacity="0.45" />
    </svg>
  );
}

/**
 * The woven ribbon that runs along a banknote's edge: two sine terms of
 * different frequency summed, then phase-shifted into a bundle. Used as
 * section dividers, so the joins between bands read as printed rather
 * than as a CSS border.
 */
export function GuillocheBand({
  tone = "navy",
  height = 44,
  className,
}: {
  tone?: "navy" | "gold" | "paper";
  height?: number;
  className?: string;
}) {
  const stroke =
    tone === "gold" ? "#C89B4A" : tone === "paper" ? "#F0E9D6" : "#16295C";
  const W = 1200;
  const H = 60;
  const lines = [0, 1, 2, 3, 4, 5, 6].map((i) => {
    const phase = (i / 7) * TAU;
    let d = "";
    for (let x = 0; x <= W; x += 4) {
      const y =
        H / 2 +
        16 * Math.sin((x / W) * TAU * 6 + phase) +
        7 * Math.sin((x / W) * TAU * 13 - phase * 1.7);
      d += `${x ? "L" : "M"}${x} ${y.toFixed(1)}`;
    }
    return d;
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={height}
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      {lines.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth="0.8" opacity="0.42" />
      ))}
    </svg>
  );
}

/**
 * The brand at architectural scale: the monogram blown up and bled off
 * the edge of a band at watermark opacity. This is what carries big
 * brand presence without the logo being pasted six times at nav size,
 * and at 620px it is the largest piece of brand on any page — which is
 * exactly why it had to stop being an approximation of the mark.
 *
 * It uses a flat single-colour silhouette rather than the two-colour
 * artwork: at 5% opacity a navy-and-gold mark loses half its shape
 * against a ground that matches either colour.
 */
export function GhostMark({
  size = 560,
  tone = "navy",
  className,
  style,
}: {
  /** Width. Height follows the mark's own 512:585 proportion. */
  size?: number;
  tone?: "navy" | "gold" | "paper";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Image
      src={tone === "paper" ? "/brand/ghost-paper.png" : "/brand/ghost-navy.png"}
      alt=""
      aria-hidden="true"
      width={512}
      height={585}
      className={className}
      style={{ ...style, width: size, height: "auto" }}
      sizes={`${size}px`}
      /* Gold was a third tone nobody used once the silhouettes went
         in; navy and paper cover every ground on the site. */
    />
  );
}

/**
 * An engraved medallion to seat a service-family icon in. The double
 * rule and the four cardinal ticks are lifted straight off a stamped
 * departmental seal, which is the object a visitor is trying to end up
 * holding.
 */
export function Crest({
  size = 56,
  tone = "navy",
  children,
}: {
  size?: number;
  tone?: "navy" | "gold";
  children?: React.ReactNode;
}) {
  const stroke = tone === "gold" ? "#C89B4A" : "#16295C";
  return (
    <span className="crest" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
        className="crest-ring"
      >
        <path
          d={scallopRing(29, 1.4, 24, 0, 240, 32, 32)}
          stroke={stroke}
          strokeWidth="0.9"
          opacity="0.55"
        />
        <circle cx="32" cy="32" r="24.5" stroke={stroke} strokeWidth="0.7" opacity="0.4" />
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1="32"
            y1="3.5"
            x2="32"
            y2="7.5"
            stroke={stroke}
            strokeWidth="0.9"
            opacity="0.6"
            transform={`rotate(${a} 32 32)`}
          />
        ))}
      </svg>
      <span className="crest-inner">{children}</span>
    </span>
  );
}

/**
 * Certificate corner. Four of these frame a panel the way an engraved
 * border frames a diploma — a rule that turns a corner and terminates
 * in a small rosette node.
 */
export function Filigree({
  size = 76,
  tone = "gold",
  ...rest
}: {
  size?: number;
  tone?: "navy" | "gold" | "paper";
} & React.SVGProps<SVGSVGElement>) {
  const stroke =
    tone === "gold" ? "#C89B4A" : tone === "paper" ? "#F0E9D6" : "#16295C";
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      {...rest}
    >
      <path d="M0 10 H52 A18 18 0 0 1 70 28 V80" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
      <path d="M0 17 H49 A11 11 0 0 1 60 28 V80" stroke={stroke} strokeWidth="0.6" opacity="0.4" />
      <path
        d={rosette(5, 2.4, 6, 0, 90, 70, 28)}
        stroke={stroke}
        strokeWidth="0.6"
        opacity="0.75"
      />
    </svg>
  );
}
