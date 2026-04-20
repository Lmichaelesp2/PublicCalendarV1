import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function TermsPage() {
  return (
    <div className="sa-page">
      <Navigation />
      <section style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>Terms of Service</h1>
        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: 16 }}>Last updated: {new Date().getFullYear()}</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Use of Service</h2>
          <p style={{ marginBottom: 16 }}>Local Business Calendars provides a free event aggregation and newsletter service. By using this site, you agree to these terms.</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Content</h2>
          <p style={{ marginBottom: 16 }}>Event information is aggregated from public sources. We make no guarantees about the accuracy of event details. Always verify event information with the organizer.</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Event Submissions</h2>
          <p style={{ marginBottom: 16 }}>Events submitted to our calendar are subject to review and approval. We reserve the right to reject any submission.</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Limitation of Liability</h2>
          <p>Local Business Calendars is not liable for any damages arising from use of this service or attendance at any listed events.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
