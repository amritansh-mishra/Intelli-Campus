import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  CalendarX,
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import EventCard from '../components/EventCard';
import { SkeletonCard } from '../components/Loader';
import { dummyEvents, Event } from '../data/dummyData';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]') as Event[];
    const timer = setTimeout(() => {
      setEvents([...dummyEvents, ...stored]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === 'all' || event.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleDelete = (id: string) => {
    const stored = JSON.parse(localStorage.getItem('events') || '[]') as Event[];
    localStorage.setItem(
      'events',
      JSON.stringify(stored.filter((e) => e.id !== id))
    );
    setEvents(events.filter((e) => e.id !== id));
  };

  const priorityCounts = {
    all: events.length,
    High: events.filter((e) => e.priority === 'High').length,
    Medium: events.filter((e) => e.priority === 'Medium').length,
    Low: events.filter((e) => e.priority === 'Low').length,
  };

  return (
    <AppLayout title="Events" events={events}>
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Events"
          description="Manage and view all campus events"
          action={
            <Link to="/add-event" className="btn-primary">
              <Plus className="h-4 w-4" />
              Add event
            </Link>
          }
        />

        <Card className="mb-6" padding="md">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9"
              />
            </div>
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="btn-secondary shrink-0"
            >
              {sortOrder === 'asc' ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
              Sort by date
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted" />
            {(['all', 'High', 'Medium', 'Low'] as const).map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setPriorityFilter(priority)}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  priorityFilter === priority
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-line text-muted hover:border-primary/30 hover:text-ink'
                }`}
              >
                {priority === 'all' ? 'All' : priority}
                <span className="ml-1 text-xs opacity-70">
                  ({priorityCounts[priority]})
                </span>
              </button>
            ))}
          </div>
        </Card>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-md border border-dashed border-line bg-card py-16 text-center">
            <CalendarX className="mx-auto mb-4 h-12 w-12 text-muted/50" />
            <h3 className="text-lg font-semibold text-ink">No events found</h3>
            <p className="mt-1 text-sm text-muted">
              {searchQuery ? 'Try adjusting your search or filters' : 'Create your first event'}
            </p>
            <Link to="/add-event" className="btn-primary mt-6 inline-flex">
              <Plus className="h-4 w-4" />
              Add event
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} onDelete={handleDelete} />
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </>
        )}
      </div>
    </AppLayout>
  );
}
