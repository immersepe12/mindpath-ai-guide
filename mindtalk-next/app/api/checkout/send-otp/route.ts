// app/api/checkout/send-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';
const BEARER   = process.env.CRM_BEARER_TOKEN!;

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!phone || !/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
  }

  const uid = crypto.randomUUID().replace(/-/g, '').slice(0, 16);

  const url = `${CRM_BASE}/crm_lead/login?type=login&phone_number=${phone}&uid=${uid}&country_code=91&user_id=1`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${BEARER}` },
  });

  const data = await res.json();

  if (!data.success) {
    return NextResponse.json({ error: data.message ?? 'OTP failed' }, { status: 400 });
  }

  // Return uid so client can use it in verify step
  return NextResponse.json({ success: true, uid });
}
