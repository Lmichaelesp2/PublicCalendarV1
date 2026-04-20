import { createClient } from '@supabase/supabase-js';
import type { Event, City } from './supabase';

function getServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

type FetchOptions = {
  city?: City;
  groupType?: string;
};

export async function fetchApprovedEvents({ city, groupType }: FetchOptions = {}): Promise<Event[]> {
  const supabase = getServerClient();

  const future90 = new Date();
  future90.setDate(future90.getDate() + 90);
  const future90Str = future90.toISOString().split('T')[0];

  const today = new Date().toISOString().split('T')[0];

  let query = supabase
    .from('events')
    .select('*')
    .eq('status', 'approved')
    .gte('start_date', today)
    .lte('start_date', future90Str)
    .order('start_date', { ascending: true });

  if (city) query = query.eq('city_calendar', city);
  if (groupType) query = query.eq('event_category', groupType);

  const { data, error } = await query;

  if (error) {
    console.error('fetchApprovedEvents error:', error);
    return [];
  }

  return (data ?? []) as Event[];
}
