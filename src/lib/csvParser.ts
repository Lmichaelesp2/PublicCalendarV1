export type EventInput = {
  name: string;
  start_date: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  website?: string;
  description?: string;
  paid?: string;
  address?: string;
  zipcode?: string;
  org_name?: string;
  participation?: string;
  part_of_town?: string;
  city_calendar?: string;
  event_category?: string;
  org_id?: string;
  event_type?: string;
  event_city?: string;
  state?: string;
  source?: string;
  notes?: string;
  internal_type?: string;
  time_of_day?: string;
};

function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function parseRows(lines: string[], separator: string): EventInput[] {
  if (lines.length < 2) return [];
  const headers = lines[0].split(separator).map(normalizeHeader);
  const events: EventInput[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = line.split(separator);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (cols[idx] ?? '').trim();
    });

    const ev: EventInput = {
      name: row['name'] ?? row['event_name'] ?? '',
      start_date: row['start_date'] ?? row['date'] ?? '',
      start_time: row['start_time'] ?? row['time'] ?? undefined,
      end_date: row['end_date'] ?? undefined,
      end_time: row['end_time'] ?? undefined,
      website: row['website'] ?? row['url'] ?? undefined,
      description: row['description'] ?? undefined,
      paid: row['paid'] ?? row['cost'] ?? undefined,
      address: row['address'] ?? undefined,
      zipcode: row['zipcode'] ?? row['zip'] ?? undefined,
      org_name: row['org_name'] ?? row['group_name'] ?? row['organization'] ?? undefined,
      participation: row['participation'] ?? undefined,
      part_of_town: row['part_of_town'] ?? undefined,
      city_calendar: row['city_calendar'] ?? row['city'] ?? undefined,
      event_category: row['event_category'] ?? row['category'] ?? undefined,
      org_id: row['org_id'] ?? undefined,
      event_type: row['event_type'] ?? undefined,
      event_city: row['event_city'] ?? undefined,
      state: row['state'] ?? undefined,
      source: row['source'] ?? undefined,
      notes: row['notes'] ?? undefined,
      internal_type: row['internal_type'] ?? undefined,
      time_of_day: row['time_of_day'] ?? row['timeofday'] ?? row['time_period'] ?? undefined,
    };

    if (ev.name && ev.start_date) events.push(ev);
  }

  return events;
}

export function parseCSV(text: string): EventInput[] {
  const lines = text.split('\n');
  return parseRows(lines, ',');
}

export function parseTSV(text: string): EventInput[] {
  const lines = text.split('\n');
  return parseRows(lines, '\t');
}

export function validateEvent(ev: EventInput): string[] {
  const errors: string[] = [];
  if (!ev.name) errors.push('Name is required');
  if (!ev.start_date) errors.push('Start date is required');
  return errors;
}
