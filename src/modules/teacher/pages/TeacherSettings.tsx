import { TeacherLayout } from '../layouts/TeacherLayout';
import { RoleSettings } from '../../../shared/components/RoleSettings';

export default function TeacherSettings() {
  return (
    <TeacherLayout title="Settings">
      <RoleSettings title="Faculty settings" />
    </TeacherLayout>
  );
}
