import { Router } from 'express';
import { Event } from '../models/Event.js';
import { authenticate, authorize, attachUser } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', async (req, res) => {
  const filter = {};
  if (req.userRole === 'student' || req.userRole === 'teacher') {
    filter.$or = [
      { scope: 'campus' },
      { createdBy: req.userId },
      { attendees: req.userId },
    ];
  }
  const events = await Event.find(filter)
    .populate('createdBy', 'name email role')
    .sort({ date: 1 });
  res.json(events);
});

router.post('/', authorize('admin', 'teacher'), async (req, res) => {
  const event = await Event.create({ ...req.body, createdBy: req.userId });
  res.status(201).json(event);
});

router.delete('/:id', authorize('admin', 'teacher'), async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (req.userRole === 'teacher' && String(event.createdBy) !== String(req.userId)) {
    return res.status(403).json({ message: 'Not allowed' });
  }
  await event.deleteOne();
  res.json({ message: 'Event deleted' });
});

router.post('/:id/register', authorize('student'), async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (!event.attendees.includes(req.userId)) {
    event.attendees.push(req.userId);
    await event.save();
  }
  res.json(event);
});

export default router;
