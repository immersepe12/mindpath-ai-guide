// app/api/checkout/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';

export async function POST(req: NextRequest) {
  const { phone, otp, uid } = await req.json();

  // Match exact payload the app sends — all in JSON body, phone and otp as numbers
  const res = await fetch(`${CRM_BASE}/crm_lead/send_otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone_number: Number(phone),
      uid,
      country_code: 91,
      otp: Number(otp),
    }),
  });

  let data: any = {};
  try {
    const text = await res.text();
    if (text) data = JSON.parse(text);
  } catch {}

  // Response is nested: { jsonrpc, result: { success, lead_id, patient_name } }
  const result = data?.result ?? data;

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    lead_id: result.lead_id,
    name: result.patient_name ?? result.caller_name ?? '',
  });
}
