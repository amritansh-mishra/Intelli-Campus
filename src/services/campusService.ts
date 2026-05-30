import api from '../lib/api';
import { CampusEvent, Department, AppNotification, VoiceReminderItem } from '../types';

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (role?: string) => api.get('/admin/users', { params: { role } }),
  updateUserStatus: (id: string, isActive: boolean) =>
    api.patch(`/admin/users/${id}/status`, { isActive }),
  getAnalytics: () => api.get('/admin/analytics'),
};

export const teacherService = {
  getDashboard: () => api.get('/teacher/dashboard'),
  getStudents: () => api.get('/teacher/students'),
};

export const studentService = {
  getDashboard: () => api.get('/student/dashboard'),
};

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
