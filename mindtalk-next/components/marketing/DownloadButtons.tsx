interface DownloadButtonsProps {
  layout?: 'row' | 'column'
  theme?: 'dark' | 'light'
  /** Override the primary CTA label */
  primaryLabel?: string
  /** Override the secondary CTA label */
  secondaryLabel?: string
  className?: string
}

export const DOWNLOAD_URL = 'https://link-to.app/TMoa8H6NOL'
export const WEB_APP_URL = 'https://consult.cadabams.com'

/**
 * The two MindTalk app CTAs as a reusable pair. Always points at the onelink
 * (auto-routes to App Store / Play Store) and the web app on Cadabams.
 *
 * theme="dark" — light buttons on a dark background (hero, dark CTA blocks).
 * theme="light" — gradient primary + outline secondary on a light background.
 */
export default function DownloadButtons({
  layout = 'row',
  theme = 'light',
  primaryLabel = 'Download Free',
  secondaryLabel = 'Try on Web',
  className = '',
}: DownloadButtonsProps) {
  const wrapper =
    layout === 'row'
      ? 'flex flex-col sm:flex-row gap-3'
      : 'flex flex-col gap-3 w-full max-w-xs'

  const primaryBase =
    'inline-flex items-center justify-center rounded-full font-semibold h-14 px-7 text-base transition-all hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(249,115,22,0.28)]'
  const primaryTheme =
    'text-white bg-gradient-to-r from-[#F77268] to-[#F97316]'

  const secondaryBase =
    'inline-flex items-center justify-center rounded-full font-semibold h-14 px-7 text-base transition-all'
  const secondaryTheme =
    theme === 'dark'
      ? 'text-white border-2 border-white/20 hover:border-white/40 bg-white/0 hover:bg-white/5'
      : 'text-[#0E1726] border-2 border-[#0E1726]/15 hover:border-[#F97316]/50 bg-white'

  const arrow = ' →'

  return (
    <div className={`${wrapper} ${className}`}>
      <a
        href={DOWNLOAD_URL}
        className={`${primaryBase} ${primaryTheme}`}
        aria-label="Download MindTalk app — free"
      >
        {primaryLabel}{arrow}
      </a>
      <a
        href={WEB_APP_URL}
        className={`${secondaryBase} ${secondaryTheme}`}
        aria-label="Try MindTalk on web"
      >
        {secondaryLabel}
      </a>
    </div>
  )
}
