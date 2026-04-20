'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus, Search, Mail, Users, Clock, CalendarDays, Building2, Star } from 'lucide-react';
import { Navigation } from '../Navigation';
import { Breadcrumb } from '../Breadcrumb';
import { Footer } from '../Footer';
import { SEOHead } from '../SEOHead';
import { EventGate } from '../EventGate';
import { WhySection } from '../WhySection';
import type { Event } from '../../lib/supabase';

const STATS = [
  { number: '500+', label: 'Real estate professionals subscribed' },
  { number: '40+', label: 'Real estate organizations tracked' },
];

const TESTIMONIALS = [
  {
    quote: "I used to miss investor meetups and SA Board of Realtors events. Now everything is in one place.",
    name: 'Rachel T.',
    location: 'San Antonio, TX',
  },
  {
    quote: "The weekly real estate events newsletter keeps me in the loop on networking lunches and CE classes without any effort.",
    name: 'James W.',
    location: 'San Antonio, TX',
  },
  {
    quote: "As a commercial broker in San Antonio, staying connected to the real estate community is everything. This calendar makes it automatic.",
    name: 'Linda M.',
    location: 'San Antonio, TX',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What types of real estate events are listed?',
    answer: 'We track investor meetups, REIA meetings, broker networking events, real estate networking mixers, continuing education classes, property tours, market update seminars, and more across San Antonio.',
  },
  {
    question: 'Is this the same as the main San Antonio Business Calendar?',
    answer: 'No. The main San Antonio calendar shows all business and networking events. This page focuses exclusively on real estate, construction, and design events.',
  },
  {
    question: 'Is the newsletter really free?',
    answer: "Yes, completely free. No credit card, no trial period, no paid tier. Just enter your email and you'll receive San Antonio real estate events every Monday morning.",
  },
];

