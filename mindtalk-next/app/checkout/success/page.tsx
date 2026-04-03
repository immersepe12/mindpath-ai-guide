// app/checkout/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const APP_BASE = 'https://app.cadabamsmindtalk.com';

const PACKAGE_MAP: Record<string, { name: string; colour: string; journey_id: string }> = {
  anxiety: {
    name: '90-Day Stress & Anxiety Relief',
    colour: '#EC6206',
    journey_id: 'krimt84evc8eem6c460pegsh',
  },
  depression: {
    name: '90-Day Emotional Reset',
    colour: '#685BC7',
    journey_id: 'c9gx01i30uu9lnaxx5rrr91i',
  },
  relationships: {
    name: '90-Day Relationship Recovery',
    colour: '#1a7a1a',
    journey_id: 'j68ofnochcvz8zlsusi5n6b8',
  },
  burnout: {
    name: '90-Day Workplace Wellbeing',
    colour: '#C47800',
    journey_id: 't3nb46olj2sjj9lvjbz1w8d4',
  },
};

function SuccessContent() {
  const params      = useSearchParams();
  const [fired, setFired] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Read booking data stored before Razorpay redirect
    try {
      const stored = sessionStorage.getItem('mindtalk_booking');
      if (stored) setBooking(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (fired || !booking) return;
    setFired(true);

    const pkg = PACKAGE_MAP[booking.vertical] ?? PACKAGE_MAP.anxiety;

    // Fire purchase_confirmed → stops lead nurture, starts journey welcome WA
    fetch('/api/checkout/purchase-confirmed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:        booking.name,
        phone:       booking.phone ?? '',
        email:       booking.email ?? '',
        orderId:     String(booking.booking_id),
        vertical:    booking.vertical,
        journeyName: pkg.name,
        appLink:     `${APP_BASE}/journey/${pkg.journey_id}`,
      }),
    }).catch(console.warn);

    // Clear session storage
    sessionStorage.removeItem('mindtalk_booking');
  }, [booking, fired]);

  const vertical = booking?.vertical ?? 'anxiety';
  const pkg      = PACKAGE_MAP[vertical] ?? PACKAGE_MAP.anxiety;
  const accent   = pkg.colour;
  const appLink  = `${APP_BASE}/journey/${pkg.journey_id}`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f6f2',
      fontFamily: "'Barlow', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>

      {/* Success card */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        border: `2px solid ${accent}30`,
        padding: '48px 40px',
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
      }}>

        {/* Checkmark */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: `${accent}15`,
          border: `3px solid ${accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', margin: '0 auto 24px',
        }}>✓</div>

        <h1 style={{
          fontSize: '32px', fontWeight: 900,
          color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.1,
        }}>
          Your journey starts now.
        </h1>

        <p style={{
          fontSize: '16px', color: 'rgba(0,0,0,0.50)',
          marginBottom: '32px', lineHeight: 1.6,
        }}>
          Payment confirmed. Your <strong style={{ color: '#1a1a1a' }}>{pkg.name}</strong> programme
          is now active. Your first session unlocks on Day 7.
        </p>

        {/* What happens next */}
        <div style={{
          background: '#f8f6f2', borderRadius: '12px',
          padding: '24px', marginBottom: '32px', textAlign: 'left',
        }}>
          <div style={{
            fontSize: '12px', fontWeight: 700,
            color: 'rgba(0,0,0,0.35)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '16px',
          }}>
            What happens next
          </div>

          {[
            { icon: '📱', title: 'Open the app', desc: 'Tap below to go directly to your journey — no login needed.' },
            { icon: '📋', title: 'Complete Day 1', desc: 'Your first assessment and daily exercises are ready.' },
            { icon: '📅', title: 'Session 1 on Day 7', desc: 'Your psychologist will be assigned and you\'ll get a reminder 24h before.' },
            { icon: '💬', title: 'WhatsApp confirmation', desc: 'Check your WhatsApp — we\'ve sent your journey details.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              paddingBottom: i < 3 ? '14px' : '0',
              marginBottom: i < 3 ? '14px' : '0',
              borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.07)' : 'none',
            }}>
              <div style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', marginBottom: '2px' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA — open app */}
        <a
          href={appLink}
          style={{
            display: 'block', width: '100%',
            padding: '18px',
            background: accent, color: '#fff',
            borderRadius: '10px', textDecoration: 'none',
            fontSize: '18px', fontWeight: 900,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            boxShadow: `0 4px 24px ${accent}40`,
            marginBottom: '12px', boxSizing: 'border-box',
          }}
        >
          Open My Journey →
        </a>

        {/* App store fallback */}
        <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.35)', marginBottom: '24px' }}>
          Don't have the app?{' '}
          <a href="https://apps.apple.com" style={{ color: accent }}>iOS</a>
          {' · '}
          <a href="https://play.google.com" style={{ color: accent }}>Android</a>
        </div>

        {/* Booking reference */}
        {booking?.booking_id && (
          <div style={{
            fontSize: '12px', color: 'rgba(0,0,0,0.28)',
            paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.07)',
          }}>
            Booking reference: #{booking.booking_id} · Cadabams MindTalk
          </div>
        )}
      </div>

      {/* Support line */}
      <div style={{
        marginTop: '24px', fontSize: '13px',
        color: 'rgba(0,0,0,0.35)', textAlign: 'center',
      }}>
        Need help? Reply to your WhatsApp message or email{' '}
        <a href="mailto:support@cadabamsmindtalk.com" style={{ color: '#EC6206' }}>
          support@cadabamsmindtalk.com
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
