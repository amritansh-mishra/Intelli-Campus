import { AdminLayout } from '../../components/layout/AdminLayout';
import { RoleSettings } from '../shared/RoleSettings';

export default function AdminSettings() {
  return (
    <AdminLayout title="Settings">
      <RoleSettings title="Admin settings" />
    </AdminLayout>
  );
}
