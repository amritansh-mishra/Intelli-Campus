import AdminDashboard from '../pages/AdminDashboard';
import AdminDepartments from '../pages/AdminDepartments';
import { AdminTeachers, AdminStudents } from '../pages/AdminUsers';
import AdminEvents from '../pages/AdminEvents';
import AdminVoiceAgent from '../pages/AdminVoiceAgent';
import AdminAnalytics from '../pages/AdminAnalytics';
import AdminNotifications from '../pages/AdminNotifications';
import AdminSettings from '../pages/AdminSettings';

export const adminRoutes = [
  { path: 'dashboard', element: <AdminDashboard /> },
  { path: 'departments', element: <AdminDepartments /> },
  { path: 'teachers', element: <AdminTeachers /> },
  { path: 'students', element: <AdminStudents /> },
  { path: 'events', element: <AdminEvents /> },
  { path: 'voice-agent', element: <AdminVoiceAgent /> },
  { path: 'analytics', element: <AdminAnalytics /> },
  { path: 'notifications', element: <AdminNotifications /> },
  { path: 'settings', element: <AdminSettings /> },
];
