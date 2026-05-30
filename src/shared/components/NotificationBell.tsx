import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Event } from '../../data/dummyData';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';

interface NotificationBellProps {
  events: Event[];
}

export function NotificationBell({ events }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const upcoming = events
    .filter((e) => e.reminder && e.date && e.time)
    .filter((e) => !isPast(parseISO(`${e.date}T${e.time}`)))
    .slice(0, 5);

  const highPriority = events.filter((e) => e.priority === 'High').slice(0, 3);
  const unreadCount = new Set([...upcoming, ...highPriority].map((e) => e.id)).size;

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-md border border-line p-2 text-muted transition-colors hover:bg-surface hover:text-ink"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-md border border-line bg-card shadow-card-hover">
          <div className="border-b border-line px-4 py-3">
            <p className="text-sm font-semibold text-ink">Notifications</p>
            <p className="text-xs text-muted">Upcoming reminders & priorities</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {upcoming.length === 0 && highPriority.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted">No new notifications</p>
            ) : (
              <>
                {upcoming.map((event) => (
                  <div
                    key={event.id}
                    className="border-b border-line px-4 py-3 last:border-0 hover:bg-surface"
                  >
                    <p className="text-sm font-medium text-ink">{event.title}</p>
                    <p className="text-xs text-muted">
                      Reminder · {formatDateLabel(event.date)} at {event.time}
                    </p>
                  </div>
                ))}
                {highPriority
                  .filter((e) => !upcoming.some((u) => u.id === e.id))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="border-b border-line px-4 py-3 last:border-0 hover:bg-surface"
                    >
                      <p className="text-sm font-medium text-ink">{event.title}</p>
                      <p className="text-xs text-danger">High priority</p>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
