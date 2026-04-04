// app/api/lead-submitted/route.ts
// Fires when quiz form submits — triggers Fyno lead_created event
import { NextRequest, NextResponse } from 'next/server';

const FYNO_WORKSPACE = process.env.NEXT_PUBLIC_FYNO_WORKSPACE_ID!;
const FYNO_API_KEY   = process.env.NEXT_PUBLIC_FYNO_API_KEY!;

const LP_URLS: Record<string, string> = {
  anxiety:      'https://cadabamsmindtalk.com/anxiety',
  depression:   'https://cadabamsmindtalk.com/emotional-reset',
  relationship: 'https://cadabamsmindtalk.com/relationships',
  burnout:      'https://cadabamsmindtalk.com/burnout',
};

function normaliseVertical(raw: string): string {
  const v = raw.toLowerCase();
  if (v.includes('anxiety') || v.includes('stress')) return 'anxiety';
  if (v.includes('depress') || v.includes('emotion') || v.includes('mood')) return 'depression';
  if (v.includes('relation') || v.includes('break') || v.includes('grief')) return 'relationship';
  if (v.includes('burn') || v.includes('work') || v.includes('exhaust')) return 'burnout';
  return 'anxiety';
}

export async function POST(req: NextRequest) {
  const { name, phone, email, verticalRaw } = await req.json();

  if (!phone || !name) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const vertical = normaliseVertical(verticalRaw ?? '');
  const lp_url   = LP_URLS[vertical];
  const formattedPhone = phone.startsWith('+')
    ? phone
    : `+91${phone.replace(/\D/g, '')}`;

  if (!FYNO_WORKSPACE || !FYNO_API_KEY) {
    console.warn('[lead-submitted] Fyno credentials not set');
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(`https://api.fyno.io/v1/${FYNO_WORKSPACE}/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${FYNO_API_KEY}`,
      },
      body: JSON.stringify({
        event: 'lead_created',
        to: {
          $phone_number: formattedPhone,
          $email:        email ?? '',
          $name:         name,
        },
        data: {
          name,
          phone:    formattedPhone,
          email:    email ?? '',
          vertical,
          lp_url,
        },
      }),
    });
    console.log('[lead-submitted] Fyno response:', res.status);
  } catch (e) {
    console.warn('[lead-submitted] Fyno error:', e);
  }

  return NextResponse.json({ ok: true });
}
