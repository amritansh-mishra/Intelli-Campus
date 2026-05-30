import { Router } from 'express';
import { Event } from '../models/Event.js';
import { VoiceReminder } from '../models/VoiceReminder.js';
import { authenticate, authorize, attachUser } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('student'), attachUser);

router.get('/dashboard', async (req, res) => {
  const [events, reminders, voice] = await Promise.all([
    Event.countDocuments({
      $or: [{ scope: 'campus' }, { attendees: req.userId }],
      date: { $gte: new Date() },
    }),
    Event.countDocuments({ attendees: req.userId }),
    VoiceReminder.countDocuments({ recipientId: req.userId, status: 'pending' }),
  ]);

  res.json({
    upcomingEvents: events,
    assignmentDeadlines: 5,
    activeReminders: reminders,
    voiceNotifications: voice,
    attendanceRate: 94,
  });
});

export default router;
