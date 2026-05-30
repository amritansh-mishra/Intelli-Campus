import axios from 'axios';

function resolveApiBaseUrl(): string {
  const env = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
  if (!env) return '/api';
  return env.endsWith('/api') ? env : `${env}/api`;
}

const API_BASE_URL = resolveApiBaseUrl();

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ic_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ic_token');
      localStorage.removeItem('ic_user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
