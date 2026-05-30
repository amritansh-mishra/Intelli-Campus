import api from '../../../shared/services/api';

export const studentService = {
  getDashboard: () => api.get('/student/dashboard'),
};
