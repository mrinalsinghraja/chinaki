import Image from "next/image";

/**
 * CHINAKI IDENTITY — the client's own artwork, placed, not redrawn.
 *
 * This file used to redraw the mark as SVG paths. It was close but it
 * was not the logo: the real C is a crescent that tapers to a point at
 * its top terminal, the drawn one was a stroked arc of constant width
 * with a round cap, and the i sat in the wrong place. At nav size the
 * difference read as a different company. Approximating a client's
 * mark is not a saving, so the approximation is gone.
 *
 * The source is a 1254px square PNG with a flat off-white ground baked
 * in — which would have shown as a white box on every navy masthead.
 * `scripts/` is not where this lives; the extraction was a one-off:
 * key the ground out by luminance distance (feathered between 6 and 30
 * so the anti-aliased edges survive), then crop three assets — the
 * monogram, the CHINAKI wordmark, and the full stacked lockup.
 *
 * Each asset ships twice. The `-light` set has the navy ink restruck
 * in cream (`b > r + 15` catches navy and never catches the gold) so
 * the mark holds on the navy bands without a second design and without
 * the gold ever being touched. Gold is 6.6:1 on navy-deep and 4.3:1 on
 * paper, which is why gold is never asked to carry text on paper.
 *
 * NOTHING here is ever scaled non-uniformly. Every usage sets one
 * dimension and lets `next/image` derive the other from the intrinsic
 * size below.
 */

type Tone = "brand" | "gold" | "navy" | "current";

/** Intrinsic pixel sizes of the exported assets. */
const ASSET = {
  mark: { w: 512, h: 585 },
  wordmark: { w: 900, h: 125 },
  lockup: { w: 1000, h: 881 },
} as const;

/** `gold` is the restrike for navy grounds; everything else is the
    original navy-and-gold artwork. */
const isOnDark = (tone: Tone) => tone === "gold";

function src(asset: keyof typeof ASSET, tone: Tone) {
  return `/brand/${asset}${isOnDark(tone) ? "-light" : ""}.png`;
}

/**
 * The monogram alone. `size` is the HEIGHT — the mark is taller than
 * it is wide, and sizing by height is what keeps it optically level
 * with a line of type beside it.
 */
export function Mark({
  size = 40,
  tone = "brand",
  title,
  className,
  priority = false,
}: {
  size?: number;
  tone?: Tone;
  title?: string;
  className?: string;
  priority?: boolean;
}) {
  const { w, h } = ASSET.mark;
  return (
    <Image
      src={src("mark", tone)}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={w}
      height={h}
      priority={priority}
      className={className}
      style={{ height: size, width: "auto", flex: "none" }}
      sizes={`${Math.round((size * w) / h) * 2}px`}
    />
  );
}

/** CHINAKI in the client's own letterforms. Sized by height. */
export function Wordmark({
  size = 17,
  tone = "brand",
  priority = false,
}: {
  size?: number;
  tone?: Tone;
  priority?: boolean;
}) {
  const { w, h } = ASSET.wordmark;
  return (
    <Image
      src={src("wordmark", tone)}
      alt=""
      aria-hidden="true"
      width={w}
      height={h}
      priority={priority}
      style={{ height: size, width: "auto", flex: "none" }}
      sizes={`${Math.round((size * w) / h) * 2}px`}
    />
  );
}

/**
 * The full stacked lockup — monogram, wordmark, rule, tagline — exactly
 * as the client drew it. Sized by WIDTH here, because that is the
 * dimension a stacked lockup is fitted to. Use it where the brand gets
 * to sign off: the footer, the promise plate. Not in the nav, where
 * the tagline would be four pixels tall.
 */
export function Lockup({
  width = 220,
  tone = "brand",
  className,
}: {
  width?: number;
  tone?: Tone;
  className?: string;
}) {
  const { w, h } = ASSET.lockup;
  return (
    <Image
      src={src("lockup", tone)}
      alt="Chinaki — digital services, trusted solutions"
      width={w}
      height={h}
      className={className}
      style={{ width, height: "auto" }}
      sizes={`${width * 2}px`}
    />
  );
}

/**
 * The horizontal lockup used in the header: monogram, then the
 * wordmark, then the tagline set in the site's own mono. The client's
 * lockup is stacked, so a horizontal arrangement has to be composed —
 * but it is composed from their own artwork at its own aspect ratio,
 * never from a squashed copy of the stacked version.
 *
 * The tagline is typeset rather than cropped from the PNG because at
 * 9px the drawn one turns to mud, and because it is real text that a
 * screen reader and a search engine can both read.
 */
export function Logo({
  size = 42,
  tone = "brand",
  showTagline = false,
  priority = false,
}: {
  /** Height of the monogram. Everything else is set from it. */
  size?: number;
  tone?: Tone;
  showTagline?: boolean;
  priority?: boolean;
}) {
  const onDark = isOnDark(tone);
  return (
    <span className="lockup">
      <Mark size={size} tone={tone} priority={priority} />
      <span className="lockup-text">
        <Wordmark size={size * 0.36} tone={tone} priority={priority} />
        {showTagline && (
          <span
            className="lockup-tag"
            style={{ color: onDark ? "#C6B994" : "var(--color-muga)" }}
          >
            Digital services. Trusted solutions.
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * The struck stamp on the acknowledgement slip.
 *
 * A plain gold circle with a tick reads as a clock or a coin — tested
 * and rejected. The scalloped rim is what makes a seal legible as a
 * seal, so it is drawn rather than faked in CSS.
 */
function scallopedPath(cx: number, cy: number, R: number, lobes: number) {
  const step = (Math.PI * 2) / lobes;
  /* Semicircular lobes: arc radius = half the chord between points. */
  const r = (R * Math.sin(step / 2)).toFixed(3);
  const at = (i: number) => {
    const a = i * step - Math.PI / 2;
    return `${(cx + R * Math.cos(a)).toFixed(2)} ${(cy + R * Math.sin(a)).toFixed(2)}`;
  };
  let d = `M ${at(0)}`;
  for (let i = 1; i <= lobes; i += 1) d += ` A ${r} ${r} 0 0 1 ${at(i)}`;
  return `${d} Z`;
}

export function Stamp({ size = 68 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <defs>
        <linearGradient id="ck-stamp" x1="14" y1="10" x2="66" y2="70">
          <stop offset="0" stopColor="#D9B673" />
          <stop offset="0.38" stopColor="#B38F45" />
          <stop offset="0.62" stopColor="#8A6A2E" />
          <stop offset="1" stopColor="#6A5020" />
        </linearGradient>
      </defs>

      {/* scalloped rim */}
      <path d={scallopedPath(40, 40, 30, 22)} fill="url(#ck-stamp)" />
      {/* engraved rules */}
      <circle cx="40" cy="40" r="26" stroke="#F6F4ED" strokeWidth="1.4" opacity="0.55" />
      <circle cx="40" cy="40" r="22" stroke="#2A1F08" strokeWidth="1" opacity="0.45" />
      {/* the mark, struck into the metal */}
      <path
        d="m29 41.5 7.5 7.5L52 31"
        stroke="#2A1F08"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m29 41.5 7.5 7.5L52 31"
        stroke="#F0DCAE"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        transform="translate(0 1.4)"
      />
    </svg>
  );
}

/** Kept for the favicon-scale contexts that used the old ring mark. */
export const Seal = Mark;
