import { motion } from 'framer-motion';
import { Calendar, Clock, Bell, BellOff, Trash2, Edit2 } from 'lucide-react';
import { Event } from '../services/supabase';
import { format, parseISO, isToday, isTomorrow, isPast } from 'date-fns';

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
  delay?: number;
}

export function EventCard({ event, onEdit, onDelete, delay = 0 }: EventCardProps) {
  const eventDate = parseISO(event.event_date);
  const eventDateTime = parseISO(`${event.event_date}T${event.event_time}`);
  const isPastEvent = isPast(eventDateTime);

  const formatDateLabel = () => {
    if (isToday(eventDate)) return 'Today';
    if (isTomorrow(eventDate)) return 'Tomorrow';
    return format(eventDate, 'MMM d, yyyy');
  };

  const priorityColors = {
    high: 'from-red-500/20 to-red-600/10 border-red-500/30',
    medium: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    low: 'from-green-500/20 to-green-600/10 border-green-500/30',
  };

  const glowColors = {
    high: 'hover:shadow-red-500/20',
    medium: 'hover:shadow-yellow-500/20',
    low: 'hover:shadow-green-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${priorityColors[event.priority]} border p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${glowColors[event.priority]}`}
    >
      {isPastEvent && (
        <div className="absolute inset-0 bg-dark-navy/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-soft-gray text-sm font-medium">Completed</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-3 relative z-10">
        <h3 className="text-lg font-semibold text-pure-white line-clamp-1 pr-4">{event.title}</h3>
        <span className={`badge badge-${event.priority} flex-shrink-0`}>{event.priority}</span>
      </div>

      {event.description && (
        <p className="text-soft-gray text-sm line-clamp-2 mb-4">{event.description}</p>
      )}

      <div className="flex flex-wrap gap-4 text-sm text-soft-gray mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent-blue" />
          <span>{formatDateLabel()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-blue" />
          <span>{event.event_time}</span>
        </div>
        <div className="flex items-center gap-2">
          {event.reminder_enabled ? (
            <>
              <Bell className="w-4 h-4 text-accent-blue" />
              <span className="text-accent-blue">Reminder On</span>
            </>
          ) : (
            <>
              <BellOff className="w-4 h-4 text-soft-gray" />
              <span>No Reminder</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-glass-border">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit?.(event)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-glass-white hover:bg-glass-hover text-soft-gray hover:text-pure-white transition-all"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete?.(event.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}

export function EventCardCompact({ event, onClick }: { event: Event; onClick?: () => void }) {
  const eventDateTime = parseISO(`${event.event_date}T${event.event_time}`);
  const isPastEvent = isPast(eventDateTime);

  const timeUntil = () => {
    const now = new Date();
    const diff = eventDateTime.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (diff < 0) return 'Past';
    if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`glass-card-hover p-4 cursor-pointer ${isPastEvent ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-10 rounded-full ${
            event.priority === 'high' ? 'bg-red-500' :
            event.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          <div>
            <p className="font-medium text-pure-white">{event.title}</p>
            <p className="text-xs text-soft-gray">{event.event_time} • {timeUntil()}</p>
          </div>
        </div>
        {event.reminder_enabled && (
          <Bell className="w-4 h-4 text-accent-blue" />
        )}
      </div>
    </motion.div>
  );
}

export default EventCard;
