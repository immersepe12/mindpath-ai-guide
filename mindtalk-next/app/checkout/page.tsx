// app/checkout/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Package config ────────────────────────────────────────────────────────────
const PACKAGES = {
  anxiety: {
    id: 12,
    name: '90-Day Stress & Anxiety Relief',
    journey_id: 'krimt84evc8eem6c460pegsh',
    tag: 'Anxiety Relief',
    colour: '#EC6206',
    description:
      '12 weekly CBT sessions with a licensed psychologist, daily exercises, breathwork and journaling. Structured recovery — not generic advice.',
    includes: [
      '12 sessions with your own psychologist',
      'Daily CBT exercises between sessions',
      'Breathwork, journaling & assessments',
      '90-day structured journey in the app',
    ],
  },
  depression: {
    id: 13,
    name: '90-Day Emotional Reset',
    journey_id: 'c9gx01i30uu9lnaxx5rrr91i',
    tag: 'Emotional Reset',
    colour: '#685BC7',
    description:
      'A clinically structured programme for low mood, flatness, and emotional disconnection. CBT-based, psychologist-led, 90 days.',
    includes: [
      '12 sessions with your own psychologist',
      'Mood tracking and daily CBT exercises',
      'Journaling and reflection prompts',
      '90-day structured journey in the app',
    ],
  },
  relationships: {
    id: 14,
    name: '90-Day Relationship Recovery',
    journey_id: 'j68ofnochcvz8zlsusi5n6b8',
    tag: 'Relationship Recovery',
    colour: '#1a7a1a',
    description:
      'Understand your patterns, process what happened, and build tools for what comes next. Individual programme — works solo or as a couple.',
    includes: [
      '12 sessions with your own psychologist',
      'CBT for attachment and communication',
      'Daily relationship exercises',
      '90-day structured journey in the app',
    ],
  },
  burnout: {
    id: 15,
    name: '90-Day Workplace Wellbeing',
    journey_id: 't3nb46olj2sjj9lvjbz1w8d4',
    tag: 'Burnout Recovery',
    colour: '#C47800',
    description:
      'Rebuild your relationship with work using evidence-based CBT. Not just stress management — a sustainable change in how you work.',
    includes: [
      '12 sessions with your own psychologist',
      'CBT for burnout and work-life balance',
      'Daily recovery exercises',
      '90-day structured journey in the app',
    ],
  },
} as const;

type Vertical = keyof typeof PACKAGES;

