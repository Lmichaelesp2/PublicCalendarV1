'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Check } from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { supabase } from '../lib/supabase';

const CITY_NAMES: Record<string, string> = {
  austin: 'Austin',
  dallas: 'Dallas',
  houston: 'Houston',
  'san-antonio': 'San Antonio',
};

export function SubscribePage() {
  const params = useParams();
  const citySlug = (params?.citySlug as string) ?? '';
  const cityName = CITY_NAMES[citySlug] ?? 'Your City';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('assistant_waitlist')
      .insert({ email: email.trim(), city: cityName });

    if (error && !error.message.includes('duplicate')) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    } else {
      setStatus('success');
      setEmail('');
    }
  }

  return (
    <div className="sa-page">
      <Navigation />
      <section style={{ padding: '80px 24px', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#1d4ed8' }}>
          <Mail size={24} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
          Get {cityName} Business Events Every Monday
        </h1>
        <p style={{ color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
          A curated digest of that week's business networking events in {cityName}, delivered to your inbox every Monday morning. Free — no spam, no credit card.
        </p>

        {status === 'success' ? (
          <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 12, padding: '24px 32px', color: '#065f46', display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
            <Check size={20} />
            <span style={{ fontWeight: 600 }}>You're subscribed! See you Monday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              className="auth-input"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ flex: 1, minWidth: 200, maxWidth: 320 }}
            />
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
            </button>
          </form>
        )}

        {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: 8 }}>{errorMsg}</p>}

        <p style={{ marginTop: 24, fontSize: '0.8rem', color: '#94a3b8' }}>
          <Link href={`/texas/${citySlug}`} style={{ color: '#1d4ed8' }}>
            &larr; Back to {cityName} calendar
          </Link>
        </p>
      </section>
      <Footer citySlug={citySlug} cityName={cityName} />
    </div>
  );
}
