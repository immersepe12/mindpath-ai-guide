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

  // Try with just 10 digits first (as per send_otp API example)
  const loginUrl = `${CRM_BASE}/crm_lead/login?type=login&phone_number=${phone}&uid=${uid}&country_code=91&user_id=1`;

  let loginText = '';
  let loginStatus = 0;
  let loginError = '';

  try {
    const loginRes = await fetch(loginUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${BEARER}` },
    });
    loginStatus = loginRes.status;
    loginText = await loginRes.text();
  } catch (e: any) {
    loginError = e?.message ?? 'fetch failed';
  }

  // Try to parse JSON
  let loginData: any = {};
  try {
    if (loginText) loginData = JSON.parse(loginText);
  } catch {}

  // Return debug info so we can see exactly what CRM returns
  if (!loginData.success) {
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
      _debug: { loginStatus, loginText: loginText.slice(0, 300), loginError },
    }, { status: 404 });
  }

  return NextResponse.json({ success: true, uid, mode: 'login' });
}
