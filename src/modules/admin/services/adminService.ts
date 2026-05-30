import api from '../../../shared/services/api';

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (role?: string) => api.get('/admin/users', { params: { role } }),
  updateUserStatus: (id: string, isActive: boolean) =>
    api.patch(`/admin/users/${id}/status`, { isActive }),
  getAnalytics: () => api.get('/admin/analytics'),
};
