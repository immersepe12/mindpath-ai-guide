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
    body: JSON.stringify({ type: 'login', phone_number: Number(phone), uid, country_code: 91, user_id: 1 }),
  });

  let loginData: any = {};
  try { const t = await loginRes.text(); if (t) loginData = JSON.parse(t); } catch {}
  const loginResult = loginData?.result ?? loginData;

  if (loginResult.success) {
    return NextResponse.json({ success: true, uid, mode: 'login' });
  }

  // Step 2: Lead not found — create lead in CRM then send OTP
  if (!email) {
    return NextResponse.json({
      error: 'phone_not_found',
      message: 'We could not find an account with this number. Please enter your email to continue.',
    }, { status: 404 });
  }

  // Create lead via CRM
  const createRes = await fetch(
    `${CRM_BASE}/restapi/1.0/object/crm.lead?vals={'caller_mobile':'${phone}','partner_name':'MindTalk Lead','contact_name':'MindTalk Lead','caller_zip':''}&user_id=1`,
    { method: 'POST', headers: { Authorization: `Bearer ${BEARER}` } }
  );

  let createData: any = {};
  try { const t = await createRes.text(); if (t) createData = JSON.parse(t); } catch {}

  // Now send login OTP for the newly created lead
  const uid2 = crypto.randomUUID();
  const otpRes = await fetch(`${CRM_BASE}/crm_lead/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${BEARER}` },
    body: JSON.stringify({ type: 'login', phone_number: Number(phone), uid: uid2, country_code: 91, user_id: 1 }),
  });

  let otpData: any = {};
  try { const t = await otpRes.text(); if (t) otpData = JSON.parse(t); } catch {}
  const otpResult = otpData?.result ?? otpData;

  if (!otpResult.success) {
    return NextResponse.json({ error: 'Could not send OTP. Please try again.' }, { status: 400 });
  }

  return NextResponse.json({ success: true, uid: uid2, mode: 'signup' });
}
