import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { Event } from '../services/supabase';
import { format, parseISO, isPast, isToday } from 'date-fns';

interface ReminderCardProps {
  event: Event;
  onDismiss?: () => void;
}

function CountdownTimer({ targetDate, targetTime }: { targetDate: string; targetTime: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(`${targetDate}T${targetTime}`);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1;

  return (
    <div className="flex items-center gap-2">
      <div className={`px-3 py-1.5 rounded-lg ${isUrgent ? 'bg-red-500/20' : 'bg-glass-white'}`}>
        <span className={`text-2xl font-bold ${isUrgent ? 'text-red-400' : 'text-pure-white'}`}>
          {timeLeft.days > 0 ? `${timeLeft.days}d` : ''}
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

export function ReminderCard({ event, onDismiss }: ReminderCardProps) {
  const eventDate = parseISO(event.event_date);
  const eventDateTime = parseISO(`${event.event_date}T${event.event_time}`);
  const hasPassed = isPast(eventDateTime);
  const isTodayEvent = isToday(eventDate);

  const priorityConfig = {
    high: {
      bg: 'from-red-500/20 to-red-600/10',
      border: 'border-red-500/40',
      icon: 'bg-red-500',
    },
    medium: {
      bg: 'from-yellow-500/20 to-yellow-600/10',
      border: 'border-yellow-500/40',
      icon: 'bg-yellow-500',
    },
    low: {
      bg: 'from-green-500/20 to-green-500/10',
      border: 'border-green-500/40',
      icon: 'bg-green-500',
    },
  };

  const config = priorityConfig[event.priority];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`relative rounded-xl bg-gradient-to-r ${config.bg} border ${config.border} p-4 backdrop-blur-sm`}
    >
      <div className="flex items-start gap-4">
        <div className={`${config.icon} w-2 h-full min-h-[60px] rounded-full`} />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {event.priority === 'high' && !hasPassed && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </motion.div>
            )}
            <h4 className="font-semibold text-pure-white">{event.title}</h4>
          </div>

          {event.description && (
            <p className="text-sm text-soft-gray mb-3 line-clamp-1">{event.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-soft-gray">
              <Clock className="w-4 h-4" />
              <span>
                {isTodayEvent ? 'Today' : format(eventDate, 'MMM d')} at {event.event_time}
              </span>
            </div>

            {!hasPassed && (
              <CountdownTimer targetDate={event.event_date} targetTime={event.event_time} />
            )}

            {hasPassed && (
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`badge badge-${event.priority}`}>{event.priority}</span>
          {event.reminder_enabled && (
            <div className="flex items-center gap-1 text-accent-blue text-xs">
              <Bell className="w-3 h-3" />
              <span>Reminder</span>
            </div>
          )}
          {onDismiss && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDismiss}
              className="text-soft-gray hover:text-pure-white transition-colors text-xs"
            >
              Dismiss
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ReminderTimeline({ events }: { events: Event[] }) {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.event_date}T${a.event_time}`);
    const dateB = new Date(`${b.event_date}T${b.event_time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-blue-400 to-transparent" />

      <div className="space-y-4">
        {sortedEvents.slice(0, 5).map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              className="absolute left-2 top-4 w-4 h-4 rounded-full bg-accent-blue border-2 border-dark-navy"
            />

            <ReminderCard event={event} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
