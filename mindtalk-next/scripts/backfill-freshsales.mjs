#!/usr/bin/env node
// Backfill Mindtalk Mixpanel leads into Freshsales.
//
// Reads a Mixpanel user-export CSV (the columns we care about are
//   $distinct_id, $name, $email, $city, initial_utm_campaign,
//   $initial_referrer)
// and POSTs each row as a Freshsales contact. Phone-only rows (where
// $distinct_id starts with `+`) submit `mobile_number` only; email rows
// submit both. Freshsales 422 duplicate errors are counted as `existing`
// rather than failures so the script is safe to re-run.
//
// Usage:
//   FRESHSALES_API_KEY=xxx node scripts/backfill-freshsales.mjs \
//     ~/Downloads/user-export-3984638-2026_05_05_04_44_15.csv
//
// Optional flags:
//   --dry-run        Print payloads but don't POST/PUT.
//   --limit N        Only process the first N rows after the header.
//   --start N        Skip the first N data rows (for resuming).
//   --update-mode    Don't try to create. Instead look up each phone and
//                    PATCH the existing contact's lead_source +
//                    cf_form_source_custom so all Mindtalk LP submissions
//                    end up unified under the 'packages' filter even if
//                    the contact was originally created by a different
//                    flow (Zapier, older form, etc.). Safe to re-run.
//
// Output: a per-row line (✓ created / ↺ existing / ✗ failed) and a final
// summary. Errors include the upstream HTTP status and body.

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const FRESHSALES_API = 'https://cadabams.myfreshworks.com/crm/sales/api/contacts'
const SEARCH_API     = 'https://cadabams.myfreshworks.com/crm/sales/api/lookup'

const args = process.argv.slice(2)
const csvPath = args.find((a) => !a.startsWith('--'))
const dryRun  = args.includes('--dry-run')
const updateMode = args.includes('--update-mode')
const limit   = (() => { const i = args.indexOf('--limit'); return i >= 0 ? parseInt(args[i + 1], 10) : Infinity })()
const start   = (() => { const i = args.indexOf('--start'); return i >= 0 ? parseInt(args[i + 1], 10) : 0 })()

if (!csvPath) {
  console.error('usage: FRESHSALES_API_KEY=xxx node scripts/backfill-freshsales.mjs <csv-path> [--dry-run] [--limit N] [--start N] [--update-mode]')
  process.exit(2)
}

const apiKey = process.env.FRESHSALES_API_KEY
if (!apiKey && !dryRun) {
  console.error('FRESHSALES_API_KEY env var is required (or pass --dry-run)')
  process.exit(2)
}

// ── CSV parser — minimal, handles double-quoted fields with embedded commas ──
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c === '\r') { /* skip */ }
      else field += c
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row) }
  return rows
}

const csvText = fs.readFileSync(path.resolve(csvPath), 'utf8')
const allRows = parseCsv(csvText).filter((r) => r.length > 1)
const header = allRows[0]
const dataRows = allRows.slice(1).filter((r) => r.some((c) => c && c.trim().length > 0))

const colIdx = (name) => header.findIndex((h) => h.replace(/^"|"$/g, '') === name)
const idIdx       = colIdx('$distinct_id')
const nameIdx     = colIdx('$name')
const emailIdx    = colIdx('$email')
const cityIdx     = colIdx('$city')
const campaignIdx = colIdx('initial_utm_campaign')
const referrerIdx = colIdx('$initial_referrer')

if ([idIdx, nameIdx, emailIdx, campaignIdx].some((i) => i < 0)) {
  console.error('CSV header missing required columns. Got:', header)
  process.exit(2)
}

const sliced = dataRows.slice(start, start + limit)

console.log(`Loaded ${dataRows.length} rows from ${csvPath}; processing ${sliced.length} (start=${start}, limit=${limit === Infinity ? 'all' : limit})${dryRun ? ' [DRY RUN]' : ''}`)
console.log('')

const summary = { created: 0, existing: 0, updated: 0, not_found: 0, blocked_no_mobile: 0, failed: 0, skipped: 0 }
const failures = []

