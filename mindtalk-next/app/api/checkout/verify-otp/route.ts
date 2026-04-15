// app/api/checkout/verify-otp/route.ts
// Note: AddPaymentInfo is intentionally NOT fired here. It fires from the
// browser when the user clicks Pay (proceedToPayment in /checkout) — that's
// the canonical Meta semantic. CompleteRegistration for new signups fires
// from /api/checkout/send-otp.
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';

export async function POST(req: NextRequest) {
  const { phone, otp, uid, mode, name, email } = await req.json();

  // EXISTING USER — login flow
  if (mode === 'login') {
    const res = await fetch(`${CRM_BASE}/crm_lead/send_otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone_number: Number(phone),
        uid,
        otp: Number(otp),
        user_id: 1,
      }),
    });
    let data: any = {};
    try { const t = await res.text(); if (t) data = JSON.parse(t); } catch {}
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

  // NEW USER — signup flow
  if (mode === 'signup') {
    const nameParts = (name ?? '').trim().split(' ');
    const f_name = nameParts[0] || 'MindTalk';
    const l_name = nameParts.slice(1).join(' ') || 'User';

    const res = await fetch(`${CRM_BASE}/mobile/signup?user_id=1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        f_name,
        l_name,
        email_id: email,
        mobile: phone,
        otp: String(otp),
        uid,
        country_code: '91',
      }),
    });
    let data: any = {};
    try { const t = await res.text(); console.log('[verify-otp signup]', t); if (t) data = JSON.parse(t); } catch {}
    const result = data?.result ?? data;
    if (!result?.success && !result?.lead_id) {
      return NextResponse.json({ error: 'Invalid OTP. Please try again.' }, { status: 400 });
    }
    return NextResponse.json({
      success: true,
      lead_id: result.lead_id,
      name: name || 'there',
    });
  }

  return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
}
