import { MapPin, Clock, ExternalLink, DollarSign, Monitor, Users } from 'lucide-react';
import type { Event } from '../lib/supabase';

type EventCardProps = {
  event: Event;
  index?: number;
};

export function EventCard({ event }: EventCardProps) {
  const paid = event.paid?.toLowerCase();
  const isFree = paid === 'free';
  const participation = event.participation?.toLowerCase();

  return (
    <div className="ev-card">
      <div className="ev-card-main">
        <div className="ev-card-top">
          {event.org_name && (
            <p className="ev-org">{event.org_name}</p>
          )}
          <h3 className="ev-title">
            {event.website ? (
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="ev-title-link">
                {event.name}
                <ExternalLink size={13} className="ev-external-icon" />
              </a>
            ) : (
              event.name
            )}
          </h3>
        </div>

        <div className="ev-meta">
          <span className="ev-meta-item">
            <Clock size={13} />
            {event.start_time ?? 'Time TBD'}
            {event.end_time && ` – ${event.end_time}`}
          </span>

          {event.address && (
            <span className="ev-meta-item">
              <MapPin size={13} />
              {event.address}
            </span>
          )}

          {participation && (
            <span className="ev-meta-item">
              {participation === 'virtual' ? <Monitor size={13} /> : <Users size={13} />}
              {event.participation}
            </span>
          )}

          {event.paid && (
            <span className={`ev-badge ${isFree ? 'ev-badge-free' : 'ev-badge-paid'}`}>
              <DollarSign size={11} />
              {event.paid}
            </span>
          )}
        </div>

        {event.description && (
          <p className="ev-desc">{event.description}</p>
        )}
      </div>
    </div>
  );
}
