import { AdminLayout } from '../layouts/AdminLayout';
import { NotificationsPage } from '../../../shared/components/NotificationsPage';

export default function AdminNotifications() {
  return (
    <AdminLayout title="Notifications">
      <NotificationsPage title="Notification center" />
    </AdminLayout>
  );
}
