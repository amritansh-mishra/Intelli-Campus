import StudentDashboard from '../pages/StudentDashboard';
import StudentEvents from '../pages/StudentEvents';
import StudentAssignments from '../pages/StudentAssignments';
import StudentReminders from '../pages/StudentReminders';
import StudentClubs from '../pages/StudentClubs';
import StudentNotifications from '../pages/StudentNotifications';
import StudentSettings from '../pages/StudentSettings';

export const studentRoutes = [
  { path: 'dashboard', element: <StudentDashboard /> },
  { path: 'events', element: <StudentEvents /> },
  { path: 'assignments', element: <StudentAssignments /> },
  { path: 'reminders', element: <StudentReminders /> },
  { path: 'clubs', element: <StudentClubs /> },
  { path: 'notifications', element: <StudentNotifications /> },
  { path: 'settings', element: <StudentSettings /> },
];
