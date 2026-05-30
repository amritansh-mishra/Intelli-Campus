import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_DASHBOARD, UserRole } from '../../types';

export function RoleRoute({
  children,
  allowed,
}: {
  children: React.ReactNode;
  allowed: UserRole[];
}) {
  const { user, hasRole } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (!hasRole(...allowed)) {
    return <Navigate to={ROLE_DASHBOARD[user.role]} replace />;
  }

  return <>{children}</>;
}
