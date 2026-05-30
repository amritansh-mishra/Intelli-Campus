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
