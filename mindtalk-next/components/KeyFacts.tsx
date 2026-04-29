import type { ReactNode } from 'react'

interface KeyFactsProps {
  /** Optional override; defaults to "Key Facts" */
  title?: string
  /** Either pass children (e.g. a <ul>) or `items` for a quick array */
  children?: ReactNode
  items?: string[]
}

/**
 * Bordered callout for the "Key Facts" blocks at the top of each H2 section.
 * Used inline by the blog post page when rendering markdown — pre-extracted
 * Key Facts bullet groups are wrapped in this component for a clear visual
 * cue that these are sourced citations / stats.
 */
export default function KeyFacts({ title = 'Key Facts', children, items }: KeyFactsProps) {
  return (
    <aside
      role="note"
      aria-label={title}
      className="my-6 rounded-xl border-l-4 border-[#E8521A] bg-[#FDF8F4] p-5 sm:p-6"
    >
      <div className="text-xs font-semibold uppercase tracking-wide text-[#E8521A] mb-2">
        {title}
      </div>
      {items
        ? (
          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
            {items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )
        : <div className="text-sm text-gray-700 leading-relaxed [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>
      }
    </aside>
  )
}
