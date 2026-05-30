import { StudentLayout } from '../layouts/StudentLayout';
import { RoleSettings } from '../../../shared/components/RoleSettings';

export default function StudentSettings() {
  return (
    <StudentLayout title="Settings">
      <RoleSettings title="Student settings" />
    </StudentLayout>
  );
}
