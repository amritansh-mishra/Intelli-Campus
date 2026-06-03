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
import { AdminLayout } from '../modules/admin/layouts/AdminLayout';

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
            <AdminLayout />
          </RequireRole>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        {(adminRoutes as any[]).map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child: any) => (
              <Route 
                key={child.path || 'index'} 
                index={child.index} 
                path={child.path} 
                element={child.element} 
              />
            ))}
          </Route>
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
        {(teacherRoutes as any[]).map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child: any) => (
              <Route 
                key={child.path || 'index'} 
                index={child.index} 
                path={child.path} 
                element={child.element} 
              />
            ))}
          </Route>
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
        {(studentRoutes as any[]).map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((child: any) => (
              <Route 
                key={child.path || 'index'} 
                index={child.index} 
                path={child.path} 
                element={child.element} 
              />
            ))}
          </Route>
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
