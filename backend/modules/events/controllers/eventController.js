import { Event } from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, createdBy: req.userId });
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (req.userRole === 'teacher' && String(event.createdBy) !== String(req.userId)) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!event.attendees.includes(req.userId)) {
      event.attendees.push(req.userId);
      await event.save();
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
