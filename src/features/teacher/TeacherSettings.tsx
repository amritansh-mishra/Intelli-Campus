import { TeacherLayout } from '../../components/layout/TeacherLayout';
import { RoleSettings } from '../shared/RoleSettings';

export default function TeacherSettings() {
  return (
    <TeacherLayout title="Settings">
      <RoleSettings title="Faculty settings" />
    </TeacherLayout>
  );
}
