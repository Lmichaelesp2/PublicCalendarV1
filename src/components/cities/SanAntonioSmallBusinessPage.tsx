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
  { number: '500+', label: 'Small business owners subscribed' },
  { number: '35+', label: 'Small business organizations tracked' },
];

const TESTIMONIALS = [
  {
    quote: "SCORE workshops, SBA seminars, and local entrepreneur meetups — all in one place. This calendar has been a lifeline for my growing business.",
    name: 'Maria G.',
    location: 'San Antonio, TX',
  },
  {
    quote: "I used to miss free workshops because I didn't know they existed. Now the weekly email keeps me in the loop every Monday.",
    name: 'Tony R.',
    location: 'San Antonio, TX',
  },
  {
    quote: "As a solopreneur in San Antonio, networking events designed for small businesses are where I find clients and partners.",
    name: 'Keisha B.',
    location: 'San Antonio, TX',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What types of organizations are included?',
    answer: 'We track SCORE San Antonio, SBA San Antonio District, the UTSA Small Business Development Center, coworking community events, and small business-focused networking organizations throughout San Antonio.',
  },
  {
    question: 'Is this the same as the main San Antonio Business Calendar?',
    answer: 'No. This page focuses exclusively on events designed for small business owners and entrepreneurs.',
  },
  {
    question: 'Is the newsletter really free?',
    answer: "Yes, completely free. No credit card, no trial period, no paid tier. Just enter your email and you'll receive San Antonio small business events every Monday morning.",
  },
];

const ORGS = [
  'SCORE San Antonio',
  'SBA San Antonio District',
  'UTSA SBDC',
  'SA Small Business Network',
  'NAWBO San Antonio',
  'SA Hispanic Entrepreneurs',
  'SA Public Library Biz Center',
  '... and many more',
];

function FaqItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
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

function SanAntonioSmallBusinessContent({ initialEvents }: { initialEvents: Event[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="sa-page">
      <SEOHead
        title="San Antonio Small Business Events Calendar | Free Weekly Small Business Events Email"
        description="Find small business workshops, entrepreneur events, and small business networking in San Antonio. Free weekly email every Monday."
        canonical="https://businesseventscalendars.com/texas/san-antonio/small-business/"
        robots="noindex"
      />
      <Navigation />
      <Breadcrumb items={[
        { label: 'Local Business Calendars', href: '/' },
        { label: 'Texas', href: '/texas' },
        { label: 'San Antonio', href: '/texas/san-antonio' },
        { label: 'Small Business Events' },
      ]} />
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="dot" style={{ background: '#3b82f6' }}></span>
            SAN ANTONIO SMALL BUSINESS CALENDAR
          </div>
          <h1>Small Business Events in<br /><em>San Antonio</em></h1>
          <p className="hero-subtext">Stop missing the small business events that help you grow your business.</p>
          <div className="hero-category-tags">Small Business &middot; Entrepreneur &middot; Workshops &middot; Mentorship &middot; Funding</div>
          <div className="hero-cta-group">
            <Link href="/texas/san-antonio/subscribe" className="btn btn-white">
              Get My Free San Antonio Small Business Events Newsletter
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
          <h2>Find Your Next San Antonio Small Business Event</h2>
          <p>Browse SCORE workshops, SBA seminars, entrepreneur meetups, and more</p>
        </div>
        <EventGate forcedCity="San Antonio" groupType="small_business" initialEvents={initialEvents} />
      </section>
      <section className="sa-orgs-section">
        <div className="sa-orgs-inner">
          <h2>San Antonio Small Business Organizations We Track</h2>
          <p>We monitor events from San Antonio's top small business resources so nothing slips through the cracks.</p>
          <div className="sa-orgs-grid">
            {ORGS.map((org, i) => <div key={i} className="sa-org-tag"><Users size={14} strokeWidth={2} />{org}</div>)}
          </div>
        </div>
      </section>
      <section className="sp-section">
        <div className="sp-inner">
          <h2>Trusted by San Antonio Small Business Owners</h2>
          <p className="sp-subtitle">San Antonio Small Business Calendar — By the Numbers</p>
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
        heading="Why San Antonio Small Business Professionals Use This Calendar"
        subtitle="San Antonio small business events are spread across too many platforms."
        problemText="Small business events in San Antonio are scattered across SCORE, SBA, SBDC, coworking spaces, and individual organizations."
        whatWeDoText="We track small business event hosts across San Antonio and organize their public events into one city-focused calendar — updated every week."
        whatYouGetText="Less searching, better event discovery, and a weekly event newsletter that helps you stay up to date."
      />
      <section className="sa-subscribe-section" id="sa-subscribe">
        <div className="sa-subscribe-inner">
          <div className="sa-subscribe-badge"><Clock size={14} />Free · Takes 30 seconds</div>
          <h2>Get San Antonio Small Business Events Every Monday — Free</h2>
          <p>A curated digest of that week's small business events in San Antonio, delivered every Monday morning.</p>
          <div className="sa-subscribe-actions">
            <Link href="/texas/san-antonio/subscribe" className="btn btn-gold">Get the Weekly Newsletter — Free</Link>
          </div>
          <div className="sa-subscribe-secondary-cta">
            <Link href="/submit" className="btn btn-accent">Submit a Small Business Event</Link>
          </div>
        </div>
      </section>
      <div className="sa-back-link"><Link href="/texas/san-antonio">See all San Antonio business events &rarr;</Link></div>
      <section className="faq-section">
        <div className="faq-inner">
          <h2>Frequently Asked Questions About San Antonio Small Business Events</h2>
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
            { label: "Real Estate Events", href: "/texas/san-antonio/real-estate" },
            { label: "Chamber Events", href: "/texas/san-antonio/chamber" },
            { label: "Networking Events", href: "/texas/san-antonio/networking" },
          ],
        }}
      />
    </div>
  );
}

export function SanAntonioSmallBusinessPage({ initialEvents }: { initialEvents: Event[] }) {
  return <SanAntonioSmallBusinessContent initialEvents={initialEvents} />;
}
