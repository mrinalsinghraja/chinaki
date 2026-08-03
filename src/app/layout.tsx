import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppDock } from "@/components/WhatsAppDock";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

/* Newsreader carries the voice — an editorial serif with real
   optical sizing, so headlines tighten as they grow. */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

/* Instrument Sans reads the body: slightly narrow, low-drama,
   holds up at 15px on a mid-range Android. */
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-instrument",
});

/* DM Mono is the machine voice — reference numbers, field labels,
   anything that would come out of a printer. */
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "digital service centre Nagaon",
    "CSC Nagaon",
    "GST registration Nagaon",
    "income tax return Nagaon",
    "PAN card Nagaon Assam",
    "trade licence Nagaon",
    "Udyam registration Assam",
    "NEET JEE form filling Nagaon",
    "scholarship application Assam",
    "EPF ESIC Nagaon",
    "e-Governance services Assam",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business services",
};

export const viewport: Viewport = {
  /* Every route opens on the navy masthead, so the browser chrome
     should match what is actually at the top of the page. */
  themeColor: "#16295c",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/* LocalBusiness is the schema that matters for a service centre —
   it is what feeds the map pack and the "open now" answer. */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.name,
  alternateName: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phoneE164,
  email: site.email,
  priceRange: "₹₹",
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.locality,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: site.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: site.hours.schemaOpens,
      closes: site.hours.schemaCloses,
    },
  ],
  areaServed: [
    { "@type": "City", name: "Nagaon" },
    { "@type": "State", name: "Assam" },
  ],
  knowsLanguage: ["en", "as", "hi"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${newsreader.variable} ${instrument.variable} ${dmMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppDock />
        <Reveal />
      </body>
    </html>
  );
}
