import { User } from '../../auth/models/User.js';
import { Department } from '../models/Department.js';
import { Event } from '../../events/models/Event.js';
import { VoiceReminder } from '../../voice-agent/models/VoiceReminder.js';

export const getDashboard = async (req, res) => {
  try {
    const [students, teachers, departments, events, voiceReminders] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      Department.countDocuments(),
      Event.countDocuments({ date: { $gte: new Date() } }),
      VoiceReminder.countDocuments({ status: { $in: ['pending', 'scheduled'] } }),
    ]);

    res.json({
      totalStudents: students,
      totalTeachers: teachers,
      totalDepartments: departments,
      upcomingEvents: events,
      activeReminders: voiceReminders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password').sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { email, password, name, role, departmentId, employeeId, studentId, year, phone } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new User({
      email,
      password,
      name,
      role,
      departmentId: departmentId || undefined,
      employeeId,
      studentId,
      year,
      phone
    });

    await user.save();
    
    const userWithoutPassword = await User.findById(user._id).select('-password');
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
