import { Router } from 'express';
import { Event } from '../models/Event.js';
import { User } from '../models/User.js';
import { VoiceReminder } from '../models/VoiceReminder.js';
import { authenticate, authorize, attachUser } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('teacher'), attachUser);

router.get('/dashboard', async (req, res) => {
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
});

router.get('/students', async (req, res) => {
  const filter = { role: 'student' };
  if (req.user.departmentId) filter.departmentId = req.user.departmentId;
  const students = await User.find(filter).select('-password');
  res.json(students);
});

export default router;
