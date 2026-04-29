import Link from 'next/link'
import type { Metadata } from 'next'
import MinimalNav from '@/components/layout/MinimalNav'
import Footer from '@/components/layout/Footer'
import { getAllPosts, excerpt, readTimeMinutes, formatDate } from '@/lib/blog'
import { organizationSchema } from '@/lib/structured-data'

const SITE_URL = 'https://cadabamsmindtalk.com'

export const metadata: Metadata = {
  title: 'MindTalk Blog | Mental Health & CBT Guides',
  description:
    'Evidence-based articles on anxiety, depression, burnout, and CBT — written and reviewed by the Cadabams Mental Health Team.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'MindTalk Blog | Mental Health & CBT Guides',
    description:
      'Evidence-based articles on anxiety, depression, burnout, and CBT — written and reviewed by the Cadabams Mental Health Team.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

const clusterAccent: Record<string, string> = {
  'Anxiety Recovery': 'bg-blue-50 text-blue-700',
  'Depression Recovery': 'bg-rose-50 text-rose-700',
  'CBT Education': 'bg-emerald-50 text-emerald-700',
  'Burnout Recovery': 'bg-amber-50 text-amber-700',
  'Relationship Recovery': 'bg-violet-50 text-violet-700',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MinimalNav />
      <main className="min-h-screen bg-white">
        <section className="bg-[#FDF8F4] py-14 px-4 sm:px-6 border-b border-orange-100">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              MindTalk Blog
            </h1>
            <p className="text-gray-600 text-lg">
              Evidence-based guides on anxiety, depression, burnout, and CBT — written by the
              MindTalk Clinical Team and reviewed by Cadabams mental health professionals.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map(post => {
              const accent = clusterAccent[post.cluster] ?? 'bg-orange-50 text-[#E8521A]'
              return (
                <article
                  key={post.slug}
                  className="rounded-2xl border border-gray-100 hover:border-[#E8521A]/40 hover:shadow-md transition-all bg-white p-6 flex flex-col"
                >
                  <span
                    className={`inline-flex self-start items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 ${accent}`}
                  >
                    {post.cluster}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#E8521A]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {excerpt(post.content)}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-xs text-gray-400">
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    <span aria-hidden>·</span>
                    <span>{readTimeMinutes(post.content)} min read</span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
