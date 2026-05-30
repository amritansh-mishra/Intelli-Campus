import { Event } from '../../events/models/Event.js';
import { VoiceReminder } from '../../voice-agent/models/VoiceReminder.js';

export const getDashboard = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
