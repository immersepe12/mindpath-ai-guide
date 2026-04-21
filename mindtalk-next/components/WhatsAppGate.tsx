// components/WhatsAppGate.tsx
// Drop-in wrapper around any WhatsApp CTA. Intercepts the click to capture
// name + phone first (lead gate), then opens wa.me/... in a new tab.
// If we already know the visitor's phone (from URL params passed via
// knownPhone prop, or from sessionStorage set during a prior submission),
// the modal is skipped and WhatsApp opens immediately.
'use client'

import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
} from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { trackLeadSubmitted, trackWhatsAppClick } from '@/lib/analytics'

const WA_NUMBER     = '918197268789'
const PHONE_STORAGE = 'mindtalk_wa_phone'
const NAME_STORAGE  = 'mindtalk_wa_name'

interface Props {
  /** Mixpanel location label: 'hero' | 'nav' | 'floating' | 'quiz_result' | ... */
  location: string
  /** Vertical context — used in CRM + prefilled WA message */
  vertical?: string
  /** Override the default WhatsApp prefilled message */
  message?: string
  /** If we already know the phone/name (e.g. URL param after quiz submit), skip the modal */
  knownPhone?: string
  knownName?: string
  /** Single trigger element — its onClick is intercepted */
  children: ReactElement
}

export default function WhatsAppGate({
  location, vertical, message, knownPhone, knownName, children,
}: Props) {
  const [open,  setOpen]  = useState(false)
  const [name,  setName]  = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [busy,  setBusy]  = useState(false)

  function defaultMessage(n?: string): string {
    if (message) return message
    const namePart = n ? `, I'm ${n}` : ''
    if (vertical) return `Hi${namePart}. I'd like to talk about ${vertical}.`
    return `Hi${namePart}. I'd like to know more about MindTalk.`
  }

  function openWhatsApp(finalName?: string) {
    const text = encodeURIComponent(defaultMessage(finalName))
    const url  = `https://wa.me/${WA_NUMBER}?text=${text}`
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  function readKnown(): { name?: string; phone?: string } {
    let p = knownPhone
    let n = knownName
    if (typeof window !== 'undefined') {
      try {
        if (!p) p = sessionStorage.getItem(PHONE_STORAGE) ?? undefined
        if (!n) n = sessionStorage.getItem(NAME_STORAGE)  ?? undefined
      } catch {}
    }
    const digits = (p ?? '').replace(/\D/g, '')
    return {
      name:  n && n.trim() ? n.trim() : undefined,
      phone: digits.length === 10 ? digits : undefined,
    }
  }

  function handleTriggerClick(e: ReactMouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const known = readKnown()
    if (known.phone) {
      try { trackWhatsAppClick(location, vertical) } catch {}
      openWhatsApp(known.name)
      return
    }
    if (known.name) setName(known.name)
    setOpen(true)
  }

  async function handleSubmit() {
    setError('')
    const trimmedName = name.trim()
    const digits      = phone.replace(/\D/g, '')
    if (!trimmedName) {
      setError('Please enter your name.')
      return
    }
    if (digits.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }
    setBusy(true)

    try {
      sessionStorage.setItem(PHONE_STORAGE, digits)
      sessionStorage.setItem(NAME_STORAGE,  trimmedName)
    } catch {}

    let utms: Record<string, string> = {}
    try { utms = JSON.parse(localStorage.getItem('mindtalk_utms') || '{}') } catch {}

    // Freshsales + Fyno via /api/lead (keepalive so it survives tab switch)
    fetch('/api/lead', {
      method:    'POST',
      keepalive: true,
      headers:   { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:            trimmedName,
        phone:           digits,
        email:           '',
        vertical:        vertical ?? 'anxiety',
        durationOfIssue: '',
        symptoms:        [],
        priorTherapy:    '',
        readinessScore:  0,
        source:          `whatsapp_gate_${location}`,
        utmSource:   utms.utm_source   ?? '',
        utmMedium:   utms.utm_medium   ?? '',
        utmCampaign: utms.utm_campaign ?? '',
        utmContent:  utms.utm_content  ?? '',
        pageUrl:     typeof window !== 'undefined' ? window.location.href : '',
      }),
    }).catch(() => {})

    // Mixpanel people.set + Meta Lead (Pixel + CAPI) via the canonical helper
    try {
      trackLeadSubmitted({
        name:        trimmedName,
        phone:       digits,
        email:       '',
        verticalRaw: vertical ?? 'whatsapp_gate',
      })
    } catch {}

    try { trackWhatsAppClick(location, vertical) } catch {}

    openWhatsApp(trimmedName)
    setOpen(false)
    setBusy(false)
  }

  // Clone the child trigger to intercept clicks while preserving the original
  // onClick (e.g. result-page CTA tracking).
  const child      = Children.only(children)
  const childProps = isValidElement(child) ? (child.props as Record<string, unknown>) : {}
  const originalFn = typeof childProps.onClick === 'function'
    ? (childProps.onClick as (e: ReactMouseEvent) => void)
    : undefined
  const trigger = isValidElement(child)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? cloneElement(child, {
        onClick: (e: ReactMouseEvent) => {
          try { originalFn?.(e) } catch {}
          handleTriggerClick(e)
        },
      } as any)
    : child

  return (
    <>
      {trigger}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 p-4"
          onClick={(e) => { if (e.target === e.currentTarget && !busy) setOpen(false) }}
        >
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">Talk to us on WhatsApp</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Leave your name and mobile number — we'll continue the chat on WhatsApp.
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="wa-gate-name">First name</Label>
                <Input
                  id="wa-gate-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name"
                  className="mt-1.5"
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="wa-gate-phone">Mobile number</Label>
                <Input
                  id="wa-gate-phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="mt-1.5"
                  maxLength={14}
                />
                <p className="text-xs text-gray-400 mt-1">
                  We save it so you don't re-enter next time.
                </p>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#1fb655] text-white"
                onClick={handleSubmit}
                disabled={busy}
              >
                {busy ? 'Connecting…' : 'Open WhatsApp'}
              </Button>

              <button
                type="button"
                onClick={() => { if (!busy) setOpen(false) }}
                className="block w-full text-center text-xs text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
