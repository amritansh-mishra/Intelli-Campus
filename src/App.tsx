import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GuestRoute } from './components/routing/GuestRoute';
import { RequireRole } from './components/routing/RequireRole';
import { useAuth } from './context/AuthContext';
import { ROLE_DASHBOARD } from './types';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

import AdminDashboard from './features/admin/AdminDashboard';
import AdminDepartments from './features/admin/AdminDepartments';
import { AdminTeachers, AdminStudents } from './features/admin/AdminUsers';
import AdminEvents from './features/admin/AdminEvents';
import AdminVoiceAgent from './features/admin/AdminVoiceAgent';
import AdminAnalytics from './features/admin/AdminAnalytics';
import AdminNotifications from './features/admin/AdminNotifications';
import AdminSettings from './features/admin/AdminSettings';

import TeacherDashboard from './features/teacher/TeacherDashboard';
import TeacherClasses from './features/teacher/TeacherClasses';
import TeacherAssignments from './features/teacher/TeacherAssignments';
import TeacherStudents from './features/teacher/TeacherStudents';
import TeacherReminders from './features/teacher/TeacherReminders';
import TeacherVoiceRequests from './features/teacher/TeacherVoiceRequests';
import TeacherNotifications from './features/teacher/TeacherNotifications';
import TeacherSettings from './features/teacher/TeacherSettings';

import StudentDashboard from './features/student/StudentDashboard';
import StudentEvents from './features/student/StudentEvents';
import StudentAssignments from './features/student/StudentAssignments';
import StudentReminders from './features/student/StudentReminders';
import StudentClubs from './features/student/StudentClubs';
import StudentNotifications from './features/student/StudentNotifications';
import StudentSettings from './features/student/StudentSettings';

function LegacyRedirect() {
  const { user, token } = useAuth();
  if (token && user) return <Navigate to={ROLE_DASHBOARD[user.role]} replace />;
  return <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<RequireRole allowed={['admin']}><AdminDashboard /></RequireRole>} />
      <Route path="/admin/departments" element={<RequireRole allowed={['admin']}><AdminDepartments /></RequireRole>} />
      <Route path="/admin/teachers" element={<RequireRole allowed={['admin']}><AdminTeachers /></RequireRole>} />
      <Route path="/admin/students" element={<RequireRole allowed={['admin']}><AdminStudents /></RequireRole>} />
      <Route path="/admin/events" element={<RequireRole allowed={['admin']}><AdminEvents /></RequireRole>} />
      <Route path="/admin/voice-agent" element={<RequireRole allowed={['admin']}><AdminVoiceAgent /></RequireRole>} />
      <Route path="/admin/analytics" element={<RequireRole allowed={['admin']}><AdminAnalytics /></RequireRole>} />
      <Route path="/admin/notifications" element={<RequireRole allowed={['admin']}><AdminNotifications /></RequireRole>} />
      <Route path="/admin/settings" element={<RequireRole allowed={['admin']}><AdminSettings /></RequireRole>} />

      {/* Teacher */}
      <Route path="/teacher/dashboard" element={<RequireRole allowed={['teacher']}><TeacherDashboard /></RequireRole>} />
      <Route path="/teacher/classes" element={<RequireRole allowed={['teacher']}><TeacherClasses /></RequireRole>} />
      <Route path="/teacher/assignments" element={<RequireRole allowed={['teacher']}><TeacherAssignments /></RequireRole>} />
      <Route path="/teacher/students" element={<RequireRole allowed={['teacher']}><TeacherStudents /></RequireRole>} />
      <Route path="/teacher/reminders" element={<RequireRole allowed={['teacher']}><TeacherReminders /></RequireRole>} />
      <Route path="/teacher/voice-requests" element={<RequireRole allowed={['teacher']}><TeacherVoiceRequests /></RequireRole>} />
      <Route path="/teacher/notifications" element={<RequireRole allowed={['teacher']}><TeacherNotifications /></RequireRole>} />
      <Route path="/teacher/settings" element={<RequireRole allowed={['teacher']}><TeacherSettings /></RequireRole>} />

      {/* Student */}
      <Route path="/student/dashboard" element={<RequireRole allowed={['student']}><StudentDashboard /></RequireRole>} />
      <Route path="/student/events" element={<RequireRole allowed={['student']}><StudentEvents /></RequireRole>} />
      <Route path="/student/assignments" element={<RequireRole allowed={['student']}><StudentAssignments /></RequireRole>} />
      <Route path="/student/reminders" element={<RequireRole allowed={['student']}><StudentReminders /></RequireRole>} />
      <Route path="/student/clubs" element={<RequireRole allowed={['student']}><StudentClubs /></RequireRole>} />
      <Route path="/student/notifications" element={<RequireRole allowed={['student']}><StudentNotifications /></RequireRole>} />
      <Route path="/student/settings" element={<RequireRole allowed={['student']}><StudentSettings /></RequireRole>} />

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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
