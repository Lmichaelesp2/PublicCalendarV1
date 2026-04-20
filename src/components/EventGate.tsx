'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, X, Mail, Check } from 'lucide-react';
import type { Event, City } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { dateKey, formatDate, parseDate, sortEventsByTime, useMidnightReset, getWeekStart, getWeekEnd } from '../lib/utils';
import { resolveGroupType } from '../lib/cities';
import { EventCard } from './EventCard';

interface EventGateProps {
  initialEvents: Event[];
  forcedCity?: City;
  groupType?: string;
  newsletterHeading?: string;
  newsletterSubtext?: string;
  citySlug?: string;
  showMonthCalendar?: boolean;
}

export function EventGate({
  initialEvents,
  forcedCity,
  groupType,
  newsletterHeading,
  newsletterSubtext,
  citySlug,
}: EventGateProps) {
  const today = useMidnightReset();
  const [liveEvents, setLiveEvents] = useState<Event[] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [weekStart, setWeekStart] = useState<string>(() => {
    return dateKey(getWeekStart(new Date()));
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');

  useEffect(() => {
    async function fetchLive() {
      const past7 = new Date();
      past7.setDate(past7.getDate() - 7);
      const past7Str = past7.toISOString().split('T')[0];
      const future90 = new Date();
      future90.setDate(future90.getDate() + 90);
      const future90Str = future90.toISOString().split('T')[0];

      let query = supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .gte('start_date', past7Str)
        .lte('start_date', future90Str)
        .order('start_date', { ascending: true });

      if (forcedCity) query = query.eq('city_calendar', forcedCity);
      if (groupType) query = query.eq('event_category', resolveGroupType(groupType));

      const { data } = await query;
      if (data) setLiveEvents(data as Event[]);
    }
    fetchLive();
  }, [forcedCity, groupType]);

  const eventsSource = liveEvents ?? initialEvents;
  const cityFiltered = eventsSource.filter((e) => {
    if (forcedCity && e.city_calendar !== forcedCity) return false;
    if (groupType && e.event_category !== resolveGroupType(groupType)) return false;
    return true;
  });

  const weekEnd = dateKey(getWeekEnd(parseDate(weekStart)));

  function stepWeek(direction: 1 | -1) {
    const current = parseDate(weekStart);
    current.setDate(current.getDate() + direction * 7);
    const newStart = dateKey(getWeekStart(current));
    setWeekStart(newStart);
    setSearchQuery('');
  }

  const todayWeekStart = dateKey(getWeekStart(new Date()));
  const isPrevDisabled = weekStart <= todayWeekStart;

  const searchActive = searchQuery.trim().length > 0;

  let displayEvents: Event[];
  if (searchActive) {
    const q = searchQuery.toLowerCase();
    displayEvents = cityFiltered
      .filter((e) => {
        const text = `${e.name} ${e.description ?? ''} ${e.org_name ?? ''} ${e.address ?? ''} ${e.participation ?? ''} ${e.paid ?? ''}`.toLowerCase();
        return text.includes(q);
      })
      .sort((a, b) => a.start_date.localeCompare(b.start_date));
  } else {
    displayEvents = sortEventsByTime(
      cityFiltered.filter((e) => e.start_date >= weekStart && e.start_date <= weekEnd)
    );
  }

  const eventCount = displayEvents.length;

  const weekStartParsed = parseDate(weekStart);
  const weekEndParsed = parseDate(weekEnd);
  const weekLabel = searchActive
    ? 'Search Results'
    : `${weekStartParsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekEndParsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  const isCurrentWeek = weekStart === todayWeekStart;

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus('loading');
    setNewsletterError('');

    const { error } = await supabase
      .from('assistant_waitlist')
      .insert({ email: newsletterEmail.trim(), city: forcedCity ?? null });

    if (error && !error.message.includes('duplicate')) {
      setNewsletterStatus('error');
      setNewsletterError('Something went wrong. Please try again.');
    } else {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }
  }

  const defaultHeading = newsletterHeading ?? `Get ${forcedCity ?? ''} Events Every Monday — Free`;
  const defaultSubtext = newsletterSubtext ?? `A curated digest of that week's${groupType ? ` ${groupType.replace('_', ' ')}` : ' business'} events in ${forcedCity ?? 'your city'}, delivered every Monday morning. No spam — just the events worth your time.`;

  return (
    <div className="ev-gate-wrap">
      <div className="cal-inner">
        <div className="cal-search-row">
          <div className="cal-search-wrap">
            <Search size={15} className="cal-search-icon" />
            <input
              type="text"
              className="cal-search-input"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="cal-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <div className="cal-day-nav">
          <button
            className="cal-day-arrow"
            onClick={() => stepWeek(-1)}
            disabled={isPrevDisabled}
            aria-label="Previous week"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="cal-day-center">
            <div className="cal-day-name">{isCurrentWeek && !searchActive ? 'This Week' : weekLabel}</div>
            <div className="cal-day-full">
              {searchActive ? `${eventCount} result${eventCount !== 1 ? 's' : ''}` : weekLabel}
            </div>
            <div className="cal-day-count">
              {eventCount} event{eventCount !== 1 ? 's' : ''}
            </div>
          </div>

          <button
            className="cal-day-arrow"
            onClick={() => stepWeek(1)}
            aria-label="Next week"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="ev-list" style={{ marginTop: '0.5rem' }}>
          {displayEvents.length === 0 ? (
            <div className="no-ev">
              <p>{searchActive ? 'No events match your search.' : 'No events scheduled for this week.'}</p>
            </div>
          ) : (
            <>
              <div className="cal-results-label">
                <span>{weekLabel}</span>
                <span className="cal-results-count">{eventCount} event{eventCount !== 1 ? 's' : ''}</span>
              </div>
              {displayEvents.map((event, index) => {
                const showDivider = index === 0 || displayEvents[index - 1].start_date !== event.start_date;
                return (
                  <div key={event.id}>
                    {showDivider && (
                      <div className="date-div" style={index === 0 ? { marginTop: 0 } : undefined}>
                        {formatDate(parseDate(event.start_date))}
                      </div>
                    )}
                    <EventCard event={event} index={index} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div className="ev-newsletter-bar">
        <div className="ev-newsletter-bar-inner">
          <div className="ev-newsletter-bar-text">
            <Mail size={20} className="ev-newsletter-icon" />
            <div>
              <p className="ev-newsletter-heading">{defaultHeading}</p>
              <p className="ev-newsletter-sub">{defaultSubtext}</p>
            </div>
          </div>

          {newsletterStatus === 'success' ? (
            <div className="ev-newsletter-success">
              <Check size={18} />
              <span>You're on the list. See you Monday!</span>
            </div>
          ) : (
            <form className="ev-newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="ev-newsletter-input"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="ev-newsletter-btn"
                disabled={newsletterStatus === 'loading'}
              >
                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Get Free Newsletter'}
              </button>
            </form>
          )}

          {newsletterStatus === 'error' && (
            <p className="ev-newsletter-error">{newsletterError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
