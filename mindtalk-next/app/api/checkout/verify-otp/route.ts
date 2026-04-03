// app/api/checkout/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';

export async function POST(req: NextRequest) {
  const { phone, otp, uid } = await req.json();

  const url = `${CRM_BASE}/crm_lead/send_otp?phone_number=${phone}&uid=${uid}&country_code=91&otp=${otp}`;

  const res = await fetch(url, { method: 'POST' });

  let data: any = {};
  try {
    const text = await res.text();
    if (text) data = JSON.parse(text);
  } catch {}

  if (!data.success) {
    return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    lead_id: data.lead_id,
    name: data.patient_name ?? data.caller_name,
  });
}
