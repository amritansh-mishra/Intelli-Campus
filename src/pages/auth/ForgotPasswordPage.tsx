import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { authService } from '../../shared/services/authService';
import { UserRole } from '../../types';

export default function ForgotPasswordPage() {
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await authService.forgotPassword(email, role);
      setMessage(data.message);
    } catch {
      setMessage('Unable to process request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We'll send instructions if an account exists for this role"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label-text">Role</label>
          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div>
          <label className="label-text">Email</label>
          <input
            type="email"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {message && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-success">
            {message}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          Send reset link
        </button>
        <p className="text-center text-sm text-muted">
          <Link to="/login" className="text-primary">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
