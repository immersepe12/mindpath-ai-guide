// app/api/checkout/send-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';
const BEARER   = process.env.CRM_BEARER_TOKEN!;

export async function POST(req: NextRequest) {
  const { phone, email } = await req.json();

  if (!phone || !/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number' }, { status: 400 });
  }

  const uid = crypto.randomUUID();

  // CRM expects JSON body, not query params
  const loginRes = await fetch(`${CRM_BASE}/crm_lead/login?type=login&user_id=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify({
      phone_number: phone,
      uid,
      country_code: 91,
    }),
  });

  let loginText = await loginRes.text();
  let loginData: any = {};
  try { if (loginText) loginData = JSON.parse(loginText); } catch {}

  if (loginData.success) {
    return NextResponse.json({ success: true, uid, mode: 'login' });
  }

  // Lead not found — need email to create account
  if (!email) {
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
    }, { status: 404 });
  }

  // Signup — create new lead
  const signupRes = await fetch(`${CRM_BASE}/crm_lead/login?type=signup&user_id=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify({
      phone_number: phone,
      uid,
      country_code: 91,
      email_id: email,
    }),
  });

  let signupText = await signupRes.text();
  let signupData: any = {};
  try { if (signupText) signupData = JSON.parse(signupText); } catch {}

  if (!signupData.success) {
    return NextResponse.json({
      error: signupData.message ?? 'Could not send OTP. Please try again.',
    }, { status: 400 });
  }

  return NextResponse.json({ success: true, uid, mode: 'signup' });
}
