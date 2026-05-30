/**
 * @deprecated Use `src/lib/api.ts` and `src/services/campusService.ts` instead.
 * Re-exported with /api base URL for backward compatibility.
 */
import api from '../lib/api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  addEvent: async (eventData: Record<string, unknown>) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  getEventById: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  deleteEvent: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

export default api;
