import api from './api';
import { CampusEvent, Department, AppNotification, VoiceReminderItem } from '../../types';

export const departmentService = {
  getAll: () => api.get<Department[]>('/departments'),
  create: (data: { name: string; code: string; headOfDepartment?: string }) =>
    api.post<Department>('/departments', data),
  remove: (id: string) => api.delete(`/departments/${id}`),
};

export const eventService = {
  getAll: () => api.get<CampusEvent[]>('/events'),
  create: (data: Record<string, unknown>) => api.post<CampusEvent>('/events', data),
  remove: (id: string) => api.delete(`/events/${id}`),
  register: (id: string) => api.post(`/events/${id}/register`),
};

export const notificationService = {
  getAll: () => api.get<AppNotification[]>('/notifications'),
  create: (data: Record<string, unknown>) => api.post('/notifications', data),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
};

export const voiceService = {
  getAll: () => api.get<VoiceReminderItem[]>('/voice'),
  getStats: () => api.get('/voice/stats'),
  create: (data: Record<string, unknown>) => api.post('/voice', data),
};

