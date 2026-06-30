import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://tvashtra.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
