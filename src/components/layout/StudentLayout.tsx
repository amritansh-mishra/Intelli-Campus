import { studentNav } from '../../config/navigation';
import { RoleShellLayout } from './RoleShellLayout';

export function StudentLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <RoleShellLayout title={title} navItems={studentNav} roleLabel="Student Portal">
      {children}
    </RoleShellLayout>
  );
}
