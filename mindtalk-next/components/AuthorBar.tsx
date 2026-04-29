import { formatDate } from '@/lib/blog'

interface AuthorBarProps {
  datePublished: string
  readTime: number
  reviewer?: string
}

export default function AuthorBar({ datePublished, readTime, reviewer }: AuthorBarProps) {
  const reviewerLine = reviewer ?? 'Reviewed by a Cadabams Mental Health Professional'
  return (
    <div className="text-sm text-gray-500 border-y border-gray-100 py-3 mb-8 flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="font-medium text-gray-700">By MindTalk Clinical Team</span>
      <span aria-hidden>·</span>
      <span>{reviewerLine}</span>
      <span aria-hidden>·</span>
      <time dateTime={datePublished}>{formatDate(datePublished)}</time>
      <span aria-hidden>·</span>
      <span>{readTime} min read</span>
    </div>
  )
}
