// app/api/checkout/book-and-pay/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';
const BEARER   = process.env.CRM_BEARER_TOKEN!;
const CAMPUS_MINDTALK = 4;

async function safeFetch(url: string, options: RequestInit): Promise<any> {
  try {
    const res = await fetch(url, options);
    const text = await res.text();
    console.log(`[book-and-pay] ${options.method} ${url} → ${res.status}: ${text.slice(0, 300)}`);
    if (!text) return { _status: res.status, _empty: true };
    try { return JSON.parse(text); } catch { return { _status: res.status, _raw: text.slice(0, 200) }; }
  } catch (e: any) {
    console.error(`[book-and-pay] fetch error ${url}:`, e?.message);
    return { _error: e?.message };
  }
}

export async function POST(req: NextRequest) {
  const { lead_id, package_id, caller_name, patient_name } = await req.json();

  // ── Step 1: Book the package ──
  const bookData = await safeFetch(`${CRM_BASE}/book_package`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER}`,
    },
    body: JSON.stringify({
      date: new Date().toISOString().split('T')[0],
      package_id,
      caller_name,
      patient_name,
      lead_id,
      payment_mode: 'online',
      campus_id: CAMPUS_MINDTALK,
      sequence_booking: true,
      package_stage: 'booked',
      user_id: 1,
    }),
  });

  const booking_id: number = bookData?.result?.[0]?.booking_id;

  if (!booking_id) {
    return NextResponse.json(
      { error: 'Failed to book package. Please try again.', _debug: JSON.stringify(bookData).slice(0, 300) },
      { status: 500 }
    );
  }

  // ── Step 2: Get Razorpay payment link ──
  const expiry = Math.floor(Date.now() / 1000) + 60 * 30;

  const payData = await safeFetch(
    `${CRM_BASE}/razorpay/payment?user_id=1`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BEARER}`,
      },
      body: JSON.stringify({
        lead_id,
        booked_package_id: booking_id,
        campus_id: CAMPUS_MINDTALK,
        expiry_date: expiry,
      }),
    }
  );

  const payment_link =
    payData?.short_url ??
    payData?.payment_link_url ??
    payData?.payment_link ??
    payData?.result?.short_url ??
    payData?.result?.payment_link ??
    null;

  if (!payment_link) {
    return NextResponse.json(
      { error: 'Could not generate payment link. Please contact support.', _debug: JSON.stringify(payData).slice(0, 300) },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, booking_id, payment_link });
}
