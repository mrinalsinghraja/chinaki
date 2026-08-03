/**
 * Single source of truth for everything a visitor might need to
 * contact or find Chinaki. Every phone number, address and hour
 * on the site reads from here.
 */

export const site = {
  name: "Chinaki",
  legalName: "Chinaki Digital Services",
  tagline: "Digital services. Trusted solutions.",
  longTagline:
    "Your Trusted Partner for Digital, Business & e-Governance Services",
  url: "https://chinaki.co.in",
  description:
    "Chinaki is a digital service centre in Nagaon, Assam. We help individuals, students, professionals and businesses complete government, business and tax services accurately and on time.",
  locality: "Nagaon",
  region: "Assam",
  postalCode: "782001",
  street: "BM Road, Near Government Boys Higher Secondary School",
  country: "IN",
  addressLines: [
    "BM Road",
    "Near Government Boys Higher Secondary School",
    "Nagaon, Assam – 782001",
  ],
  phone: "9706114332",
  phoneE164: "+919706114332",
  email: "chinaki.services@gmail.com",
  hours: {
    days: "Monday – Saturday",
    open: "9:30 AM",
    close: "8:00 PM",
    closed: "Sunday",
    schemaOpens: "09:30",
    schemaCloses: "20:00",
  },
  /* Nagaon town centre, BM Road */
  geo: { lat: 26.3464, lng: 92.6836 },
  mapEmbed:
    "https://www.google.com/maps?q=BM+Road,+Nagaon,+Assam+782001&hl=en&z=15&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=BM+Road+Nagaon+Assam+782001",
} as const;

/** Prefills WhatsApp so the visitor never has to open with "hello?". */
export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(
    message ??
      `Hello Chinaki, I would like help with a service. Please guide me.`,
  );
  return `https://wa.me/91${site.phone}?text=${text}`;
}
