import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Texas Business Calendars saved me hours every week. All the events I care about, in one place.",
    name: 'Jennifer L.',
    location: 'Austin, TX',
  },
  {
    quote: "I've been to more networking events in the last two months than in the past year. The Monday email makes it effortless.",
    name: 'Michael B.',
    location: 'Dallas, TX',
  },
  {
    quote: "This calendar is how I stay connected to the Houston business community.",
    name: 'Priya K.',
    location: 'Houston, TX',
  },
];

export function SocialProof() {
  return (
    <section className="sp-section">
      <div className="sp-inner">
        <h2>Trusted by Texas Business Professionals</h2>
        <div className="sp-testimonials">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="sp-card">
              <div className="sp-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="sp-quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="sp-author">
                <span className="sp-name">&mdash; {t.name}</span>
                <span className="sp-location">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
