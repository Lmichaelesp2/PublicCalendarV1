import Link from 'next/link';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import type { Event } from '../lib/supabase';

const TEXAS_CITIES = [
  {
    name: 'Austin',
    slug: 'austin',
    description: 'Technology, Real Estate, Chamber, Small Business & Networking events.',
    logo: '/logos/austin-business-calendar-01.png',
    categories: [
      { label: 'Technology', href: '/texas/austin/technology' },
      { label: 'Real Estate', href: '/texas/austin/real-estate' },
      { label: 'Chamber', href: '/texas/austin/chamber' },
      { label: 'Small Business', href: '/texas/austin/small-business' },
      { label: 'Networking', href: '/texas/austin/networking' },
    ],
  },
  {
    name: 'Dallas',
    slug: 'dallas',
    description: 'Business events across DFW for every industry.',
    logo: '/logos/dallas-business-calendar-01.png',
    categories: [
      { label: 'Technology', href: '/texas/dallas/technology' },
      { label: 'Real Estate', href: '/texas/dallas/real-estate' },
      { label: 'Chamber', href: '/texas/dallas/chamber' },
      { label: 'Small Business', href: '/texas/dallas/small-business' },
      { label: 'Networking', href: '/texas/dallas/networking' },
    ],
  },
  {
    name: 'Houston',
    slug: 'houston',
    description: 'Networking, industry events, and chamber gatherings.',
    logo: '/logos/houston-business-calendar-01.png',
    categories: [
      { label: 'Technology', href: '/texas/houston/technology' },
      { label: 'Real Estate', href: '/texas/houston/real-estate' },
      { label: 'Chamber', href: '/texas/houston/chamber' },
      { label: 'Small Business', href: '/texas/houston/small-business' },
      { label: 'Networking', href: '/texas/houston/networking' },
    ],
  },
  {
    name: 'San Antonio',
    slug: 'san-antonio',
    description: 'Business community events across the Alamo City.',
    logo: '/logos/san-antonio-business-calendar-01.png',
    categories: [
      { label: 'Technology', href: '/texas/san-antonio/technology' },
      { label: 'Real Estate', href: '/texas/san-antonio/real-estate' },
      { label: 'Chamber', href: '/texas/san-antonio/chamber' },
      { label: 'Small Business', href: '/texas/san-antonio/small-business' },
      { label: 'Networking', href: '/texas/san-antonio/networking' },
    ],
  },
];

type TexasMainLayoutProps = {
  initialEvents: Event[];
};

export function TexasMainLayout({ initialEvents }: TexasMainLayoutProps) {
  return (
    <div className="sa-page">
      <Navigation />
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">TEXAS BUSINESS CALENDARS</div>
          <h1>Texas Business Events<br /><em>By City &amp; Industry</em></h1>
          <p className="hero-subtext">
            Business networking events, chamber gatherings, tech meetups, real estate events, and more — organized by city and industry. Free weekly newsletters.
          </p>
        </div>
      </section>

      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 8, textAlign: 'center' }}>
            Browse by City
          </h2>
          <p style={{ color: '#64748b', textAlign: 'center', marginBottom: 40 }}>
            Select a city and industry to find relevant events
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {TEXAS_CITIES.map((city) => (
              <div key={city.slug} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, background: '#fff' }}>
                <Link href={`/texas/${city.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>
                    {city.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: 20, lineHeight: 1.5 }}>
                    {city.description}
                  </p>
                </Link>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {city.categories.map((cat) => (
                    <Link key={cat.href} href={cat.href} style={{ padding: '4px 12px', background: '#eff6ff', color: '#1d4ed8', borderRadius: 100, fontSize: '0.775rem', fontWeight: 600, textDecoration: 'none' }}>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
