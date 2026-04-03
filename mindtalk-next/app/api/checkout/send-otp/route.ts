// app/api/checkout/send-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';
const BEARER   = process.env.CRM_BEARER_TOKEN!;

export async function POST(req: NextRequest) {
  const { phone, email } = await req.json();

  if (!phone || !/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
  }

  const uid = crypto.randomUUID().replace(/-/g, '').slice(0, 16);

  // Step 1: Try login first (existing lead)
  const loginUrl = `${CRM_BASE}/crm_lead/login?type=login&phone_number=${phone}&uid=${uid}&country_code=91&user_id=1`;

  const loginRes = await fetch(loginUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${BEARER}` },
  });

  let loginData: any = {};
  try {
    const loginText = await loginRes.text();
    if (loginText) loginData = JSON.parse(loginText);
  } catch {}

  if (loginData.success) {
    return NextResponse.json({ success: true, uid, mode: 'login' });
  }

  // Step 2: Lead not found — create via signup (requires email)
  if (!email) {
    // Ask frontend to collect email before retrying
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
    }, { status: 404 });
  }

  const signupUrl = `${CRM_BASE}/crm_lead/login?type=signup&phone_number=${phone}&uid=${uid}&country_code=91&user_id=1&email_id=${encodeURIComponent(email)}`;

  const signupRes = await fetch(signupUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${BEARER}` },
  });

  let signupData: any = {};
  try {
    const signupText = await signupRes.text();
    if (signupText) signupData = JSON.parse(signupText);
  } catch {}

  if (!signupData.success) {
    return NextResponse.json({ error: signupData.message ?? 'Could not send OTP. Please try again.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, uid, mode: 'signup' });
}
