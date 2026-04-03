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

  // Match exactly what the app sends — type in JSON body, phone as number
  const loginRes = await fetch(`${CRM_BASE}/crm_lead/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify({
      type: 'login',
      phone_number: Number(phone),
      uid,
      country_code: 91,
      user_id: 1,
    }),
  });

  let loginData: any = {};
  try {
    const text = await loginRes.text();
    if (text) loginData = JSON.parse(text);
  } catch {}

  // Response comes nested: { result: { success: true } }
  const result = loginData?.result ?? loginData;

  if (result.success) {
    return NextResponse.json({ success: true, uid, mode: 'login' });
  }

  // Lead not found — need email to create account
  if (!email) {
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
    }, { status: 404 });
  }

  // Signup — match app's /mobile/signup endpoint and payload
  const signupRes = await fetch(`${CRM_BASE}/mobile/signup?user_id=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify({
      f_name: '',
      l_name: '',
      email_id: email,
      mobile: Number(phone),
      country_code: 91,
      uid,
      otp: 0, // placeholder — real OTP entered after
    }),
  });

  let signupData: any = {};
  try {
    const text = await signupRes.text();
    if (text) signupData = JSON.parse(text);
  } catch {}

  const signupResult = signupData?.result ?? signupData;

  if (!signupResult.success) {
    return NextResponse.json({
      error: signupResult.message ?? 'Could not send OTP. Please try again.',
    }, { status: 400 });
  }

  return NextResponse.json({ success: true, uid, mode: 'signup' });
}