// ── Main page ─────────────────────────────────────────────────────────────────
function CheckoutContent() {
  const params = useSearchParams();
  const vertical = (params.get('vertical') ?? 'anxiety') as Vertical;
  const lead_id  = params.get('lead_id');
  const pkg      = PACKAGES[vertical] ?? PACKAGES.anxiety;

  // OTP flow state
  const [step, setStep]         = useState<'phone' | 'otp' | 'confirm' | 'paying'>('phone');
  const [phone, setPhone]       = useState('');
  const [email, setEmail]       = useState('');
  const [needEmail, setNeedEmail] = useState(false);
  const [otp, setOtp]           = useState('');
  const [uid, setUid]           = useState('');
  const [verifiedName, setVerifiedName] = useState('');
  const [verifiedLeadId, setVerifiedLeadId] = useState(lead_id ?? '');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function sendOTP() {
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/checkout/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email: email || undefined }),
      });
      const data = await res.json();
      if (res.status === 404 && data.error === 'phone_not_found') {
        setNeedEmail(true);
        setError(data.message);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(data.error);
      setNeedEmail(false);
      setUid(data.uid);
      setStep('otp');
    } catch (e: any) {
      setError(e.message ?? 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }

  async function verifyOTP() {
    setError('');
    setLoading(true);
    try {
      const res  = await fetch('/api/checkout/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, uid }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setVerifiedLeadId(String(data.lead_id));
      setVerifiedName(data.name);
      setStep('confirm');
    } catch (e: any) {
      setError(e.message ?? 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  }

  async function proceedToPayment() {
    setError('');
    setLoading(true);
    setStep('paying');
    try {
      const res  = await fetch('/api/checkout/book-and-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: Number(verifiedLeadId),
          package_id: pkg.id,
          caller_name: verifiedName,
          patient_name: verifiedName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Store booking info for success page
      sessionStorage.setItem('mindtalk_booking', JSON.stringify({
        booking_id: data.booking_id,
        lead_id: verifiedLeadId,
        vertical,
        journey_id: pkg.journey_id,
        name: verifiedName,
      }));

      // Redirect to Razorpay
      window.location.href = data.payment_link;
    } catch (e: any) {
      setError(e.message ?? 'Payment setup failed. Please try again.');
      setStep('confirm');
    } finally {
      setLoading(false);
    }
  }

  const accent = pkg.colour;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f6f2', fontFamily: "'Barlow', sans-serif" }}>
      {/* Header */}
      <header style={{
        background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px'
      }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "22px", color: "#EC6206", letterSpacing: "0.04em", textTransform: "uppercase" }}>MindTalk</span>
        <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Secure Checkout
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '13px', color: 'rgba(0,0,0,0.35)' }}>
          🔒 SSL Secured
        </span>
      </header>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>

        {/* ── Left: Package summary ── */}
        <div>
          <div style={{
            background: '#fff', borderRadius: '12px',
            border: `2px solid ${accent}22`,
            overflow: 'hidden', marginBottom: '24px'
          }}>
            {/* Package header */}
            <div style={{ background: accent, padding: '24px 28px' }}>
              <div style={{
                display: 'inline-block', background: 'rgba(255,255,255,0.20)',
                borderRadius: '100px', padding: '4px 14px',
                fontSize: '12px', fontWeight: 700, color: '#fff',
                letterSpacing: '0.10em', textTransform: 'uppercase',
                marginBottom: '12px'
              }}>
                {pkg.tag}
              </div>
              <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.1 }}>
                {pkg.name}
              </h1>
            </div>

            {/* Package body */}
            <div style={{ padding: '28px' }}>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.60)', lineHeight: 1.6, marginBottom: '24px' }}>
                {pkg.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {pkg.includes.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: `${accent}18`, border: `1.5px solid ${accent}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', color: accent, fontWeight: 800, flexShrink: 0
                    }}>✓</div>
                    <span style={{ fontSize: '15px', color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex', gap: '0',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden'
              }}>
                {[['12', 'Sessions'], ['90', 'Days'], ['1', 'Psychologist'], ['CBT', 'Method']].map(([num, label], i) => (
                  <div key={i} style={{
                    flex: 1, padding: '14px 8px', textAlign: 'center',
                    borderRight: i < 3 ? '1px solid rgba(0,0,0,0.08)' : 'none'
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: 900, color: accent, lineHeight: 1 }}>{num}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '3px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cadabams trust badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '16px 20px', background: '#fff',
            borderRadius: '10px', border: '1px solid rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '24px' }}>🏥</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>Cadabams Group</div>
              <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)' }}>30+ years of clinical expertise · Full refund after session 1 if not satisfied</div>
            </div>
          </div>
        </div>

        {/* ── Right: Checkout panel ── */}
        <div>
          <div style={{
            background: '#fff', borderRadius: '12px',
            border: '1px solid rgba(0,0,0,0.08)',
            padding: '28px', position: 'sticky', top: '24px'
          }}>
            {/* Price */}
            <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.35)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Programme total
              </div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: '#1a1a1a', lineHeight: 1 }}>₹7,799</div>
              <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.40)', marginTop: '4px' }}>
                = ₹650/session · Full 90-day programme
              </div>
            </div>

            {/* ── STEP: Phone ── */}
            {step === 'phone' && (
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                  Verify your phone number
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)', marginBottom: '16px' }}>
                  We'll send you an OTP to confirm your identity
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <div style={{
                    padding: '12px 14px', background: '#f4f4f4',
                    borderRadius: '8px', fontSize: '15px', color: '#1a1a1a', fontWeight: 600
                  }}>+91</div>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    style={{
                      flex: 1, padding: '12px 14px',
                      border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: '8px',
                      fontSize: '15px', outline: 'none'
                    }}
                  />
                </div>
                {needEmail && (
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 14px',
                      border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: '8px',
                      fontSize: '15px', outline: 'none', marginBottom: '12px',
                      boxSizing: 'border-box'
                    }}
                  />
                )}
                {error && error !== 'phone_not_found' && <div style={{ fontSize: '13px', color: '#d00', marginBottom: '12px' }}>{error}</div>}
                {needEmail && <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.50)', marginBottom: '12px' }}>We'll create your account and send an OTP.</div>}
                <button
                  onClick={sendOTP}
                  disabled={phone.length !== 10 || loading}
                  style={{
                    width: '100%', padding: '16px',
                    background: phone.length === 10 && !loading ? accent : '#ccc',
                    color: '#fff', border: 'none', borderRadius: '8px',
                    fontSize: '16px', fontWeight: 800, cursor: phone.length === 10 ? 'pointer' : 'not-allowed',
                    letterSpacing: '0.04em', textTransform: 'uppercase'
                  }}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP →'}
                </button>
              </div>
            )}

            {/* ── STEP: OTP ── */}
            {step === 'otp' && (
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>
                  Enter OTP
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.45)', marginBottom: '16px' }}>
                  Sent to +91 {phone}
                  <button onClick={() => setStep('phone')} style={{ background: 'none', border: 'none', color: accent, cursor: 'pointer', fontSize: '13px', marginLeft: '8px' }}>
                    Change
                  </button>
                </div>
                <input
                  type="tel"
                  maxLength={4}
                  placeholder="4-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1.5px solid rgba(0,0,0,0.15)', borderRadius: '8px',
                    fontSize: '20px', letterSpacing: '0.3em', textAlign: 'center',
                    outline: 'none', marginBottom: '12px', boxSizing: 'border-box'
                  }}
                />
                {error && <div style={{ fontSize: '13px', color: '#d00', marginBottom: '12px' }}>{error}</div>}
                <button
                  onClick={verifyOTP}
                  disabled={otp.length < 4 || loading}
                  style={{
                    width: '100%', padding: '16px',
                    background: otp.length >= 4 && !loading ? accent : '#ccc',
                    color: '#fff', border: 'none', borderRadius: '8px',
                    fontSize: '16px', fontWeight: 800, cursor: otp.length >= 4 ? 'pointer' : 'not-allowed',
                    letterSpacing: '0.04em', textTransform: 'uppercase'
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify OTP →'}
                </button>
                <button onClick={sendOTP} style={{
                  width: '100%', marginTop: '10px', background: 'none',
                  border: 'none', fontSize: '13px', color: 'rgba(0,0,0,0.40)', cursor: 'pointer'
                }}>
                  Resend OTP
                </button>
              </div>
            )}

            {/* ── STEP: Confirm ── */}
            {step === 'confirm' && (
              <div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 16px', background: `${accent}12`,
                  borderRadius: '8px', marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '18px' }}>✅</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>Verified</div>
                    <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.50)' }}>{verifiedName}</div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px', fontSize: '14px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.5 }}>
                  You'll be redirected to our secure payment page. After payment, your 90-day journey will activate immediately in the app.
                </div>

                {error && <div style={{ fontSize: '13px', color: '#d00', marginBottom: '12px' }}>{error}</div>}

                <button
                  onClick={proceedToPayment}
                  disabled={loading}
                  style={{
                    width: '100%', padding: '18px',
                    background: accent, color: '#fff',
                    border: 'none', borderRadius: '8px',
                    fontSize: '18px', fontWeight: 900, cursor: 'pointer',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    boxShadow: `0 4px 20px ${accent}40`
                  }}
                >
                  Pay ₹7,799 →
                </button>

                <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '12px', color: 'rgba(0,0,0,0.30)' }}>
                  🔒 Secured by Razorpay · UPI · Cards · Net Banking
                </div>
              </div>
            )}

            {/* ── STEP: Paying ── */}
            {step === 'paying' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>Setting up secure payment...</div>
                <div style={{ fontSize: '13px', color: 'rgba(0,0,0,0.40)', marginTop: '8px' }}>You'll be redirected to Razorpay in a moment</div>
              </div>
            )}

            {/* Refund note */}
            <div style={{ marginTop: '20px', fontSize: '12px', color: 'rgba(0,0,0,0.30)', textAlign: 'center', lineHeight: 1.5 }}>
              Full refund available after session 1 if you're not satisfied.
              <br />Cadabams Group · 30+ years of clinical expertise
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
