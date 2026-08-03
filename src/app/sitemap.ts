import type { MetadataRoute } from "next";
import { categories } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/why-chinaki`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/faqs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.9 },
    {
      url: `${site.url}/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const services: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${site.url}/services/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...core, ...services].map((entry) => ({
    ...entry,
    lastModified: now,
  }));
}
