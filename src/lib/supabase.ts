import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = supabase;

export type City = 'Austin' | 'Dallas' | 'Houston' | 'San Antonio';

export const CITIES: City[] = ['Austin', 'Dallas', 'Houston', 'San Antonio'];

export type Event = {
  id: string;
  name: string;
  start_date: string;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  website: string | null;
  description: string | null;
  paid: string | null;
  address: string | null;
  zipcode: string | null;
  org_name: string | null;
  participation: string | null;
  part_of_town: string | null;
  status: string;
  city_calendar: City | null;
  event_category: string | null;
  org_id: string | null;
  event_type: string | null;
  event_city: string | null;
  state: string | null;
  source: string | null;
  notes: string | null;
  internal_type: string | null;
  time_of_day: string | null;
  created_at: string;
  updated_at: string;
};
