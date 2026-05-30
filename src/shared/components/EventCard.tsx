import { Calendar, Clock, Bell, BellOff, Trash2, Edit2 } from 'lucide-react';
import { Event } from '../../data/dummyData';
import { format, parseISO, isToday, isTomorrow, isPast } from 'date-fns';
import { Card } from './Card';
import { Badge, priorityToBadge } from './Badge';

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const eventDate = parseISO(event.date);
  const eventDateTime = parseISO(`${event.date}T${event.time}`);
  const isPastEvent = isPast(eventDateTime);

  const formatDateLabel = () => {
    if (isToday(eventDate)) return 'Today';
    if (isTomorrow(eventDate)) return 'Tomorrow';
    return format(eventDate, 'MMM d, yyyy');
  };

  return (
    <Card hover className={isPastEvent ? 'opacity-60' : ''}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="line-clamp-1 text-base font-semibold text-ink">{event.title}</h3>
        <Badge variant={priorityToBadge(event.priority)}>{event.priority}</Badge>
      </div>

      {event.description && (
        <p className="mb-3 line-clamp-2 text-sm text-muted">{event.description}</p>
      )}

      <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-primary" />
          {formatDateLabel()}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" />
          {event.time}
        </span>
        <span className="flex items-center gap-1.5">
          {event.reminder ? (
            <>
              <Bell className="h-4 w-4 text-primary" />
              Reminder on
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4" />
              No reminder
            </>
          )}
        </span>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex gap-2 border-t border-line pt-3">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(event)}
              className="btn-ghost text-xs"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
          )}
          {onDelete && event.id && (
            <button
              type="button"
              onClick={() => onDelete(event.id!)}
              className="btn-ghost text-xs text-danger hover:text-danger"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </Card>
  );
}

export default EventCard;