function normalisePhone(raw) {
  const digits = String(raw).replace(/\D/g, '')
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`
  if (digits.length === 10) return `+91${digits}`
  return `+${digits}`
}

function buildPayload(row) {
  const id       = row[idIdx]
  const name     = row[nameIdx]
  const email    = row[emailIdx]
  const city     = row[cityIdx]
  const campaign = row[campaignIdx]
  const referrer = row[referrerIdx]

  const isPhone = id.startsWith('+')
  const isEmailId = id.includes('@')
  const cleanEmail = email && email !== 'undefined' && email.includes('@') ? email : (isEmailId ? id : undefined)
  const phone = isPhone ? normalisePhone(id) : undefined

  // Phone is mandatory for the Mindtalk pipeline. Skip rows that have only
  // email — Freshsales would reject them anyway with the "Mobile is required"
  // workspace rule, and the business doesn't want email-only leads in CRM.
  if (!phone) return null

  const contact = {
    first_name: name && name !== 'undefined' ? name : (phone ?? cleanEmail),
    ...(cleanEmail ? { email: cleanEmail } : {}),
    ...(phone     ? { mobile_number: phone } : {}),
    ...(city && city !== 'undefined' ? { city } : {}),
    lead_source: referrer && referrer.includes('facebook') ? 'Facebook' : referrer && referrer.includes('instagram') ? 'Instagram' : 'MindTalk Website',
    ...(campaign ? { campaign } : {}),
    custom_field: {
      cf_form_source_custom: 'mindtalk_backfill_2026_05',
    },
  }
  return { contact }
}

async function postContact(payload) {
  const resp = await fetch(FRESHSALES_API, {
    method: 'POST',
    headers: {
      Authorization: `Token token=${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const text = await resp.text()
  return { status: resp.status, body: text }
}

async function lookupContactByPhone(phone) {
  // Freshsales lookup endpoint: returns the contact whose unique field
  // matches the query. `f=mobile_number` searches the mobile field;
  // `entities=contact` scopes to the contact object.
  const url = `${SEARCH_API}?q=${encodeURIComponent(phone)}&f=mobile_number&entities=contact`
  const resp = await fetch(url, {
    headers: {
      Authorization: `Token token=${apiKey}`,
      'Content-Type': 'application/json',
    },
  })
  const text = await resp.text()
  if (!resp.ok) return { ok: false, status: resp.status, body: text }
  try {
    const data = JSON.parse(text)
    const contacts = data?.contacts?.contacts ?? []
    return { ok: true, contact: contacts[0] ?? null }
  } catch {
    return { ok: false, status: resp.status, body: text.slice(0, 300) }
  }
}

async function updateContact(id, payload) {
  const resp = await fetch(`${FRESHSALES_API}/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token token=${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const text = await resp.text()
  return { status: resp.status, body: text }
}

function classify(status, body) {
  if (status >= 200 && status < 300) return 'created'
  // Freshsales surfaces "already exists" duplicates as either 400 with
  // error_code 3002 ("Contact is not unique") or 422 with "already taken".
  // Both are success signals for backfill — the contact is already there.
  if ((status === 400 || status === 422) && /already exists|already taken|not unique|3002/i.test(body)) {
    return 'existing'
  }
  // Freshsales workspace rule "Mobile is required on all contacts" blocks
  // email-only creates with a 400 + this exact phrase. Bucket separately
  // so the summary makes the underlying rule obvious.
  if (status === 400 && /Need to fill this Mobile/i.test(body)) return 'blocked_no_mobile'
  return 'failed'
}

for (let i = 0; i < sliced.length; i++) {
  const row = sliced[i]
  const id  = row[idIdx]
  const payload = buildPayload(row)
  const label = `[${String(i + 1).padStart(3)}/${sliced.length}] ${id}`

  if (!payload) { summary.skipped++; console.log(`${label}  ⊘ skipped (no phone — email-only)`); continue }

  // ─────────── UPDATE MODE ───────────
  if (updateMode) {
    const phone = payload.contact.mobile_number
    if (dryRun) {
      console.log(`${label}  [dry-run] would lookup ${phone} and PATCH cf_form_source_custom + lead_source + campaign`)
      summary.updated++
      continue
    }
    try {
      const lookup = await lookupContactByPhone(phone)
      if (!lookup.ok) {
        summary.failed++
        failures.push({ id, status: lookup.status, body: (lookup.body ?? '').slice(0, 200) })
        console.log(`${label}  ✗ lookup failed (HTTP ${lookup.status})`)
      } else if (!lookup.contact) {
        summary.not_found++
        console.log(`${label}  ? not found in Freshsales`)
      } else {
        // PATCH the contact with the LP attribution we want consistent
        const patch = {
          contact: {
            lead_source: payload.contact.lead_source,
            ...(payload.contact.campaign ? { campaign: payload.contact.campaign } : {}),
            custom_field: { cf_form_source_custom: 'packages' },
          },
        }
        const { status, body } = await updateContact(lookup.contact.id, patch)
        if (status >= 200 && status < 300) {
          summary.updated++
          console.log(`${label}  ✎ updated (id=${lookup.contact.id})`)
        } else {
          summary.failed++
          failures.push({ id, status, body: body.slice(0, 300) })
          console.log(`${label}  ✗ update failed (HTTP ${status}) ${body.slice(0, 200)}`)
        }
      }
    } catch (err) {
      summary.failed++
      failures.push({ id, error: err?.message ?? String(err) })
      console.log(`${label}  ✗ network error: ${err?.message ?? err}`)
    }
    await new Promise((r) => setTimeout(r, 250))
    continue
  }

  // ─────────── CREATE MODE (default) ───────────
  if (dryRun) {
    console.log(`${label}  [dry-run] payload=${JSON.stringify(payload.contact)}`)
    summary.created++
    continue
  }

  try {
    const { status, body } = await postContact(payload)
    const verdict = classify(status, body)
    summary[verdict]++
    const mark =
      verdict === 'created' ? '✓ created' :
      verdict === 'existing' ? '↺ existing' :
      verdict === 'blocked_no_mobile' ? '⏸ blocked (mobile required)' :
      '✗ failed'
    console.log(`${label}  ${mark} (HTTP ${status})${verdict === 'failed' ? ' ' + body.slice(0, 200) : ''}`)
    if (verdict === 'failed') failures.push({ id, status, body: body.slice(0, 400) })
  } catch (err) {
    summary.failed++
    failures.push({ id, error: err?.message ?? String(err) })
    console.log(`${label}  ✗ network error: ${err?.message ?? err}`)
  }

  // Be polite to Freshsales — small pause between calls
  await new Promise((r) => setTimeout(r, 250))
}

console.log('')
console.log('────────────── SUMMARY ──────────────')
console.log(`created:   ${summary.created}`)
console.log(`existing:  ${summary.existing}`)
console.log(`failed:    ${summary.failed}`)
console.log(`skipped:   ${summary.skipped}`)
if (failures.length > 0) {
  console.log('')
  console.log('Failures:')
  failures.forEach((f) => console.log(`  ${f.id}  ${f.status ?? 'ERR'}  ${(f.body ?? f.error ?? '').slice(0, 200)}`))
}
