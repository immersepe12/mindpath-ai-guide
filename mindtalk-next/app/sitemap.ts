import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cadabamsmindtalk.com'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/anxiety`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/depression`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/relationships`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/burnout`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
