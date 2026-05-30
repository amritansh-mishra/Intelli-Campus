import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_DASHBOARD } from '../../types';
import { Loader } from '../components/Loader';

export function GuestRoute({ children }: { children: React.ReactNode }) {
  const { token, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader />
      </div>
    );
  }

  if (token && user) {
    return <Navigate to={ROLE_DASHBOARD[user.role]} replace />;
  }

  return <>{children}</>;
}
