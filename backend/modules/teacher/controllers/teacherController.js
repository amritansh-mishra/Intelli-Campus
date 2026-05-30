import { Event } from '../../events/models/Event.js';
import { User } from '../../auth/models/User.js';
import { VoiceReminder } from '../../voice-agent/models/VoiceReminder.js';

export const getDashboard = async (req, res) => {
  try {
    const [myEvents, voiceRequests, students] = await Promise.all([
      Event.countDocuments({ createdBy: req.userId, date: { $gte: new Date() } }),
      VoiceReminder.countDocuments({ createdBy: req.userId, status: 'pending' }),
      User.countDocuments({ role: 'student', departmentId: req.user.departmentId }),
    ]);

    res.json({
      upcomingClasses: 4,
      pendingAssignments: 3,
      studentCount: students,
      voiceRequests,
      upcomingEvents: myEvents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudents = async (req, res) => {
  try {
    const filter = { role: 'student' };
    if (req.user.departmentId) filter.departmentId = req.user.departmentId;
    const students = await User.find(filter).select('-password');
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
