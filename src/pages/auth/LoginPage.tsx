import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';

const roles: { id: UserRole; label: string }[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'teacher', label: 'Teacher' },
  { id: 'student', label: 'Student' },
];

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const redirect = await login({ email, password, role });
      navigate(from && from.startsWith(`/${role}`) ? from : redirect, { replace: true });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Login failed. Check credentials and try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Select your role and enter your credentials">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <span className="label-text">Sign in as</span>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`rounded-md border py-2 text-sm font-medium transition-colors ${
                  role === r.id
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-line text-muted hover:border-primary/30'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Email"
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@campus.edu"
        />

        <Input
          label="Password"
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="rounded-md border border-danger/30 bg-red-50/50 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" isLoading={loading}>
          Sign in
        </Button>

        <p className="text-center text-sm text-muted">
          <Link to="/forgot-password" className="text-primary hover:text-primary-hover">
            Forgot password?
          </Link>
        </p>
        <p className="text-center text-sm text-muted">
          No account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:text-primary-hover">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
