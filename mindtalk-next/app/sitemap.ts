import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cadabamsmindtalk.com'
  const now = new Date()

  const corePages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/anxiety`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/depression`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/relationships`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/burnout`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/app`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/features/doctor-rhea`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/features/journeys`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/features/self-care`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/features/therapy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/features/progress`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...corePages, ...blogPosts]
}
