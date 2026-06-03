import { Navigate, Outlet } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminEvents from '../pages/AdminEvents';
import AdminVoiceAgent from '../pages/AdminVoiceAgent';
import AdminAnalytics from '../pages/AdminAnalytics';
import AdminNotifications from '../pages/AdminNotifications';

import { AdminUsers } from '../pages/AdminUsers';
import { AddUser } from '../pages/users/AddUser';
import { UserProfile } from '../pages/users/UserProfile';

import AdminDepartments from '../pages/AdminDepartments';

import { ProfileSettings } from '../pages/settings/ProfileSettings';
import { SecuritySettings } from '../pages/settings/SecuritySettings';
import { NotificationSettings } from '../pages/settings/NotificationSettings';
import { VoiceSettings } from '../pages/settings/VoiceSettings';
import { SystemPreferences } from '../pages/settings/SystemPreferences';

import { UserActivity } from '../pages/users/UserActivity';
import { AppearanceSettings } from '../pages/settings/AppearanceSettings';
import { AddDepartment } from '../pages/departments/AddDepartment';
import { DepartmentAnalytics } from '../pages/departments/DepartmentAnalytics';

export const adminRoutes = [
  { path: 'dashboard', element: <AdminDashboard /> },
  { path: 'events', element: <AdminEvents /> },
  { path: 'voice-agent', element: <AdminVoiceAgent /> },
  { path: 'analytics', element: <AdminAnalytics /> },
  { path: 'notifications', element: <AdminNotifications /> },
  
  // Users Module
  { 
    path: 'users', 
    element: <Outlet />,
    children: [
      { index: true, element: <AdminUsers title="All Users" /> },
      { path: 'students', element: <AdminUsers role="student" title="Students" /> },
      { path: 'teachers', element: <AdminUsers role="teacher" title="Teachers" /> },
      { path: 'admins', element: <AdminUsers role="admin" title="Administrators" /> },
      { path: 'add', element: <AddUser /> },
      { path: 'activity', element: <UserActivity /> },
      { path: ':id', element: <UserProfile /> },
    ]
  },

  // Departments Module
  {
    path: 'departments',
    element: <Outlet />,
    children: [
      { index: true, element: <AdminDepartments /> },
      { path: 'add', element: <AddDepartment /> },
      { path: 'analytics', element: <DepartmentAnalytics /> },
    ]
  },

  // Settings Module
  { 
    path: 'settings', 
    element: <Outlet />,
    children: [
      { index: true, element: <Navigate to="profile" replace /> },
      { path: 'profile', element: <ProfileSettings /> },
      { path: 'security', element: <SecuritySettings /> },
      { path: 'notifications', element: <NotificationSettings /> },
      { path: 'voice', element: <VoiceSettings /> },
      { path: 'preferences', element: <SystemPreferences /> },
      { path: 'appearance', element: <AppearanceSettings /> },
    ]
  },
];
