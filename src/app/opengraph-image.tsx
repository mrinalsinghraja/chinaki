import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card is the masthead: navy plate, the mark struck in gold,
 * the wordmark letterspaced. Built with the OG runtime so there is no
 * image asset to re-cut when the brand changes.
 *
 * Satori gotcha: a div with more than one child needs an explicit
 * display. Template literals keep interpolated text a single string.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(150deg, #1E3A78 0%, #16295C 45%, #0E1B3E 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="78" height="78" viewBox="12 14 96 92" fill="none">
            <path
              d="M 76.06 25.56 A 38 38 0 1 0 80.13 91.99"
              stroke="#F2E6CB"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M 26.62 73.49 L 23.80 79.25 A 41 41 0 0 0 96.20 79.25 L 88.19 70.26 A 30 30 0 0 1 33.51 74.08 Z"
              fill="#D9AC58"
            />
            <circle cx="91" cy="29" r="9.5" fill="#D9AC58" />
            <rect x="82.5" y="46" width="11" height="30" rx="2" fill="#D9AC58" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ fontSize: 40, letterSpacing: 9, color: "#F4F1E7" }}>
              CHINAKI
            </div>
            <div style={{ fontSize: 19, letterSpacing: 5, color: "#E0BC72" }}>
              {`${site.locality.toUpperCase()} · ${site.region.toUpperCase()}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#F4F1E7",
            }}
          >
            Digital services made simple.
          </div>
          <div style={{ fontSize: 30, color: "#C3CCDF", maxWidth: 900 }}>
            {`${site.longTagline}.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2E4886",
            paddingTop: 28,
            fontSize: 24,
            color: "#E0BC72",
            letterSpacing: 2,
          }}
        >
          <div>{`WhatsApp ${site.phone}`}</div>
          <div>
            {`${site.hours.days} · ${site.hours.open}–${site.hours.close}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
