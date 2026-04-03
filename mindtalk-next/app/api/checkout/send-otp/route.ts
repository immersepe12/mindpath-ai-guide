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

  // Step 1: Try login (existing lead)
  const loginRes = await fetch(`${CRM_BASE}/crm_lead/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${BEARER}` },
    body: JSON.stringify({
      type: 'login',
      phone_number: Number(phone),
      uid,
      country_code: 91,
      user_id: 1,
    }),
  });
  const loginText = await loginRes.text();
  console.log('[send-otp] login response:', loginText);
  let loginData: any = {};
  try { if (loginText) loginData = JSON.parse(loginText); } catch {}
  const loginResult = loginData?.result ?? loginData;

  if (loginResult.success) {
    return NextResponse.json({ success: true, uid, mode: 'login' });
  }

  // Step 2: No email yet — ask for it
  if (!email) {
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
    }, { status: 404 });
  }

  // Step 3: New lead — use type=signup which creates lead AND sends OTP
  // Same endpoint, same JSON body pattern, add email_id
  const uid2 = crypto.randomUUID();
  const signupRes = await fetch(`${CRM_BASE}/crm_lead/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${BEARER}` },
    body: JSON.stringify({
      type: 'signup',
      phone_number: Number(phone),
      uid: uid2,
      country_code: 91,
      user_id: 1,
      email_id: email,
    }),
  });
  const signupText = await signupRes.text();
  console.log('[send-otp] signup response:', signupText);
  let signupData: any = {};
  try { if (signupText) signupData = JSON.parse(signupText); } catch {}
  const signupResult = signupData?.result ?? signupData;

  if (!signupResult.success) {
    return NextResponse.json({
      error: 'Could not send OTP. Please try again.',
      _debug: signupText.slice(0, 300),
    }, { status: 400 });
  }

  return NextResponse.json({ success: true, uid: uid2, mode: 'signup' });
}
