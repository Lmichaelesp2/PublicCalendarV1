'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus, CalendarDays, Search, Mail, Monitor, Users, Clock, Star } from 'lucide-react';
import { Navigation } from '../Navigation';
import { Breadcrumb } from '../Breadcrumb';
import { Footer } from '../Footer';
import { SEOHead } from '../SEOHead';
import { EventGate } from '../EventGate';
import { WhySection } from '../WhySection';
import type { Event } from '../../lib/supabase';

const TECH_STATS = [
  { number: '500+', label: 'Tech professionals subscribed' },
  { number: '30+', label: 'Tech organizations tracked' },
];

const TECH_TESTIMONIALS = [
  {
    quote: "I finally have one place for all the tech meetups and startup events in San Antonio. No more scrolling through five different platforms.",
    name: 'David R.',
    location: 'San Antonio, TX',
  },
  {
    quote: "The weekly tech events newsletter is a game-changer. I've attended more meetups in the last month than I did all last year.",
    name: 'Priya K.',
    location: 'San Antonio, TX',
  },
  {
    quote: "As a startup founder in San Antonio, staying plugged into the tech scene is critical. This calendar makes it effortless.",
    name: 'Carlos G.',
    location: 'San Antonio, TX',
  },
];

const TECH_FAQ = [
  {
    question: 'What types of technology events are listed?',
    answer: 'We track software development meetups, AI/ML workshops, startup pitch nights, tech networking mixers, hackathons, and more across San Antonio.',
  },
  {
    question: 'Is this the same as the main San Antonio Business Calendar?',
    answer: 'No. This page focuses exclusively on technology-related events, making it easier for tech professionals to find what matters most.',
  },
  {
    question: 'Is the newsletter really free?',
    answer: "Yes, completely free. No credit card, no trial period, no paid tier. Just enter your email and you'll receive San Antonio technology events every Monday morning.",
  },
];

const TECH_ORGS = [
  'SA Technology Council',
  'San Antonio Startups',
  'Google Developer Group SA',
  'SA AI & Machine Learning',
  'Women Who Code SA',
  'SA Data Science',
  'SA AWS User Group',
  '... and many more',
];

function TechFaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-trigger" onClick={onToggle} aria-expanded={open}>
        <span>{question}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>
      <div className="faq-answer"><p>{answer}</p></div>
    </div>
  );
}

function SanAntonioTechnologyContent({ initialEvents }: { initialEvents: Event[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="sa-page">
      <SEOHead
        title="San Antonio Technology Events Calendar | Free Weekly Tech Events Email"
        description="Find tech meetups, developer groups, startup events, and technology networking in San Antonio. Free weekly email every Monday."
        canonical="https://businesseventscalendars.com/texas/san-antonio/technology/"
        robots="noindex"
      />
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Calendars', href: '/' },
        { label: 'Texas', href: '/texas' },
        { label: 'San Antonio', href: '/texas/san-antonio' },
        { label: 'Technology Events' },
      ]} />
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">SAN ANTONIO TECHNOLOGY CALENDAR</div>
          <h1>Technology Events in<br /><em>San Antonio</em></h1>
          <p className="hero-subtext">Stop missing the tech events that grow your network and your career.</p>
          <div className="hero-category-tags">Technology &middot; Software &middot; Startups &middot; Dev Meetups &middot; Tech Talks</div>
          <div className="hero-cta-group">
            <Link href="/texas/san-antonio/subscribe" className="btn btn-white">
              Get My Free San Antonio Technology Events Newsletter
            </Link>
            <p className="hero-subtext-below">Browse the calendar anytime between newsletters. Always free.</p>
          </div>
        </div>
      </section>
      <section className="benefits-bar">
        <div className="benefits-bar-inner">
          <div className="benefit-item"><div className="benefit-icon"><CalendarDays size={20} strokeWidth={2} /></div><span>Tech events aggregated every week</span></div>
          <div className="benefit-item"><div className="benefit-icon"><Mail size={20} strokeWidth={2} /></div><span>Delivered every Monday morning</span></div>
          <div className="benefit-item"><div className="benefit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg></div><span>Access calendar anytime</span></div>
        </div>
      </section>
      <section className="sa-calendar-section" id="calendar">
        <div className="sa-calendar-header">
          <h2>Find Your Next San Antonio Tech Event</h2>
          <p>Browse developer meetups, startup events, hackathons, and more</p>
        </div>
        <EventGate forcedCity="San Antonio" groupType="technology" initialEvents={initialEvents} />
      </section>
      <section className="sa-orgs-section">
        <div className="sa-orgs-inner">
          <h2>San Antonio Tech Organizations We Track</h2>
          <p>We monitor events from San Antonio's top technology communities so nothing slips through the cracks.</p>
          <div className="sa-orgs-grid">
            {TECH_ORGS.map((org, i) => <div key={i} className="sa-org-tag"><Users size={14} strokeWidth={2} />{org}</div>)}
          </div>
        </div>
      </section>
      <section className="sp-section">
        <div className="sp-inner">
          <h2>Trusted by San Antonio Tech Professionals</h2>
          <p className="sp-subtitle">San Antonio Technology Calendar — By the Numbers</p>
          <div className="sp-stats">
            {TECH_STATS.map((stat) => (
              <div key={stat.label} className="sp-stat">
                <span className="sp-stat-number">{stat.number}</span>
                <span className="sp-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="sp-testimonials">
            {TECH_TESTIMONIALS.map((t) => (
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
        heading="San Antonio's Technology Community"
        subtitle="San Antonio technology events are spread across too many platforms. Here's how Local Business Calendars helps tech professionals keep up."
        problemText="Tech events are buried across Meetup, Eventbrite, LinkedIn, Slack channels, and individual org websites."
        whatWeDoText="We monitor San Antonio's top tech organizations and platforms, then organize their events into one focused calendar updated weekly."
        whatYouGetText="Less searching, better event discovery, and a weekly event newsletter that helps you stay up to date."
      />
      <section className="sa-subscribe-section" id="sa-subscribe">
        <div className="sa-subscribe-inner">
          <div className="sa-subscribe-badge"><Clock size={14} />Free · Takes 30 seconds</div>
          <h2>Get San Antonio Tech Events Every Monday — Free</h2>
          <p>A curated digest of that week's technology events in San Antonio, delivered every Monday morning.</p>
          <div className="sa-subscribe-actions">
            <Link href="/texas/san-antonio/subscribe" className="btn btn-gold">Get the Weekly Newsletter — Free</Link>
          </div>
          <div className="sa-subscribe-secondary-cta">
            <Link href="/submit" className="btn btn-accent">Submit a Tech Event</Link>
          </div>
        </div>
      </section>
      <div className="sa-back-link"><Link href="/texas/san-antonio">See all San Antonio business events &rarr;</Link></div>
      <section className="faq-section">
        <div className="faq-inner">
          <h2>Frequently Asked Questions About San Antonio Technology Events</h2>
          <div className="faq-list">
            {TECH_FAQ.map((item, i) => (
              <TechFaqItem key={i} question={item.question} answer={item.answer} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
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
            { label: "Real Estate Events", href: "/texas/san-antonio/real-estate" },
            { label: "Chamber Events", href: "/texas/san-antonio/chamber" },
            { label: "Small Business Events", href: "/texas/san-antonio/small-business" },
            { label: "Networking Events", href: "/texas/san-antonio/networking" },
          ],
        }}
      />
    </div>
  );
}

export function SanAntonioTechnologyPage({ initialEvents }: { initialEvents: Event[] }) {
  return <SanAntonioTechnologyContent initialEvents={initialEvents} />;
}
