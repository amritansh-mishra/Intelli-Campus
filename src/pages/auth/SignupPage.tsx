import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export default function SignupPage() {
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [year, setYear] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const redirect = await register({
        name,
        email,
        password,
        role,
        employeeId: role === 'teacher' ? employeeId : undefined,
        studentId: role === 'student' ? studentId : undefined,
        year: role === 'student' ? year : undefined,
      });
      navigate(redirect, { replace: true });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Register with your campus role">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <span className="label-text">Account type</span>
          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            <option value="admin">College Admin</option>
            <option value="teacher">Teacher / Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <label className="label-text">Full name</label>
          <input className="input-field" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="label-text">Email</label>
          <input
            type="email"
            className="input-field"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="label-text">Password</label>
          <input
            type="password"
            className="input-field"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {role === 'teacher' && (
          <div>
            <label className="label-text">Employee ID</label>
            <input
              className="input-field"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
        )}

        {role === 'student' && (
          <>
            <div>
              <label className="label-text">Student ID</label>
              <input
                className="input-field"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <div>
              <label className="label-text">Year</label>
              <select
                className="input-field"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-danger">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
