import { VoiceReminder } from '../models/VoiceReminder.js';

export const getVoiceReminders = async (req, res) => {
  try {
    const filter =
      req.userRole === 'admin'
        ? {}
        : { $or: [{ createdBy: req.userId }, { recipientId: req.userId }] };

    const reminders = await VoiceReminder.find(filter).sort({ scheduledAt: 1 });
    res.json(reminders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getVoiceStats = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createVoiceReminder = async (req, res) => {
  try {
    const reminder = await VoiceReminder.create({
      ...req.body,
      createdBy: req.userId,
    });
    res.status(201).json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateVoiceReminder = async (req, res) => {
  try {
    const reminder = await VoiceReminder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(reminder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
