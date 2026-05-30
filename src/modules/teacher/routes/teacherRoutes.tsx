import TeacherDashboard from '../pages/TeacherDashboard';
import TeacherClasses from '../pages/TeacherClasses';
import TeacherAssignments from '../pages/TeacherAssignments';
import TeacherStudents from '../pages/TeacherStudents';
import TeacherReminders from '../pages/TeacherReminders';
import TeacherVoiceRequests from '../pages/TeacherVoiceRequests';
import TeacherNotifications from '../pages/TeacherNotifications';
import TeacherSettings from '../pages/TeacherSettings';

export const teacherRoutes = [
  { path: 'dashboard', element: <TeacherDashboard /> },
  { path: 'classes', element: <TeacherClasses /> },
  { path: 'assignments', element: <TeacherAssignments /> },
  { path: 'students', element: <TeacherStudents /> },
  { path: 'reminders', element: <TeacherReminders /> },
  { path: 'voice-requests', element: <TeacherVoiceRequests /> },
  { path: 'notifications', element: <TeacherNotifications /> },
  { path: 'settings', element: <TeacherSettings /> },
];
