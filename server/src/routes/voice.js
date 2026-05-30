import { Router } from 'express';
import { VoiceReminder } from '../models/VoiceReminder.js';
import { authenticate, authorize, attachUser } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', async (req, res) => {
  const filter =
    req.userRole === 'admin'
      ? {}
      : { $or: [{ createdBy: req.userId }, { recipientId: req.userId }] };

  const reminders = await VoiceReminder.find(filter).sort({ scheduledAt: 1 });
  res.json(reminders);
});

router.get('/stats', authorize('admin', 'teacher'), async (req, res) => {
  const all = await VoiceReminder.find(
    req.userRole === 'teacher' ? { createdBy: req.userId } : {}
  );
  const completed = all.filter((r) => r.status === 'completed');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const callsToday = all.filter((r) => r.updatedAt >= today).length;

  res.json({
    isActive: true,
    callsToday,
    successRate: all.length ? Math.round((completed.length / all.length) * 100) : 0,
    totalRemindersSent: all.length,
    voiceSuccessRate: all.length ? Math.round((completed.length / all.length) * 100) : 0,
    lastCallTime: all[0]?.updatedAt
      ? new Date(all[0].updatedAt).toLocaleString()
      : 'No calls yet',
  });
});

router.post('/', authorize('admin', 'teacher'), async (req, res) => {
  const reminder = await VoiceReminder.create({
    ...req.body,
    createdBy: req.userId,
  });
  res.status(201).json(reminder);
});

router.patch('/:id', authorize('admin', 'teacher'), async (req, res) => {
  const reminder = await VoiceReminder.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(reminder);
});

export default router;
