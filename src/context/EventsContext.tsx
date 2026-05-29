import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Event, eventService } from '../services/supabase';

interface EventsContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  refreshEvents: () => Promise<void>;
  addEvent: (event: Parameters<typeof eventService.createEvent>[0]) => Promise<boolean>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  const addEvent = useCallback(async (event: Parameters<typeof eventService.createEvent>[0]) => {
    const newEvent = await eventService.createEvent(event);
    if (newEvent) {
      setEvents((prev) => [...prev, newEvent].sort((a, b) => {
        const dateA = new Date(`${a.event_date}T${a.event_time}`);
        const dateB = new Date(`${b.event_date}T${b.event_time}`);
        return dateA.getTime() - dateB.getTime();
      }));
      return true;
    }
    return false;
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    const updated = await eventService.updateEvent(id, updates);
    if (updated) {
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updated : event))
      );
      return true;
    }
    return false;
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    const success = await eventService.deleteEvent(id);
    if (success) {
      setEvents((prev) => prev.filter((event) => event.id !== id));
      return true;
    }
    return false;
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        loading,
        error,
        refreshEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
