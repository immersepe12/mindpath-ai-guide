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

  // CRM expects phone with country code: 919XXXXXXXXX
  const fullPhone = `91${phone}`;

  const loginUrl = `${CRM_BASE}/crm_lead/login?type=login&phone_number=${fullPhone}&uid=${uid}&country_code=91&user_id=1`;

  let loginText = '';
  let loginData: any = {};

  try {
    const loginRes = await fetch(loginUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${BEARER}` },
    });
    loginText = await loginRes.text();
    if (loginText) loginData = JSON.parse(loginText);
  } catch (e) {
    // Return raw response for debugging
    return NextResponse.json({
      error: 'CRM error',
      debug: loginText,
    }, { status: 500 });
  }

  if (loginData.success) {
    return NextResponse.json({ success: true, uid, mode: 'login' });
  }

  // Lead not found — ask for email to create
  if (!email) {
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
      debug: loginText, // temporary debug
    }, { status: 404 });
  }

  // Signup with email
  const signupUrl = `${CRM_BASE}/crm_lead/login?type=signup&phone_number=${fullPhone}&uid=${uid}&country_code=91&user_id=1&email_id=${encodeURIComponent(email)}`;

  let signupText = '';
  let signupData: any = {};

  try {
    const signupRes = await fetch(signupUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${BEARER}` },
    });
    signupText = await signupRes.text();
    if (signupText) signupData = JSON.parse(signupText);
  } catch (e) {
    return NextResponse.json({ error: 'Signup failed', debug: signupText }, { status: 500 });
  }

  if (!signupData.success) {
    return NextResponse.json({
      error: signupData.message ?? 'Could not send OTP. Please try again.',
    }, { status: 400 });
  }

  return NextResponse.json({ success: true, uid, mode: 'signup' });
}
