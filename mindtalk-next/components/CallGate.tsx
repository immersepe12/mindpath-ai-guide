// components/CallGate.tsx
// Drop-in wrapper around any phone-call CTA. Intercepts the click to capture
// name + phone first (lead gate), then opens tel:... Mirrors WhatsAppGate.
//
// IMPORTANT: do NOT use this on crisis helpline links (iCall, Vandrevala
// Foundation, etc). Gating a crisis line behind a form is unsafe and
// non-compliant. The AIDisclaimer crisis numbers stay ungated.
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
import { trackLeadSubmitted, trackCallClick } from '@/lib/analytics'

const PHONE_STORAGE = 'mindtalk_wa_phone'   // shared with WhatsAppGate so the
const NAME_STORAGE  = 'mindtalk_wa_name'    // user only fills the gate once

interface Props {
  /** Mixpanel location label: 'footer' | 'nav' | 'hero' | … */
  location: string
  /** The dial-out number, e.g. '+919741476476' */
  telNumber: string
  /** Vertical context — used in CRM source/Mixpanel */
  vertical?: string
  /** Skip the modal if we already know the visitor's phone (URL or session) */
  knownPhone?: string
  knownName?: string
  /** Single trigger element — its onClick is intercepted */
  children: ReactElement
}

export default function CallGate({
  location, telNumber, vertical, knownPhone, knownName, children,
}: Props) {
  const [open,  setOpen]  = useState(false)
  const [name,  setName]  = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [busy,  setBusy]  = useState(false)

  function dial() {
    if (typeof window !== 'undefined') {
      window.location.href = `tel:${telNumber}`
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
      try { trackCallClick(location, vertical) } catch {}
      dial()
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
    let gclid = utms.gclid ?? ''
    if (!gclid && typeof window !== 'undefined') {
      gclid = new URLSearchParams(window.location.search).get('gclid') ?? ''
    }

    // Freshsales + Fyno via /api/lead. keepalive so it survives the
    // immediate navigation to tel: that follows.
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
        source:          `call_gate_${location}`,
        utmSource:   utms.utm_source   ?? '',
        utmMedium:   utms.utm_medium   ?? '',
        utmCampaign: utms.utm_campaign ?? '',
        utmContent:  utms.utm_content  ?? '',
        gclid,
        pageUrl:     typeof window !== 'undefined' ? window.location.href : '',
      }),
    }).catch(() => {})

    try {
      trackLeadSubmitted({
        name:        trimmedName,
        phone:       digits,
        email:       '',
        verticalRaw: vertical ?? 'call_gate',
      })
    } catch {}

    try { trackCallClick(location, vertical) } catch {}

    dial()
    setOpen(false)
    setBusy(false)
  }

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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#E8521A" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900">Talk to a counsellor</h3>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Leave your name and mobile number — we&apos;ll connect the call.
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="call-gate-name">First name</Label>
                <Input
                  id="call-gate-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name"
                  className="mt-1.5"
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="call-gate-phone">Mobile number</Label>
                <Input
                  id="call-gate-phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="mt-1.5"
                  maxLength={14}
                />
                <p className="text-xs text-gray-400 mt-1">
                  We save it so you don&apos;t re-enter next time.
                </p>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                size="lg"
                className="w-full bg-[#E8521A] hover:bg-[#C43D0A] text-white"
                onClick={handleSubmit}
                disabled={busy}
              >
                {busy ? 'Connecting…' : 'Call now'}
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
