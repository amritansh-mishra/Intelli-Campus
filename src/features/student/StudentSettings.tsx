import { StudentLayout } from '../../components/layout/StudentLayout';
import { RoleSettings } from '../shared/RoleSettings';

export default function StudentSettings() {
  return (
    <StudentLayout title="Settings">
      <RoleSettings title="Student settings" />
    </StudentLayout>
  );
}
