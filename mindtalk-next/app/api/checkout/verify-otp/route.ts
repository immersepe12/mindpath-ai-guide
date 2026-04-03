// app/api/checkout/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';

export async function POST(req: NextRequest) {
  const { phone, otp, uid } = await req.json();

  // CRM send_otp requires phone WITH country code: 919632680280
  const fullPhone = Number(`91${phone}`);

  const res = await fetch(`${CRM_BASE}/crm_lead/send_otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone_number: fullPhone,
      uid,
      country_code: 91,
      otp: Number(otp),
    }),
  });

  let rawText = '';
  let data: any = {};
  try {
    rawText = await res.text();
    if (rawText) data = JSON.parse(rawText);
  } catch {}

  const result = data?.result ?? data;

  if (!result.success) {
    return NextResponse.json({
      error: 'Invalid OTP. Please try again.',
      _debug: { status: res.status, raw: rawText.slice(0, 300) }
    }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    lead_id: result.lead_id,
    name: result.patient_name ?? result.caller_name ?? '',
  });
}
