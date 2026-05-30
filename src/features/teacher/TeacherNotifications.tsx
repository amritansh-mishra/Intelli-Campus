import { TeacherLayout } from '../../components/layout/TeacherLayout';
import { NotificationsPage } from '../shared/NotificationsPage';

export default function TeacherNotifications() {
  return (
    <TeacherLayout title="Notifications">
      <NotificationsPage title="Notifications" />
    </TeacherLayout>
  );
}
