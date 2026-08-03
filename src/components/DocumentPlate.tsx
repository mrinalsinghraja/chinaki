/**
 * DOCUMENT PLATES
 *
 * The site had ornament but no depiction. Someone arriving for a PAN
 * card never saw a PAN card. For this audience — a counter in Nagaon,
 * plenty of visitors reading English as a second language and nervous
 * about paperwork — a picture of the actual document is functional,
 * not decorative. It lets a person recognise what they need before
 * reading a word.
 *
 * So each family is drawn as the object you walk out holding, specific
 * enough to be identified on sight: a PAN card by its photo box and
 * signature strip, an admit card by its barcode and tear line, a
 * passbook by its centre fold and ledger grid.
 *
 * Body copy inside the documents is drawn as RULED LINES, never as
 * fake words. Lorem-shaped glyphs read as a mistake at any size, and
 * real text would need translating and would go stale. Marks are drawn
 * only where they carry recognition.
 *
 * Hairline register matches the guilloche in Ornament.tsx, so these
 * read as one family with the existing engraving rather than a
 * bolted-on illustration set. Gold is reserved strictly for seals.
 *
 * Every coordinate below is passed as a NUMBER, never a string. `y={30}`
 * and `y="30"` look identical in JSX but the second turns `y + i * gap`
 * into string concatenation — "30" + 7 = "307" — and silently throws the
 * whole block off-canvas with no error anywhere.
 */

const SHEET = "#FFFEFA";
const BACK = "#E6DFCE";
const INK = "#16295C";
const RULE = "#AFB7CA";
const GOLD = "#C89B4A";
const GOLD_DEEP = "#9A7430";

type PlateProps = {
  size?: number;
  className?: string;
};

/** Ruled lines standing in for body copy. Widths vary so a block reads
    as text rather than as a chart. */
