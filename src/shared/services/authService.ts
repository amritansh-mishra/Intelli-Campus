import api from './api';
import { AuthResponse, AuthUser, UserRole } from '../../types';

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  employeeId?: string;
  studentId?: string;
  year?: number;
  phone?: string;
}

export const authService = {
  login: (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterPayload) => api.post<AuthResponse>('/auth/register', data),
  forgotPassword: (email: string, role: UserRole) =>
    api.post<{ message: string }>('/auth/forgot-password', { email, role }),
  me: () => api.get<{ user: AuthUser }>('/auth/me'),
};
