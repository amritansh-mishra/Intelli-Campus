import { teacherNav } from '../../config/navigation';
import { RoleShellLayout } from './RoleShellLayout';

export function TeacherLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <RoleShellLayout title={title} navItems={teacherNav} roleLabel="Faculty Portal">
      {children}
    </RoleShellLayout>
  );
}
