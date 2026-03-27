import * as React from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'muted'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        variant === 'default' && 'bg-[#FDF8F4] text-[#E8521A] border border-[#E8521A]/20',
        variant === 'success' && 'bg-green-50 text-green-700 border border-green-200',
        variant === 'muted' && 'bg-gray-100 text-gray-600',
        className
      )}
      {...props}
    />
  )
}
