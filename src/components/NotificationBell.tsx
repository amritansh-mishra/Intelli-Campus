import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, CheckCircle } from 'lucide-react';
import { Event } from '../services/supabase';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

interface NotificationBellProps {
  events: Event[];
  onMarkAsRead?: (id: string) => void;
}

export function NotificationBell({ events, onMarkAsRead }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const upcomingReminders = events
    .filter((e) => e.reminder_enabled && !e.reminder_sent)
    .slice(0, 5);

  const highPriority = events.filter((e) => e.priority === 'high').slice(0, 3);

  const unreadCount = upcomingReminders.length + highPriority.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const isUpcoming = (dateStr: string, timeStr: string) => {
    const eventDate = parseISO(`${dateStr}T${timeStr}`);
    return !isPast(eventDate);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-glass-white hover:bg-glass-hover transition-colors"
      >
        <Bell className="w-5 h-5 text-pure-white" />

        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}

        {unreadCount > 0 && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500/50 rounded-full"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 glass-card overflow-hidden z-50"
          >
            <div className="p-4 border-b border-glass-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-pure-white">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-glass-hover rounded transition-colors"
                >
                  <X className="w-4 h-4 text-soft-gray" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {upcomingReminders.length === 0 && highPriority.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-soft-gray text-sm">All caught up!</p>
                </div>
              ) : (
                <>
                  {upcomingReminders.length > 0 && (
                    <div className="p-2">
                      <p className="text-xs text-soft-gray uppercase tracking-wider px-2 py-1">
                        Upcoming Reminders
                      </p>
                      {upcomingReminders.map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 hover:bg-glass-hover rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 w-2 h-2 rounded-full ${isUpcoming(event.event_date, event.event_time) ? 'bg-blue-500' : 'bg-gray-500'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-pure-white truncate">{event.title}</p>
                              <p className="text-xs text-soft-gray">
                                {formatDateLabel(event.event_date)} at {event.event_time}
                              </p>
                            </div>
                            {onMarkAsRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMarkAsRead(event.id);
                                }}
                                className="p-1 hover:bg-glass-hover rounded"
                              >
                                <Check className="w-4 h-4 text-soft-gray" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {highPriority.length > 0 && (
                    <div className="p-2 border-t border-glass-border">
                      <p className="text-xs text-soft-gray uppercase tracking-wider px-2 py-1">
                        High Priority
                      </p>
                      {highPriority.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 hover:bg-glass-hover rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-pure-white truncate">{event.title}</p>
                              <p className="text-xs text-soft-gray">
                                {formatDateLabel(event.event_date)} at {event.event_time}
                              </p>
                            </div>
                            <span className="badge badge-high">High</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
