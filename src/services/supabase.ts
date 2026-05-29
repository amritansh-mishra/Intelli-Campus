import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  priority: 'high' | 'medium' | 'low';
  reminder_enabled: boolean;
  reminder_sent: boolean;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface EventInsert {
  title: string;
  description?: string;
  event_date: string;
  event_time: string;
  priority: 'high' | 'medium' | 'low';
  reminder_enabled?: boolean;
}

// Service functions
export const eventService = {
  // Get all events
  async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })
      .order('event_time', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return data || [];
  },

  // Create new event
  async createEvent(event: EventInsert): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error('Error creating event:', error);
      return null;
    }

    return data;
  },

  // Update event
  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating event:', error);
      return null;
    }

    return data;
  },

  // Delete event
  async deleteEvent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      return false;
    }

    return true;
  },

  // Get events by date
  async getEventsByDate(date: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_date', date)
      .order('event_time', { ascending: true });

    if (error) {
      console.error('Error fetching events by date:', error);
      return [];
    }

    return data || [];
  },

  // Get high priority events
  async getHighPriorityEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('priority', 'high')
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching high priority events:', error);
      return [];
    }

    return data || [];
  },

  // Get today's events
  async getTodayEvents(): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('event_date', today)
      .order('event_time', { ascending: true });

    if (error) {
      console.error('Error fetching today events:', error);
      return [];
    }

    return data || [];
  },

  // Get upcoming events (next 7 days)
  async getUpcomingEvents(): Promise<Event[]> {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', today.toISOString().split('T')[0])
      .lte('event_date', nextWeek.toISOString().split('T')[0])
      .order('event_date', { ascending: true })
      .order('event_time', { ascending: true });

    if (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }

    return data || [];
  },

  // Mark reminder as sent
  async markReminderSent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('events')
      .update({ reminder_sent: true, updated_at: new Date().toISOString() })
      .eq('id', id);

    return !error;
  },
};
