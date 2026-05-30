import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_DASHBOARD } from '../types';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

import { GuestRoute } from '../shared/layouts/GuestRoute';
import { RequireRole } from '../shared/layouts/RequireRole';

import { adminRoutes } from '../modules/admin/routes/adminRoutes';
import { teacherRoutes } from '../modules/teacher/routes/teacherRoutes';
import { studentRoutes } from '../modules/student/routes/studentRoutes';

function LegacyRedirect() {
  const { user, token } = useAuth();
  if (token && user) return <Navigate to={ROLE_DASHBOARD[user.role]} replace />;
  return <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />

      {/* Admin Module Routes */}
      <Route
        path="/admin"
        element={
          <RequireRole allowed={['admin']}>
            <Outlet />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Teacher Module Routes */}
      <Route
        path="/teacher"
        element={
          <RequireRole allowed={['teacher']}>
            <Outlet />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        {teacherRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Student Module Routes */}
      <Route
        path="/student"
        element={
          <RequireRole allowed={['student']}>
            <Outlet />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        {studentRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Legacy paths */}
      <Route path="/dashboard" element={<LegacyRedirect />} />
      <Route path="/voice-agent" element={<LegacyRedirect />} />
      <Route path="/events" element={<LegacyRedirect />} />
      <Route path="/add-event" element={<LegacyRedirect />} />
      <Route path="/notifications" element={<LegacyRedirect />} />
      <Route path="/settings" element={<LegacyRedirect />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
