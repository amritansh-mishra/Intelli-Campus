import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';
import { UserRole } from '../../types';

export function RequireRole({
  allowed,
  children,
}: {
  allowed: UserRole[];
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <RoleRoute allowed={allowed}>{children}</RoleRoute>
    </ProtectedRoute>
  );
}
