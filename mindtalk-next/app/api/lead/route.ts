import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, phone, email, vertical, durationOfIssue, priorTherapy, readinessScore } = body

  const normalisePhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (digits.startsWith('91') && digits.length === 12) return `+${digits}`
    if (digits.length === 10) return `+91${digits}`
    return `+${digits}`
  }

  const normalisedPhone = normalisePhone(phone)

  const lpUrls: Record<string, string> = {
    anxiety:      'https://cadabamsmindtalk.com/anxiety',
    depression:   'https://cadabamsmindtalk.com/emotional-reset',
    relationship: 'https://cadabamsmindtalk.com/relationships',
    burnout:      'https://cadabamsmindtalk.com/burnout',
  }

  // 1. Freshsales
  if (process.env.FRESHSALES_API_KEY) {
    try {
      await fetch('https://cadabams.myfreshworks.com/crm/sales/api/contacts', {
        method: 'POST',
        headers: {
          Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: {
            first_name: name,
            email,
            mobile_number: normalisedPhone,
            custom_field: {
              vertical,
              duration_of_issue: durationOfIssue ?? '',
              prior_therapy: priorTherapy ?? '',
              readiness_score: readinessScore ?? '',
            },
          },
        }),
      })
    } catch (err) {
      console.error('[lead] Freshsales error:', err)
    }
  }

  // 2. Fyno — trigger lead_created nurture sequence
  if (process.env.FYNO_API_KEY && process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID) {
    try {
      await fetch(
        `https://api.fyno.io/v1/${process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID}/event`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.FYNO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'lead_created',
            to: {
              phone_number: normalisedPhone,
              email,
            },
            data: {
              name,
              vertical,
              lp_url: lpUrls[vertical] ?? lpUrls.anxiety,
            },
          }),
        }
      )
    } catch (err) {
      console.error('[lead] Fyno error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
