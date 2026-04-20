import Link from 'next/link';

type CategoryNav = {
  cityLabel: string;
  links: { label: string; href: string }[];
};

type FooterProps = {
  citySlug?: string;
  cityName?: string;
  categoryNav?: CategoryNav;
  showIndustryCalendars?: boolean;
};

export function Footer({ citySlug, cityName, categoryNav }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <p className="footer-logo">Local Business Calendars</p>
            <p className="footer-tagline">Business events by city. Weekly newsletters. Always free.</p>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Texas Cities</p>
            <Link href="/texas/austin" className="footer-link">Austin</Link>
            <Link href="/texas/dallas" className="footer-link">Dallas</Link>
            <Link href="/texas/houston" className="footer-link">Houston</Link>
            <Link href="/texas/san-antonio" className="footer-link">San Antonio</Link>
          </div>

          {categoryNav && (
            <div className="footer-col">
              <p className="footer-col-title">{categoryNav.cityLabel}</p>
              {categoryNav.links.map((l) => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>
          )}

          <div className="footer-col">
            <p className="footer-col-title">Info</p>
            <Link href="/about" className="footer-link">About</Link>
            <Link href="/submit" className="footer-link">Submit an Event</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Local Business Calendars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
