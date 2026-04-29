interface FreeBadgeProps {
  /** Override label, e.g. "FREE FOREVER" */
  children?: string
  className?: string
  size?: 'sm' | 'md'
}

/**
 * Green pill badge used to mark every free feature on the marketing pages.
 * Do NOT use this on paid features — there is a separate visual treatment
 * for the coach-led programme.
 */
export default function FreeBadge({ children = 'FREE', className = '', size = 'sm' }: FreeBadgeProps) {
  const sz = size === 'md' ? 'text-xs px-3 py-1' : 'text-[11px] px-2.5 py-0.5'
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold tracking-wider bg-[#E6F4EA] text-[#1F8B4C] ${sz} ${className}`}
    >
      {children}
    </span>
  )
}
