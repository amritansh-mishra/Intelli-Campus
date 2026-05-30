import { TeacherLayout } from '../layouts/TeacherLayout';
import { NotificationsPage } from '../../../shared/components/NotificationsPage';

export default function TeacherNotifications() {
  return (
    <TeacherLayout title="Notifications">
      <NotificationsPage title="Notifications" />
    </TeacherLayout>
  );
}
