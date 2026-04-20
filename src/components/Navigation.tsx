'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const CITIES = [
  { label: 'Austin', href: '/texas/austin' },
  { label: 'Dallas', href: '/texas/dallas' },
  { label: 'Houston', href: '/texas/houston' },
  { label: 'San Antonio', href: '/texas/san-antonio' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Local Business Calendars
        </Link>

        <div className="nav-links">
          <div className="nav-dropdown" onMouseEnter={() => setCitiesOpen(true)} onMouseLeave={() => setCitiesOpen(false)}>
            <button className="nav-link nav-link-dropdown">
              Texas <ChevronDown size={14} />
            </button>
            {citiesOpen && (
              <div className="nav-dropdown-menu">
                {CITIES.map((c) => (
                  <Link key={c.href} href={c.href} className="nav-dropdown-item">
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/submit" className="nav-link">Submit Event</Link>
        </div>

        <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="nav-mobile-menu">
          <div className="nav-mobile-section">
            <p className="nav-mobile-label">Texas Cities</p>
            {CITIES.map((c) => (
              <Link key={c.href} href={c.href} className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
                {c.label}
              </Link>
            ))}
          </div>
          <Link href="/about" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/submit" className="nav-mobile-link" onClick={() => setMobileOpen(false)}>Submit Event</Link>
        </div>
      )}
    </nav>
  );
}
