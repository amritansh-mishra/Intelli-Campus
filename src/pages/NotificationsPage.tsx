import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff, Clock, CheckCircle } from 'lucide-react';
import { useEvents } from '../context/EventsContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { ReminderTimeline } from '../components/ReminderCard';
import { EmptyState } from '../components/EmptyState';
import { SkeletonCard } from '../components/Loader';
import { format, parseISO, isPast, isToday } from 'date-fns';

export function NotificationsPage() {
  const { events, loading, updateEvent } = useEvents();

  const upcomingReminders = useMemo(() => {
    return events
      .filter((e) => e.reminder_enabled && !isPast(parseISO(`${e.event_date}T${e.event_time}`)))
      .sort((a, b) => {
        const dateA = new Date(`${a.event_date}T${a.event_time}`);
        const dateB = new Date(`${b.event_date}T${b.event_time}`);
        return dateA.getTime() - dateB.getTime();
      });
  }, [events]);

  const missedReminders = useMemo(() => {
    return events
      .filter((e) => e.reminder_enabled && isPast(parseISO(`${e.event_date}T${e.event_time}`)) && !e.reminder_sent)
      .sort((a, b) => {
        const dateA = new Date(`${a.event_date}T${a.event_time}`);
        const dateB = new Date(`${b.event_date}T${b.event_time}`);
        return dateB.getTime() - dateA.getTime();
      });
  }, [events]);

  const markAsRead = async (id: string) => {
    await updateEvent(id, { reminder_sent: true });
  };

  const stats = useMemo(() => {
    const upcoming = upcomingReminders.length;
    const missed = missedReminders.length;
    const highPriority = events.filter((e) => e.priority === 'high' && !isPast(parseISO(`${e.event_date}T${e.event_time}`))).length;
    const withReminder = events.filter((e) => e.reminder_enabled).length;
    const withoutReminder = events.filter((e) => !e.reminder_enabled).length;

    return { upcoming, missed, highPriority, withReminder, withoutReminder };
  }, [events, upcomingReminders, missedReminders]);

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
            <h1 className="text-3xl font-bold text-pure-white mb-2">Notifications</h1>
            <p className="text-soft-gray">Manage your reminders and notifications</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Bell className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-soft-gray text-sm">Upcoming</span>
              </div>
              <p className="text-2xl font-bold text-pure-white">{stats.upcoming}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <span className="text-soft-gray text-sm">Missed</span>
              </div>
              <p className="text-2xl font-bold text-pure-white">{stats.missed}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-soft-gray text-sm">With Reminders</span>
              </div>
              <p className="text-2xl font-bold text-pure-white">{stats.withReminder}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <BellOff className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="text-soft-gray text-sm">No Reminders</span>
              </div>
              <p className="text-2xl font-bold text-pure-white">{stats.withoutReminder}</p>
            </motion.div>
          </div>

          {/* Reminders Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold text-pure-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent-blue" />
                Upcoming Reminders
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : upcomingReminders.length === 0 ? (
                <EmptyState
                  title="No upcoming reminders"
                  description="All caught up! No pending reminders."
                  icon="bell"
                />
              ) : (
                <ReminderTimeline events={upcomingReminders} />
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-semibold text-pure-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                Missed Reminders
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : missedReminders.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-soft-gray">No missed reminders!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {missedReminders.slice(0, 5).map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-pure-white">{event.title}</p>
                          <p className="text-sm text-soft-gray mt-1">
                            {format(parseISO(event.event_date), 'MMM d, yyyy')} at {event.event_time}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markAsRead(event.id)}
                          className="text-xs text-accent-blue hover:underline"
                        >
                          Mark as read
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          </div>
        </main>
      </div>
    </div>
  );
}
