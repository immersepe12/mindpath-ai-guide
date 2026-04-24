// lib/ab-test.ts
// Lightweight client-side A/B testing. No dependencies, no server runtime.
// Variant is assigned on first visit, persisted to localStorage, and the
// same visitor sees the same variant for the duration of that browser.
//
// Usage:
//   const variant = getVariant('price_framing')   // 'A' | 'B'
//   if (variant === 'B') showFreeCallCTA()
//
// Every Mixpanel event automatically carries the active variants as
// super properties, so in the Mixpanel UI you can filter/funnel by
// `ab_price_framing` and compare conversion per variant.

export type Variant = 'A' | 'B'

// Register all active tests here. Keep the IDs stable once live — changing
// an ID re-randomises everyone.
export const AB_TESTS = {
  /**
   * Tests paid-programme framing vs free-call framing on the LP hero + form.
   * A = control (₹7,799 visible, "Get my programme match" CTA)
   * B = free call first (no price upfront, "Book free counsellor call" CTA)
   */
  price_framing: { A: 0.5, B: 0.5 },
} as const satisfies Record<string, Record<Variant, number>>

export type ABTestId = keyof typeof AB_TESTS

const STORAGE_KEY = 'mindtalk_ab_v1'

interface StoredAssignments {
  [testId: string]: Variant
}

function readStored(): StoredAssignments {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeStored(next: StoredAssignments): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {}
}

function pickWeighted(weights: Record<Variant, number>): Variant {
  const entries = Object.entries(weights) as [Variant, number][]
  const total = entries.reduce((s, [, w]) => s + w, 0)
  let r = Math.random() * total
  for (const [variant, w] of entries) {
    r -= w
    if (r <= 0) return variant
  }
  return entries[0][0]
}

/**
 * Returns the variant for a given test. Assigns on first call and persists
 * to localStorage for the life of the browser. On the server (SSR), always
 * returns 'A' — the client re-renders with the real variant on mount.
 */
export function getVariant(testId: ABTestId): Variant {
  if (typeof window === 'undefined') return 'A'
  const stored = readStored()
  if (stored[testId]) return stored[testId]
  const variant = pickWeighted(AB_TESTS[testId])
  stored[testId] = variant
  writeStored(stored)
  return variant
}

/**
 * Returns a flat object of all active test assignments, shaped for
 * Mixpanel super properties / Meta CAPI custom_data:
 *   { ab_price_framing: 'B' }
 * Safe on the server — returns an empty object there.
 */
export function getAllVariantProps(): Record<string, Variant> {
  if (typeof window === 'undefined') return {}
  const stored = readStored()
  const out: Record<string, Variant> = {}
  let changed = false
  for (const testId of Object.keys(AB_TESTS) as ABTestId[]) {
    let v = stored[testId]
    if (!v) {
      v = pickWeighted(AB_TESTS[testId])
      stored[testId] = v
      changed = true
    }
    out[`ab_${testId}`] = v
  }
  if (changed) writeStored(stored)
  return out
}