function Rules({
  x,
  y,
  widths,
  gap = 7,
  stroke = RULE,
  width = 2.2,
}: {
  x: number;
  y: number;
  widths: number[];
  gap?: number;
  stroke?: string;
  width?: number;
}) {
  return (
    <>
      {widths.map((w, i) => (
        <line
          key={i}
          x1={x}
          y1={y + i * gap}
          x2={x + w}
          y2={y + i * gap}
          stroke={stroke}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

/** The struck seal, small enough to sit on a document. */
function Seal({ cx, cy, r = 13 }: { cx: number; cy: number; r?: number }) {
  const lobes = 18;
  const step = (Math.PI * 2) / lobes;
  const lr = (r * Math.sin(step / 2)).toFixed(2);
  const at = (i: number) => {
    const a = i * step - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  };
  let d = `M ${at(0)}`;
  for (let i = 1; i <= lobes; i += 1) d += ` A ${lr} ${lr} 0 0 1 ${at(i)}`;
  return (
    <g>
      <path d={`${d} Z`} fill={GOLD} opacity="0.92" />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.72}
        fill="none"
        stroke={GOLD_DEEP}
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d={`M${cx - r * 0.34} ${cy + r * 0.04} l${r * 0.26} ${r * 0.28} l${r * 0.48} -${r * 0.52}`}
        fill="none"
        stroke={GOLD_DEEP}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** A hand-signed line — the mark a person leaves, not a font. */
function Signature({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      d={`M${x} ${y} c ${4 * s} -${7 * s} ${8 * s} ${5 * s} ${12 * s} -${2 * s} c ${3 * s} -${5 * s} ${7 * s} ${4 * s} ${11 * s} -${1 * s} c ${3 * s} -${3 * s} ${6 * s} ${2 * s} ${9 * s} ${1 * s}`}
      fill="none"
      stroke={INK}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
  );
}

/** Deterministic bar widths — a real barcode is irregular, and
    Math.random here would break hydration. */
const BARS = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 2];

function Barcode({ x, y, h = 14 }: { x: number; y: number; h?: number }) {
  let cx = x;
  const out: React.JSX.Element[] = [];
  BARS.forEach((w, i) => {
    if (i % 2 === 0) {
      out.push(
        <rect key={i} x={cx} y={y} width={w} height={h} fill={INK} opacity="0.78" />,
      );
    }
    cx += w + 1.5;
  });
  return <g>{out}</g>;
}

/** The shared canvas. Every plate is drawn inside 200×168 with a margin
    all round, so rotated sheets can spill without being clipped and any
    plate is a drop-in replacement for any other. */
function Plate({
  size = 240,
  className,
  children,
  label,
}: PlateProps & { children: React.ReactNode; label: string }) {
  return (
    <svg
      viewBox="-10 -8 220 186"
      width={size}
      height={(size * 186) / 220}
      fill="none"
      role="img"
      aria-label={label}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {children}
    </svg>
  );
}

/* ============================================================
   BUS — the GST certificate
   Recognised by: portrait sheet, emblem, a boxed registration
   number strip, and a struck seal over a signature.
   ============================================================ */
export function PlateBusiness(p: PlateProps) {
  return (
    <Plate {...p} label="A GST registration certificate with an official seal">
      {/* the trade licence, behind */}
      <g transform="rotate(-6 68 92)">
        <rect x={22} y={30} width={88} height={118} rx={2} fill={BACK} />
      </g>
      {/* the certificate */}
      <rect
        x={54}
        y={12}
        width={112}
        height={146}
        rx={2}
        fill={SHEET}
        stroke={INK}
        strokeWidth={1.2}
      />
      <rect
        x={60}
        y={18}
        width={100}
        height={134}
        rx={1}
        fill="none"
        stroke={INK}
        strokeWidth={0.7}
        opacity={0.32}
      />
      {/* Emblem. A ringed cross read as a no-entry sign; a shield reads
          as officialdom in every country that issues certificates. */}
      <path
        d="M110 28l9.5 3.8v7.4c0 6.4-4 10.2-9.5 12.2-5.5-2-9.5-5.8-9.5-12.2v-7.4Z"
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="m106 39.6 2.8 2.8 5.6-5.8" stroke={INK} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* title */}
      <Rules x={82} y={56} widths={[56]} width={3.4} stroke={INK} />
      <Rules x={90} y={64} widths={[40]} width={1.8} />
      {/* the registration-number box */}
      <rect
        x={70}
        y={76}
        width={80}
        height={17}
        rx={1.5}
        fill="none"
        stroke={INK}
        strokeWidth={1}
        opacity={0.55}
      />
      <Rules x={77} y={85} widths={[66]} width={2.8} stroke={INK} />
      {/* body */}
      <Rules x={70} y={106} widths={[74, 64, 72, 46]} gap={9} />
      {/* seal over signature */}
      <Signature x={72} y={142} s={0.9} />
      <Seal cx={138} cy={134} r={15} />
    </Plate>
  );
}

/* ============================================================
   TAX — the PAN card, over an ITR acknowledgement
   Recognised by: a landscape card with the photo box left and a
   signature strip beside it.
   ============================================================ */
export function PlateTax(p: PlateProps) {
  return (
    <Plate {...p} label="A PAN card resting on an income tax return acknowledgement">
      {/* the acknowledgement sheet */}
      <g transform="rotate(-5 100 84)">
        <rect
          x={38}
          y={10}
          width={120}
          height={144}
          rx={2}
          fill={SHEET}
          stroke={INK}
          strokeWidth={1.1}
        />
        <Rules x={50} y={28} widths={[66]} width={3.2} stroke={INK} />
        <Rules x={50} y={42} widths={[96, 82, 92]} gap={8} />
        <Barcode x={50} y={68} h={13} />
        <Rules x={50} y={94} widths={[90, 74]} gap={8} />
      </g>
      {/* the PAN card, laid across it */}
      <g transform="rotate(8 106 124)">
        <rect
          x={52}
          y={96}
          width={108}
          height={62}
          rx={4}
          fill={SHEET}
          stroke={INK}
          strokeWidth={1.3}
        />
        {/* header band */}
        <path d="M52 100a4 4 0 0 1 4-4h100a4 4 0 0 1 4 4v8H52Z" fill={INK} opacity={0.9} />
        {/* photo box */}
        <rect
          x={60}
          y={117}
          width={28}
          height={33}
          rx={1.5}
          fill="none"
          stroke={INK}
          strokeWidth={1.1}
        />
        <circle cx={74} cy={128} r={5} fill={INK} opacity={0.32} />
        <path d="M64 148c1.6-7 5.6-10 10-10s8.4 3 10 10Z" fill={INK} opacity={0.32} />
        {/* name lines */}
        <Rules x={96} y={120} widths={[54, 46, 34]} gap={9} />
        {/* signature strip */}
        <line x1={96} y1={151} x2={152} y2={151} stroke={INK} strokeWidth={0.9} opacity={0.45} />
        <Signature x={98} y={148} s={0.7} />
      </g>
    </Plate>
  );
}

/* ============================================================
   GOV — the departmental certificate
   Recognised by: the engraved double border and the ribboned seal
   every issued certificate carries.
   ============================================================ */
export function PlateGovernment(p: PlateProps) {
  return (
    <Plate {...p} label="A government certificate with an engraved border and a ribboned seal">
      <rect
        x={32}
        y={8}
        width={136}
        height={152}
        rx={2}
        fill={SHEET}
        stroke={INK}
        strokeWidth={1.2}
      />
      <rect
        x={39}
        y={15}
        width={122}
        height={138}
        fill="none"
        stroke={INK}
        strokeWidth={0.9}
        opacity={0.45}
      />
      <rect
        x={43}
        y={19}
        width={114}
        height={130}
        fill="none"
        stroke={GOLD}
        strokeWidth={0.9}
        opacity={0.6}
      />
      {/* corner ticks */}
      {(
        [
          [43, 19, 1, 1],
          [157, 19, -1, 1],
          [43, 149, 1, -1],
          [157, 149, -1, -1],
        ] as const
      ).map(([x, y, sx, sy], i) => (
        <path
          key={i}
          d={`M${x} ${y + 9 * sy} L${x} ${y} L${x + 9 * sx} ${y}`}
          stroke={GOLD}
          strokeWidth={1.8}
          fill="none"
        />
      ))}
      {/* emblem */}
      <path
        d="M100 30l11 4.4v8.6c0 7.4-4.6 11.8-11 14.2-6.4-2.4-11-6.8-11-14.2v-8.6Z"
        fill="none"
        stroke={INK}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      {/* A star, not a cross — a cross inside a shield reads as a
          medical mark, which is the wrong department entirely. */}
      <path
        d="m100 37 1.9 4.1 4.4.6-3.2 3.1.8 4.4-3.9-2.1-3.9 2.1.8-4.4-3.2-3.1 4.4-.6Z"
        fill={INK}
        opacity={0.6}
      />
      <Rules x={68} y={64} widths={[64]} width={3.4} stroke={INK} />
      <Rules x={58} y={84} widths={[84, 76, 82, 58]} gap={9} />
      {/* seal with ribbon */}
      <path d="M126 134v22l8-7 8 7v-22Z" fill={GOLD} opacity={0.42} />
      <Seal cx={134} cy={128} r={15} />
      <Signature x={54} y={142} s={0.85} />
    </Plate>
  );
}

/* ============================================================
   EMP — the EPF passbook
   Recognised by: a landscape booklet with a centre fold and a ruled
   ledger of contributions.
   ============================================================ */
export function PlateEmployee(p: PlateProps) {
  return (
    <Plate {...p} label="An EPF passbook open at a page of contribution entries">
      {/* covers, splayed */}
      <path d="M16 44 100 28v116L16 156Z" fill={BACK} />
      <path d="M184 44 100 28v116l84 12Z" fill={BACK} opacity={0.72} />
      {/* pages */}
      <path
        d="M23 49 100 35v104L23 150Z"
        fill={SHEET}
        stroke={INK}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <path
        d="M177 49 100 35v104l77 11Z"
        fill={SHEET}
        stroke={INK}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      {/* the fold */}
      <line x1={100} y1={35} x2={100} y2={139} stroke={INK} strokeWidth={1.1} opacity={0.5} />
      {/* stitching */}
      {[46, 61, 76, 91, 106, 121].map((y) => (
        <line key={y} x1={100} y1={y} x2={100} y2={y + 7} stroke={INK} strokeWidth={2.2} opacity={0.32} />
      ))}
      {/* A header band on the left page, so the booklet reads as a
          passbook and not as any open book. */}
      <path d="M23 49 100 35v12l-77 13Z" fill={INK} opacity={0.88} />
      <Rules x={33} y={68} widths={[46]} width={3} stroke={INK} />
      {[76, 90, 104, 118].map((y, i) => (
        <g key={y}>
          <line x1={33} y1={y} x2={92} y2={y - 1 - i} stroke={RULE} strokeWidth={1} />
          <Rules x={33} y={y - 6} widths={[26]} width={2.2} />
          <Rules x={72} y={y - 6} widths={[17]} width={2.2} stroke={INK} />
        </g>
      ))}
      {/* right page */}
      <Rules x={110} y={60} widths={[40]} width={3} stroke={INK} />
      {[76, 90, 104, 118].map((y, i) => (
        <g key={y}>
          <line x1={108} y1={y + 1 + i} x2={168} y2={y + 3 + i * 2} stroke={RULE} strokeWidth={1} />
          <Rules x={108} y={y - 5} widths={[28]} width={2.2} />
        </g>
      ))}
    </Plate>
  );
}

/* ============================================================
   STU — the admit card
   Recognised by: the photo box top-right, the barcode, and the
   perforated strip a candidate tears off and keeps.
   ============================================================ */
export function PlateStudent(p: PlateProps) {
  return (
    <Plate {...p} label="An examination admit card with a photograph box and a barcode">
      <g transform="rotate(-4 100 84)">
        <rect
          x={40}
          y={10}
          width={120}
          height={148}
          rx={2}
          fill={SHEET}
          stroke={INK}
          strokeWidth={1.2}
        />
        {/* header band */}
        <path d="M40 12a2 2 0 0 1 2-2h116a2 2 0 0 1 2 2v16H40Z" fill={INK} opacity={0.9} />
        {/* photo box */}
        <rect
          x={118}
          y={40}
          width={34}
          height={40}
          rx={1.5}
          fill="none"
          stroke={INK}
          strokeWidth={1.1}
        />
        <circle cx={135} cy={54} r={6} fill={INK} opacity={0.28} />
        <path d="M123 78c2-8.5 6.4-12 12-12s10 3.5 12 12Z" fill={INK} opacity={0.28} />
        {/* candidate fields */}
        <Rules x={50} y={42} widths={[22]} width={1.8} />
        <Rules x={50} y={51} widths={[54]} width={3} stroke={INK} />
        <Rules x={50} y={64} widths={[18]} width={1.8} />
        <Rules x={50} y={73} widths={[46]} width={3} stroke={INK} />
        {/* the roll-number box */}
        <rect
          x={50}
          y={92}
          width={102}
          height={16}
          rx={1.5}
          fill="none"
          stroke={INK}
          strokeWidth={1}
          opacity={0.5}
        />
        {[67, 84, 101, 118, 135].map((x) => (
          <line key={x} x1={x} y1={92} x2={x} y2={108} stroke={INK} strokeWidth={0.7} opacity={0.32} />
        ))}
        {/* the perforation a candidate tears along */}
        <line
          x1={44}
          y1={120}
          x2={156}
          y2={120}
          stroke={INK}
          strokeWidth={1}
          strokeDasharray="3 3.5"
          opacity={0.45}
        />
        <Barcode x={50} y={128} h={17} />
        <Rules x={112} y={134} widths={[40, 30]} gap={8} />
      </g>
    </Plate>
  );
}

/* ============================================================
   DOC — the counter stack
   Recognised by: offset copies, a stapled corner and the curled leaf
   of a fresh photocopy.
   ============================================================ */
export function PlateDocumentation(p: PlateProps) {
  return (
    <Plate {...p} label="A stapled stack of photocopied documents">
      <g transform="rotate(-8 100 90)">
        <rect x={44} y={28} width={112} height={132} rx={2} fill={BACK} />
      </g>
      <g transform="rotate(-4 100 88)">
        <rect
          x={48}
          y={22}
          width={112}
          height={132}
          rx={2}
          fill={SHEET}
          stroke={INK}
          strokeWidth={1}
          opacity={0.8}
        />
      </g>
      {/* the top sheet, with its corner turned */}
      <path
        d="M52 14h104a2 2 0 0 1 2 2v112l-24 20H52a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2Z"
        fill={SHEET}
        stroke={INK}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <path
        d="M158 128l-24 20v-18a2 2 0 0 1 2-2Z"
        fill={BACK}
        stroke={INK}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      {/* staple */}
      <path d="M58 22h12v4H58Z" fill={INK} opacity={0.6} />
      <path d="M58 22v7M70 22v7" stroke={INK} strokeWidth={1.8} opacity={0.38} />
      {/* content */}
      <Rules x={64} y={44} widths={[50]} width={3.2} stroke={INK} />
      <Rules x={64} y={60} widths={[82, 74, 86, 68, 80]} gap={9} />
      <Rules x={64} y={116} widths={[56, 42]} gap={9} />
    </Plate>
  );
}

/** Keyed by category slug, so a page looks one up the same way it looks
    up its icon. */
export const categoryPlates: Record<
  string,
  (p: PlateProps) => React.JSX.Element
> = {
  "business-services": PlateBusiness,
  "tax-services": PlateTax,
  "government-services": PlateGovernment,
  "employee-services": PlateEmployee,
  "student-services": PlateStudent,
  "documentation-services": PlateDocumentation,
};
