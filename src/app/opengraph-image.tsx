import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card is the masthead: navy plate, the client's own mark
 * and wordmark restruck in cream, the promise underneath.
 *
 * The brand rasters are inlined as data URIs. Satori has no network and
 * no public-folder resolution, so an <img src="/brand/..."> silently
 * renders nothing — the file has to be read off disk at build time and
 * base64'd in.
 *
 * Satori gotcha: a div with more than one child needs an explicit
 * display. Template literals keep interpolated text a single string.
 */
async function inline(file: string) {
  const buf = await readFile(join(process.cwd(), "public", "brand", file));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export default async function Image() {
  const [mark, wordmark] = await Promise.all([
    inline("mark-light.png"),
    inline("wordmark-light.png"),
  ]);

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
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {/* Explicit width AND height on both, derived from the
              intrinsic sizes — Satori will happily stretch an image
              given only one. */}
          <img src={mark} width={80} height={91} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <img src={wordmark} width={331} height={46} alt="" />
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
