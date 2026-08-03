/**
 * CHINAKI IDENTITY
 *
 * The mark is the client's own: a navy crescent C cradling a gold i,
 * closed underneath by a gold swash that completes the ring. Two
 * colours saying two things in order — navy is the process (the
 * ledger, the passport cover, the departmental letterhead), gold is
 * the completion (the seal pressed at the end).
 *
 * It is drawn rather than placed as an image so it stays crisp at any
 * size, weighs nothing, and can be restruck in gold for navy grounds
 * without shipping a second asset.
 *
 * Geometry note: the C is a stroked arc (round caps read cleanly at
 * 28px in the nav, where a tapered terminal would just mud up), while
 * the swash is a filled path so its left end can come to a real point
 * and its right end can thicken into the stem of the i.
 */

type Tone = "brand" | "gold" | "navy" | "current";

/** Ink pairs per ground. `gold` is the version struck on navy. */
const tones: Record<Tone, { c: string; i: string }> = {
  brand: { c: "url(#ck-navy-g)", i: "url(#ck-gold-g)" },
  gold: { c: "#E0BC72", i: "#F3DDAE" },
  navy: { c: "#16295C", i: "#16295C" },
  current: { c: "currentColor", i: "currentColor" },
};

let uid = 0;

export function Mark({
  size = 40,
  tone = "brand",
  title,
}: {
  size?: number;
  tone?: Tone;
  title?: string;
}) {
  /* Gradient ids must be unique per instance or a second copy on the
     page inherits the first one's stops after hydration. */
  const id = `ck${(uid += 1)}`;
  const ink = tone === "brand" ? tones.brand : tones[tone];
  const c = ink.c.replace("ck-navy-g", `${id}-navy`);
  const i = ink.i.replace("ck-gold-g", `${id}-gold`);

  return (
    <svg
      width={size}
      height={size}
      viewBox="12 14 96 92"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ flex: "none", overflow: "visible" }}
    >
      {tone === "brand" && (
        <defs>
          <linearGradient id={`${id}-navy`} x1="20" y1="20" x2="96" y2="100">
            <stop offset="0" stopColor="#1E3A78" />
            <stop offset="0.55" stopColor="#16295C" />
            <stop offset="1" stopColor="#0E1B3E" />
          </linearGradient>
          <linearGradient id={`${id}-gold`} x1="70" y1="22" x2="100" y2="102">
            <stop offset="0" stopColor="#E9C983" />
            <stop offset="0.42" stopColor="#C89B4A" />
            <stop offset="1" stopColor="#9A7430" />
          </linearGradient>
        </defs>
      )}

      {/* the crescent C — opens to the right, where the i sits */}
      <path
        d="M 76.06 25.56 A 38 38 0 1 0 80.13 91.99"
        stroke={c}
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* the swash: points at the left, thickens into the stem right */}
      <path
        d="M 26.62 73.49 L 23.80 79.25 A 41 41 0 0 0 96.20 79.25
           L 88.19 70.26 A 30 30 0 0 1 33.51 74.08 Z"
        fill={i}
      />

      {/* the i */}
      <circle cx="91" cy="29" r="9.5" fill={i} />
      <rect x="82.5" y="46" width="11" height="30" rx="2" fill={i} />
    </svg>
  );
}

/**
 * The lockup. CHINAKI is set in letterspaced caps to match the
 * client's wordmark — title case would read as a different brand.
 */
export function Logo({
  size = 34,
  tone = "brand",
  showTagline = false,
}: {
  size?: number;
  tone?: Tone;
  showTagline?: boolean;
}) {
  const onDark = tone === "gold";
  return (
    <span className="lockup">
      <Mark size={size} tone={tone} />
      <span className="lockup-text">
        <span
          className="lockup-name"
          style={{
            fontSize: `${size * 0.5}px`,
            color: onDark ? "#F6F1E4" : "var(--color-navy)",
          }}
        >
          Chinaki
        </span>
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
