import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Bell,
  Clock,
  AlertCircle,
  RefreshCw,
  Mic,
  ArrowRight,
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/ui/PageHeader';
import StatCard from '../components/StatCard';
import EventCard from '../components/EventCard';
import CountdownTimer from '../components/CountdownTimer';
import { Card, CardHeader } from '../components/ui/Card';
import { dummyEvents, dummyStats, Event } from '../data/dummyData';
import { SkeletonCard } from '../components/Loader';

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]') as Event[];
    const timer = setTimeout(() => {
      setEvents([...dummyEvents, ...stored].slice(0, 6));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date(new Date().toDateString()));
  const nextEvent = upcomingEvents[0];

  return (
    <AppLayout title="Dashboard" events={events}>
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Dashboard"
          description="Overview of events, reminders, and voice agent activity."
          action={
            <button type="button" className="btn-secondary" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </button>
          }
        />

        <Link
          to="/voice-agent"
          className="mb-6 flex items-center justify-between gap-4 rounded-md border border-line bg-card p-4 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">AI Voice Agent</p>
              <p className="text-sm text-muted">18 calls today · 94% success rate</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            Open agent
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total events" value={dummyStats.totalEvents} icon={Calendar} />
          <StatCard
            title="High priority"
            value={dummyStats.highPriority}
            icon={AlertCircle}
            iconClassName="text-danger bg-red-50"
          />
          <StatCard
            title="Today's meetings"
            value={dummyStats.todayMeetings}
            icon={Clock}
            iconClassName="text-warning bg-amber-50"
          />
          <StatCard
            title="Upcoming reminders"
            value={dummyStats.upcomingReminders}
            icon={Bell}
            iconClassName="text-success bg-emerald-50"
          />
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2" padding="lg">
            <CardHeader
              title="Upcoming events"
              action={
                <Link to="/events" className="text-sm font-medium text-primary hover:text-primary-hover">
                  View all
                </Link>
              }
            />
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingEvents.slice(0, 4).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </Card>

          <div className="space-y-4">
            {nextEvent && (
              <CountdownTimer
                targetDate={nextEvent.date}
                targetTime={nextEvent.time}
                title={`Next: ${nextEvent.title}`}
              />
            )}
            <Card>
              <CardHeader title="Quick actions" />
              <div className="flex flex-col gap-2">
                <Link to="/add-event" className="btn-primary text-center">
                  Add event
                </Link>
                <Link to="/voice-agent" className="btn-secondary text-center">
                  Voice reminders
                </Link>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2" padding="lg">
            <CardHeader title="Calendar overview" />
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(35)].map((_, index) => {
                const day = index - 1;
                const isToday = day === new Date().getDate();
                const hasEvent = events.some((e) => new Date(e.date).getDate() === day);
                return (
                  <div
                    key={index}
                    className={`flex aspect-square items-center justify-center rounded-md text-sm ${
                      day < 1 || day > 31
                        ? 'text-transparent'
                        : isToday
                          ? 'bg-primary font-medium text-white'
                          : hasEvent
                            ? 'bg-primary/10 font-medium text-primary'
                            : 'text-muted hover:bg-surface'
                    }`}
                  >
                    {day >= 1 && day <= 31 ? day : ''}
                  </div>
                );
              })}
            </div>
          </Card>

          <Card padding="lg">
            <CardHeader
              title="Suggestions"
              description="Based on your schedule"
            />
            <ul className="space-y-2">
              {[
                'Schedule study time before your CS101 exam',
                'Enable voice reminder for assignment deadlines',
                'Review team meeting notes from last week',
              ].map((text) => (
                <li
                  key={text}
                  className="rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink"
                >
                  {text}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
