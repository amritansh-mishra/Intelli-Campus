import React from 'react';
import { LucideIcon } from 'lucide-react';
import { format } from 'date-fns';

export interface TimelineEvent {
  id: string;
  type: 'login' | 'event' | 'voice' | 'alert' | 'system';
  title: string;
  description: string;
  timestamp: string | Date;
  icon: LucideIcon;
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
}

export function ActivityTimeline({ events }: ActivityTimelineProps) {
  const typeStyles = {
    login: 'bg-emerald-50 text-success border-success/20',
    event: 'bg-primary/10 text-primary border-primary/20',
    voice: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    alert: 'bg-red-50 text-danger border-danger/20',
    system: 'bg-surface text-muted border-line',
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-line"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div className={`relative px-1`}>
                  <div className={`h-8 w-8 rounded-full border flex items-center justify-center ring-8 ring-card ${typeStyles[event.type]}`}>
                    <event.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm text-ink font-medium">
                    {event.title}
                  </div>
                  <p className="mt-1 text-sm text-muted">{event.description}</p>
                </div>
                <div className="text-right text-xs text-muted py-2 shrink-0">
                  <time dateTime={new Date(event.timestamp).toISOString()}>
                    {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                  </time>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
