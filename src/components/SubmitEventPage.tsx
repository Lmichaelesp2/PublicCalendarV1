'use client';
import { useState } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { supabase } from '../lib/supabase';

export function SubmitEventPage() {
  const [form, setForm] = useState({
    name: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    website: '',
    description: '',
    paid: 'Free',
    address: '',
    org_name: '',
    participation: 'In-Person',
    city_calendar: 'Austin',
    event_category: '',
    submitter_email: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('event_submissions').insert({
      ...form,
      status: 'pending',
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  }

  const labelStyle = { display: 'block', fontWeight: 600, marginBottom: 6, fontSize: '0.875rem', color: '#334155' };
  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none' };

  return (
    <div className="sa-page">
      <Navigation />
      <section style={{ padding: '64px 24px', maxWidth: 640, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>Submit an Event</h1>
        <p style={{ color: '#64748b', marginBottom: 32 }}>Submit a business event for review. Approved events will appear in the calendar.</p>

        {status === 'success' ? (
          <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 8, padding: '24px', color: '#065f46', fontWeight: 600 }}>
            Thank you! Your event has been submitted for review. We'll add it to the calendar once approved.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={labelStyle}>Event Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input type="date" style={inputStyle} value={form.start_date} onChange={e => update('start_date', e.target.value)} required />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input type="time" style={inputStyle} value={form.start_time} onChange={e => update('start_time', e.target.value)} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>City *</label>
              <select style={inputStyle} value={form.city_calendar} onChange={e => update('city_calendar', e.target.value)}>
                <option value="Austin">Austin</option>
                <option value="Dallas">Dallas</option>
                <option value="Houston">Houston</option>
                <option value="San Antonio">San Antonio</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.event_category} onChange={e => update('event_category', e.target.value)}>
                <option value="">General Business</option>
                <option value="technology">Technology</option>
                <option value="real_estate">Real Estate</option>
                <option value="chamber">Chamber</option>
                <option value="small_business">Small Business</option>
                <option value="networking">Networking</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Organization Name</label>
              <input style={inputStyle} value={form.org_name} onChange={e => update('org_name', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Address</label>
              <input style={inputStyle} value={form.address} onChange={e => update('address', e.target.value)} placeholder="123 Main St, Austin, TX" />
            </div>
            <div>
              <label style={labelStyle}>Event Website / Registration URL</label>
              <input type="url" style={inputStyle} value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://" />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={4} value={form.description} onChange={e => update('description', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Cost</label>
                <select style={inputStyle} value={form.paid} onChange={e => update('paid', e.target.value)}>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Format</label>
                <select style={inputStyle} value={form.participation} onChange={e => update('participation', e.target.value)}>
                  <option value="In-Person">In-Person</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Your Email (optional)</label>
              <input type="email" style={inputStyle} value={form.submitter_email} onChange={e => update('submitter_email', e.target.value)} />
            </div>
            {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>Something went wrong. Please try again.</p>}
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
              {status === 'loading' ? 'Submitting...' : 'Submit Event'}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
}
