import { User } from '../models/User.js';
import { signToken } from '../../../utils/token.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role, employeeId, studentId, year, phone, departmentId } =
      req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    if (!['admin', 'teacher', 'student'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existing = await User.findOne({ email: email.toLowerCase(), role });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email and role already exists' });
    }

    if (role === 'teacher' && !employeeId) {
      return res.status(400).json({ message: 'Employee ID is required for faculty' });
    }
    if (role === 'student' && !studentId) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      employeeId,
      studentId,
      year,
      phone,
      departmentId: departmentId || undefined,
    });

    const token = signToken(user);
    res.status(201).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: 'Server misconfigured: JWT_SECRET is not set in backend/.env',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase(), role }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials for this role' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    const token = signToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Login error:', err);
    const isDb =
      err.name === 'MongooseError' ||
      err.name === 'MongoServerError' ||
      err.name === 'MongoNetworkError';
    if (isDb) {
      return res.status(503).json({
        message: 'Database error. Ensure MongoDB is running and run `npm run seed` in backend/.',
      });
    }
    res.status(500).json({
      message:
        process.env.NODE_ENV === 'production' ? 'Login failed' : err.message || 'Login failed',
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ message: 'Email and role are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase(), role });
  if (!user) {
    return res.json({
      message: 'If an account exists, password reset instructions have been sent.',
    });
  }

  res.json({
    message: 'If an account exists, password reset instructions have been sent.',
  });
};

export const getMe = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

function sanitizeUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    departmentId: user.departmentId,
    employeeId: user.employeeId,
    studentId: user.studentId,
    year: user.year,
    phone: user.phone,
  };
}
