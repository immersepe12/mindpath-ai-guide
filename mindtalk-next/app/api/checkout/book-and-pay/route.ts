// app/api/checkout/book-and-pay/route.ts
import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = 'https://crm.cadabams.com';
const BEARER   = process.env.CRM_BEARER_TOKEN!;
const CAMPUS_MINDTALK = 4;

export async function POST(req: NextRequest) {
  const { lead_id, package_id, caller_name, patient_name } = await req.json();

  // ── Step 1: Book the package ──────────────────────────────────────────
  const bookRes = await fetch(`${CRM_BASE}/book_package`, {
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

  let bookData: any = {};
  try { const t = await bookRes.text(); console.log('[book-and-pay] book response:', t.slice(0, 500)); if (t) bookData = JSON.parse(t); } catch {}
  const booking_id: number = bookData?.result?.[0]?.booking_id;

  if (!booking_id) {
    console.error('[book-and-pay] Book package failed:', JSON.stringify(bookData));
    return NextResponse.json(
      { error: 'Failed to book package. Please try again.', _debug: JSON.stringify(bookData).slice(0, 200) },
      { status: 500 }
    );
  }

  // ── Step 2: Get Razorpay payment link ────────────────────────────────
  const expiry = Math.floor(Date.now() / 1000) + 60 * 30; // 30 min expiry

  const payUrl = new URL(`${CRM_BASE}/razorpay/payment`);
  payUrl.searchParams.set('user_id', '1');
  payUrl.searchParams.set('lead_id', String(lead_id));
  payUrl.searchParams.set('booked_package_id', String(booking_id));
  payUrl.searchParams.set('campus_id', String(CAMPUS_MINDTALK));
  payUrl.searchParams.set('expiry_date', String(expiry));

  const payRes = await fetch(payUrl.toString(), {
    method: 'GET',
    headers: { Authorization: `Bearer ${BEARER}` },
  });

  const payData = await payRes.json();

  // Razorpay returns short_url or payment_link in the response
  const payment_link =
    payData?.short_url ??
    payData?.payment_link_url ??
    payData?.payment_link ??
    null;

  if (!payment_link) {
    console.error('Razorpay link failed:', payData);
    return NextResponse.json(
      { error: 'Could not generate payment link. Please contact support.' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    booking_id,
    payment_link,
  });
}
