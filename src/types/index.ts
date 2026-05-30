export type UserRole = 'admin' | 'teacher' | 'student';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId?: string;
  employeeId?: string;
  studentId?: string;
  year?: number;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface Department {
  _id: string;
  name: string;
  code: string;
  headOfDepartment?: string;
  facultyCount: number;
  studentCount: number;
}

export interface CampusEvent {
  _id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  category?: string;
  scope?: string;
  reminderEnabled?: boolean;
  createdBy?: { name: string; email: string; role: string };
}

export interface AppNotification {
  _id: string;
  title: string;
  message: string;
  type: 'alert' | 'reminder' | 'info' | 'emergency';
  priority?: string;
  read?: boolean;
  createdAt: string;
}

export interface VoiceReminderItem {
  _id: string;
  title: string;
  recipientName: string;
  scheduledAt: string;
  priority: 'High' | 'Medium' | 'Low';
  status: string;
}

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  admin: '/admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
};
