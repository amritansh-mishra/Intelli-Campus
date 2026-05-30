import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader } from '../components/Loader';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader text="Loading session..." />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
