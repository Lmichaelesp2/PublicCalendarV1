import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function PrivacyPage() {
  return (
    <div className="sa-page">
      <Navigation />
      <section style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24 }}>Privacy Policy</h1>
        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: 16 }}>Last updated: {new Date().getFullYear()}</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Information We Collect</h2>
          <p style={{ marginBottom: 16 }}>We collect email addresses when you subscribe to our newsletter. We do not sell or share your email with third parties.</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>How We Use Your Information</h2>
          <p style={{ marginBottom: 16 }}>Your email address is used solely to send you the weekly business events newsletter. You can unsubscribe at any time.</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Cookies</h2>
          <p style={{ marginBottom: 16 }}>We use standard analytics cookies to understand how visitors use our site. No personally identifiable information is collected through cookies.</p>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8, marginTop: 24, color: '#0f172a' }}>Contact</h2>
          <p>If you have any questions about this privacy policy, please contact us through our contact page.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
