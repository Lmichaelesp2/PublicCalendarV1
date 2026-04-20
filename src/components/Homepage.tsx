'use client';
import Link from 'next/link';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

const CITIES = [
  {
    name: 'Austin',
    href: '/texas/austin',
    description: 'Technology, Real Estate, Chamber, Small Business & Networking events.',
    categories: ['Technology', 'Real Estate', 'Chamber', 'Small Business', 'Networking'],
  },
  {
    name: 'Dallas',
    href: '/texas/dallas',
    description: 'Business events across DFW for every industry.',
    categories: ['Technology', 'Real Estate', 'Chamber', 'Small Business', 'Networking'],
  },
  {
    name: 'Houston',
    href: '/texas/houston',
    description: 'Networking, industry events, and chamber gatherings in Houston.',
    categories: ['Technology', 'Real Estate', 'Chamber', 'Small Business', 'Networking'],
  },
  {
    name: 'San Antonio',
    href: '/texas/san-antonio',
    description: 'Business community events across the Alamo City.',
    categories: ['Technology', 'Real Estate', 'Chamber', 'Small Business', 'Networking'],
  },
];

export function Homepage() {
  return (
    <div className="home-page">
      <Navigation />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">LOCAL BUSINESS CALENDARS</div>
          <h1>Find Business Events<br /><em>By City &amp; Industry</em></h1>
          <p className="hero-subtext">
            Business networking events, chamber gatherings, tech meetups, real estate events, and more — organized by city and industry. Free weekly newsletters.
          </p>
          <div className="hero-cta-group">
            <Link href="/texas" className="btn btn-white">Browse Texas Events</Link>
          </div>
        </div>
      </section>

      <section className="cities-section">
        <div className="cities-inner">
          <h2>Texas Business Calendars</h2>
          <p className="cities-subtitle">Select a city to browse events by industry</p>
          <div className="cities-grid">
            {CITIES.map((city) => (
              <Link key={city.name} href={city.href} className="city-card">
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                <div className="city-categories">
                  {city.categories.map((cat) => (
                    <span key={cat} className="city-cat-tag">{cat}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
