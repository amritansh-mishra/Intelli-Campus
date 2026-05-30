import { AdminLayout } from '../layouts/AdminLayout';
import { RoleSettings } from '../../../shared/components/RoleSettings';

export default function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <RoleSettings title="Admin settings" />
    </AdminLayout>
  );
}
