import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  Calendar,
  Mic,
  BarChart3,
  Bell,
  Settings,
  BookOpen,
  ClipboardList,
  Clock,
  Phone,
  Layers,
} from 'lucide-react';

export const adminNav = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/departments', label: 'Departments', icon: Building2 },
  { path: '/admin/teachers', label: 'Teachers', icon: Users },
  { path: '/admin/students', label: 'Students', icon: GraduationCap },
  { path: '/admin/events', label: 'Events', icon: Calendar },
  { path: '/admin/voice-agent', label: 'AI Voice Agent', icon: Mic },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/notifications', label: 'Notifications', icon: Bell },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export const teacherNav = [
  { path: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/teacher/classes', label: 'My Classes', icon: BookOpen },
  { path: '/teacher/assignments', label: 'Assignments', icon: ClipboardList },
  { path: '/teacher/students', label: 'Students', icon: Users },
  { path: '/teacher/reminders', label: 'Reminders', icon: Clock },
  { path: '/teacher/voice-requests', label: 'Voice Requests', icon: Phone },
  { path: '/teacher/notifications', label: 'Notifications', icon: Bell },
  { path: '/teacher/settings', label: 'Settings', icon: Settings },
];

export const studentNav = [
  { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/student/events', label: 'Events', icon: Calendar },
  { path: '/student/assignments', label: 'Assignments', icon: ClipboardList },
  { path: '/student/reminders', label: 'Reminders', icon: Clock },
  { path: '/student/clubs', label: 'Clubs', icon: Layers },
  { path: '/student/notifications', label: 'Notifications', icon: Bell },
  { path: '/student/settings', label: 'Settings', icon: Settings },
];
