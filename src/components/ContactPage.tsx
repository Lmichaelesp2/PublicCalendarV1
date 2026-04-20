'use client';
import { useState } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { supabase } from '../lib/supabase';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('contact_inquiries').insert({ name, email, message });
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }
  }

  return (
    <div className="sa-page">
      <Navigation />
      <section style={{ padding: '64px 24px', maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>Contact Us</h1>
        <p style={{ color: '#64748b', marginBottom: 32 }}>Have a question or suggestion? We'd love to hear from you.</p>
        {status === 'success' ? (
          <p style={{ color: '#10b981', fontWeight: 600 }}>Message sent! We'll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: '0.875rem' }}>Name</label>
              <input className="auth-input" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: '0.875rem' }}>Email</label>
              <input type="email" className="auth-input" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: '0.875rem' }}>Message</label>
              <textarea className="auth-input" rows={5} value={message} onChange={e => setMessage(e.target.value)} required style={{ resize: 'vertical' }} />
            </div>
            {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>Something went wrong. Please try again.</p>}
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
}
