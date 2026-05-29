import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Calendar,
  Bell,
  Clock,
  AlertCircle,
  TrendingUp,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import EventCard from '../components/EventCard';
import VoiceAssistant from '../components/VoiceAssistant';
import CountdownTimer from '../components/CountdownTimer';
import { dummyEvents, dummyStats } from '../data/dummyData';
import { Event } from '../data/dummyData';
import { SkeletonCard } from '../components/Loader';

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvents(dummyEvents.slice(0, 3));
      setLoading(false);
    }, 1000);
  }, []);

  const upcomingEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    return eventDate >= new Date();
  });

  const nextEvent = upcomingEvents[0];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Sidebar />
      <Navbar />

      <main className="lg:ml-60 pt-24 pb-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">
                Welcome back! Here's your overview for today.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 glass-card glass-card-hover rounded-xl"
            >
              <RefreshCw className="w-5 h-5 text-blue-400" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Events"
              value={dummyStats.totalEvents}
              icon={Calendar}
              color="bg-blue-500"
              delay={0}
            />
            <StatCard
              title="High Priority"
              value={dummyStats.highPriority}
              icon={AlertCircle}
              color="bg-red-500"
              delay={1}
            />
            <StatCard
              title="Today's Meetings"
              value={dummyStats.todayMeetings}
              icon={Clock}
              color="bg-yellow-500"
              delay={2}
            />
            <StatCard
              title="Upcoming Reminders"
              value={dummyStats.upcomingReminders}
              icon={Bell}
              color="bg-green-500"
              delay={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 glass-card rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Upcoming Events
                </h2>
                <a
                  href="/events"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View all
                </a>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingEvents.slice(0, 4).map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="space-y-6">
              {nextEvent && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CountdownTimer
                    targetDate={nextEvent.date}
                    targetTime={nextEvent.time}
                    title={`Next: ${nextEvent.title}`}
                  />
                </motion.div>
              )}

              <VoiceAssistant />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6">
                Calendar Overview
              </h3>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {[...Array(35)].map((_, index) => {
                  const day = index - 1;
                  const isToday = day === new Date().getDate();
                  const hasEvent = events.some((e) => {
                    const eventDate = new Date(e.date);
                    return eventDate.getDate() === day;
                  });

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-sm cursor-pointer
                        ${day < 1 || day > 31 ? 'text-gray-700' : ''}
                        ${isToday ? 'bg-blue-500 text-white font-bold' : ''}
                        ${
                          hasEvent && !isToday
                            ? 'bg-blue-500/20 text-blue-400'
                            : ''
                        }
                        ${
                          !isToday && !hasEvent && day >= 1 && day <= 31
                            ? 'text-gray-400 hover:bg-white/5'
                            : ''
                        }
                        ${day < 1 || day > 31 ? 'cursor-default' : ''}
                      `}
                    >
                      {day >= 1 && day <= 31 ? day : ''}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                AI Suggestions
              </h3>

              <div className="space-y-4">
                {[
                  'Schedule study time before your CS101 exam',
                  'Consider rescheduling your team meeting',
                  'Your assignment deadline is approaching',
                ].map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer"
                  >
                    <p className="text-sm text-gray-300">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
