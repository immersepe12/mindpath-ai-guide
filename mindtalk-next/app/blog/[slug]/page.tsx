import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import AuthorBar from '@/components/AuthorBar'
import FAQAccordion from '@/components/FAQAccordion'
import BlogCTA from '@/components/BlogCTA'
import KeyFacts from '@/components/KeyFacts'
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  readTimeMinutes,
  formatDate,
} from '@/lib/blog'

const SITE_URL = 'https://cadabamsmindtalk.com'

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Not found' }
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.datePublished,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  }
}

/**
 * Splits the article body at "Frequently Asked Questions" so the FAQs can
 * render via FAQAccordion (with proper schema) instead of plain markdown.
 * Also splits Key Facts blocks into KeyFacts callouts.
 */
function splitFAQ(content: string): string {
  const faqHeading = /\n##\s+Frequently Asked Questions[\s\S]*$/i
  return content.replace(faqHeading, '').trimEnd()
}

/**
 * Detects "**Key Facts:**" + bulleted list blocks and replaces them with a
 * sentinel marker. The marker is later rendered as a <KeyFacts> callout.
 */
const KEY_FACTS_MARKER = '<!--KEYFACTS-->'

function extractKeyFacts(content: string): { content: string; keyFacts: string[][] } {
  const keyFacts: string[][] = []
  // Match `**Key Facts:**\n- a\n- b\n- c\n` (followed by blank line / end)
  const rx = /\*\*Key Facts:\*\*\n((?:- .+\n)+)/g
  const replaced = content.replace(rx, (_full, list) => {
    const items = list
      .trim()
      .split('\n')
      .map((line: string) => line.replace(/^-\s+/, '').trim())
      .filter(Boolean)
    keyFacts.push(items)
    return `${KEY_FACTS_MARKER}\n\n`
  })
  return { content: replaced, keyFacts }
}

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  const readTime = readTimeMinutes(post.content)
  const related = getRelatedPosts(post)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
    author: { '@type': 'Organization', name: 'MindTalk by Cadabams Group' },
    publisher: {
      '@type': 'Organization',
      name: 'Cadabams MindTalk',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    medicalAudience: 'Patient',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  const bodyWithoutFaq = splitFAQ(post.content)
  const { content: bodyWithMarkers, keyFacts } = extractKeyFacts(bodyWithoutFaq)
  // Split body on the marker so we can render <KeyFacts> between segments.
  const segments = bodyWithMarkers.split(KEY_FACTS_MARKER)
  // Pull the "> Quick answer:" callout from the very first segment so we can
  // render it as a styled AEO answer block at the top of the article.
  const quickAnswerMatch = segments[0]?.match(/>\s\*\*Quick answer:\*\*\s([\s\S]+?)\n\n/)
  const quickAnswer = quickAnswerMatch?.[1]?.trim()
  if (quickAnswer) {
    segments[0] = segments[0].replace(quickAnswerMatch![0], '')
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MinimalNav />
      <main className="min-h-screen bg-white pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
          <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-4">
            <Link href="/blog" className="hover:text-[#E8521A]">Blog</Link>
            <span className="mx-1.5" aria-hidden>/</span>
            <span className="text-gray-500">{post.cluster}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4 text-balance">
            {post.title}
          </h1>

          <AuthorBar
            datePublished={post.datePublished}
            readTime={readTime}
            reviewer={post.reviewer}
          />

          {quickAnswer && (
            <aside
              role="note"
              aria-label="Quick answer"
              className="mb-8 rounded-2xl border-l-4 border-[#E8521A] bg-[#FDF8F4] p-5 sm:p-6"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-[#E8521A] mb-2">
                Quick answer
              </div>
              <p className="text-gray-800 leading-relaxed">{quickAnswer}</p>
            </aside>
          )}

          <div className="prose prose-gray max-w-none prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-[#E8521A] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-table:text-sm">
            {segments.map((seg, i) => (
              <div key={i}>
                <ReactMarkdown>{seg}</ReactMarkdown>
                {keyFacts[i] && <KeyFacts items={keyFacts[i]} />}
              </div>
            ))}
          </div>

          <FAQAccordion items={post.faqItems} pageName={post.title} />

          <BlogCTA journeyName={post.ctaJourney} />

          {related.length > 0 && (
            <section className="mt-12 border-t border-gray-100 pt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Related articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block rounded-xl border border-gray-100 hover:border-[#E8521A]/40 hover:shadow-sm transition-all bg-white p-5"
                  >
                    <div className="text-xs text-gray-400 mb-1">{r.cluster}</div>
                    <div className="text-sm font-semibold text-gray-900 leading-snug">
                      {r.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {formatDate(r.datePublished)} · {readTimeMinutes(r.content)} min read
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
