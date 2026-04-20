import Link from 'next/link';

const CITIES = [
  { name: 'Austin', slug: 'austin' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'Houston', slug: 'houston' },
  { name: 'San Antonio', slug: 'san-antonio' },
];

export function HomepageCities() {
  return (
    <section style={{ padding: '64px 24px', background: '#f8fafc' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: 32 }}>Select Your City</h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {CITIES.map((city) => (
            <Link key={city.slug} href={`/texas/${city.slug}`} className="btn btn-primary">
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