const ORGS = [
  'San Antonio Board of Realtors',
  'San Antonio Real Estate Investors',
  'CCIM San Antonio Chapter',
  'SA Apartment Association',
  'Women\'s Council of Realtors SA',
  'Texas Realtors SA Chapter',
  'San Antonio REIA',
  '... and many more',
];

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-trigger" onClick={onToggle} aria-expanded={open}>
        <span>{question}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function SanAntonioRealEstateContent({ initialEvents }: { initialEvents: Event[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="sa-page">
      <SEOHead
        title="San Antonio Real Estate Events Calendar | Free Weekly Real Estate Events Email"
        description="Find real estate networking, investor meetups, and construction events in San Antonio. Free weekly email every Monday."
        canonical="https://businesseventscalendars.com/texas/san-antonio/real-estate/"
        robots="noindex"
      />
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Calendars', href: '/' },
        { label: 'Texas', href: '/texas' },
        { label: 'San Antonio', href: '/texas/san-antonio' },
        { label: 'Real Estate Events' },
      ]} />
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="dot" style={{ background: '#f59e0b' }}></span>
            SAN ANTONIO REAL ESTATE CALENDAR
          </div>
          <h1>
            Real Estate, Construction &amp; Design Events in<br />
            <em>San Antonio</em>
          </h1>
          <p className="hero-subtext">Stop missing the real estate events that grow your network and your deals.</p>
          <div className="hero-category-tags">
            Real Estate &middot; Networking &middot; Property Trends &middot; Investor Meetups &middot; Commercial Deals
          </div>
          <div className="hero-cta-group">
            <Link href="/texas/san-antonio/subscribe" className="btn btn-white">
              Get My Free San Antonio Real Estate Events Newsletter
            </Link>
            <p className="hero-subtext-below">Browse the calendar anytime between newsletters. Always free.</p>
          </div>
        </div>
      </section>
      <section className="benefits-bar">
        <div className="benefits-bar-inner">
          <div className="benefit-item"><div className="benefit-icon"><CalendarDays size={20} strokeWidth={2} /></div><span>Events aggregated every week</span></div>
          <div className="benefit-item"><div className="benefit-icon"><Mail size={20} strokeWidth={2} /></div><span>Delivered every Monday morning</span></div>
          <div className="benefit-item"><div className="benefit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg></div><span>Access calendar anytime</span></div>
        </div>
      </section>
      <section className="sa-calendar-section" id="calendar">
        <div className="sa-calendar-header">
          <h2>Find Your Next San Antonio Real Estate Event</h2>
          <p>Browse investor meetups, broker networking, property tours, and more</p>
        </div>
        <EventGate forcedCity="San Antonio" groupType="real_estate" initialEvents={initialEvents} />
      </section>
      <section className="sa-orgs-section">
        <div className="sa-orgs-inner">
          <h2>San Antonio Real Estate Organizations We Track</h2>
          <p>We monitor events from San Antonio's top real estate communities so nothing slips through the cracks.</p>
          <div className="sa-orgs-grid">
            {ORGS.map((org, i) => (
              <div key={i} className="sa-org-tag"><Users size={14} strokeWidth={2} />{org}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="sp-section">
        <div className="sp-inner">
          <h2>Trusted by San Antonio Real Estate Professionals</h2>
          <p className="sp-subtitle">San Antonio Real Estate Calendar — By the Numbers</p>
          <div className="sp-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="sp-stat">
                <span className="sp-stat-number">{stat.number}</span>
                <span className="sp-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="sp-testimonials">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="sp-card">
                <div className="sp-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                <blockquote className="sp-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="sp-author"><span className="sp-name">&mdash; {t.name}</span><span className="sp-location">{t.location}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WhySection
        heading="Why San Antonio Real Estate Professionals Use This Calendar"
        subtitle="San Antonio real estate events are spread across too many platforms. Here's how Local Business Calendars helps professionals keep up."
        problemText="Real estate events in San Antonio are scattered across the SA Board of Realtors, Meetup, Eventbrite, LinkedIn, and individual brokerage websites."
        whatWeDoText="We track real estate event hosts across San Antonio and organize their public events into one city-focused calendar — updated every week."
        whatYouGetText="Less searching, better event discovery, and a weekly event newsletter that helps you stay up to date."
      />
      <section className="sa-subscribe-section" id="sa-subscribe">
        <div className="sa-subscribe-inner">
          <div className="sa-subscribe-badge"><Clock size={14} />Free · Takes 30 seconds</div>
          <h2>Get San Antonio Real Estate Events Every Monday — Free</h2>
          <p>A curated digest of that week's real estate events in San Antonio, delivered every Monday morning.</p>
          <div className="sa-subscribe-actions">
            <Link href="/texas/san-antonio/subscribe" className="btn btn-gold">Get the Weekly Newsletter — Free</Link>
          </div>
          <div className="sa-subscribe-secondary-cta">
            <Link href="/submit" className="btn btn-accent">Submit a Real Estate Event</Link>
          </div>
        </div>
      </section>
      <div className="sa-back-link"><Link href="/texas/san-antonio">See all San Antonio business events &rarr;</Link></div>
      <section className="faq-section">
        <div className="faq-inner">
          <h2>Frequently Asked Questions About San Antonio Real Estate Events</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>
      <Footer
        citySlug="san-antonio"
        cityName="San Antonio"
        categoryNav={{
          cityLabel: "Also in San Antonio:",
          links: [
            { label: "Technology Events", href: "/texas/san-antonio/technology" },
            { label: "Chamber Events", href: "/texas/san-antonio/chamber" },
            { label: "Small Business Events", href: "/texas/san-antonio/small-business" },
            { label: "Networking Events", href: "/texas/san-antonio/networking" },
          ],
        }}
      />
    </div>
  );
}

export function SanAntonioRealEstatePage({ initialEvents }: { initialEvents: Event[] }) {
  return <SanAntonioRealEstateContent initialEvents={initialEvents} />;
}
