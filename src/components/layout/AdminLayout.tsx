import { adminNav } from '../../config/navigation';
import { RoleShellLayout } from './RoleShellLayout';

export function AdminLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <RoleShellLayout title={title} navItems={adminNav} roleLabel="College Administration">
      {children}
    </RoleShellLayout>
  );
}
