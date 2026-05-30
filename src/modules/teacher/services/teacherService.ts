import api from '../../../shared/services/api';

export const teacherService = {
  getDashboard: () => api.get('/teacher/dashboard'),
  getStudents: () => api.get('/teacher/students'),
};
