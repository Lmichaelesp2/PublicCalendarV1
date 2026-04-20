import { useState, useEffect } from 'react';
import type { Event } from './supabase';

export function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

export function getWeekEnd(date: Date): Date {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return end;
}

export function sortEventsByTime(events: Event[]): Event[] {
  return [...events].sort((a, b) => {
    const dateCompare = a.start_date.localeCompare(b.start_date);
    if (dateCompare !== 0) return dateCompare;
    const aTime = a.start_time ?? '23:59';
    const bTime = b.start_time ?? '23:59';
    return aTime.localeCompare(bTime);
  });
}

export function useMidnightReset(): string {
  const [today, setToday] = useState(() => dateKey(new Date()));

  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setToday(dateKey(new Date()));
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [today]);

  return today;
}
