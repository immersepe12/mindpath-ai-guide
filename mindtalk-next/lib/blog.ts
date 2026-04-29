// lib/blog.ts
// Blog types + content loader. Posts live as TypeScript objects in
// content/blog/*.ts so they're part of the bundle (no fs reads at request
// time, no markdown processing on the server). Source-of-truth for these
// objects is the marketing team's seo_content/*.md files.

export interface FAQItem {
  q: string
  a: string
}

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Full article body in Markdown — rendered with react-markdown */
  content: string
  primaryKeyword: string
  secondaryKeywords: string[]
  /** ISO date string e.g. "2026-05-01" */
  datePublished: string
  author: string
  reviewer: string
  /** Topic cluster for related-articles linking */
  cluster: string
  /** Which Journey product this article points to */
  ctaJourney: 'Anxiety' | 'Depression' | 'Burnout' | 'Relationship' | 'All'
  faqItems: FAQItem[]
}

import { post as anxietyPost } from '@/content/blog/how-to-deal-with-anxiety'
import { post as depressionPost } from '@/content/blog/how-to-recover-from-depression'
import { post as cbtPost } from '@/content/blog/what-is-cbt-therapy'

const ALL_POSTS: BlogPost[] = [anxietyPost, depressionPost, cbtPost]

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...ALL_POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  return ALL_POSTS.find(p => p.slug === slug) ?? null
}

/** Two related posts in the same cluster (or any 2 if none match). */
export function getRelatedPosts(post: BlogPost, limit = 2): BlogPost[] {
  const sameCluster = ALL_POSTS.filter(
    p => p.slug !== post.slug && p.cluster === post.cluster,
  )
  const others = ALL_POSTS.filter(
    p => p.slug !== post.slug && p.cluster !== post.cluster,
  )
  return [...sameCluster, ...others].slice(0, limit)
}

/** Rough reading time — 200 wpm baseline, content stripped of markdown noise. */
export function readTimeMinutes(content: string): number {
  const wordCount = content
    .replace(/```[\s\S]*?```/g, '')         // strip code blocks
    .replace(/[#>*_`\-|[\]()]/g, ' ')        // strip md punctuation
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(wordCount / 200))
}

/** First two sentences of the body, stripped of markdown, for index-card excerpts. */
export function excerpt(content: string, sentences = 2): string {
  // Drop the H1 line and any horizontal rule then take the first paragraph
  const body = content
    .replace(/^#\s.+$/m, '')
    .replace(/^---$/gm, '')
    .replace(/^>\s.*$/gm, '')               // drop blockquote callouts (Quick answer)
    .trim()
  const firstPara = body.split(/\n{2,}/).find(p => p.trim() && !p.startsWith('#'))
  if (!firstPara) return ''
  const cleaned = firstPara
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
  const parts = cleaned.match(/[^.!?]+[.!?]+/g) ?? [cleaned]
  return parts.slice(0, sentences).join(' ').trim()
}

/** Format YYYY-MM-DD as e.g. "May 1, 2026" — used in AuthorBar. */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}
