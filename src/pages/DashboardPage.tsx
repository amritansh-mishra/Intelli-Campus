import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, isSameDay, addMonths, subMonths } from 'date-fns';
import { useEvents } from '../context/EventsContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { EventCardCompact } from '../components/EventCard';
import { VoiceAssistantCard } from '../components/VoiceAssistantCard';
import { SkeletonCard } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';
import { Event } from '../services/supabase';

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  delay = 0,
  color = 'blue',
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
  delay?: number;
  color?: 'blue' | 'red' | 'green' | 'yellow';
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 20;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [value]);

  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    red: 'from-red-500/20 to-red-600/10 border-red-500/30',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
  };

  const iconColors = {
    blue: 'text-blue-500 bg-blue-500/20',
    red: 'text-red-500 bg-red-500/20',
    green: 'text-green-500 bg-green-500/20',
    yellow: 'text-yellow-500 bg-yellow-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconColors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp className="w-4 h-4" />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div>
        <motion.p className="text-3xl font-bold text-pure-white mb-1">
          {typeof value === 'number' ? displayValue : value}
        </motion.p>
        <p className="text-sm text-soft-gray">{title}</p>
      </div>

      {title === 'Today\'s Meetings' && typeof value === 'number' && value > 0 && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500"
        />
      )}
    </motion.div>
  );
}

function MiniCalendar({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, number>();
    events.forEach((event) => {
      const dateStr = event.event_date;
      map.set(dateStr, (map.get(dateStr) || 0) + 1);
    });
    return map;
  }, [events]);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-pure-white">{format(currentDate, 'MMMM yyyy')}</h3>
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth}
            className="p-1 rounded hover:bg-glass-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-soft-gray" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth}
            className="p-1 rounded hover:bg-glass-hover transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-soft-gray" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-xs text-soft-gray py-1">
            {day}
          </div>
        ))}

        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {days.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const eventCount = eventsByDate.get(dateStr) || 0;
          const hasHighPriority = events.some(
            (e) => e.event_date === dateStr && e.priority === 'high'
          );

          return (
            <motion.button
              key={dateStr}
              whileHover={{ scale: 1.1 }}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center relative ${
                isToday(day)
                  ? 'bg-accent-blue text-white'
                  : isSameMonth(day, currentDate)
                  ? 'text-pure-white hover:bg-glass-hover'
                  : 'text-soft-gray/50'
              } transition-colors`}
            >
              <span className="text-sm">{format(day, 'd')}</span>
              {eventCount > 0 && (
                <span
                  className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                    hasHighPriority ? 'bg-red-500' : 'bg-accent-blue'
                  }`}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-glass-border">
        <div className="flex items-center gap-4 text-xs text-soft-gray">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-blue" />
            <span>Event</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>High Priority</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardPage() {
  const { events, loading, error } = useEvents();

  const stats = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayEvents = events.filter((e) => e.event_date === today);
    const highPriority = events.filter((e) => e.priority === 'high');
    const upcoming = events.filter((e) => {
      const eventDate = parseISO(e.event_date);
      return eventDate >= new Date();
    });

    return {
      total: events.length,
      today: todayEvents.length,
      highPriority: highPriority.length,
      upcoming: upcoming.length,
    };
  }, [events]);

  const todayEvents = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return events
      .filter((e) => e.event_date === today)
      .sort((a, b) => a.event_time.localeCompare(b.event_time));
  }, [events]);

  const highPriorityEvents = useMemo(() => {
    return events
      .filter((e) => e.priority === 'high')
      .slice(0, 3);
  }, [events]);

  if (error) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <p className="text-red-500">Error loading dashboard: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-black">
      <Sidebar />
      <div className="ml-60">
        <Navbar events={events} variant="dashboard" />

        <main className="p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-pure-white mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!
            </h1>
            <p className="text-soft-gray">Here's what's happening with your schedule today.</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Events"
              value={stats.total}
              icon={Calendar}
              color="blue"
              delay={0.1}
            />
            <StatCard
              title="Today's Meetings"
              value={stats.today}
              icon={Clock}
              color="green"
              delay={0.2}
            />
            <StatCard
              title="High Priority"
              value={stats.highPriority}
              icon={AlertTriangle}
              color="red"
              delay={0.3}
            />
            <StatCard
              title="Upcoming"
              value={stats.upcoming}
              icon={TrendingUp}
              color="yellow"
              delay={0.4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Schedule */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-pure-white">Today's Schedule</h2>
                  <Link
                    to="/events"
                    className="text-accent-blue hover:text-blue-400 text-sm flex items-center gap-1"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : todayEvents.length === 0 ? (
                  <EmptyState
                    title="No events today"
                    description="You have a free day! Add events to stay organized."
                    icon="calendar"
                    action={{ label: 'Add Event', href: '/add-event' }}
                  />
                ) : (
                  <div className="space-y-3">
                    {todayEvents.map((event) => (
                      <EventCardCompact key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </motion.section>

              {/* High Priority Alerts */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-pure-white flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </motion.div>
                    High Priority Alerts
                  </h2>
                </div>

                {loading ? (
                  <div className="space-y-3">
                    {[...Array(2)].map((_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : highPriorityEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-soft-gray">No high priority events</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {highPriorityEvents.map((event) => (
                      <EventCardCompact key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </motion.section>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              <MiniCalendar events={events} />

              <VoiceAssistantCard />

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
              >
                <h3 className="font-semibold text-pure-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/add-event">
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-glass-white hover:bg-glass-hover text-pure-white transition-all"
                    >
                      <div className="p-2 rounded-lg bg-accent-blue/20">
                        <Plus className="w-5 h-5 text-accent-blue" />
                      </div>
                      <span className="font-medium">Add New Event</span>
                      <ArrowRight className="w-4 h-4 ml-auto text-soft-gray" />
                    </motion.button>
                  </Link>

                  <Link to="/events">
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-glass-white hover:bg-glass-hover text-pure-white transition-all"
                    >
                      <div className="p-2 rounded-lg bg-green-500/20">
                        <Calendar className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="font-medium">Browse Events</span>
                      <ArrowRight className="w-4 h-4 ml-auto text-soft-gray" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
