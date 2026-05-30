import { AdminLayout } from '../../components/layout/AdminLayout';
import { NotificationsPage } from '../shared/NotificationsPage';

export default function AdminNotifications() {
  return (
    <AdminLayout title="Notifications">
      <NotificationsPage title="Notification center" />
    </AdminLayout>
  );
}
